import { NextRequest, NextResponse } from "next/server";
import { VOICES, LANGUAGES } from "@/data/mock-voices";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      text = "欢迎体验新一代智能文字转语音工作台。",
      voiceId = "xiaoxiao",
      language = "zh-CN",
      speed = 1.0,
      pitch = 1.0,
      sampleRate = 48000,
    } = body;

    // Simulate realistic neural TTS inference latency (700ms - 1200ms)
    await new Promise((resolve) => setTimeout(resolve, 850));

    const voice = VOICES.find((v) => v.id === voiceId) || VOICES[0];
    const lang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

    // Calculate approximate duration based on characters/words and speed
    const isEnglish = language.startsWith("en") || !/[\u4e00-\u9fa5]/.test(text);
    const wordsOrChars = isEnglish ? text.trim().split(/\s+/).length : text.length;
    const baseDuration = isEnglish ? wordsOrChars / 2.6 : wordsOrChars / 4.2;
    const finalDuration = Math.max(1.8, Number((baseDuration / (speed || 1.0)).toFixed(1)));

    // Generate pseudo-waveform points for visualizer
    const pointCount = 36;
    const waveform = Array.from({ length: pointCount }, (_, i) => {
      const val = Math.floor(
        30 + Math.sin(i * 0.45) * 28 + Math.cos(i * 0.9) * 22 + Math.random() * 20
      );
      return Math.min(100, Math.max(15, val));
    });

    const clipId = `clip_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return NextResponse.json({
      code: 0,
      message: "success",
      data: {
        id: clipId,
        text,
        duration: finalDuration,
        characterCount: text.length,
        voice: {
          id: voice.id,
          name: voice.name,
          gender: voice.gender,
          tag: voice.tag,
        },
        language: lang.name,
        settings: {
          speed,
          pitch,
          sampleRate,
        },
        waveform,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: "TTS synthesis failed", error: String(error) },
      { status: 500 }
    );
  }
}
