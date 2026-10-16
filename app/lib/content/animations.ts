import type { OrganId } from "../anatomy-data";

/**
 * Per-organ function animations. The 3D viewer plays these procedurally (no
 * animation clips required): a heartbeat, a breathing cycle, peristalsis etc.
 * The label/description pair is shown in the viewer chip while the model is
 * animating and is fully bilingual.
 */
export type BilingualAnimation = {
  en: { label: string; desc: string };
  ru: { label: string; desc: string };
};

export const functionAnimations: Record<OrganId, BilingualAnimation> = {

  stomach: {
    en: { label: "Peristaltic churn", desc: "The muscular wall mixes and gradually propels the contents towards the pylorus." },
    ru: { label: "Перемешивание", desc: "Мышечная стенка перемешивает содержимое и постепенно продвигает его к привратнику." },
  },
  gallbladder: {
    en: { label: "Bile release", desc: "After a fatty meal the sac contracts, sending a pulse of concentrated bile into the duodenum." },
    ru: { label: "Выброс желчи", desc: "После жирной еды пузырь сокращается и посылает порцию концентрированной желчи в двенадцатиперстную кишку." },
  },
  esophagus: {
    en: { label: "Peristaltic wave", desc: "A wave of contraction sweeps the bolus down to the stomach in about two seconds." },
    ru: { label: "Перистальтическая волна", desc: "Волна сокращения за две секунды продвигает пищевой комок к желудку." },
  },
  tongue: {
    en: { label: "Muscular mobility", desc: "Intrinsic and extrinsic muscles shape and move the tongue with remarkable precision." },
    ru: { label: "Мышечная подвижность", desc: "Внутренние и наружные мышцы придают языку форму и двигают им с удивительной точностью." },
  },
  spleen: {
    en: { label: "Blood filtration", desc: "A gentle pulse as the spleen filters and monitors the blood flowing through it." },
    ru: { label: "Фильтрация крови", desc: "Лёгкая пульсация в такт крови, которую селезёнка фильтрует и проверяет." },
  },
  thymus: {
    en: { label: "Lymphoid traffic", desc: "A quiet rhythm as immune cells move through the maturing gland." },
    ru: { label: "Лимфоидный поток", desc: "Спокойный ритм движения иммунных клеток в созревающей железе." },
  },
  "lymph-node": {
    en: { label: "Lymph percolation", desc: "Lymph slowly seeps through the node as immune cells scan it for antigens." },
    ru: { label: "Фильтрация лимфы", desc: "Лимфа медленно просачивается через узел, пока иммунные клетки проверяют её на антигены." },
  },
  thyroid: {
    en: { label: "Hormone release", desc: "A steady pulse as thyroid hormones enter the blood under TSH control." },
    ru: { label: "Выделение гормонов", desc: "Ровный пульс поступления тиреоидных гормонов в кровь под контролем ТТГ." },
  },
  adrenal: {
    en: { label: "Stress surge", desc: "A brief surge mirrors the catecholamine burst that primes the body for action." },
    ru: { label: "Стрессовый выброс", desc: "Короткий всплеск отражает выброс катехоламинов, готовящих организм к действию." },
  },
  pituitary: {
    en: { label: "Pulse release", desc: "Many pituitary hormones are secreted in pulses — visible as a subtle rhythm." },
    ru: { label: "Пульсовое выделение", desc: "Многие гормоны гипофиза секретируются импульсами — это видно как тонкий ритм." },
  },
  trachea: {
    en: { label: "Mucociliary flow", desc: "Cilia sweep the mucus carpet upward in a constant, quiet current." },
    ru: { label: "Мукоцилиарный поток", desc: "Реснички гонят слизистый ковёр вверх постоянным тихим течением." },
  },
  larynx: {
    en: { label: "Vocal fold vibration", desc: "A shimmering motion reflects the vocal folds oscillating during phonation." },
    ru: { label: "Колебания голосовых складок", desc: "Дрожащее движение отражает колебания голосовых складок при фонации." },
  },
  bladder: {
    en: { label: "Filling and voiding", desc: "The reservoir slowly distends as urine collects, then contracts to empty." },
    ru: { label: "Наполнение и опорожнение", desc: "Резервуар медленно растягивается, собирая мочу, затем сокращается для опорожнения." },
  },
  uterus: {
    en: { label: "Cyclic rhythm", desc: "The myometrium shows slow rhythmic contractions that intensify during menstruation." },
    ru: { label: "Циклический ритм", desc: "Миометрий совершает медленные ритмичные сокращения, усиливающиеся при менструации." },
  },
  ovary: {
    en: { label: "Follicle growth", desc: "A slow swell mirrors follicles maturing towards ovulation at mid-cycle." },
    ru: { label: "Рост фолликулов", desc: "Медленное набухание отражает созревание фолликулов к овуляции в середине цикла." },
  },
  testis: {
    en: { label: "Sperm production", desc: "A steady, quiet activity reflects continuous spermatogenesis." },
    ru: { label: "Производство спермы", desc: "Ровная тихая активность отражает непрерывный сперматогенез." },
  },
  prostate: {
    en: { label: "Glandular secretion", desc: "A subtle pulse as the gland contributes its secretions to the semen." },
    ru: { label: "Секреция", desc: "Едва заметная пульсация в такт вкладу железы в состав спермы." },
  },
  "spinal-cord": {
    en: { label: "Signal traffic", desc: "A steady rhythm mirrors impulses travelling up and down the cord." },
    ru: { label: "Поток сигналов", desc: "Ровный ритм отражает импульсы, бегущие вверх и вниз по спинному мозгу." },
  },
  diaphragm: {
    en: { label: "Breathing cycle", desc: "The dome flattens and rises with every breath, driving the air in and out." },
    ru: { label: "Дыхательный цикл", desc: "Купол уплощается и поднимается с каждым вдохом, гоняя воздух внутрь и наружу." },
  },
  biceps: {
    en: { label: "Contraction", desc: "A shortening pulse mirrors the muscle flexing the elbow and supinating the forearm." },
    ru: { label: "Сокращение", desc: "Короткий импульс отражает сгибание локтя и супинацию предплечья." },
  },
  femur: {
    en: { label: "Load bearing", desc: "A solid, steady presence — the pillar that carries the body's weight." },
    ru: { label: "Несение нагрузки", desc: "Прочная устойчивая опора — столп, несущий вес тела." },
  },
  heart: {
    en: {
      label: "Cardiac cycle",
      desc: "A pulse follows each heartbeat: the atria fill, the ventricles contract from the apex, then the muscle relaxes before the next beat.",
    },
    ru: {
      label: "Сердечный цикл",
      desc: "Пульс повторяет каждый удар: предсердия наполняются, желудочки сокращаются от верхушки, затем мышца расслабляется до следующего сокращения.",
    },
  },
  lungs: {
    en: {
      label: "Breathing cycle",
      desc: "The lungs expand as the diaphragm descends and recoil as it rises — a full cycle about every four seconds.",
    },
    ru: {
      label: "Дыхательный цикл",
      desc: "Лёгкие расширяются, когда диафрагма опускается, и спадаются при её подъёме — полный цикл примерно раз в четыре секунды.",
    },
  },
  brain: {
    en: {
      label: "Neural rhythms",
      desc: "The brain's surface pulses with the blood that supplies its ~86 billion neurons.",
    },
    ru: {
      label: "Нейронные ритмы",
      desc: "Поверхность мозга пульсирует в такт крови, питающей его ~86 миллиардов нейронов.",
    },
  },
  liver: {
    en: {
      label: "Metabolic pulse",
      desc: "Blood flows through the sinusoids continuously; the subtle pulse mirrors hepatic blood flow.",
    },
    ru: {
      label: "Метаболический пульс",
      desc: "Кровь непрерывно течёт по синусоидам; лёгкая пульсация отражает печёночный кровоток.",
    },
  },
  kidneys: {
    en: {
      label: "Filtration rhythm",
      desc: "A gentle pulse as about 1.25 litres of blood pass through the kidneys every minute.",
    },
    ru: {
      label: "Ритм фильтрации",
      desc: "Лёгкая пульсация в такт примерно 1,25 литра крови, проходящим через почки каждую минуту.",
    },
  },
  eyeball: {
    en: {
      label: "Scanning motion",
      desc: "The eye makes small scanning movements (saccades) even when you think you are holding still.",
    },
    ru: {
      label: "Сканирующее движение",
      desc: "Глаз совершает мелкие сканирующие движения (саккады), даже когда вам кажется, что вы смотрите неподвижно.",
    },
  },
  intestine: {
    en: {
      label: "Peristalsis",
      desc: "Segmentation and peristaltic waves mix and propel the contents along the digestive tube.",
    },
    ru: {
      label: "Перистальтика",
      desc: "Сегментация и перистальтические волны перемешивают и продвигают содержимое по пищеварительной трубке.",
    },
  },
  pancreas: {
    en: {
      label: "Glandular rhythm",
      desc: "Enzymes are released in waves; the gentle motion mirrors secretion.",
    },
    ru: {
      label: "Ритм железы",
      desc: "Ферменты выделяются волнами; мягкое движение отражает секрецию.",
    },
  },
  skin: {
    en: {
      label: "Renewal",
      desc: "The epidermis constantly sheds and renews — a quiet, continuous turnover.",
    },
    ru: {
      label: "Обновление",
      desc: "Эпидермис постоянно слущивается и обновляется — тихий непрерывный процесс.",
    },
  },
  pelvis: {
    en: { label: "Weight distribution", desc: "A stabilizing vector pulse illustrates how pelvic bones channel trunk weight to both legs." },
    ru: { label: "Распределение веса", desc: "Пульс силовых линий показывает передачу веса туловища через таз на обе ноги." },
  },
  knee: {
    en: { label: "Hinge flexion", desc: "A smooth articulate rotation demonstrates condylar gliding and meniscal shock absorption." },
    ru: { label: "Сгибание сустава", desc: "Плавное движение мыщелков демонстрирует скольжение и амортизацию менисков." },
  },
  sternum: {
    en: { label: "Pump-handle motion", desc: "A steady anterior-superior rise highlights sternal movement during deep inspiration." },
    ru: { label: "Движение рукоятки насоса", desc: "Подъём грудины вверх и вперёд иллюстрирует расширение грудной клетки при вдохе." },
  },
  manubrium: {
    en: { label: "Clavicular pivot", desc: "Subtle dual-pivot rotations illustrate forces transferred from arms into the torso." },
    ru: { label: "Ключичный поворот", desc: "Вращение в грудино-ключичных суставах отражает передачу усилий от рук к туловищу." },
  },
  "main-bronchus": {
    en: { label: "Airway conduit", desc: "Rhythmic alternating air stream flows branch from the trachea down into each lung." },
    ru: { label: "Дыхательный поток", desc: "Ритмичный ток воздуха разделяется из трахеи по бронхиальным деревьям обоих лёгких." },
  },
  "palatine-tonsil": {
    en: { label: "Antigen surveillance", desc: "Pulsing radial waves depict antigen sampling within crypts activating local lymphocyte pools." },
    ru: { label: "Иммунный надзор", desc: "Радиальные импульсы показывают контакт патогенов в криптах с лимфоцитами." },
  },
  "fallopian-tube": {
    en: { label: "Tubal peristalsis", desc: "A gentle synchronized wave carries the ovum along the tube toward the uterine horn." },
    ru: { label: "Перистальтика трубы", desc: "Волнообразное сокращение продвигает яйцеклетку по трубе в сторону матки." },
  },
  ureter: {
    en: { label: "Peristaltic pump", desc: "Sequential muscular contractions squeeze urine boluses downward toward the bladder." },
    ru: { label: "Перистальтическая волна", desc: "Последовательные сокращения проталкивают порции мочи вниз в мочевой пузырь." },
  },
  urethra: {
    en: { label: "Micturition flow", desc: "Sphincter relaxation followed by a clean laminar outward flow illustrates normal voiding." },
    ru: { label: "Поток мочеиспускания", desc: "Расслабление сфинктера и свободный ток жидкости демонстрируют нормальное мочеиспускание." },
  },
  "renal-pelvis": {
    en: { label: "Calyx funneling", desc: "Fluid convergences from collecting calyces channel smoothly into the funnel outlet." },
    ru: { label: "Сбор мочи чашечками", desc: "Схождение потоков мочи из почечных чашечек в общую выходную воронку." },
  },
  "large-intestine": {
    en: { label: "Haustral churning", desc: "Slow segmental contractions mix and advance luminal contents, optimizing water reclamation." },
    ru: { label: "Гаустральное перемешивание", desc: "Медленные сегментарные сокращения перемешивают содержимое для максимального всасывания воды." },
  },
  omentum: {
    en: { label: "Protective migration", desc: "A fluid defensive drape shifts flexibly over bowel loops to seal simulated irritation." },
    ru: { label: "Защитное укрытие", desc: "Подвижное смещение сальникового фартука демонстрирует изоляцию воспалительного очага." },
  },
};
