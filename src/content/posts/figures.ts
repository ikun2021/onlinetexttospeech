import type { BlogFigure } from "./types";

export type { BlogFigure };

const figs = {
  workflow: {
    src: "/images/blog/workflow.svg",
    alt: {
      zh: "文字转语音流程：文本、音色、音频与波形预览",
      en: "TTS workflow from text and voice to audio waveform",
    },
    caption: {
      zh: "典型流程：粘贴文本 → 选择音色 → 生成 → 试听 / 下载",
      en: "Typical flow: paste text → choose voice → generate → preview / download",
    },
  },
  formats: {
    src: "/images/blog/formats.svg",
    alt: {
      zh: "PCM、WAV、MP3、Opus 等音频格式对比示意图",
      en: "Comparison of PCM, WAV, MP3, and Opus audio formats",
    },
    caption: {
      zh: "按用途选格式：剪辑用 WAV，分享用 MP3，开发可用 PCM，实时场景关注 Opus",
      en: "Choose by destination: WAV to edit, MP3 to share, PCM to process, Opus for realtime",
    },
  },
  waveform: {
    src: "/images/blog/waveform.svg",
    alt: {
      zh: "音频波形预览与语速音量调节示意",
      en: "Waveform preview with rate and volume controls",
    },
    caption: {
      zh: "先预览听感，再调节语速 / 音量，最后下载归档",
      en: "Preview first, adjust rate / volume, then download and archive",
    },
  },
  voices: {
    src: "/images/blog/voices.svg",
    alt: {
      zh: "女声、男声与语种选择示意",
      en: "Female, male, and locale voice selection",
    },
    caption: {
      zh: "先定语种地区，再选音色，并在同一项目中保持一致",
      en: "Lock language/locale, then voice—and stay consistent in a project",
    },
  },
  checklist: {
    src: "/images/blog/checklist.svg",
    alt: {
      zh: "合成前检查清单示意",
      en: "Pre-synthesis checklist illustration",
    },
    caption: {
      zh: "提交前确认文案、音色、格式与额度，减少失败与返工",
      en: "Confirm script, voice, format, and quota before you click generate",
    },
  },
  multilingual: {
    src: "/images/blog/multilingual.svg",
    alt: {
      zh: "中英分段合成再拼接示意",
      en: "Synthesize Chinese and English segments then join",
    },
    caption: {
      zh: "一种语言一段音频，再在时间轴拼接，发音通常更稳",
      en: "One language per clip, then stitch—pronunciation stays more stable",
    },
  },
  privacy: {
    src: "/images/blog/privacy.svg",
    alt: {
      zh: "隐私保护与敏感信息提示示意",
      en: "Privacy shield reminder for sensitive text",
    },
    caption: {
      zh: "不要粘贴密码、证件号与未公开机密到在线合成服务",
      en: "Never paste passwords, IDs, or unpublished secrets into online TTS",
    },
  },
  education: {
    src: "/images/blog/education.svg",
    alt: {
      zh: "课件幻灯片与旁白轨对应示意",
      en: "Course slide paired with a narration track",
    },
    caption: {
      zh: "一页幻灯片对应一段旁白，更新与返修成本更低",
      en: "One slide, one narration clip—cheaper to update and fix",
    },
  },
} as const satisfies Record<string, BlogFigure>;

type FigKey = keyof typeof figs;

/** Cover image key by post slug (all 50 posts get an illustration). */
const coverBySlug: Record<string, FigKey> = {
  "getting-started-online-tts": "workflow",
  "how-to-choose-a-voice": "voices",
  "speech-rate-and-volume": "waveform",
  "daily-character-limit": "checklist",
  "download-and-preview-audio": "waveform",
  "multilingual-tts-tips": "multilingual",
  "what-is-pcm": "formats",
  "what-is-wav": "formats",
  "what-is-mp3": "formats",
  "what-is-ogg": "formats",
  "what-is-opus": "formats",
  "pcm-vs-wav-vs-mp3": "formats",
  "when-to-use-pcm": "formats",
  "sample-rate-explained": "waveform",
  "tts-for-courseware": "education",
  "tts-for-podcasts": "waveform",
  "tts-for-accessibility": "waveform",
  "pauses-and-punctuation": "workflow",
  "mixed-chinese-english-scripts": "multilingual",
  "voice-preview-workflow": "voices",
  "tts-vs-human-recording": "voices",
  "tts-copyright-basics": "privacy",
  "common-tts-mistakes": "checklist",
  "audio-file-size-and-bandwidth": "formats",
  "privacy-when-using-tts": "privacy",
  "tts-faq": "checklist",
  "ogg-vs-opus": "formats",
  "batch-tts-productivity": "checklist",
  "prepare-script-for-tts": "workflow",
  "choose-format-for-video": "formats",
  "ssml-pause-basics": "waveform",
  "enrich-script-with-examples": "workflow",
  "homepage-workflow-checklist": "checklist",
  "make-product-demo-voiceover": "education",
  "customer-support-ivr-prompts": "voices",
  "youtube-voiceover-tips": "waveform",
  "elearning-quiz-audio": "education",
  "brand-voice-guidelines-tts": "voices",
  "fix-noisy-tts-audio": "waveform",
  "localize-tts-for-regions": "multilingual",
  "tts-for-notifications": "workflow",
  "compare-neural-vs-old-tts": "voices",
  "prepare-long-form-audiobook-style": "education",
  "optimize-for-mobile-listening": "waveform",
  "team-review-tts-takes": "checklist",
  "seo-content-with-tts-blog": "workflow",
  "avoid-monotone-delivery": "waveform",
  "glossary-for-tts-projects": "multilingual",
  "measure-tts-quality": "checklist",
  "from-faq-to-full-guide": "workflow",
};

export function getPostCover(slug: string): BlogFigure {
  const key = coverBySlug[slug] ?? "workflow";
  return figs[key];
}

export function getPostInlineFigure(slug: string): BlogFigure | null {
  const key = coverBySlug[slug];
  if (!key) return null;
  // Second figure: formats articles get waveform; others get checklist/workflow alternate
  if (key === "formats") return figs.waveform;
  if (key === "workflow") return figs.checklist;
  if (key === "voices") return figs.workflow;
  if (key === "education") return figs.waveform;
  if (key === "multilingual") return figs.voices;
  if (key === "privacy") return figs.checklist;
  if (key === "waveform") return figs.formats;
  if (key === "checklist") return figs.workflow;
  return figs.formats;
}
