"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { LanguagePicker } from "@/components/language-picker";
import { VoicePicker } from "@/components/voice-picker";
import { TTSInputPanel } from "@/components/tts-input-panel";
import { TTSPlayerPanel } from "@/components/tts-player-panel";
import { TTSClip } from "@/data/mock-voices";
import { getVoiceByValue } from "@/data/voices";
import { useI18n } from "@/lib/i18n";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Headphones,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const { locale, t } = useI18n();

  // Control toolbar states
  const [selectedLocale, setSelectedLocale] = useState("zh-CN");
  const [selectedVoice, setSelectedVoice] = useState("zh-CN-XiaoxiaoNeural");

  // TTS Parameters
  const [text, setText] = useState(
    locale === "zh"
      ? "大家早上好！欢迎来到 2026 年度技术创新峰会。今天，我们正式推出全新一代基于边缘计算与神经声学建模的实时语音生成系统，让每一个开发者都能随心打造拥有自然人类情感的智能声音。"
      : "Good morning everyone! Welcome to the 2026 Tech Keynote. Today, we are thrilled to unveil our next-generation neural speech synthesis engine, empowering creators to generate lifelike voices with effortless studio control."
  );
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);

  // Synthesis state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentClip, setCurrentClip] = useState<TTSClip | null>(null);
  const [history, setHistory] = useState<TTSClip[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Trigger TTS synthesis through real Edge TTS Next.js backend API
  const handleGenerate = useCallback(async () => {
    if (!text.trim() || isGenerating) return;
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      // Map speed (0.5 - 2.0) to rate string
      const ratePct = Math.round((speed - 1.0) * 100);
      const rateStr = ratePct >= 0 ? `+${ratePct}%` : `${ratePct}%`;

      // Map pitch (-50 to +50) to pitch string
      const pitchStr = pitch >= 0 ? `+${pitch}Hz` : `${pitch}Hz`;

      const response = await fetch("/api/synthesize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice: selectedVoice,
          rate: rateStr,
          pitch: pitchStr,
          volume: "+0%",
        }),
      });

      if (!response.ok) {
        let errDesc = "语音合成失败，请稍后重试";
        try {
          const errJson = await response.json();
          if (errJson?.error) errDesc = errJson.error;
        } catch {
          // ignore
        }
        throw new Error(errDesc);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Estimate duration based on text length or read from audio element
      const charCount = text.length;
      const isEnglish = !/[\u4e00-\u9fa5]/.test(text);
      const estSeconds = Math.max(
        1.5,
        Number(((isEnglish ? text.split(/\s+/).length / 2.6 : charCount / 4.2) / speed).toFixed(1))
      );

      const voiceMeta = getVoiceByValue(selectedVoice);
      const voiceDisplayName = voiceMeta ? voiceMeta.displayName : selectedVoice;

      const newClip: TTSClip = {
        id: `clip-${Date.now()}`,
        text,
        voiceId: selectedVoice,
        voiceName: voiceDisplayName,
        language: selectedLocale,
        speed,
        pitch,
        duration: estSeconds,
        createdAt: new Date().toLocaleTimeString(),
        audioBlobUrl: audioUrl,
      };

      setCurrentClip(newClip);
      setHistory((prev) => [newClip, ...prev.slice(0, 19)]);
      setSuccessNotice("语音合成成功！");
      setTimeout(() => setSuccessNotice(null), 3000);
    } catch (err: any) {
      console.error("Synthesize API error:", err);
      setErrorMessage(err?.message || "网络异常或请求超时，请重试");
    } finally {
      setIsGenerating(false);
    }
  }, [text, isGenerating, speed, pitch, selectedVoice, selectedLocale]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black relative selection:bg-indigo-500/20">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 backdrop-blur-sm text-xs text-indigo-700 dark:text-indigo-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-medium">微软官方 Edge 神经语音引擎 · 实时在线合成</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            支持全球 140+ 语言及方言、400+ 自然高保真人声，毫秒级流式下发与高品质 MP3 实时导出。
          </p>
        </div>

        {/* Global Error Banner if any */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto flex items-center justify-between p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-xs shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="px-2 py-0.5 text-xs text-rose-600 hover:text-rose-800 dark:hover:text-rose-200"
            >
              关闭
            </button>
          </div>
        )}

        {/* Success Notice if any */}
        {successNotice && (
          <div className="max-w-4xl mx-auto flex items-center gap-2 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Global Configuration Bar */}
        <section className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Language Selector */}
            <LanguagePicker
              selectedLocale={selectedLocale}
              onSelectLocale={(loc) => setSelectedLocale(loc)}
            />

            {/* Voice Persona Selector with Live Audition */}
            <VoicePicker
              selectedLocale={selectedLocale}
              selectedVoice={selectedVoice}
              onSelectVoice={(voice) => setSelectedVoice(voice)}
            />
          </div>
        </section>

        {/* Core TTS Studio Workbench (2-Column Grid) */}
        <section id="studio" className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[540px]">
          {/* Left Column: Text Input & Acoustic Parameters */}
          <div className="lg:col-span-6 h-full">
            <TTSInputPanel
              text={text}
              setText={setText}
              speed={speed}
              setSpeed={setSpeed}
              pitch={pitch}
              setPitch={setPitch}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column: Audio Player & History */}
          <div className="lg:col-span-6 h-full">
            <TTSPlayerPanel
              currentClip={currentClip}
              history={history}
              onSelectClip={(clip) => setCurrentClip(clip)}
              isGenerating={isGenerating}
            />
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Zap className="w-4 h-4" />
                <h4 className="text-xs font-semibold uppercase tracking-wider">微软原生协议</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                基于全新 Sec-MS-GEC v2 算法与 WebSocket 长连接，免去第三方中转，极速下发纯净音频。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm space-y-1.5">
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="text-xs font-semibold uppercase tracking-wider">400+ 全球声音库</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                涵盖普通话、粤语、东北话、陕西话及各主流国际语言，支持男声、女声与多样化风格试听。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Headphones className="w-4 h-4" />
                <h4 className="text-xs font-semibold uppercase tracking-wider">高保真 MP3 导出</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                24kHz 采样率与 48kbps 工业标准编码，支持实时波形预览、定点拖拽试听与本地一键保存。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
