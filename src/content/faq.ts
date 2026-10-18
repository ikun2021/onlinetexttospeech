import type { ContentLocale } from "@/lib/content-locale";

export type FaqItem = {
  question: Record<ContentLocale, string>;
  answer: Record<ContentLocale, string>;
};

/** Homepage FAQ: how to use + how to enrich scripts (10 items). */
export const homepageFaqs: FaqItem[] = [
  {
    question: {
      zh: "如何开始使用在线文字转语音？",
      en: "How do I start using online text to speech?",
    },
    answer: {
      zh: "在首页文本框粘贴或输入内容，选择输出语种与人声音色，确认音频格式与采样率后点击「开始生成语音」。建议先用一两句短文本试听，满意后再合成完整文稿并下载。",
      en: "Paste or type text on the home page, choose language and voice, confirm format and sample rate, then click Convert to Speech. Preview with one or two short sentences before rendering the full script and downloading.",
    },
  },
  {
    question: {
      zh: "如何让合成的声音更自然？",
      en: "How can I make the speech sound more natural?",
    },
    answer: {
      zh: "把长句拆短，补上逗号与句号以形成气口；专有名词用常用写法；先锁定音色再批量生成。语速默认即可，教学向内容可略降。标点与文案质量往往比反复调参更重要。",
      en: "Split long sentences, add commas and periods for breath, use common spellings for names, and lock a voice before batching. Default rate is fine; slow slightly for lessons. Punctuation and copy usually matter more than endless slider tweaks.",
    },
  },
  {
    question: {
      zh: "怎样丰富旁白文案，避免空洞？",
      en: "How do I enrich narration so it is not empty?",
    },
    answer: {
      zh: "用具体步骤、数字、对比与场景替换空泛形容词。例如说明「先试听再下载」「WAV 适合剪辑、MP3 适合分享」。每个观点加一句使用场景，并去掉重复修饰，信息密度会明显高于堆砌「很好、非常」。",
      en: "Replace vague adjectives with steps, numbers, contrasts, and scenarios—e.g. preview before download, WAV for editing, MP3 for sharing. Add one use-case line per idea and cut repeated fluff for higher information density.",
    },
  },
  {
    question: {
      zh: "MP3、WAV、PCM 应该怎么选？",
      en: "Which format should I choose: MP3, WAV, or PCM?",
    },
    answer: {
      zh: "日常分享与上传优先 MP3；进入剪辑时间线做母带优先 WAV；需要程序处理原始样本时选 PCM。不要多次在有损格式之间互转，应保留一份干净母带再导出发布格式。",
      en: "Prefer MP3 for sharing and uploads, WAV as an editing master, and PCM when code must touch raw samples. Avoid bouncing between lossy formats—keep a clean master, then export for delivery.",
    },
  },
  {
    question: {
      zh: "每日字符额度不够用怎么办？",
      en: "What if I hit the daily character limit?",
    },
    answer: {
      zh: "试听只用短句，定稿后再合成长文；按段落拆分请求并在剪辑中拼接。精简重复句子，次日再继续未完成章节。额度记在浏览器本地，请勿依赖反复失败重试来「试参数」。",
      en: "Preview with short lines and synthesize long copy only when locked; split by paragraph and stitch in an editor. Trim repeats and continue next day if needed. Quota is local—don’t burn it on endless failed parameter tests.",
    },
  },
  {
    question: {
      zh: "中英混排文本如何处理更好？",
      en: "How should I handle mixed Chinese–English text?",
    },
    answer: {
      zh: "尽量按语种分段分别合成再拼接。必须夹杂的英文专名可用空格或逗号隔开并单独试听。品牌名与缩写写入读音表，听感异常时先改写法，而不是盲目换很多音色。",
      en: "Synthesize language segments separately when possible, then join. Isolate unavoidable English names with spaces or commas and preview them. Keep a pronunciation glossary; fix spelling before swapping many voices.",
    },
  },
  {
    question: {
      zh: "如何为课件或视频丰富解说内容？",
      en: "How do I enrich courseware or video commentary?",
    },
    answer: {
      zh: "按页或按镜头写旁白，一镜一句；补充「为什么这样做」的一句解释与常见误区。关键术语首次重复关键词。母带用 WAV，发布用 MP3，并提供文稿方便学习与无障碍访问。",
      en: "Write one line per slide or shot; add a why-it-matters line and a common mistake. Repeat key terms once on first use. Use WAV masters, MP3 for publish, and provide a transcript for learning and accessibility.",
    },
  },
  {
    question: {
      zh: "Opus 和 OGG 是一回事吗？",
      en: "Are Opus and OGG the same thing?",
    },
    answer: {
      zh: "不是。OGG 主要是容器，Opus 是一种音频编解码器；常见组合是 Ogg 容器承载 Opus，但并非必然。本站可先导出 WAV/PCM，再按下游需要转码。对外交付时请注明容器与编码，避免对方打不开。",
      en: "No. OGG is mainly a container; Opus is a codec. Ogg+Opus is common but not guaranteed. Export WAV/PCM here, then transcode if needed. Label container and codec on delivery so recipients can open the file.",
    },
  },
  {
    question: {
      zh: "生成失败或无法播放怎么排查？",
      en: "What should I check if synthesis or playback fails?",
    },
    answer: {
      zh: "依次检查：文本是否为空、是否超额度、网络是否中断、语种是否选错、浏览器是否拦截自动播放。PCM 可能需封装为 WAV 才能双击播放。仍失败可更换格式重试，或邮件联系 support 并附浏览器信息。",
      en: "Check empty input, quota, network, language mismatch, and autoplay blocks. Raw PCM may need a WAV wrapper to open. Retry another format, or email support with your browser details.",
    },
  },
  {
    question: {
      zh: "想做多语言内容，怎样系统性地丰富？",
      en: "How do I systematically enrich multilingual content?",
    },
    answer: {
      zh: "先定母语定稿与声音规范，再翻译并二次口语化；维护「语种 × 音色 × 术语读音」表。每条语言用同一结构的场景例子，避免有的语言很详、有的很空。博客与 FAQ 互链，把短问答扩展成完整指南，形成持续更新的内容层。",
      en: "Lock a source script and voice guide, then translate and rewrite for speech; maintain a locale × voice × glossary table. Give every language the same scenario depth. Cross-link FAQ and blog posts so short answers grow into full guides over time.",
    },
  },
];

export function getHomepageFaqs(locale: ContentLocale) {
  return homepageFaqs.map((item) => ({
    question: item.question[locale],
    answer: item.answer[locale],
  }));
}
