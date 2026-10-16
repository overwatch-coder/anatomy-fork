import type { OrganId } from "../anatomy-data";

/**
 * Clinical imaging notes for every organ: which modality is used and what it
 * shows. `image` (when present) points to a schematic educational illustration
 * in `/public/imaging/` — these are stylised teaching images, NOT real clinical
 * scans, and the UI always labels them as such (see `imagingDisclaimer` in the
 * i18n dictionary).
 */
export type BilingualImaging = {
  image?: string;
  en: { modality: string; note: string };
  ru: { modality: string; note: string };
};

export const imaging: Record<OrganId, BilingualImaging> = {
  heart: {
    image: "/imaging/heart.webp",
    en: {
      modality: "Chest X-ray · echocardiography · ECG",
      note:
        "On a chest X-ray the cardiothoracic ratio estimates heart size. Echocardiography shows the chambers, valves and wall motion in real time, and the ECG records the electrical rhythm of the conduction system.",
    },
    ru: {
      modality: "Рентген грудной клетки · эхокардиография · ЭКГ",
      note:
        "На рентгенограмме грудной клетки кардиоторакальный индекс оценивает размеры сердца. Эхокардиография показывает камеры, клапаны и движение стенок в реальном времени, а ЭКГ регистрирует электрический ритм проводящей системы.",
    },
  },
  brain: {
    image: "/imaging/brain.webp",
    en: {
      modality: "CT · MRI · EEG",
      note:
        "CT rapidly excludes haemorrhage and skull fractures in stroke. MRI resolves grey and white matter, tumours and demyelination, while EEG records the electrical activity of the cortex.",
    },
    ru: {
      modality: "КТ · МРТ · ЭЭГ",
      note:
        "КТ быстро исключает кровоизлияние и переломы черепа при инсульте. МРТ различает серое и белое вещество, опухоли и демиелинизацию, а ЭЭГ регистрирует электрическую активность коры.",
    },
  },
  lungs: {
    image: "/imaging/lungs.webp",
    en: {
      modality: "Chest X-ray · high-resolution CT",
      note:
        "A chest X-ray shows the lung fields, fissures and heart silhouette. High-resolution CT reveals the parenchyma, bronchi and pleura in detail — including early emphysema or fibrosis.",
    },
    ru: {
      modality: "Рентген грудной клетки · КТ высокого разрешения",
      note:
        "Рентгенограмма показывает лёгочные поля, междолевые щели и силуэт сердца. КТ высокого разрешения детально визуализирует паренхиму, бронхи и плевру — включая ранние эмфизему и фиброз.",
    },
  },
  liver: {
    image: "/imaging/liver.webp",
    en: {
      modality: "Ultrasound · CT · MRI",
      note:
        "Ultrasound is the first-line tool: it detects steatosis, cysts and masses. CT and MRI stage tumours and map the hepatic vasculature for surgery.",
    },
    ru: {
      modality: "УЗИ · КТ · МРТ",
      note:
        "УЗИ — метод первой линии: оно выявляет стеатоз, кисты и объёмные образования. КТ и МРТ стадируют опухоли и картируют сосудистую систему печени для хирургии.",
    },
  },
  kidneys: {
    image: "/imaging/kidneys.webp",
    en: {
      modality: "Ultrasound · CT urography",
      note:
        "Ultrasound measures kidney size and detects stones and hydronephrosis. CT urography maps the collecting system and detects tumours and vascular anomalies.",
    },
    ru: {
      modality: "УЗИ · КТ-урография",
      note:
        "УЗИ измеряет размеры почек, выявляет камни и гидронефроз. КТ-урография визуализирует собирательную систему, опухоли и сосудистые аномалии.",
    },
  },
  eyeball: {
    image: "/imaging/eyeball.webp",
    en: {
      modality: "Fundoscopy · OCT · slit lamp",
      note:
        "Fundoscopy views the retina, optic disc and vessels — the only place blood vessels are visible directly. OCT scans retinal layers; the slit lamp examines the anterior segment.",
    },
    ru: {
      modality: "Офтальмоскопия · ОКТ · щелевая лампа",
      note:
        "Офтальмоскопия показывает сетчатку, диск зрительного нерва и сосуды — единственное место, где сосуды видны напрямую. ОКТ сканирует слои сетчатки, щелевая лампа — передний сегмент глаза.",
    },
  },
  intestine: {
    image: "/imaging/intestine.webp",
    en: {
      modality: "Abdominal X-ray · CT · endoscopy",
      note:
        "A plain abdominal film shows gas patterns and obstruction. CT visualises the bowel wall and inflammation, and colonoscopy inspects the mucosa directly with biopsy.",
    },
    ru: {
      modality: "Обзорная рентгенография живота · КТ · эндоскопия",
      note:
        "Обзорный снимок показывает распределение газа и непроходимость. КТ визуализирует стенку кишки и воспаление, а колоноскопия осматривает слизистую и берёт биопсию.",
    },
  },
  pancreas: {
    image: "/imaging/pancreas.webp",
    en: {
      modality: "Contrast CT · MRI/MRCP · ultrasound",
      note:
        "Contrast-enhanced CT is the workhorse for acute pancreatitis and pancreatic cancer. MRCP images the ducts non-invasively; ultrasound helps with masses and guided biopsy.",
    },
    ru: {
      modality: "КТ с контрастом · МРТ/МРХПГ · УЗИ",
      note:
        "КТ с контрастированием — основной метод при остром панкреатите и раке поджелудочной железы. МРХПГ неинвазивно визуализирует протоки; УЗИ помогает при объёмных образованиях и биопсии под контролем.",
    },
  },
  skin: {
    image: "/imaging/skin.webp",
    en: {
      modality: "Dermoscopy · biopsy",
      note:
        "Dermoscopy magnifies pigmented lesions and guides the ABCDE rule. Biopsy with histology remains the gold standard for diagnosing skin disease.",
    },
    ru: {
      modality: "Дерматоскопия · биопсия",
      note:
        "Дерматоскопия увеличивает пигментные образования и помогает правилу ABCDE. Биопсия с гистологией остаётся золотым стандартом диагностики заболеваний кожи.",
    },
  },
  stomach: {
    image: "/imaging/stomach.webp",
    en: {
      modality: "Gastroscopy · barium meal · CT",
      note:
        "Gastroscopy visualises the mucosa directly and allows biopsy of ulcers and tumours. A barium meal outlines the gastric contours; CT stages gastric cancer.",
    },
    ru: {
      modality: "Гастроскопия · рентген с барием · КТ",
      note:
        "Гастроскопия напрямую осматривает слизистую и позволяет биопсировать язвы и опухоли. Рентген с барием очерчивает контуры желудка; КТ стадирует рак желудка.",
    },
  },
  gallbladder: {
    en: {
      modality: "Ultrasound · HIDA scan",
      note:
        "Ultrasound detects gallstones with over 95% sensitivity and shows wall thickening in cholecystitis. A HIDA scan assesses gallbladder emptying.",
    },
    ru: {
      modality: "УЗИ · сцинтиграфия (HIDA)",
      note:
        "УЗИ выявляет жёлчные камни с чувствительностью более 95% и показывает утолщение стенки при холецистите. Сцинтиграфия HIDA оценивает опорожнение пузыря.",
    },
  },
  esophagus: {
    en: {
      modality: "Endoscopy · barium swallow · manometry",
      note:
        "Endoscopy inspects the mucosa and biopsies Barrett's changes. A barium swallow shows strictures and motility; manometry measures peristalsis and sphincter pressure.",
    },
    ru: {
      modality: "Эндоскопия · рентген с барием · манометрия",
      note:
        "Эндоскопия осматривает слизистую и биопсирует изменения Барретта. Рентген с барием показывает стриктуры и моторику; манометрия измеряет перистальтику и давление сфинктеров.",
    },
  },
  tongue: {
    en: {
      modality: "Clinical examination · MRI",
      note:
        "Most tongue pathology is seen directly on inspection and palpation. MRI defines the extent of tumours for staging and surgical planning.",
    },
    ru: {
      modality: "Клинический осмотр · МРТ",
      note:
        "Большинство заболеваний языка видно при осмотре и пальпации. МРТ определяет распространение опухолей для стадирования и планирования операции.",
    },
  },
  spleen: {
    en: {
      modality: "Ultrasound · CT",
      note:
        "Ultrasound measures spleen size (splenomegaly) and is used after blunt trauma. CT detects rupture, infarction and focal masses.",
    },
    ru: {
      modality: "УЗИ · КТ",
      note:
        "УЗИ измеряет размеры селезёнки (спленомегалию) и применяется после тупой травмы. КТ выявляет разрывы, инфаркты и очаговые образования.",
    },
  },
  thymus: {
    en: {
      modality: "CT · MRI",
      note:
        "The thymus is visible on chest CT in children. CT and MRI evaluate anterior mediastinal masses such as thymoma.",
    },
    ru: {
      modality: "КТ · МРТ",
      note:
        "Тимус виден на КТ грудной клетки у детей. КТ и МРТ оценивают образования переднего средостения, например тимому.",
    },
  },
  "lymph-node": {
    en: {
      modality: "Ultrasound · CT · PET-CT · biopsy",
      note:
        "Ultrasound assesses node shape and hilar structure. PET-CT reveals metabolic activity, and biopsy provides the definitive diagnosis.",
    },
    ru: {
      modality: "УЗИ · КТ · ПЭТ-КТ · биопсия",
      note:
        "УЗИ оценивает форму узла и структуру ворот. ПЭТ-КТ показывает метаболическую активность, а биопсия даёт окончательный диагноз.",
    },
  },
  thyroid: {
    en: {
      modality: "Ultrasound · scintigraphy · FNA",
      note:
        "Ultrasound characterises nodules by echogenicity and margins. Scintigraphy distinguishes hot from cold nodules; fine-needle aspiration yields cytology.",
    },
    ru: {
      modality: "УЗИ · сцинтиграфия · тонкоигольная биопсия",
      note:
        "УЗИ характеризует узлы по эхогенности и контурам. Сцинтиграфия различает «горячие» и «холодные» узлы; тонкоигольная аспирация даёт цитологию.",
    },
  },
  adrenal: {
    en: {
      modality: "CT · MRI · hormone assays",
      note:
        "CT is the first test for adrenal masses. Hormone assays (cortisol, aldosterone, metanephrines) identify functional tumours.",
    },
    ru: {
      modality: "КТ · МРТ · анализ гормонов",
      note:
        "КТ — первый метод при образованиях надпочечников. Анализы гормонов (кортизол, альдостерон, метанефрины) выявляют гормонально активные опухоли.",
    },
  },
  pituitary: {
    en: {
      modality: "MRI · visual field testing",
      note:
        "MRI of the sella turcica visualises micro- and macroadenomas. Visual field testing detects compression of the optic chiasm.",
    },
    ru: {
      modality: "МРТ · исследование полей зрения",
      note:
        "МРТ турецкого седла визуализирует микро- и макроаденомы. Исследование полей зрения выявляет сдавление перекрёста зрительных нервов.",
    },
  },
  trachea: {
    en: {
      modality: "Chest X-ray · CT · bronchoscopy",
      note:
        "CT shows the tracheal lumen, strictures and adjacent masses. Bronchoscopy directly inspects the airway and allows intervention.",
    },
    ru: {
      modality: "Рентген грудной клетки · КТ · бронхоскопия",
      note:
        "КТ показывает просвет трахеи, стриктуры и окружающие образования. Бронхоскопия напрямую осматривает дыхательные пути и позволяет вмешательство.",
    },
  },
  larynx: {
    en: {
      modality: "Laryngoscopy · CT",
      note:
        "Laryngoscopy directly visualises the vocal folds and their mobility. CT stages laryngeal cancer and evaluates cartilage invasion.",
    },
    ru: {
      modality: "Ларингоскопия · КТ",
      note:
        "Ларингоскопия напрямую показывает голосовые складки и их подвижность. КТ стадирует рак гортани и оценивает инвазию хрящей.",
    },
  },
  bladder: {
    image: "/imaging/bladder.svg",
    en: {
      modality: "Ultrasound · cystoscopy · CT",
      note:
        "Ultrasound measures the bladder wall and residual urine. Cystoscopy inspects the mucosa; CT stages bladder cancer.",
    },
    ru: {
      modality: "УЗИ · цистоскопия · КТ",
      note:
        "УЗИ измеряет стенку пузыря и остаточную мочу. Цистоскопия осматривает слизистую; КТ стадирует рак мочевого пузыря.",
    },
  },
  uterus: {
    en: {
      modality: "Transvaginal ultrasound · MRI · hysteroscopy",
      note:
        "Transvaginal ultrasound is the first-line test for the uterus. MRI maps fibroids and cancer; hysteroscopy inspects the cavity.",
    },
    ru: {
      modality: "Трансвагинальное УЗИ · МРТ · гистероскопия",
      note:
        "Трансвагинальное УЗИ — метод первой линии. МРТ картирует миомы и рак; гистероскопия осматривает полость матки.",
    },
  },
  ovary: {
    en: {
      modality: "Ultrasound · CA-125 · MRI",
      note:
        "Ultrasound characterises ovarian cysts and masses. CA-125 helps monitor response, and CT/MRI stage ovarian cancer.",
    },
    ru: {
      modality: "УЗИ · СА-125 · МРТ",
      note:
        "УЗИ характеризует кисты и образования яичников. СА-125 помогает следить за ответом на лечение; КТ/МРТ стадируют рак яичников.",
    },
  },
  testis: {
    en: {
      modality: "Scrotal ultrasound · tumour markers",
      note:
        "Ultrasound distinguishes testicular masses from hydrocele and varicocele. AFP and hCG serve as tumour markers.",
    },
    ru: {
      modality: "УЗИ мошонки · онкомаркеры",
      note:
        "УЗИ отличает образования яичка от водянки и варикоцеле. АФП и ХГЧ служат онкомаркерами.",
    },
  },
  prostate: {
    en: {
      modality: "PSA · MRI · transrectal biopsy",
      note:
        "PSA and digital rectal examination screen for cancer. Multiparametric MRI localises suspicious lesions; transrectal biopsy confirms the diagnosis.",
    },
    ru: {
      modality: "ПСА · МРТ · трансректальная биопсия",
      note:
        "ПСА и пальцевое ректальное исследование — скрининг рака. Мультипараметрическая МРТ локализует подозрительные очаги; трансректальная биопсия подтверждает диагноз.",
    },
  },
  "spinal-cord": {
    en: {
      modality: "MRI · CT",
      note:
        "MRI is the gold standard for the cord: it shows compression, demyelination and tumours. CT reveals bony stenosis and fractures.",
    },
    ru: {
      modality: "МРТ · КТ",
      note:
        "МРТ — золотой стандарт: показывает сдавление, демиелинизацию и опухоли. КТ выявляет костный стеноз и переломы.",
    },
  },
  diaphragm: {
    en: {
      modality: "Chest X-ray · fluoroscopy · ultrasound",
      note:
        "A chest X-ray shows diaphragm height and eventration. Fluoroscopy (the 'sniff test') assesses movement; ultrasound is used at the bedside.",
    },
    ru: {
      modality: "Рентген грудной клетки · рентгеноскопия · УЗИ",
      note:
        "Рентгенограмма показывает высоту купола и релаксацию диафрагмы. Рентгеноскопия («проба с вдохом») оценивает подвижность; УЗИ применяется у постели больного.",
    },
  },
  biceps: {
    en: {
      modality: "Ultrasound · MRI",
      note:
        "Ultrasound assesses the tendon dynamically during movement. MRI reveals tears, tendinopathy and muscle atrophy.",
    },
    ru: {
      modality: "УЗИ · МРТ",
      note:
        "УЗИ динамически оценивает сухожилие при движении. МРТ выявляет разрывы, тендинопатию и атрофию мышцы.",
    },
  },
  femur: {
    image: "/imaging/femur.svg",
    en: {
      modality: "X-ray · CT · MRI",
      note:
        "Plain X-rays diagnose fractures and arthritis. MRI detects avascular necrosis and occult fractures; CT guides surgical planning.",
    },
    ru: {
      modality: "Рентген · КТ · МРТ",
      note:
        "Обзорные снимки диагностируют переломы и артроз. МРТ выявляет аваскулярный некроз и скрытые переломы; КТ используется для планирования операции.",
    },
  },
  pelvis: {
    en: {
      modality: "X-ray · CT Pelvis · MRI",
      note: "AP pelvic radiograph evaluates ring integrity and hip joints. High-resolution pelvic CT assesses complex fractures and surgical reduction.",
    },
    ru: {
      modality: "Рентгенография · КТ таза · МРТ",
      note: "Обзорная рентгенограмма таза оценивает целостность костного кольца. КТ выявляет скрытые переломы крестца и смещение вертлужной впадины.",
    },
  },
  knee: {
    en: {
      modality: "MRI Knee · Weight-bearing X-ray",
      note: "Standing radiographs evaluate joint space narrowing and osteoarthritis. MRI is the gold standard for meniscal tears and cruciate ligament tears.",
    },
    ru: {
      modality: "МРТ коленного сустава · Рентгенография с нагрузкой",
      note: "Рентген под нагрузкой выявляет сужение суставной щели при гонартрозе. МРТ — золотой стандарт визуализации разрывов менисков и связок.",
    },
  },
  sternum: {
    en: {
      modality: "Lateral X-ray · Thoracic CT",
      note: "Lateral sternal radiographs reliably reveal traumatic fractures. Thin-slice chest CT assesses sternotomy non-union, osteomyelitis, and retrosternal hematoma.",
    },
    ru: {
      modality: "Боковая рентгенография · КТ грудной клетки",
      note: "Боковые снимки грудины надёжно выявляют переломы. КТ высокого разрешения визуализирует расхождение краев после стернотомии и остеомиелит.",
    },
  },
  manubrium: {
    en: {
      modality: "CT Thoracic Inlet · MRI Sternoclavicular",
      note: "CT with contrast accurately identifies posterior sternoclavicular dislocations threatening retrosternal mediastinal vascular structures.",
    },
    ru: {
      modality: "КТ верхней апертуры · МРТ грудино-ключичного сустава",
      note: "КТ с контрастированием исключает компрессию дуги аорты и вен при задних вывихах грудино-ключичного сустава.",
    },
  },
  "main-bronchus": {
    en: {
      modality: "Chest CT · Flexible Bronchoscopy",
      note: "Contrast-enhanced chest CT displays bronchial lumen patency and wall thickening. Bronchoscopy allows direct mucosal visualization and biopsy.",
    },
    ru: {
      modality: "КТ органов грудной клетки · Бронхоскопия",
      note: "КТ грудной клетки демонстрирует проходимость бронхов и инфильтрацию стенок. Бронхоскопия позволяет осмотреть слизистую и взять биопсию.",
    },
  },
  "palatine-tonsil": {
    en: {
      modality: "Neck CT with Contrast · Clinical Inspection",
      note: "Direct inspection with headlight evaluates tonsillar exudates and asymmetry. Contrast neck CT detects deep peritonsillar and parapharyngeal abscesses.",
    },
    ru: {
      modality: "КТ шеи с контрастом · Фарингоскопия",
      note: "Осмотр ротоглотки оценивает налёты и гипертрофию. КТ шеи с контрастированием незаменима для диагностики паратонзиллярных абсцессов.",
    },
  },
  "fallopian-tube": {
    en: {
      modality: "Hysterosalpingography (HSG) · Pelvic Ultrasound",
      note: "Fluoroscopic HSG evaluates tubal patency and contour. Transvaginal Doppler ultrasound identifies ectopic gestational sacs and hydrosalpinx.",
    },
    ru: {
      modality: "Гистеросальпингография (ГСГ) · Трансвагинальное УЗИ",
      note: "Рентгеновская ГСГ оценивает проходимость маточных труб при бесплодии. Трансвагинальное УЗИ выявляет гидросальпинкс и внематочную беременность.",
    },
  },
  ureter: {
    en: {
      modality: "Non-contrast CT KUB · Ultrasound",
      note: "Unenhanced low-dose CT of kidneys, ureters, and bladder (CT KUB) is the definitive modality for detecting calcified ureteral calculi.",
    },
    ru: {
      modality: "Бесконтрастная КТ почек и мочеточников · УЗИ",
      note: "Низкодозная КТ мочевыделительной системы — эталон выявления конкрементов в мочеточнике при почечной колике.",
    },
  },
  urethra: {
    en: {
      modality: "Retrograde Urethrography (RUG) · Voiding Cystourethrography (VCUG)",
      note: "Dynamic retrograde urethrography demonstrates the exact length and location of urethral strictures, tears, and diverticula.",
    },
    ru: {
      modality: "Ретроградная уретрография · Микционная цистоуретрография",
      note: "Ретроградная уретрография даёт чёткое изображение стриктур, разрывов при травмах таза и дивертикулов канала.",
    },
  },
  "renal-pelvis": {
    en: {
      modality: "Renal Ultrasound · CT Urography",
      note: "Ultrasound quickly visualizes pelvicalyceal dilatation in hydronephrosis. CT urography provides complete three-dimensional maps of collecting system anatomy.",
    },
    ru: {
      modality: "УЗИ почек · КТ-урография с контрастом",
      note: "УЗИ быстро определяет расширение лоханки при обструкции. КТ-урография детально картирует анатомию чашечно-лоханочной системы.",
    },
  },
  "large-intestine": {
    en: {
      modality: "Colonoscopy · Abdominal CT · Barium Enema",
      note: "Optical colonoscopy provides direct endoscopic mucosa inspection and polypectomy. Abdominopelvic CT identifies diverticulitis and bowel wall thickening.",
    },
    ru: {
      modality: "Колоноскопия · КТ брюшной полости · Ирригоскопия",
      note: "Колоноскопия — золотой стандарт выявления полипов и опухолей. КТ брюшной полости подтверждает дивертикулит и кишечную непроходимость.",
    },
  },
  omentum: {
    en: {
      modality: "Contrast-enhanced Abdominopelvic CT",
      note: "Multidetector CT accurately detects omental infarction, focal fat stranding, omental torsion, and diffuse peritoneal carcinomatosis ('omental caking').",
    },
    ru: {
      modality: "КТ брюшной полости с внутривенным контрастированием",
      note: "КТ с контрастом визуализирует инфаркт и заворот сальника, тяжистость клетчатки и метастатический «сальниковый пирог».",
    },
  },
};
