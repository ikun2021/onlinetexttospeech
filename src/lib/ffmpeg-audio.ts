"use client";

export type ConvertibleFormat = "mp3" | "wav" | "ogg" | "pcm";

export class AudioConvertError extends Error {
  constructor() {
    super("CONVERT_FAILED");
    this.name = "AudioConvertError";
  }
}

type FFmpegLike = {
  load: (config?: { coreURL?: string; wasmURL?: string }) => Promise<boolean>;
  exec: (args: string[]) => Promise<number>;
  writeFile: (path: string, data: Uint8Array) => Promise<boolean>;
  readFile: (path: string) => Promise<Uint8Array | string>;
  deleteFile: (path: string) => Promise<boolean>;
  on: (event: "log", callback: (event: { message: string }) => void) => void;
  off: (event: "log", callback: (event: { message: string }) => void) => void;
};

type FFmpegWASM = {
  FFmpeg: new () => FFmpegLike;
};

declare global {
  interface Window {
    FFmpegWASM?: FFmpegWASM;
  }
}

let ffmpegPromise: Promise<FFmpegLike> | null = null;
let convertQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = convertQueue.then(task, task);
  convertQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (window.FFmpegWASM) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new AudioConvertError()), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new AudioConvertError());
    document.head.appendChild(script);
  });
}

async function getFFmpeg(): Promise<FFmpegLike> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      await loadScript("/ffmpeg/ffmpeg.js");
      const FFmpeg = window.FFmpegWASM?.FFmpeg;
      if (!FFmpeg) throw new AudioConvertError();
      const ffmpeg = new FFmpeg();
      const origin = window.location.origin;
      await ffmpeg.load({
        coreURL: new URL("/ffmpeg/ffmpeg-core.js", origin).href,
        wasmURL: new URL("/ffmpeg/ffmpeg-core.wasm", origin).href,
      });
      return ffmpeg;
    })().catch((error) => {
      ffmpegPromise = null;
      throw error;
    });
  }
  return ffmpegPromise;
}

function toBlob(data: Uint8Array, type: string): Blob {
  const copy = new ArrayBuffer(data.byteLength);
  new Uint8Array(copy).set(data);
  return new Blob([copy], { type });
}

const MIME: Record<ConvertibleFormat, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  pcm: "application/octet-stream",
};

function buildArgs(format: ConvertibleFormat, sampleRate: number): string[] {
  const rate = String(sampleRate);
  const input = "input.mp3";
  const output = `output.${format}`;
  if (format === "mp3") {
    return ["-i", input, "-vn", "-ar", rate, "-ac", "1", "-c:a", "libmp3lame", "-b:a", "48k", output];
  }
  if (format === "wav") {
    return ["-i", input, "-vn", "-ar", rate, "-ac", "1", "-c:a", "pcm_s16le", output];
  }
  if (format === "ogg") {
    return ["-i", input, "-vn", "-ar", rate, "-ac", "1", "-c:a", "libvorbis", "-q:a", "5", output];
  }
  return ["-i", input, "-vn", "-f", "s16le", "-acodec", "pcm_s16le", "-ar", rate, "-ac", "1", output];
}

export function convertMp3ToFormat(
  mp3: Blob,
  format: ConvertibleFormat,
  sampleRate: number
): Promise<Blob> {
  return enqueue(() => convertOnce(mp3, format, sampleRate));
}

async function convertOnce(
  mp3: Blob,
  format: ConvertibleFormat,
  sampleRate: number
): Promise<Blob> {
  const ffmpeg = await getFFmpeg();
  const input = "input.mp3";
  const output = `output.${format}`;
  const logs: string[] = [];
  const onLog = ({ message }: { message: string }) => {
    logs.push(message);
    if (logs.length > 40) logs.shift();
  };
  ffmpeg.on("log", onLog);
  try {
    await ffmpeg.writeFile(input, new Uint8Array(await mp3.arrayBuffer()));
    const code = await ffmpeg.exec(buildArgs(format, sampleRate));
    if (code !== 0) {
      console.error("ffmpeg convert failed", logs.join("\n"));
      throw new AudioConvertError();
    }
    const data = await ffmpeg.readFile(output);
    if (typeof data === "string") throw new AudioConvertError();
    return toBlob(data, MIME[format]);
  } catch (error) {
    if (error instanceof AudioConvertError) throw error;
    console.error("ffmpeg convert failed", error, logs.join("\n"));
    throw new AudioConvertError();
  } finally {
    ffmpeg.off("log", onLog);
    await ffmpeg.deleteFile(input).catch(() => undefined);
    await ffmpeg.deleteFile(output).catch(() => undefined);
  }
}
