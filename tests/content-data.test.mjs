import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { access } from "node:fs/promises";
import { join } from "node:path";

import { organs } from "../app/lib/anatomy-data.ts";
import { organsRu } from "../app/lib/anatomy-ru.ts";
import { quizBank, QUIZ_QUESTIONS_PER_ORGAN } from "../app/lib/content/questions.ts";
import { bodySystems, systemById, systemForOrgan } from "../app/lib/content/systems.ts";
import { lessons } from "../app/lib/content/lessons.ts";
import { histology } from "../app/lib/content/histology.ts";
import { functionAnimations } from "../app/lib/content/animations.ts";
import { imaging } from "../app/lib/content/imaging.ts";
import { progressStore } from "../app/lib/progress.ts";

const organIds = organs.map((organ) => organ.id);
/** The nine original painted organs carry a full 5-question quiz; the
 *  extended set ships a shorter 3-question bank per organ. */
const ORIGINAL_NINE = new Set([
  "heart", "brain", "lungs", "liver", "kidneys", "eyeball", "intestine", "pancreas", "skin",
]);

describe("organ catalogue", () => {
  it("contains 30+ organs with unique ids", () => {
    assert.ok(organIds.length >= 30, `expected 30+ organs, got ${organIds.length}`);
    assert.equal(new Set(organIds).size, organIds.length, "duplicate organ ids");
    for (const organ of organs) {
      assert.ok(organ.name.length > 2, `${organ.id}: missing name`);
      assert.ok(organ.description.length > 40, `${organ.id}: missing description`);
      assert.ok(organ.conditions.length >= 6, `${organ.id}: too few conditions`);
      assert.ok(organ.hotspots.length >= 3, `${organ.id}: too few hotspots`);
      for (const hotspot of organ.hotspots) {
        assert.ok(Array.isArray(hotspot.position) && hotspot.position.length === 3, `${organ.id}: bad hotspot position`);
      }
      // Every organ must ship a model the viewer can load.
      assert.ok(organ.model.startsWith("/models/") && organ.model.endsWith(".glb"), `${organ.id}: bad model path`);
    }
  });

  it("translates every organ to Russian with hotspot parity", () => {
    for (const organ of organs) {
      const ru = organsRu[organ.id];
      assert.ok(ru, `${organ.id}: missing RU data`);
      assert.ok(ru.genitive.length > 2, `${organ.id}: missing genitive`);
      const enIds = organ.hotspots.map((h) => h.id).sort();
      const ruIds = ru.hotspots.map((h) => h.id).sort();
      assert.deepEqual(ruIds, enIds, `${organ.id}: hotspot id mismatch`);
      assert.equal(ru.conditions.length, organ.conditions.length, `${organ.id}: conditions count`);
      for (const field of ["name", "system", "description", "function", "location", "bloodSupply", "funFact", "tissue"]) {
        assert.ok(typeof ru[field] === "string" && ru[field].length > 0, `${organ.id}.${field} empty`);
      }
    }
  });
});

describe("quiz bank", () => {
  for (const organ of organs) {
    it(`${organ.id}: valid bilingual questions`, () => {
      const questions = quizBank[organ.id];
      const expected = ORIGINAL_NINE.has(organ.id) ? QUIZ_QUESTIONS_PER_ORGAN : 3;
      assert.ok(questions.length >= expected, `expected at least ${expected} questions, got ${questions.length}`);
      for (const [index, question] of questions.entries()) {
        for (const lang of ["en", "ru"]) {
          const q = question[lang];
          assert.ok(q.prompt.length > 10, `q${index} ${lang}: short prompt`);
          assert.ok(q.options.length >= 3, `q${index} ${lang}: fewer than 3 options`);
          assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length,
            `q${index} ${lang}: invalid correct index`);
          assert.ok(q.explanation.length > 20, `q${index} ${lang}: short explanation`);
        }
        assert.equal(question.en.options.length, question.ru.options.length,
          `q${index}: option count differs between languages`);
      }
    });
  }
});

describe("body systems", () => {
  it("lists twelve systems with bilingual descriptions", () => {
    assert.equal(bodySystems.length, 12, "expected 12 systems");
    for (const system of bodySystems) {
      for (const lang of ["en", "ru"]) {
        assert.ok(system[lang].name.length > 3, `${system.id} ${lang}: missing name`);
        assert.ok(system[lang].description.length > 40, `${system.id} ${lang}: missing description`);
      }
      for (const id of system.organIds) {
        assert.ok(organIds.includes(id), `${system.id}: unknown organ "${id}"`);
      }
      assert.ok(systemById[system.id], `systemById missing ${system.id}`);
    }
  });

  it("maps every modelled organ to a known system", () => {
    for (const id of organIds) {
      const systemId = systemForOrgan[id];
      assert.ok(systemId, `${id}: no system mapped`);
      assert.ok(systemById[systemId], `${id}: maps to unknown system "${systemId}"`);
      assert.ok(systemById[systemId].organIds.includes(id), `${id}: not listed in its own system`);
    }
  });
});

