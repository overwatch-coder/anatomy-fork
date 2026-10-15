"use client";

import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  ChevronDown,
  Compass,
  LibraryBig,
  NotebookPen,
  Search,
} from "lucide-react";
import type { LocaleConfig } from "../i18n/config";
import type { UiDictionary } from "../i18n/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type NavPage = "explore" | "systems" | "lessons" | "library" | "notes";

export interface AppHeaderProps {
  locale: LocaleConfig | string;
  t?: UiDictionary;
  activePage?: NavPage;
  onBrandClick?: () => void;
  onOpenModal?: (modal: "lesson" | "profile" | "quiz" | "compare") => void;
  onToggleSaved?: () => void;
  showSavedOnly?: boolean;
  onOpenLibrary?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

/**
 * Universal topbar navigation component shared across all application pages.
 * Uses a symmetric 3-column layout (1fr auto 1fr) to guarantee that the primary
 * navigation is always centered in the viewport.
 */
export function AppHeader({
  locale,
  t,
  activePage = "explore",
  onBrandClick,
  onOpenModal,
  onToggleSaved,
  showSavedOnly = false,
  onOpenLibrary,
  searchQuery,
  onSearchChange,
  showSearch = false,
}: AppHeaderProps) {
  const localeCode = typeof locale === "string" ? locale : locale.code;

  return (
    <header className="topbar">
      {/* 1. Left: Brand */}
      <div className="topbar-left">
        {onBrandClick ? (
          <button
            className="brand"
            type="button"
            onClick={onBrandClick}
            aria-label={t?.brand?.home ?? "Anatomy Atelier home"}
          >
            <strong>Anatomy Atelier<sup>✦</sup></strong>
            <em>{t?.brand?.tagline ?? "Learn anatomy like an artist"}</em>
          </button>
        ) : (
          <Link
            className="brand"
            href={`/${localeCode}`}
            aria-label={t?.brand?.home ?? "Anatomy Atelier home"}
          >
            <strong>Anatomy Atelier<sup>✦</sup></strong>
            <em>{t?.brand?.tagline ?? "Learn anatomy like an artist"}</em>
          </Link>
        )}
      </div>

      {/* 2. Center: Primary Navigation (always mathematically centered) */}
      <div className="topbar-center">
        <nav className="main-nav" aria-label="Primary navigation">
          {activePage === "explore" ? (
            <button
              type="button"
              className="active"
              onClick={onBrandClick}
            >
              <Compass size={17} />
              <span>{t?.nav?.explore ?? "Explore"}</span>
            </button>
          ) : (
            <Link href={`/${localeCode}`}>
              <Compass size={17} />
              <span>{t?.nav?.explore ?? "Explore"}</span>
            </Link>
          )}

          <Link
            href={`/${localeCode}/systems`}
            className={activePage === "systems" ? "active" : ""}
          >
            <BrainCircuit size={17} />
            <span>{t?.nav?.systems ?? "Systems"}</span>
          </Link>

          {onOpenModal ? (
            <button
              type="button"
              onClick={() => onOpenModal("lesson")}
              className={activePage === "lessons" ? "active" : ""}
            >
              <BookOpen size={17} />
              <span>{t?.nav?.lessons ?? "Lessons"}</span>
            </button>
          ) : (
            <Link
              href={`/${localeCode}?modal=lesson`}
              className={activePage === "lessons" ? "active" : ""}
            >
              <BookOpen size={17} />
              <span>{t?.nav?.lessons ?? "Lessons"}</span>
            </Link>
          )}

          {onToggleSaved ? (
            <button
              type="button"
              onClick={onToggleSaved}
              className={showSavedOnly || activePage === "library" ? "active" : ""}
            >
              <LibraryBig size={17} />
              <span>{t?.nav?.library ?? "Library"}</span>
            </button>
          ) : (
            <Link
              href={`/${localeCode}?saved=true`}
              className={activePage === "library" ? "active" : ""}
            >
              <LibraryBig size={17} />
              <span>{t?.nav?.library ?? "Library"}</span>
            </Link>
          )}

          {onOpenModal ? (
            <button
              type="button"
              onClick={() => onOpenModal("profile")}
              className={activePage === "notes" ? "active" : ""}
            >
              <NotebookPen size={17} />
              <span>{t?.nav?.notes ?? "Notes"}</span>
            </button>
          ) : (
            <Link
              href={`/${localeCode}?modal=profile`}
              className={activePage === "notes" ? "active" : ""}
            >
              <NotebookPen size={17} />
              <span>{t?.nav?.notes ?? "Notes"}</span>
            </Link>
          )}
        </nav>
      </div>

      {/* 3. Right: Search & Actions */}
      <div className="topbar-right">
        {searchQuery !== undefined && onSearchChange !== undefined ? (
          <label className="search-box">
            <Search size={17} />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={t?.search?.placeholder ?? "Search organs..."}
            />
          </label>
        ) : showSearch ? (
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
              if (target?.value) {
                window.location.href = `/${localeCode}?q=${encodeURIComponent(target.value)}`;
              }
            }}
          >
            <Search size={17} />
            <input
              name="q"
              placeholder={t?.search?.placeholder ?? "Search organs..."}
            />
          </form>
        ) : null}

        <LanguageSwitcher locale={locale} t={t} />

        {onOpenModal ? (
          <button
            type="button"
            className="profile"
            onClick={() => onOpenModal("profile")}
            aria-label={t?.profile?.open ?? "Profile"}
          >
            <span>MA</span>
            <ChevronDown size={15} />
          </button>
        ) : (
          <Link
            className="profile"
            href={`/${localeCode}?modal=profile`}
            aria-label={t?.profile?.open ?? "Profile"}
          >
            <span>MA</span>
            <ChevronDown size={15} />
          </Link>
        )}

        {onOpenLibrary && (
          <button
            type="button"
            className="mobile-library-trigger"
            onClick={onOpenLibrary}
            aria-label={t?.library?.open ?? "Open library"}
          >
            <LibraryBig size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
