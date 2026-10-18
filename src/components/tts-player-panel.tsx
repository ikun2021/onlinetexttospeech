"use client";

import React, { useState, useEffect, useRef } from "react";
import { TTSClip } from "@/data/mock-voices";
import { useI18n } from "@/lib/i18n";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Copy,
  Check,
  Music,
  Sparkles,
  History,
  Headphones,
} from "lucide-react";

interface TTSPlayerPanelProps {
  currentClip: TTSClip | null;
  history: TTSClip[];
  onSelectClip: (clip: TTSClip) => void;
  isGenerating: boolean;
}

export function TTSPlayerPanel({
  currentClip,
  history,
  onSelectClip,
  isGenerating,
}: TTSPlayerPanelProps) {
  const { t } = useI18n();

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize or change audio element when currentClip changes
  useEffect(() => {
    if (!currentClip) {
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current = null;
      }
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    if (currentClip.audioBlobUrl) {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }

      const audio = new Audio(currentClip.audioBlobUrl);
      audioElRef.current = audio;
      audio.playbackRate = playbackSpeed;
      audio.muted = isMuted;

      audio.onloadedmetadata = () => {
        setDuration(audio.duration || currentClip.duration || 0);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
      };

      // Auto play new generation
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be blocked by browser policy until user interaction
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
    };
  }, [currentClip]);

  // Update speed
  useEffect(() => {
    if (audioElRef.current) {
      audioElRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Update mute
  useEffect(() => {
    if (audioElRef.current) {
      audioElRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!audioElRef.current) return;

    if (isPlaying) {
      audioElRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Failed to play audio:", err);
      });
    }
  };

  // Seek on progress bar / waveform click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioElRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = percent * duration;
    audioElRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  // Download real MP3
  const handleDownload = () => {
    if (!currentClip || !currentClip.audioBlobUrl) return;
    const a = document.createElement("a");
    a.href = currentClip.audioBlobUrl;
    a.download = `edge-tts-${currentClip.voiceId}-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Copy text to clipboard
  const handleCopy = () => {
    if (!currentClip) return;
    navigator.clipboard.writeText(currentClip.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Draw audio waveform animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw subtle background grid line
      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      const bars = 64;
      const barWidth = width / bars;
      const activeDuration = duration || 1;
      const progressPercent = activeDuration > 0 ? currentTime / activeDuration : 0;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth + barWidth / 4;
        const barPercent = i / bars;
        const isPassed = barPercent <= progressPercent;

        // Wave formula based on pseudo-random height modulated by sine wave
        const seed = Math.sin(i * 0.45) * Math.cos(i * 0.28);
        const dynamicFactor = isPlaying ? Math.sin(phase + i * 0.3) * 0.35 + 0.65 : 0.4;
        const barHeight = Math.max(4, Math.abs(seed) * (height * 0.75) * dynamicFactor);

        if (isPassed) {
          const grad = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
          grad.addColorStop(0, "#818cf8");
          grad.addColorStop(1, "#c084fc");
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
        }

        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth / 2, barHeight, 2);
        ctx.fill();
      }

      if (isPlaying) {
        phase += 0.08;
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentTime, duration]);

  const formatSec = (sec: number) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Active Audio Player Card */}
      <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t.playerStudioTitle || "录音棚监听播放器"}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {currentClip
                  ? `${currentClip.voiceName || currentClip.voiceId} • 24kHz 48kbps MP3`
                  : isGenerating
                  ? "正在通过微软边缘神经网络合成高品质音频..."
                  : "准备就绪，点击合成即时试听与下载"}
              </p>
            </div>
          </div>

          {currentClip && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="复制朗读文本"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下载 MP3</span>
              </button>
            </div>
          )}
        </div>

        {/* Waveform Visualization area */}
        <div className="my-5">
          <div
            onClick={handleSeek}
            className="relative h-20 w-full rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/60 overflow-hidden cursor-pointer group flex items-center justify-center"
          >
            <canvas ref={canvasRef} width={600} height={80} className="w-full h-full" />

            {/* Hover seek indicator */}
            <div className="absolute inset-0 pointer-events-none group-hover:bg-indigo-500/5 transition-colors" />

            {!currentClip && !isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-400 gap-1.5">
                <Music className="w-4 h-4 opacity-50" />
                <span>合成后在此处显示音频波形与实时播放器</span>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-indigo-500 gap-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
                <span className="font-medium">边缘神经语音生成中...</span>
              </div>
            )}
          </div>

          {/* Time indicators */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-2 px-1">
            <span>{formatSec(currentTime)}</span>
            <span>{formatSec(duration || currentClip?.duration || 0)}</span>
          </div>
        </div>

        {/* Control toolbar */}
        <div className="flex items-center justify-between pt-2">
          {/* Left: Replay / Reset */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={!currentClip}
              onClick={() => {
                if (audioElRef.current) {
                  audioElRef.current.currentTime = 0;
                  setCurrentTime(0);
                }
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
              title="重头播放"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={!currentClip}
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
              title={isMuted ? "取消静音" : "静音"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Center: Play / Pause Big Button */}
          <button
            type="button"
            disabled={!currentClip}
            onClick={togglePlay}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${
              currentClip
                ? "bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25 hover:scale-105 active:scale-95"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Right: Playback Speed selector */}
          <div className="flex items-center gap-1">
            {[1.0, 1.25, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                disabled={!currentClip}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors ${
                  playbackSpeed === spd
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                } disabled:opacity-40`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* History Panel */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-zinc-400" />
            <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              {t.historyTitle || "本次会话生成记录"}
            </h4>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            {history.length} {history.length === 1 ? "Clip" : "Clips"}
          </span>
        </div>

        {history.length === 0 ? (
          <div className="py-6 text-center text-xs text-zinc-400">
            暂无生成记录，输入文本后点击“生成高质量语音”
          </div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {history.map((clip) => {
              const isSelected = currentClip?.id === clip.id;

              return (
                <div
                  key={clip.id}
                  onClick={() => onSelectClip(clip)}
                  className={`group p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-950/30"
                      : "border-zinc-100 dark:border-zinc-800/80 hover:border-zinc-200 dark:hover:border-zinc-700 bg-zinc-50/40 dark:bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                      {clip.text}
                    </p>
                    <span className="text-[10px] text-zinc-400 shrink-0 font-mono">
                      {formatSec(clip.duration)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100/80 dark:border-zinc-800/60 text-[10px] text-zinc-400">
                    <span className="font-medium text-zinc-600 dark:text-zinc-300">
                      {clip.voiceName || clip.voiceId}
                    </span>
                    <span>{clip.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
