"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { getVoicesForLocale, getVoiceByValue, VoiceItem } from "@/data/voices";
import { useI18n } from "@/lib/i18n";
import {
  Mic,
  Volume2,
  VolumeX,
  Check,
  ChevronDown,
  Search,
  Sparkles,
  Loader2,
  User,
} from "lucide-react";

interface VoicePickerProps {
  selectedLocale: string;
  selectedVoice: string;
  onSelectVoice: (voiceValue: string) => void;
}

export function VoicePicker({
  selectedLocale,
  selectedVoice,
  onSelectVoice,
}: VoicePickerProps) {
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const voices = useMemo(() => {
    return getVoicesForLocale(selectedLocale);
  }, [selectedLocale]);

  // Current voice info
  const currentVoice = useMemo(() => {
    return (
      getVoiceByValue(selectedVoice) ||
      voices.find((v) => v.value === selectedVoice) ||
      voices[0] ||
      null
    );
  }, [selectedVoice, voices]);

  // If selectedVoice is not in current locale list, default to the first voice of the locale
  useEffect(() => {
    if (voices.length > 0) {
      const exists = voices.some((v) => v.value === selectedVoice);
      if (!exists) {
        onSelectVoice(voices[0].value);
      }
    }
  }, [selectedLocale, voices, selectedVoice, onSelectVoice]);

  // Filter voices
  const filteredVoices = useMemo(() => {
    if (!searchQuery.trim()) return voices;
    const q = searchQuery.toLowerCase().trim();
    return voices.filter(
      (v) =>
        v.displayName.toLowerCase().includes(q) ||
        v.value.toLowerCase().includes(q) ||
        v.gender.toLowerCase().includes(q) ||
        (v.description && v.description.toLowerCase().includes(q))
    );
  }, [voices, searchQuery]);

  // Stop audio preview on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Play Voice Preview using real /api/synthesize
  const handlePreview = async (e: React.MouseEvent, voice: VoiceItem) => {
    e.stopPropagation();

    if (previewingVoice === voice.value) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPreviewingVoice(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsLoadingPreview(voice.value);
    setPreviewingVoice(null);

    const previewText =
      voice.localeCode.startsWith("zh")
        ? `你好，我是${voice.displayName.split(" ")[0]}，很高兴为你朗读这段文字。`
        : voice.localeCode.startsWith("ja")
        ? `こんにちは、${voice.name}です。どうぞよろしくお願いします。`
        : voice.localeCode.startsWith("ko")
        ? `안녕하세요, ${voice.name}입니다. 만나서 반갑습니다.`
        : `Hello, I'm ${voice.name}. Nice to read for you.`;

    try {
      const res = await fetch("/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: previewText,
          voice: voice.value,
          rate: "+0%",
          volume: "+0%",
          pitch: "+0Hz",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate preview audio");
      }

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPreviewingVoice(null);
      };
      audio.onerror = () => {
        setPreviewingVoice(null);
      };

      await audio.play();
      setPreviewingVoice(voice.value);
    } catch (err) {
      console.error("Preview audio error:", err);
    } finally {
      setIsLoadingPreview(null);
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-violet-500" />
          <span>{t.configVoiceLabel}</span>
        </span>
        {currentVoice && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
              currentVoice.gender === "Female"
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                : "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
            }`}
          >
            {currentVoice.gender === "Female" ? "女 Female" : "男 Male"}
          </span>
        )}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:border-violet-400 dark:hover:border-violet-500 text-left transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              currentVoice?.gender === "Female"
                ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400"
                : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
            }`}
          >
            <User className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate flex items-center gap-1.5">
              <span>{currentVoice?.displayName || "选择声音"}</span>
            </div>
            <div className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate font-mono">
              {currentVoice?.value || "Select voice"}
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-violet-500" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full min-w-[340px] max-w-[440px] rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box if more than 4 voices */}
          {voices.length > 4 && (
            <div className="p-2.5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索人声或特点..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
            </div>
          )}

          {/* Voices list */}
          <div className="max-h-80 overflow-y-auto p-1.5 space-y-1 custom-scrollbar">
            {filteredVoices.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-400">
                当前地区暂无匹配声音
              </div>
            ) : (
              filteredVoices.map((voice) => {
                const isSelected = voice.value === selectedVoice;
                const isPreviewing = previewingVoice === voice.value;
                const isLoading = isLoadingPreview === voice.value;

                return (
                  <div
                    key={voice.value}
                    onClick={() => {
                      onSelectVoice(voice.value);
                      setIsOpen(false);
                    }}
                    className={`group w-full flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-violet-50 dark:bg-violet-950/40 border border-violet-200/80 dark:border-violet-800/50"
                        : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          voice.gender === "Female"
                            ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-xs font-semibold ${
                              isSelected
                                ? "text-violet-900 dark:text-violet-200"
                                : "text-zinc-800 dark:text-zinc-200"
                            }`}
                          >
                            {voice.displayName}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                              voice.gender === "Female"
                                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                                : "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                            }`}
                          >
                            {voice.gender === "Female" ? "女" : "男"}
                          </span>
                        </div>

                        {voice.description && (
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                            {voice.description}
                          </div>
                        )}
                        <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                          {voice.value}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons: preview & checkmark */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Audio preview button */}
                      <button
                        type="button"
                        onClick={(e) => handlePreview(e, voice)}
                        disabled={isLoading}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isPreviewing
                            ? "bg-violet-600 text-white"
                            : "hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                        }`}
                        title="试听音色"
                      >
                        {isLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : isPreviewing ? (
                          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
