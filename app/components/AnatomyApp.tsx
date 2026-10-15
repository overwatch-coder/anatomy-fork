"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Bookmark,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock,
  Compass,
  Copy,
  Download,
  Eye,
  FileText,
  Globe,
  Heart,
  LibraryBig,
  Microscope,
  NotebookPen,
  Play,
  Plus,
  RotateCcw,
  Save,
  Search,
  Share2,
  Sparkles,
  SplitSquareVertical,
  Stethoscope,
  Trash2,
  X,
} from "lucide-react";
import { OrganViewer } from "./OrganViewer";
import type { OrganId } from "../lib/anatomy-data";
import type { LocaleConfig } from "../i18n/config";
import { locales } from "../i18n/config";
import { buildOrgans, indexOrgans, type Organ } from "../i18n/merge";
import { format, type Dictionary, type UiDictionary } from "../i18n/types";
import { quizBank } from "../lib/content/questions";
import { lessons } from "../lib/content/lessons";
import { histology } from "../lib/content/histology";
import { functionAnimations } from "../lib/content/animations";
import { progressStore, useProgress } from "../lib/progress";
import { getModalDictionary } from "../i18n/modals";

type Modal = "lesson" | "quiz" | "animation" | "system" | "inside" | "profile" | "compare" | "notes" | null;

/**
 * Renders an organ illustration, or its accent glyph for organs that ship as a
 * 3D model without the painted asset set.
 */
