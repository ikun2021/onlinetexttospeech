"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import voices from "@/language";
import { useI18n, Locale } from "@/lib/i18n";
import {
  Play,
  Pause,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Volume2,
  Gauge,
  Sparkles,
} from "lucide-react";
import { AudioConvertError, convertMp3ToFormat, type ConvertibleFormat } from "@/lib/ffmpeg-audio";

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: "success" | "error" | "info";
}

const DAILY_LIMIT = 2000;
const formatOptions = ["mp3", "wav", "ogg", "pcm"];
const EDGE_SAMPLE_RATE = "24000";
const sampleRateOptions = ["8000", "16000", "24000", "32000", "48000"];

// Write string to DataView offset
function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

// Convert raw PCM buffer into playable WAV Blob
function pcmToWav(
  pcmBuffer: ArrayBuffer,
  sampleRate: number,
  numChannels = 1,
  bitsPerSample = 16
): Blob {
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcmBuffer.byteLength;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  new Uint8Array(buffer, 44).set(new Uint8Array(pcmBuffer));
  return new Blob([buffer], { type: "audio/wav" });
}

export function TTSFormCard() {
  const { locale, t } = useI18n();

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = useCallback(
    (title: string, description: string, type: "success" | "error" | "info" = "info") => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, title, description, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 4000);
    },
    []
  );

  // Daily Usage Tracking
  const [usageCount, setUsageCount] = useState<number>(0);

  useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const stored = localStorage.getItem("tts_usage");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today) {
          setUsageCount(parsed.count || 0);
          return;
        }
      }
      localStorage.setItem("tts_usage", JSON.stringify({ date: today, count: 0 }));
      setUsageCount(0);
    } catch {
      setUsageCount(0);
    }
  }, []);

  const remainingChars = DAILY_LIMIT - usageCount;

  // Language grouping structure
  const languageGroupOptions = useMemo(() => {
    const typedVoices = voices as Record<string, Record<string, { label: string; language: string; value: string }[]>>;
    return Object.keys(typedVoices).map((lang) => ({
      family: lang,
      regions: Object.keys(typedVoices[lang]),
    }));
  }, []);

  const [selectedLanguageGroup, setSelectedLanguageGroup] = useState<string>("Chinese (Mainland China)");

  // Sync selectedLanguageGroup when global locale changes
  useEffect(() => {
    let targetFamily = "Chinese";
    switch (locale) {
      case "en":
        targetFamily = "English";
        break;
      case "zh":
        targetFamily = "Chinese";
        break;
      case "ja":
        targetFamily = "Japanese";
        break;
      case "ko":
        targetFamily = "Korean";
        break;
      case "fr":
        targetFamily = "French";
        break;
      case "de":
        targetFamily = "German";
        break;
      case "id":
        targetFamily = "Indonesian";
        break;
      case "nl":
        targetFamily = "Dutch";
        break;
      case "tr":
        targetFamily = "Turkish";
        break;
      default:
        targetFamily = "English";
    }

    const typedVoices = voices as Record<string, Record<string, any[]>>;
    if (typedVoices[targetFamily]) {
      const firstRegion = Object.keys(typedVoices[targetFamily])[0];
      if (firstRegion) {
        setSelectedLanguageGroup(firstRegion);
      }
    }
  }, [locale]);

  // Voice options for the currently selected region
  const voiceOptions = useMemo(() => {
    const typedVoices = voices as Record<string, Record<string, { label: string; value: string }[]>>;
    const lang = Object.keys(typedVoices).find((l) =>
      Object.keys(typedVoices[l]).includes(selectedLanguageGroup)
    );
    if (!lang || !typedVoices[lang][selectedLanguageGroup]) return [];
    return typedVoices[lang][selectedLanguageGroup].map((v) => ({
      label: v.label,
      value: v.value,
    }));
  }, [selectedLanguageGroup]);

  // Form State
  const [state, setState] = useState({
    text:
      locale === "zh"
        ? "大家早上好！欢迎体验全新升级的在线文字转语音服务。基于先进的神经声学建模算法，赋予文字灵动纯净的原声表达。"
        : "Good morning! Welcome to the online text to speech studio. Powered by next-generation neural acoustic synthesis, giving your words natural human emotion.",
    voice: "zh-CN-XiaoxiaoNeural",
    rate: 0,
    volume: 0,
    format: "mp3",
    sampleRate: "24000",
  });

  // When voiceOptions changes, update default voice
  useEffect(() => {
    if (voiceOptions.length > 0) {
      const exists = voiceOptions.some((v) => v.value === state.voice);
      if (!exists) {
        setState((prev) => ({ ...prev, voice: voiceOptions[0].value }));
      }
    }
  }, [voiceOptions, state.voice]);

  // Audio & WaveSurfer Playback States
  const [isLoading, setIsLoading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<any>(null);
  const audioUrlRef = useRef<string | null>(null);
  const downloadUrlRef = useRef<string | null>(null);
  audioUrlRef.current = audioUrl;
  downloadUrlRef.current = downloadUrl;

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Cleanup URLs and WaveSurfer
  const revokeAudioUrls = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (downloadUrl && downloadUrl !== audioUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setDownloadUrl(null);
  }, [audioUrl, downloadUrl]);

  const destroyWaveSurfer = useCallback(() => {
    if (wavesurferRef.current) {
      try {
        wavesurferRef.current.destroy();
      } catch {
        // ignore
      }
      wavesurferRef.current = null;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, []);

  useEffect(() => {
    return () => {
      destroyWaveSurfer();
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
      if (downloadUrlRef.current && downloadUrlRef.current !== audioUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, [destroyWaveSurfer]);

  // Mount WaveSurfer automatically whenever audioUrl changes
  useEffect(() => {
    if (!audioUrl) return;

    let isDisposed = false;
    let ws: any = null;

    const setupWaveSurfer = async () => {
      // Allow DOM paint tick so waveformRef.current is attached
      await new Promise((resolve) => setTimeout(resolve, 80));
      if (isDisposed || !waveformRef.current) return;

      if (wavesurferRef.current) {
        try {
          wavesurferRef.current.destroy();
        } catch {
          // ignore
        }
        wavesurferRef.current = null;
      }

      try {
        const WaveSurferModule = (await import("wavesurfer.js")).default;
        if (isDisposed || !waveformRef.current) return;

        ws = WaveSurferModule.create({
          container: waveformRef.current,
          waveColor: "#93c5fd",
          progressColor: "#4f46e5",
          cursorColor: "#4338ca",
          cursorWidth: 2,
          barWidth: 3,
          barGap: 3,
          barRadius: 3,
          height: 100,
          normalize: true,
          url: audioUrl,
        });

        ws.on("ready", () => {
          if (isDisposed) return;
          const dur = ws.getDuration();
          setDuration(dur);
          setCurrentTime(0);
          ws.setPlaybackRate(playbackSpeed);
        });

        ws.on("timeupdate", (time: number) => {
          if (!isDisposed) setCurrentTime(time);
        });

        ws.on("play", () => {
          if (!isDisposed) setIsPlaying(true);
        });

        ws.on("pause", () => {
          if (!isDisposed) setIsPlaying(false);
        });

        ws.on("finish", () => {
          if (!isDisposed) {
            setIsPlaying(false);
            setCurrentTime(0);
          }
        });

        wavesurferRef.current = ws;
      } catch (err) {
        console.error("WaveSurfer setup error:", err);
      }
    };

    setupWaveSurfer();

    return () => {
      isDisposed = true;
      if (ws) {
        try {
          ws.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [audioUrl]);

  // Speed changer
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(speed);
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  // Build downloaded file name
  const buildDownloadFileName = () => {
    const cleanPrefix =
      state.text
        .replace(/[\s\p{P}\p{S}]/gu, "")
        .slice(0, 10) || "tts_audio";
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const timestamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    return `${cleanPrefix}_${timestamp}.${state.format}`;
  };

  const downloadAudio = () => {
    const url = downloadUrl || audioUrl;
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = buildDownloadFileName();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.text || state.text.trim() === "") {
      addToast(t.validationError, t.textRequired, "error");
      return;
    }

    const textLength = state.text.length;
    if (usageCount + textLength > DAILY_LIMIT) {
      addToast(
        t.limitExceeded,
        `${t.dailyLimitReached} (${usageCount}/${DAILY_LIMIT})`,
        "error"
      );
      return;
    }

    setIsLoading(true);
    setIsConverting(false);
    try {
      // Map rate & volume into Edge TTS percentages
      const rateStr = state.rate >= 0 ? `+${state.rate}%` : `${state.rate}%`;
      const volumeStr = state.volume >= 0 ? `+${state.volume}%` : `${state.volume}%`;

      const response = await fetch("/api/synthesize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: state.text,
          voice: state.voice,
          rate: rateStr,
          volume: volumeStr,
          pitch: "+0Hz",
          format: "mp3",
          sampleRate: EDGE_SAMPLE_RATE,
        }),
      });

      if (!response.ok) {
        let errDesc = t.conversionErrorDesc;
        try {
          const errJson = await response.json();
          if (errJson?.error) errDesc = errJson.error;
        } catch {
          // ignore
        }
        throw new Error(errDesc);
      }

      // Update daily usage count
      const newCount = usageCount + textLength;
      setUsageCount(newCount);
      try {
        const todayStr = new Date().toISOString().split("T")[0];
        localStorage.setItem("tts_usage", JSON.stringify({ date: todayStr, count: newCount }));
      } catch {
        // ignore
      }

      revokeAudioUrls();
      destroyWaveSurfer();

      const mp3Blob = await response.blob();
      const selectedFormat = state.format;
      const sampleRate = parseInt(state.sampleRate, 10) || 24000;
      const needsConvert = selectedFormat !== "mp3" || String(sampleRate) !== EDGE_SAMPLE_RATE;

      let playBlob = mp3Blob;
      let downBlob = mp3Blob;

      if (needsConvert) {
        setIsConverting(true);
        const converted = await convertMp3ToFormat(
          mp3Blob,
          selectedFormat as ConvertibleFormat,
          sampleRate
        );
        if (selectedFormat === "pcm") {
          downBlob = converted;
          playBlob = pcmToWav(await converted.arrayBuffer(), sampleRate);
        } else {
          playBlob = converted;
          downBlob = converted;
        }
      }

      const newAudioUrl = URL.createObjectURL(playBlob);
      const newDownloadUrl =
        downBlob === playBlob ? newAudioUrl : URL.createObjectURL(downBlob);

      setAudioUrl(newAudioUrl);
      setDownloadUrl(newDownloadUrl);
      addToast(t.conversionSuccess, t.conversionSuccessDesc, "success");
    } catch (err: any) {
      console.error("Synthesize error:", err);
      addToast(
        t.conversionError,
        err instanceof AudioConvertError
          ? t.convertFormatError
          : err?.message || t.conversionErrorDesc,
        "error"
      );
    } finally {
      setIsLoading(false);
      setIsConverting(false);
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border text-xs flex items-start gap-3 transition-all transform animate-in slide-in-from-top-3 ${
              toast.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                : toast.type === "error"
                ? "bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
            }`}
          >
            {toast.type === "success" && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            )}
            {toast.type === "info" && (
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="font-semibold">{toast.title}</div>
              <div className="text-zinc-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                {toast.description}
              </div>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Main UCard styled container */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* UFormField: text input with remaining characters indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              <label htmlFor="tts-text-input" className="tracking-wide">
                {t.formTextLabel} <span className="text-rose-500">*</span>
              </label>
              <span
                className={`font-mono transition-colors ${
                  remainingChars < 0 ? "text-rose-600 font-bold" : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {state.text.length} / {DAILY_LIMIT} ({t.remaining}: {remainingChars})
              </span>
            </div>

            <textarea
              id="tts-text-input"
              rows={8}
              value={state.text}
              onChange={(e) => setState({ ...state, text: e.target.value })}
              placeholder={t.formTextPlaceholder}
              className="w-full p-4 text-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y shadow-inner"
              required
            />
          </div>

          {/* UFormField: language & voice in horizontal flex */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Language Group Select */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap min-w-[70px]">
                {t.formLanguageLabel}
              </label>
              <div className="relative flex-1">
                <select
                  value={selectedLanguageGroup}
                  onChange={(e) => setSelectedLanguageGroup(e.target.value)}
                  className="w-full appearance-none px-4 py-2 text-xs rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors shadow-sm truncate pr-8"
                >
                  {languageGroupOptions.map((group) => (
                    <optgroup key={group.family} label={`── ${group.family} ──`}>
                      {group.regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Voice Select */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap min-w-[70px]">
                {t.formVoiceLabel}
              </label>
              <div className="relative flex-1">
                <select
                  value={state.voice}
                  onChange={(e) => setState({ ...state, voice: e.target.value })}
                  className="w-full appearance-none px-4 py-2 text-xs rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors shadow-sm truncate pr-8"
                >
                  {voiceOptions.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* UFormField: format & sampleRate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Format Select */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap min-w-[70px]">
                {t.formFormatLabel}
              </label>
              <div className="relative w-36 sm:w-44">
                <select
                  value={state.format}
                  onChange={(e) => setState({ ...state, format: e.target.value })}
                  className="w-full appearance-none px-4 py-2 text-xs rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors shadow-sm uppercase font-mono pr-8"
                >
                  {formatOptions.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt.toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Sample Rate Select */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap min-w-[70px]">
                {t.formSampleRateLabel}
              </label>
              <div className="relative w-36 sm:w-44">
                <select
                  value={state.sampleRate}
                  onChange={(e) => setState({ ...state, sampleRate: e.target.value })}
                  className="w-full appearance-none px-4 py-2 text-xs rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors shadow-sm font-mono pr-8"
                >
                  {sampleRateOptions.map((sr) => (
                    <option key={sr} value={sr}>
                      {sr} Hz
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Sliders: Rate & Volume */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* Rate Slider */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                  {t.formRateLabel}: {state.rate >= 0 ? `+${state.rate}` : state.rate}%
                </span>
                <button
                  type="button"
                  onClick={() => setState({ ...state, rate: 0 })}
                  className="text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  重置
                </button>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                step={5}
                value={state.rate}
                onChange={(e) => setState({ ...state, rate: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Volume Slider */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                  {t.formVolumeLabel}: {state.volume >= 0 ? `+${state.volume}` : state.volume}%
                </span>
                <button
                  type="button"
                  onClick={() => setState({ ...state, volume: 0 })}
                  className="text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  重置
                </button>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                step={5}
                value={state.volume}
                onChange={(e) => setState({ ...state, volume: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Section 3: Waveform Display and Playback (matching template) */}
          {audioUrl && (
            <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-indigo-50/50 to-zinc-50 dark:from-indigo-950/20 dark:to-zinc-950/60 border border-indigo-200/80 dark:border-indigo-900/50 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              {/* Header info bar */}
              <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300 font-mono pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                    {state.format} · {state.sampleRate}Hz
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {formatTime(currentTime)}
                  </span>
                  <span className="opacity-40">/</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* WaveSurfer waveform container */}
              <div ref={waveformRef} className="min-h-[100px] w-full cursor-pointer py-1" />

              {/* Player Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex items-center gap-3">
                  {/* Play / Pause Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full border border-indigo-500/30 bg-indigo-600 text-white flex items-center justify-center shadow-md hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title={isPlaying ? "暂停" : "播放"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Playback speed pills */}
                  <div className="flex items-center p-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-xs">
                    {[1.0, 1.25, 1.5, 2.0].map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => handleSpeedChange(spd)}
                        className={`px-2.5 py-1 rounded-full font-mono font-medium transition-all ${
                          playbackSpeed === spd
                            ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-300 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Audio Button */}
                <button
                  type="button"
                  onClick={downloadAudio}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-xs sm:text-sm shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-all cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {t.downloadButton} ({state.format.toUpperCase()})
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Submit Button (matching template) */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading || remainingChars < 0 || !state.text.trim()}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full text-base font-semibold border border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isConverting ? t.convertingButton : t.submittingButton}</span>
                </>
              ) : (
                <span>{t.submitButton}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
