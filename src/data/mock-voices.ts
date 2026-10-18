export interface VoiceProfile {
  id: string;
  name: string;
  nameEn: string;
  gender: "female" | "male" | "neutral";
  language: string;
  tag: string;
  tagEn: string;
  description: string;
  descriptionEn: string;
  sampleText: string;
  sampleTextEn: string;
  avatarSeed: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nameEn: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "zh-CN", name: "中文 (普通话)", nameEn: "Chinese (Mandarin)", flag: "🇨🇳" },
  { code: "en-US", name: "English (US)", nameEn: "English (US)", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", nameEn: "English (UK)", flag: "🇬🇧" },
  { code: "ja-JP", name: "日本語", nameEn: "Japanese", flag: "🇯🇵" },
  { code: "zh-HK", name: "粤语 (香港)", nameEn: "Cantonese (HK)", flag: "🇭🇰" },
  { code: "auto", name: "多语种自适应", nameEn: "Auto Multilingual", flag: "🌐" },
];

export const VOICES: VoiceProfile[] = [
  {
    id: "xiaoxiao",
    name: "晓晓 (Xiaoxiao)",
    nameEn: "Xiaoxiao",
    gender: "female",
    language: "zh-CN",
    tag: "自然温柔 · 播报",
    tagEn: "Gentle & Natural",
    description: "音质纯净细腻，发音清晰自然，适用于有声书、课件、客服质检与纪录片旁白。",
    descriptionEn: "Crystal clear and calm, ideal for audiobooks, education, and narration.",
    sampleText: "欢迎体验新一代智能文字转语音工作台，聆听清晰与科技的力量。",
    sampleTextEn: "Welcome to the next-generation intelligent text-to-speech studio.",
    avatarSeed: "xiaoxiao",
  },
  {
    id: "yunxi",
    name: "云希 (Yunxi)",
    nameEn: "Yunxi",
    gender: "male",
    language: "zh-CN",
    tag: "沉稳磁性 · 商务",
    tagEn: "Deep & Authoritative",
    description: "声线深邃厚重，富有叙事感染力，适合高端商业推介、科技发布会与产品演示。",
    descriptionEn: "Resonant and polished, tailored for business keynotes and product demos.",
    sampleText: "通过高精度的声学建模，每一段文字都能被赋予真实人类的情感起伏与质感。",
    sampleTextEn: "Powered by precision neural synthesis, every word comes alive.",
    avatarSeed: "yunxi",
  },
  {
    id: "alloy",
    name: "Alloy",
    nameEn: "Alloy",
    gender: "neutral",
    language: "en-US",
    tag: "科技干练 · 现代",
    tagEn: "Modern & Crisp",
    description: "平衡中性音色，富有现代数字化科技感，适用于开发者教程与产品讲解。",
    descriptionEn: "Balanced and modern, optimized for global tech engineering tutorials.",
    sampleText: "Welcome to the future of neural voice synthesis. Fast, scalable, and studio grade.",
    sampleTextEn: "Welcome to the future of neural voice synthesis. Fast, scalable, and studio grade.",
    avatarSeed: "alloy",
  },
  {
    id: "nova",
    name: "Nova",
    nameEn: "Nova",
    gender: "female",
    language: "en-US",
    tag: "活力清亮 · 播客",
    tagEn: "Bright & Energetic",
    description: "富有热情与感染力，发音生动自然，适合播客旁白与多媒体互动短视频。",
    descriptionEn: "Bright and conversational, excellent for podcasts, YouTube, and promos.",
    sampleText: "Transform text into expressive, studio-quality speech with unprecedented realism.",
    sampleTextEn: "Transform text into expressive, studio-quality speech with unprecedented realism.",
    avatarSeed: "nova",
  },
  {
    id: "echo",
    name: "Echo",
    nameEn: "Echo",
    gender: "male",
    language: "en-US",
    tag: "深邃旁白 · 影视",
    tagEn: "Deep Cinema",
    description: "经典广播与影视纪录片质感，沉着低回，语调稳定，引人入胜。",
    descriptionEn: "Cinematic depth and smooth pacing for complex storytelling and documentaries.",
    sampleText: "Precision at the speed of thought. Your text synthesized into timeless audio.",
    sampleTextEn: "Precision at the speed of thought. Your text synthesized into timeless audio.",
    avatarSeed: "echo",
  },
];

export interface TTSClip {
  id: string;
  text: string;
  voiceId: string;
  voiceName: string;
  language: string;
  speed: number;
  pitch: number;
  duration: number;
  createdAt: string;
  audioBlobUrl?: string;
}

export const TTS_TEMPLATES = [
  {
    id: "tech_launch",
    titleZh: "🚀 科技新品发布会",
    titleEn: "🚀 Tech Keynote Launch",
    textZh: "大家早上好！欢迎来到 2026 年度技术创新峰会。今天，我们正式推出全新一代基于边缘计算与神经声学建模的实时语音生成系统，让每一个开发者都能随心打造拥有自然人类情感的智能声音。",
    textEn: "Good morning everyone! Welcome to the 2026 Tech Keynote. Today, we are thrilled to unveil our next-generation neural speech synthesis engine, empowering creators to generate lifelike voices with effortless studio control.",
  },
  {
    id: "product_pitch",
    titleZh: "💼 商业产品推介",
    titleEn: "💼 Business Product Pitch",
    textZh: "我们的企业级智能语音解决方案，具备 48kHz 超高清采样率与极低的合成延迟。无论是有声书配音、视频解说还是跨国多语种客户服务，都能为您提供极致自然流畅的表现力与商业交付标准。",
    textEn: "Our enterprise audio suite delivers 48kHz studio-grade fidelity with sub-second latency. Whether you're producing audiobooks, video narrations, or global support, it offers unparalleled natural fluency.",
  },
  {
    id: "podcast_intro",
    titleZh: "🎙️ 播客访谈开场",
    titleEn: "🎙️ Podcast Intro",
    textZh: "嗨，大家好！欢迎收听本期的极客前线播客！今天我们邀请到多位来自开源社区的核心贡献者，一起聊聊前端架构、极简设计美学以及生成式 AI 在工程化落地中的最新探索。",
    textEn: "Hey everyone, welcome back to another episode of Developer Pulse! Today we're joined by core open-source engineers to explore modern web architectures and generative audio workflows.",
  },
  {
    id: "global_speech",
    titleZh: "🌐 英文技术指南",
    titleEn: "🌐 English Keynote",
    textZh: "Transform written text into crystal-clear voiceovers in seconds. Optimized for high performance, modern web applications, and developer productivity.",
    textEn: "Transform written text into crystal-clear voiceovers in seconds. Optimized for high performance, modern web applications, and developer productivity.",
  },
];

export interface TranscriptSegment {
  id: number;
  speaker: string;
  start: string;
  end: string;
  text: string;
  confidence: number;
}

export interface TranscriptionResult {
  duration: number;
  language: string;
  detectedVoice: string;
  model: string;
  fullText: string;
  segments: TranscriptSegment[];
}

export const DEMO_PRESETS: Record<string, TranscriptionResult> = {
  demo1: {
    duration: 24.8,
    language: "zh-CN",
    detectedVoice: "晓晓 & 云希",
    model: "Whisper Large-v3 Pro",
    fullText: "语音合成与转录多模态系统已完成初始化。",
    segments: [
      {
        id: 1,
        speaker: "Speaker 1",
        start: "00:00.000",
        end: "00:05.000",
        text: "语音合成与转录多模态系统已完成初始化。",
        confidence: 0.99,
      },
    ],
  },
};