function OrganArt({
  organ,
  asset,
  alt,
  size,
}: {
  organ: Organ;
  asset: "thumb" | "organ" | "microscopic" | "compare" | "location";
  alt: string;
  size?: number;
}) {
  if (!organ.illustrated) {
    const labelling = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
    return (
      <span className="art-fallback" style={{ "--art-accent": organ.accent } as React.CSSProperties} {...labelling}>
        {organ.icon}
      </span>
    );
  }
  return (
    <img
      key={`${organ.id}-${asset}`}
      src={`/anatomy/${organ.id}/${asset}.webp`}
      alt={alt}
      width={size}
      height={size}
      loading={asset === "thumb" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function Measure({ children }: { children: string }) {
  return <bdi dir={/^[\d(]/.test(children.trim()) ? "ltr" : "auto"}>{children}</bdi>;
}

import { AppHeader } from "./AppHeader";

export function AnatomyApp({ locale, dictionary }: { locale: LocaleConfig; dictionary: Dictionary }) {
  const t = dictionary.ui;
  const organs = useMemo(() => buildOrgans(dictionary.organs), [dictionary.organs]);
  const organById = useMemo(() => indexOrgans(organs), [organs]);
  const progress = useProgress();

  const [organId, setOrganId] = useState<OrganId>("heart");
  const [referenceId, setReferenceId] = useState<OrganId>("brain");
  const [autoRotate, setAutoRotate] = useState(true);
  const [compare, setCompare] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [query, setQuery] = useState("");
  const [mobileLibrary, setMobileLibrary] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefetched = useRef(new Set<OrganId>());
  const organ = organById[organId] ?? organs[0];
  const reference = organById[referenceId === organId ? (organId === "heart" ? "brain" : "heart") : referenceId] ?? organs[1];

  // Pick up organ from URL query if navigated from systems or external links
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paramOrgan = params.get("organ");
    if (paramOrgan && paramOrgan in organById) {
      setOrganId(paramOrgan as OrganId);
    }
    const modalParam = params.get("modal") as Modal;
    if (modalParam) setModal(modalParam);
  }, [organById]);

  // Mark organ visited
  useEffect(() => {
    progressStore.markVisited(organId);
  }, [organId]);

  const filteredOrgans = useMemo(() => {
    return organs.filter((item) => {
      if (showSavedOnly && !progress.saved.includes(item.id)) return false;
      if (!query.trim()) return true;
      const haystack = `${item.name} ${item.system}`.toLocaleLowerCase(locale.code);
      return haystack.includes(query.toLocaleLowerCase(locale.code));
    });
  }, [organs, query, locale.code, showSavedOnly, progress.saved]);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current.querySelectorAll("[data-reveal]"),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.48, stagger: 0.035, ease: "power2.out", overwrite: true },
    );
  }, [organId]);

  const selectOrgan = (id: OrganId) => {
    if (organById[id]?.illustrated) {
      ["organ", "microscopic", "compare", "location"].forEach((asset) => {
        const image = new Image();
        image.src = `/anatomy/${id}/${asset}.webp`;
      });
    }
    setOrganId(id);
    if (referenceId === id) {
      setReferenceId(id === "heart" ? "brain" : "heart");
    }
    setMobileLibrary(false);
    setAnimate(false);
    setQuizActive(false);
  };

  const prefetchOrgan = (id: OrganId) => {
    if (id === organId || prefetched.current.has(id) || !organById[id]) return;
    prefetched.current.add(id);
    void fetch(organById[id].model, { priority: "low" } as RequestInit).catch(() => {});
  };

  return (
    <main className="app-shell">
      <AppHeader
        locale={locale}
        t={t}
        activePage="explore"
        onBrandClick={() => selectOrgan("heart")}
        onOpenModal={(modalType) => setModal(modalType as Modal)}
        onToggleSaved={() => setShowSavedOnly((s) => !s)}
        showSavedOnly={showSavedOnly}
        onOpenLibrary={() => setMobileLibrary(true)}
        searchQuery={query}
        onSearchChange={setQuery}
      />

      <div className="workspace">
        <aside className={`organ-library ${mobileLibrary ? "open" : ""}`}>
          <div className="panel-heading">
            <span>{showSavedOnly ? t.library.saved : t.library.title}</span>
            <button aria-label={t.library.close} className="mobile-close" onClick={() => setMobileLibrary(false)}><X size={17} /></button>
            <button
              aria-label={t.library.saved}
              className={showSavedOnly ? "active" : ""}
              onClick={() => setShowSavedOnly((s) => !s)}
              title={showSavedOnly ? "Show all" : "Show saved"}
            >
              <Bookmark size={17} fill={showSavedOnly ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="organ-list" role="radiogroup" aria-label={t.library.title}>
            {filteredOrgans.map((item) => (
              <button
                type="button"
                key={item.id}
                role="radio"
                aria-checked={organId === item.id}
                className={`organ-item ${organId === item.id ? "active" : ""}`}
                onClick={() => selectOrgan(item.id)}
                onPointerEnter={() => prefetchOrgan(item.id)}
                onFocus={() => prefetchOrgan(item.id)}
                style={{ "--item-accent": item.accent } as React.CSSProperties}
              >
                <span className="organ-glyph">
                  <OrganArt organ={item} asset="thumb" alt="" size={47} />
                </span>
                <span><b>{item.name}</b><small>{item.system}</small></span>
                {organId === item.id && (
                  <Check className="selected-mark" size={15} strokeWidth={2.6} aria-hidden />
                )}
              </button>
            ))}
          </div>
          <button className="view-all" onClick={() => { setQuery(""); setShowSavedOnly(false); }}>
            {t.library.viewAll} <ArrowRight size={14} />
          </button>
          <blockquote>
            <Sparkles size={18} />
            <p>{t.library.quoteLine1}<br />{t.library.quoteLine2}</p>
            <em>{t.library.quoteSign}</em>
          </blockquote>
        </aside>

        <OrganViewer
          organ={organ}
          t={t}
          autoRotate={autoRotate}
          onAutoRotate={setAutoRotate}
          compare={compare}
          onCompare={() => setCompare(!compare)}
          animate={animate}
          onAnimateChange={setAnimate}
          quizActive={quizActive}
          onQuizExit={() => setQuizActive(false)}
        />

        <aside className="info-panel" ref={contentRef}>
          <div className="info-kicker" data-reveal>
            <button
              type="button"
              onClick={() => progressStore.toggleSaved(organ.id)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "inline-flex", alignItems: "center", gap: "4px" }}
              title={progress.saved.includes(organ.id) ? "Remove bookmark" : "Bookmark organ"}
            >
              <Bookmark size={13} fill={progress.saved.includes(organ.id) ? "currentColor" : "none"} />
            </button>
            {format(t.info.kicker, { organ: organ.name })}
          </div>
          <div className="info-title-row" data-reveal>
            <div><h1>{organ.name}</h1><em>{organ.poetic}</em></div>
            <span className="specimen-stamp">
              <OrganArt organ={organ} asset="organ" alt="" size={92} />
            </span>
          </div>
          <p className="description" data-reveal>{organ.description}</p>
          <div className="rule" />
          <h2 data-reveal>{t.info.keyFacts}</h2>
          <dl className="key-facts">
            <div data-reveal><dt><span>◇</span> {t.info.size}</dt><dd><Measure>{organ.size}</Measure></dd></div>
            <div data-reveal><dt><span>♙</span> {t.info.weight}</dt><dd><Measure>{organ.weight}</Measure></dd></div>
            <div data-reveal><dt><span>⌁</span> {t.info.daily}</dt><dd><Measure>{organ.dailyFact}</Measure></dd></div>
            <div data-reveal><dt><span>⌖</span> {t.info.location}</dt><dd><Measure>{organ.location}</Measure></dd></div>
            <div data-reveal><dt><span>❋</span> {t.info.bloodSupply}</dt><dd><Measure>{organ.bloodSupply}</Measure></dd></div>
            <div data-reveal><dt><span>◈</span> {t.info.function}</dt><dd><Measure>{organ.function}</Measure></dd></div>
          </dl>
          <div className="medical-note" data-reveal><Stethoscope size={16} /><p><b>{t.info.medical}</b>{organ.medical}</p></div>
          <div className="fun-note" data-reveal><Sparkles size={15} /><p><b>{t.info.didYouKnow}</b>{organ.funFact}</p></div>
          <button className="lesson-button" data-reveal onClick={() => setModal("lesson")}>{t.info.viewLesson} <ArrowRight size={16} /></button>
          <div className="action-grid" data-reveal>
            <button onClick={() => setAnimate(!animate)} className={animate ? "active" : ""}><Play size={15} /> {t.info.animate}</button>
            <button onClick={() => { setQuizActive(true); setModal(null); }}><CircleHelp size={15} /> {t.info.quiz}</button>
            <button onClick={() => setCompare(!compare)} className={compare ? "active" : ""}><Share2 size={15} /> {t.info.compare}</button>
          </div>
        </aside>
      </div>

      {compare && reference && (
        <section className="compare-strip" aria-label={t.compare.title}>
          <div className="compare-organ">
            <OrganArt organ={organ} asset="thumb" alt="" />
            <span>{t.compare.comparing}</span>
            <strong>{organ.name}</strong>
            <small>{organ.system}</small>
          </div>
          <b className="compare-strip-vs">{t.compare.vs}</b>
          <div className="compare-organ">
            <OrganArt organ={reference} asset="thumb" alt="" />
            <span>{t.compare.reference}</span>
            <div className="compare-strip-select-wrap">
              <select
                value={reference.id}
                onChange={(e) => setReferenceId(e.target.value as OrganId)}
                className="compare-strip-select"
                aria-label="Select reference organ"
              >
                {organs.filter((o) => o.id !== organ.id).map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.system})
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="compare-strip-select-arrow" />
            </div>
          </div>
          <dl>
            <div>
              <dt>{t.compare.primaryRole}</dt>
              <dd>
                <b>{organ.name}:</b> <Measure>{organ.function}</Measure><br />
                <b>{reference.name}:</b> <Measure>{reference.function}</Measure>
              </dd>
            </div>
            <div>
              <dt>{t.compare.scale}</dt>
              <dd>
                <b>{organ.name}:</b> <Measure>{organ.size}</Measure><br />
                <b>{reference.name}:</b> <Measure>{reference.size}</Measure>
              </dd>
            </div>
          </dl>
          <div className="compare-strip-actions">
            <button type="button" className="compare-full" onClick={() => setModal("compare")} title="View full comparison table">
              <SplitSquareVertical size={13} /> Full Table
            </button>
            <button type="button" className="compare-full" onClick={() => selectOrgan(reference.id)} title="Swap 3D view to reference organ">
              Swap to 3D
            </button>
          </div>
          <button onClick={() => setCompare(false)} aria-label={t.compare.close} className="compare-strip-close"><X size={16} /></button>
        </section>
      )}

      <section className="learning-cards" aria-label={format(t.cards.resources, { organ: organ.name })}>
        <article className="curiosity-card">
          <span>✿</span><p>{t.library.quoteLine1}<br />{t.library.quoteLine2}</p><em>{t.library.quoteSign}</em>
        </article>
        <article>
          <header><div><em>{t.cards.microscopic}</em><h3>{organ.tissue}</h3></div><Microscope size={17} /></header>
          <div className="microscope-visual organ-card-image"><OrganArt organ={organ} asset="microscopic" alt="" /></div>
          <button onClick={() => setModal("inside")}>{t.cards.exploreTissue} <ArrowRight size={14} /></button>
        </article>
        <article>
          <header><div><em>{t.cards.compareOrgans}</em><h3>{organ.name} vs. {reference.name}</h3></div><Share2 size={17} /></header>
          <div className="comparison-visual organ-card-image"><OrganArt organ={organ} asset="compare" alt="" /></div>
          <button onClick={() => { setCompare(true); setModal("compare"); }}>Full Comparison Table <ArrowRight size={14} /></button>
        </article>
        <article>
          <header><div><em>{t.cards.functionAnimation}</em><h3>{organ.function}</h3></div><Play size={17} /></header>
          <button
            type="button"
            className="function-visual organ-card-image"
            onClick={() => setAnimate(!animate)}
            aria-label={format(t.cards.playAria, { organ: organ.name })}
          >
            <OrganArt organ={organ} asset="organ" alt="" />
            <i className="function-pulse" />
            <span className="play-badge"><Play size={18} fill="currentColor" /></span>
          </button>
          <button onClick={() => setAnimate(!animate)}>
            {animate ? "Stop motion" : t.cards.playAnimation} <ArrowRight size={14} />
          </button>
        </article>
        <article>
          <header><div><em>{t.cards.clinicalNotes}</em><h3>{t.cards.commonConditions}</h3></div><FileText size={17} /></header>
          <ul>{organ.conditions?.map((condition) => <li key={condition}>{condition}</li>)}</ul>
          <button onClick={() => setModal("lesson")}>{t.cards.seeAll} <ArrowRight size={14} /></button>
        </article>
        <article className="system-card">
          <header><div><em>{t.cards.whereItWorks}</em><h3>{organ.system}</h3></div><BrainCircuit size={17} /></header>
          <button
            type="button"
            className="system-visual organ-card-image"
            onClick={() => setModal("system")}
            aria-label={format(t.cards.systemAria, { organ: organ.name })}
          >
            <OrganArt organ={organ} asset="location" alt="" />
          </button>
          <button onClick={() => setModal("system")}>{t.cards.seeSystem} <ArrowRight size={14} /></button>
        </article>
      </section>

      {modal && (
        <LearningModal
          type={modal}
          organ={organ}
          reference={reference}
          allOrgans={organs}
          onSelectReference={setReferenceId}
          onSelectOrgan={selectOrgan}
          onChangeModal={setModal}
          locale={locale.code}
          t={t}
          onStartLabelQuiz={() => { setModal(null); setQuizActive(true); }}
          onClose={() => setModal(null)}
        />
      )}
      {mobileLibrary && <button className="drawer-backdrop" aria-label={t.library.close} onClick={() => setMobileLibrary(false)} />}
    </main>
  );
}

