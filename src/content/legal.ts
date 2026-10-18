import type { ContentLocale } from "@/lib/content-locale";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalPageContent = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

const about: Record<ContentLocale, LegalPageContent> = {
  zh: {
    title: "关于我们",
    updated: "更新时间：2026年10月",
    sections: [
      {
        heading: "我们是谁",
        paragraphs: [
          "Online Text To Speech 是一款免费的在线文字转语音服务，基于高保真神经语音引擎，帮助用户将文本实时合成为自然流畅的多语种语音。",
          "我们支持 140+ 语种与 400+ 人声音色，并提供 MP3、WAV、OGG、PCM 等多种音频格式与采样率选项，方便用于学习、内容创作与无障碍场景。",
        ],
      },
      {
        heading: "我们的目标",
        paragraphs: [
          "让任何人都能快速、免费地获得可用的语音合成结果，无需安装软件或注册账号。界面简洁，从输入文本到下载音频只需几步。",
        ],
      },
      {
        heading: "免责声明",
        paragraphs: [
          "本服务按「现状」提供。请勿将本站用于违法、骚扰或侵犯他人权益的用途。用户对其输入内容与生成音频的使用自行负责。",
          "合成音质可能因语种、文本长度与网络状况而异；我们会持续改进体验，但不对特定商业结果作出保证。",
        ],
      },
    ],
  },
  en: {
    title: "About Us",
    updated: "Last updated: October 2026",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Online Text To Speech is a free online text-to-speech service powered by a high-fidelity neural voice engine. It helps you turn written text into natural, fluent speech in many languages in real time.",
          "We offer 140+ languages, 400+ voices, and formats such as MP3, WAV, OGG, and PCM with multiple sample rates—useful for learning, content creation, and accessibility.",
        ],
      },
      {
        heading: "Our goal",
        paragraphs: [
          "We want anyone to generate usable speech quickly and for free—no install and no account required. The interface stays simple: enter text, choose a voice, and download audio in a few steps.",
        ],
      },
      {
        heading: "Disclaimer",
        paragraphs: [
          "The service is provided “as is.” Do not use it for illegal activity, harassment, or anything that infringes others’ rights. You are responsible for your input and how you use the generated audio.",
          "Audio quality may vary by language, text length, and network conditions. We keep improving the experience but do not guarantee specific commercial outcomes.",
        ],
      },
    ],
  },
};

const contact: Record<ContentLocale, LegalPageContent> = {
  zh: {
    title: "联系我们",
    updated: "更新时间：2026年10月",
    sections: [
      {
        heading: "如何联系",
        paragraphs: [
          "如有产品建议、隐私相关问题或合作咨询，请发送邮件至：contact@onlinetexttospeech.com。",
          "我们会尽量在合理时间内回复。为便于处理，请在邮件中说明浏览器、操作系统与问题复现步骤。",
        ],
      },
      {
        heading: "反馈范围",
        paragraphs: [
          "欢迎反馈：合成失败、音质异常、界面错误、与 Cookie / 隐私相关的疑问，以及对新功能的建议。",
          "请勿在邮件中发送敏感个人信息或不宜公开的机密内容。",
        ],
      },
    ],
  },
  en: {
    title: "Contact Us",
    updated: "Last updated: October 2026",
    sections: [
      {
        heading: "How to reach us",
        paragraphs: [
          "For product feedback, privacy questions, or partnership inquiries, email contact@onlinetexttospeech.com.",
          "We aim to reply within a reasonable time. Please include your browser, operating system, and steps to reproduce the issue when reporting a bug.",
        ],
      },
      {
        heading: "What to write about",
        paragraphs: [
          "We welcome reports about synthesis failures, audio quality issues, UI bugs, Cookie/privacy questions, and feature ideas.",
          "Please do not send sensitive personal data or confidential material in email.",
        ],
      },
    ],
  },
};

