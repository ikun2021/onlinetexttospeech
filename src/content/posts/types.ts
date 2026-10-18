export type LocalizedString<T = string> = {
  zh: T;
  en: T;
};

export type BlogFigure = {
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
};

export type BlogPost = {
  slug: string;
  date: string;
  tags: string[];
  title: LocalizedString;
  description: LocalizedString;
  sections: LocalizedString<{ heading: string; paragraphs: string[] }[]>;
  /** Cover illustration shown under the title */
  cover?: BlogFigure;
  /** Optional second figure inserted after the first section */
  figure?: BlogFigure;
};
