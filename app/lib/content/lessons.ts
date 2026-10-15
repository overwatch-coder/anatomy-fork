import type { OrganId } from "../anatomy-data";
import { lessonsExtra } from "./lessons-extra";

/**
 * Structured study lessons, one per organ, bilingual (en/ru). Each lesson
 * follows the same professional template:
 *   1. Learning objectives
 *   2. Structure
 *   3. Function
 *   4. Clinical perspective
 *   5. Sources (bibliography, canonical textbooks)
 *
 * Content is written to the level of an introductory anatomy course and is
 * reviewed against standard references; it remains educational, not medical
 * advice (see footer disclaimer).
 */
export type BilingualLesson = {
  en: Lesson;
  ru: Lesson;
};

export type Lesson = {
  objectives: string[];
  structure: string;
  function: string;
  clinical: string[];
  sources: string[];
};

const lessonsCore: Partial<Record<OrganId, BilingualLesson>> = {
  heart: {
    en: {
      objectives: [
        "Describe the four chambers, their walls and the four valves",
        "Trace blood flow through the pulmonary and systemic circuits",
        "Explain the cardiac conduction system and its clinical importance",
      ],
      structure:
        "The heart is a four-chambered muscular pump about the size of a fist (250–350 g), enclosed in the pericardium. The atria receive blood, the ventricles eject it; the right heart (right atrium, right ventricle) handles the pulmonary circuit, the left heart the systemic circuit. The atrioventricular valves (tricuspid on the right, mitral on the left) prevent backflow into the atria; the semilunar valves (pulmonary, aortic) guard the arterial outlets. The myocardium of the left ventricle is the thickest — it must generate ~120 mmHg to drive blood through the whole body.",
      function:
        "The sinoatrial node fires ~60–100 times per minute; the impulse spreads across the atria, pauses at the atrioventricular node, and races down the His–Purkinje system to make both ventricles contract from the apex upwards. Each beat ejects ~70 mL (stroke volume), about 5 L/min at rest. The coronary arteries — the first branches of the aorta — supply the myocardium itself; their perfusion happens mostly during diastole, which is why a fast heart rate can starve the muscle.",
      clinical: [
        "Coronary artery disease: atherosclerotic narrowing of the coronaries causes angina; total occlusion of a branch leads to myocardial infarction.",
        "Arrhythmias: from benign extra-systoles to life-threatening ventricular fibrillation; the ECG maps the conduction system.",
        "Heart failure: the pump cannot meet demand — common causes are ischaemic heart disease, hypertension and valve disease.",
      ],
      sources: [
        "Standring S. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать четыре камеры сердца, их стенки и четыре клапана",
        "Проследить путь крови по малому и большому кругам кровообращения",
        "Объяснить проводящую систему сердца и её клиническое значение",
      ],
      structure:
        "Сердце — четырёхкамерный мышечный насос размером примерно с кулак (250–350 г), заключённый в перикард. Предсердия принимают кровь, желудочки выбрасывают её; правые отделы (правое предсердие и правый желудочек) обслуживают малый круг кровообращения, левые — большой. Атриовентрикулярные клапаны (трёхстворчатый справа, митральный слева) препятствуют обратному току в предсердия; полулунные клапаны (лёгочного ствола и аорты) закрывают артериальные выходы. Миокард левого желудочка самый толстый — он должен создавать давление около 120 мм рт. ст., чтобы протолкнуть кровь через всё тело.",
      function:
        "Синоатриальный узел генерирует импульсы с частотой 60–100 в минуту; импульс распространяется по предсердиям, задерживается в атриовентрикулярном узле и по системе Гиса–Пуркинье быстро охватывает оба желудочка, которые сокращаются от верхушки к основанию. Каждое сокращение выбрасывает около 70 мл (ударный объём), в покое — примерно 5 л/мин. Венечные артерии — первые ветви аорты — питают сам миокард; их кровоток максимален в диастолу, поэтому слишком частый ритм может лишать мышцу крови.",
      clinical: [
        "Ишемическая болезнь сердца: атеросклеротическое сужение венечных артерий вызывает стенокардию; полная закупорка ветви — инфаркт миокарда.",
        "Аритмии: от доброкачественных экстрасистол до опасной фибрилляции желудочков; ЭКГ отражает работу проводящей системы.",
        "Сердечная недостаточность: насос не справляется с нагрузкой — частые причины: ИБС, артериальная гипертензия, пороки клапанов.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Сапин М.Р., Никитюк Д.Б. Анатомия человека. 5-е изд. — М.: ГЭОТАР-Медиа, 2020.",
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  brain: {
    en: {
      objectives: [
        "Identify the main lobes and the major subcortical structures",
        "Explain how neurons transmit signals and how the brain is protected",
        "Describe the blood supply and the blood–brain barrier",
      ],
      structure:
        "The brain (1.3–1.4 kg) comprises the cerebrum with its two hemispheres, the cerebellum, the brainstem and the diencephalon. Each hemisphere has four lobes — frontal, parietal, temporal, occipital — and a cerebral cortex of ~16 billion neurons, folded into gyri and sulci. Deep grey matter (basal ganglia, thalamus, hippocampus, amygdala) lies beneath, and the ventricular system floats the whole brain in cerebrospinal fluid. Three meninges (dura, arachnoid, pia) and the skull add mechanical protection.",
      function:
        "The frontal lobe plans and executes movement; the parietal lobe integrates touch and spatial awareness; the temporal lobe processes hearing, language and memory; the occipital lobe is visual. The cerebellum fine-tunes coordination, the hypothalamus controls autonomic functions and hormones, and the brainstem houses vital reflexes (breathing, heart rate). Neurons communicate through electrical impulses and synaptic transmitters; the brain uses ~20% of the body's energy despite being only ~2% of its mass.",
      clinical: [
        "Stroke: ischaemic (artery occlusion) or haemorrhagic; minutes decide outcome — 'time is brain'.",
        "Neurodegeneration: Alzheimer's and Parkinson's disease progressively destroy specific neuron populations.",
        "Traumatic brain injury: even closed head injuries can shear axons and cause lasting deficits.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
        "Nolte J. The Human Brain: An Introduction to Its Functional Anatomy. 8th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Определить основные доли и крупные подкорковые структуры",
        "Объяснить передачу сигналов нейронами и защиту головного мозга",
        "Описать кровоснабжение мозга и гематоэнцефалический барьер",
      ],
      structure:
        "Головной мозг (1,3–1,4 кг) включает большой мозг с двумя полушариями, мозжечок, ствол мозга и промежуточный мозг. В каждом полушарии четыре доли — лобная, теменная, височная и затылочная — и кора из примерно 16 миллиардов нейронов, собранная в извилины и борозды. Глубже лежат базальные ядра, таламус, гиппокамп и миндалевидное тело, а желудочковая система «взвешивает» мозг в спинномозговой жидкости. Механическую защиту обеспечивают череп и три мозговые оболочки (твёрдая, паутинная, мягкая).",
      function:
        "Лобная доля планирует и выполняет движения; теменная интегрирует прикосновение и пространственное восприятие; височная обрабатывает слух, речь и память; затылочная — зрение. Мозжечок координирует движения, гипоталамус управляет вегетативными функциями и гормонами, а ствол содержит жизненно важные рефлексы (дыхание, частота сердечных сокращений). Нейроны общаются электрическими импульсами и медиаторами; мозг потребляет около 20% энергии тела, составляя лишь ~2% его массы.",
      clinical: [
        "Инсульт: ишемический (закупорка артерии) или геморрагический; исход решают минуты — «время — мозг».",
        "Нейродегенерация: болезнь Альцгеймера и болезнь Паркинсона постепенно разрушают определённые популяции нейронов.",
        "Черепно-мозговая травма: даже закрытая травма может разорвать аксоны и вызвать стойкие нарушения.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Сапин М.Р., Никитюк Д.Б. Анатомия человека. 5-е изд. — М.: ГЭОТАР-Медиа, 2020.",
        "Nolte J. The Human Brain: An Introduction to Its Functional Anatomy. 8th ed. Elsevier, 2020.",
      ],
    },
  },
  lungs: {
    en: {
      objectives: [
        "Trace the airway from trachea to alveoli",
        "Describe the pleural cavity and the mechanics of breathing",
        "Explain gas exchange and the main respiratory diseases",
      ],
      structure:
        "The lungs are paired cone-shaped organs (about 1 kg together) in the pleural cavities. The right lung has three lobes, the left two — its cardiac notch leaves room for the heart. Air travels: trachea → main bronchi → lobar and segmental bronchi → bronchioles → terminal and respiratory bronchioles → alveolar ducts → ~300 million alveoli. The pleura (visceral and parietal layers with a thin fluid film) lets the lungs glide during breathing.",
      function:
        "The diaphragm and intercostal muscles expand the chest; negative pleural pressure inflates the lungs (inspiration). At rest an adult breathes ~12–16 times per minute, moving ~11,000 L of air daily. In the alveoli, oxygen diffuses into the blood and CO₂ out across the 0.5–1 µm alveolar–capillary membrane (~70–100 m² total). Surfactant lowers surface tension and keeps alveoli open; pulmonary blood flow matches ventilation so exchange stays efficient.",
      clinical: [
        "Asthma: reversible bronchospasm, inflammation and mucus hypersecretion triggered by allergens or infection.",
        "COPD (chronic bronchitis + emphysema): irreversible airflow limitation, mainly from smoking.",
        "Pneumonia: alveolar inflammation and fluid filling, usually infectious; a leading cause of hospitalisation.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
        "West J.B. Respiratory Physiology: The Essentials. 10th ed. Wolters Kluwer, 2016.",
      ],
    },
    ru: {
      objectives: [
        "Проследить путь воздуха от трахеи до альвеол",
        "Описать плевральную полость и механику дыхания",
        "Объяснить газообмен и основные заболевания лёгких",
      ],
      structure:
        "Лёгкие — парные конусовидные органы (около 1 кг вместе), лежащие в плевральных полостях. В правом лёгком три доли, в левом две — сердечная вырезка оставляет место для сердца. Воздух проходит: трахея → главные бронхи → долевые и сегментарные бронхи → бронхиолы → концевые и дыхательные бронхиолы → альвеолярные ходы → около 300 млн альвеол. Плевра (висцеральный и париетальный листки с тонкой плёнкой жидкости) позволяет лёгким скользить при дыхании.",
      function:
        "Диафрагма и межрёберные мышцы расширяют грудную клетку; отрицательное плевральное давление расправляет лёгкие (вдох). В покое взрослый человек дышит 12–16 раз в минуту, пропуская около 11 000 л воздуха в сутки. В альвеолах кислород диффундирует в кровь, а CO₂ — обратно через мембрану толщиной 0,5–1 мкм (общая площадь ~70–100 м²). Сурфактант снижает поверхностное натяжение и удерживает альвеолы открытыми; лёгочный кровоток согласуется с вентиляцией, сохраняя эффективность газообмена.",
      clinical: [
        "Бронхиальная астма: обратимый бронхоспазм, воспаление и гиперсекреция слизи, провоцируемые аллергенами или инфекцией.",
        "ХОБЛ (хронический бронхит + эмфизема): необратимое ограничение воздушного потока, главным образом из-за курения.",
        "Пневмония: воспаление и заполнение альвеол жидкостью, обычно инфекционной природы; частая причина госпитализации.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "West J.B. Respiratory Physiology: The Essentials. 10th ed. Wolters Kluwer, 2016.",
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
      ],
    },
  },
  liver: {
    en: {
      objectives: [
        "Describe the macroscopic and microscopic organisation of the liver",
        "Explain the dual blood supply and the biliary system",
        "List the main metabolic, synthetic and detoxification functions",
      ],
      structure:
        "The liver (1.4–1.6 kg) is the largest internal organ, lying in the right hypochondrium beneath the diaphragm. It has two main lobes (right, left) and two smaller ones (caudate, quadrate), wrapped in a fibrous capsule (Glisson's). Microscopically it is built of ~1 million hexagonal hepatic lobules: plates of hepatocytes radiating from a central vein, with portal tracts (portal vein, hepatic artery, bile duct) at the corners. Hepatocytes, bile canaliculi, sinusoidal capillaries with Kupffer cells, and stellate (Ito) cells make up the working tissue.",
      function:
        "Hepatocytes perform over 500 functions: synthesis of plasma proteins (albumin, clotting factors), glucose and lipid metabolism, bile production, storage of glycogen and vitamins, and detoxification via cytochrome P450. The liver receives ~25–30% of cardiac output: the portal vein (~75%) delivers nutrient-rich blood from the gut for first-pass processing, the hepatic artery (~25%) supplies oxygen. Bile flows through canaliculi into the biliary tree and is stored in the gallbladder.",
      clinical: [
        "Fatty liver disease and hepatitis: inflammation and fat accumulation can progress to cirrhosis.",
        "Cirrhosis: fibrosis replaces functioning lobules, causing portal hypertension and liver failure.",
        "Regeneration: the liver can regrow from ~25–30% of its mass — the basis of living-donor transplantation.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать макроскопическую и микроскопическую организацию печени",
        "Объяснить двойное кровоснабжение печени и жёлчевыводящую систему",
        "Перечислить основные метаболические, синтетические и детоксикационные функции",
      ],
      structure:
        "Печень (1,4–1,6 кг) — самый крупный внутренний орган, лежит в правом подреберье под диафрагмой. У неё две большие доли (правая, левая) и две малые (хвостатая, квадратная), покрытые фиброзной капсулой (Глиссона). Микроскопически печень построена из примерно миллиона шестиугольных печёночных долек: пластинки гепатоцитов расходятся от центральной вены, а по углам лежат портальные тракты (воротная вена, печёночная артерия, жёлчный проток). Рабочую ткань образуют гепатоциты, жёлчные канальцы, синусоидные капилляры с клетками Купфера и звёздчатые клетки (Ито).",
      function:
        "Гепатоциты выполняют более 500 функций: синтез белков плазмы (альбумин, факторы свёртывания), обмен глюкозы и липидов, продукция желчи, запасание гликогена и витаминов, детоксикация через цитохром P450. Печень получает около 25–30% сердечного выброса: воротная вена (~75%) доставляет богатую питательными веществами кровь из кишечника для первичной переработки, печёночная артерия (~25%) приносит кислород. Желчь по канальцам попадает в жёлчное дерево и накапливается в жёлчном пузыре.",
      clinical: [
        "Жировая болезнь печени и гепатит: воспаление и накопление жира могут привести к циррозу.",
        "Цирроз: фиброз замещает функционирующие дольки, вызывая портальную гипертензию и печёночную недостаточность.",
        "Регенерация: печень способна восстановиться из ~25–30% своей массы — основа трансплантации от живого донора.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
      ],
    },
  },
  kidneys: {
    en: {
      objectives: [
        "Describe the gross structure of the kidney and its blood supply",
        "Explain the nephron and the stages of urine formation",
        "Discuss the kidneys' role in homeostasis and blood pressure",
      ],
      structure:
        "The kidneys are paired bean-shaped organs (120–170 g each) lying retroperitoneally at the T12–L3 level. From outside in: fibrous capsule, cortex (with the renal corpuscles), medulla (pyramids converging into papillae), and the renal pelvis draining into the ureter. Each kidney contains about 1 million nephrons — the filtration unit of a glomerulus plus a long tubule (proximal, loop of Henle, distal) ending in a collecting duct. Blood arrives via the renal artery (about 20–25% of cardiac output).",
      function:
        "Urine forms in three steps: glomerular filtration (~125 mL/min, 180 L/day), selective reabsorption (99% of water, all glucose and amino acids), and secretion of waste (H⁺, K⁺, drugs). The proximal tubule reclaims most solutes, the loop of Henle builds the medullary concentration gradient, and ADH and aldosterone fine-tune the final urine. The kidneys also secrete erythropoietin (anaemia protection), activate vitamin D, and regulate blood pressure through the renin–angiotensin system.",
      clinical: [
        "Kidney stones: supersaturated salts crystallise in the collecting system — a classic cause of renal colic.",
        "Chronic kidney disease: progressive loss of nephrons leads to uraemia, anaemia and bone disease.",
        "Acute kidney injury: sudden drop in filtration (ischaemia, toxins, sepsis) is often reversible with support.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать макроскопическое строение почки и её кровоснабжение",
        "Объяснить строение нефрона и этапы образования мочи",
        "Обсудить роль почек в гомеостазе и регуляции давления",
      ],
      structure:
        "Почки — парные бобовидные органы (120–170 г каждая), лежат забрюшинно на уровне T12–L3. Снаружи внутрь: фиброзная капсула, корковое вещество (с почечными тельцами), мозговое вещество (пирамиды, сходящиеся в сосочки) и почечная лоханка, переходящая в мочеточник. В каждой почке около миллиона нефронов — фильтрующая единица из клубочка и длинного канальца (проксимальный, петля Генле, дистальный), впадающего в собирательную трубочку. Кровь поступает по почечной артерии (около 20–25% сердечного выброса).",
      function:
        "Моча образуется в три этапа: клубочковая фильтрация (~125 мл/мин, 180 л/сут), избирательная реабсорбция (99% воды, вся глюкоза и аминокислоты) и секреция отходов (H⁺, K⁺, лекарства). Проксимальный каналец возвращает большинство растворённых веществ, петля Генле создаёт концентрационный градиент мозгового вещества, а АДГ и альдостерон настраивают конечный состав мочи. Почки также секретируют эритропоэтин (защита от анемии), активируют витамин D и регулируют артериальное давление через ренин-ангиотензиновую систему.",
      clinical: [
        "Мочекаменная болезнь: кристаллизация солей в собирательной системе — классическая причина почечной колики.",
        "Хроническая болезнь почек: прогрессирующая потеря нефронов ведёт к уремии, анемии и костным нарушениям.",
        "Острое повреждение почек: внезапное падение фильтрации (ишемия, токсины, сепсис) часто обратимо при поддержке.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
      ],
    },
  },
  eyeball: {
    en: {
      objectives: [
        "Describe the tunics of the eye and the optical media",
        "Explain image formation and accommodation",
        "Outline the retina, phototransduction and the visual pathway",
      ],
      structure:
        "The eye is a sphere about 24 mm across (7.5 g) within the bony orbit, cushioned by fat. Three tunics: the outer fibrous coat (sclera + transparent cornea), the vascular uvea (choroid, ciliary body, iris), and the retina. Optical media: cornea, aqueous humour (between cornea and lens), the crystalline lens, and the vitreous body. The lens is suspended by zonular fibres from the ciliary body; the cornea is avascular — it takes oxygen from the air.",
      function:
        "The cornea provides most refractive power (~40 dioptres); the lens adds ~20 and changes curvature for near vision (accommodation). The iris controls light entry; the pupil constricts in bright light. In the retina, ~120 million rods (dim light) and ~6 million cones (colour, acuity) convert light into signals; the fovea — the centre of the macula — gives sharpest vision. Axons gather at the optic disc and travel as the optic nerve to the visual cortex; the retina is an extension of the CNS.",
      clinical: [
        "Refractive errors (myopia, hyperopia, astigmatism): the image focuses off the retina; corrected with lenses or surgery.",
        "Cataract: lens opacity — the leading cause of reversible blindness worldwide.",
        "Glaucoma: optic neuropathy, usually from raised intraocular pressure; screening protects vision.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Riordan-Eva P., Augsburger J.J. Vaughan & Asbury's General Ophthalmology. 19th ed. McGraw-Hill, 2018.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать оболочки глаза и светопроводящие среды",
        "Объяснить формирование изображения и аккомодацию",
        "Рассмотреть сетчатку, фототрансдукцию и зрительный путь",
      ],
      structure:
        "Глаз — сфера диаметром около 24 мм (7,5 г), лежащая в костной глазнице и окружённая жировой клетчаткой. Три оболочки: наружная фиброзная (склера + прозрачная роговица), сосудистая (хориоидея, цилиарное тело, радужка) и сетчатка. Светопроводящие среды: роговица, водянистая влага (между роговицей и хрусталиком), хрусталик и стекловидное тело. Хрусталик подвешен на цинновых связках к цилиарному телу; роговица бессосудистая — кислород она получает прямо из воздуха.",
      function:
        "Основную преломляющую силу даёт роговица (около 40 дптр); хрусталик добавляет около 20 дптр и меняет кривизну при рассматривании близких предметов (аккомодация). Радужка регулирует поступление света: зрачок сужается на ярком свету. В сетчатке около 120 млн палочек (сумеречное зрение) и 6 млн колбочек (цвет, острота) преобразуют свет в сигналы; центральная ямка — центр жёлтого пятна — даёт максимальную остроту зрения. Аксоны собираются в диске зрительного нерва и идут к зрительной коре; сетчатка — вырост ЦНС.",
      clinical: [
        "Аномалии рефракции (миопия, гиперметропия, астигматизм): изображение фокусируется вне сетчатки; коррекция линзами или лазером.",
        "Катаракта: помутнение хрусталика — ведущая обратимая причина слепоты в мире.",
        "Глаукома: оптическая нейропатия, обычно из-за повышения внутриглазного давления; скрининг защищает зрение.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Riordan-Eva P., Augsburger J.J. Vaughan & Asbury's General Ophthalmology. 19th ed. McGraw-Hill, 2018.",
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
      ],
    },
  },
  intestine: {
    en: {
      objectives: [
        "Describe the anatomy of the small and large intestine",
        "Explain digestion, absorption and the gut's immune surface",
        "Discuss the microbiome and common intestinal disorders",
      ],
      structure:
        "The intestine is a muscular tube ~6–8.5 m long. The small intestine (~6 m, three segments: duodenum, jejunum, ileum) fills the central abdomen; its wall is amplified by circular folds, ~5 million villi and microvilli to about 250–300 m². The large intestine (~1.5 m: caecum with appendix, colon, rectum) frames the abdominal cavity. The enteric nervous system — up to 500 million neurons in the wall — earns it the nickname 'second brain'; the gut also holds the body's largest immune surface and ~100 trillion microbes.",
      function:
        "Chyme from the stomach is neutralised and mixed with bile and pancreatic enzymes in the duodenum. The jejunum absorbs most carbohydrates, proteins and fats; the ileum reclaims bile salts and vitamin B₁₂; the colon reabsorbs water and electrolytes, and ferments undigested fibre via the microbiota into short-chain fatty acids. Segmentation mixes, peristalsis propels; the vagus nerve and the enteric plexus coordinate motility and secretion. Villi renew every 3–5 days — the fastest turnover of any tissue.",
      clinical: [
        "Celiac disease: gluten-triggered villous atrophy with malabsorption; a gluten-free diet restores the mucosa.",
        "Inflammatory bowel disease (Crohn's, ulcerative colitis): chronic transmural or mucosal inflammation with flares and remissions.",
        "Intestinal obstruction: mechanical blockage (adhesions, tumours, hernias) is a surgical emergency.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать анатомию тонкой и толстой кишки",
        "Объяснить переваривание, всасывание и иммунную поверхность кишечника",
        "Обсудить микробиом и распространённые заболевания кишечника",
      ],
      structure:
        "Кишечник — мышечная трубка длиной около 6–8,5 м. Тонкая кишка (около 6 м; три отдела: двенадцатиперстная, тощая, подвздошная) занимает центр брюшной полости; её стенка увеличена циркулярными складками, примерно 5 млн ворсинок и микроворсинками до 250–300 м². Толстая кишка (около 1,5 м: слепая с червеобразным отростком, ободочная, прямая) окаймляет брюшную полость. Энтеральная нервная система — до 500 млн нейронов в стенке — заслужила кишке прозвище «второй мозг»; здесь же крупнейшая иммунная поверхность тела и около 100 триллионов микробов.",
      function:
        "В двенадцатиперстной кишке химус нейтрализуется и смешивается с желчью и ферментами поджелудочной железы. Тощая кишка всасывает большинство углеводов, белков и жиров; подвздошная возвращает жёлчные кислоты и витамин B₁₂; ободочная реабсорбирует воду и электролиты и ферментирует непереваренную клетчатку микробиотой в короткоцепочечные жирные кислоты. Сегментация перемешивает содержимое, перистальтика продвигает его; моторику и секрецию координируют блуждающий нерв и энтеральное сплетение. Ворсинки обновляются каждые 3–5 суток — это самая быстрая регенерация ткани в организме.",
      clinical: [
        "Целиакия: глютен-зависимая атрофия ворсинок с нарушением всасывания; безглютеновая диета восстанавливает слизистую.",
        "Воспалительные заболевания кишечника (болезнь Крона, язвенный колит): хроническое воспаление с обострениями и ремиссиями.",
        "Кишечная непроходимость: механическая закупорка (спайки, опухоли, грыжи) — хирургическая неотложная ситуация.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  pancreas: {
    en: {
      objectives: [
        "Describe the exocrine and endocrine organisation of the pancreas",
        "Trace the pancreatic ducts into the duodenum",
        "Explain how insulin and glucagon regulate blood glucose",
      ],
      structure:
        "The pancreas (70–100 g, ~15 cm) lies retroperitoneally behind the stomach, with a head cradled by the duodenum, a body crossing the spine and a tail reaching the spleen. ~98% of its tissue is exocrine: acinar cells that secrete digestive enzymes, drained by the pancreatic duct into the hepatopancreatic ampulla (of Vater) at the major duodenal papilla. Scattered among the acini are ~1 million islets of Langerhans — the endocrine part: α-cells (glucagon), β-cells (insulin), δ-cells (somatostatin), PP-cells.",
      function:
        "Exocrine: acinar cells release amylase, lipase and trypsinogen; ductal cells secrete alkaline bicarbonate that neutralises gastric acid, creating the optimal pH for enzymes. Endocrine: β-cells release insulin after meals, driving glucose into muscle and fat and suppressing hepatic glucose output; α-cells release glucagon during fasting, mobilising glucose from the liver. Together they keep blood glucose near 3.9–5.6 mmol/L fasting. Autodigestion is prevented by producing proteases as inactive zymogens.",
      clinical: [
        "Type 1 diabetes: autoimmune destruction of β-cells — absolute insulin deficiency.",
        "Type 2 diabetes: insulin resistance with relative insulin deficiency — the most common form.",
        "Acute pancreatitis: premature enzyme activation digests the gland itself; gallstones and alcohol are the main triggers.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать экзокринную и эндокринную организацию поджелудочной железы",
        "Проследить путь панкреатических протоков в двенадцатиперстную кишку",
        "Объяснить, как инсулин и глюкагон регулируют уровень глюкозы",
      ],
      structure:
        "Поджелудочная железа (70–100 г, около 15 см) лежит забрюшинно позади желудка: головка охвачена двенадцатиперстной кишкой, тело пересекает позвоночник, хвост достигает селезёнки. Около 98% ткани — экзокринная часть: ацинарные клетки, секретирующие пищеварительные ферменты; сок отводится панкреатическим протоком в печёночно-поджелудочную ампулу (Фатера) на большом дуоденальном сосочке. Среди ацинусов разбросано около миллиона островков Лангерганса — эндокринная часть: α-клетки (глюкагон), β-клетки (инсулин), δ-клетки (соматостатин), PP-клетки.",
      function:
        "Экзокринная функция: ацинарные клетки выделяют амилазу, липазу и трипсиноген; клетки протоков секретируют щелочной бикарбонат, нейтрализующий желудочную кислоту и создающий оптимальный pH для ферментов. Эндокринная функция: β-клетки после еды выбрасывают инсулин, направляя глюкозу в мышцы и жировую ткань и подавляя выброс глюкозы печенью; α-клетки в период голодания выделяют глюкагон, мобилизующий глюкозу из печени. Вместе они удерживают глюкозу натощак около 3,9–5,6 ммоль/л. От самопереваривания железу защищает то, что протеазы синтезируются в виде неактивных зимогенов.",
      clinical: [
        "Сахарный диабет 1-го типа: аутоиммунное разрушение β-клеток — абсолютная недостаточность инсулина.",
        "Сахарный диабет 2-го типа: инсулинорезистентность с относительным дефицитом инсулина — самая частая форма.",
        "Острый панкреатит: преждевременная активация ферментов «переваривает» саму железу; главные триггеры — жёлчные камни и алкоголь.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
      ],
    },
  },
  skin: {
    en: {
      objectives: [
        "Describe the three layers of the skin and their appendages",
        "Explain the skin's barrier, sensory and thermoregulatory roles",
        "Recognise the skin's renewal cycle and common disorders",
      ],
      structure:
        "The skin is the largest organ (~2 m², 3.5–5 kg). The epidermis — a stratified squamous epithelium of keratinocytes — renews from the stratum basale upward through spinous and granular layers to the dead stratum corneum. Below lies the dermis with collagen and elastin, blood vessels, nerve endings, hair follicles, sebaceous and sweat glands. The hypodermis (subcutaneous fat) insulates and cushions. A single square centimetre can hold hundreds of sweat glands and metres of vessels.",
      function:
        "The stratum corneum is a waterproof barrier of ~15–20 layers of dead, keratin-filled corneocytes; melanocytes shield DNA from UV; Langerhans cells are immune sentinels. Eccrine sweat glands cool the body — up to several litres per hour in heat; sebum lubricates and protects the skin. Nerve endings (Meissner, Pacinian, free endings) deliver touch, pressure, vibration, pain and temperature. The skin also synthesises vitamin D under UV, regulates water loss and stores fat in the hypodermis. The epidermis fully replaces itself about every 28 days.",
      clinical: [
        "Melanoma: malignant melanocyte tumour with early metastasis; the ABCDE rule guides self-examination.",
        "Psoriasis and eczema: chronic inflammatory conditions driven by immune dysregulation of the skin.",
        "Burns: severity is judged by depth and area (the 'rule of nines'); the skin's loss of barrier function is life-threatening.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать три слоя кожи и её придатки",
        "Объяснить барьерную, сенсорную и терморегуляторную роль кожи",
        "Рассмотреть цикл обновления кожи и распространённые заболевания",
      ],
      structure:
        "Кожа — самый большой орган (около 2 м², 3,5–5 кг). Эпидермис — многослойный плоский ороговевающий эпителий из кератиноцитов — обновляется от базального слоя вверх через шиповатый и зернистый слои к мёртвому роговому. Ниже лежит дерма с коллагеном и эластином, кровеносными сосудами, нервными окончаниями, волосяными фолликулами, сальными и потовыми железами. Гиподерма (подкожная жировая клетчатка) изолирует и смягчает. В одном квадратном сантиметре могут разместиться сотни потовых желёз и метры сосудов.",
      function:
        "Роговой слой — водонепроницаемый барьер из 15–20 слоёв мёртвых корнеоцитов, заполненных кератином; меланоциты защищают ДНК от УФ; клетки Лангерганса — иммунные «сторожа». Эккриновые потовые железы охлаждают тело — в жару до нескольких литров в час; кожное сало смазывает и защищает. Нервные окончания (тельца Мейснера, Пачини, свободные) передают прикосновение, давление, вибрацию, боль и температуру. Кожа также синтезирует витамин D под действием УФ, регулирует потерю воды и запасает жир в гиподерме. Эпидермис полностью обновляется примерно за 28 суток.",
      clinical: [
        "Меланома: злокачественная опухоль меланоцитов с ранним метастазированием; правило ABCDE помогает самоосмотру.",
        "Псориаз и экзема: хронические воспалительные заболевания, вызванные иммунной дисрегуляцией кожи.",
        "Ожоги: тяжесть оценивают по глубине и площади (правило «девяток»); потеря барьерной функции кожи опасна для жизни.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
      ],
    },
  },
};

/** All lessons: the original nine plus the extended organ set. */
export const lessons: Record<OrganId, BilingualLesson> = {
  ...lessonsCore,
  ...lessonsExtra,
} as Record<OrganId, BilingualLesson>;