const cookies: Record<ContentLocale, LegalPageContent> = {
  zh: {
    title: "Cookie 政策",
    updated: "更新时间：2026年10月",
    sections: [
      {
        heading: "什么是 Cookie",
        paragraphs: [
          "Cookie 以及浏览器本地存储（Local Storage）是小型数据片段，用于记住偏好、提升体验或支持网站必要功能。本站也会使用 Local Storage 记录与使用相关的本地状态。",
        ],
      },
      {
        heading: "我们使用的类型",
        paragraphs: [
          "必要功能：例如界面语言、明暗主题、每日字符使用额度计数，以及您是否已接受 Cookie 提示。这些数据保存在您的设备本地，用于维持基本体验。",
          "可选 / 未来用途：若日后接入广告或分析服务（例如 Google AdSense），可能使用相关 Cookie 来衡量展示或改进内容。在接入前，我们不会加载广告脚本。",
        ],
      },
      {
        heading: "如何管理",
        paragraphs: [
          "您可通过浏览器设置清除 Cookie 与网站数据，或阻止部分存储。清除后，语言偏好、主题与额度计数等本地状态可能被重置。",
          "首页底部的 Cookie 横幅用于征求同意；选择「接受」后，我们会记住您的选择，避免反复打扰。更多隐私细节请参阅隐私政策。",
        ],
      },
    ],
  },
  en: {
    title: "Cookie Policy",
    updated: "Last updated: October 2026",
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "Cookies and browser local storage are small pieces of data used to remember preferences, improve experience, or support essential site features. This site also uses Local Storage for local usage state.",
        ],
      },
      {
        heading: "What we use",
        paragraphs: [
          "Essential: UI language, light/dark theme, daily character quota counters, and whether you accepted the cookie notice. These stay on your device to keep the core experience working.",
          "Optional / future: if we later add advertising or analytics (for example Google AdSense), related cookies may be used to measure delivery or improve content. We do not load ad scripts until that happens.",
        ],
      },
      {
        heading: "How to manage them",
        paragraphs: [
          "You can clear cookies and site data in your browser settings, or block some storage. After clearing, language, theme, and quota counters may reset.",
          "The cookie banner at the bottom of the site asks for consent. Choosing Accept stores your choice so we do not ask repeatedly. See the Privacy Policy for more detail.",
        ],
      },
    ],
  },
};

const privacy: Record<ContentLocale, LegalPageContent> = {
  zh: {
    title: "隐私政策",
    updated: "更新时间：2026年10月",
    sections: [
      {
        heading: "1. 数据安全与隐私原则",
        paragraphs: [
          "我们重视您的隐私。Online Text To Speech 仅在您发起语音合成请求时，将输入文本传输至语音合成引擎进行实时处理。我们不会永久存储、出售或以无关方式共享您的文本内容或生成的音频。",
        ],
      },
      {
        heading: "2. 本地数据与 Cookies",
        paragraphs: [
          "本站在浏览器端使用必要的 Cookie / Local Storage，用于每日字符限额、语言与主题偏好，以及 Cookie 同意状态。这些信息保存在您的设备上。详情见 Cookie 政策。",
        ],
      },
      {
        heading: "3. 第三方与广告",
        paragraphs: [
          "当前站点不嵌入广告脚本。若未来接入 Google AdSense 或类似服务，第三方可能使用 Cookie 提供广告或统计。届时我们将更新本政策，并继续提供 Cookie 相关说明与同意机制。",
          "合成请求会发往语音处理服务以完成转换；请勿提交您不希望经网络传输的敏感信息。",
        ],
      },
      {
        heading: "4. 音频归属权",
        paragraphs: [
          "通过本站生成的音频流归用户使用与分发，可用于配音、课件、播客等合法场景。请遵守适用法律与第三方平台规则。",
        ],
      },
      {
        heading: "5. 联系我们",
        paragraphs: [
          "如对本隐私政策有疑问，请联系 contact@onlinetexttospeech.com。",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: October 2026",
    sections: [
      {
        heading: "1. Privacy principles",
        paragraphs: [
          "We take privacy seriously. Online Text To Speech sends your text to the speech engine only when you request synthesis, for real-time processing. We do not permanently store, sell, or share your text or audio for unrelated purposes.",
        ],
      },
      {
        heading: "2. Local data and cookies",
        paragraphs: [
          "We use essential cookies / Local Storage in your browser for daily character limits, language and theme preferences, and cookie-consent state. This data stays on your device. See the Cookie Policy for details.",
        ],
      },
      {
        heading: "3. Third parties and advertising",
        paragraphs: [
          "We do not embed ad scripts today. If we later add Google AdSense or similar services, third parties may use cookies for ads or measurement. We will update this policy and keep cookie notices and consent controls in place.",
          "Synthesis requests are sent to a speech processing service to complete conversion. Do not submit sensitive information you do not want transmitted over the network.",
        ],
      },
      {
        heading: "4. Audio ownership",
        paragraphs: [
          "Audio generated through this site is yours to use and distribute for lawful purposes such as narration, courses, and podcasts. Follow applicable laws and third-party platform rules.",
        ],
      },
      {
        heading: "5. Contact",
        paragraphs: [
          "Questions about this privacy policy: contact@onlinetexttospeech.com.",
        ],
      },
    ],
  },
};

export const legalPages = {
  about,
  contact,
  cookies,
  privacy,
} as const;

export type LegalPageKey = keyof typeof legalPages;

export function getLegalContent(key: LegalPageKey, locale: ContentLocale): LegalPageContent {
  return legalPages[key][locale];
}
