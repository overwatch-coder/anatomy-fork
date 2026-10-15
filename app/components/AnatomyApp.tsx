"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleHelp,
  Compass,
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

type Modal = "lesson" | "quiz" | "animation" | "system" | "inside" | "profile" | null;

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
  const [autoRotate, setAutoRotate] = useState(true);
  const [compare, setCompare] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [query, setQuery] = useState("");
  const [mobileLibrary, setMobileLibrary] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefetched = useRef(new Set<OrganId>());
  const organ = organById[organId] ?? organs[0];
  const reference = organById[organId === "heart" ? "brain" : "heart"] ?? organs[1];

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
    setMobileLibrary(false);
    setCompare(false);
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
            <button onClick={() => setModal("animation")}><Play size={15} /> {t.info.animate}</button>
            <button onClick={() => { setQuizActive(true); setModal(null); }}><CircleHelp size={15} /> {t.info.quiz}</button>
            <button onClick={() => setCompare(!compare)} className={compare ? "active" : ""}><Share2 size={15} /> {t.info.compare}</button>
          </div>
        </aside>
      </div>

      {compare && (
        <section className="compare-strip" aria-label={t.compare.title}>
          <div className="compare-organ"><OrganArt organ={organ} asset="thumb" alt="" /><span>{t.compare.comparing}</span><strong>{organ.name}</strong><small>{organ.system}</small></div>
          <b>{t.compare.vs}</b>
          <div className="compare-organ"><OrganArt organ={reference} asset="thumb" alt="" /><span>{t.compare.reference}</span><strong>{reference.name}</strong><small>{reference.system}</small></div>
          <dl><div><dt>{t.compare.primaryRole}</dt><dd><Measure>{organ.function}</Measure></dd></div><div><dt>{t.compare.scale}</dt><dd><Measure>{organ.size}</Measure></dd></div></dl>
          <button onClick={() => setCompare(false)} aria-label={t.compare.close}><X size={16} /></button>
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
          <header><div><em>{t.cards.compareOrgans}</em><h3>{organ.comparison}</h3></div><Share2 size={17} /></header>
          <div className="comparison-visual organ-card-image"><OrganArt organ={organ} asset="compare" alt="" /></div>
          <button onClick={() => setCompare(true)}>{t.cards.openComparison} <ArrowRight size={14} /></button>
        </article>
        <article>
          <header><div><em>{t.cards.functionAnimation}</em><h3>{organ.function}</h3></div><Play size={17} /></header>
          <button
            type="button"
            className="function-visual organ-card-image"
            onClick={() => setModal("animation")}
            aria-label={format(t.cards.playAria, { organ: organ.name })}
          >
            <OrganArt organ={organ} asset="organ" alt="" />
            <i className="function-pulse" />
            <span className="play-badge"><Play size={18} fill="currentColor" /></span>
          </button>
          <button onClick={() => setModal("animation")}>{t.cards.playAnimation} <ArrowRight size={14} /></button>
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
};

function LearningModal({
  type,
  organ,
  locale,
  t,
  onStartLabelQuiz,
  onClose,
}: {
  type: Exclude<Modal, null>;
  organ: Organ;
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
    : format(t.modal.insideTitle, vars);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`learning-modal ${type === "system" || type === "lesson" || type === "quiz" ? "wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label={t.modal.close}><X size={18} /></button>
        <span className="modal-icon">{MODAL_ICON[type]}</span>
        <em>{t.modal.guided}</em>
        <h2 id="modal-title">{title}</h2>

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
