import WebSocket from "ws";
import crypto from "crypto";
import { generateSecMsGecV2, generateMuid } from "./edge-drm";

export const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
export const CHROMIUM_FULL_VERSION = "143.0.3650.75";
export const CHROMIUM_MAJOR_VERSION = CHROMIUM_FULL_VERSION.split(".")[0];
export const SEC_MS_GEC_VERSION = `2-${CHROMIUM_FULL_VERSION}`;

export const WSS_URL = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}`;

export interface SynthesizeOptions {
  text: string;
  voice?: string;
  rate?: string | number; // e.g. "+0%" or 1.0
  volume?: string | number; // e.g. "+0%" or 100
  pitch?: string | number; // e.g. "+0Hz" or 0
  outputFormat?: string; // default "audio-24khz-48kbitrate-mono-mp3"
  receiveTimeout?: number; // in seconds, default 15
}

/**
 * Format rate parameter into +X% or -X%
 */
export function formatRate(rate: string | number | undefined): string {
  if (rate === undefined || rate === null) return "+0%";
  if (typeof rate === "string") {
    if (/^[+-]\d+%$/.test(rate)) return rate;
    const num = parseFloat(rate);
    if (!isNaN(num)) {
      const pct = Math.round((num - 1.0) * 100);
      return pct >= 0 ? `+${pct}%` : `${pct}%`;
    }
    return "+0%";
  }
  // If number, assume 1.0 is 0%, 1.2 is +20%, 0.8 is -20%
  const pct = Math.round((rate - 1.0) * 100);
  return pct >= 0 ? `+${pct}%` : `${pct}%`;
}

/**
 * Format pitch parameter into +XHz or -XHz
 */
export function formatPitch(pitch: string | number | undefined): string {
  if (pitch === undefined || pitch === null) return "+0Hz";
  if (typeof pitch === "string") {
    if (/^[+-]\d+(Hz|%)$/.test(pitch)) return pitch;
    const num = parseInt(pitch, 10);
    if (!isNaN(num)) {
      return num >= 0 ? `+${num}Hz` : `${num}Hz`;
    }
    return "+0Hz";
  }
  const num = Math.round(pitch);
  return num >= 0 ? `+${num}Hz` : `${num}Hz`;
}

/**
 * Format volume parameter into +X% or -X%
 */
export function formatVolume(volume: string | number | undefined): string {
  if (volume === undefined || volume === null) return "+0%";
  if (typeof volume === "string") {
    if (/^[+-]\d+%$/.test(volume)) return volume;
    const num = parseInt(volume, 10);
    if (!isNaN(num)) {
      const diff = num - 100;
      return diff >= 0 ? `+${diff}%` : `${diff}%`;
    }
    return "+0%";
  }
  const diff = Math.round(volume - 100);
  return diff >= 0 ? `+${diff}%` : `${diff}%`;
}

/**
 * Clean incompatible control characters as in communicate.go
 */
export function removeIncompatibleCharacters(str: string): string {
  let cleaned = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (
      (code >= 0 && code <= 8) ||
      (code >= 11 && code <= 12) ||
      (code >= 14 && code <= 31)
    ) {
      cleaned += " ";
    } else {
      cleaned += str[i];
    }
  }
  return cleaned;
}

/**
 * Escape XML characters for SSML safety
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate SSML string matching communicate.go mkSSML
 */
export function createSSML(
  text: string,
  voice: string,
  rate: string,
  volume: string,
  pitch: string
): string {
  const safeText = escapeXml(removeIncompatibleCharacters(text));
  return `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voice}'><prosody pitch='${pitch}' rate='${rate}' volume='${volume}'>${safeText}</prosody></voice></speak>`;
}

/**
 * Synthesize speech to MP3 Buffer using Edge TTS WebSocket protocol
 */
export async function synthesizeSpeech(options: SynthesizeOptions): Promise<Buffer> {
  const {
    text,
    voice = "zh-CN-XiaoxiaoNeural",
    rate = "+0%",
    volume = "+0%",
    pitch = "+0Hz",
    outputFormat = "audio-24khz-48kbitrate-mono-mp3",
    receiveTimeout = 20,
  } = options;

  if (!text || !text.trim()) {
    throw new Error("Text must not be empty");
  }

  const rateStr = formatRate(rate);
  const volumeStr = formatVolume(volume);
  const pitchStr = formatPitch(pitch);

  const connectionId = crypto.randomUUID().replace(/-/g, "");
  const secMsGec = generateSecMsGecV2();
  const muid = generateMuid();

  const wssUrl = `${WSS_URL}&Sec-MS-GEC=${secMsGec}&Sec-MS-GEC-Version=${SEC_MS_GEC_VERSION}&ConnectionId=${connectionId}`;

  return new Promise<Buffer>((resolve, reject) => {
    let timer: NodeJS.Timeout | null = null;
    let isDone = false;
    const audioChunks: Buffer[] = [];

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      isDone = true;
    };

    timer = setTimeout(() => {
      cleanup();
      try {
        ws.close();
      } catch {
        // ignore
      }
      reject(new Error(`Synthesis timed out after ${receiveTimeout} seconds`));
    }, receiveTimeout * 1000);

    const ws = new WebSocket(wssUrl, {
      headers: {
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROMIUM_MAJOR_VERSION}.0.0.0 Safari/537.36 Edg/${CHROMIUM_MAJOR_VERSION}.0.0.0`,
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Cookie: `muid=${muid};`,
      },
    });

    ws.on("open", () => {
      const dateStr = new Date().toUTCString();

      // 1. Send speech.config message
      const configJson = JSON.stringify({
        context: {
          synthesis: {
            audio: {
              metadataoptions: {
                sentenceBoundaryEnabled: "false",
                wordBoundaryEnabled: "true",
              },
              outputFormat,
            },
          },
        },
      });
      const configMsg = `X-Timestamp:${dateStr}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${configJson}`;
      ws.send(configMsg);

      // 2. Send SSML message
      const reqId = crypto.randomUUID().replace(/-/g, "");
      const ssml = createSSML(text, voice, rateStr, volumeStr, pitchStr);
      const ssmlMsg = `X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${dateStr}Z\r\nPath:ssml\r\n\r\n${ssml}`;
      ws.send(ssmlMsg);
    });

    ws.on("message", (data: WebSocket.RawData, isBinary: boolean) => {
      if (isDone) return;

      if (isBinary) {
        const buf = Buffer.from(data as Buffer);
        if (buf.length >= 2) {
          const headerLen = buf.readUInt16BE(0);
          if (buf.length > 2 + headerLen) {
            audioChunks.push(buf.subarray(2 + headerLen));
          }
        }
      } else {
        const textMsg = data.toString();
        if (textMsg.includes("Path:turn.end")) {
          cleanup();
          try {
            ws.close();
          } catch {
            // ignore
          }
          const totalBuffer = Buffer.concat(audioChunks);
          if (totalBuffer.length === 0) {
            reject(new Error("No audio data received from synthesis service"));
          } else {
            resolve(totalBuffer);
          }
        }
      }
    });

    ws.on("error", (err) => {
      if (isDone) return;
      cleanup();
      reject(err);
    });

    ws.on("close", (code, reason) => {
      if (isDone) return;
      cleanup();
      if (audioChunks.length > 0) {
        resolve(Buffer.concat(audioChunks));
      } else {
        reject(
          new Error(`WebSocket connection closed unexpectedly (code: ${code}, reason: ${reason.toString()})`)
        );
      }
    });
  });
}
