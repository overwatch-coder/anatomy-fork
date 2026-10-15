# Anatomy Atelier — 3D Anatomical Atlas & Clinical Learning Platform

An interactive, high-fidelity 3D human anatomy atlas and clinical learning environment. Built with **Next.js**, **Three.js**, **Vinext**, **GSAP**, and **Tailwind CSS**, designed for medical students, healthcare practitioners, educators, and curious learners.

---

## Attributions & Credits

> [!NOTE]
> **Compilation & Hosting Notice**: This project is a unified compilation hosted to preserve and bring together the best features from the original codebase, core upstream contributors, and multiple community pull requests into a single cohesive platform. Full credit for the underlying innovations belongs to the original authors and contributors credited below.

### Original Foundation & Base Repository
* **Base Repository Cloned From:** [`overwatch-coder/anatomy-fork`](https://github.com/overwatch-coder/anatomy-fork.git) — Maintained by **Overwatch** ([@devbrainy98](https://github.com/overwatch-coder)).
* **Platform Foundation:** Initial Anatomy Atelier 3D architecture by **Codex** ([@openai](https://github.com/openai)).
* **Core 3D Engine & Asset Pipeline:** Significant early performance enhancements, 3D Asset Manager and Viewer refactoring, depth prepass rendering, organ illustrations, and the 3D interactive labelling quiz authored by **thebuggeddev** ([@thebuggeddev](https://github.com/thebuggeddev)).

### Merged Community Pull Requests & Forks
This hosted version integrates and harmonizes contributions from three external forks without feature regressions:

1. **resarytrew / arena** — [`resarytrew/anatomy`](https://github.com/resarytrew/anatomy.git)
   * **30-Organ Catalogue Expansion**: Expanded the atlas from a limited subset to 30 anatomical organs with procedural 3D models.
   * **Interactive Systems Map**: Full 12-system anatomical body overview with an interactive SVG body figure and system-specific organ filters.
   * **Physiological 3D Animations & Histology**: Real-time 3D motion simulations (cardiac pumping, alveolar ventilation, peristalsis) and multi-layered histological tissue breakdowns.
   * **Clinical Radiology**: Integrated medical imaging notes (MRI, CT, ultrasound).
   * **Learner Profile & Curriculum**: Structured bilingual lesson data and local progress tracking store.

2. **Mahmoud Hassan** — [`MahmoudHassan77/anatomy`](https://github.com/MahmoudHassan77/anatomy.git)
   * **Vercel & Build Tooling**: Vercel deployment configuration, Next.js build integration, and deployment optimizations.
   * **Multilingual Foundation**: Initial localization framework and asset loading improvements.

3. **Pouyan Jay** — [`PouyanJay/anatomy`](https://github.com/PouyanJay/anatomy.git)
   * **Rendering Pipeline Optimizations**: Three.js depth prepass rendering, organ fading transitions, and visual layout refinements.

---

## Features in This Distribution

* **30-Specimen 3D Interactive Atlas**: High-detail 3D models with orbit controls, auto-rotation, wireframe/specimen inspection, and a cross-section **Cutting Plane** tool.
* **Comparative Anatomy Matrix**: Side-by-side comparative examination of any two specimens with quick swap, morphological metrics, mass, dimensions, vascular supply, and common pathologies.
* **Clinical Study Notes & Journal**:
  * Persistent interactive notebook saved directly to browser `localStorage`.
  * High-yield prompt chips (`+ Morphology`, `+ Physiology`, `+ Clinical Pearl`, `+ Mnemonic`).
  * Directory of all saved notes with one-click **Export All (.md)** download.
* **30-Organ Masterclass Lessons**:
  * 5-part structured clinical curriculum: Learning Objectives, Anatomical Architecture, Physiological Mechanisms, Clinical Pathology Correlates, and Canonical Bibliography (*Gray's Anatomy*, *Netter*, *Guyton & Hall*).
  * Direct jumps between Lessons, Notes, Quizzes, and 3D inspection.
* **Dual Quiz Engine**:
  * **3D Labelling Quiz**: Interactive 3D spatial pin identification on organ models.
  * **Theory Quiz Bank**: Multiple-choice clinical and anatomical theory questions with instant explanations and score tracking.
* **Interactive Systems Overview**: Dedicated 12-system atlas page (`/systems`) with SVG body highlighting and organ filtering.
* **Multi-Language Support (i18n)**:
  * Complete translations for **English** (`en`), **French** (`fr`), **Spanish** (`es`), **Arabic** (`ar`), **Portuguese** (`pt`), and **Russian** (`ru`).
* **Symmetrical Editorial UI**: Warm, classical editorial layout with centered header navigation and responsive mobile drawers.

---

## Quick Start

### Prerequisites
* **Node.js** `>=22.13.0`
* **npm** `>=10.0.0`

### Installation
```bash
git clone https://github.com/overwatch-coder/anatomy-fork.git
cd anatomy
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Testing
Run the comprehensive test suite (156 passing tests across content, bilingual lessons, histology, quizzes, and rendering):
```bash
npm test
```
Run TypeScript verification:
```bash
npx tsc --noEmit
```

---

## Deployment & Hosting

This project supports multiple hosting environments:

### 1. Vercel
The repository includes a ready-to-use [`vercel.json`](file:///Users/nyamads/Desktop/tryouts/anatomy/vercel.json) configuration:
```bash
npm run build:next
```

### 2. Cloudflare / Vinext
Built natively on [`vinext`](https://github.com/cloudflare/vinext) with optional Cloudflare D1 support:
```bash
npm run build
npm run start
```

---

## Medical Disclaimer

> [!CAUTION]
> **Educational Use Only**: Anatomy Atelier is designed strictly for educational, informational, and academic purposes. It does not provide medical advice, diagnosis, or treatment plans. Always consult a qualified healthcare provider for clinical medical decisions.

---

## License

This project is open-source under the terms of the original repository licenses. Please respect the copyrights and licenses of all upstream projects and contributors.
