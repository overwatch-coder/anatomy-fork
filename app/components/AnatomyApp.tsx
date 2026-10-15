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
  CircleHelp,
  Compass,
  Eye,
  FileText,
  Globe,
  Heart,
  LibraryBig,
  Microscope,
  NotebookPen,
  Play,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
  SplitSquareVertical,
  Stethoscope,
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

type Modal = "lesson" | "quiz" | "animation" | "system" | "inside" | "profile" | "compare" | null;

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

import { LanguageSwitcher } from "./LanguageSwitcher";

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
      <header className="topbar">
        <button className="brand" type="button" onClick={() => selectOrgan("heart")} aria-label={t.brand.home}>
          <strong>Anatomy Atelier<sup>✦</sup></strong>
          <em>{t.brand.tagline}</em>
        </button>
        <nav className="main-nav" aria-label="Primary navigation">
          <button className="active"><Compass size={17} /> {t.nav.explore}</button>
          <Link href={`/${locale.code}/systems`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "inherit" }}>
            <BrainCircuit size={17} /> {t.nav.systems}
          </Link>
          <button onClick={() => setModal("lesson")}><BookOpen size={17} /> {t.nav.lessons}</button>
          <button onClick={() => setShowSavedOnly((s) => !s)} className={showSavedOnly ? "active" : ""}>
            <LibraryBig size={17} /> {t.nav.library}
          </button>
          <button onClick={() => setModal("profile")}><NotebookPen size={17} /> {t.nav.notes}</button>
        </nav>
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search.placeholder} />
        </label>
        <LanguageSwitcher locale={locale} t={t} />
        <button className="profile" onClick={() => setModal("profile")} aria-label={t.profile.open}>
          <span>MA</span><ChevronDown size={15} />
        </button>
        <button className="mobile-library-trigger" onClick={() => setMobileLibrary(true)} aria-label={t.library.open}>
          <LibraryBig size={20} />
        </button>
      </header>

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
};

