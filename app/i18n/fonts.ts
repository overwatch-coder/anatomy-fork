import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Naskh_Arabic,
  Noto_Sans,
  Noto_Sans_Arabic,
} from "next/font/google";
import type { ScriptGroup } from "./config";

// The display pair. Cormorant Garamond carries the "atelier" voice and happens
// to ship Cyrillic, so Latin and Russian share it.
const cormorant = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"] });
const cormorantCyrillic = Cormorant_Garamond({ variable: "--font-serif", subsets: ["cyrillic", "latin"], weight: ["400", "500", "600"] });
const dmSans = DM_Sans({ variable: "--font-sans", subsets: ["latin", "latin-ext"] });
const notoSansCyrillic = Noto_Sans({ variable: "--font-sans", subsets: ["cyrillic", "latin"] });

const arabicSerif = Noto_Naskh_Arabic({ variable: "--font-serif", subsets: ["arabic"], weight: ["400", "500", "600"] });
const arabicSans = Noto_Sans_Arabic({ variable: "--font-sans", subsets: ["arabic"] });

const webFonts: Partial<Record<ScriptGroup, { serif: { variable: string }; sans: { variable: string } }>> = {
  latin: { serif: cormorant, sans: dmSans },
  cyrillic: { serif: cormorantCyrillic, sans: notoSansCyrillic },
  arabic: { serif: arabicSerif, sans: arabicSans },
};

/**
 * Chinese, Japanese, Korean, and Devanagari use platform fonts rather than web fonts.
 *
 * This avoids hundreds of unicode-range subset files and prevents Turbopack Google
 * Font resolution failures during Vercel builds, while leveraging crisp system typefaces.
 */
const systemFontClass: Partial<Record<ScriptGroup, string>> = {
  sc: "font-stack-sc",
  jp: "font-stack-jp",
  kr: "font-stack-kr",
  devanagari: "font-stack-devanagari",
};

/** Font classes for a script — only this script's faces are requested. */
export function fontClassName(script: ScriptGroup) {
  const system = systemFontClass[script];
  if (system) return system;
  const pair = webFonts[script] ?? webFonts.latin!;
  return `${pair.serif.variable} ${pair.sans.variable}`;
}
