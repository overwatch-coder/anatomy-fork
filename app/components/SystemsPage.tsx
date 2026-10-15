"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { organById } from "../lib/anatomy-data";
import { localizeOrgan } from "../lib/anatomy-ru";
import { bodySystems, systemById } from "../lib/content/systems";
import { BodyFigure, SYSTEM_COLORS } from "./BodyFigure";
import { AppHeader } from "./AppHeader";
import type { OrganContentDictionary, UiDictionary } from "../i18n/types";
import { getModalDictionary } from "../i18n/modals";

/** Full-page overview of the twelve body systems with an interactive figure. */
export function SystemsPage({
  locale = "en",
  t,
  organDict,
}: {
  locale?: string;
  t?: UiDictionary;
  organDict?: OrganContentDictionary;
}) {
  const router = useRouter();
  const m = getModalDictionary(locale);
  const [selectedId, setSelectedId] = useState<string>("cardiovascular");
  const selected = systemById[selectedId] ?? bodySystems[0];
  const langKey = locale === "ru" ? "ru" : "en";
  const localized = (selected as any)[locale] ?? (selected as any)[langKey] ?? selected.en;

  const openOrgan = (id: string) => {
    router.push(`/${locale}?organ=${id}`);
  };

  const getOrganItem = (id: string) => {
    if (organDict?.[id]) {
      const base = organById[id as keyof typeof organById];
      return {
        name: organDict[id].name,
        icon: base?.icon ?? "✦",
      };
    }
    const organ = organById[id as keyof typeof organById];
    if (!organ) return { name: id, icon: "✦" };
    if (locale === "ru") return localizeOrgan(organ, "ru");
    return organ;
  };

  return (
    <main className="systems-page">
      <AppHeader locale={locale} t={t} activePage="systems" />

      <div className="systems-hero">
        <h1>{t?.nav?.systems ?? m.systemsHeroTitle}</h1>
        <p>{m.systemsHeroSubtitle}</p>
      </div>

      <div className="systems-layout">
        <aside className="systems-panel" aria-label="Organ systems">
          <h2>{m.selectSystem}</h2>
          <div className="systems-list" role="tablist" aria-label="Organ systems">
            {bodySystems.map((system) => {
              const item = (system as any)[locale] ?? (system as any)[langKey] ?? system.en;
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
          <BodyFigure
            selectedSystem={selectedId}
            onSelectOrgan={openOrgan}
            locale={locale}
            organDict={organDict}
          />
          <p className="figure-hint"><Sparkles size={14} /> {m.figureHint}</p>
          <div className="legend" aria-label="Systems legend">
            {bodySystems.map((system) => {
              const sysItem = (system as any)[locale] ?? (system as any)[langKey] ?? system.en;
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
          <h2>{m.systemDetails}</h2>
          <div className="detail-card" key={selectedId}>
            <h3>{localized.name}</h3>
            <p>{localized.description}</p>
            <h4>{m.interactiveModels}</h4>
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
            {m.backTo3D} <ArrowRight size={16} />
          </Link>
        </aside>
      </div>

      <p className="systems-note"><Sparkles size={15} /> {m.systemsInterdependentNote}</p>
    </main>
  );
}
