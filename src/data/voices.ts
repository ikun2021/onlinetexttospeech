import voicesData from "@/language";

export interface VoiceItem {
  label: string;
  language: string;
  value: string;
  name: string;
  gender: "Female" | "Male" | "Unknown";
  displayName: string;
  description?: string;
  localeCode: string;
}

export interface LocaleGroup {
  localeName: string;
  localeCode: string;
  family: string;
  flag: string;
  voiceCount: number;
  voices: VoiceItem[];
}

export interface FamilyGroup {
  family: string;
  locales: LocaleGroup[];
}

// Convert 2-letter country code to flag emoji
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🌐";
  }
}

// Extract locale code like "zh-CN" from "zh-CN-XiaoxiaoNeural" or "zh-CN-liaoning-XiaobeiNeural"
export function extractLocaleCode(voiceValue: string): string {
  const parts = voiceValue.split("-");
  if (parts.length >= 2) {
    return `${parts[0]}-${parts[1]}`;
  }
  return "en-US";
}

// Extract country code like "CN" from "zh-CN"
export function extractCountryCode(localeCode: string): string {
  const parts = localeCode.split("-");
  return parts.length >= 2 ? parts[1] : "";
}

// Friendly Chinese descriptions for popular voices
const VOICE_DESCRIPTIONS: Record<string, { zhDesc: string; zhName?: string }> = {
  "zh-CN-XiaoxiaoNeural": { zhName: "晓晓", zhDesc: "温暖柔和，极佳的通用女主播，适合有声书与解说" },
  "zh-CN-YunxiNeural": { zhName: "云希", zhDesc: "阳光活力男声，富有感染力，适合小说故事与对话" },
  "zh-CN-YunjianNeural": { zhName: "云健", zhDesc: "磁性稳重男声，铿锵有力，短视频电影解说首选" },
  "zh-CN-XiaoyiNeural": { zhName: "晓伊", zhDesc: "清脆知性女声，娓娓道来，适合纪录片与科普" },
  "zh-CN-YunyangNeural": { zhName: "云扬", zhDesc: "专业新闻播音员男声，字正腔圆，端庄大气" },
  "zh-CN-YunxiaNeural": { zhName: "云霞", zhDesc: "可爱元气童声，天真纯粹，适合儿童读物与动画" },
  "zh-CN-liaoning-XiaobeiNeural": { zhName: "小北 (辽宁)", zhDesc: "东北特色方言口音，幽默风趣有特色" },
  "zh-CN-shaanxi-XiaoniNeural": { zhName: "小妮 (陕西)", zhDesc: "西北陕西特色方言口音，质朴亲切" },
  "zh-HK-HiuMaanNeural": { zhName: "晓曼", zhDesc: "标准粤语女声，自然温婉，适合港式对话与解说" },
  "zh-HK-WanLungNeural": { zhName: "云龙", zhDesc: "标准粤语男声，成熟干练，适合新闻及旁白" },
  "zh-HK-HiuGaaiNeural": { zhName: "晓佳", zhDesc: "清新粤语女声，节奏轻快活泼" },
  "zh-TW-HsiaoChenNeural": { zhName: "晓臻", zhDesc: "标准国语台湾腔女声，甜美自然" },
  "zh-TW-YunJheNeural": { zhName: "云哲", zhDesc: "标准国语台湾腔男声，温和谦逊" },
  "zh-TW-HsiaoYuNeural": { zhName: "晓雨", zhDesc: "活泼亲切国语台湾女声" },
  "en-US-JennyNeural": { zhName: "Jenny", zhDesc: "Clear, conversational and versatile American female" },
  "en-US-GuyNeural": { zhName: "Guy", zhDesc: "Casual, confident and natural American male" },
  "en-US-AriaNeural": { zhName: "Aria", zhDesc: "Expressive, studio-grade neural voice with rich tones" },
  "en-US-ChristopherNeural": { zhName: "Christopher", zhDesc: "Authoritative and warm professional narrator" },
  "en-US-AnaNeural": { zhName: "Ana", zhDesc: "Youthful, energetic and charming American voice" },
  "en-GB-SoniaNeural": { zhName: "Sonia", zhDesc: "Sophisticated British English female voice" },
  "en-GB-RyanNeural": { zhName: "Ryan", zhDesc: "Engaging and warm British English male voice" },
  "ja-JP-NanamiNeural": { zhName: "七海 (Nanami)", zhDesc: "日本女生标准音，甜美自然" },
  "ja-JP-KeitaNeural": { zhName: "圭太 (Keita)", zhDesc: "日本青年男声，清晰沉稳" },
  "ko-KR-SunHiNeural": { zhName: "善姬 (SunHi)", zhDesc: "标准韩语女声，温和知性" },
  "ko-KR-InJoonNeural": { zhName: "仁俊 (InJoon)", zhDesc: "标准韩语男声，充满亲和力" },
};

