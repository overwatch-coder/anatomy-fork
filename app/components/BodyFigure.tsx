"use client";

import type { ReactNode } from "react";
import { organById } from "../lib/anatomy-data";
import { localizeOrgan } from "../lib/anatomy-ru";
import { systemForOrgan } from "../lib/content/systems";
import type { OrganContentDictionary } from "../i18n/types";

/** One colour per system, used both in the figure and the legend. */
export const SYSTEM_COLORS: Record<string, string> = {
  cardiovascular: "#e85d5d",
  respiratory: "#5d9ce8",
  digestive: "#e8a33b",
  nervous: "#8d6bcc",
  endocrine: "#c95fd0",
  urinary: "#54b7c9",
  integumentary: "#c99277",
  sensory: "#7294b9",
  musculoskeletal: "#d9665f",
  lymphatic: "#b98cc9",
  reproductive: "#e07a9b",
  skeletal: "#cbb98c",
};

/**
 * A stylised front view of the human body. Every modelled organ is drawn as a
 * clickable shape; when a system is selected the other organs dim, so the
 * figure doubles as a system map. Educational schematic — not anatomically
 * measured proportions.
 */
export function BodyFigure({
  selectedSystem,
  onSelectOrgan,
  locale = "en",
  organDict,
}: {
  selectedSystem: string | null;
  onSelectOrgan: (id: string) => void;
  locale?: string;
  organDict?: OrganContentDictionary;
}) {
  const label = (id: string) => {
    if (organDict?.[id]?.name) return organDict[id].name;
    const organ = organById[id as keyof typeof organById];
    if (!organ) return id;
    if (locale === "ru") return localizeOrgan(organ, "ru").name;
    return organ.name;
  };
  const isDimmed = (id: string) =>
    selectedSystem !== null && selectedSystem !== systemForOrgan[id as keyof typeof systemForOrgan];

  return (
    <svg
      className="body-figure"
      viewBox="0 0 300 640"
      role="img"
      aria-label="Schematic overview of the human body. Click an organ to open it."
    >
      {/* Spinal cord — behind everything */}
      <OrganShape id="spinal-cord" label={label("spinal-cord")} dimmed={isDimmed("spinal-cord")} onSelectOrgan={onSelectOrgan}>
        <line x1={150} y1={112} x2={150} y2={330} stroke="currentColor" strokeWidth={5} opacity={0.85} />
      </OrganShape>

      {/* Skin silhouette */}
      <OrganShape id="skin" label={label("skin")} dimmed={isDimmed("skin")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={58} rx={30} ry={36} fill="currentColor" opacity={0.5} />
        <rect x={140} y={92} width={20} height={14} fill="currentColor" opacity={0.5} />
        <path
          d="M100,112 C90,130 86,150 86,170 L84,240 C83,270 86,292 92,306 L88,318 C86,330 94,338 106,336 L150,340 L194,336 C206,338 214,330 212,318 L208,306 C214,292 217,270 216,240 L214,170 C214,150 210,130 200,112 C186,100 164,95 150,95 C136,95 114,100 100,112 Z"
          fill="currentColor"
          opacity={0.5}
        />
        <path d="M100,114 C88,150 82,190 82,230 C82,258 90,268 98,266" fill="none" stroke="currentColor" strokeWidth={17} strokeLinecap="round" opacity={0.5} />
        <path d="M200,114 C212,150 218,190 218,230 C218,258 210,268 202,266" fill="none" stroke="currentColor" strokeWidth={17} strokeLinecap="round" opacity={0.5} />
        <circle cx={99} cy={267} r={7} fill="currentColor" opacity={0.5} />
        <circle cx={201} cy={267} r={7} fill="currentColor" opacity={0.5} />
        <path d="M96,330 C94,365 92,410 92,455 L90,510 C89,528 104,532 110,518 L112,460 C113,415 114,380 118,356" fill="none" stroke="currentColor" strokeWidth={24} strokeLinecap="round" opacity={0.5} />
        <path d="M204,330 C206,365 208,410 208,455 L210,510 C211,528 196,532 190,518 L188,460 C187,415 186,380 182,356" fill="none" stroke="currentColor" strokeWidth={24} strokeLinecap="round" opacity={0.5} />
        <ellipse cx={96} cy={528} rx={16} ry={7} fill="currentColor" opacity={0.5} />
        <ellipse cx={204} cy={528} rx={16} ry={7} fill="currentColor" opacity={0.5} />
      </OrganShape>

      {/* Head and neck organs */}
      <OrganShape id="brain" label={label("brain")} dimmed={isDimmed("brain")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={50} rx={19} ry={23} fill="currentColor" />
      </OrganShape>
      <OrganShape id="pituitary" label={label("pituitary")} dimmed={isDimmed("pituitary")} onSelectOrgan={onSelectOrgan}>
        <circle cx={150} cy={54} r={4} fill="currentColor" />
      </OrganShape>
      <OrganShape id="eyeball" label={label("eyeball")} dimmed={isDimmed("eyeball")} onSelectOrgan={onSelectOrgan}>
        <circle cx={134} cy={58} r={7} fill="currentColor" />
        <circle cx={166} cy={58} r={7} fill="currentColor" />
      </OrganShape>
      <OrganShape id="tongue" label={label("tongue")} dimmed={isDimmed("tongue")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={80} rx={11} ry={7} fill="currentColor" />
      </OrganShape>
      <OrganShape id="larynx" label={label("larynx")} dimmed={isDimmed("larynx")} onSelectOrgan={onSelectOrgan}>
        <rect x={144} y={93} width={12} height={13} rx={4} fill="currentColor" />
      </OrganShape>
      <OrganShape id="thyroid" label={label("thyroid")} dimmed={isDimmed("thyroid")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={143} cy={108} rx={4.5} ry={7} fill="currentColor" />
        <ellipse cx={157} cy={108} rx={4.5} ry={7} fill="currentColor" />
        <rect x={147} y={107} width={6} height={3} fill="currentColor" />
      </OrganShape>
      <OrganShape id="trachea" label={label("trachea")} dimmed={isDimmed("trachea")} onSelectOrgan={onSelectOrgan}>
        <line x1={150} y1={108} x2={150} y2={142} stroke="currentColor" strokeWidth={5.5} />
      </OrganShape>
      <OrganShape id="esophagus" label={label("esophagus")} dimmed={isDimmed("esophagus")} onSelectOrgan={onSelectOrgan}>
        <line x1={155} y1={108} x2={157} y2={142} stroke="currentColor" strokeWidth={4.5} opacity={0.8} />
      </OrganShape>

      {/* Lymph nodes */}
      <OrganShape id="lymph-node" label={label("lymph-node")} dimmed={isDimmed("lymph-node")} onSelectOrgan={onSelectOrgan}>
        <circle cx={124} cy={121} r={3.5} fill="currentColor" />
        <circle cx={176} cy={121} r={3.5} fill="currentColor" />
        <circle cx={84} cy={180} r={3.5} fill="currentColor" />
        <circle cx={216} cy={180} r={3.5} fill="currentColor" />
      </OrganShape>

      {/* Chest */}
      <OrganShape id="thymus" label={label("thymus")} dimmed={isDimmed("thymus")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={137} cy={128} rx={7} ry={11} fill="currentColor" />
        <ellipse cx={163} cy={128} rx={7} ry={11} fill="currentColor" />
      </OrganShape>
      <OrganShape id="lungs" label={label("lungs")} dimmed={isDimmed("lungs")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={118} cy={152} rx={17} ry={40} fill="currentColor" transform="rotate(-8 118 152)" />
        <ellipse cx={182} cy={152} rx={17} ry={40} fill="currentColor" transform="rotate(8 182 152)" />
      </OrganShape>
      <OrganShape id="heart" label={label("heart")} dimmed={isDimmed("heart")} onSelectOrgan={onSelectOrgan}>
        <path
          d="M143,139 C140.5,135.5 135,135.5 133.5,139.5 C131.8,144 137,147.8 143,152.5 C149,147.8 154.2,144 152.5,139.5 C151,135.5 145.5,135.5 143,139 Z"
          fill="currentColor"
        />
      </OrganShape>
      <OrganShape id="diaphragm" label={label("diaphragm")} dimmed={isDimmed("diaphragm")} onSelectOrgan={onSelectOrgan}>
        <path d="M104,197 Q150,187 196,197" fill="none" stroke="currentColor" strokeWidth={4.5} />
      </OrganShape>

      {/* Abdomen */}
      <OrganShape id="liver" label={label("liver")} dimmed={isDimmed("liver")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={180} cy={215} rx={15} ry={11} fill="currentColor" />
      </OrganShape>
      <OrganShape id="gallbladder" label={label("gallbladder")} dimmed={isDimmed("gallbladder")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={171} cy={228} rx={5} ry={8} fill="currentColor" transform="rotate(12 171 228)" />
      </OrganShape>
      <OrganShape id="spleen" label={label("spleen")} dimmed={isDimmed("spleen")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={105} cy={214} rx={7} ry={12} fill="currentColor" />
      </OrganShape>
      <OrganShape id="stomach" label={label("stomach")} dimmed={isDimmed("stomach")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={127} cy={219} rx={12} ry={15} fill="currentColor" transform="rotate(8 127 219)" />
      </OrganShape>
      <OrganShape id="pancreas" label={label("pancreas")} dimmed={isDimmed("pancreas")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={234} rx={18} ry={5} fill="currentColor" />
      </OrganShape>
      <OrganShape id="adrenal" label={label("adrenal")} dimmed={isDimmed("adrenal")} onSelectOrgan={onSelectOrgan}>
        <circle cx={128} cy={242} r={3.5} fill="currentColor" />
        <circle cx={172} cy={242} r={3.5} fill="currentColor" />
      </OrganShape>
      <OrganShape id="kidneys" label={label("kidneys")} dimmed={isDimmed("kidneys")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={128} cy={250} rx={7} ry={12} fill="currentColor" />
        <ellipse cx={172} cy={250} rx={7} ry={12} fill="currentColor" />
      </OrganShape>
      <OrganShape id="intestine" label={label("intestine")} dimmed={isDimmed("intestine")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={141} cy={263} rx={12} ry={9} fill="currentColor" />
        <ellipse cx={159} cy={265} rx={12} ry={9} fill="currentColor" />
        <ellipse cx={150} cy={277} rx={17} ry={12} fill="currentColor" />
      </OrganShape>

      {/* Pelvis */}
      <OrganShape id="bladder" label={label("bladder")} dimmed={isDimmed("bladder")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={312} rx={12} ry={10} fill="currentColor" />
      </OrganShape>
      <OrganShape id="ovary" label={label("ovary")} dimmed={isDimmed("ovary")} onSelectOrgan={onSelectOrgan}>
        <circle cx={133} cy={324} r={4.5} fill="currentColor" />
        <circle cx={167} cy={324} r={4.5} fill="currentColor" />
      </OrganShape>
      <OrganShape id="uterus" label={label("uterus")} dimmed={isDimmed("uterus")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={330} rx={9} ry={11} fill="currentColor" />
      </OrganShape>
      <OrganShape id="prostate" label={label("prostate")} dimmed={isDimmed("prostate")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={344} rx={6.5} ry={5.5} fill="currentColor" />
      </OrganShape>
      <OrganShape id="testis" label={label("testis")} dimmed={isDimmed("testis")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={150} cy={356} rx={12} ry={9} fill="currentColor" opacity={0.85} />
        <ellipse cx={143.5} cy={356} rx={5.5} ry={7} fill="currentColor" />
        <ellipse cx={156.5} cy={356} rx={5.5} ry={7} fill="currentColor" />
      </OrganShape>

      {/* Limbs */}
      <OrganShape id="biceps" label={label("biceps")} dimmed={isDimmed("biceps")} onSelectOrgan={onSelectOrgan}>
        <ellipse cx={86} cy={153} rx={6.5} ry={13} fill="currentColor" />
        <ellipse cx={214} cy={153} rx={6.5} ry={13} fill="currentColor" />
      </OrganShape>
      <OrganShape id="femur" label={label("femur")} dimmed={isDimmed("femur")} onSelectOrgan={onSelectOrgan}>
        <line x1={104} y1={344} x2={102} y2={432} stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
        <line x1={196} y1={344} x2={198} y2={432} stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
        <circle cx={102} cy={436} r={4.5} fill="currentColor" />
        <circle cx={198} cy={436} r={4.5} fill="currentColor" />
      </OrganShape>
    </svg>
  );
}

/** Clickable organ group: dims when another system is selected. */
function OrganShape({
  id,
  label,
  dimmed,
  onSelectOrgan,
  children,
}: {
  id: string;
  label: string;
  dimmed: boolean;
  onSelectOrgan: (id: string) => void;
  children: ReactNode;
}) {
  const color = SYSTEM_COLORS[systemForOrgan[id as keyof typeof systemForOrgan]] ?? "#999";
  return (
    <g
      id={`organ-${id}`}
      className={`body-organ ${dimmed ? "dimmed" : ""}`}
      style={{ color }}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => onSelectOrgan(id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectOrgan(id);
        }
      }}
    >
      {children}
      <title>{label}</title>
    </g>
  );
}
