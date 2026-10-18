import type { BlogPost } from "./types";

export const postsPart2: BlogPost[] = [
  {
    slug: "tts-for-podcasts",
    date: "2026-09-18",
    tags: ["practice","podcast"],
    title: { zh: "播客与有声内容中的 TTS 用法", en: "Using TTS for Podcasts and Audio Content" },
    description: { zh: "如何用合成语音做片头、摘要与双语补充轨。", en: "How to use synthetic speech for intros, summaries, and bilingual tracks." },
    sections: {
      zh: [
        {
          heading: "TTS 适合播客的哪些段落",
          paragraphs: [
            "播客里，片头口号、章节摘要、赞助商声明、结束导语等标准化文案很适合 TTS：改稿快、多语言版本成本低。深度访谈、即兴笑点与强烈个人风格，仍更适合真人。可以把 TTS 当作「节目助手」固定音色，听众一听就知道进入摘要或广告段落。",
            "脚本要按「听」来写：短句、少从句、数字读出来不绕口。更新一季节目时，只替换变更的摘要段，不必重录整集。",
          ],
        },
        {
          heading: "混音与响度",
          paragraphs: [
            "TTS 轨与背景音乐、过渡音效之间留足响度差，对白优先。按播客平台目标 LUFS 做响度标准化，避免一集忽大忽小。导出前检查呼吸感是否被压限打死，以及床音乐是否掩蔽齿音。",
            "若做双语版，中英摘要分轨合成再对齐同一时间码。母带保留 WAV，分发用平台要求的压缩格式。TTS 不是要取代主持人，而是让重复劳动更轻、版本迭代更快。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Where TTS fits a show",
          paragraphs: [
            "Intros, chapter summaries, sponsor reads, and outros are strong TTS fits—fast edits and cheaper multilingual versions. Deep interviews and personality-driven banter stay human. Reuse one “assistant” voice so listeners recognize those segments.",
            "Write for listening: short sentences, fewer clauses, speakable numbers. When a season updates, regenerate only changed summaries.",
          ],
        },
        {
          heading: "Mix and loudness",
          paragraphs: [
            "Leave headroom between TTS, music, and stingers; prioritize speech. Normalize to podcast LUFS targets so episodes stay consistent. Check that limiting did not kill breath and that beds do not mask sibilance.",
            "For bilingual shows, render language tracks separately and align timecode. Archive WAV; deliver what the host requires. TTS should lighten repetitive labor, not replace the host’s voice.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "tts-for-accessibility",
    date: "2026-09-19",
    tags: ["practice","accessibility"],
    title: { zh: "无障碍朗读与 TTS", en: "Accessibility Reading with TTS" },
    description: { zh: "用清晰语速与简洁文本提升可听读体验。", en: "Clear pacing and concise scripts for more listen-friendly content." },
    sections: {
      zh: [
        {
          heading: "可听读从文本改造开始",
          paragraphs: [
            "无障碍朗读的目标是让更多人「听得懂、跟得上」。先把书面语改成适合听的短句，少用括号、脚注符号与复杂从句。数字、日期、序号写成更易朗读的形式。图表信息要用语言描述结论，而不是只说「见图」。同时提供文本稿与音频，用户可按场景选择。",
            "语速略慢、音量稳定，避免夸张音效干扰理解。关键信息（时间、地点、操作步骤）可在段首重复一次。尽量固定音色，减少认知负担。",
          ],
        },
        {
          heading: "场景与验证",
          paragraphs: [
            "政策通知、操作指南、学习材料、产品说明都适合提供 TTS 版本。发布前请目标用户或借助读屏用户反馈：是否有跳读、是否过快、专有名词是否需额外解释。",
            "技术上选择兼容性好的 MP3 便于分发，并保证页面播放器可用键盘操作。无障碍不是「加一段机器音就结束」，而是内容结构、替代文本与听感参数一起达标。持续收集反馈并迭代脚本，比一次性追求「完美音色」更有价值。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Start by rewriting for listening",
          paragraphs: [
            "Accessibility audio should be understandable at speed. Rewrite print prose into short sentences; reduce parentheses and nested clauses. Speak numbers and dates clearly. Describe chart conclusions instead of “see figure.” Offer both transcript and audio.",
            "Use a slightly slower, steady voice without flashy SFX. Repeat critical facts once at section starts. Keep one consistent voice to lower cognitive load.",
          ],
        },
        {
          heading: "Contexts and validation",
          paragraphs: [
            "Policies, how-tos, learning materials, and product guides benefit from TTS versions. Test with target users: pacing, skip risk, and names that need explanation.",
            "Distribute compatible MP3 and ensure the player is keyboard-usable. Accessibility is structure, alternatives, and pacing together—not just attaching machine audio. Iterate scripts from feedback more than chasing a perfect voice once.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "pauses-and-punctuation",
    date: "2026-09-20",
    tags: ["practice","script"],
    title: { zh: "用标点与停顿让 TTS 更自然", en: "Punctuation and Pauses for More Natural TTS" },
    description: { zh: "逗号、句号与分段如何影响合成节奏。", en: "How commas, periods, and line breaks shape synthetic rhythm." },
    sections: {
      zh: [
        {
          heading: "标点就是节奏轨",
          paragraphs: [
            "多数 TTS 引擎会把句号、问号读成较强停顿，逗号、顿号较短，省略号与破折号则带来犹豫或转折感。一长串无标点文本容易被「一口气念完」，听者来不及消化。写作时把一意群写成一句，该停的地方果断加标点，比事后靠语速硬扛更有效。",
            "需要强调时，拆成独立短句，而不是堆感叹号。列表内容改成「第一…第二…」的口述结构，避免引擎把符号读得很怪。",
          ],
        },
        {
          heading: "用分段合成控制气口",
          paragraphs: [
            "超长段落可按意群拆开分别生成，在时间轴上留 200–400 毫秒间隙，听感往往更从容，也方便单独替换某一句。预览时重点听句尾是否被切断：若有，检查句末标点是否完整，或给末句略留余地。",
            "中英混排处的标点也要统一风格，减少引擎切分混乱。把「标点检查」列入发布前清单，成本低、收益高。自然度常常不是模型突然变强，而是你让它「有气口可换」。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Punctuation is your pace track",
          paragraphs: [
            "Most engines treat periods and question marks as stronger pauses than commas. Huge unpunctuated blocks sound rushed. Write one idea per sentence and punctuate where a listener needs breath—better than fixing everything with rate.",
            "For emphasis, split short sentences instead of stacking exclamation marks. Turn bullets into “first… second…” spoken structure so symbols are not read oddly.",
          ],
        },
        {
          heading: "Segment for breath",
          paragraphs: [
            "Split long paragraphs by idea, render separately, and leave 200–400 ms gaps. That also makes single-line replacements easy. Check cut-off endings and finish with clear punctuation.",
            "Keep punctuation style consistent in mixed-language lines. Add a punctuation pass to your release checklist. Naturalness often comes from giving the model places to breathe.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "mixed-chinese-english-scripts",
    date: "2026-09-21",
    tags: ["practice","languages"],
    title: { zh: "中英混排文案的合成技巧", en: "Tips for Mixed Chinese–English Scripts" },
    description: { zh: "减少中英夹杂导致的怪腔与重音错位。", en: "Reduce odd accents and stress errors in bilingual scripts." },
    sections: {
      zh: [
        {
          heading: "减少夹杂，或有计划地夹杂",
          paragraphs: [
            "中英混排最容易出现怪腔、重音错位与缩写被逐字朗读。能统一成一种语言的段落，尽量统一。必须保留的英文专有名词、产品名、代码标识，可单独成段用英语音色合成，再拼回中文旁白。这样两套发音体系各司其职，听感通常更干净。",
            "若缩写必须嵌在中文句子里，用空格或逗号隔开，并专门试听该句。不要假设引擎「应该懂」你的内部黑话。",
          ],
        },
        {
          heading: "改写与终检",
          paragraphs: [
            "把「调用 API 接口进行 TTS 合成」改成更顺口的说法，或拆成两句。品牌名采用官方中文译名或固定英文读法，团队内写进术语表。终检时重点听产品名、版本号、URL 与邮箱是否可读；不行就改写法或改拆分。",
            "记录「混排高压句」样例，作为回归试听集。每次更换音色或引擎版本，先跑这批句子。混排不是禁区，但需要流程，而不是碰运气。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Mix less—or mix on purpose",
          paragraphs: [
            "Mixed Chinese–English lines invite odd stress and letter-by-letter acronyms. Prefer one language per segment. Keep unavoidable English names in a separate English-voice clip, then join to Chinese narration.",
            "If an acronym must sit inside Chinese, separate it and preview that line. Do not assume the engine knows internal jargon.",
          ],
        },
        {
          heading: "Rewrite and regression listen",
          paragraphs: [
            "Break dense tech phrases into speakable lines. Lock official name readings in a glossary. Final pass: product names, versions, URLs, emails—respell or resplit if needed.",
            "Keep a set of “hard mix” sentences as a regression suite whenever voice or engine changes. Mixing is fine with a process, not luck.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "voice-preview-workflow",
    date: "2026-09-22",
    tags: ["practice","voices"],
    title: { zh: "音色试听工作流：少走弯路", en: "A Voice Preview Workflow That Saves Time" },
    description: { zh: "用短样本对比音色，再定稿长文合成。", en: "Compare short samples before committing long-form synthesis." },
    sections: {
      zh: [
        {
          heading: "标准试听句与评分表",
          paragraphs: [
            "在定音色前，准备一句「含数字、问句、品牌名、中英片段」的标准试听稿，对每个候选只合成这一句。从清晰度、亲和力、品牌匹配、长句稳定性四项打分，留下前两名。再用同一音色合成一段 150–200 字的完整段落，观察气口与连贯性是否仍在线。",
            "把分数与备注记在表格里，避免靠记忆对比。团队决策时有据可依，减少「我觉得这个更好」的拉扯。",
          ],
        },
        {
          heading: "锁定参数后再量产",
          paragraphs: [
            "音色、语速、音量、格式、采样率写成项目默认值，变更需登记。未锁定前不要批量合成长文，否则换声音成本极高。定期用标准句做回归试听，防止平台音色更新后风格漂移。",
            "试听环境尽量固定：同一耳机、适中音量。把工作流固化为「标准句筛选 → 短段落验证 → 锁定 → 量产」，能显著节省额度与时间，也让外包或同事接手时有章可循。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Sample line and scorecard",
          paragraphs: [
            "Before locking a voice, use one sample with numbers, a question, a brand name, and a bilingual fragment. Score clarity, warmth, brand fit, and long-line stability; keep the top two. Then render a 150–200 character paragraph to check pacing.",
            "Write scores down so decisions are not memory contests.",
          ],
        },
        {
          heading: "Lock settings, then scale",
          paragraphs: [
            "Document voice, rate, volume, format, and sample rate. Do not batch long renders before lock. Re-run the sample line after platform voice updates.",
            "Keep listening conditions steady. The loop “sample → short paragraph → lock → scale” saves quota and makes handoffs clear.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "tts-vs-human-recording",
    date: "2026-09-24",
    tags: ["advanced","comparison"],
    title: { zh: "TTS 与真人录音如何取舍", en: "TTS vs Human Recording: How to Choose" },
    description: { zh: "从成本、迭代速度与情感表现对比两种方案。", en: "Compare cost, iteration speed, and emotional delivery." },
    sections: {
      zh: [
        {
          heading: "成本、速度与可控性",
          paragraphs: [
            "TTS 的优势是改稿快、多语种扩展成本低、无需预约录音棚与配音员档期，适合教程、系统提示、批量通知、版本频繁迭代的内容。真人录音的优势是复杂情感、即兴变化、品牌代言识别度，以及表演性强的广告与有声书角色。两者不是对立，而是工具箱里的不同扳手。",
            "预算紧、更新勤的项目可先 TTS 上线，关键句或广告大片再替换真人。反之，高端品牌片可用真人，周边说明用 TTS 补齐多语言。",
          ],
        },
        {
          heading: "混合策略与决策清单",
          paragraphs: [
            "问自己：这段是否需要强烈人格？是否周更？是否要十种语言？是否必须对口型表演？答案会指向 TTS、真人，或「TTS 打底 + 真人补强」。无论哪种，都要统一响度、降噪标准与文件命名，避免混剪时风格割裂。",
            "也要考虑授权与肖像：真人声音有合同边界；TTS 则关注文本版权与平台条款。把选择写进制作手册，比每次争论更高效。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Cost, speed, control",
          paragraphs: [
            "TTS wins on fast revisions, multilingual scale, and no studio booking—great for tutorials, prompts, and frequent updates. Humans win on complex emotion, improvisation, brand identity, and performance-heavy ads. They are different tools, not enemies.",
            "Ship TTS first when budget and update speed matter; replace key lines with humans later. Or keep humans for hero spots and TTS for supporting locales.",
          ],
        },
        {
          heading: "Hybrid checklist",
          paragraphs: [
            "Ask: strong personality needed? weekly updates? ten languages? lip-sync acting? Answers point to TTS, human, or TTS base plus human polish. Unify loudness, noise floors, and naming either way.",
            "Mind contracts for human voice; mind text rights and platform terms for TTS. Write the choice into a production handbook.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "tts-copyright-basics",
    date: "2026-09-25",
    tags: ["advanced","legal"],
    title: { zh: "TTS 音频使用与版权基础须知", en: "Basic Copyright Notes for TTS Audio" },
    description: { zh: "合法使用合成音频的常见注意点（非法律意见）。", en: "Common lawful-use reminders for synthetic audio (not legal advice)." },
    sections: {
      zh: [
        {
          heading: "文本权利先于音频权利",
          paragraphs: [
            "使用在线 TTS 前，先确认你对输入文本有权使用与分发。不要把未授权的受版权保护全书粘贴上来做公开有声版。生成音频不会自动清空文本版权问题。本站说明仅供参考，不构成法律意见；重要项目请咨询专业人士。",
            "公司内部文案、已获授权译稿、原创脚本通常更安全。引用他人短句时，注意合理使用边界与署名要求，不同司法辖区规则不同。",
          ],
        },
        {
          heading: "配乐、平台与隐私",
          paragraphs: [
            "旁白之外的音乐、音效、素材需单独授权。TTS 不能自动解决配乐版权。上传 YouTube、播客托管或应用商店时，还要遵守各平台对合成内容与商业使用的规则。",
            "不要把含密码、证件号、未公开机密的文本送去合成。保护隐私与遵守版权同样重要。把「文本来源可追溯、素材授权可出示」做成发布前检查项，能降低下架与纠纷风险。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Text rights come first",
          paragraphs: [
            "Confirm you may use and distribute the input text before synthesizing. Do not paste unauthorized books for public audiobooks. Audio output does not clear text copyright. This is not legal advice—seek counsel for critical launches.",
            "Original scripts, licensed translations, and internal copy are safer paths. Short quotes may involve fair use and attribution rules that vary by jurisdiction.",
          ],
        },
        {
          heading: "Music, platforms, privacy",
          paragraphs: [
            "Music and SFX need their own licenses. TTS does not clear beds automatically. Follow each host platform’s rules on synthetic media and commercial use.",
            "Never synthesize passwords, ID numbers, or secret plans. Traceable text sources and licensable assets belong on your pre-publish checklist.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "common-tts-mistakes",
    date: "2026-09-26",
    tags: ["advanced","troubleshooting"],
    title: { zh: "文字转语音常见错误与规避", en: "Common TTS Mistakes and How to Avoid Them" },
    description: { zh: "空文本、错误语种、过长段落等典型问题。", en: "Empty input, wrong locale, oversized paragraphs, and similar pitfalls." },
    sections: {
      zh: [
        {
          heading: "提交前就能避免的错误",
          paragraphs: [
            "空文本、语种与文案不匹配、已超每日额度、格式与下游不兼容，是最常见的失败原因。全大写英文墙、无标点长句、未说明的内部缩写，则容易造成怪腔。提交前用清单过一遍：非空、语种对、额度够、短句试听过、命名规则就绪。",
            "先短后长：未锁定音色与语速前，不要把全书送去合成。改一处参数就重跑万字，是典型的额度与时间双浪费。",
          ],
        },
        {
          heading: "听感问题对照处理",
          paragraphs: [
            "机械感强：加标点、拆短句、略降语速。含糊：换更清晰音色或降速。尾音切断：补全句末标点或分段合成。专有名词怪：改拼写或单独合成。发闷：检查是否多次有损转码，回到母带。",
            "建立「问题→动作」小卡片贴在团队文档。大多数「模型不行」其实是流程问题。把错误当成清单迭代，质量会稳定上升。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Failures you can prevent",
          paragraphs: [
            "Empty input, wrong language, quota exceeded, and incompatible formats cause many errors. ALL-CAPS walls, unpunctuated blocks, and undocumented acronyms cause odd speech. Checklist: non-empty, right locale, quota left, short preview done, naming ready.",
            "Short before long: do not render a book before locking voice and rate.",
          ],
        },
        {
          heading: "Sound issues → actions",
          paragraphs: [
            "Robotic: punctuate, shorten, slow slightly. Muddy: clearer voice or slower rate. Cut endings: finish punctuation or segment. Bad names: respell or isolate. Dull: stop lossy loops; return to master.",
            "Keep a problem→action card in team docs. Most “bad model” reports are process gaps. Iterate the checklist and quality stabilizes.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "audio-file-size-and-bandwidth",
    date: "2026-09-27",
    tags: ["advanced","performance"],
    title: { zh: "音频体积、带宽与格式选择", en: "File Size, Bandwidth, and Format Choice" },
    description: { zh: "在音质与加载速度之间做务实取舍。", en: "Practical trade-offs between quality and load time." },
    sections: {
      zh: [
        {
          heading: "体积从哪里来",
          paragraphs: [
            "同样时长下，未压缩的 PCM/WAV 通常远大于 MP3。采样率、声道数、位深会进一步放大未压缩体积；压缩格式则主要受码率与编码效率影响。移动端弱网用户加载大文件会流失，内网归档则更在意质量与可编辑性。纯人声场景不必盲目使用 44.1k 立体声未压缩——收益有限成本很高。",
            "先问分发对象：试听流、下载母带、还是应用内缓存？对象不同，格式策略就不同。",
          ],
        },
        {
          heading: "务实的分发策略",
          paragraphs: [
            "站点试听用压缩格式；下载区可同时提供「预览 MP3」与「母带 WAV」。CDN 与缓存头设置好，避免重复拉大文件。批量课件可按章节拆分，而不是单文件两小时。",
            "监控真实用户网速与完播率，用数据决定是否值得提高码率。体积优化与听感优化应一起做：先保证关键句清晰，再削冗余采样与声道。带宽是产品体验的一部分，不只是运维指标。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Where size comes from",
          paragraphs: [
            "For equal duration, PCM/WAV usually dwarfs MP3. Sample rate, channels, and bit depth grow uncompressed size; compressed size tracks bitrate and codec efficiency. Weak mobile networks punish huge files; LAN archives prioritize editability. Pure speech rarely needs 44.1 kHz stereo uncompressed.",
            "Ask whether you are streaming previews, offering masters, or caching in-app—then pick formats.",
          ],
        },
        {
          heading: "Practical distribution",
          paragraphs: [
            "Stream compressed previews; offer preview MP3 plus master WAV downloads. Configure CDN caching. Split long courses by chapter.",
            "Watch real network conditions and completion rates before raising bitrate. Keep key lines clear, then cut excess rate and channels. Bandwidth is UX, not only ops.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "privacy-when-using-tts",
    date: "2026-09-28",
    tags: ["advanced","privacy"],
    title: { zh: "使用在线 TTS 时的隐私建议", en: "Privacy Tips When Using Online TTS" },
    description: { zh: "哪些文本不适合上传，以及本站的基本处理原则。", en: "What not to paste online, and how this site approaches processing." },
    sections: {
      zh: [
        {
          heading: "哪些内容不应粘贴",
          paragraphs: [
            "密码、验证码、银行卡与证件号、未公开的商业机密、他人隐私对话、病历等敏感信息，不应提交到任何在线合成服务。合成请求会经网络发送到语音引擎处理，请只输入你愿意传输的内容。详细原则见本站隐私政策与 Cookie 政策。",
            "公司项目可建立「可合成 / 不可合成」数据分级。不确定时，先脱敏：替换真实姓名与数字，确认流程通畅再用正式文本在安全环境处理。",
          ],
        },
        {
          heading: "本地偏好与良好习惯",
          paragraphs: [
            "语言、主题、额度计数与 Cookie 同意状态保存在浏览器本地。公共电脑使用后应清理站点数据。不要在截图里暴露完整客户文案后随手发到公开群。",
            "团队协作通过权限受控的文档传脚本，而不是反复粘贴到不明网页。隐私与安全是内容生产的前置条件：先判断能不能说，再追求好听。养成最小化输入的习惯，风险会低很多。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "What never to paste",
          paragraphs: [
            "Passwords, codes, ID or card numbers, unpublished secrets, private chats, and medical details should not go to online TTS. Requests travel to a speech engine—only submit what you accept transmitting. See our Privacy and Cookie policies.",
            "Use data classes for company work. When unsure, redact names and numbers first, then run real text in a controlled setting.",
          ],
        },
        {
          heading: "Local prefs and habits",
          paragraphs: [
            "Language, theme, quota, and cookie consent live in local browser storage—clear them on shared PCs. Do not leak full client scripts via public screenshots.",
            "Share scripts through controlled docs, not random sites. Decide whether content may be spoken before chasing tone. Minimize what you input.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "tts-faq",
    date: "2026-09-29",
    tags: ["advanced","faq"],
    title: { zh: "在线文字转语音常见问题 FAQ", en: "Online Text to Speech FAQ" },
    description: { zh: "收费、账号、格式、失败重试等高频问题速答。", en: "Quick answers on pricing, accounts, formats, and retries." },
    sections: {
      zh: [
        {
          heading: "收费、账号与能力",
          paragraphs: [
            "本服务提供免费在线合成能力，并设有每日字符额度，具体以页面计数为准。一般无需注册账号即可使用。支持多语种与多种音色，格式常见为 MP3、WAV、OGG、PCM，采样率可按页面选项选择。功能以线上实际界面为准，文档会随产品更新。",
            "生成的音频可用于合法的学习、内容创作与个人项目；请同时遵守文本版权与平台规则。商业大规模场景请自行评估合规与稳定性需求。",
          ],
        },
        {
          heading: "失败、联系与进阶",
          paragraphs: [
            "失败时检查网络、空文本、额度、语种与格式，更换音色或缩短文本后重试。持续异常可邮件联系 contact@onlinetexttospeech.com，并说明浏览器与复现步骤。想了解 PCM、Opus 等格式，可阅读本博客相关文章。",
            "建议收藏「短句试听 → 定稿合成 → 母带归档 → 压缩分发」流程。FAQ 解决高频疑问；深度问题仍回到文案、音色与工作流本身。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Pricing, accounts, capabilities",
          paragraphs: [
            "Online synthesis is free within a daily character limit shown on the page. Signup is usually not required. Multiple languages and voices are available; formats commonly include MP3, WAV, OGG, and PCM with on-page sample rates. The live UI is the source of truth.",
            "Use audio for lawful learning and creation; respect text rights and platform rules. Assess compliance needs for large commercial workloads yourself.",
          ],
        },
        {
          heading: "Failures and next steps",
          paragraphs: [
            "On failure, check network, empty input, quota, language, and format; try another voice or shorter text. Persistent issues: email contact@onlinetexttospeech.com with browser and steps. Read related blog posts for PCM and Opus.",
            "Remember preview → final render → archive master → distribute compressed. FAQs clear blockers; depth still lives in script, voice, and workflow.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "ogg-vs-opus",
    date: "2026-09-30",
    tags: ["format","opus","ogg"],
    title: { zh: "OGG 与 Opus 有何不同？", en: "OGG vs Opus: What Is the Difference?" },
    description: { zh: "容器与编解码器的区别，避免把两者混为一谈。", en: "Container vs codec—stop mixing the two concepts." },
    sections: {
      zh: [
        {
          heading: "容器与编解码不要混为一谈",
          paragraphs: [
            "OGG（常指 Ogg 容器及生态）负责「把数据打包成文件」；Opus 是一种具体的音频压缩算法。常见组合是 Ogg 容器承载 Opus 编码，但 OGG 文件内部也可能是 Vorbis 等其它编码。反过来，Opus 也可以放进 WebM 等容器。把「OGG」和「Opus」当成同一个东西，会导致选错工具与播放器。",
            "交付时写清楚：容器 + 编码 + 采样率，对方才知道用什么打开。",
          ],
        },
        {
          heading: "怎么选型",
          paragraphs: [
            "关心低码率清晰通话或实时场景：优先评估 Opus。关心大众设备双击可播：优先 MP3。已经绑定某播放器只认 OGG 容器：跟随容器要求，并确认内部编码。本站导出后若需 Opus，可用母带转码，不必强求引擎直接出 Opus。",
            "用媒体信息工具查看未知文件，再决定播放或转换。概念分清之后，格式讨论会高效很多，也更少出现「我发了 OGG 但对方说不是 Opus」的误会。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Container versus codec",
          paragraphs: [
            "OGG (the Ogg container/ecosystem) packages data; Opus is a specific audio codec. Ogg+Opus is common, but an OGG file might hold Vorbis instead. Opus can also live in WebM. Treating OGG and Opus as synonyms causes wrong player choices.",
            "Label deliveries with container + codec + sample rate.",
          ],
        },
        {
          heading: "How to choose",
          paragraphs: [
            "Realtime clarity at low bitrate: evaluate Opus. Universal double-click playback: MP3. Player locked to OGG: follow the container and verify the inner codec. Transcode from a master if you need Opus downstream.",
            "Inspect unknown files before converting. Clear vocabulary prevents “I sent OGG but it is not Opus” threads.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "batch-tts-productivity",
    date: "2026-10-01",
    tags: ["practice","productivity"],
    title: { zh: "批量旁白生产的效率方法", en: "Productivity Methods for Batch TTS Narration" },
    description: { zh: "脚本模板、命名规范与分批合成流程。", en: "Script templates, naming rules, and batch synthesis flow." },
    sections: {
      zh: [
        {
          heading: "模板、参数与命名",
          paragraphs: [
            "批量旁白的效率来自标准化。为片头、转场、片尾建立文案模板，只替换变量。音色、语速、音量、格式写成项目约定，变更需记录。文件命名采用「项目_章节_序号_音色_版本」，避免桌面堆满 final_final。脚本放在版本库或共享文档，合成结果放对象存储或网盘固定目录。",
            "用表格跟踪：段落状态（草稿/待合成/已通过）、负责人、备注。任何人接手都能续上，而不是从聊天记录考古。",
          ],
        },
        {
          heading: "流水线与抽检",
          paragraphs: [
            "先锁定音色，再按章节批量合成。每批抽检约 10%，重点听开头、结尾、数字与混排句。同一类问题集中出现时，先改脚本模板再重跑，不要逐条手工救火。额度紧张时优先 P0 章节。",
            "自动化方面，可把「导出清单」与时间轴标记对齐，减少人工拖拽。效率不是让人更快点按钮，而是让错误更早暴露、正确步骤可重复。把一次成功的流程写成 checklist，下次就能复制。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Templates, settings, names",
          paragraphs: [
            "Batch speed comes from standards. Template intros, transitions, and outros. Lock voice, rate, volume, and format. Name files project_chapter_index_voice_version. Keep scripts in shared docs; store renders in a fixed folder.",
            "Track status (draft/render/pass), owner, and notes in a sheet so handoffs do not rely on chat archaeology.",
          ],
        },
        {
          heading: "Pipeline and spot checks",
          paragraphs: [
            "Lock voice, then batch by chapter. Spot-check about 10% focusing on openings, endings, numbers, and mixed lines. When one pattern fails, fix the template before rerunning. Spend scarce quota on P0 chapters first.",
            "Align export lists with timeline markers. Efficiency is early error detection and repeatable steps—write the checklist after the first success.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "prepare-script-for-tts",
    date: "2026-10-02",
    tags: ["guide","script"],
    title: { zh: "为 TTS 优化文案的写作清单", en: "A Writing Checklist to Optimize Scripts for TTS" },
    description: { zh: "从书面语到可朗读口语的改写要点。", en: "Rewrite print-like prose into speakable language." },
    sections: {
      zh: [
        {
          heading: "从书面语到可朗读",
          paragraphs: [
            "TTS 友好文案的核心是：一句一个意思，少堆长定语，少用「见图 3」「同上」这类依赖视觉的表达，改成「请看第三张图」「与上一段相同的步骤」。把列表改成「第一…第二…」的口述结构。缩写首次出现时给出全称或读法提示。中英混排按前文建议拆分。",
            "删掉无法听懂的表情符号与无意义装饰字符。需要停顿的地方用标点，而不是靠空格堆砌。",
          ],
        },
        {
          heading: "冷读与定稿",
          paragraphs: [
            "自己不出声扫读或小声读一遍，凡是卡住、换气困难的地方，引擎也容易不自然。请同事听标准试听句。定稿后再合成，避免边写边渲。把检查项做成清单：标点、数字、专名、混排、长度、敏感信息。",
            "好的脚本能让普通音色听起来更专业；差的脚本能让顶级音色也显得慌乱。写作是 TTS 质量里最便宜、杠杆最大的一环，值得在合成按钮之前多花十分钟。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "From print to speakable",
          paragraphs: [
            "One idea per sentence, fewer stacked clauses, and replace “see Fig. 3” with spoken guidance. Turn bullets into “first… second…”. Expand acronyms on first use. Split mixed-language lines as discussed earlier.",
            "Remove unspeakable emoji clutter. Use punctuation for pauses instead of endless spaces.",
          ],
        },
        {
          heading: "Cold read, then lock",
          paragraphs: [
            "Skim or whisper the script; anywhere you stumble, the engine may too. Have a colleague hear the sample line. Render only after lock. Checklist: punctuation, numbers, names, mixing, length, sensitive data.",
            "Strong scripts make average voices sound pro; weak scripts make great voices sound rushed. Writing is the cheapest high-leverage step before you click synthesize.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  },
  {
    slug: "choose-format-for-video",
    date: "2026-10-03",
    tags: ["format","video"],
    title: { zh: "视频配音应选择哪种音频格式？", en: "Which Audio Format Should You Use for Video Voiceover?" },
    description: { zh: "面向剪辑时间线与成片导出的格式建议。", en: "Format advice for editors’ timelines and final exports." },
    sections: {
      zh: [
        {
          heading: "剪辑时间线上的选择",
          paragraphs: [
            "视频配音进入 Premiere、DaVinci、Final Cut 等时间线时，优先 WAV：定位、淡入淡出、响度与效果器更省心，也减少预览时解码压力带来的卡顿错觉。素材极多且磁盘紧张，可用较高码率 MP3 做草稿，定稿前用同一脚本回刷 WAV，再出片。PCM 适合你有自定义处理脚本时，一般剪辑师更熟悉 WAV。",
            "保持项目采样率一致，避免口型与字幕对不齐的隐形重采样问题。",
          ],
        },
        {
          heading: "成片封装与交付",
          paragraphs: [
            "成片进 MP4/MOV 时，视频工具常会再次编码音轨。母带越干净，累计损失通常越小。平台若限制音轨格式，按平台规范导出，但本地仍保留 WAV 工程与旁白母带。多语言版本为每条语音轨单独管理，不要覆盖唯一母带。",
            "交付给客户时说明：预览可用 MP3，后续修改请基于 WAV。视频配音的格式策略，核心是「编辑无损、发布适配」，与纯音频项目同一逻辑，只是多了画面时间码约束。",
            "结合本站在线文字转语音的实际操作：先短句试听，再定稿合成，按场景选择 MP3、WAV 或 PCM，并留意每日字符额度与隐私边界，这样能把理论落到可重复的生产流程里。",
          ],
        }
      ],
      en: [
        {
          heading: "Choices on the timeline",
          paragraphs: [
            "In Premiere, DaVinci, or Final Cut, prefer WAV for scrubbing, fades, loudness, and effects. Draft with high-bitrate MP3 if disk is tight, then refresh WAV before final. PCM fits custom scripts; most editors expect WAV.",
            "Keep one project sample rate to avoid hidden resampling that drifts against picture and captions.",
          ],
        },
        {
          heading: "Muxing and delivery",
          paragraphs: [
            "MP4/MOV exports often re-encode audio—cleaner masters lose less. Follow platform audio rules for upload, but keep WAV projects and narration masters locally. Manage each language track without overwriting the only master.",
            "Tell clients MP3 is for preview and WAV is for revisions. Video voiceover still follows “lossless while editing, compatible when publishing,” with picture timecode as the extra constraint.",
            "In practice on this site: preview short lines, synthesize the locked script, pick MP3, WAV, or PCM by destination, and watch daily quota plus privacy boundaries so theory becomes a repeatable production habit.",
          ],
        }
      ],
    },
  }
];
