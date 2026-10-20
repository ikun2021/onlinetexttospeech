import { NextRequest, NextResponse } from "next/server";
import { synthesizeSpeech } from "@/lib/edge-tts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      voice = "zh-CN-XiaoxiaoNeural",
      rate = "+0%",
      volume = "+0%",
      pitch = "+0Hz",
    } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Text is required and must not be empty" },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "Text exceeds maximum allowed length of 5000 characters" },
        { status: 400 }
      );
    }

    // Edge rejects other rates (for example audio-16khz-32kbitrate-mono-mp3).
    // The browser resamples this 24 kHz MP3 when the user picks another rate or container.
    const outputFormat = "audio-24khz-48kbitrate-mono-mp3";
    const contentType = "audio/mpeg";
    const fileExtension = "mp3";

    const audioBuffer = await synthesizeSpeech({
      text,
      voice,
      rate,
      volume,
      pitch,
      outputFormat,
    });

    const uint8Array = new Uint8Array(audioBuffer);

    return new Response(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": audioBuffer.length.toString(),
        "Content-Disposition": `attachment; filename="synthesis-${Date.now()}.${fileExtension}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Voice-Used": voice,
      },
    });
  } catch (error: any) {
    console.error("Synthesize API error:", error);
    return NextResponse.json(
      {
        error: error?.message || "Failed to synthesize speech",
      },
      { status: 500 }
    );
  }
}
