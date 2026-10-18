"use client";

import React, { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { TTS_TEMPLATES } from "@/data/mock-voices";
import {
  Sparkles,
  Sliders,
  Trash2,
  Clock,
  Type,
  PauseCircle,
  Command,
  ArrowRight,
} from "lucide-react";

interface TTSInputPanelProps {
  text: string;
  setText: (t: string) => void;
  speed: number;
  setSpeed: (s: number) => void;
  pitch: number;
  setPitch: (p: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function TTSInputPanel({
  text,
  setText,
  speed,
  setSpeed,
  pitch,
  setPitch,
  onGenerate,
  isGenerating,
}: TTSInputPanelProps) {
  const { locale, t } = useI18n();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Character count & estimated duration
  const charCount = text.length;
  const isEnglish = !/[\u4e00-\u9fa5]/.test(text) && text.trim().length > 0;
  const wordsOrChars = isEnglish ? text.trim().split(/\s+/).filter(Boolean).length : charCount;
  const estSeconds = Math.max(
    0,
    Number(((isEnglish ? wordsOrChars / 2.6 : wordsOrChars / 4.2) / speed).toFixed(1))
  );

  // Insert pause tag at cursor
  const handleInsertPause = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const pauseTag = " [0.5s] ";
    const newText = text.substring(0, start) + pauseTag + text.substring(end);
    setText(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + pauseTag.length, start + pauseTag.length);
    }, 0);
  };

  // Keyboard shortcut Cmd/Ctrl + Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (text.trim() && !isGenerating) {
        onGenerate();
      }
    }
  };

  // Load template
  const handleLoadTemplate = (templateId: string) => {
    const tmpl = TTS_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;
    setText(locale === "zh" ? tmpl.textZh : tmpl.textEn);
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header with Template Presets */}
      <div className="border-b border-zinc-200 dark:border-zinc-800/80 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              {t.editorTitle}
            </span>
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1">
              <span>{t.charCount}:</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{charCount}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>{t.estDuration}:</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">~{estSeconds}s</span>
            </span>
          </div>
        </div>

        {/* Quick Template Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] text-zinc-400 shrink-0 font-medium mr-1">
            {t.templateTitle}:
          </span>
          {TTS_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => handleLoadTemplate(tmpl.id)}
              className="px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors shrink-0 text-xs shadow-2xs"
            >
              {locale === "zh" ? tmpl.titleZh : tmpl.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="p-4 flex-1 flex flex-col min-h-[220px]">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.editorPlaceholder}
          className="w-full flex-1 resize-none bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none leading-relaxed tracking-wide font-sans"
        />

        {/* Auxiliary tools bar */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleInsertPause}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-colors"
              title="在光标处插入停顿"
            >
              <PauseCircle className="w-3.5 h-3.5" />
              <span>{t.insertPause}</span>
            </button>
          </div>

          {text.length > 0 && (
            <button
              type="button"
              onClick={() => setText("")}
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearText}</span>
            </button>
          )}
        </div>
      </div>

      {/* Acoustic Parameters (Speed & Pitch Sliders) */}
      <div className="border-t border-zinc-200 dark:border-zinc-800/80 p-4 bg-zinc-50/30 dark:bg-zinc-900/20 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                {t.speedLabel}
              </span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">
                {speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>0.5x</span>
              <span>1.0x (Normal)</span>
              <span>2.0x</span>
            </div>
          </div>

          {/* Pitch Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                {t.pitchLabel}
              </span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">
                {pitch > 0 ? `+${pitch}%` : `${pitch}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="5"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>-50% (Deep)</span>
              <span>0% (Default)</span>
              <span>+50% (High)</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={!text.trim() || isGenerating}
            onClick={onGenerate}
            className={`w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
              isGenerating
                ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                : text.trim()
                ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-90 active:scale-[0.99] cursor-pointer"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-zinc-400 border-t-white animate-spin" />
                <span>{t.btnGenerating}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-600" />
                <span>{t.btnGenerate}</span>
                <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800 ml-1 opacity-70">
                  <Command className="w-2.5 h-2.5" /> Enter
                </span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
