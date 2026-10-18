import type { BlogPost } from "./types";

export const postsPart1: BlogPost[] = [
  {
    slug: "getting-started-online-tts",
    date: "2026-09-01",
    tags: ["guide","basics"],
    title: { zh: "如何开始使用在线文字转语音", en: "Getting Started with Online Text to Speech" },
    description: { zh: "从输入文本到下载音频的完整入门流程，适合第一次使用 TTS 的用户。", en: "A complete beginner path from entering text to downloading audio." },
    sections: {
      zh: [
        {
          heading: "从打开页面到听到声音",
          paragraphs: [
            "第一次使用在线文字转语音时，不必先研究全部参数。打开首页后，把一段不超过一两句话的文本粘贴进输入框，先确认字符计数与每日剩余额度正常，再选择目标语种与人声音色。短文本试听能帮你快速判断发音是否自然、语速是否合适，也避免长文反复重跑浪费额度。",
            "确认试听满意后，再粘贴完整文稿。选择音频格式与采样率：日常分享优先 MP3，后续剪辑可选用 WAV 或 PCM。点击开始生成，等待合成完成，在页面内播放预览，无误后再下载保存到本地。建议用「项目名_版本_音色」方式命名文件，方便日后查找。",
          ],
        },
        {
          heading: "把文案写成「适合朗读」的样子",
          paragraphs: [
            "合成质量很大程度取决于文本本身。把书面长句改成短句，补上逗号与句号，专有名词用常用写法。中英混排时，尽量按语种拆段分别合成再拼接，发音通常更稳定。若结果不理想，优先改文案与标点，而不是盲目更换所有参数。",
            "遇到失败时，依次检查：文本是否为空、是否超每日额度、网络是否中断、语种是否选错。排除后再重试。养成「短句试听 → 定稿合成 → 命名归档」的习惯，后续批量生产会轻松很多。",
          ],
        }
      ],
      en: [
        {
          heading: "From open page to first playback",
          paragraphs: [
            "You do not need every setting on day one. Paste one or two short sentences, check the character counter and remaining daily quota, then pick language and voice. A short preview tells you if pronunciation and pacing feel right without burning quota on a full draft.",
            "When the preview sounds good, paste the full script. Choose format and sample rate—MP3 for sharing, WAV or PCM for editing. Generate, preview in the page, then download. Name files with project, version, and voice so assets stay findable.",
          ],
        },
        {
          heading: "Write for speaking, not just reading",
          paragraphs: [
            "Output quality tracks your script. Prefer short sentences, clear punctuation, and common spellings for names. For mixed Chinese–English text, synthesize language segments separately and join them. Fix copy and punctuation before changing every control.",
            "If synthesis fails, check empty input, daily quota, network, and language mismatch, then retry. A habit of short preview → final render → named archive scales well for batch work.",
          ],
        }
      ],
    },
  },
  {
    slug: "how-to-choose-a-voice",
    date: "2026-09-02",
    tags: ["guide","voices"],
    title: { zh: "如何选择合适的人声音色", en: "How to Choose the Right TTS Voice" },
    description: { zh: "根据场景、性别气质与语种匹配音色，让合成语音更贴合内容。", en: "Match voice gender, tone, and language to your content and audience." },
    sections: {
      zh: [
        {
          heading: "语种、地区与场景先定边界",
          paragraphs: [
            "选音色的第一步不是「好听」，而是「对谁说、用什么语」。先锁定听众熟悉的语种与地区变体，再在该列表里比较男声与女声。语种选错时，再美的音色也会显得别扭。课件、新闻、客服提示音通常需要清晰、中性、少夸张的声音；故事、宣传片、品牌旁白可以尝试更有温度或更有表现力的选项。",
            "同一产品线或课程系列，尽量固定一个主音色，听众更容易建立记忆。需要区分角色（例如旁白与示例对话）时，再引入第二种声音，并在文档里记录「谁说什么」，避免团队协作时混用。",
          ],
        },
        {
          heading: "用统一试听句做对比",
          paragraphs: [
            "准备一句包含数字、问句与品牌名的标准试听稿，对每个候选音色只合成这一句。从清晰度、亲和力、是否符合品牌气质三项打分，留下前两名，再用完整段落验证长句表现。不要在未锁定音色前就把全书合成完，否则一换声音几乎全部重做。",
            "试听时用耳机与外放各听一遍，关注齿音、尾音是否被切断，以及专有名词是否读得奇怪。确认后把音色名称、语速、音量写成项目默认参数，方便下次直接复用。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Lock language and use case first",
          paragraphs: [
            "Start with audience language and locale, then compare male and female voices in that set. A beautiful voice in the wrong locale still sounds wrong. Courses, news, and system prompts need clear, neutral delivery; stories and brand films can use warmer or more expressive options.",
            "Keep one primary voice across a product or course series. Add a second voice only for roles, and document who speaks what so collaborators do not mix voices by accident.",
          ],
        },
        {
          heading: "Compare with one sample line",
          paragraphs: [
            "Use one sample that includes numbers, a question, and a brand name. Score clarity, warmth, and brand fit, keep the top two, then validate with a full paragraph. Do not render an entire book before locking the voice.",
            "Listen on headphones and speakers. Check sibilance, cut-off endings, and odd name readings. Record voice, rate, and volume as project defaults for reuse.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "speech-rate-and-volume",
    date: "2026-09-03",
    tags: ["guide","controls"],
    title: { zh: "语速与音量调节指南", en: "Guide to Speech Rate and Volume" },
    description: { zh: "合理设置语速与音量，避免过快难懂或过响失真。", en: "Set rate and volume so speech stays clear without sounding rushed or clipped." },
    sections: {
      zh: [
        {
          heading: "语速：先服务理解，再追求节奏",
          paragraphs: [
            "默认 +0% 适合大多数旁白与说明文。教学、老年听众或术语密集的内容，可尝试 -10% 到 -20%，让关键词有落点。短视频口播可以略快，但超过 +20% 后，咬字与停顿往往变差，返工成本反而更高。长句、从句多的文案，优先拆句或降速，而不是靠拉快掩盖结构问题。",
            "同一项目内语速应保持一致。片头可以稍慢以建立信任，主体内容回到统一档位。变更语速后，务必重新试听含数字与英文缩写的句子，这些位置最容易「糊成一团」。",
          ],
        },
        {
          heading: "音量：合成阶段保守，成片再统一",
          paragraphs: [
            "合成时保持默认或轻微增益即可，把响度标准化留给剪辑软件（按平台目标 LUFS 处理）。TTS 轨过响会在混音时与配乐抢电平，过轻则要对着噪声推增益。若某句明显偏弱，先检查文本是否过短或标点异常，再考虑单独提高该段音量。",
            "导出前用耳机检查爆音与齿音。需要压限时，对旁白轨轻度处理，避免把呼吸感与词尾细节压死。记住：语速与音量是「听感调节」，真正决定自然度的仍是文案结构与音色选择。",
          ],
        }
      ],
      en: [
        {
          heading: "Rate serves comprehension first",
          paragraphs: [
            "Default +0% fits most narration. Lessons, older audiences, or dense jargon often work better at −10% to −20%. Social clips can go faster, but clarity usually drops past +20%. Long clauses need splitting or slowing—not speed as a cover-up.",
            "Keep rate consistent inside a project. A slightly slower intro is fine; return to the same setting for the body. After any rate change, re-check numbers and acronyms.",
          ],
        },
        {
          heading: "Volume: stay conservative at synthesis",
          paragraphs: [
            "Keep default or light gain while synthesizing; normalize loudness later to your platform LUFS target. Over-loud TTS fights music; over-quiet tracks need noisy boosts. If one line is weak, inspect the script before solo boosting.",
            "Check clipping and sibilance on headphones. Light compression on narration is enough—do not crush word endings. Rate and volume polish delivery; script structure and voice still matter more.",
          ],
        }
      ],
    },
  },
  {
    slug: "daily-character-limit",
    date: "2026-09-04",
    tags: ["guide","limits"],
    title: { zh: "每日字符额度如何理解与规划", en: "Understanding the Daily Character Limit" },
    description: { zh: "了解每日额度计数方式，合理拆分长文与批量任务。", en: "Learn how daily quotas are counted and how to plan long documents." },
    sections: {
      zh: [
        {
          heading: "额度如何计入与本地保存",
          paragraphs: [
            "本站按「每次提交合成的文本字符数」累计当日用量，空格与标点通常也会占用额度。输入框旁的计数与剩余提示，是规划长文的重要依据。额度状态保存在浏览器本地存储中，用于防止单日无限调用；更换设备、清理站点数据或使用隐私模式，可能导致计数重置或与另一设备不一致。",
            "因此，正式项目应把「定稿文本」与「试听文本」分开：试听只用短句，定稿一次合成成功再下载。不要用同一长文反复微调语速到耗尽额度，那样既慢又浪费。",
          ],
        },
        {
          heading: "长文与批量任务的拆分策略",
          paragraphs: [
            "把文章按段落或幻灯片页拆成多个请求，单段控制在舒适长度，合成后在时间轴拼接，并在段落间留 200–400 毫秒间隙。优先处理必须交付的章节，次要段落放到额度充裕时再跑。团队协作时约定：谁负责合成、文件如何命名、母带放在何处，避免重复消耗。",
            "若提示已达上限，可精简文案、删掉重复说明，或次日再继续。把脚本保存在本地编辑器中，不要只依赖网页输入框，防止刷新丢失。合理规划额度，本质是合理规划内容生产节奏。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "How quota is counted",
          paragraphs: [
            "Usage adds up by characters submitted per synthesis request; spaces and punctuation usually count. The on-page counter guides long-document planning. Quota lives in browser local storage—another device, cleared site data, or private mode can reset or diverge counters.",
            "Separate preview lines from final scripts. Preview short, render once when locked. Do not burn quota by repeatedly re-running the same long draft for tiny rate tweaks.",
          ],
        },
        {
          heading: "Split long and batch work",
          paragraphs: [
            "Break articles by paragraph or slide, keep segments comfortable, stitch on a timeline with 200–400 ms gaps. Ship must-have chapters first. Agree on who renders, how files are named, and where masters live.",
            "If you hit the limit, trim copy or continue next day. Keep scripts in a local editor so a refresh cannot wipe them. Quota planning is really production pacing.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "download-and-preview-audio",
    date: "2026-09-05",
    tags: ["guide","download"],
    title: { zh: "如何试听与下载生成的音频", en: "How to Preview and Download Generated Audio" },
    description: { zh: "合成完成后的试听、下载格式选择与常见播放问题排查。", en: "Preview after synthesis, choose download formats, and fix common playback issues." },
    sections: {
      zh: [
        {
          heading: "先预览，再下载，再归档",
          paragraphs: [
            "合成成功后，先在页面播放器中完整听一遍，重点检查开头是否突兀、结尾是否被切断、数字与英文是否读错。确认无误后再下载，可减少因小问题反复合成。下载前再次确认格式：微信或网页分享用 MP3；进入剪辑时间线用 WAV；需要程序读原始样本时再用 PCM。",
            "下载后立刻重命名并放入项目文件夹，例如 course01_lesson03_xiaoxiao_v2.mp3。同时保留一份未压缩母带（若有），发布用压缩格式，避免多次有损互转。",
          ],
        },
        {
          heading: "播放失败时的排查顺序",
          paragraphs: [
            "浏览器可能拦截自动播放，需手动点击播放。网络中断会导致音频不完整，可重新生成。部分播放器无法直接打开原始 PCM，需先封装为 WAV。若只有某一格式异常，换 MP3 或 WAV 再试。仍失败时记录浏览器版本与报错现象，便于反馈。",
            "移动端可先传到电脑用专业播放器验证。不要把「听不清」都当成播放器问题——也可能是语速过快或采样率与下游不匹配。建立「预览清单」：清晰度、完整性、命名、备份，四项过关再进成片。",
          ],
        }
      ],
      en: [
        {
          heading: "Preview, download, archive",
          paragraphs: [
            "After synthesis, listen fully in the page player—check openings, endings, numbers, and English words. Download only when satisfied. Reconfirm format: MP3 for sharing, WAV for editors, PCM for raw sample pipelines.",
            "Rename immediately into a project folder, for example course01_lesson03_voice_v2.mp3. Keep an uncompressed master when available and publish compressed copies to avoid repeated lossy encodes.",
          ],
        },
        {
          heading: "If playback fails",
          paragraphs: [
            "Browsers may block autoplay—click play manually. Incomplete downloads need a regenerate. Raw PCM often needs a WAV wrapper. Try another format if one fails. Note browser version when reporting issues.",
            "On mobile, verify on a desktop player too. Muddy audio may be rate or sample-rate mismatch, not only the player. Use a checklist: clarity, completeness, naming, backup—then move to the edit.",
          ],
        }
      ],
    },
  },
  {
    slug: "multilingual-tts-tips",
    date: "2026-09-06",
    tags: ["guide","languages"],
    title: { zh: "多语种语音合成实用建议", en: "Practical Tips for Multilingual TTS" },
    description: { zh: "跨语种内容如何选语言、拆句与保持发音稳定。", en: "How to pick locales, split sentences, and keep pronunciation stable across languages." },
    sections: {
      zh: [
        {
          heading: "一种语言一段音频",
          paragraphs: [
            "跨语种内容最稳妥的做法，是让每一次合成请求只服务一种输出语种。中文讲解与英文术语解释可以拆成两段：先合成中文旁白，再合成英文例句，最后在时间轴拼接。这样引擎不必在同一句里频繁切换发音体系，专有名词也更不容易被「中文腔」或「英文腔」带偏。",
            "若必须在一句里保留少量外文，用空格或逗号把外文片段隔开，并亲自试听该句。品牌名、人名优先采用受众最熟悉的读法或官方推荐拼写，听感不对就改写法，而不是无限换音色。",
          ],
        },
        {
          heading: "本地化不只是翻译",
          paragraphs: [
            "把文案翻译成目标语后，还要按当地习惯改数字、日期与计量单位读法。直译长句往往不适合朗读，需要再口语化一遍。不同地区的同一语种（如英式/美式、大陆/台湾用语）也会影响选音与用词，发布前用目标地区同事或母语者抽检关键句。",
            "多语种项目建议维护一张表：语种、音色、语速、格式、负责人。批量生产时按表执行，能显著减少「这个语言用错声音」的低级错误，也方便后续替换某一语种版本而不动全局。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "One language per clip",
          paragraphs: [
            "The safest multilingual pattern is one output language per request. Split Chinese narration and English examples, synthesize separately, then join on a timeline so the engine is not constantly switching sound systems.",
            "If a sentence must keep a foreign fragment, separate it with spaces or commas and preview that line. Prefer familiar or official spellings for names; fix spelling before endless voice swaps.",
          ],
        },
        {
          heading: "Localization is more than translation",
          paragraphs: [
            "After translation, adapt numbers, dates, and units for listening. Literal long sentences rarely speak well—rewrite for speech. Regional variants of the same language also matter; have a native listener spot-check key lines.",
            "Keep a table of language, voice, rate, format, and owner. Batch work from that table to avoid wrong voices and to replace one locale without touching everything else.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "what-is-pcm",
    date: "2026-09-08",
    tags: ["format","pcm"],
    title: { zh: "PCM 是什么？文字转语音里的原始音频", en: "What Is PCM in Text to Speech?" },
    description: { zh: "用通俗语言解释 PCM 原理、优缺点，以及何时在 TTS 中选择它。", en: "A plain-language explainer of PCM, its trade-offs, and when to choose it for TTS." },
    sections: {
      zh: [
        {
          heading: "PCM 在说什么",
          paragraphs: [
            "PCM（Pulse Code Modulation，脉冲编码调制）是把连续声波变成数字样本的基础方式：按固定时间间隔采样，再把幅度量化成整数。可以把它理解成「尚未做感知压缩的原始波形数据」。采样率表示每秒多少个点，例如 16000 Hz 或 24000 Hz；位深常见为 16 bit。采样率与位深越高，通常细节越多，未压缩文件也越大。",
            "与 MP3 这类有损压缩不同，PCM 本身不通过丢弃人耳不敏感信息来减小体积。因此它适合当作中间态：你要自己写处理程序、做语音识别预处理、画波形，或接入只接受原始样本的流水线时，PCM 非常直接透明。",
          ],
        },
        {
          heading: "在文字转语音里怎么用",
          paragraphs: [
            "在本站选择 PCM，意味着你更关心「接近引擎输出的样本」，而不是立刻发给朋友播放。原始 PCM 往往缺少完整文件头，不少播放器双击无法打开，需要先包进 WAV 或其他容器。日常分享、上传社交平台，仍更推荐 MP3 或 WAV。",
            "若你的下一步是 ffmpeg 转码、做响度分析或自定义播放器，PCM/WAV 工作流更干净。记住：PCM 描述的是样本布局思路；真正发给用户的文件，通常还要有正确的封装与元数据。选 PCM 是为了可控，不是为了「听起来一定更好」。",
          ],
        }
      ],
      en: [
        {
          heading: "What PCM means",
          paragraphs: [
            "PCM (Pulse Code Modulation) turns a continuous waveform into digital samples: capture amplitude at fixed intervals and quantize to integers—basically uncompressed raw audio. Sample rate is points per second (for example 16000 Hz or 24000 Hz); 16-bit depth is common. Higher rate and depth usually mean more detail and larger files.",
            "Unlike lossy MP3, PCM does not shrink size by discarding less-audible detail. That makes it a strong intermediate for custom processing, ASR prep, waveform inspection, or pipelines that expect raw samples.",
          ],
        },
        {
          heading: "How to use it in TTS",
          paragraphs: [
            "Choosing PCM here means you want samples close to the engine output, not a file for instant social sharing. Raw PCM often lacks a full header, so many players will not open it until wrapped in WAV. For everyday sharing, prefer MP3 or WAV.",
            "If the next step is ffmpeg, loudness analysis, or a custom player, PCM/WAV stays cleaner. PCM is about sample layout control—not an automatic “sounds better” badge. Deliverable files still need proper containers and metadata.",
          ],
        }
      ],
    },
  },
  {
    slug: "what-is-wav",
    date: "2026-09-09",
    tags: ["format","wav"],
    title: { zh: "WAV 格式是什么？适合剪辑的无损容器", en: "What Is WAV? A Lossless Container for Editing" },
    description: { zh: "WAV 与 PCM 的关系、文件体积特点，以及在配音工作流中的用法。", en: "How WAV relates to PCM, file size trade-offs, and why editors love it." },
    sections: {
      zh: [
        {
          heading: "WAV 是容器，常装 PCM",
          paragraphs: [
            "WAV 是广泛使用的音频容器格式，文件内通常存放 PCM 数据，并写入采样率、声道数、位深等元信息。正因为有这些「说明书」，Premiere、DaVinci、Audition 等软件大多能直接导入、 scrubbing 与对齐时间码。相对 MP3，WAV 文件通常大得多，但避免再做一轮有损压缩，适合作为剪辑母带与存档。",
            "把 TTS 导出为 WAV，等于给后期留足余地：淡入淡出、EQ、降噪、与配乐对齐都更省心。磁盘紧张时，可用较高码率 MP3 做草稿，定稿前回刷 WAV 再出片。",
          ],
        },
        {
          heading: "什么时候选 WAV，什么时候不必",
          paragraphs: [
            "需要多轨剪辑、精确对齐口型或音乐卡点、或还要多次导出不同版本时，优先 WAV。若只是发给同事快速听一下内容对不对，MP3 更省流量与时间。邮件与部分即时通讯对附件大小敏感，超大 WAV 可能发不出去。",
            "工作流建议：定稿合成 → WAV 母带归档 → 再导出 MP3 发布。不要把已经压过的 MP3 再转回 WAV 指望「恢复无损」——信息一旦丢掉无法用转格式找回。WAV 的价值在「从源头保持干净」，而不是魔法修复。",
          ],
        }
      ],
      en: [
        {
          heading: "WAV is a container, often holding PCM",
          paragraphs: [
            "WAV is a common audio container that usually stores PCM plus metadata such as sample rate, channels, and bit depth. That header is why editors like Premiere, DaVinci, and Audition import and scrub it easily. Files are larger than MP3 but avoid another lossy encode—ideal as a working master.",
            "Exporting TTS to WAV leaves room for fades, EQ, noise reduction, and music sync. If disk is tight, draft with high-bitrate MP3, then refresh WAV before final delivery.",
          ],
        },
        {
          heading: "When WAV is worth it",
          paragraphs: [
            "Prefer WAV for multi-track edits, tight lip-sync or music hits, and multiple deliverables. For a quick “is the copy right?” listen, MP3 is faster. Huge WAV attachments may fail in email or chat.",
            "Recommended flow: final synthesis → archive WAV → publish MP3. Converting MP3 back to WAV does not restore lost detail. WAV’s value is staying clean from the source.",
          ],
        }
      ],
    },
  },
  {
    slug: "what-is-mp3",
    date: "2026-09-10",
    tags: ["format","mp3"],
    title: { zh: "MP3 格式是什么？分享与存档的常用选择", en: "What Is MP3? The Everyday Sharing Format" },
    description: { zh: "MP3 有损压缩原理、兼容性优势，以及 TTS 导出时的注意点。", en: "How MP3 compression works, why it is compatible everywhere, and TTS export tips." },
    sections: {
      zh: [
        {
          heading: "有损压缩为什么仍然主流",
          paragraphs: [
            "MP3 利用心理声学模型，去掉人耳相对不敏感的细节，从而在可接受听感下大幅减小文件体积。对旁白、口播、课件解说，合理码率下的 MP3 通常已经足够清晰，同时几乎所有浏览器、手机与内容平台都原生支持，兼容性极强。这也是为什么在线 TTS 默认导出常把 MP3 当作「最省心」选项。",
            "代价是：每一次有损编码都会损失一些信息。若你还要反复转码、做重度后期，应先保留 WAV/PCM 母带，只把 MP3 当作分发格式，而不是唯一存档。",
          ],
        },
        {
          heading: "TTS 场景下的实用建议",
          paragraphs: [
            "用于上传视频平台、发送客户预览、嵌入网页试听，优先 MP3。码率选择可交给工具默认，除非你有明确的平台规范。生成后用手机外放听一遍，确认嘈杂环境下关键词仍可辨。",
            "避免 MP3→MP3 多次互转；需要改动时回到母带重导。若听感发闷，先检查是否语速过快或采样率过低，而不要只怪「MP3 不行」。格式解决的是体积与兼容，文案与音色仍然决定听感上限。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Why lossy MP3 still wins",
          paragraphs: [
            "MP3 uses psychoacoustic models to drop less-audible detail and shrink files while remaining listenable. For narration and lessons, a sensible bitrate is usually clear enough, and nearly every browser, phone, and platform supports it—hence the common TTS default.",
            "Each lossy encode discards information. If you will re-encode or do heavy post, keep a WAV/PCM master and treat MP3 as distribution only.",
          ],
        },
        {
          heading: "Practical TTS tips",
          paragraphs: [
            "Prefer MP3 for platform uploads, client previews, and web playback. Use tool defaults unless a platform specifies bitrate. Check on phone speakers so key words survive noisy rooms.",
            "Avoid MP3-to-MP3 loops; return to the master for changes. If audio sounds dull, inspect rate and sample rate before blaming the format. Format handles size and compatibility; script and voice still set the ceiling.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "what-is-ogg",
    date: "2026-09-11",
    tags: ["format","ogg"],
    title: { zh: "OGG 格式是什么？开源容器入门", en: "What Is OGG? An Open Container Overview" },
    description: { zh: "OGG 容器特点、常见编解码组合，以及与网页播放的关系。", en: "OGG container traits, common codecs, and web playback considerations." },
    sections: {
      zh: [
        {
          heading: "开放容器与常见组合",
          paragraphs: [
            "OGG 通常指开放的多媒体容器（以及围绕它的生态）。它可以打包音频轨，并与 Vorbis、Opus 等编解码搭配使用。开源软件、部分网页与游戏模组场景里较常见。需要注意：人们口头说的「OGG 文件」，内部编码不一定相同，兼容性也不如 MP3 那样「随处可播」。",
            "因此，在选择 OGG 作为对外交付格式前，先确认目标播放器、浏览器或学习平台是否明确支持。面向不确定受众的下载页，最好同时提供 MP3，减少「打不开」的客服成本。",
          ],
        },
        {
          heading: "何时在 TTS 工作流里使用",
          paragraphs: [
            "若团队工具链已经统一使用 OGG，或嵌入的播放器只认该容器，可以在导出后继续沿用。若只是偶尔分享给客户，MP3/WAV 更稳妥。本站若提供 OGG 选项，适合作为特定流水线的一环，而不是替代所有格式。",
            "收到 OGG 素材时，用媒体信息工具查看内部编码与采样率，再决定是否转码。不要假设「OGG = 某种固定音质」。弄清容器与编解码的区别，能少走很多弯路——这也是理解 Opus 时必需的基础。",
          ],
        }
      ],
      en: [
        {
          heading: "Open container and common pairings",
          paragraphs: [
            "OGG usually refers to an open multimedia container (and its ecosystem). It can hold audio and pair with codecs such as Vorbis or Opus. It appears in open-source tools, some web players, and game mods. Spoken “OGG file” does not guarantee one inner codec, and support is less universal than MP3.",
            "Before shipping OGG externally, confirm the target player, browser, or LMS supports it. For unknown audiences, offer MP3 too to cut “won’t open” tickets.",
          ],
        },
        {
          heading: "When it fits a TTS pipeline",
          paragraphs: [
            "If your toolchain already standardizes on OGG, keep it. For ad-hoc client shares, MP3/WAV is safer. Treat OGG as a pipeline choice, not a replacement for every format.",
            "When you receive OGG, inspect codec and sample rate before transcoding. Do not assume “OGG equals a fixed quality.” Separating container from codec also unlocks understanding Opus.",
          ],
        }
      ],
    },
  },
  {
    slug: "what-is-opus",
    date: "2026-09-12",
    tags: ["format","opus"],
    title: { zh: "Opus 格式是什么？低延迟高效率语音编码", en: "What Is Opus? Efficient Low-Latency Speech Coding" },
    description: { zh: "解释 Opus 编解码特点、适用场景，以及与 TTS/实时通话的关系。", en: "Opus codec strengths, use cases, and how it relates to TTS and realtime voice." },
    sections: {
      zh: [
        {
          heading: "为实时与高效人声设计的编解码",
          paragraphs: [
            "Opus 是现代开源音频编解码器，目标是在低延迟与低码率下仍保持清晰，尤其擅长语音，也可覆盖音乐。实时通讯、直播、游戏语音、部分流媒体广泛使用它。与较早的语音编码相比，Opus 在「带宽很紧但还要听清说话」的场景往往更有优势。",
            "重要概念：Opus 是编解码算法，不是文件扩展名本身。实际文件常封装在 Ogg 或 WebM 等容器中。谈论「要不要用 Opus」时，同时要问「用什么容器、目标播放器是否支持」。",
          ],
        },
        {
          heading: "和本站导出选项的关系",
          paragraphs: [
            "本站导出以 MP3、WAV、OGG、PCM 等常见选项为主。若你的下游（例如 WebRTC 相关工具、特定播放器）明确要求 Opus，可先导出 WAV 或 PCM，再用 ffmpeg 等工具转码并封装。这样母带干净，也能按项目需要选择码率与复杂度参数。",
            "不要把 Opus 神化成「一定比 MP3 好听」。对离线旁白分发，MP3 的兼容性常常更重要；对实时与带宽敏感场景，Opus 更有价值。按链路需求选型，并在交付时注明容器与编码，避免对方打不开。",
          ],
        }
      ],
      en: [
        {
          heading: "A codec built for realtime speech efficiency",
          paragraphs: [
            "Opus is a modern open audio codec aiming for clarity at low latency and low bitrates—strong for speech, capable with music. It powers calls, live streams, game voice, and some streaming stacks. Under tight bandwidth, it often keeps talk more intelligible than older speech codecs.",
            "Opus is a codec, not a file extension by itself. Files are often wrapped in Ogg or WebM. When someone asks for Opus, also ask which container and whether players support it.",
          ],
        },
        {
          heading: "How it relates to this site",
          paragraphs: [
            "Exports here focus on MP3, WAV, OGG, and PCM. If your toolchain requires Opus, export WAV/PCM first, then transcode and mux with ffmpeg-style tools so the master stays clean.",
            "Opus is not automatically “better sounding than MP3.” Offline narration often needs MP3 compatibility; realtime and bandwidth-sensitive paths value Opus. Choose for the pipeline and label container plus codec on delivery.",
          ],
        }
      ],
    },
  },
  {
    slug: "pcm-vs-wav-vs-mp3",
    date: "2026-09-13",
    tags: ["format","comparison"],
    title: { zh: "PCM、WAV、MP3 怎么选？", en: "PCM vs WAV vs MP3: Which Should You Pick?" },
    description: { zh: "一张思路图帮你按剪辑、分享、二次处理选择格式。", en: "A simple decision guide for editing, sharing, and further processing." },
    sections: {
      zh: [
        {
          heading: "一张决策图",
          paragraphs: [
            "需要程序读写原始样本、自定义封装：选 PCM。需要导入剪辑软件当母带、做效果与对齐：选 WAV。需要立刻分享、上传平台、嵌入网页：选 MP3。体积上，PCM/WAV 通常显著大于 MP3；音质策略上，应从干净母带再压缩，而不是在有损格式之间来回转。",
            "很多团队的标准动作是：定稿后出一份 WAV 存档，再导出 MP3 发布；只有开发或算法同事要样本时才保留 PCM。这样既照顾后期，也照顾分发。",
          ],
        },
        {
          heading: "避免常见误区",
          paragraphs: [
            "误区一：以为扩展名换了音质就变了——把 MP3 改后缀当 WAV 不会增加信息。误区二：所有环节都用最高采样率未压缩——磁盘与带宽会爆炸，而听感提升有限。误区三：用压缩预览直接进成片母带——后期空间被锁死。",
            "把「编辑格式」与「发布格式」分开管理，写进项目规范。新人入职按规范导出，能减少大量返工。格式选择本质是工作流选择，不是玄学。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "A simple decision map",
          paragraphs: [
            "Need raw samples or custom packaging: PCM. Need an editor master with effects and sync: WAV. Need instant sharing or web playback: MP3. PCM/WAV are usually much larger than MP3. Compress from a clean master—do not bounce forever between lossy files.",
            "A common team habit: archive WAV at lock, publish MP3, keep PCM only when engineering needs samples.",
          ],
        },
        {
          heading: "Myths to skip",
          paragraphs: [
            "Renaming MP3 to WAV does not restore data. Max sample-rate uncompressed everywhere wastes disk for little gain. Using a compressed preview as the final master locks post options.",
            "Separate edit formats from publish formats in writing. New teammates following the rule saves rework. Format choice is workflow choice.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "when-to-use-pcm",
    date: "2026-09-14",
    tags: ["format","pcm"],
    title: { zh: "什么时候应该使用 PCM？", en: "When Should You Use PCM?" },
    description: { zh: "适合 PCM 的开发、科研与后期场景，以及不适合的日常分享场景。", en: "Dev, research, and post-production cases for PCM—and when to avoid it." },
    sections: {
      zh: [
        {
          heading: "PCM 真正发光的场景",
          paragraphs: [
            "当你要自己实现播放、做分帧分析、喂给语音识别或评估模型、测量波形与响度，或对接只接受原始样本的 API 时，PCM 很合适。它把采样率、声道、样本布局暴露得更清楚，减少「容器自动转换带来的意外」。科研对比不同 TTS 引擎时，统一到同一 PCM 规格，也便于公平比较。",
            "在自动化流水线里，PCM 常作为第一步产物，再由脚本封装为 WAV/MP3/Opus。这样中间步骤可测试、可回放、可替换编码器而不必重新合成。",
          ],
        },
        {
          heading: "什么时候别用 PCM 对外交付",
          paragraphs: [
            "客户试听、社交上传、邮件附件、大多数「双击即播」场景，优先 MP3 或 WAV。原始 PCM 缺少头信息时，对方会认为文件损坏。即便你附上采样率说明，非技术用户也很难处理。",
            "原则：对内管道用 PCM 求可控，对外交付用带元数据的容器求省心。若必须发送 PCM，请同时提供采样率、位深、声道、字节序说明，或直接改发 WAV。少一次解释，就少一次协作摩擦。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Where PCM shines",
          paragraphs: [
            "Use PCM when you build players, frame audio for ASR or eval models, inspect waveforms, or call APIs that expect raw samples. It exposes rate, channels, and layout clearly. For research comparing engines, a shared PCM spec keeps comparisons fair.",
            "In automation, PCM is often step one before scripts wrap WAV/MP3/Opus—so you can test, replay, and swap encoders without resynthesizing.",
          ],
        },
        {
          heading: "When not to ship raw PCM",
          paragraphs: [
            "Client previews, social uploads, email, and double-click playback prefer MP3 or WAV. Headerless PCM looks “corrupt” to non-technical users even with a note about sample rate.",
            "Rule: PCM for internal control, containers with metadata for external ease. If you must send PCM, document rate, depth, channels, and endianness—or just send WAV.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "sample-rate-explained",
    date: "2026-09-15",
    tags: ["format","quality"],
    title: { zh: "采样率是什么？16k 到 44.1k 怎么选", en: "Sample Rates Explained: 16 kHz to 44.1 kHz" },
    description: { zh: "理解采样率与清晰度、文件大小的关系，按用途选择。", en: "How sample rate affects clarity and size, and how to choose by use case." },
    sections: {
      zh: [
        {
          heading: "采样率决定什么",
          paragraphs: [
            "采样率是每秒采集多少个振幅点。16000 Hz 常见于通话与语音识别，文件更小，高频细节有限。22050 或 24000 Hz 是许多神经 TTS 的实用平衡点，对人声旁白通常足够。44100 Hz 接近 CD，便于与音乐工程对齐，但对「纯人声讲解」未必带来成正比的听感提升，未压缩时体积却明显变大。",
            "听感还取决于音色模型、比特率（对压缩格式）、播放设备与环境噪声。不要把采样率当成唯一质量旋钮。先保证文案清晰、音色合适，再考虑是否值得升到 44.1k。",
          ],
        },
        {
          heading: "按用途选择",
          paragraphs: [
            "网页试听、短视频口播、课件旁白：24000 Hz 一般够用。要与音乐、音效在同一工程里精细对齐：考虑 44100 Hz。带宽极紧或只做识别预处理：16000 Hz 可能更合适。选定后在整个项目保持一致，避免时间轴上出现奇怪的重采样伪影。",
            "若下游会强制重采样，尽量在源头就靠近目标规格，减少多次转换。导出后抽听齿音与镲片类高频是否刺耳或发闷，必要时再调整，而不是无脑上调采样率。",
          ],
        }
      ],
      en: [
        {
          heading: "What sample rate controls",
          paragraphs: [
            "Sample rate is amplitude points per second. 16000 Hz is common for calls and ASR—smaller files, less high-frequency detail. 22050 or 24000 Hz is a practical neural TTS balance for narration. 44100 Hz is CD-like and helps music pipelines, but pure speech may not gain proportionally while uncompressed size grows.",
            "Tone model, bitrate, speakers, and noise also shape quality. Do not treat sample rate as the only knob. Lock script and voice first, then decide if 44.1 kHz is worth it.",
          ],
        },
        {
          heading: "Choose by destination",
          paragraphs: [
            "Web previews, short video, and lessons: 24000 Hz is usually enough. Tight sync with music: consider 44100 Hz. Tiny bandwidth or ASR prep: 16000 Hz may fit. Keep one rate per project to avoid messy resampling on the timeline.",
            "If a platform will resample anyway, match it upstream. After export, check harsh or dull highs before blindly raising rate.",
          ],
        }
      ],
    },
  },
  {
    slug: "tts-for-courseware",
    date: "2026-09-17",
    tags: ["practice","education"],
    title: { zh: "用 TTS 为课件制作旁白", en: "Using TTS Narration for Courseware" },
    description: { zh: "教学幻灯片配音的节奏、分段与格式建议。", en: "Pacing, segmentation, and format tips for slide narration." },
    sections: {
      zh: [
        {
          heading: "按页拆分，降低返工",
          paragraphs: [
            "课件配音最怕「一整段十分钟旁白」。更稳妥的做法是：一页幻灯片对应一段音频，文案写在备注或独立脚本里。单页出错只需重合成该页，不影响整课。语速略慢于日常对话，术语第一次出现时可重复关键词，帮助学生跟上。避免在旁白里说「如图所示」却不给足够停顿让眼睛找图。",
            "试听时站在学生角度：能否在阅读要点的同时听懂？若不能，就删减句子或把次要信息放到讲义，而不是塞进语音。",
          ],
        },
        {
          heading: "格式、命名与无障碍",
          paragraphs: [
            "母带用 WAV，上传学习平台用 MP3。文件名带课次与页码，例如 unit02_p07_narration.mp3。同时提供文本稿，照顾听障学员与检索需求。统一音色与语速，整门课听感才连贯。",
            "批量生产时先锁定音色与参数，再按页流水线合成。抽检含公式、英文缩写与数字的页面。配音不是把讲义念完，而是引导注意力——短、清、稳，比「信息塞满」更有效。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "One slide, one clip",
          paragraphs: [
            "Avoid ten-minute monoliths. Map each slide to one clip stored in notes or a script file so fixes stay local. Speak slightly slower than conversation; repeat key terms once. Do not say “as shown” without a pause for eyes to find the figure.",
            "Listen as a student: can you read bullets and still understand? If not, cut lines or move detail to the handout.",
          ],
        },
        {
          heading: "Format, naming, access",
          paragraphs: [
            "WAV masters, MP3 for the LMS. Name files with unit and page numbers. Provide transcripts for accessibility and search. Keep one voice and rate across the course.",
            "Lock voice settings, then batch by page. Spot-check formulas, acronyms, and numbers. Narration should guide attention—short, clear, steady beats stuffing every fact into audio.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  }
];
