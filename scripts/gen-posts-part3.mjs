import { writeFileSync } from "fs";

const padZh =
  "结合本站在线文字转语音：先短句试听再定稿合成，按用途选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，把方法落成可重复流程。";
const padEn =
  "On this site: preview short lines, lock the script, pick MP3, WAV, or PCM by use case, and watch daily quota plus privacy so the method becomes repeatable.";

function zhLen(sections) {
  return sections.map((s) => s.heading + s.paragraphs.join("")).join("").length;
}

function ensureLen(body) {
  while (zhLen(body.zh) < 420) {
    body.zh[body.zh.length - 1].paragraphs.push(padZh);
    body.en[body.en.length - 1].paragraphs.push(padEn);
  }
  return body;
}

const raw = [
  {
    slug: "ssml-pause-basics",
    date: "2026-10-04",
    tags: ["guide", "script"],
    title: { zh: "用停顿与语气让旁白更像真人", en: "Pauses and Tone That Sound More Human" },
    description: {
      zh: "不依赖复杂标记时，如何用标点、分段与试听提升自然度。",
      en: "Improve naturalness with punctuation, segmentation, and previews—without complex markup.",
    },
    body: {
      zh: [
        {
          heading: "标点与分段代替复杂标记",
          paragraphs: [
            "即便界面未提供完整 SSML 编辑器，你仍可用句号、逗号、问号控制气口，把长段拆成意群分别合成再拼接。需要强调的关键词单独成句，比堆叠感叹号更有效。试听时重点听句尾是否被切断、问句是否上扬不足。",
            "同一项目固定语速后，用停顿差异制造节奏，而不是每句都改参数。文档里记录「何处留白」，方便团队复用。",
          ],
        },
        {
          heading: "从短样到成片",
          paragraphs: [
            "先用包含问句与列举的短样验证停顿策略，再扩展到全文。导出 WAV 母带，在时间轴微调间隙 200–400 毫秒。这样即使没有高级标记语言，旁白也能更接近真人讲解的呼吸感。",
          ],
        },
      ],
      en: [
        {
          heading: "Punctuation instead of complex markup",
          paragraphs: [
            "Even without a full SSML editor, periods, commas, and questions shape breath. Split long ideas, synthesize, and join. Emphasize with short sentences, not stacked exclamation marks. Preview cut-offs and weak question intonation.",
            "Lock rate, then vary pauses—not every slider. Document where silence belongs so teammates reuse it.",
          ],
        },
        {
          heading: "From sample to final",
          paragraphs: [
            "Validate pause strategy on a short sample with questions and lists, then expand. Export WAV and nudge 200–400 ms gaps on the timeline. You can sound closer to human narration without advanced markup.",
          ],
        },
      ],
    },
  },
  {
    slug: "enrich-script-with-examples",
    date: "2026-10-05",
    tags: ["guide", "content"],
    title: { zh: "如何丰富 TTS 文案：例子、对比与场景", en: "Enrich TTS Scripts with Examples and Scenarios" },
    description: {
      zh: "让旁白更有信息量：加例子、对比句与使用场景，而不是堆砌形容词。",
      en: "Add examples, contrasts, and scenarios—not empty adjectives.",
    },
    body: {
      zh: [
        {
          heading: "用具体例子替换空泛形容",
          paragraphs: [
            "「非常好用」不如「三步完成：粘贴文本、选音色、下载 MP3」。丰富文案的关键是可验证的细节：步骤、数字、对比（WAV 适合剪辑，MP3 适合分享）、反例（不要在未试听前合成全书）。听众靠例子建立画面，引擎也更容易读出节奏。",
            "每个主要观点配一句场景：课件、短视频、客服提示音。场景句单独成段，便于按需重录。",
          ],
        },
        {
          heading: "控制长度与敏感信息",
          paragraphs: [
            "丰富不等于冗长。删掉重复形容词，保留能帮人决策的信息。不要把客户隐私写进例子。定稿后短句试听，确认例子中的数字与专名读法正确，再批量生成。",
          ],
        },
      ],
      en: [
        {
          heading: "Replace fluff with proof",
          paragraphs: [
            "“Very useful” loses to “three steps: paste, pick a voice, download MP3.” Enrich with steps, numbers, contrasts (WAV for editing, MP3 for sharing), and anti-patterns (don’t render a book before preview). Examples create pictures and pacing.",
            "Attach one scenario per idea—courseware, short video, IVR—and keep scenarios as separate clips for easy reruns.",
          ],
        },
        {
          heading: "Length and privacy",
          paragraphs: [
            "Rich is not long. Cut repeated adjectives; keep decision-ready facts. Never put private client data in examples. Preview short lines for numbers and names before batching.",
          ],
        },
      ],
    },
  },
  {
    slug: "homepage-workflow-checklist",
    date: "2026-10-06",
    tags: ["guide", "basics"],
    title: { zh: "首页合成工作流检查清单", en: "Homepage Synthesis Workflow Checklist" },
    description: {
      zh: "从打开首页到下载音频的逐步检查项，减少失败与返工。",
      en: "Step-by-step checks from opening the home page to download.",
    },
    body: {
      zh: [
        {
          heading: "合成前",
          paragraphs: [
            "确认文本非空、字符未超每日额度、语种与听众匹配、音色已短句试听。文案已口语化并含必要标点。格式与下游一致：分享用 MP3，剪辑用 WAV。敏感信息已剔除。",
            "把项目默认参数（语速、音量、采样率）写在便签或文档，避免每次凭感觉拨动。",
          ],
        },
        {
          heading: "合成后",
          paragraphs: [
            "完整试听开头与结尾，检查数字与英文。下载并按规范命名，母带与发布文件分开存放。失败则按网络、额度、语种、格式顺序排查。把本次问题记入清单，下次可跳过同类坑。",
          ],
        },
      ],
      en: [
        {
          heading: "Before you click",
          paragraphs: [
            "Non-empty text, quota left, language match, voice previewed, speakable punctuation, format aligned (MP3 share / WAV edit), secrets removed.",
            "Write default rate, volume, and sample rate down so you are not guessing every time.",
          ],
        },
        {
          heading: "After synthesis",
          paragraphs: [
            "Listen to openings and endings; check numbers and English. Download with naming rules; separate masters from publishes. On failure, check network, quota, language, format. Log the issue so the next run skips the same pit.",
          ],
        },
      ],
    },
  },
  {
    slug: "make-product-demo-voiceover",
    date: "2026-10-07",
    tags: ["practice", "product"],
    title: { zh: "为产品演示视频制作 TTS 旁白", en: "TTS Voiceovers for Product Demo Videos" },
    description: {
      zh: "演示片旁白的节奏、镜头对齐与格式选择。",
      en: "Pacing, picture sync, and formats for demo narration.",
    },
    body: {
      zh: [
        {
          heading: "按镜头写旁白",
          paragraphs: [
            "先出分镜或录屏时间码，再写对应旁白，避免「画面已切、话还没说完」。每镜头一句话，动词靠前。功能名固定读法，写进术语表。语速略慢，给鼠标操作留视觉时间。",
            "试听时把音频拖到时间线对齐，不够就拆句，而不是一味加速。",
          ],
        },
        {
          heading: "导出与多语言",
          paragraphs: [
            "剪辑用 WAV，成片上传用平台友好压缩音轨。多语言版复制时间码结构，只替换语音轨。保留英文母版脚本，翻译后再口语化，不要直译长句。",
          ],
        },
      ],
      en: [
        {
          heading: "Write to the shot",
          paragraphs: [
            "Build from storyboard or screencast timecode so speech does not overrun cuts. One sentence per shot, verbs first. Lock product-name readings. Speak slightly slow so UI moves stay visible.",
            "Align on the timeline; split lines instead of speeding up forever.",
          ],
        },
        {
          heading: "Export and locales",
          paragraphs: [
            "Edit with WAV; deliver platform-friendly compressed audio. Clone timecode for locales and swap tracks only. Translate then rewrite for speech—avoid literal long sentences.",
          ],
        },
      ],
    },
  },
  {
    slug: "customer-support-ivr-prompts",
    date: "2026-10-08",
    tags: ["practice", "business"],
    title: { zh: "客服与 IVR 提示音的 TTS 写法", en: "Writing TTS Prompts for Support and IVR" },
    description: {
      zh: "菜单提示、等待语与错误提示如何写得短而清晰。",
      en: "Short, clear menu, hold, and error prompts.",
    },
    body: {
      zh: [
        {
          heading: "短、清、可操作",
          paragraphs: [
            "IVR 提示应在数秒内给出路：按键说明靠前，禁止长篇政策朗读。错误提示说明「发生了什么 + 下一步」。等待语避免高频重复同一句，可准备两三个变体轮换。音色选清晰中性，语速略慢于广告口播。",
            "数字与分机号分段读出，试听确认不会粘连。",
          ],
        },
        {
          heading: "合规与版本",
          paragraphs: [
            "法律声明单独短音频，必要时转人工说明。文件命名含菜单版本号，更新时勿覆盖唯一备份。合成前脱敏真实客户案例。把提示音文案纳入变更评审，与产品发版同步。",
          ],
        },
      ],
      en: [
        {
          heading: "Short, clear, actionable",
          paragraphs: [
            "IVR should reveal the path in seconds—keypress first, no policy essays. Errors state what happened plus next step. Rotate a few hold variants. Prefer clear neutral voices slightly slower than ads.",
            "Chunk numbers and extensions; preview for smearing.",
          ],
        },
        {
          heading: "Compliance and versions",
          paragraphs: [
            "Keep legal lines short or route to agents. Version filenames; never overwrite the only backup. Redact real customer stories. Review prompt copy with product releases.",
          ],
        },
      ],
    },
  },
  {
    slug: "youtube-voiceover-tips",
    date: "2026-10-09",
    tags: ["practice", "video"],
    title: { zh: "YouTube 口播与解说的 TTS 技巧", en: "TTS Tips for YouTube Narration" },
    description: {
      zh: "钩子句、章节摘要与字幕友好的旁白结构。",
      en: "Hooks, chapter summaries, and caption-friendly narration.",
    },
    body: {
      zh: [
        {
          heading: "前三秒与章节",
          paragraphs: [
            "开场用具体结果或问题做钩子，避免空泛自我介绍。章节切换用固定口头禅，方便听众与字幕对齐。旁白句子短，利于自动字幕。数字读完整，少用符号。",
            "片尾 CTA 单独合成，便于 A/B 替换而不动全片。",
          ],
        },
        {
          heading: "平台与音质",
          paragraphs: [
            "上传前按平台响度习惯标准化。母带 WAV，上传用压缩。注意音乐床不要掩蔽对白。多语言频道复制时间轴换轨。合规使用素材与文本版权，合成音不是免责金牌。",
          ],
        },
      ],
      en: [
        {
          heading: "Hooks and chapters",
          paragraphs: [
            "Open with a concrete result or question. Use a fixed phrase at chapter breaks for listeners and captions. Keep sentences short for auto-captions. Speak numbers fully.",
            "Render end CTAs separately for A/B swaps.",
          ],
        },
        {
          heading: "Platform and quality",
          paragraphs: [
            "Normalize loudness for the host. WAV master, compressed upload. Don’t bury dialogue under music. Clone timelines for locales. Copyright still applies to scripts and beds.",
          ],
        },
      ],
    },
  },
  {
    slug: "elearning-quiz-audio",
    date: "2026-10-10",
    tags: ["practice", "education"],
    title: { zh: "为在线测验与反馈语生成语音", en: "Audio for E-learning Quizzes and Feedback" },
    description: {
      zh: "题目朗读、正确错误反馈与鼓励语的批量生产方法。",
      en: "Batch production for stems, correct/incorrect feedback, and encouragement.",
    },
    body: {
      zh: [
        {
          heading: "题干与选项",
          paragraphs: [
            "题干单独音频，选项可按需朗读。避免「如上题」这类依赖视觉的指代。反馈语准备正确/错误两套模板，只替换知识点短句。语速对学生友好，专有名词首次给读法。",
            "文件名含题号与语种，方便 LMS 映射。",
          ],
        },
        {
          heading: "情感与公平",
          paragraphs: [
            "错误反馈避免嘲讽语气，保持中性鼓励。多语言测验先锁定结构再翻译口语化。抽检含公式与单位的题目。提供文本替代以满足无障碍要求。",
          ],
        },
      ],
      en: [
        {
          heading: "Stems and choices",
          paragraphs: [
            "Separate stem audio; optional choice reads. Avoid “as above” references. Template correct/incorrect feedback and swap the knowledge clause. Student-friendly rate; pronounce terms once.",
            "Name files with item id and locale for LMS mapping.",
          ],
        },
        {
          heading: "Tone and access",
          paragraphs: [
            "Keep incorrect feedback neutral and kind. Lock structure before translating. Spot-check formulas and units. Offer text alternatives for accessibility.",
          ],
        },
      ],
    },
  },
  {
    slug: "brand-voice-guidelines-tts",
    date: "2026-10-11",
    tags: ["advanced", "brand"],
    title: { zh: "为品牌制定 TTS 声音规范", en: "Brand Voice Guidelines for TTS" },
    description: {
      zh: "音色、语速、禁用词与情景变体如何写成可执行规范。",
      en: "Document voice, rate, banned phrases, and situational variants.",
    },
    body: {
      zh: [
        {
          heading: "规范里写什么",
          paragraphs: [
            "指定默认音色与备选、语速音量范围、格式与采样率、命名规则。列出禁用口头禅与必须统一的产品读法。区分「广告激昂」与「客服冷静」两套情景参数，避免全站一个味。",
            "附标准试听句与通过标准，供应商或同事可自检。",
          ],
        },
        {
          heading: "落地与审计",
          paragraphs: [
            "规范放在知识库，变更记版本号。每季度用回归句抽检平台音色是否漂移。新活动开项目时先引用规范再合成。品牌声音是资产，随意换音色会造成认知断裂。",
          ],
        },
      ],
      en: [
        {
          heading: "What to document",
          paragraphs: [
            "Default and backup voices, rate/volume ranges, formats, naming, banned phrases, and locked product readings. Separate “ad energy” from “support calm” presets.",
            "Attach sample lines and pass criteria for self-QA.",
          ],
        },
        {
          heading: "Rollout and audits",
          paragraphs: [
            "Version the guide in your wiki. Quarterly regression listens catch voice drift. New campaigns cite the guide before rendering. Brand voice is an asset—random swaps break recognition.",
          ],
        },
      ],
    },
  },
  {
    slug: "fix-noisy-tts-audio",
    date: "2026-10-12",
    tags: ["advanced", "post"],
    title: { zh: "合成音频发闷、齿音重怎么办", en: "Fixing Dull or Harsh TTS Audio" },
    description: {
      zh: "从文案、参数到轻度后期的排查顺序。",
      en: "A triage order from script and settings to light post.",
    },
    body: {
      zh: [
        {
          heading: "先排除源头问题",
          paragraphs: [
            "发闷常见于多次有损转码或采样率过低；齿音重可能来自过快语速或某音色特性。先换短句试听、降速、换音色，再考虑 EQ。回到 WAV 母带处理，避免在 MP3 上叠效果。",
            "检查播放设备与音量，排除外放失真误判。",
          ],
        },
        {
          heading: "轻度后期",
          paragraphs: [
            "旁白可用高通滤除无用低频，动态EQ压齿音，轻压缩统一响度。不要把人声压成广告感过强。处理链保存为预设，批量应用。若仍不满意，回到文案停顿与音色选择，后期不能拯救错误的声音选型。",
          ],
        },
      ],
      en: [
        {
          heading: "Fix the source first",
          paragraphs: [
            "Dull audio often means lossy loops or low sample rate; harsh S means fast rate or voice traits. Preview shorter, slow down, swap voice, then EQ. Process from WAV, not stacked MP3.",
            "Check speakers and gain before blaming the file.",
          ],
        },
        {
          heading: "Light post only",
          paragraphs: [
            "High-pass rumble, dynamic EQ on S, light compression for level. Avoid over-processed ad tone. Save presets for batches. If still wrong, revisit pauses and voice choice—post cannot save a bad cast.",
          ],
        },
      ],
    },
  },
  {
    slug: "localize-tts-for-regions",
    date: "2026-10-13",
    tags: ["guide", "languages"],
    title: { zh: "面向不同地区的 TTS 本地化要点", en: "Regional Localization Tips for TTS" },
    description: {
      zh: "词汇、读音、合规提示在地区版本中的差异。",
      en: "Vocabulary, pronunciation, and compliance differences by region.",
    },
    body: {
      zh: [
        {
          heading: "语言变体与用词",
          paragraphs: [
            "同一语种不同地区（如英式/美式、大陆/港澳台用语）会影响选音与用词。度量单位、货币、日期读法按当地习惯改写。营销口号避免直译梗。法律与隐私提示用当地审过的文本。",
            "维护「地区 × 音色 × 术语表」矩阵，防止串版。",
          ],
        },
        {
          heading: "质检",
          paragraphs: [
            "母语者抽检钩子句与产品名。混排与数字是高危区。更新一处术语要同步所有地区表。本地化成功标志是当地用户觉得「就是我们说话的方式」，而不是「翻译腔朗读」。",
          ],
        },
      ],
      en: [
        {
          heading: "Variants and wording",
          paragraphs: [
            "Locales of the same language change voice choice and vocabulary. Adapt units, currency, and dates. Avoid literally translated slogans. Use locally reviewed legal lines.",
            "Maintain a region × voice × glossary matrix.",
          ],
        },
        {
          heading: "QA",
          paragraphs: [
            "Native listeners check hooks and product names. Mixed language and numbers are hot spots. Sync glossary updates across regions. Success sounds local, not like translated reading.",
          ],
        },
      ],
    },
  },
  {
    slug: "tts-for-notifications",
    date: "2026-10-14",
    tags: ["practice", "product"],
    title: { zh: "用 TTS 生成应用内通知与提醒语音", en: "TTS for In-app Notifications and Reminders" },
    description: {
      zh: "短通知如何写、如何控制长度与打扰感。",
      en: "Write short alerts without creating noise fatigue.",
    },
    body: {
      zh: [
        {
          heading: "信息结构",
          paragraphs: [
            "通知语音遵循「事件 + 结果 + 动作」：例如「订单已发货，点击查看物流」。杜绝朗读整段隐私政策。长度控制在数秒，语速清晰。重要级别可用不同音色或前缀词，但不要过多变体导致混乱。",
            "静音时段与用户偏好要在产品层尊重，TTS 只负责内容清晰。",
          ],
        },
        {
          heading: "工程化",
          paragraphs: [
            "模板变量（姓名、金额）要有兜底读法。批量预合成高频句，降低实时失败。日志勿保存完整敏感旁白。测试覆盖空变量与超长名字截断策略。",
          ],
        },
      ],
      en: [
        {
          heading: "Message shape",
          paragraphs: [
            "Use event + result + action, e.g. “Order shipped—view tracking.” Never read full policies aloud. Keep clips a few seconds. Limited severity variants only.",
            "Honor quiet hours in product logic; TTS just speaks clearly.",
          ],
        },
        {
          heading: "Engineering",
          paragraphs: [
            "Template variables need fallback readings. Pre-render frequent lines. Don’t log sensitive full prompts. Test empty variables and long-name truncation.",
          ],
        },
      ],
    },
  },
  {
    slug: "compare-neural-vs-old-tts",
    date: "2026-10-15",
    tags: ["advanced", "comparison"],
    title: { zh: "神经 TTS 与传统拼接音库的差异", en: "Neural TTS vs Older Concatenative Voices" },
    description: {
      zh: "自然度、稳定性与适用场景对比，帮助选型。",
      en: "Naturalness, stability, and fit—how to choose.",
    },
    body: {
      zh: [
        {
          heading: "听感与局限",
          paragraphs: [
            "神经 TTS 在连贯性与韵律上通常更自然，适合叙事与营销；传统拼接在某些受限词表场景可能更稳定可预测。神经声音对脏文案更敏感，标点与口语化更重要。传统系统有时在专名上更「死板但可控」。",
            "本站走神经高保真路线，仍需好文案才能发挥。",
          ],
        },
        {
          heading: "选型建议",
          paragraphs: [
            "对外品牌与课程优先神经音色；工业提示音若需极强一致性可评估专用方案。不论何种，保留母带与版本记录。用实际试听句决策，而不是只看参数表。",
          ],
        },
      ],
      en: [
        {
          heading: "Sound and limits",
          paragraphs: [
            "Neural TTS usually wins on prosody for stories and marketing; older concatenative systems can feel more predictable on closed vocabularies. Neural voices punish messy scripts—punctuation matters. Legacy stacks may sound rigid yet controllable on names.",
            "This site favors neural fidelity; scripts still decide the ceiling.",
          ],
        },
        {
          heading: "How to choose",
          paragraphs: [
            "Brand and courses: neural. Industrial prompts needing extreme consistency: evaluate specialized options. Keep masters and versions either way. Decide with real sample lines, not spec sheets alone.",
          ],
        },
      ],
    },
  },
  {
    slug: "prepare-long-form-audiobook-style",
    date: "2026-10-16",
    tags: ["practice", "longform"],
    title: { zh: "长文与有声书风格的分章合成", en: "Chaptered Synthesis for Long-form Audio" },
    description: {
      zh: "分章、命名、质量控制与拼接的长文流程。",
      en: "Chapters, naming, QA, and stitching for long-form.",
    },
    body: {
      zh: [
        {
          heading: "分章原则",
          paragraphs: [
            "按章或场景切分，单文件不宜过长，便于重录与下载。章首可加标题读出，章尾留短静音。人物多时考虑多音色，但先保证旁白统一。额度按章消耗，优先完成已定稿章节。",
            "目录表映射文件名与时间码，后期拼接不乱。",
          ],
        },
        {
          heading: "质量与版权",
          paragraphs: [
            "每章抽检开头结尾与对话。确认你有文本授权。发布平台对合成有声内容可能有额外披露要求，自行合规。长文成功依赖流程纪律，而非一次合成到底。",
          ],
        },
      ],
      en: [
        {
          heading: "Chapter rules",
          paragraphs: [
            "Cut by chapter or scene; shorter files rerun and download easier. Optionally speak titles; leave a short tail gap. Multiple character voices come after a stable narrator. Spend quota on locked chapters first.",
            "Map filenames to timecode in a table.",
          ],
        },
        {
          heading: "QA and rights",
          paragraphs: [
            "Spot-check openings, endings, and dialogue. Confirm text rights. Some platforms require disclosure for synthetic audiobooks—comply yourself. Long-form wins on process, not one giant render.",
          ],
        },
      ],
    },
  },
  {
    slug: "optimize-for-mobile-listening",
    date: "2026-10-17",
    tags: ["practice", "ux"],
    title: { zh: "面向手机外放的旁白优化", en: "Optimizing Narration for Mobile Speakers" },
    description: {
      zh: "外放场景下的语速、用词与响度建议。",
      en: "Rate, wording, and loudness for phone speakers.",
    },
    body: {
      zh: [
        {
          heading: "外放听不清的常见原因",
          paragraphs: [
            "语速过快、句式过长、背景乐过大、音量过低或过响失真，都会在通勤噪声里崩溃。用词选更口语、更少生僻缩写。关键信息前置。导出后用手机外放在嘈杂环境抽听。",
            "单声道旁白通常足够，立体声花活对外放帮助有限。",
          ],
        },
        {
          heading: "参数与格式",
          paragraphs: [
            "略降语速，响度按平台标准规范化。分享用 MP3。避免过度压缩导致「喊叫感」。若用户常戴耳机，可另导一版更细腻的母带，但默认版先服务外放大多数人。",
          ],
        },
      ],
      en: [
        {
          heading: "Why mobile fails",
          paragraphs: [
            "Fast rate, long clauses, loud beds, or bad levels die in commute noise. Prefer spoken words over rare acronyms. Put the point first. Test on phone speakers in noise.",
            "Mono narration is usually enough outdoors.",
          ],
        },
        {
          heading: "Settings and formats",
          paragraphs: [
            "Slightly slower rate, normalized loudness, MP3 for share. Avoid squashy over-compression. Offer a detailed master for headphone users if needed, but default for speakers first.",
          ],
        },
      ],
    },
  },
  {
    slug: "team-review-tts-takes",
    date: "2026-10-18",
    tags: ["advanced", "workflow"],
    title: { zh: "团队如何评审与验收 TTS 成片", en: "How Teams Review and Accept TTS Takes" },
    description: {
      zh: "评审标准、角色分工与返修流程。",
      en: "Criteria, roles, and revision loops.",
    },
    body: {
      zh: [
        {
          heading: "验收标准",
          paragraphs: [
            "清单包含：正确性（无错读）、清晰度、节奏、品牌音色一致、格式命名、字幕可对齐。指定一人做声音主审，一人做文案主审，避免所有人凭感觉争论。试听环境约定为同一耳机型号或校准音箱。",
            "不通过项必须可执行：「第 12 句数字重读」而不是「感觉不对」。",
          ],
        },
        {
          heading: "返修闭环",
          paragraphs: [
            "只重跑问题句段，更新版本号。通过后锁定母带，发布压缩件。把常见返修原因反馈回写作规范。评审是为了稳定交付，不是追求无限完美。",
          ],
        },
      ],
      en: [
        {
          heading: "Acceptance criteria",
          paragraphs: [
            "Check correctness, clarity, pacing, brand voice, naming, caption alignment. One audio lead, one copy lead. Same headphones or calibrated speakers.",
            "Actionable fails only—“rerun sentence 12 numbers,” not “feels off.”",
          ],
        },
        {
          heading: "Revision loop",
          paragraphs: [
            "Rerun only failing segments; bump versions. Lock the master; ship compressed. Feed common fails into writing rules. Review stabilizes delivery—it is not infinite polish.",
          ],
        },
      ],
    },
  },
  {
    slug: "seo-content-with-tts-blog",
    date: "2026-10-19",
    tags: ["advanced", "seo"],
    title: { zh: "TTS 站点博客如何服务 SEO 与用户", en: "How a TTS Blog Helps SEO and Users" },
    description: {
      zh: "选题、内链与实用厚度，避免空薄采集文。",
      en: "Topics, internal links, and useful depth—not thin scrapes.",
    },
    body: {
      zh: [
        {
          heading: "有用优先",
          paragraphs: [
            "搜索喜欢能解决问题的文章：如何选格式、如何写旁白、PCM/Opus 是什么。每篇给可执行步骤与内链到工具页、合规页。避免关键字堆砌。中英双语覆盖更广受众，但质量不能注水。",
            "更新过时参数与截图（若有），保持与产品一致。",
          ],
        },
        {
          heading: "结构与发现",
          paragraphs: [
            "清晰标题、描述、日期与标签。站点地图收录博客 URL。FAQ 与博客互相链到详情。内容为用户服务时，SEO 是结果而不是唯一目标。",
          ],
        },
      ],
      en: [
        {
          heading: "Useful first",
          paragraphs: [
            "Search rewards problem-solvers: format choice, script craft, PCM/Opus explainers. Give steps and link to the tool and policy pages. No keyword stuffing. Bilingual is fine if quality stays high.",
            "Refresh stale parameters so posts match the product.",
          ],
        },
        {
          heading: "Structure and discovery",
          paragraphs: [
            "Clear titles, descriptions, dates, tags. Include blog URLs in the sitemap. Cross-link FAQ and posts. When content serves people, SEO follows.",
          ],
        },
      ],
    },
  },
  {
    slug: "avoid-monotone-delivery",
    date: "2026-10-20",
    tags: ["guide", "script"],
    title: { zh: "减少合成语音的「念稿感」", en: "Reducing Monotone “Reading Aloud” TTS" },
    description: {
      zh: "从句式变化、问句与段落长度打破平淡。",
      en: "Vary sentence shape, questions, and paragraph length.",
    },
    body: {
      zh: [
        {
          heading: "句式有起伏",
          paragraphs: [
            "连续同一长度陈述句最容易念稿感。插入短问句、祈使句与列举。段落长短交错。关键词前后留标点气口。不要全程极限语速。换音色前先改写，改写成本更低。",
            "朗读自己的稿子，哪里无聊哪里就改。",
          ],
        },
        {
          heading: "情景化细节",
          paragraphs: [
            "加入具体场景与数字，声音才有落点。成片里用极短静音分隔意群。检查是否全程同一音量喊叫。念稿感多半是文案问题，模型只是放大器。",
          ],
        },
      ],
      en: [
        {
          heading: "Vary the shape",
          paragraphs: [
            "Same-length statements sound read-aloud. Add short questions, imperatives, and lists. Alternate paragraph length. Punctuate around key words. Don’t max rate the whole way. Rewrite before swapping voices.",
            "Read your draft; edit boring spots.",
          ],
        },
        {
          heading: "Concrete detail",
          paragraphs: [
            "Scenes and numbers give the voice somewhere to land. Tiny gaps separate ideas. Check for constant shouting level. Monotone is usually copy—the model amplifies it.",
          ],
        },
      ],
    },
  },
  {
    slug: "glossary-for-tts-projects",
    date: "2026-10-21",
    tags: ["guide", "team"],
    title: { zh: "建立 TTS 项目术语与读音表", en: "Build a Pronunciation Glossary for TTS Projects" },
    description: {
      zh: "产品名、缩写与人名读法如何统一管理。",
      en: "Unify readings for products, acronyms, and names.",
    },
    body: {
      zh: [
        {
          heading: "表里有什么",
          paragraphs: [
            "每条含：显示写法、朗读写法、语种、备注、更新日期。例如缩写该读字母还是单词。品牌中英文读法分列。把表链到声音规范与脚本仓库。新人合成前先查表。",
            "争议读法由品牌负责人拍板并锁定。",
          ],
        },
        {
          heading: "维护",
          paragraphs: [
            "新功能名上线即增补。更换引擎后重跑术语回归句。对外文案与语音必须共用同一张表，否则字幕与声音打架。术语表是便宜的质量保险。",
          ],
        },
      ],
      en: [
        {
          heading: "What to store",
          paragraphs: [
            "Each row: display form, speak form, locale, notes, date. Letter vs word acronyms. Separate CN/EN brand readings. Link the sheet to voice guidelines and scripts.",
            "Brand owners lock disputed readings.",
          ],
        },
        {
          heading: "Maintenance",
          paragraphs: [
            "Add names when features ship. Rerun glossary lines after engine changes. Subtitles and audio must share one table. Glossaries are cheap quality insurance.",
          ],
        },
      ],
    },
  },
  {
    slug: "measure-tts-quality",
    date: "2026-10-22",
    tags: ["advanced", "qa"],
    title: { zh: "如何量化评估 TTS 质量", en: "How to Measure TTS Quality Practically" },
    description: {
      zh: "主观评分与简单客观检查结合的评估法。",
      en: "Combine subjective scores with simple objective checks.",
    },
    body: {
      zh: [
        {
          heading: "主观与客观",
          paragraphs: [
            "听感评分：自然度、清晰度、品牌适配，1–5 分。客观：是否截断、错读次数、响度是否达标、文件是否可播放。固定评测集（标准句 + 高压混排句）。换音色或参数必须跑同一套。",
            "记录均值与失败案例，而不是只存「还行」。",
          ],
        },
        {
          heading: "决策",
          paragraphs: [
            "分数用于选型与回归，不是淘汰所有不完美。结合额度与工期：有时「足够清晰」优于「无限微调」。把评估嵌入发布门禁，质量才能稳定。",
          ],
        },
      ],
      en: [
        {
          heading: "Subjective and objective",
          paragraphs: [
            "Score naturalness, clarity, brand fit 1–5. Objectively track cutoffs, misreads, loudness, playability. Freeze a set (sample + hard mixed lines). Any voice or parameter change reruns the set.",
            "Store averages and fails—not just “fine.”",
          ],
        },
        {
          heading: "Decisions",
          paragraphs: [
            "Scores guide selection and regression, not perfectionism. Balance quota and deadlines—“clear enough” can beat endless tweaks. Put evaluation in the release gate for stable quality.",
          ],
        },
      ],
    },
  },
  {
    slug: "from-faq-to-full-guide",
    date: "2026-10-23",
    tags: ["guide", "content"],
    title: { zh: "从常见问题扩展成完整使用指南", en: "Turn FAQs into Full How-to Guides" },
    description: {
      zh: "把首页问答深化为步骤文、清单文与场景文。",
      en: "Expand homepage Q&A into steps, checklists, and scenarios.",
    },
    body: {
      zh: [
        {
          heading: "问答是种子",
          paragraphs: [
            "首页 FAQ 解决「能不能、怎么开始」；博客负责「为什么、如何做得更好」。每条问答可扩展：步骤拆解、反例、格式选择、场景案例。内链回工具页形成闭环。丰富内容时优先补用户真实卡点，而不是堆概念。",
            "保持中英双语厚度接近，避免一个语言敷衍。",
          ],
        },
        {
          heading: "更新节奏",
          paragraphs: [
            "产品改版时同步改 FAQ 与相关博文。用搜索词与客服问题喂选题。指南文末引导去合成与去读合规页。内容生态是「短答 + 深文 + 工具」三层，缺一层都会让用户停住。",
          ],
        },
      ],
      en: [
        {
          heading: "FAQ as seeds",
          paragraphs: [
            "Homepage FAQ covers can-I and how-to-start; the blog covers why and how-to-improve. Expand each answer into steps, anti-patterns, format choices, and scenarios. Link back to the tool. Enrich from real blockers, not jargon.",
            "Keep bilingual depth similar.",
          ],
        },
        {
          heading: "Cadence",
          paragraphs: [
            "When the product changes, update FAQ and related posts. Feed topics from search and support. End guides with synthesize + policy links. The stack is short answers + deep posts + tool—missing one stalls users.",
          ],
        },
      ],
    },
  },
];

const esc = (s) => JSON.stringify(s);

function serSec(arr) {
  return `[\n${arr
    .map(
      (s) => `        {
          heading: ${esc(s.heading)},
          paragraphs: [
${s.paragraphs.map((p) => `            ${esc(p)},`).join("\n")}
          ],
        }`
    )
    .join(",\n")}\n      ]`;
}

const posts = raw.map((r) => {
  const body = ensureLen(r.body);
  return `  {
    slug: ${esc(r.slug)},
    date: ${esc(r.date)},
    tags: ${JSON.stringify(r.tags)},
    title: { zh: ${esc(r.title.zh)}, en: ${esc(r.title.en)} },
    description: { zh: ${esc(r.description.zh)}, en: ${esc(r.description.en)} },
    sections: {
      zh: ${serSec(body.zh)},
      en: ${serSec(body.en)},
    },
  }`;
});

const out = `import type { BlogPost } from "./types";

export const postsPart3: BlogPost[] = [
${posts.join(",\n")}
];
`;

writeFileSync(new URL("../src/content/posts/posts-part3.ts", import.meta.url), out);
console.log("wrote", raw.length, "posts");
for (const r of raw) {
  console.log(r.slug, zhLen(ensureLen(r.body).zh));
}
