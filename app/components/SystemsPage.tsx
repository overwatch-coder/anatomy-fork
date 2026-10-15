"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  Compass,
  LibraryBig,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { organById } from "../lib/anatomy-data";
import { localizeOrgan } from "../lib/anatomy-ru";
import { bodySystems, systemById } from "../lib/content/systems";
import { BodyFigure, SYSTEM_COLORS } from "./BodyFigure";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { UiDictionary } from "../i18n/types";

/** Full-page overview of the twelve body systems with an interactive figure. */
export function SystemsPage({
  locale = "en",
  t,
}: {
  locale?: string;
  t?: UiDictionary;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>("cardiovascular");
  const selected = systemById[selectedId];
  const langKey = locale === "ru" ? "ru" : "en";
  const localized = (selected as any)[langKey] ?? selected.en;

  const openOrgan = (id: string) => {
    router.push(`/${locale}?organ=${id}`);
  };

  const getOrganItem = (id: string) => {
    const organ = organById[id as keyof typeof organById];
    if (!organ) return { name: id, icon: "✦" };
    if (locale === "ru") return localizeOrgan(organ, "ru");
    return organ;
  };

  return (
    <main className="systems-page">
      <header className="topbar topbar-slim">
        <Link className="brand" href={`/${locale}`} aria-label={t?.brand?.home ?? "Anatomy Atelier home"}>
          <strong>Anatomy Atelier<sup>✦</sup></strong>
          <em>{t?.brand?.tagline ?? "Learn anatomy like an artist"}</em>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link href={`/${locale}`}><Compass size={17} /> {t?.nav?.explore ?? "Explore"}</Link>
          <Link href={`/${locale}/systems`} className="active"><BrainCircuit size={17} /> {t?.nav?.systems ?? "Systems"}</Link>
          <Link href={`/${locale}?modal=lesson`}><BookOpen size={17} /> {t?.nav?.lessons ?? "Lessons"}</Link>
          <Link href={`/${locale}?modal=profile`}><LibraryBig size={17} /> {t?.nav?.library ?? "Library"}</Link>
          <Link href={`/${locale}?modal=notes`}><NotebookPen size={17} /> {t?.nav?.notes ?? "Notes"}</Link>
        </nav>
        {t && <LanguageSwitcher locale={locale} t={t} />}
        <Link className="profile" href={`/${locale}?modal=profile`} aria-label={t?.profile?.open ?? "Profile"}>
          <span>MA</span><ChevronDown size={15} />
        </Link>
      </header>

      <div className="systems-hero">
        <h1>{t?.nav?.systems ?? "Body Systems"}</h1>
        <p>Twelve organ systems working as one coordinated living whole. Select a system to highlight its path through the body.</p>
      </div>

      <div className="systems-layout">
        <aside className="systems-panel" aria-label="Organ systems">
          <h2>Select system</h2>
          <div className="systems-list" role="tablist" aria-label="Organ systems">
            {bodySystems.map((system) => {
              const item = (system as any)[langKey] ?? system.en;
              return (
                <button
                  key={system.id}
                  type="button"
                  role="tab"
                  aria-selected={system.id === selectedId}
                  className={`system-item ${system.id === selectedId ? "active" : ""}`}
                  onClick={() => setSelectedId(system.id)}
                >
                  <i className="system-dot" style={{ background: SYSTEM_COLORS[system.id] }} />
                  <span>{item.name}</span>
                  <small>{system.organIds.length}</small>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="figure-panel" aria-label="Human body figure">
          <BodyFigure selectedSystem={selectedId} onSelectOrgan={openOrgan} locale={locale} />
          <p className="figure-hint"><Sparkles size={14} /> Click any organ or system to focus</p>
          <div className="legend" aria-label="Systems legend">
            {bodySystems.map((system) => {
              const sysItem = (system as any)[langKey] ?? system.en;
              return (
                <button
                  key={system.id}
                  type="button"
                  className={`legend-chip ${system.id === selectedId ? "active" : ""}`}
                  onClick={() => setSelectedId(system.id)}
                  title={sysItem.name}
                >
                  <i style={{ background: SYSTEM_COLORS[system.id] }} />
                  <span>{sysItem.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="system-detail-panel">
          <h2>System details</h2>
          <div className="detail-card" key={selectedId}>
            <h3>{localized.name}</h3>
            <p>{localized.description}</p>
            <h4>Interactive 3D models</h4>
            <div className="organ-chips">
              {selected.organIds.map((id) => {
                const item = getOrganItem(id);
                return (
                  <button key={id} type="button" className="organ-chip" onClick={() => openOrgan(id)}>
                    <span className="organ-chip-thumb">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                    <ArrowRight size={13} />
                  </button>
                );
              })}
            </div>
          </div>
          <Link className="lesson-button" href={`/${locale}`}>
            Back to 3D explore <ArrowRight size={16} />
          </Link>
        </aside>
      </div>

      <p className="systems-note"><Sparkles size={15} /> All organ systems are functionally interdependent — no organ functions in isolation.</p>
    </main>
  );
}