function parseVoice(raw: { label: string; language: string; value: string }): VoiceItem {
  const genderMatch = raw.label.match(/\((Male|Female)\)/i);
  const gender: "Female" | "Male" | "Unknown" = genderMatch
    ? (genderMatch[1].charAt(0).toUpperCase() + genderMatch[1].slice(1).toLowerCase() as any)
    : "Unknown";

  const rawName = raw.label.replace(/\((Male|Female)\)/i, "").trim();
  const localeCode = extractLocaleCode(raw.value);
  const descInfo = VOICE_DESCRIPTIONS[raw.value];

  const displayName = descInfo?.zhName ? `${descInfo.zhName} (${rawName})` : rawName;
  const description = descInfo?.zhDesc || `${gender} Voice · ${raw.language}`;

  return {
    label: raw.label,
    language: raw.language,
    value: raw.value,
    name: rawName,
    gender,
    displayName,
    description,
    localeCode,
  };
}

// Pre-index families and locales
const typedVoicesData: Record<string, Record<string, { label: string; language: string; value: string }[]>> = voicesData as any;

const ALL_LOCALES: LocaleGroup[] = [];
const ALL_VOICES: VoiceItem[] = [];
const VOICE_MAP = new Map<string, VoiceItem>();
const LOCALE_MAP = new Map<string, LocaleGroup>();

for (const [family, locales] of Object.entries(typedVoicesData)) {
  for (const [localeName, voices] of Object.entries(locales)) {
    if (!voices || voices.length === 0) continue;

    const firstVoice = voices[0];
    const localeCode = extractLocaleCode(firstVoice.value);
    const countryCode = extractCountryCode(localeCode);
    const flag = getFlagEmoji(countryCode);

    const parsedVoices = voices.map(parseVoice);
    const group: LocaleGroup = {
      localeName,
      localeCode,
      family,
      flag,
      voiceCount: parsedVoices.length,
      voices: parsedVoices,
    };

    ALL_LOCALES.push(group);
    if (!LOCALE_MAP.has(localeCode)) {
      LOCALE_MAP.set(localeCode, group);
    }
    LOCALE_MAP.set(localeName, group);

    for (const v of parsedVoices) {
      ALL_VOICES.push(v);
      VOICE_MAP.set(v.value, v);
    }
  }
}

// Sort locales with Chinese and English at the top for convenience
const PRIORITY_LOCALES = ["zh-CN", "zh-HK", "zh-TW", "en-US", "en-GB", "ja-JP", "ko-KR", "fr-FR", "de-DE", "es-ES"];
ALL_LOCALES.sort((a, b) => {
  const idxA = PRIORITY_LOCALES.indexOf(a.localeCode);
  const idxB = PRIORITY_LOCALES.indexOf(b.localeCode);
  if (idxA !== -1 && idxB !== -1) return idxA - idxB;
  if (idxA !== -1) return -1;
  if (idxB !== -1) return 1;
  return a.family.localeCompare(b.family);
});

export function getAllLocales(): LocaleGroup[] {
  return ALL_LOCALES;
}

export function getLocale(localeCodeOrName: string): LocaleGroup | undefined {
  return LOCALE_MAP.get(localeCodeOrName) || ALL_LOCALES.find(
    (l) => l.localeCode.toLowerCase() === localeCodeOrName.toLowerCase() ||
           l.localeName.toLowerCase() === localeCodeOrName.toLowerCase()
  );
}

export function getVoicesForLocale(localeCodeOrName: string): VoiceItem[] {
  const loc = getLocale(localeCodeOrName);
  return loc ? loc.voices : [];
}

export function getVoiceByValue(voiceValue: string): VoiceItem | undefined {
  return VOICE_MAP.get(voiceValue);
}

export function searchVoices(query: string): VoiceItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_VOICES.slice(0, 50);

  return ALL_VOICES.filter(
    (v) =>
      v.value.toLowerCase().includes(q) ||
      v.displayName.toLowerCase().includes(q) ||
      v.name.toLowerCase().includes(q) ||
      v.language.toLowerCase().includes(q) ||
      v.localeCode.toLowerCase().includes(q)
  );
}
