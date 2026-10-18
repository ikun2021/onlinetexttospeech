"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Locale = "zh" | "en";

export const translations = {
  zh: {
    // Nav
    brandName: "TTS Studio",
    badgeNew: "Neural TTS",
    navStudio: "工作台",
    navVoices: "音色库",
    navDocs: "文档",
    navApi: "API 接口",
    
    // Hero
    heroBadge: "Next-Gen 神经网络文字转语音引擎",
    heroTitle: "文字转语音，赋予文字灵动自然的原声",
    heroSubtitle: "对标 Vercel 极简设计规范。多语种人声音色库、微调语速语调、即时波形播放器与高保真音频导出。",
    
    // Config Toolbar
    configLanguageLabel: "输出语种",
    configVoiceLabel: "人声音色画像",
    voicePlural: "个音色",
    searchLanguagesPlaceholder: "搜索语言或地区代码...",
    playerStudioTitle: "录音棚监听播放器",
    configSampleRateLabel: "采样音质",
    voicePreviewTitle: "试听音色",
    voicePreviewPlaying: "试听中...",
    sampleRateStudio: "48kHz Studio HD (无损)",
    sampleRateStandard: "24kHz Standard (高保真)",
    
    // Text Editor Panel
    editorTitle: "文本创作区",
    editorPlaceholder: "在此输入需要合成语音的文本内容，支持中英文混排、标点与停顿标记...",
    charCount: "字数",
    estDuration: "预估时长",
    speedLabel: "语速调节",
    pitchLabel: "音调微调",
    insertPause: "+ 插入停顿 [0.5s]",
    clearText: "清空",
    btnGenerate: "开始合成语音",
    btnGenerating: "AI 声学合成中...",
    shortcutHint: "快捷键: Cmd + Enter",
    
    // Quick Templates
    templateTitle: "快速模版",
    template1: "🚀 科技新品发布会",
    template2: "💼 商业产品推介",
    template3: "🎙️ 播客访谈开场",
    template4: "🌐 英文 Keynote 演讲",
    
    // Player Panel
    playerTitle: "语音合成与播放器",
    playerEmptyTitle: "等待合成音频",
    playerEmptyDesc: "在左侧输入文本，选择语种与人声后点击“开始合成语音”，即可在此处实时播放与导出。",
    btnPlay: "播放",
    btnPause: "暂停",
    btnStop: "停止",
    volume: "音量",
    playbackSpeed: "倍速",
    currentPlaying: "当前生成音频",
    btnDownloadMp3: "下载 MP3",
    btnDownloadWav: "下载 WAV",
    btnCopyText: "复制文本",
    textCopied: "已复制文本",
    
    // History Section
    historyTitle: "本次生成记录",
    historyEmpty: "暂无生成历史，点击“开始合成语音”创建第一条音频",
    rePlay: "播放",
    
    // Features Footer
    feat1Title: "48kHz 录音室母带音质",
    feat1Desc: "基于全新声学神经建模，还原人声气口、重音与自然的起伏语调",
    feat2Title: "毫秒级流式首包输出",
    feat2Desc: "端到端低延迟流式管线，长文本输入几乎瞬间获得首句音频流",
    feat3Title: "全场景无版权商用",
    feat3Desc: "合成音频完全归用户所有，适用于视频配音、播客、有声书与多媒体教学",
  },
  en: {
    // Nav
    brandName: "TTS Studio",
    badgeNew: "Neural TTS",
    navStudio: "Studio",
    navVoices: "Voices",
    navDocs: "Docs",
    navApi: "API",
    
    // Hero
    heroBadge: "Next-Gen Neural Text-to-Speech Engine",
    heroTitle: "Text to Speech, with human emotion & studio precision",
    heroSubtitle: "Engineered with Vercel design aesthetics. Rich voice personas, fine-grained speed & pitch control, real-time waveform player, and studio export.",
    
    // Config Toolbar
    configLanguageLabel: "Output Language",
    configVoiceLabel: "Voice Persona",
    voicePlural: "Voices",
    searchLanguagesPlaceholder: "Search languages or country codes...",
    playerStudioTitle: "Studio Monitor Player",
    configSampleRateLabel: "Audio Quality",
    voicePreviewTitle: "Preview Voice",
    voicePreviewPlaying: "Playing...",
    sampleRateStudio: "48kHz Studio HD (Lossless)",
    sampleRateStandard: "24kHz Standard (Hi-Fi)",
    
    // Text Editor Panel
    editorTitle: "Text Editor",
    editorPlaceholder: "Enter your text here to convert into natural speech. Supports mixed languages, punctuation, and pause markers...",
    charCount: "Characters",
    estDuration: "Est. Duration",
    speedLabel: "Speech Speed",
    pitchLabel: "Pitch Fine-tune",
    insertPause: "+ Insert Pause [0.5s]",
    clearText: "Clear",
    btnGenerate: "Generate Audio",
    btnGenerating: "Synthesizing Speech...",
    shortcutHint: "Shortcut: Cmd + Enter",
    
    // Quick Templates
    templateTitle: "Quick Presets",
    template1: "🚀 Tech Keynote Launch",
    template2: "💼 Business Product Pitch",
    template3: "🎙️ Podcast Intro",
    template4: "🌐 Global Tech Presentation",
    
    // Player Panel
    playerTitle: "Audio Synthesis & Waveform",
    playerEmptyTitle: "Ready for Synthesis",
    playerEmptyDesc: "Compose or paste your text on the left, adjust your voice & rate settings, then click 'Generate Audio' to preview and export.",
    btnPlay: "Play",
    btnPause: "Pause",
    btnStop: "Stop",
    volume: "Volume",
    playbackSpeed: "Speed",
    currentPlaying: "Active Synthesized Clip",
    btnDownloadMp3: "Download MP3",
    btnDownloadWav: "Download WAV",
    btnCopyText: "Copy Text",
    textCopied: "Text copied!",
    
    // History Section
    historyTitle: "Session History",
    historyEmpty: "No clips generated yet. Click 'Generate Audio' to produce your first clip.",
    rePlay: "Play",
    
    // Features Footer
    feat1Title: "48kHz Studio Master Audio",
    feat1Desc: "Powered by neural acoustic synthesis, capturing subtle breath, cadence, and intonation",
    feat2Title: "Sub-Second First Chunk Output",
    feat2Desc: "Ultra-low latency pipeline streams the initial phonemes in just tens of milliseconds",
    feat3Title: "Commercial Rights Included",
    feat3Desc: "Generated audio is 100% royalty-free for commercial podcasts, YouTube, audiobooks, and ads",
  },
};

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof translations)["zh"];
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("preferred_locale") as Locale | null;
    if (saved && (saved === "zh" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("preferred_locale", l);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
