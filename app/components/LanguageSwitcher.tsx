"use client";

import { ChevronDown, Globe } from "lucide-react";
import type { LocaleConfig } from "../i18n/config";
import { locales } from "../i18n/config";
import type { UiDictionary } from "../i18n/types";

export function LanguageSwitcher({ locale, t }: { locale: LocaleConfig | string; t?: UiDictionary }) {
  const currentCode = typeof locale === "string" ? locale : locale.code;
  const currentConfig = locales.find((l) => l.code === currentCode) ?? locales[0];

  return (
    <div className="language-switcher" title={t?.language?.label ?? "Language"}>
      <Globe size={16} aria-hidden />
      <span className="language-current">{currentConfig.nativeName}</span>
      <ChevronDown size={14} aria-hidden />
      <select
        aria-label={t?.language?.choose ?? "Choose language"}
        value={currentCode}
        onChange={(event) => {
          const newLocale = event.target.value;
          const currentPath = window.location.pathname;
          const segments = currentPath.split("/").filter(Boolean);
          if (segments.length > 0 && locales.some((l) => l.code === segments[0])) {
            segments[0] = newLocale;
            window.location.pathname = `/${segments.join("/")}`;
          } else {
            window.location.pathname = `/${newLocale}`;
          }
        }}
      >
        {locales.map((entry) => (
          <option key={entry.code} value={entry.code} lang={entry.code}>
            {entry.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}
