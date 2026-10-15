"use client";

import { useSyncExternalStore } from "react";
import type { OrganId } from "./anatomy-data";

/**
 * Learner progress, persisted in localStorage (per device; the project's D1
 * bindings are not declared, so a server-side store is out of scope for now).
 * The store follows the same useSyncExternalStore pattern as the language
 * store: module-level state, server snapshot = empty for hydration safety.
 */
export type QuizProgress = {
  best: number;
  total: number;
  attempts: number;
  lastScore: number;
  lastAt: string;
};

export type ProgressState = {
  visited: Partial<Record<OrganId, number>>;
  lessons: Partial<Record<OrganId, number>>;
  animations: Partial<Record<OrganId, number>>;
  quiz: Partial<Record<OrganId, QuizProgress>>;
  saved: OrganId[];
  notes: Partial<Record<OrganId, string>>;
};

const EMPTY: ProgressState = { visited: {}, lessons: {}, animations: {}, quiz: {}, saved: [], notes: {} };
const STORAGE_KEY = "anatomy-progress-v1";

function clone(value: ProgressState): ProgressState {
  return JSON.parse(JSON.stringify(value)) as ProgressState;
}

function load(): ProgressState {
  if (typeof window === "undefined") return clone(EMPTY);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(EMPTY);
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...clone(EMPTY), ...parsed };
  } catch {
    return clone(EMPTY);
  }
}

let state: ProgressState = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — keep state in memory.
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

function commit(mutator: (draft: ProgressState) => void) {
  const next = clone(state);
  mutator(next);
  state = next;
  persist();
  notify();
}

function bump(map: Partial<Record<OrganId, number>>, id: OrganId) {
  return { ...map, [id]: (map[id] ?? 0) + 1 };
}

export const progressStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): ProgressState {
    return state;
  },
  getServerSnapshot(): ProgressState {
    return clone(EMPTY);
  },
  markVisited(id: OrganId) {
    commit((draft) => {
      draft.visited = bump(draft.visited, id);
    });
  },
  markLesson(id: OrganId) {
    commit((draft) => {
      draft.lessons = bump(draft.lessons, id);
    });
  },
  markAnimation(id: OrganId) {
    commit((draft) => {
      draft.animations = bump(draft.animations, id);
    });
  },
  recordQuiz(id: OrganId, score: number, total: number) {
    commit((draft) => {
      const previous = draft.quiz[id];
      draft.quiz[id] = {
        best: Math.max(previous?.best ?? 0, score),
        total,
        attempts: (previous?.attempts ?? 0) + 1,
        lastScore: score,
        lastAt: new Date().toISOString(),
      };
    });
  },
  toggleSaved(id: OrganId) {
    commit((draft) => {
      draft.saved = draft.saved.includes(id)
        ? draft.saved.filter((item) => item !== id)
        : [...draft.saved, id];
    });
  },
  setNote(id: OrganId, text: string) {
    commit((draft) => {
      if (typeof text === "string" && text.trim().length > 0) {
        draft.notes = { ...draft.notes, [id]: text };
      } else {
        const next = { ...draft.notes };
        delete next[id];
        draft.notes = next;
      }
    });
  },
  reset() {
    state = clone(EMPTY);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
    notify();
  },
};

/** Reactive snapshot of the learner's progress. */
export function useProgress(): ProgressState {
  return useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, progressStore.getServerSnapshot);
}
