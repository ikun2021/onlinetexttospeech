import type { BlogPost, LocalizedString } from "./types";
import { postsPart1 } from "./posts-part1";
import { postsPart2 } from "./posts-part2";
import { postsPart3 } from "./posts-part3";

export type { BlogPost, LocalizedString };

export const posts: BlogPost[] = [...postsPart1, ...postsPart2, ...postsPart3];