describe("lessons", () => {
  for (const organ of organs) {
    it(`${organ.id}: complete bilingual lesson`, () => {
      const lesson = lessons[organ.id];
      assert.ok(lesson.en.objectives.length >= 3, "too few objectives");
      assert.ok(lesson.en.structure.length > 80, "structure too short");
      assert.ok(lesson.en.function.length > 80, "function too short");
      assert.ok(lesson.en.clinical.length >= 2, "too few clinical points");
      assert.ok(lesson.en.sources.length >= 2, "too few sources");
      assert.equal(lesson.en.objectives.length, lesson.ru.objectives.length, "objectives count differs");
      assert.equal(lesson.en.clinical.length, lesson.ru.clinical.length, "clinical count differs");
      // Sources may legitimately differ: the Russian lessons add Russian-
      // language textbooks (Sinelnikov, Sapin) alongside the international ones.
      for (const lang of ["en", "ru"]) {
        const lessonLang = lesson[lang];
        assert.ok(lessonLang.objectives.every((item) => item.length > 15), `${lang}: short objective`);
        assert.ok(lessonLang.clinical.every((item) => item.length > 15), `${lang}: short clinical point`);
        assert.ok(lessonLang.sources.every((item) => item.length > 10), `${lang}: short source`);
      }
    });
  }
});

describe("histology", () => {
  for (const organ of organs) {
    it(`${organ.id}: labelled bilingual tissue layers`, () => {
      const layers = histology[organ.id];
      assert.ok(layers.en.length >= 3, "too few layers");
      assert.equal(layers.en.length, layers.ru.length, "layer count differs between languages");
      for (const lang of ["en", "ru"]) {
        for (const layer of layers[lang]) {
          assert.ok(layer.name.length > 3, `${lang}: missing layer name`);
          assert.ok(layer.detail.length > 20, `${lang}: short layer detail for "${layer.name}"`);
        }
      }
    });
  }
});

describe("function animations", () => {
  for (const organ of organs) {
    it(`${organ.id}: bilingual animation label and description`, () => {
      const animation = functionAnimations[organ.id];
      for (const lang of ["en", "ru"]) {
        assert.ok(animation[lang].label.length > 3, `${lang}: missing label`);
        assert.ok(animation[lang].desc.length > 20, `${lang}: missing description`);
      }
    });
  }
});

describe("imaging", () => {
  for (const organ of organs) {
    it(`${organ.id}: modality + note in both languages`, () => {
      const entry = imaging[organ.id];
      assert.ok(entry, "missing imaging entry");
      for (const lang of ["en", "ru"]) {
        assert.ok(entry[lang].modality.length > 5, `${lang}: missing modality`);
        assert.ok(entry[lang].note.length > 40, `${lang}: missing note`);
      }
    });
  }

  it("referenced images exist in public/imaging", async () => {
    for (const organ of organs) {
      const entry = imaging[organ.id];
      if (!entry.image) continue;
      const file = join(import.meta.dirname, "..", "public", entry.image);
      await assert.doesNotReject(access(file), `${organ.id}: image missing ${entry.image}`);
    }
  });
});

describe("progress store", () => {
  it("records quiz results, saved organs and notes", () => {
    progressStore.reset();
    progressStore.recordQuiz("heart", 4, 5);
    progressStore.recordQuiz("heart", 5, 5);
    progressStore.toggleSaved("brain");
    progressStore.toggleSaved("brain");
    progressStore.setNote("heart", "  Study the AV node!  ");
    progressStore.setNote("heart", "");

    const snapshot = progressStore.getSnapshot();
    assert.equal(snapshot.quiz.heart.attempts, 2, "attempts");
    assert.equal(snapshot.quiz.heart.best, 5, "best score");
    assert.equal(snapshot.quiz.heart.lastScore, 5, "last score");
    assert.deepEqual(snapshot.saved, [], "toggle twice = removed");
    assert.equal(snapshot.notes.heart, undefined, "empty note removed");

    progressStore.markVisited("lungs");
    progressStore.markLesson("liver");
    progressStore.markAnimation("kidneys");
    const after = progressStore.getSnapshot();
    assert.equal(after.visited.lungs, 1);
    assert.equal(after.lessons.liver, 1);
    assert.equal(after.animations.kidneys, 1);

    progressStore.reset();
    assert.deepEqual(progressStore.getSnapshot(), {
      visited: {}, lessons: {}, animations: {}, quiz: {}, saved: [], notes: {},
    }, "reset clears everything");
  });
});