const MODAL_ICON: Record<Exclude<Modal, null>, string> = {
  quiz: "?",
  animation: "▶",
  system: "⌖",
  lesson: "✦",
  inside: "🔬",
  profile: "MA",
  compare: "⚖",
  notes: "📝",
};

function LearningModal({
  type,
  organ,
  reference,
  allOrgans,
  onSelectReference,
  onSelectOrgan,
  onChangeModal,
  locale,
  t,
  onStartLabelQuiz,
  onClose,
}: {
  type: Exclude<Modal, null>;
  organ: Organ;
  reference?: Organ;
  allOrgans?: Organ[];
  onSelectReference?: (id: OrganId) => void;
  onSelectOrgan?: (id: OrganId) => void;
  onChangeModal?: (modal: Modal) => void;
  locale: string;
  t: UiDictionary;
  onStartLabelQuiz: () => void;
  onClose: () => void;
}) {
  const vars = { organ: organ.name, location: organ.location };
  const m = getModalDictionary(locale);
  const langKey = locale === "ru" ? "ru" : "en";
  const progress = useProgress();

  // Active Organ selectors for Lesson & Notes
  const [lessonOrganId, setLessonOrganId] = useState<OrganId>(organ.id);
  const [notesOrganId, setNotesOrganId] = useState<OrganId>(organ.id);
  const [notesTab, setNotesTab] = useState<"organ-note" | "all-notes" | "profile">(
    type === "profile" ? "profile" : "organ-note"
  );
  const [saveIndicator, setSaveIndicator] = useState(false);

  useEffect(() => {
    setLessonOrganId(organ.id);
    setNotesOrganId(organ.id);
  }, [organ.id]);

  useEffect(() => {
    if (type === "profile") setNotesTab("profile");
    else if (type === "notes") setNotesTab("organ-note");
  }, [type]);

  const activeLessonOrgan = allOrgans?.find((o) => o.id === lessonOrganId) ?? organ;
  const activeNotesOrgan = allOrgans?.find((o) => o.id === notesOrganId) ?? organ;

  // Content data
  const organQuestions = quizBank[organ.id] ?? [];
  const curLesson = (lessons[lessonOrganId] as any)?.[locale] ?? (lessons[lessonOrganId] as any)?.[langKey] ?? lessons[lessonOrganId]?.en;
  const organHisto = (histology[organ.id] as any)?.[locale] ?? (histology[organ.id] as any)?.[langKey] ?? histology[organ.id]?.en;
  const organAnim = (functionAnimations[organ.id] as any)?.[locale] ?? (functionAnimations[organ.id] as any)?.[langKey] ?? functionAnimations[organ.id]?.en;

  // Lesson organ nav handlers
  const organIndex = allOrgans ? allOrgans.findIndex((o) => o.id === lessonOrganId) : -1;
  const handlePrevLessonOrgan = () => {
    if (!allOrgans || allOrgans.length === 0) return;
    const prevIdx = (organIndex - 1 + allOrgans.length) % allOrgans.length;
    setLessonOrganId(allOrgans[prevIdx].id);
  };
  const handleNextLessonOrgan = () => {
    if (!allOrgans || allOrgans.length === 0) return;
    const nextIdx = (organIndex + 1) % allOrgans.length;
    setLessonOrganId(allOrgans[nextIdx].id);
  };

  const isLessonComplete = (progress.lessons[lessonOrganId] ?? 0) > 0;

  // Notes state & handlers
  const savedNoteText = progress.notes[notesOrganId] ?? "";
  const [localNoteText, setLocalNoteText] = useState<string>(savedNoteText);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    setLocalNoteText(progress.notes[notesOrganId] ?? "");
    setIsDirty(false);
  }, [notesOrganId]);

  const handleNoteChange = (text: string) => {
    setLocalNoteText(text);
    setIsDirty(true);
  };

  const handleSaveNote = () => {
    progressStore.setNote(notesOrganId, localNoteText);
    setIsDirty(false);
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 2500);
  };

  const handleAppendPrompt = (prompt: string) => {
    const existing = localNoteText;
    const prefix = existing.trim() ? `${existing.trim()}\n\n` : "";
    const next = `${prefix}• ${prompt}`;
    setLocalNoteText(next);
    setIsDirty(true);
  };

  const handleClearNote = () => {
    if (confirm(format(m.confirmClear, { organ: activeNotesOrgan.name }))) {
      setLocalNoteText("");
      setIsDirty(false);
      progressStore.setNote(notesOrganId, "");
    }
  };

  const handleCopyNote = () => {
    if (!localNoteText) return;
    void navigator.clipboard?.writeText(localNoteText);
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 1800);
  };

  const handleExportAllNotes = () => {
    const entries = Object.entries(progress.notes).filter(([_, text]) => Boolean(text?.trim()));
    if (entries.length === 0) return;
    let md = `# Anatomy Atelier — Clinical Study Journal\n\n`;
    md += `*Exported on ${new Date().toLocaleDateString()}*\n\n---\n\n`;
    entries.forEach(([id, text]) => {
      const match = allOrgans?.find((o) => o.id === id);
      const name = match ? match.name : id;
      const sys = match ? match.system : "General";
      const latin = match?.scientificName ? ` *(${match.scientificName})*` : "";
      md += `### ${name}${latin}\n`;
      md += `**System:** ${sys}\n\n`;
      md += `${text}\n\n---\n\n`;
    });
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anatomy-notes-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Quiz state
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = organQuestions[qIndex]?.[langKey as "en" | "ru"] ?? organQuestions[qIndex]?.en;

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(index);
    if (index === currentQ.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQ = () => {
    if (qIndex + 1 < organQuestions.length) {
      setQIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      progressStore.recordQuiz(organ.id, score + (selectedOption === currentQ?.correct ? 1 : 0), organQuestions.length);
    }
  };

  const title =
    type === "quiz" ? format(m.theoryQuizTitle, { organ: organ.name })
    : type === "lesson" ? `${activeLessonOrgan.name} — ${m.coreObjectives}`
    : type === "animation" ? format(t.modal.motionTitle, vars)
    : type === "system" ? format(t.modal.bodyTitle, vars)
    : type === "notes" ? m.notesTitle
    : type === "profile" ? m.tabProfile
    : type === "compare" ? `${organ.name} vs. ${reference?.name ?? ""}`
    : format(t.modal.insideTitle, vars);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`learning-modal ${type === "compare" || type === "lesson" || type === "notes" || type === "profile" ? "modal-compare" : (type === "system" || type === "quiz" ? "wide" : "")}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label={t.modal.close}><X size={18} /></button>

        {type === "compare" && reference ? (
          <header className="compare-modal-header">
            <span className="modal-icon compare-icon">⚖</span>
            <em className="compare-eyebrow">{m.compareEyebrow}</em>
            <h2 id="modal-title" className="compare-title">
              {organ.name} <span className="compare-vs-pill">vs</span> {reference.name}
            </h2>
            <p className="compare-lead">
              {m.compareLead}
            </p>
          </header>
        ) : type === "lesson" ? (
          <header className="compare-modal-header">
            <span className="modal-icon lesson-icon">✦</span>
            <em className="compare-eyebrow">{m.lessonEyebrow}</em>
            <h2 id="modal-title" className="compare-title">
              {activeLessonOrgan.name} <span className="hero-system-pill" style={{ verticalAlign: "middle", fontSize: "12px", marginLeft: "6px" }}>{activeLessonOrgan.system}</span>
            </h2>
            <p className="compare-lead">
              {m.lessonLead}
            </p>
          </header>
        ) : type === "notes" || type === "profile" ? (
          <header className="compare-modal-header">
            <span className="modal-icon notes-icon">📝</span>
            <em className="compare-eyebrow">{m.notesEyebrow}</em>
            <h2 id="modal-title" className="compare-title">
              {m.notesTitle}
            </h2>
            <p className="compare-lead">
              {m.notesLead}
            </p>
          </header>
        ) : (
          <>
            <span className="modal-icon">{MODAL_ICON[type]}</span>
            <em>{t.modal.guided}</em>
            <h2 id="modal-title">{title}</h2>
          </>
        )}

        {type === "quiz" ? (
          <div className="quiz-container" style={{ textAlign: "left", width: "100%", marginTop: "1rem" }}>
            {organQuestions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ fontSize: "1.1rem" }}>{m.noQuestionsYet}</p>
                <button
                  type="button"
                  className="lesson-button"
                  onClick={onStartLabelQuiz}
                  style={{ background: "var(--coral)", color: "#fff", marginTop: "1rem" }}
                >
                  {m.take3DQuiz}
                </button>
              </div>
            ) : !quizFinished && currentQ ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                  <span>{format(m.questionOf, { current: String(qIndex + 1), total: String(organQuestions.length) })}</span>
                  <span>{format(m.scoreLabel, { score: String(score) })}</span>
                </div>
                <p style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "1rem" }}>{currentQ.prompt}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {currentQ.options?.map((option, i) => {
                    const isPicked = selectedOption === i;
                    const isCorrect = i === currentQ.correct;
                    let bg = "rgba(0,0,0,0.03)";
                    let border = "1px solid var(--line)";
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        bg = "rgba(92,158,107,0.18)";
                        border = "1px solid #5c9e6b";
                      } else if (isPicked) {
                        bg = "rgba(209,88,79,0.18)";
                        border = "1px solid #d1584f";
                      }
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectOption(i)}
                        style={{
                          textAlign: "left",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          border,
                          background: bg,
                          cursor: selectedOption === null ? "pointer" : "default",
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {selectedOption !== null && (
                  <div style={{ marginTop: "1rem", padding: "12px", background: "rgba(0,0,0,0.02)", borderRadius: "8px", borderLeft: "3px solid var(--coral)" }}>
                    <p style={{ margin: 0, fontSize: "0.95rem" }}><b>{m.explanation}</b> {currentQ.explanation}</p>
                    <button
                      type="button"
                      className="lesson-button"
                      onClick={handleNextQ}
                      style={{ marginTop: "10px" }}
                    >
                      {qIndex + 1 < organQuestions.length ? m.nextQuestion : m.finishQuiz} <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ fontSize: "1.3rem", fontWeight: 600 }}>{m.quizComplete}</p>
                <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>{format(m.youScored, { score: String(score), total: String(organQuestions.length) })}</p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "1rem" }}>
                  <button
                    type="button"
                    className="lesson-button"
                    onClick={() => { setQIndex(0); setSelectedOption(null); setScore(0); setQuizFinished(false); }}
                  >
                    {m.retryQuiz}
                  </button>
                  <button
                    type="button"
                    className="lesson-button"
                    onClick={onStartLabelQuiz}
                    style={{ background: "var(--coral)", color: "#fff" }}
                  >
                    {m.take3DQuiz}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : type === "lesson" && curLesson ? (
          <div className="lesson-master-deck">
            {/* 1. Curriculum & Navigation Bar */}
            <div className="lesson-curriculum-bar">
              <div className="lesson-organ-selector-wrap">
                <button
                  type="button"
                  className="lesson-nav-arrow"
                  onClick={handlePrevLessonOrgan}
                  title={m.prevSpecimen}
                  aria-label={m.prevSpecimen}
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="lesson-select-pill">
                  <div className="lesson-thumb-mini">
                    <OrganArt organ={activeLessonOrgan} asset="thumb" alt="" />
                  </div>
                  <select
                    value={lessonOrganId}
                    onChange={(e) => setLessonOrganId(e.target.value as OrganId)}
                    className="lesson-organ-dropdown"
                    aria-label={m.selectLessonAria}
                  >
                    {allOrgans?.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name} ({o.system})
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="lesson-dropdown-chevron" />
                </div>

                <button
                  type="button"
                  className="lesson-nav-arrow"
                  onClick={handleNextLessonOrgan}
                  title={m.nextSpecimen}
                  aria-label={m.nextSpecimen}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="lesson-meta-badges">
                <span className="lesson-pill-tag">{activeLessonOrgan.system}</span>
                <span className="lesson-pill-time">
                  <Clock size={12} /> {m.readTime}
                </span>
                <button
                  type="button"
                  className={`lesson-status-pill ${isLessonComplete ? "completed" : ""}`}
                  onClick={() => progressStore.markLesson(lessonOrganId)}
                  title={isLessonComplete ? m.lessonCompleted : m.markComplete}
                >
                  <Check size={13} />
                  <span>{isLessonComplete ? m.lessonCompleted : m.markComplete}</span>
                </button>
              </div>
            </div>

            {/* 2. Scrollable Structured Lesson Cards */}
            <div className="lesson-scroll-area">
              {/* 2.1 Core Learning Objectives */}
              <section className="lesson-card objectives-card">
                <header className="lesson-card-header">
                  <span className="lesson-step-badge">1</span>
                  <h4>{m.coreObjectives}</h4>
                </header>
                <ul className="lesson-objectives-list">
                  {curLesson.objectives?.map((obj: string, i: number) => (
                    <li key={i} className="objective-item">
                      <span className="objective-num">0{i + 1}</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 2.2 Anatomical Architecture */}
              <section className="lesson-card structure-card">
                <header className="lesson-card-header">
                  <span className="lesson-step-badge">2</span>
                  <h4>{m.anatomicalArchitecture}</h4>
                </header>
                <p className="lesson-body-prose">{curLesson.structure}</p>
                <div className="lesson-metric-strip">
                  <dl style={{ display: "contents" }}>
                    <div>
                      <dt>{m.tissueType}</dt>
                      <dd>{activeLessonOrgan.tissue}</dd>
                    </div>
                    <div>
                      <dt>{m.physicalDimensions}</dt>
                      <dd>{activeLessonOrgan.size}</dd>
                    </div>
                    <div>
                      <dt>{m.specimenMass}</dt>
                      <dd>{activeLessonOrgan.weight}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* 2.3 Physiological Function */}
              <section className="lesson-card function-card">
                <header className="lesson-card-header">
                  <span className="lesson-step-badge">3</span>
                  <h4>{m.physiologicalMechanisms}</h4>
                </header>
                <p className="lesson-body-prose">{curLesson.function}</p>
                <div className="lesson-highlight-box">
                  <strong>{m.vascularSupply}</strong> {activeLessonOrgan.bloodSupply}
                </div>
              </section>

              {/* 2.4 Clinical Correlates */}
              <section className="lesson-card clinical-card">
                <header className="lesson-card-header">
                  <span className="lesson-step-badge">4</span>
                  <h4>{m.clinicalCorrelates}</h4>
                </header>
                <div className="clinical-cases-grid">
                  {curLesson.clinical?.map((clin: string, i: number) => {
                    const parts = clin.split(": ");
                    const hasTitle = parts.length > 1;
                    const heading = hasTitle ? parts[0] : `${m.clinicalCorrelates} #${i + 1}`;
                    const detail = hasTitle ? parts.slice(1).join(": ") : clin;
                    return (
                      <div key={i} className="clinical-case-item">
                        <h5>
                          <Stethoscope size={13} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                          {heading}
                        </h5>
                        <p>{detail}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 2.5 Canonical Literature */}
              {Array.isArray(curLesson.sources) && curLesson.sources.length > 0 && (
                <section className="lesson-card sources-card">
                  <header className="lesson-card-header">
                    <span className="lesson-step-badge">5</span>
                    <h4>{m.canonicalLiterature}</h4>
                  </header>
                  <ul className="lesson-sources-list">
                    {curLesson.sources.map((src: string, i: number) => (
                      <li key={i}>• {src}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* 3. Action Footer */}
            <div className="lesson-actions-footer">
              <div className="lesson-footer-secondary">
                <button
                  type="button"
                  className="lesson-secondary-btn"
                  onClick={() => {
                    onSelectOrgan?.(lessonOrganId);
                    onChangeModal?.("quiz");
                  }}
                >
                  <CircleHelp size={14} />
                  <span>{m.practiceQuiz}</span>
                </button>
                <button
                  type="button"
                  className="lesson-secondary-btn"
                  onClick={() => {
                    setNotesOrganId(lessonOrganId);
                    onChangeModal?.("notes");
                  }}
                >
                  <NotebookPen size={14} />
                  <span>{m.takeNotes}</span>
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  type="button"
                  className={`lesson-secondary-btn ${isLessonComplete ? "completed" : ""}`}
                  style={isLessonComplete ? { background: "rgba(92, 158, 107, 0.15)", color: "#2e693b", borderColor: "#5c9e6b" } : undefined}
                  onClick={() => progressStore.markLesson(lessonOrganId)}
                  title={isLessonComplete ? m.lessonCompleted : m.saveProgress}
                >
                  <Check size={14} />
                  <span>{isLessonComplete ? m.lessonCompleted : m.saveProgress}</span>
                </button>

                <button
                  type="button"
                  className="lesson-inspect-btn"
                  onClick={() => {
                    onSelectOrgan?.(lessonOrganId);
                    onClose();
                  }}
                >
                  <Eye size={15} />
                  <span>{format(m.inspectIn3D, { organ: activeLessonOrgan.name })}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : type === "inside" ? (
          <>
            <p>{organ.tissue}</p>
            <figure className="modal-figure">
              <OrganArt organ={organ} asset="microscopic" alt="" />
            </figure>
            <dl className="modal-facts">
              <div><dt>{t.info.function}</dt><dd><Measure>{organ.function}</Measure></dd></div>
              <div><dt>{t.info.daily}</dt><dd><Measure>{organ.dailyFact}</Measure></dd></div>
              <div><dt>{t.info.bloodSupply}</dt><dd><Measure>{organ.bloodSupply}</Measure></dd></div>
            </dl>
            {Array.isArray(organHisto) && organHisto.length > 0 && (
              <div style={{ textAlign: "left", width: "100%", marginTop: "1rem" }}>
                <h3 style={{ marginTop: "0.5rem", fontSize: "1.05rem" }}>{m.histologicalLayers}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "0.5rem" }}>
                  {organHisto.map((l: { name: string; detail: string }, i: number) => (
                    <div key={i} style={{ padding: "8px 12px", background: "rgba(0,0,0,0.03)", borderRadius: "8px", fontSize: "0.9rem" }}>
                      <b>{l.name}:</b> <span>{l.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : type === "animation" ? (
          <>
            <p>{format(t.modal.motionTitle, vars)}</p>
            <div className="modal-demo moving">
              <OrganArt organ={organ} asset="organ" alt="" />
            </div>
            {organAnim && (
              <div style={{ textAlign: "left", width: "100%", marginTop: "1rem" }}>
                <h3 style={{ marginTop: "0.5rem" }}>{organAnim.label}</h3>
                <p style={{ lineHeight: 1.6 }}>{organAnim.description}</p>
                {organAnim.clinical && (
                  <p style={{ marginTop: "0.5rem", fontStyle: "italic", color: "var(--muted)" }}>
                    {organAnim.clinical}
                  </p>
                )}
              </div>
            )}
          </>
        ) : type === "compare" && reference ? (
          <div className="compare-content-wrap">
            {/* 1. Dual Specimen Hero Deck */}
            <div className="compare-hero-deck">
              {/* Primary Active Organ */}
              <div className="compare-hero-card primary">
                <div className="hero-card-meta">
                  <span className="hero-badge primary-badge">{m.activeModel}</span>
                  <span className="hero-system-pill">{organ.system}</span>
                </div>
                <div className="hero-card-main">
                  <div className="hero-stamp primary-stamp">
                    <OrganArt organ={organ} asset="thumb" alt="" />
                  </div>
                  <div className="hero-details">
                    <h3 className="hero-organ-name">{organ.name}</h3>
                    <em className="hero-scientific">{organ.scientificName}</em>
                  </div>
                </div>
              </div>

              {/* Center VS Connector with Quick Swap */}
              <div className="compare-vs-connector">
                <div className="compare-vs-circle">VS</div>
                {onSelectOrgan && (
                  <button
                    type="button"
                    className="compare-swap-icon-btn"
                    onClick={() => {
                      onSelectOrgan(reference.id);
                      onSelectReference?.(organ.id);
                    }}
                    title={m.swap}
                    aria-label={m.swap}
                  >
                    <ArrowLeftRight size={13} />
                    <span>{m.swap}</span>
                  </button>
                )}
              </div>

              {/* Target Reference Organ */}
              <div className="compare-hero-card reference">
                <div className="hero-card-meta">
                  <span className="hero-badge ref-badge">{m.targetReference}</span>
                  <span className="hero-system-pill ref-pill">{reference.system}</span>
                </div>
                <div className="hero-card-main">
                  <div className="hero-stamp ref-stamp">
                    <OrganArt organ={reference} asset="thumb" alt="" />
                  </div>
                  <div className="hero-details">
                    <div className="hero-select-wrap">
                      <select
                        value={reference.id}
                        onChange={(e) => onSelectReference?.(e.target.value as OrganId)}
                        className="hero-select"
                        aria-label={m.chooseReferenceAria}
                      >
                        {allOrgans?.filter((o) => o.id !== organ.id).map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.name} ({o.system})
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="hero-select-chevron" />
                    </div>
                    <em className="hero-scientific">{reference.scientificName}</em>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Structured Comparison Matrix */}
            <div className="compare-matrix-card">
              <table className="compare-matrix-table">
                <thead>
                  <tr>
                    <th className="col-metric">{m.anatomicalMetric}</th>
                    <th className="col-organ primary-col">
                      <span className="col-dot primary-dot" />
                      <span>{organ.name}</span>
                    </th>
                    <th className="col-organ ref-col">
                      <span className="col-dot ref-dot" />
                      <span>{reference.name}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{m.organSystem}</th>
                    <td><span className="metric-tag primary-tag">{organ.system}</span></td>
                    <td><span className="metric-tag ref-tag">{reference.system}</span></td>
                  </tr>
                  <tr>
                    <th>{m.scientificTerm}</th>
                    <td><em className="latin-name">{organ.scientificName}</em></td>
                    <td><em className="latin-name">{reference.scientificName}</em></td>
                  </tr>
                  <tr>
                    <th>{m.primaryFunction}</th>
                    <td className="desc-text">{organ.function}</td>
                    <td className="desc-text">{reference.function}</td>
                  </tr>
                  <tr>
                    <th>{m.physicalScale}</th>
                    <td className="val-text"><strong>{organ.size}</strong></td>
                    <td className="val-text"><strong>{reference.size}</strong></td>
                  </tr>
                  <tr>
                    <th>{m.typicalMass}</th>
                    <td className="val-text"><strong>{organ.weight}</strong></td>
                    <td className="val-text"><strong>{reference.weight}</strong></td>
                  </tr>
                  <tr>
                    <th>{m.dailyActivity}</th>
                    <td className="desc-text">{organ.dailyFact}</td>
                    <td className="desc-text">{reference.dailyFact}</td>
                  </tr>
                  <tr>
                    <th>{m.vascularSupply}</th>
                    <td className="desc-text">{organ.bloodSupply}</td>
                    <td className="desc-text">{reference.bloodSupply}</td>
                  </tr>
                  <tr>
                    <th>{m.tissueArchitecture}</th>
                    <td className="desc-text">{organ.tissue}</td>
                    <td className="desc-text">{reference.tissue}</td>
                  </tr>
                  <tr>
                    <th>{m.clinicalRelevance}</th>
                    <td className="desc-text">{organ.medical}</td>
                    <td className="desc-text">{reference.medical}</td>
                  </tr>
                  <tr>
                    <th>{m.commonConditions}</th>
                    <td>
                      <div className="condition-chips">
                        {organ.conditions && organ.conditions.length > 0 ? (
                          organ.conditions.slice(0, 5).map((cond) => (
                            <span key={cond} className="cond-chip">{cond}</span>
                          ))
                        ) : (
                          <span className="empty-val">—</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="condition-chips">
                        {reference.conditions && reference.conditions.length > 0 ? (
                          reference.conditions.slice(0, 5).map((cond) => (
                            <span key={cond} className="cond-chip ref-cond-chip">{cond}</span>
                          ))
                        ) : (
                          <span className="empty-val">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 3. Action Footer */}
            <div className="compare-modal-footer">
              <div className="compare-footer-note">
                <Sparkles size={14} />
                <span>{m.compareFooterNote}</span>
              </div>
              <div className="compare-footer-actions">
                <button
                  type="button"
                  className="compare-btn-dismiss"
                  onClick={onClose}
                >
                  {m.close}
                </button>
                <button
                  type="button"
                  className="compare-btn-inspect"
                  onClick={() => {
                    onSelectOrgan?.(reference.id);
                    onClose();
                  }}
                >
                  <Eye size={15} />
                  <span>{format(m.inspectIn3D, { organ: reference.name })}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (type === "notes" || type === "profile") ? (
          <div className="notes-master-deck">
            {/* Tabs Bar */}
            <div className="notes-tabs-bar">
              <button
                type="button"
                className={`notes-tab-btn ${notesTab === "organ-note" ? "active" : ""}`}
                onClick={() => setNotesTab("organ-note")}
              >
                <NotebookPen size={14} />
                <span>{m.tabActiveNote}</span>
              </button>

              <button
                type="button"
                className={`notes-tab-btn ${notesTab === "all-notes" ? "active" : ""}`}
                onClick={() => setNotesTab("all-notes")}
              >
                <BookOpen size={14} />
                <span>{format(m.tabAllNotes, { count: String(Object.keys(progress.notes).length) })}</span>
              </button>

              <button
                type="button"
                className={`notes-tab-btn ${notesTab === "profile" ? "active" : ""}`}
                onClick={() => setNotesTab("profile")}
              >
                <Sparkles size={14} />
                <span>{m.tabProfile}</span>
              </button>
            </div>

            {notesTab === "organ-note" ? (
              <div className="notes-editor-deck">
                {/* Organ Selector Header */}
                <div className="notes-organ-bar">
                  <div className="notes-organ-info">
                    <div className="lesson-thumb-mini">
                      <OrganArt organ={activeNotesOrgan} asset="thumb" alt="" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "14.5px" }}>{activeNotesOrgan.name}</div>
                      <small style={{ color: "var(--muted)", fontStyle: "italic" }}>{activeNotesOrgan.scientificName}</small>
                    </div>
                  </div>

                  <div className="notes-organ-select-wrap">
                    <select
                      value={notesOrganId}
                      onChange={(e) => setNotesOrganId(e.target.value as OrganId)}
                      className="hero-select"
                      style={{ minWidth: "170px" }}
                      aria-label={m.chooseReferenceAria}
                    >
                      {allOrgans?.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.name} ({o.system})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* High-Yield Prompts */}
                <div className="notes-prompts-bar">
                  <span className="prompts-label">
                    <Sparkles size={12} /> {m.highYieldPrompts}
                  </span>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleAppendPrompt(m.promptMorphologyPrefix)}
                  >
                    {m.promptMorphologyLabel}
                  </button>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleAppendPrompt(m.promptPhysiologyPrefix)}
                  >
                    {m.promptPhysiologyLabel}
                  </button>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleAppendPrompt(m.promptClinicalPrefix)}
                  >
                    {m.promptClinicalLabel}
                  </button>
                  <button
                    type="button"
                    className="prompt-chip"
                    onClick={() => handleAppendPrompt(m.promptMnemonicPrefix)}
                  >
                    {m.promptMnemonicLabel}
                  </button>
                </div>

                {/* Text Area */}
                <div className="notes-textarea-wrap">
                  <textarea
                    className="notes-textarea"
                    value={localNoteText}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder={format(m.placeholderNotes, { organ: activeNotesOrgan.name })}
                    rows={8}
                    aria-label={`${m.tabActiveNote} - ${activeNotesOrgan.name}`}
                  />
                </div>

                {/* Editor Footer */}
                <div className="notes-editor-footer">
                  <div className="notes-status-msg">
                    {saveIndicator ? (
                      <span className="saved-indicator">
                        <Check size={13} /> {m.noteSaved}
                      </span>
                    ) : isDirty ? (
                      <span className="dirty-indicator" style={{ color: "var(--coral)", display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--coral)", display: "inline-block" }} />
                        {m.unsavedChanges}
                      </span>
                    ) : (
                      <span className="idle-indicator">
                        {savedNoteText ? m.savedInJournal : m.writeAndSave}
                      </span>
                    )}
                  </div>

                  <div className="notes-editor-actions">
                    {localNoteText && (
                      <button
                        type="button"
                        className="note-btn-clear"
                        onClick={handleClearNote}
                        title={m.clear}
                      >
                        <Trash2 size={13} />
                        <span>{m.clear}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="note-btn-copy"
                      onClick={handleCopyNote}
                      title={m.copy}
                    >
                      <Copy size={13} />
                      <span>{m.copy}</span>
                    </button>
                    <button
                      type="button"
                      className="note-btn-copy"
                      onClick={() => {
                        setLessonOrganId(notesOrganId);
                        onChangeModal?.("lesson");
                      }}
                      title={m.readLesson}
                    >
                      <BookOpen size={13} />
                      <span>{m.readLesson}</span>
                    </button>
                    <button
                      type="button"
                      className="note-btn-save"
                      onClick={handleSaveNote}
                      title={m.saveNote}
                    >
                      <Save size={13} />
                      <span>{m.saveNote}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : notesTab === "all-notes" ? (
              <div className="notes-directory-deck">
                <div className="notes-directory-header">
                  <p>{m.allNotesHeader}</p>
                  {Object.keys(progress.notes).length > 0 && (
                    <button
                      type="button"
                      className="notes-export-all-btn"
                      onClick={handleExportAllNotes}
                    >
                      <Download size={13} />
                      <span>{m.exportAll}</span>
                    </button>
                  )}
                </div>

                {Object.entries(progress.notes).filter(([_, txt]) => Boolean(txt?.trim())).length === 0 ? (
                  <div className="notes-empty-state">
                    <span className="notes-empty-icon">📝</span>
                    <h4>{m.emptyNotesTitle}</h4>
                    <p>{m.emptyNotesDesc}</p>
                  </div>
                ) : (
                  <div className="all-notes-list">
                    {Object.entries(progress.notes)
                      .filter(([_, txt]) => Boolean(txt?.trim()))
                      .map(([id, text]) => {
                        const itemOrgan = allOrgans?.find((o) => o.id === id);
                        return (
                          <div key={id} className="saved-note-card">
                            <div className="saved-note-header">
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontWeight: 600, fontSize: "14.5px" }}>
                                  {itemOrgan ? itemOrgan.name : id}
                                </span>
                                {itemOrgan && (
                                  <span className="hero-system-pill" style={{ fontSize: "10px" }}>
                                    {itemOrgan.system}
                                  </span>
                                )}
                              </div>
                              <div style={{ display: "flex", gap: "6px" }}>
                                <button
                                  type="button"
                                  className="saved-note-action-btn primary"
                                  onClick={() => {
                                    setNotesOrganId(id as OrganId);
                                    setNotesTab("organ-note");
                                  }}
                                >
                                  {m.editNote}
                                </button>
                                <button
                                  type="button"
                                  className="saved-note-action-btn"
                                  onClick={() => {
                                    onSelectOrgan?.(id as OrganId);
                                    onClose();
                                  }}
                                >
                                  {m.viewIn3D}
                                </button>
                              </div>
                            </div>
                            <div className="saved-note-text">{text}</div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ) : (
              <div className="notes-profile-deck">
                <div className="profile-metrics-grid">
                  <div className="profile-stat-box">
                    <span className="stat-number">{Object.keys(progress.visited).length} / 30</span>
                    <span className="stat-label">{m.organsExplored}</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="stat-number">{Object.keys(progress.lessons).length} / 30</span>
                    <span className="stat-label">{m.lessonsCompleted}</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="stat-number">{Object.keys(progress.notes).length}</span>
                    <span className="stat-label">{m.notesAuthored}</span>
                  </div>
                  <div className="profile-stat-box">
                    <span className="stat-number">{progress.saved.length}</span>
                    <span className="stat-label">{m.bookmarked}</span>
                  </div>
                </div>

                <div className="profile-quiz-history">
                  <h4>{format(m.quizHistory, { count: String(Object.keys(progress.quiz).length) })}</h4>
                  {Object.keys(progress.quiz).length === 0 ? (
                    <p style={{ color: "var(--muted)", fontStyle: "italic", fontSize: "13px" }}>
                      {m.noQuizYet}
                    </p>
                  ) : (
                    <div className="quiz-records-table">
                      {Object.entries(progress.quiz).map(([id, qp]) => {
                        const item = allOrgans?.find((o) => o.id === id);
                        return (
                          <div key={id} className="quiz-record-row">
                            <span className="record-organ">{item?.name ?? id}</span>
                            <span className="record-score">
                              {format(m.bestScore, { best: String(qp.best), total: String(qp.total), pct: String(Math.round((qp.best / qp.total) * 100)) })}
                            </span>
                            <span className="record-attempts">
                              {format(m.attempts, { count: String(qp.attempts), s: qp.attempts > 1 ? (locale === "ru" ? "и" : "s") : "" })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div style={{ paddingTop: "12px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    className="note-btn-clear"
                    onClick={() => {
                      if (confirm(m.confirmReset)) {
                        progressStore.reset();
                      }
                    }}
                  >
                    <RotateCcw size={13} />
                    <span>{m.resetProgress}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : type === "system" ? (
          <>
            <p>{format(t.modal.systemIntro, vars)}</p>
            <figure className="modal-figure">
              <OrganArt organ={organ} asset="location" alt="" />
            </figure>
            <dl className="modal-facts">
              <div><dt>{t.modal.system}</dt><dd>{organ.system}</dd></div>
              <div><dt>{t.modal.primaryRole}</dt><dd><Measure>{organ.function}</Measure></dd></div>
              <div><dt>{t.modal.bloodSupply}</dt><dd><Measure>{organ.bloodSupply}</Measure></dd></div>
            </dl>
            <Link className="lesson-button" href={`/${locale}/systems`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "inherit", marginTop: "10px" }}>
              {m.openInteractiveSystemsMap} <ArrowRight size={16} />
            </Link>
          </>
        ) : (
          <>
            <p>{t.modal.lessonBody}</p>
            <div className="modal-demo"><OrganArt organ={organ} asset="organ" alt="" /></div>
            <button className="lesson-button" onClick={onClose}>{t.modal.continueExploring} <ArrowRight size={16} /></button>
          </>
        )}
      </section>
    </div>
  );
}
