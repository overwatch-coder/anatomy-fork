"use client";

import { FlipHorizontal2 } from "lucide-react";
import type { SectionAxis } from "../lib/three/viewer";

/** The three named planes anatomy is taught in, plus one that follows the view.
 *  The hints are the point: they are the vocabulary a learner needs. */
const AXES: { id: SectionAxis; label: string; hint: string }[] = [
  { id: "sagittal", label: "Sagittal", hint: "Divides left from right" },
  { id: "coronal", label: "Coronal", hint: "Divides front from back" },
  { id: "axial", label: "Axial", hint: "Divides top from bottom" },
  { id: "free", label: "Free", hint: "Squares up to the current view" },
];

type Props = {
  axis: SectionAxis;
  depth: number;
  flipped: boolean;
  showPlane: boolean;
  onAxis: (axis: SectionAxis) => void;
  onDepth: (depth: number) => void;
  onFlip: () => void;
  onShowPlane: (shown: boolean) => void;
};

export function SectionControls({ axis, depth, flipped, showPlane, onAxis, onDepth, onFlip, onShowPlane }: Props) {
  const active = AXES.find((item) => item.id === axis) ?? AXES[3];
  return (
    <div className="section-controls" role="group" aria-label="Cross-section plane">
      <div className="section-axes" role="radiogroup" aria-label="Cutting plane">
        {AXES.map(({ id, label, hint }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={axis === id}
            className={axis === id ? "active" : ""}
            onClick={() => onAxis(id)}
            title={hint}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="section-depth">
        <span>Depth</span>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={depth}
          onChange={(event) => onDepth(Number(event.target.value))}
          aria-label="Cutting plane depth"
          // Percentages read better than the -1..1 the viewer works in.
          aria-valuetext={`${Math.round(((depth + 1) / 2) * 100)}% through the specimen`}
        />
      </label>

      <button
        type="button"
        className={`section-flip ${flipped ? "active" : ""}`}
        onClick={onFlip}
        aria-pressed={flipped}
        title="Show the other half"
      >
        <FlipHorizontal2 size={15} />
      </button>

      <label className="section-plane" title="Draw the cutting plane in the scene">
        <input
          type="checkbox"
          checked={showPlane}
          onChange={(event) => onShowPlane(event.target.checked)}
        />
        <span>Plane</span>
      </label>

      <em aria-live="polite">{active.hint}</em>
    </div>
  );
}