function LearningModal({
  type,
  organ,
  reference,
  allOrgans,
  onSelectReference,
  onSelectOrgan,
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
  locale: string;
  t: UiDictionary;
  onStartLabelQuiz: () => void;
  onClose: () => void;
}) {
  const vars = { organ: organ.name, location: organ.location };
  const langKey = locale === "ru" ? "ru" : "en";
  const progress = useProgress();

  // Content data
  const organQuestions = quizBank[organ.id] ?? [];
  const organLesson = (lessons[organ.id] as any)?.[langKey] ?? lessons[organ.id]?.en;
  const organHisto = (histology[organ.id] as any)?.[langKey] ?? histology[organ.id]?.en;
  const organAnim = (functionAnimations[organ.id] as any)?.[langKey] ?? functionAnimations[organ.id]?.en;

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
    type === "quiz" ? `${organ.name} Theory Quiz`
    : type === "lesson" ? `Anatomical Lesson: ${organ.name}`
    : type === "animation" ? format(t.modal.motionTitle, vars)
    : type === "system" ? format(t.modal.bodyTitle, vars)
    : type === "profile" ? "Learner Profile & Progress"
    : type === "compare" ? `Anatomical Comparison: ${organ.name} vs. ${reference?.name ?? "Reference"}`
    : format(t.modal.insideTitle, vars);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`learning-modal ${type === "compare" ? "modal-compare" : (type === "system" || type === "lesson" || type === "quiz" ? "wide" : "")}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label={t.modal.close}><X size={18} /></button>

        {type === "compare" && reference ? (
          <header className="compare-modal-header">
            <span className="modal-icon compare-icon">⚖</span>
            <em className="compare-eyebrow">Comparative Anatomy & Physiology</em>
            <h2 id="modal-title" className="compare-title">
              {organ.name} <span className="compare-vs-pill">vs</span> {reference.name}
            </h2>
            <p className="compare-lead">
              Cross-examination of functional, morphological, and clinical traits
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
                <p style={{ fontSize: "1.1rem" }}>Theory questions for this organ will be available soon.</p>
                <button
                  type="button"
                  className="lesson-button"
                  onClick={onStartLabelQuiz}
                  style={{ background: "var(--coral)", color: "#fff", marginTop: "1rem" }}
                >
                  Take 3D Labelling Quiz
                </button>
              </div>
            ) : !quizFinished && currentQ ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                  <span>Question {qIndex + 1} of {organQuestions.length}</span>
                  <span>Score: {score}</span>
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
                    <p style={{ margin: 0, fontSize: "0.95rem" }}><b>Explanation:</b> {currentQ.explanation}</p>
                    <button
                      type="button"
                      className="lesson-button"
                      onClick={handleNextQ}
                      style={{ marginTop: "10px" }}
                    >
                      {qIndex + 1 < organQuestions.length ? "Next Question" : "Finish Quiz"} <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <p style={{ fontSize: "1.3rem", fontWeight: 600 }}>Quiz Complete!</p>
                <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>You scored {score} out of {organQuestions.length}</p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "1rem" }}>
                  <button
                    type="button"
                    className="lesson-button"
                    onClick={() => { setQIndex(0); setSelectedOption(null); setScore(0); setQuizFinished(false); }}
                  >
                    Retry Theory Quiz
                  </button>
                  <button
                    type="button"
                    className="lesson-button"
                    onClick={onStartLabelQuiz}
                    style={{ background: "var(--coral)", color: "#fff" }}
                  >
                    Take 3D Labelling Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : type === "lesson" && organLesson ? (
          <div className="lesson-container" style={{ textAlign: "left", width: "100%", maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
            <h3 style={{ marginTop: "0.5rem" }}>Learning Objectives</h3>
            <ul>
              {organLesson.objectives?.map((obj: string, i: number) => (
                <li key={i} style={{ margin: "4px 0" }}>{obj}</li>
              ))}
            </ul>
            <h3 style={{ marginTop: "1rem" }}>Anatomical Structure</h3>
            <p style={{ lineHeight: 1.6 }}>{organLesson.structure}</p>
            <h3 style={{ marginTop: "1rem" }}>Physiological Function</h3>
            <p style={{ lineHeight: 1.6 }}>{organLesson.function}</p>
            <h3 style={{ marginTop: "1rem" }}>Clinical Correlates</h3>
            <ul>
              {organLesson.clinical?.map((clin: string, i: number) => (
                <li key={i} style={{ margin: "4px 0" }}>{clin}</li>
              ))}
            </ul>
            {Array.isArray(organLesson.sources) && organLesson.sources.length > 0 && (
              <>
                <h3 style={{ marginTop: "1rem" }}>Literature & Canonical References</h3>
                <ul>
                  {organLesson.sources.map((src: string, i: number) => (
                    <li key={i} style={{ margin: "4px 0", fontSize: "0.88rem", color: "var(--muted)" }}>{src}</li>
                  ))}
                </ul>
              </>
            )}
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
                <h3 style={{ marginTop: "0.5rem", fontSize: "1.05rem" }}>Histological Layers</h3>
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
                  <span className="hero-badge primary-badge">Active Model</span>
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
                    title="Swap active and reference organs"
                    aria-label="Swap active and reference organs"
                  >
                    <ArrowLeftRight size={13} />
                    <span>Swap</span>
                  </button>
                )}
              </div>

              {/* Target Reference Organ */}
              <div className="compare-hero-card reference">
                <div className="hero-card-meta">
                  <span className="hero-badge ref-badge">Target Reference</span>
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
                        aria-label="Choose reference organ to compare"
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
                    <th className="col-metric">Anatomical Metric</th>
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
                    <th>Organ System</th>
                    <td><span className="metric-tag primary-tag">{organ.system}</span></td>
                    <td><span className="metric-tag ref-tag">{reference.system}</span></td>
                  </tr>
                  <tr>
                    <th>Scientific Term (TA2)</th>
                    <td><em className="latin-name">{organ.scientificName}</em></td>
                    <td><em className="latin-name">{reference.scientificName}</em></td>
                  </tr>
                  <tr>
                    <th>Primary Function</th>
                    <td className="desc-text">{organ.function}</td>
                    <td className="desc-text">{reference.function}</td>
                  </tr>
                  <tr>
                    <th>Physical Scale</th>
                    <td className="val-text"><strong>{organ.size}</strong></td>
                    <td className="val-text"><strong>{reference.size}</strong></td>
                  </tr>
                  <tr>
                    <th>Typical Mass / Weight</th>
                    <td className="val-text"><strong>{organ.weight}</strong></td>
                    <td className="val-text"><strong>{reference.weight}</strong></td>
                  </tr>
                  <tr>
                    <th>Daily Activity / Workload</th>
                    <td className="desc-text">{organ.dailyFact}</td>
                    <td className="desc-text">{reference.dailyFact}</td>
                  </tr>
                  <tr>
                    <th>Vascular Supply</th>
                    <td className="desc-text">{organ.bloodSupply}</td>
                    <td className="desc-text">{reference.bloodSupply}</td>
                  </tr>
                  <tr>
                    <th>Tissue Architecture</th>
                    <td className="desc-text">{organ.tissue}</td>
                    <td className="desc-text">{reference.tissue}</td>
                  </tr>
                  <tr>
                    <th>Clinical Relevance</th>
                    <td className="desc-text">{organ.medical}</td>
                    <td className="desc-text">{reference.medical}</td>
                  </tr>
                  <tr>
                    <th>Common Conditions</th>
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
                <span>Select any organ in the dropdown to cross-examine anatomical traits.</span>
              </div>
              <div className="compare-footer-actions">
                <button
                  type="button"
                  className="compare-btn-dismiss"
                  onClick={onClose}
                >
                  Close
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
                  <span>Inspect {reference.name} in 3D</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : type === "profile" ? (
          <div style={{ textAlign: "left", width: "100%", marginTop: "1rem" }}>
            <p><b>Organs Visited:</b> {Object.keys(progress.visited).length} / 30</p>
            <p><b>Saved Bookmarks:</b> {progress.saved.length}</p>
            <p><b>Quizzes Taken:</b> {Object.keys(progress.quiz).length}</p>
            <button
              type="button"
              className="lesson-button"
              onClick={() => progressStore.reset()}
              style={{ marginTop: "1rem" }}
            >
              Reset Progress
            </button>
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
              Open Interactive Systems Map <ArrowRight size={16} />
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
