import type { OrganId } from "../anatomy-data";

/**
 * Professional quiz bank: 5 questions per organ, bilingual (en/ru), each with
 * one correct answer, distractors, and a short educational explanation.
 * Parity between languages is guaranteed by construction (one bilingual object
 * per question).
 */
export type QuizQuestion = {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type BilingualQuestion = { en: QuizQuestion; ru: QuizQuestion };

export const quizBank: Record<OrganId, BilingualQuestion[]> = {
  heart: [
    {
      en: {
        prompt: "Which chamber pumps oxygenated blood into the systemic circulation?",
        options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"],
        correct: 1,
        explanation:
          "The left ventricle has the thickest myocardium: its contraction generates the pressure that drives blood through the aorta and into the systemic circulation.",
      },
      ru: {
        prompt: "Какой отдел сердца нагнетает артериальную кровь в большой круг кровообращения?",
        options: ["Правое предсердие", "Левый желудочек", "Правый желудочек", "Левое предсердие"],
        correct: 1,
        explanation:
          "Левый желудочек имеет самый толстый миокард: его сокращение создаёт давление, которое проталкивает кровь через аорту в большой круг кровообращения.",
      },
    },
    {
      en: {
        prompt: "Which valve prevents backflow from the left ventricle into the left atrium?",
        options: ["Aortic valve", "Mitral valve", "Tricuspid valve", "Pulmonary valve"],
        correct: 1,
        explanation:
          "The mitral (bicuspid) valve closes during ventricular systole, so the ventricle ejects blood forward through the aortic valve instead of backwards into the atrium.",
      },
      ru: {
        prompt: "Какой клапан препятствует обратному току крови из левого желудочка в левое предсердие?",
        options: ["Аортальный клапан", "Митральный клапан", "Трёхстворчатый клапан", "Клапан лёгочного ствола"],
        correct: 1,
        explanation:
          "Митральный (двустворчатый) клапан закрывается во время систолы желудочков, поэтому кровь выбрасывается вперёд через аортальный клапан, а не возвращается в предсердие.",
      },
    },
    {
      en: {
        prompt: "Through which vessel does the right ventricle pump blood?",
        options: ["Aorta", "Pulmonary trunk", "Superior vena cava", "Coronary sinus"],
        correct: 1,
        explanation:
          "The right ventricle ejects deoxygenated blood into the pulmonary trunk, which divides into the pulmonary arteries — the only arteries carrying venous blood.",
      },
      ru: {
        prompt: "Через какой сосуд правый желудочек выбрасывает кровь?",
        options: ["Аорта", "Лёгочный ствол", "Верхняя полая вена", "Венечный синус"],
        correct: 1,
        explanation:
          "Правый желудочек выбрасывает венозную кровь в лёгочный ствол, который делится на лёгочные артерии — единственные артерии, несущие венозную кровь.",
      },
    },
    {
      en: {
        prompt: "Which structure generates the electrical impulse that drives the heartbeat?",
        options: ["Atrioventricular node", "Purkinje fibres", "Sinoatrial node", "Bundle of His"],
        correct: 2,
        explanation:
          "The sinoatrial (SA) node in the right atrial wall is the heart's natural pacemaker; the impulse then spreads through the atria to the AV node and the His–Purkinje system.",
      },
      ru: {
        prompt: "Какая структура генерирует электрический импульс, запускающий сокращение сердца?",
        options: ["Атриовентрикулярный узел", "Волокна Пуркинье", "Синоатриальный узел", "Пучок Гиса"],
        correct: 2,
        explanation:
          "Синоатриальный (СА) узел в стенке правого предсердия — естественный водитель ритма сердца; импульс распространяется по предсердиям к АВ-узлу и системе Гиса–Пуркинье.",
      },
    },
    {
      en: {
        prompt: "Where do the coronary arteries arise?",
        options: ["Pulmonary trunk", "Ascending aorta", "Left atrium", "Superior vena cava"],
        correct: 1,
        explanation:
          "The left and right coronary arteries arise from the aortic sinuses at the root of the ascending aorta, perfusing the heart muscle between contractions.",
      },
      ru: {
        prompt: "Откуда отходят венечные (коронарные) артерии?",
        options: ["Лёгочный ствол", "Восходящая аорта", "Левое предсердие", "Верхняя полая вена"],
        correct: 1,
        explanation:
          "Левая и правая венечные артерии отходят от синусов аорты у корня восходящей аорты и кровоснабжают сердечную мышцу между сокращениями.",
      },
    },
  ],
  brain: [
    {
      en: {
        prompt: "Which lobe is primarily responsible for voluntary movement planning and execution?",
        options: ["Occipital lobe", "Temporal lobe", "Parietal lobe", "Frontal lobe"],
        correct: 3,
        explanation:
          "The primary motor cortex (precentral gyrus) lies in the frontal lobe; the prefrontal part handles planning, decision-making and personality.",
      },
      ru: {
        prompt: "Какая доля отвечает прежде всего за планирование и выполнение произвольных движений?",
        options: ["Затылочная доля", "Височная доля", "Теменная доля", "Лобная доля"],
        correct: 3,
        explanation:
          "Первичная моторная кора (прецентральная извилина) находится в лобной доле; её префронтальная часть отвечает за планирование, принятие решений и личность.",
      },
    },
    {
      en: {
        prompt: "Which structure coordinates balance and fine motor coordination?",
        options: ["Cerebellum", "Hypothalamus", "Amygdala", "Thalamus"],
        correct: 0,
        explanation:
          "The cerebellum compares planned and actual movement and corrects it in real time; damage causes ataxia, dysmetria and balance problems.",
      },
      ru: {
        prompt: "Какая структура координирует равновесие и тонкую моторику?",
        options: ["Мозжечок", "Гипоталамус", "Миндалевидное тело", "Таламус"],
        correct: 0,
        explanation:
          "Мозжечок сравнивает планируемое и фактическое движение и корректирует его в реальном времени; при его поражении возникают атаксия, дисметрия и нарушения равновесия.",
      },
    },
    {
      en: {
        prompt: "Which vessels supply the majority of the brain's blood?",
        options: ["Internal carotid and vertebral arteries", "External carotid and subclavian arteries", "Pulmonary and bronchial arteries", "Facial and maxillary arteries"],
        correct: 0,
        explanation:
          "The internal carotid and vertebral arteries form the cerebral arterial circle (of Willis), distributing blood to both hemispheres.",
      },
      ru: {
        prompt: "Какие сосуды кровоснабжают большую часть головного мозга?",
        options: ["Внутренние сонные и позвоночные артерии", "Наружная сонная и подключичная артерии", "Лёгочные и бронхиальные артерии", "Лицевая и верхнечелюстная артерии"],
        correct: 0,
        explanation:
          "Внутренние сонные и позвоночные артерии образуют артериальный круг большого мозга (Виллизиев круг), распределяющий кровь по обоим полушариям.",
      },
    },
    {
      en: {
        prompt: "Which cells form the walls of the capillaries that create the blood–brain barrier?",
        options: ["Astrocytes", "Endothelial cells", "Microglia", "Ependymal cells"],
        correct: 1,
        explanation:
          "Tight junctions between brain capillary endothelial cells, reinforced by astrocyte end-feet, form the blood–brain barrier that protects neural tissue.",
      },
      ru: {
        prompt: "Какие клетки образуют стенку капилляров, создающих гематоэнцефалический барьер?",
        options: ["Астроциты", "Эндотелиальные клетки", "Микроглия", "Эпендимоциты"],
        correct: 1,
        explanation:
          "Плотные контакты между эндотелиальными клетками капилляров мозга, усиленные отростками астроцитов, образуют гематоэнцефалический барьер, защищающий нервную ткань.",
      },
    },
    {
      en: {
        prompt: "Which brain region regulates body temperature, hunger and thirst?",
        options: ["Medulla oblongata", "Hypothalamus", "Hippocampus", "Pons"],
        correct: 1,
        explanation:
          "The hypothalamus is the autonomic control centre: thermoregulation, appetite, thirst, sleep–wake cycles and hormone release via the pituitary gland.",
      },
      ru: {
        prompt: "Какой отдел мозга регулирует температуру тела, голод и жажду?",
        options: ["Продолговатый мозг", "Гипоталамус", "Гиппокамп", "Варолиев мост"],
        correct: 1,
        explanation:
          "Гипоталамус — вегетативный центр управления: терморегуляция, аппетит, жажда, циклы сна и бодрствования, регуляция гормонов через гипофиз.",
      },
    },
  ],
  lungs: [
    {
      en: {
        prompt: "Where does gas exchange between air and blood occur?",
        options: ["Bronchi", "Bronchioles", "Alveoli", "Trachea"],
        correct: 2,
        explanation:
          "Oxygen and carbon dioxide diffuse across the thin alveolar–capillary membrane; ~300 million alveoli provide a surface of about 70–100 m².",
      },
      ru: {
        prompt: "Где происходит газообмен между воздухом и кровью?",
        options: ["Бронхи", "Бронхиолы", "Альвеолы", "Трахея"],
        correct: 2,
        explanation:
          "Кислород и углекислый газ диффундируют через тонкую альвеолярно-капиллярную мембрану; около 300 млн альвеол создают поверхность примерно 70–100 м².",
      },
    },
    {
      en: {
        prompt: "How many lobes does the right lung have?",
        options: ["Two", "Three", "Four", "One"],
        correct: 1,
        explanation:
          "The right lung has three lobes (superior, middle, inferior); the left lung has two, because the heart occupies space on that side.",
      },
      ru: {
        prompt: "Сколько долей в правом лёгком?",
        options: ["Две", "Три", "Четыре", "Одна"],
        correct: 1,
        explanation:
          "В правом лёгком три доли (верхняя, средняя, нижняя); в левом — две, потому что часть грудной полости занимает сердце.",
      },
    },
    {
      en: {
        prompt: "Which muscle is the primary muscle of inspiration?",
        options: ["External intercostals", "Diaphragm", "Sternocleidomastoid", "Rectus abdominis"],
        correct: 1,
        explanation:
          "The diaphragm, a dome-shaped skeletal muscle, provides about 60–75% of inspiratory work; intercostal and accessory muscles assist during deep breathing.",
      },
      ru: {
        prompt: "Какая мышца является главной мышцей вдоха?",
        options: ["Наружные межрёберные мышцы", "Диафрагма", "Грудино-ключично-сосцевидная мышца", "Прямая мышца живота"],
        correct: 1,
        explanation:
          "Диафрагма — куполообразная скелетная мышца, обеспечивающая около 60–75% работы вдоха; межрёберные и вспомогательные мышцы подключаются при глубоком дыхании.",
      },
    },
    {
      en: {
        prompt: "What is the total surface area of the alveolar membrane?",
        options: ["About 0.5 m²", "About 70–100 m² (a tennis court)", "About 1,000 m²", "About 10 m²"],
        correct: 1,
        explanation:
          "The alveolar surface area is roughly 70–100 m² — comparable to a tennis court — packed into the chest, which is why diffusion is so efficient.",
      },
      ru: {
        prompt: "Какова общая площадь альвеолярной мембраны?",
        options: ["Около 0,5 м²", "Около 70–100 м² (как теннисный корт)", "Около 1 000 м²", "Около 10 м²"],
        correct: 1,
        explanation:
          "Площадь альвеолярной поверхности составляет примерно 70–100 м² — как теннисный корт — и упакована в грудную клетку, поэтому диффузия так эффективна.",
      },
    },
    {
      en: {
        prompt: "Which condition features reversible airway narrowing (bronchospasm)?",
        options: ["COPD", "Asthma", "Pulmonary fibrosis", "Emphysema"],
        correct: 1,
        explanation:
          "Asthma is characterised by reversible bronchoconstriction, inflammation and mucus hypersecretion, often triggered by allergens or infection.",
      },
      ru: {
        prompt: "Какое заболевание характеризуется обратимым сужением бронхов (бронхоспазмом)?",
        options: ["ХОБЛ", "Бронхиальная астма", "Фиброз лёгких", "Эмфизема"],
        correct: 1,
        explanation:
          "Астма характеризуется обратимым бронхоспазмом, воспалением и гиперсекрецией слизи, часто провоцируется аллергенами или инфекцией.",
      },
    },
  ],
  liver: [
    {
      en: {
        prompt: "What is the functional unit of the liver?",
        options: ["Nephron", "Hepatic lobule", "Alveolus", "Islet of Langerhans"],
        correct: 1,
        explanation:
          "The hepatic lobule is a hexagonal arrangement of hepatocyte plates around a central vein; blood flows from portal tracts to the central vein.",
      },
      ru: {
        prompt: "Что является функциональной единицей печени?",
        options: ["Нефрон", "Печёночная долька", "Альвеола", "Островок Лангерганса"],
        correct: 1,
        explanation:
          "Печёночная долька — шестиугольное образование из пластинок гепатоцитов вокруг центральной вены; кровь течёт от портальных трактов к центральной вене.",
      },
    },
    {
      en: {
        prompt: "Which vessel carries nutrient-rich blood from the digestive tract to the liver?",
        options: ["Hepatic artery", "Portal vein", "Hepatic vein", "Splenic vein"],
        correct: 1,
        explanation:
          "The hepatic portal vein collects blood from the gut, spleen and pancreas, delivering absorbed nutrients to the liver for processing (first-pass metabolism).",
      },
      ru: {
        prompt: "Какой сосуд несёт богатую питательными веществами кровь от пищеварительного тракта к печени?",
        options: ["Печёночная артерия", "Воротная вена", "Печёночная вена", "Селезёночная вена"],
        correct: 1,
        explanation:
          "Воротная вена собирает кровь от кишечника, селезёнки и поджелудочной железы и доставляет всосавшиеся питательные вещества в печень для переработки (первый проход через печень).",
      },
    },
    {
      en: {
        prompt: "Which substance does the liver produce to aid fat digestion?",
        options: ["Insulin", "Bile", "Pepsin", "Trypsin"],
        correct: 1,
        explanation:
          "Hepatocytes secrete bile (bile salts, bilirubin, cholesterol), which emulsifies dietary fat and enables its digestion by pancreatic lipase.",
      },
      ru: {
        prompt: "Какое вещество вырабатывает печень для переваривания жиров?",
        options: ["Инсулин", "Желчь", "Пепсин", "Трипсин"],
        correct: 1,
        explanation:
          "Гепатоциты секретируют желчь (жёлчные кислоты, билирубин, холестерин), которая эмульгирует пищевые жиры и обеспечивает их переваривание панкреатической липазой.",
      },
    },
    {
      en: {
        prompt: "Which liver cell performs most metabolic and detoxification functions?",
        options: ["Kupffer cell", "Hepatocyte", "Stellate (Ito) cell", "Cholangiocyte"],
        correct: 1,
        explanation:
          "Hepatocytes are the workhorses: synthesis of plasma proteins, gluconeogenesis, bile production, and cytochrome P450 detoxification.",
      },
      ru: {
        prompt: "Какая клетка печени выполняет большинство метаболических и детоксикационных функций?",
        options: ["Клетки Купфера", "Гепатоциты", "Звёздчатые клетки (Ито)", "Холангиоциты"],
        correct: 1,
        explanation:
          "Гепатоциты — главные «работники» печени: синтез белков плазмы, глюконеогенез, продукция желчи и детоксикация через цитохром P450.",
      },
    },
    {
      en: {
        prompt: "Approximately what share of cardiac output passes through the liver?",
        options: ["About 5%", "About 25–30%", "About 60%", "About 2%"],
        correct: 1,
        explanation:
          "Hepatic blood flow is about 1.5 L/min (~25–30% of cardiac output), supplied ~75% by the portal vein and ~25% by the hepatic artery.",
      },
      ru: {
        prompt: "Какая примерно доля сердечного выброса проходит через печень?",
        options: ["Около 5%", "Около 25–30%", "Около 60%", "Около 2%"],
        correct: 1,
        explanation:
          "Печёночный кровоток составляет около 1,5 л/мин (~25–30% сердечного выброса): ~75% даёт воротная вена, ~25% — печёночная артерия.",
      },
    },
  ],
  kidneys: [
    {
      en: {
        prompt: "What is the functional unit of the kidney?",
        options: ["Nephron", "Neuron", "Acinus", "Villus"],
        correct: 0,
        explanation:
          "Each kidney contains about 1 million nephrons — each a glomerulus plus a tubule — that filter blood and modify the filtrate into urine.",
      },
      ru: {
        prompt: "Что является функциональной единицей почки?",
        options: ["Нефрон", "Нейрон", "Ацинус", "Ворсинка"],
        correct: 0,
        explanation:
          "В каждой почке около миллиона нефронов — каждый состоит из клубочка и канальца — которые фильтруют кровь и превращают фильтрат в мочу.",
      },
    },
    {
      en: {
        prompt: "Approximately how much fluid do both kidneys filter per day?",
        options: ["1.5 litres", "18 litres", "180 litres", "1,800 litres"],
        correct: 2,
        explanation:
          "Glomerular filtration rate is ~125 mL/min per kidney pair, i.e. about 180 litres of primary filtrate per day — of which 99% is reabsorbed.",
      },
      ru: {
        prompt: "Сколько жидкости обе почки фильтруют за сутки?",
        options: ["1,5 литра", "18 литров", "180 литров", "1 800 литров"],
        correct: 2,
        explanation:
          "Скорость клубочковой фильтрации — около 125 мл/мин на пару почек, то есть примерно 180 литров первичного фильтрата в сутки, из которых 99% реабсорбируется.",
      },
    },
    {
      en: {
        prompt: "Which hormone produced by the kidneys stimulates red blood cell production?",
        options: ["Aldosterone", "Erythropoietin", "Renin", "Antidiuretic hormone"],
        correct: 1,
        explanation:
          "Peritubular fibroblasts release erythropoietin in response to hypoxia; it drives erythropoiesis in the bone marrow. Chronic renal failure causes anaemia.",
      },
      ru: {
        prompt: "Какой гормон, вырабатываемый почками, стимулирует образование эритроцитов?",
        options: ["Альдостерон", "Эритропоэтин", "Ренин", "Антидиуретический гормон"],
        correct: 1,
        explanation:
          "При гипоксии клетки вокруг канальцев выделяют эритропоэтин, который стимулирует эритропоэз в костном мозге. При хронической почечной недостаточности развивается анемия.",
      },
    },
    {
      en: {
        prompt: "Where does the bulk of water, glucose and amino acid reabsorption occur?",
        options: ["Distal tubule", "Proximal tubule", "Collecting duct", "Loop of Henle"],
        correct: 1,
        explanation:
          "The proximal tubule reabsorbs ~65–70% of filtered sodium and water and virtually all filtered glucose and amino acids via secondary active transport.",
      },
      ru: {
        prompt: "Где происходит основная реабсорбция воды, глюкозы и аминокислот?",
        options: ["Дистальный каналец", "Проксимальный каналец", "Собирательная трубочка", "Петля Генле"],
        correct: 1,
        explanation:
          "Проксимальный каналец реабсорбирует 65–70% натрия и воды и практически всю глюкозу и аминокислоты за счёт вторичного активного транспорта.",
      },
    },
    {
      en: {
        prompt: "Which of these is normally absent from the glomerular filtrate?",
        options: ["Sodium", "Glucose", "Red blood cells and plasma proteins", "Urea"],
        correct: 2,
        explanation:
          "The glomerular filtration barrier (fenestrated endothelium, basement membrane, podocyte slits) blocks cells and large proteins, while small solutes pass freely.",
      },
      ru: {
        prompt: "Что в норме отсутствует в клубочковом фильтрате?",
        options: ["Натрий", "Глюкоза", "Эритроциты и белки плазмы", "Мочевина"],
        correct: 2,
        explanation:
          "Клубочковый фильтрационный барьер (фенестрированный эндотелий, базальная мембрана, щели подоцитов) задерживает клетки и крупные белки, а мелкие вещества проходят свободно.",
      },
    },
  ],
  eyeball: [
    {
      en: {
        prompt: "Which structure focuses light by changing its shape?",
        options: ["Cornea", "Lens", "Iris", "Sclera"],
        correct: 1,
        explanation:
          "The crystalline lens changes curvature (accommodation) to focus near and distant objects; the cornea provides most of the static refractive power.",
      },
      ru: {
        prompt: "Какая структура фокусирует свет, меняя свою форму?",
        options: ["Роговица", "Хрусталик", "Радужка", "Склера"],
        correct: 1,
        explanation:
          "Хрусталик меняет кривизну (аккомодация), чтобы фокусировать близкие и дальние объекты; основную статическую преломляющую силу даёт роговица.",
      },
    },
    {
      en: {
        prompt: "Which photoreceptors enable colour vision?",
        options: ["Rods", "Cones", "Ganglion cells", "Bipolar cells"],
        correct: 1,
        explanation:
          "Three types of cones (S, M, L) are sensitive to short, medium and long wavelengths; rods handle vision in dim light and contain rhodopsin.",
      },
      ru: {
        prompt: "Какие фоторецепторы обеспечивают цветовое зрение?",
        options: ["Палочки", "Колбочки", "Ганглиозные клетки", "Биполярные клетки"],
        correct: 1,
        explanation:
          "Три типа колбочек (S, M, L) чувствительны к коротким, средним и длинным волнам; палочки отвечают за зрение при слабом освещении и содержат родопсин.",
      },
    },
    {
      en: {
        prompt: "Which condition results from chronically elevated intraocular pressure?",
        options: ["Cataract", "Glaucoma", "Strabismus", "Conjunctivitis"],
        correct: 1,
        explanation:
          "Glaucoma damages the optic nerve, usually through raised intraocular pressure from impaired aqueous humour drainage; it is a leading cause of irreversible blindness.",
      },
      ru: {
        prompt: "Какое заболевание развивается при хронически повышенном внутриглазном давлении?",
        options: ["Катаракта", "Глаукома", "Косоглазие", "Конъюнктивит"],
        correct: 1,
        explanation:
          "Глаукома повреждает зрительный нерв, обычно из-за повышения внутриглазного давления при нарушении оттока водянистой влаги; это ведущая причина необратимой слепоты.",
      },
    },
    {
      en: {
        prompt: "Where does light undergo its first refraction on entering the eye?",
        options: ["Lens", "Cornea", "Vitreous body", "Aqueous humour"],
        correct: 1,
        explanation:
          "The air–cornea interface provides the largest refractive step (~40 dioptres); the lens adds the remaining ~20 dioptres and adjusts for focusing.",
      },
      ru: {
        prompt: "Где свет впервые преломляется при входе в глаз?",
        options: ["Хрусталик", "Роговица", "Стекловидное тело", "Водянистая влага"],
        correct: 1,
        explanation:
          "Граница «воздух–роговица» даёт наибольшее преломление (около 40 дптр); хрусталик добавляет ещё около 20 дптр и обеспечивает наводку на фокус.",
      },
    },
    {
      en: {
        prompt: "The blind spot (optic disc) is the point where which structure exits the eye?",
        options: ["Choroid", "Optic nerve", "Ciliary body", "Lacrimal gland"],
        correct: 1,
        explanation:
          "The optic disc is where the optic nerve and retinal vessels leave the eye; it has no photoreceptors, which is why it appears as a blind spot.",
      },
      ru: {
        prompt: "Слепое пятно (диск зрительного нерва) — это место, где глаз покидает…",
        options: ["Сосудистая оболочка", "Зрительный нерв", "Цилиарное тело", "Слёзная железа"],
        correct: 1,
        explanation:
          "В диске зрительного нерва глаз покидают зрительный нерв и сосуды сетчатки; там нет фоторецепторов, поэтому он воспринимается как слепое пятно.",
      },
    },
  ],
  intestine: [
    {
      en: {
        prompt: "Which segment is the major site of nutrient absorption?",
        options: ["Stomach", "Small intestine", "Colon", "Rectum"],
        correct: 1,
        explanation:
          "The small intestine (~6 m) absorbs most nutrients: iron, calcium and folate in the duodenum, most carbohydrates, proteins and fats in the jejunum and ileum.",
      },
      ru: {
        prompt: "Какой отдел является главным местом всасывания питательных веществ?",
        options: ["Желудок", "Тонкая кишка", "Ободочная кишка", "Прямая кишка"],
        correct: 1,
        explanation:
          "Тонкая кишка (около 6 м) всасывает большинство питательных веществ: железо, кальций и фолаты — в двенадцатиперстной, основную массу углеводов, белков и жиров — в тощей и подвздошной.",
      },
    },
    {
      en: {
        prompt: "Which structures amplify the absorptive surface of the small intestine?",
        options: ["Alveoli", "Villi and microvilli", "Taeniae coli", "Plicae of the colon"],
        correct: 1,
        explanation:
          "Circular folds, villi and microvilli increase the small-intestine surface to about 250–300 m² — roughly the size of a tennis court.",
      },
      ru: {
        prompt: "Какие структуры увеличивают всасывающую поверхность тонкой кишки?",
        options: ["Альвеолы", "Ворсинки и микроворсинки", "Ленты ободочной кишки", "Складки ободочной кишки"],
        correct: 1,
        explanation:
          "Циркулярные складки, ворсинки и микроворсинки увеличивают поверхность тонкой кишки примерно до 250–300 м² — как теннисный корт.",
      },
    },
    {
      en: {
        prompt: "What is absorbed mainly in the colon?",
        options: ["Glucose", "Water and electrolytes", "Amino acids", "Fatty acids"],
        correct: 1,
        explanation:
          "The colon reabsorbs ~90% of the remaining water and electrolytes (mainly sodium), converting the chyme into formed stool.",
      },
      ru: {
        prompt: "Что всасывается преимущественно в ободочной кишке?",
        options: ["Глюкоза", "Вода и электролиты", "Аминокислоты", "Жирные кислоты"],
        correct: 1,
        explanation:
          "Ободочная кишка реабсорбирует около 90% оставшейся воды и электролитов (прежде всего натрия), превращая химус в оформленный кал.",
      },
    },
    {
      en: {
        prompt: "Which nerve provides the main parasympathetic supply to most of the gut?",
        options: ["Vagus nerve", "Phrenic nerve", "Glossopharyngeal nerve", "Hypoglossal nerve"],
        correct: 0,
        explanation:
          "The vagus (CN X) supplies parasympathetic fibres to the foregut and midgut, promoting motility and secretion; the pelvic splanchnics serve the hindgut.",
      },
      ru: {
        prompt: "Какой нерв даёт основную парасимпатическую иннервацию большей части кишечника?",
        options: ["Блуждающий нерв", "Диафрагмальный нерв", "Языкоглоточный нерв", "Подъязычный нерв"],
        correct: 0,
        explanation:
          "Блуждающий нерв (X пара ЧН) иннервирует переднюю и среднюю кишку, усиливая моторику и секрецию; заднюю кишку обслуживают тазовые внутренностные нервы.",
      },
    },
    {
      en: {
        prompt: "Which disease is an autoimmune reaction to gluten?",
        options: ["Crohn's disease", "Celiac disease", "Irritable bowel syndrome", "Diverticulitis"],
        correct: 1,
        explanation:
          "Celiac disease is an immune reaction to gluten causing villous atrophy and malabsorption; a strict gluten-free diet restores the mucosa.",
      },
      ru: {
        prompt: "Какое заболевание представляет собой аутоиммунную реакцию на глютен?",
        options: ["Болезнь Крона", "Целиакия", "Синдром раздражённого кишечника", "Дивертикулит"],
        correct: 1,
        explanation:
          "Целиакия — иммунная реакция на глютен с атрофией ворсинок и нарушением всасывания; строгая безглютеновая диета восстанавливает слизистую.",
      },
    },
  ],
  pancreas: [
    {
      en: {
        prompt: "Which cells produce insulin?",
        options: ["Acinar cells", "Beta cells of the islets", "Alpha cells", "Ductal cells"],
        correct: 1,
        explanation:
          "Insulin is secreted by β-cells of the islets of Langerhans; α-cells secrete glucagon, δ-cells somatostatin, PP-cells pancreatic polypeptide.",
      },
      ru: {
        prompt: "Какие клетки вырабатывают инсулин?",
        options: ["Ацинарные клетки", "Бета-клетки островков", "Альфа-клетки", "Протоковые клетки"],
        correct: 1,
        explanation:
          "Инсулин секретируют β-клетки островков Лангерганса; α-клетки выделяют глюкагон, δ-клетки — соматостатин, PP-клетки — панкреатический полипептид.",
      },
    },
    {
      en: {
        prompt: "The pancreatic duct joins which structure before opening into the duodenum?",
        options: ["Cystic duct", "Common bile duct", "Hepatic vein", "Portal vein"],
        correct: 1,
        explanation:
          "The main pancreatic duct and common bile duct unite at the hepatopancreatic ampulla (of Vater), which opens at the major duodenal papilla.",
      },
      ru: {
        prompt: "С каким протоком соединяется главный панкреатический проток перед впадением в двенадцатиперстную кишку?",
        options: ["Пузырный проток", "Общий жёлчный проток", "Печёночная вена", "Воротная вена"],
        correct: 1,
        explanation:
          "Главный панкреатический проток и общий жёлчный проток сливаются в печёночно-поджелудочную ампулу (Фатера), открывающуюся на большом дуоденальном сосочке.",
      },
    },
    {
      en: {
        prompt: "Which hormone opposes insulin by raising blood glucose?",
        options: ["Glucagon", "Cortisol", "Aldosterone", "Somatostatin"],
        correct: 0,
        explanation:
          "Glucagon from α-cells raises blood glucose by promoting glycogenolysis and gluconeogenesis in the liver — the counterbalance to insulin.",
      },
      ru: {
        prompt: "Какой гормон противодействует инсулину, повышая уровень глюкозы в крови?",
        options: ["Глюкагон", "Кортизол", "Альдостерон", "Соматостатин"],
        correct: 0,
        explanation:
          "Глюкагон α-клеток повышает уровень глюкозы, стимулируя гликогенолиз и глюконеогенез в печени — он противовес инсулину.",
      },
    },
    {
      en: {
        prompt: "What is the exocrine product of the pancreas?",
        options: ["Insulin", "Digestive enzymes and bicarbonate", "Bile", "Gastric acid"],
        correct: 1,
        explanation:
          "Acinar cells secrete amylase, lipase and proteases; ductal cells secrete alkaline bicarbonate to neutralise gastric acid in the duodenum.",
      },
      ru: {
        prompt: "Что является экзокринным продуктом поджелудочной железы?",
        options: ["Инсулин", "Пищеварительные ферменты и бикарбонат", "Желчь", "Желудочный сок"],
        correct: 1,
        explanation:
          "Ацинарные клетки секретируют амилазу, липазу и протеазы; клетки протоков выделяют щелочной бикарбонат, нейтрализующий желудочную кислоту в двенадцатиперстной кишке.",
      },
    },
    {
      en: {
        prompt: "Where is the pancreas located?",
        options: ["Behind the stomach, retroperitoneally", "In the thoracic cavity", "In the lesser pelvis", "In the neck"],
        correct: 0,
        explanation:
          "The pancreas lies retroperitoneally on the posterior abdominal wall, behind the stomach, with its head cradled by the duodenum and its tail reaching the spleen.",
      },
      ru: {
        prompt: "Где расположена поджелудочная железа?",
        options: ["Позади желудка, забрюшинно", "В грудной полости", "В малом тазу", "В области шеи"],
        correct: 0,
        explanation:
          "Поджелудочная железа лежит забрюшинно на задней брюшной стенке, позади желудка; её головка охвачена двенадцатиперстной кишкой, а хвост достигает селезёнки.",
      },
    },
  ],
  skin: [
    {
      en: {
        prompt: "Which epidermal layer continuously renews by cell division?",
        options: ["Stratum corneum", "Stratum basale", "Stratum lucidum", "Dermis"],
        correct: 1,
        explanation:
          "Keratinocyte stem cells divide in the stratum basale; daughter cells migrate upwards, keratinise, and are shed from the stratum corneum after ~4 weeks.",
      },
      ru: {
        prompt: "Какой слой эпидермиса постоянно обновляется за счёт деления клеток?",
        options: ["Роговой слой", "Базальный слой", "Блестящий слой", "Дерма"],
        correct: 1,
        explanation:
          "Стволовые кератиноциты делятся в базальном слое; дочерние клетки мигрируют вверх, ороговевают и слущиваются с рогового слоя примерно через 4 недели.",
      },
    },
    {
      en: {
        prompt: "Which cells produce the pigment melanin?",
        options: ["Keratinocytes", "Melanocytes", "Langerhans cells", "Merkel cells"],
        correct: 1,
        explanation:
          "Melanocytes in the stratum basale transfer melanin to keratinocytes via dendrites; melanin absorbs UV radiation and protects DNA.",
      },
      ru: {
        prompt: "Какие клетки вырабатывают пигмент меланин?",
        options: ["Кератиноциты", "Меланоциты", "Клетки Лангерганса", "Клетки Меркеля"],
        correct: 1,
        explanation:
          "Меланоциты базального слоя передают меланин кератиноцитам через отростки; меланин поглощает УФ-излучение и защищает ДНК.",
      },
    },
    {
      en: {
        prompt: "Which glands produce sweat?",
        options: ["Sebaceous glands", "Eccrine and apocrine glands", "Mammary glands", "Lacrimal glands"],
        correct: 1,
        explanation:
          "Eccrine glands (millions, over most of the body) produce watery sweat for thermoregulation; apocrine glands open into hair follicles in the axillae and groin.",
      },
      ru: {
        prompt: "Какие железы вырабатывают пот?",
        options: ["Сальные железы", "Эккриновые и апокриновые железы", "Молочные железы", "Слёзные железы"],
        correct: 1,
        explanation:
          "Эккриновые железы (их миллионы, по всему телу) выделяют водянистый пот для терморегуляции; апокриновые открываются в волосяные фолликулы в подмышечных впадинах и паху.",
      },
    },
    {
      en: {
        prompt: "Which structure is found in the dermis but not in the epidermis?",
        options: ["Blood vessels", "Keratinocytes", "Melanocytes", "Corneocytes"],
        correct: 0,
        explanation:
          "The epidermis is avascular — it is nourished by diffusion from the dermal capillary plexus; blood vessels, nerve endings, glands and follicles live in the dermis.",
      },
      ru: {
        prompt: "Какая структура есть в дерме, но отсутствует в эпидермисе?",
        options: ["Кровеносные сосуды", "Кератиноциты", "Меланоциты", "Корнеоциты"],
        correct: 0,
        explanation:
          "Эпидермис бессосудистый — он питается диффузией из капиллярного сплетения дермы; сосуды, нервные окончания, железы и фолликулы находятся в дерме.",
      },
    },
    {
      en: {
        prompt: "Which condition is a malignant tumour of melanocytes?",
        options: ["Basal cell carcinoma", "Melanoma", "Psoriasis", "Eczema"],
        correct: 1,
        explanation:
          "Melanoma arises from melanocytes and metastasises early; the ABCDE rule (asymmetry, border, colour, diameter, evolution) helps detect it.",
      },
      ru: {
        prompt: "Какое заболевание является злокачественной опухолью меланоцитов?",
        options: ["Базальноклеточный рак", "Меланома", "Псориаз", "Экзема"],
        correct: 1,
        explanation:
          "Меланома возникает из меланоцитов и рано метастазирует; для её выявления используют правило ABCDE (асимметрия, границы, цвет, диаметр, динамика).",
      },
    },
  ],

  stomach: [
    {
      en: {
        prompt: "Which cells of the gastric glands secrete hydrochloric acid?",
        options: ["Chief cells", "Parietal cells", "Goblet cells", "Enteroendocrine cells"],
        correct: 1,
        explanation:
          "Parietal cells in the gastric glands secrete HCl and intrinsic factor; chief cells secrete pepsinogen, which HCl activates into pepsin.",
      },
      ru: {
        prompt: "Какие клетки желудочных желёз выделяют соляную кислоту?",
        options: ["Главные клетки", "Париетальные клетки", "Бокаловидные клетки", "Энтероэндокринные клетки"],
        correct: 1,
        explanation:
          "Париетальные клетки желудочных желёз выделяют HCl и внутренний фактор Касла; главные клетки секретируют пепсиноген, который HCl активирует в пепсин.",
      },
    },
    {
      en: {
        prompt: "Which structure controls the passage of chyme into the duodenum?",
        options: ["Cardia", "Pyloric sphincter", "Lower esophageal sphincter", "Ileocecal valve"],
        correct: 1,
        explanation:
          "The pyloric sphincter at the outlet of the stomach meters chyme into the duodenum, preventing backflow and pacing digestion.",
      },
      ru: {
        prompt: "Какая структура регулирует поступление химуса в двенадцатиперстную кишку?",
        options: ["Кардия", "Привратниковый сфинктер", "Нижний пищеводный сфинктер", "Илеоцекальный клапан"],
        correct: 1,
        explanation:
          "Привратниковый сфинктер на выходе из желудка порциями пропускает химус в двенадцатиперстную кишку, предотвращая заброс и задавая темп переваривания.",
      },
    },
    {
      en: {
        prompt: "Which bacteria cause most peptic ulcers?",
        options: ["Escherichia coli", "Helicobacter pylori", "Streptococcus pneumoniae", "Clostridium difficile"],
        correct: 1,
        explanation:
          "Helicobacter pylori colonises the gastric mucosa, weakening the mucus barrier and enabling acid to damage the wall — the main cause of peptic ulcers.",
      },
      ru: {
        prompt: "Какие бактерии вызывают большинство язв желудка?",
        options: ["Escherichia coli", "Helicobacter pylori", "Streptococcus pneumoniae", "Clostridium difficile"],
        correct: 1,
        explanation:
          "Helicobacter pylori заселяет слизистую желудка, ослабляет слизистый барьер и позволяет кислоте повреждать стенку — главная причина язвенной болезни.",
      },
    },
  ],
  gallbladder: [
    {
      en: {
        prompt: "What does the gallbladder store?",
        options: ["Pancreatic enzymes", "Bile", "Gastric acid", "Insulin"],
        correct: 1,
        explanation:
          "The gallbladder stores and concentrates bile produced by the liver, releasing it into the duodenum when fat arrives.",
      },
      ru: {
        prompt: "Что накапливает жёлчный пузырь?",
        options: ["Ферменты поджелудочной железы", "Желчь", "Желудочную кислоту", "Инсулин"],
        correct: 1,
        explanation:
          "Жёлчный пузырь хранит и концентрирует желчь, вырабатываемую печенью, и выбрасывает её в двенадцатиперстную кишку при поступлении жира.",
      },
    },
    {
      en: {
        prompt: "Which hormone triggers the gallbladder to contract after a fatty meal?",
        options: ["Insulin", "Cholecystokinin (CCK)", "Gastrin", "Glucagon"],
        correct: 1,
        explanation:
          "Cholecystokinin, released by duodenal cells in response to fat, makes the gallbladder contract and the sphincter of Oddi relax.",
      },
      ru: {
        prompt: "Какой гормон заставляет жёлчный пузырь сокращаться после жирной еды?",
        options: ["Инсулин", "Холецистокинин (ХЦК)", "Гастрин", "Глюкагон"],
        correct: 1,
        explanation:
          "Холецистокинин, выделяемый клетками двенадцатиперстной кишки в ответ на жиры, сокращает жёлчный пузырь и расслабляет сфинктер Одди.",
      },
    },
    {
      en: {
        prompt: "Gallstones are formed mainly from what?",
        options: ["Calcium and oxalate", "Cholesterol and bilirubin", "Uric acid", "Protein deposits"],
        correct: 1,
        explanation:
          "Most gallstones are cholesterol stones; pigment stones are made of bilirubin. They can block the cystic duct and cause biliary colic.",
      },
      ru: {
        prompt: "Из чего в основном образуются жёлчные камни?",
        options: ["Кальций и оксалаты", "Холестерин и билирубин", "Мочевая кислота", "Белковые отложения"],
        correct: 1,
        explanation:
          "Большинство жёлчных камней — холестериновые; пигментные состоят из билирубина. Они могут закупорить пузырный проток и вызвать жёлчную колику.",
      },
    },
  ],
  esophagus: [
    {
      en: {
        prompt: "What type of movement propels food down the esophagus?",
        options: ["Segmentation", "Peristalsis", "Mass movement", "Osmosis"],
        correct: 1,
        explanation:
          "Peristalsis — coordinated waves of contraction and relaxation — pushes the bolus from pharynx to stomach in a few seconds.",
      },
      ru: {
        prompt: "Какой вид движения продвигает пищу по пищеводу?",
        options: ["Сегментация", "Перистальтика", "Массовое сокращение", "Осмос"],
        correct: 1,
        explanation:
          "Перистальтика — согласованные волны сокращения и расслабления — за несколько секунд продвигает пищевой комок от глотки к желудку.",
      },
    },
    {
      en: {
        prompt: "Backflow of stomach acid into the esophagus causes…",
        options: ["Achalasia", "Gastroesophageal reflux disease (GERD)", "Barrett's esophagus", "Zenker diverticulum"],
        correct: 1,
        explanation:
          "Weakness of the lower esophageal sphincter lets acid back up, causing heartburn — GERD. Chronic reflux can damage the lining.",
      },
      ru: {
        prompt: "Заброс желудочной кислоты в пищевод вызывает…",
        options: ["Ахалазию", "Гастроэзофагеальную рефлюксную болезнь (ГЭРБ)", "Пищевод Барретта", "Дивертикул Ценкера"],
        correct: 1,
        explanation:
          "Слабость нижнего пищеводного сфинктера пропускает кислоту вверх, вызывая изжогу — ГЭРБ. Хронический рефлюкс повреждает слизистую.",
      },
    },
    {
      en: {
        prompt: "Which sphincter is located at the junction of esophagus and stomach?",
        options: ["Upper esophageal sphincter", "Lower esophageal sphincter (cardiac)", "Pyloric sphincter", "Ileocecal valve"],
        correct: 1,
        explanation:
          "The lower esophageal (cardiac) sphincter separates the esophagus from the stomach and normally prevents reflux of gastric contents.",
      },
      ru: {
        prompt: "Какой сфинктер расположен на границе пищевода и желудка?",
        options: ["Верхний пищеводный сфинктер", "Нижний пищеводный (кардиальный) сфинктер", "Привратниковый сфинктер", "Илеоцекальный клапан"],
        correct: 1,
        explanation:
          "Нижний пищеводный (кардиальный) сфинктер отделяет пищевод от желудка и в норме не пропускает содержимое желудка обратно.",
      },
    },
  ],
  tongue: [
    {
      en: {
        prompt: "Which papillae contain most of the taste buds?",
        options: ["Filiform papillae", "Fungiform and circumvallate papillae", "Lingual tonsils", "Foliate crypts"],
        correct: 1,
        explanation:
          "Fungiform papillae cover the front, circumvallate papillae form the V-line at the back — together they hold most taste buds.",
      },
      ru: {
        prompt: "Какие сосочки содержат большинство вкусовых луковиц?",
        options: ["Нитевидные сосочки", "Грибовидные и желобоватые сосочки", "Язычная миндалина", "Листовидные крипты"],
        correct: 1,
        explanation:
          "Грибовидные сосочки покрывают переднюю часть языка, желобоватые образуют V-образную линию у корня — вместе они несут большинство вкусовых луковиц.",
      },
    },
    {
      en: {
        prompt: "Which cranial nerve carries taste from the front two-thirds of the tongue?",
        options: ["Hypoglossal nerve (CN XII)", "Facial nerve (CN VII)", "Glossopharyngeal nerve (CN IX)", "Trigeminal nerve (CN V)"],
        correct: 1,
        explanation:
          "The chorda tympani branch of the facial nerve (CN VII) carries taste from the anterior two-thirds; CN IX serves the posterior third.",
      },
      ru: {
        prompt: "Какой черепной нерв проводит вкус от передних двух третей языка?",
        options: ["Подъязычный нерв (XII)", "Лицевой нерв (VII)", "Языкоглоточный нерв (IX)", "Тройничный нерв (V)"],
        correct: 1,
        explanation:
          "Ветвь лицевого нерва — барабанная струна (VII пара) — несёт вкус от передних двух третей языка; заднюю треть обслуживает IX пара.",
      },
    },
    {
      en: {
        prompt: "The tongue's main muscle that allows it to protrude is…",
        options: ["Styloglossus", "Genioglossus", "Hyoglossus", "Palatoglossus"],
        correct: 1,
        explanation:
          "Genioglossus pulls the tongue forward and down; damage to its nerve (CN XII) makes the tongue deviate to the weak side.",
      },
      ru: {
        prompt: "Главная мышца, позволяющая языку высовываться вперёд, — это…",
        options: ["Шилоязычная мышца", "Подбородочно-язычная мышца", "Подъязычно-язычная мышца", "Нёбно-язычная мышца"],
        correct: 1,
        explanation:
          "Подбородочно-язычная мышца выдвигает язык вперёд и вниз; при поражении её нерва (XII пара) язык отклоняется в слабую сторону.",
      },
    },
  ],
  spleen: [
    {
      en: {
        prompt: "What is the main function of the red pulp of the spleen?",
        options: ["T-lymphocyte training", "Filtering old and damaged red blood cells", "Bile production", "Glucose storage"],
        correct: 1,
        explanation:
          "The red pulp removes senescent red cells, platelets and debris from circulation, and recycles iron from haemoglobin.",
      },
      ru: {
        prompt: "Какова главная функция красной пульпы селезёнки?",
        options: ["Обучение T-лимфоцитов", "Фильтрация старых и повреждённых эритроцитов", "Выработка желчи", "Запас глюкозы"],
        correct: 1,
        explanation:
          "Красная пульпа удаляет из кровотока состарившиеся эритроциты, тромбоциты и обломки клеток и возвращает железо из гемоглобина.",
      },
    },
    {
      en: {
        prompt: "Which artery supplies the spleen?",
        options: ["Hepatic artery", "Splenic artery", "Left gastric artery", "Superior mesenteric artery"],
        correct: 1,
        explanation:
          "The splenic artery, a branch of the coeliac trunk, runs to the hilum of the spleen along the upper border of the pancreas.",
      },
      ru: {
        prompt: "Какая артерия кровоснабжает селезёнку?",
        options: ["Печёночная артерия", "Селезёночная артерия", "Левая желудочная артерия", "Верхняя брыжеечная артерия"],
        correct: 1,
        explanation:
          "Селезёночная артерия, ветвь чревного ствола, идёт к воротам селезёнки вдоль верхнего края поджелудочной железы.",
      },
    },
    {
      en: {
        prompt: "After splenectomy, patients have an increased risk of infection with…",
        options: ["Encapsulated bacteria", "Viruses", "Fungi", "Parasites"],
        correct: 0,
        explanation:
          "The spleen is key to clearing encapsulated bacteria (pneumococcus, meningococcus, Haemophilus); splenectomised patients need vaccination and prophylaxis.",
      },
      ru: {
        prompt: "После спленэктомии повышен риск инфекций, вызванных…",
        options: ["Инкапсулированными бактериями", "Вирусами", "Грибами", "Паразитами"],
        correct: 0,
        explanation:
          "Селезёнка критически важна для уничтожения инкапсулированных бактерий (пневмококк, менингококк, гемофильная палочка); таким пациентам нужны вакцинация и профилактика.",
      },
    },
  ],
  thymus: [
    {
      en: {
        prompt: "What is the main function of the thymus?",
        options: ["Red blood cell production", "Maturation of T-lymphocytes", "Bile storage", "Insulin secretion"],
        correct: 1,
        explanation:
          "Thymocytes mature into functional T-cells here, undergoing positive and negative selection so they attack pathogens, not self.",
      },
      ru: {
        prompt: "Какова главная функция тимуса?",
        options: ["Образование эритроцитов", "Созревание T-лимфоцитов", "Накопление желчи", "Секреция инсулина"],
        correct: 1,
        explanation:
          "Тимоциты созревают здесь в функциональные T-клетки, проходя положительную и отрицательную селекцию, чтобы атаковать патогены, а не собственные ткани.",
      },
    },
    {
      en: {
        prompt: "What happens to the thymus with age?",
        options: ["It grows continuously", "It shrinks and is replaced by fat (involution)", "It turns into bone", "It doubles in size"],
        correct: 1,
        explanation:
          "After puberty the thymus undergoes involution: lymphoid tissue is gradually replaced by adipose tissue, though function persists.",
      },
      ru: {
        prompt: "Что происходит с тимусом с возрастом?",
        options: ["Он постоянно растёт", "Он уменьшается и замещается жиром (инволюция)", "Он превращается в кость", "Он удваивается"],
        correct: 1,
        explanation:
          "После полового созревания тимус подвергается инволюции: лимфоидная ткань постепенно замещается жировой, хотя функция сохраняется.",
      },
    },
    {
      en: {
        prompt: "Myasthenia gravis is often associated with thymic…",
        options: ["Hyperplasia or thymoma", "Aplasia", "Calcification", "Infarction"],
        correct: 0,
        explanation:
          "Up to 75% of myasthenia gravis patients have thymic hyperplasia and ~10–15% a thymoma; the thymus contributes to autoantibody production.",
      },
      ru: {
        prompt: "Миастения гравис часто связана с… тимуса",
        options: ["Гиперплазией или тимомой", "Аплазией", "Кальцификацией", "Инфарктом"],
        correct: 0,
        explanation:
          "У 75% пациентов с миастенией гравис — гиперплазия тимуса, у 10–15% — тимома; тимус участвует в продукции аутоантител.",
      },
    },
  ],
  "lymph-node": [
    {
      en: {
        prompt: "Which fluid does a lymph node filter?",
        options: ["Blood plasma", "Lymph", "Cerebrospinal fluid", "Synovial fluid"],
        correct: 1,
        explanation:
          "Lymph — interstitial fluid returned to the circulation — percolates through lymph nodes, where immune cells scan it for antigens.",
      },
      ru: {
        prompt: "Какую жидкость фильтрует лимфатический узел?",
        options: ["Плазму крови", "Лимфу", "Спинномозговую жидкость", "Синовиальную жидкость"],
        correct: 1,
        explanation:
          "Лимфа — тканевая жидкость, возвращающаяся в кровоток, — просачивается через лимфатические узлы, где иммунные клетки проверяют её на антигены.",
      },
    },
    {
      en: {
        prompt: "Which cells predominate in the cortex (follicles) of a lymph node?",
        options: ["B-lymphocytes", "Neutrophils", "Erythrocytes", "Platelets"],
        correct: 0,
        explanation:
          "Cortical follicles are B-cell zones; they form germinal centres during antibody responses. T-cells concentrate in the paracortex.",
      },
      ru: {
        prompt: "Какие клетки преобладают в корковом веществе (фолликулах) лимфатического узла?",
        options: ["B-лимфоциты", "Нейтрофилы", "Эритроциты", "Тромбоциты"],
        correct: 0,
        explanation:
          "Корковые фолликулы — зоны B-клеток; при антительном ответе в них образуются герминативные центры. T-клетки сосредоточены в паракортикальной зоне.",
      },
    },
    {
      en: {
        prompt: "Which condition most commonly causes painful, enlarged lymph nodes in the neck?",
        options: ["Lymphoma", "Infectious lymphadenitis", "Metastatic cancer", "Sarcoidosis"],
        correct: 1,
        explanation:
          "Viral or bacterial infections (tonsillitis, dental, skin) drain to cervical nodes and cause painful enlargement — reactive lymphadenitis.",
      },
      ru: {
        prompt: "Какое состояние чаще всего вызывает болезненное увеличение шейных лимфатических узлов?",
        options: ["Лимфома", "Инфекционный лимфаденит", "Метастазы рака", "Саркоидоз"],
        correct: 1,
        explanation:
          "Вирусные и бактериальные инфекции (тонзиллит, стоматологические, кожные) дренируются в шейные узлы и вызывают болезненное увеличение — реактивный лимфаденит.",
      },
    },
  ],
  thyroid: [
    {
      en: {
        prompt: "Which hormone is produced by the thyroid gland?",
        options: ["Cortisol", "Thyroxine (T4)", "Insulin", "Adrenaline"],
        correct: 1,
        explanation:
          "The thyroid produces thyroxine (T4) and triiodothyronine (T3), which set the metabolic rate of nearly every cell.",
      },
      ru: {
        prompt: "Какой гормон вырабатывает щитовидная железа?",
        options: ["Кортизол", "Тироксин (T4)", "Инсулин", "Адреналин"],
        correct: 1,
        explanation:
          "Щитовидная железа производит тироксин (T4) и трийодтиронин (T3), задающие интенсивность обмена веществ почти каждой клетки.",
      },
    },
    {
      en: {
        prompt: "Iodine deficiency most commonly causes…",
        options: ["Hyperthyroidism", "Goitre and hypothyroidism", "Cushing's syndrome", "Addison's disease"],
        correct: 1,
        explanation:
          "Without iodine the gland cannot make thyroid hormones; TSH rises and the gland enlarges into a goitre, often with hypothyroidism.",
      },
      ru: {
        prompt: "Дефицит йода чаще всего вызывает…",
        options: ["Гипертиреоз", "Зоб и гипотиреоз", "Синдром Кушинга", "Болезнь Аддисона"],
        correct: 1,
        explanation:
          "Без йода железа не может синтезировать тиреоидные гормоны; ТТГ растёт, и железа увеличивается в зоб, часто с гипотиреозом.",
      },
    },
    {
      en: {
        prompt: "Which gland controls the thyroid via TSH?",
        options: ["Adrenal gland", "Pituitary gland", "Thymus", "Pancreas"],
        correct: 1,
        explanation:
          "The pituitary secretes thyroid-stimulating hormone (TSH), which drives thyroid hormone release — the classic endocrine feedback loop.",
      },
      ru: {
        prompt: "Какая железа управляет щитовидной железой через ТТГ?",
        options: ["Надпочечник", "Гипофиз", "Тимус", "Поджелудочная железа"],
        correct: 1,
        explanation:
          "Гипофиз секретирует тиреотропный гормон (ТТГ), стимулирующий выделение гормонов щитовидной железы — классическая петля обратной связи.",
      },
    },
  ],
  adrenal: [
    {
      en: {
        prompt: "Which hormone is produced by the adrenal medulla?",
        options: ["Cortisol", "Adrenaline (epinephrine)", "Aldosterone", "Testosterone"],
        correct: 1,
        explanation:
          "The adrenal medulla releases adrenaline and noradrenaline — the fight-or-flight catecholamines that surge within seconds of danger.",
      },
      ru: {
        prompt: "Какой гормон вырабатывает мозговое вещество надпочечника?",
        options: ["Кортизол", "Адреналин", "Альдостерон", "Тестостерон"],
        correct: 1,
        explanation:
          "Мозговое вещество надпочечника выделяет адреналин и норадреналин — катехоламины реакции «бей или беги», выбрасываемые за секунды при опасности.",
      },
    },
    {
      en: {
        prompt: "Aldosterone from the adrenal cortex regulates…",
        options: ["Blood glucose", "Sodium and potassium balance", "Calcium levels", "Red blood cell count"],
        correct: 1,
        explanation:
          "Aldosterone makes the kidneys retain sodium and excrete potassium, controlling blood volume and blood pressure.",
      },
      ru: {
        prompt: "Альдостерон коры надпочечников регулирует…",
        options: ["Уровень глюкозы в крови", "Баланс натрия и калия", "Уровень кальция", "Число эритроцитов"],
        correct: 1,
        explanation:
          "Альдостерон заставляет почки задерживать натрий и выводить калий, управляя объёмом крови и артериальным давлением.",
      },
    },
    {
      en: {
        prompt: "Excess cortisol production causes…",
        options: ["Addison's disease", "Cushing's syndrome", "Pheochromocytoma", "Conn's syndrome"],
        correct: 1,
        explanation:
          "Chronic cortisol excess — Cushing's syndrome — causes weight gain, hypertension, hyperglycaemia and characteristic striae.",
      },
      ru: {
        prompt: "Избыточная продукция кортизола вызывает…",
        options: ["Болезнь Аддисона", "Синдром Кушинга", "Феохромоцитому", "Синдром Конна"],
        correct: 1,
        explanation:
          "Хронический избыток кортизола — синдром Кушинга — ведёт к ожирению, гипертензии, гипергликемии и характерным стриям.",
      },
    },
  ],
  pituitary: [
    {
      en: {
        prompt: "The pituitary gland lies in a depression of which bone?",
        options: ["Frontal bone", "Sphenoid bone", "Temporal bone", "Occipital bone"],
        correct: 1,
        explanation:
          "The hypophysis sits in the sella turcica of the sphenoid bone, protected by the diaphragma sellae.",
      },
      ru: {
        prompt: "Гипофиз лежит в углублении какой кости?",
        options: ["Лобная кость", "Клиновидная кость", "Височная кость", "Затылочная кость"],
        correct: 1,
        explanation:
          "Гипофиз расположен в турецком седле клиновидной кости и прикрыт диафрагмой седла.",
      },
    },
    {
      en: {
        prompt: "Which pituitary hormone stimulates growth?",
        options: ["Prolactin", "Growth hormone (GH)", "Oxytocin", "ADH"],
        correct: 1,
        explanation:
          "Growth hormone from the anterior lobe drives growth of bones and tissues; excess causes gigantism or acromegaly.",
      },
      ru: {
        prompt: "Какой гормон гипофиза стимулирует рост?",
        options: ["Пролактин", "Соматотропный гормон (СТГ)", "Окситоцин", "АДГ"],
        correct: 1,
        explanation:
          "Соматотропный гормон передней доли стимулирует рост костей и тканей; его избыток вызывает гигантизм или акромегалию.",
      },
    },
    {
      en: {
        prompt: "The posterior pituitary stores hormones produced in the…",
        options: ["Hypothalamus", "Adrenal cortex", "Thyroid", "Pineal gland"],
        correct: 0,
        explanation:
          "Oxytocin and antidiuretic hormone are synthesised in the hypothalamus and stored in the posterior lobe for release.",
      },
      ru: {
        prompt: "Задняя доля гипофиза хранит гормоны, выработанные в…",
        options: ["Гипоталамусе", "Коре надпочечников", "Щитовидной железе", "Шишковидном теле"],
        correct: 0,
        explanation:
          "Окситоцин и антидиуретический гормон синтезируются в гипоталамусе и хранятся в задней доле гипофиза до выделения.",
      },
    },
  ],
  trachea: [
    {
      en: {
        prompt: "What keeps the trachea open?",
        options: ["Bony rings", "C-shaped cartilage rings", "Smooth muscle tone alone", "Fluid pressure"],
        correct: 1,
        explanation:
          "16–20 C-shaped hyaline cartilage rings keep the trachea patent; the open side faces the esophagus.",
      },
      ru: {
        prompt: "Что держит трахею открытой?",
        options: ["Костные кольца", "C-образные хрящевые кольца", "Только тонус гладких мышц", "Давление жидкости"],
        correct: 1,
        explanation:
          "16–20 C-образных колец гиалинового хряща сохраняют просвет трахеи; незамкнутая сторона обращена к пищеводу.",
      },
    },
    {
      en: {
        prompt: "Where does the trachea divide into the main bronchi?",
        options: ["At the larynx", "At the carina", "At the epiglottis", "At the alveoli"],
        correct: 1,
        explanation:
          "The trachea bifurcates at the carina into right and left main bronchi — the right is wider and more vertical, so aspirated objects often enter it.",
      },
      ru: {
        prompt: "Где трахея делится на главные бронхи?",
        options: ["На уровне гортани", "На уровне бифуркации (карины)", "На уровне надгортанника", "На уровне альвеол"],
        correct: 1,
        explanation:
          "Трахея раздваивается на бифуркации на правый и левый главные бронхи; правый шире и вертикальнее, поэтому аспирированные предметы чаще попадают в него.",
      },
    },
    {
      en: {
        prompt: "Which procedure restores airflow when the trachea is blocked?",
        options: ["Tracheostomy", "Lobectomy", "Thoracentesis", "Cardioversion"],
        correct: 0,
        explanation:
          "Tracheostomy creates an opening in the trachea below the obstruction to bypass blocked upper airways.",
      },
      ru: {
        prompt: "Какая процедура восстанавливает проходимость при закупорке трахеи?",
        options: ["Трахеостомия", "Лобэктомия", "Торакоцентез", "Кардиоверсия"],
        correct: 0,
        explanation:
          "Трахеостомия создаёт отверстие в трахее ниже препятствия, чтобы обойти закупоренные верхние дыхательные пути.",
      },
    },
  ],
  larynx: [
    {
      en: {
        prompt: "Which structure closes over the larynx during swallowing?",
        options: ["Vocal folds", "Epiglottis", "Arytenoid cartilages", "Hyoid bone"],
        correct: 1,
        explanation:
          "The epiglottis folds down over the laryngeal inlet during swallowing, directing food into the esophagus.",
      },
      ru: {
        prompt: "Какая структура прикрывает гортань при глотании?",
        options: ["Голосовые складки", "Надгортанник", "Черпаловидные хрящи", "Подъязычная кость"],
        correct: 1,
        explanation:
          "Надгортанник при глотании опускается на вход в гортань, направляя пищу в пищевод.",
      },
    },
    {
      en: {
        prompt: "Voice is produced by vibration of the…",
        options: ["Vocal folds", "Epiglottis", "Thyroid cartilage", "Tracheal rings"],
        correct: 0,
        explanation:
          "Air from the lungs sets the vocal folds vibrating; pitch depends on fold tension and length, controlled by laryngeal muscles.",
      },
      ru: {
        prompt: "Голос рождается колебаниями…",
        options: ["Голосовых складок", "Надгортанника", "Щитовидного хряща", "Колец трахеи"],
        correct: 0,
        explanation:
          "Воздух из лёгких приводит голосовые складки в колебание; высота тона зависит от натяжения и длины складок, которыми управляют мышцы гортани.",
      },
    },
    {
      en: {
        prompt: "The largest cartilage of the larynx is the…",
        options: ["Cricoid cartilage", "Thyroid cartilage", "Epiglottis", "Arytenoid cartilage"],
        correct: 1,
        explanation:
          "The thyroid cartilage forms the Adam's apple and shields the vocal apparatus; the cricoid is the complete ring below it.",
      },
      ru: {
        prompt: "Самый крупный хрящ гортани — это…",
        options: ["Перстневидный хрящ", "Щитовидный хрящ", "Надгортанник", "Черпаловидный хрящ"],
        correct: 1,
        explanation:
          "Щитовидный хрящ образует «кадык» и прикрывает голосовой аппарат; перстневидный — полное кольцо ниже него.",
      },
    },
  ],
  bladder: [
    {
      en: {
        prompt: "Which muscle of the bladder wall expels urine?",
        options: ["Detrusor muscle", "Sphincter urethrae", "Levator ani", "Psoas major"],
        correct: 0,
        explanation:
          "The detrusor, the smooth muscle of the bladder wall, contracts during voiding while the sphincters relax.",
      },
      ru: {
        prompt: "Какая мышца стенки мочевого пузыря изгоняет мочу?",
        options: ["Детрузор", "Сфинктер мочеиспускательного канала", "Мышца, поднимающая задний проход", "Поясничная мышца"],
        correct: 0,
        explanation:
          "Детрузор — гладкая мышца стенки пузыря — сокращается при мочеиспускании, пока сфинктеры расслабляются.",
      },
    },
    {
      en: {
        prompt: "What is the approximate capacity of the adult bladder?",
        options: ["50–100 mL", "400–600 mL", "2–3 L", "10 mL"],
        correct: 1,
        explanation:
          "The adult bladder holds about 400–600 mL; the first urge appears at ~150–250 mL and voiding is under voluntary control.",
      },
      ru: {
        prompt: "Какова примерная вместимость мочевого пузыря взрослого человека?",
        options: ["50–100 мл", "400–600 мл", "2–3 л", "10 мл"],
        correct: 1,
        explanation:
          "Мочевой пузырь взрослого вмещает около 400–600 мл; первый позыв появляется при ~150–250 мл, а мочеиспускание находится под произвольным контролем.",
      },
    },
    {
      en: {
        prompt: "The triangular region on the bladder floor is called the…",
        options: ["Trigone", "Fundus", "Apex", "Neck"],
        correct: 0,
        explanation:
          "The trigone is the fixed triangle between the two ureteral orifices and the internal urethral orifice — a key surgical landmark.",
      },
      ru: {
        prompt: "Треугольная область на дне мочевого пузыря называется…",
        options: ["Тригон", "Дно", "Верхушка", "Шейка"],
        correct: 0,
        explanation:
          "Тригон — неподвижный треугольник между устьями мочеточников и внутренним отверстием уретры — важный хирургический ориентир.",
      },
    },
  ],
  uterus: [
    {
      en: {
        prompt: "Which layer of the uterus is shed during menstruation?",
        options: ["Myometrium", "Endometrium", "Perimetrium", "Cervical stroma"],
        correct: 1,
        explanation:
          "The functional layer of the endometrium is shed each cycle if no pregnancy occurs; the basal layer regenerates it.",
      },
      ru: {
        prompt: "Какой слой матки отторгается во время менструации?",
        options: ["Миометрий", "Эндометрий", "Периметрий", "Строма шейки"],
        correct: 1,
        explanation:
          "Функциональный слой эндометрия отторгается каждый цикл, если беременность не наступила; базальный слой восстанавливает его.",
      },
    },
    {
      en: {
        prompt: "Where does fertilisation normally occur?",
        options: ["In the uterus", "In the fallopian tube", "In the ovary", "In the vagina"],
        correct: 1,
        explanation:
          "The sperm meets the oocyte in the ampulla of the fallopian tube; the fertilised egg then travels to implant in the uterus.",
      },
      ru: {
        prompt: "Где в норме происходит оплодотворение?",
        options: ["В матке", "В маточной трубе", "В яичнике", "Во влагалище"],
        correct: 1,
        explanation:
          "Сперматозоид встречает яйцеклетку в ампуле маточной трубы; затем оплодотворённая яйцеклетка движется к имплантации в матке.",
      },
    },
    {
      en: {
        prompt: "The lower narrow part of the uterus that opens into the vagina is the…",
        options: ["Fundus", "Cervix", "Cornua", "Isthmus"],
        correct: 1,
        explanation:
          "The cervix is the fibromuscular lower segment; its canal connects the uterine cavity with the vagina and dilates during labour.",
      },
      ru: {
        prompt: "Нижняя узкая часть матки, открывающаяся во влагалище, — это…",
        options: ["Дно", "Шейка", "Рога матки", "Перешеек"],
        correct: 1,
        explanation:
          "Шейка — нижний фиброзно-мышечный сегмент; её канал соединяет полость матки с влагалищем и раскрывается в родах.",
      },
    },
  ],
  ovary: [
    {
      en: {
        prompt: "The release of a mature oocyte from the ovary is called…",
        options: ["Menstruation", "Ovulation", "Fertilisation", "Implantation"],
        correct: 1,
        explanation:
          "Ovulation — the rupture of a mature Graafian follicle releasing the oocyte — occurs roughly mid-cycle under the LH surge.",
      },
      ru: {
        prompt: "Выход зрелой яйцеклетки из яичника называется…",
        options: ["Менструация", "Овуляция", "Оплодотворение", "Имплантация"],
        correct: 1,
        explanation:
          "Овуляция — разрыв зрелого граафова пузырька с выходом яйцеклетки — происходит примерно в середине цикла под действием пика ЛГ.",
      },
    },
    {
      en: {
        prompt: "Which hormones are produced by the ovaries?",
        options: ["TSH and ACTH", "Oestrogen and progesterone", "Insulin and glucagon", "ADH and oxytocin"],
        correct: 1,
        explanation:
          "Ovarian follicles secrete oestrogen; the corpus luteum adds progesterone, preparing the endometrium for implantation.",
      },
      ru: {
        prompt: "Какие гормоны вырабатывают яичники?",
        options: ["ТТГ и АКТГ", "Эстроген и прогестерон", "Инсулин и глюкагон", "АДГ и окситоцин"],
        correct: 1,
        explanation:
          "Фолликулы яичников секретируют эстроген; жёлтое тело добавляет прогестерон, подготавливая эндометрий к имплантации.",
      },
    },
    {
      en: {
        prompt: "A baby girl is born with approximately how many oocytes?",
        options: ["About 400", "About 1–2 million", "About 10,000", "About 100 million"],
        correct: 1,
        explanation:
          "At birth the ovaries hold ~1–2 million oocytes; most undergo atresia, and only ~400 are ovulated during reproductive life.",
      },
      ru: {
        prompt: "Со сколькими яйцеклетками рождается девочка?",
        options: ["Около 400", "Около 1–2 миллионов", "Около 10 000", "Около 100 миллионов"],
        correct: 1,
        explanation:
          "При рождении в яичниках около 1–2 млн яйцеклеток; большинство подвергается атрезии, и лишь ~400 овулируют за репродуктивный период.",
      },
    },
  ],
  testis: [
    {
      en: {
        prompt: "Where does spermatogenesis take place?",
        options: ["In the epididymis", "In the seminiferous tubules", "In the prostate", "In the seminal vesicles"],
        correct: 1,
        explanation:
          "Sperm develop in the seminiferous tubules; the epididymis stores and matures them, and the ductus deferens transports them.",
      },
      ru: {
        prompt: "Где происходит сперматогенез?",
        options: ["В придатке яичка", "В семенных канальцах", "В предстательной железе", "В семенных пузырьках"],
        correct: 1,
        explanation:
          "Сперматозоиды развиваются в семенных канальцах; придаток яичка хранит и «дозревает» их, а семявыносящий проток транспортирует.",
      },
    },
    {
      en: {
        prompt: "Which hormone is produced by the Leydig cells of the testis?",
        options: ["Oestrogen", "Testosterone", "FSH", "Inhibin"],
        correct: 1,
        explanation:
          "Leydig cells between the tubules secrete testosterone, driving male development and spermatogenesis; FSH acts on Sertoli cells.",
      },
      ru: {
        prompt: "Какой гормон вырабатывают клетки Лейдига яичка?",
        options: ["Эстроген", "Тестостерон", "ФСГ", "Ингибин"],
        correct: 1,
        explanation:
          "Клетки Лейдига между канальцами секретируют тестостерон, определяющий мужское развитие и сперматогенез; ФСГ действует на клетки Сертоли.",
      },
    },
    {
      en: {
        prompt: "Why do the testes hang outside the body cavity?",
        options: ["To reduce weight", "To keep them 2–3 °C cooler", "For easier blood supply", "To avoid infection"],
        correct: 1,
        explanation:
          "Spermatogenesis needs a temperature ~2–3 °C below core; the scrotum and its muscles regulate this temperature.",
      },
      ru: {
        prompt: "Почему яички находятся вне полости тела?",
        options: ["Чтобы уменьшить вес", "Чтобы держать их на 2–3 °C холоднее", "Для лучшего кровоснабжения", "Чтобы избежать инфекций"],
        correct: 1,
        explanation:
          "Сперматогенез требует температуры на 2–3 °C ниже температуры ядра тела; мошонка и её мышцы регулируют эту температуру.",
      },
    },
  ],
  prostate: [
    {
      en: {
        prompt: "The prostate surrounds which structure?",
        options: ["The ureter", "The urethra", "The vas deferens", "The bladder neck and urethra"],
        correct: 3,
        explanation:
          "The prostate encircles the prostatic urethra just below the bladder neck — why enlargement compresses urine flow.",
      },
      ru: {
        prompt: "Что окружает предстательная железа?",
        options: ["Мочеточник", "Мочеиспускательный канал", "Семявыносящий проток", "Шейку мочевого пузыря и уретру"],
        correct: 3,
        explanation:
          "Предстательная железа охватывает простатическую часть уретры сразу под шейкой мочевого пузыря — поэтому при увеличении нарушается отток мочи.",
      },
    },
    {
      en: {
        prompt: "Benign prostatic hyperplasia (BPH) typically develops in which zone?",
        options: ["Peripheral zone", "Transition zone", "Central zone", "Fibrous capsule"],
        correct: 1,
        explanation:
          "BPH arises in the transition zone around the urethra, compressing it; prostate cancer, in contrast, is most common in the peripheral zone.",
      },
      ru: {
        prompt: "Доброкачественная гиперплазия предстательной железы (ДГПЖ) обычно развивается в какой зоне?",
        options: ["Периферической зоне", "Переходной зоне", "Центральной зоне", "Фиброзной капсуле"],
        correct: 1,
        explanation:
          "ДГПЖ возникает в переходной зоне вокруг уретры и сдавливает её; рак предстательной железы, напротив, чаще всего — в периферической зоне.",
      },
    },
    {
      en: {
        prompt: "Which test is used for prostate cancer screening?",
        options: ["PSA blood test", "Glucose tolerance test", "TSH test", "CRP test"],
        correct: 0,
        explanation:
          "The prostate-specific antigen (PSA) blood test, together with digital rectal examination, is the standard screening approach.",
      },
      ru: {
        prompt: "Какой анализ используется для скрининга рака предстательной железы?",
        options: ["Анализ крови на ПСА", "Глюкозотолерантный тест", "Анализ на ТТГ", "Анализ на СРБ"],
        correct: 0,
        explanation:
          "Анализ крови на простатический специфический антиген (ПСА) вместе с пальцевым ректальным исследованием — стандартный подход к скринингу.",
      },
    },
  ],
  "spinal-cord": [
    {
      en: {
        prompt: "In adults, the spinal cord ends at the level of…",
        options: ["T12–L1", "L1–L2", "S2–S3", "C7"],
        correct: 1,
        explanation:
          "The adult spinal cord ends around L1–L2; the lumbar and sacral nerve roots descend below it as the cauda equina.",
      },
      ru: {
        prompt: "У взрослого человека спинной мозг заканчивается на уровне…",
        options: ["Th12–L1", "L1–L2", "S2–S3", "C7"],
        correct: 1,
        explanation:
          "Спинной мозг взрослого заканчивается около L1–L2; ниже него поясничные и крестцовые корешки спускаются «конским хвостом».",
      },
    },
    {
      en: {
        prompt: "Which structure carries sensory information to the brain?",
        options: ["Motor tracts", "Ascending (sensory) tracts of white matter", "Grey matter commissure", "Ventral roots"],
        correct: 1,
        explanation:
          "Sensory signals travel up ascending tracts (e.g. spinothalamic, dorsal columns); motor commands descend via corticospinal tracts.",
      },
      ru: {
        prompt: "Какая структура проводит чувствительную информацию к мозгу?",
        options: ["Двигательные пути", "Восходящие (чувствительные) пути белого вещества", "Серое вещество — спайка", "Передние корешки"],
        correct: 1,
        explanation:
          "Чувствительные сигналы идут вверх по восходящим путям (например, спиноталамическому, задним канатикам); двигательные команды спускаются по кортикоспинальным путям.",
      },
    },
    {
      en: {
        prompt: "Which cells myelinate axons within the central nervous system?",
        options: ["Schwann cells", "Oligodendrocytes", "Astrocytes", "Microglia"],
        correct: 1,
        explanation:
          "Oligodendrocytes myelinate CNS axons (one cell, many segments); Schwann cells do the same in the peripheral nervous system.",
      },
      ru: {
        prompt: "Какие клетки миелинизируют аксоны в центральной нервной системе?",
        options: ["Шванновские клетки", "Олигодендроциты", "Астроциты", "Микроглия"],
        correct: 1,
        explanation:
          "Олигодендроциты миелинизируют аксоны ЦНС (одна клетка — много сегментов); в периферической нервной системе это делают шванновские клетки.",
      },
    },
  ],
  diaphragm: [
    {
      en: {
        prompt: "Which nerve innervates the diaphragm?",
        options: ["Vagus nerve", "Phrenic nerve", "Intercostal nerve T3", "Femoral nerve"],
        correct: 1,
        explanation:
          "The phrenic nerve (C3–C5) supplies the diaphragm; its paralysis causes paradoxical breathing and respiratory failure.",
      },
      ru: {
        prompt: "Какой нерв иннервирует диафрагму?",
        options: ["Блуждающий нерв", "Диафрагмальный нерв", "Межрёберный нерв T3", "Бедренный нерв"],
        correct: 1,
        explanation:
          "Диафрагмальный нерв (C3–C5) снабжает диафрагму; при его параличе возникает парадоксальное дыхание и дыхательная недостаточность.",
      },
    },
    {
      en: {
        prompt: "During inspiration the diaphragm…",
        options: ["Rises and relaxes", "Contracts and flattens", "Twists sideways", "Stays completely still"],
        correct: 1,
        explanation:
          "Contraction flattens the dome, increasing thoracic volume and drawing air into the lungs; relaxation lets it dome back up.",
      },
      ru: {
        prompt: "Во время вдоха диафрагма…",
        options: ["Поднимается и расслабляется", "Сокращается и уплощается", "Поворачивается в сторону", "Остаётся неподвижной"],
        correct: 1,
        explanation:
          "Сокращение уплощает купол, увеличивая объём грудной клетки и втягивая воздух в лёгкие; при расслаблении купол снова поднимается.",
      },
    },
    {
      en: {
        prompt: "Which structure passes through the esophageal hiatus of the diaphragm?",
        options: ["The aorta", "The esophagus and vagus nerves", "The vena cava", "The trachea"],
        correct: 1,
        explanation:
          "The esophageal hiatus transmits the esophagus and vagus nerves; the aorta passes through the aortic hiatus, the vena cava through the vena caval foramen.",
      },
      ru: {
        prompt: "Какая структура проходит через пищеводное отверстие диафрагмы?",
        options: ["Аорта", "Пищевод и блуждающие нервы", "Полые вены", "Трахея"],
        correct: 1,
        explanation:
          "Через пищеводное отверстие проходят пищевод и блуждающие нервы; аорта — через аортальное отверстие, нижняя полая вена — через отверстие полой вены.",
      },
    },
  ],
  biceps: [
    {
      en: {
        prompt: "Which movements does the biceps brachii perform?",
        options: ["Elbow extension and pronation", "Elbow flexion and supination", "Shoulder depression", "Wrist extension"],
        correct: 1,
        explanation:
          "The biceps flexes the elbow and supinates the forearm (turning the palm up) — its supination power is strongest with the elbow flexed.",
      },
      ru: {
        prompt: "Какие движения выполняет двуглавая мышца плеча?",
        options: ["Разгибание локтя и пронацию", "Сгибание локтя и супинацию", "Опускание плеча", "Разгибание запястья"],
        correct: 1,
        explanation:
          "Двуглавая мышца сгибает локоть и супинирует предплечье (поворачивает ладонь вверх) — супинация сильнее всего при согнутом локте.",
      },
    },
    {
      en: {
        prompt: "Which nerve supplies the biceps brachii?",
        options: ["Radial nerve", "Musculocutaneous nerve", "Ulnar nerve", "Axillary nerve"],
        correct: 1,
        explanation:
          "The musculocutaneous nerve (C5–C6) innervates the biceps and brachialis; injury weakens elbow flexion and supination.",
      },
      ru: {
        prompt: "Какой нерв иннервирует двуглавую мышцу плеча?",
        options: ["Лучевой нерв", "Мышечно-кожный нерв", "Локтевой нерв", "Подмышечный нерв"],
        correct: 1,
        explanation:
          "Мышечно-кожный нерв (C5–C6) иннервирует бицепс и плечевую мышцу; при его повреждении слабеют сгибание локтя и супинация.",
      },
    },
    {
      en: {
        prompt: "The long head of the biceps arises from…",
        options: ["The coracoid process", "The supraglenoid tubercle", "The clavicle", "The humeral shaft"],
        correct: 1,
        explanation:
          "The long head originates from the supraglenoid tubercle and runs through the shoulder joint; the short head comes from the coracoid process.",
      },
      ru: {
        prompt: "Длинная головка двуглавой мышцы начинается от…",
        options: ["Клювовидного отростка", "Надсуставного бугорка лопатки", "Ключицы", "Диафиза плечевой кости"],
        correct: 1,
        explanation:
          "Длинная головка начинается от надсуставного бугорка и проходит через плечевой сустав; короткая — от клювовидного отростка.",
      },
    },
  ],
  femur: [
    {
      en: {
        prompt: "Which bone articulates with the head of the femur?",
        options: ["Tibia", "Acetabulum of the pelvis", "Patella", "Sacrum"],
        correct: 1,
        explanation:
          "The femoral head fits into the acetabulum of the hip bone, forming the ball-and-socket hip joint.",
      },
      ru: {
        prompt: "С какой костью сочленяется головка бедренной кости?",
        options: ["Большеберцовая кость", "Вертлужная впадина таза", "Надколенник", "Крестец"],
        correct: 1,
        explanation:
          "Головка бедренной кости входит в вертлужную впадину тазовой кости, образуя шаровидный тазобедренный сустав.",
      },
    },
    {
      en: {
        prompt: "The femur is the…",
        options: ["Shortest bone", "Longest and strongest bone", "Most fragile bone", "Only sesamoid bone"],
        correct: 1,
        explanation:
          "At ~45–50 cm and supporting 5× body weight in running, the femur is the longest and strongest bone in the body.",
      },
      ru: {
        prompt: "Бедренная кость — это…",
        options: ["Самая короткая кость", "Самая длинная и прочная кость", "Самая хрупкая кость", "Единственная сесамовидная кость"],
        correct: 1,
        explanation:
          "Длиной около 45–50 см и выдерживая при беге нагрузку 5× массы тела, бедренная кость — самая длинная и прочная кость тела.",
      },
    },
    {
      en: {
        prompt: "Fractures of the femoral neck are particularly common in…",
        options: ["Children with rickets", "Elderly people with osteoporosis", "Athletes", "Newborns"],
        correct: 1,
        explanation:
          "Osteoporosis weakens the femoral neck, and falls in the elderly frequently cause hip fractures requiring surgery.",
      },
      ru: {
        prompt: "Переломы шейки бедра особенно часты у…",
        options: ["Детей с рахитом", "Пожилых людей с остеопорозом", "Спортсменов", "Новорождённых"],
        correct: 1,
        explanation:
          "Остеопороз ослабляет шейку бедра, и падения у пожилых часто приводят к переломам шейки бедра, требующим операции.",
      },
    },
  ],
  pelvis: [
    {
      en: {
        prompt: "Which three fused bones form each hip bone (os coxae) in the adult pelvis?",
        options: ["Ilium, ischium, and pubis", "Femur, sacrum, and coccyx", "Patella, tibia, and fibula", "Atlas, axis, and sacrum"],
        correct: 0,
        explanation: "Each adult hip bone forms by the fusion of the ilium, ischium, and pubis at the acetabulum.",
      },
      ru: {
        prompt: "Какие три сросшиеся кости образуют тазовую кость у взрослого человека?",
        options: ["Подвздошная, седалищная и лобковая", "Бедренная, крестец и копчик", "Надколенник, большеберцовая и малоберцовая", "Атлант, осевой и крестец"],
        correct: 0,
        explanation: "Тазовая кость взрослого образуется сращением подвздошной, седалищной и лобковой костей в области вертлужной впадины.",
      },
    },
    {
      en: {
        prompt: "How does the anatomical female pelvis typically differ from the male pelvis?",
        options: ["It has a wider, oval-shaped pelvic inlet adapted for childbirth", "It is significantly heavier and narrower", "It has a heart-shaped pelvic brim", "It completely lacks a pubic symphysis"],
        correct: 0,
        explanation: "The female pelvis has a wider, more circular/oval inlet, broader sciatic notches, and a wider pubic arch to facilitate child delivery.",
      },
      ru: {
        prompt: "Чем женский таз анатомически отличается от мужского?",
        options: ["Более широким и округлым входом, приспособленным к родам", "Он значительно тяжелее и уже", "Сердцевидным входом в малый таз", "Полным отсутствием лобкового симфиза"],
        correct: 0,
        explanation: "Женский таз шире, имеет более развёрнутые крылья подвздошных костей и широкий лобковый угол для прохождения плода при родах.",
      },
    },
    {
      en: {
        prompt: "Which joint connects the pelvic girdle directly to the axial vertebral column?",
        options: ["Sacroiliac joint", "Pubic symphysis", "Hip (acetabulofemoral) joint", "Glenohumeral joint"],
        correct: 0,
        explanation: "The sacroiliac joints firmly link the sacrum of the vertebral column to the iliac bones of the pelvis.",
      },
      ru: {
        prompt: "Какой сустав непосредственно соединяет тазовый пояс с осевым скелетом?",
        options: ["Крестцово-подвздошный сустав", "Лобковый симфиз", "Тазобедренный сустав", "Плечевой сустав"],
        correct: 0,
        explanation: "Крестцово-подвздошные суставы прочно связывают крестец позвоночника с подвздошными костями тазового пояса.",
      },
    },
  ],
  knee: [
    {
      en: {
        prompt: "What is the primary function of the fibrocartilaginous menisci in the knee?",
        options: ["Shock absorption and load distribution across femoral and tibial condyles", "Production of blood cells", "Anchoring the quadriceps tendon to the hip", "Secretion of synovial fluid into the bursa"],
        correct: 0,
        explanation: "The medial and lateral menisci act as shock absorbers and deepen the shallow tibial plateau to stabilize the femoral condyles.",
      },
      ru: {
        prompt: "Какова главная функция волокнисто-хрящевых менисков коленного сустава?",
        options: ["Амортизация и равномерное распределение нагрузки между мыщелками", "Продукция клеток крови", "Прикрепление сухожилия квадрицепса к тазу", "Секреция синовиальной жидкости в сумку"],
        correct: 0,
        explanation: "Медиальный и латеральный мениски служат амортизаторами и углубляют суставные поверхности большеберцовой кости.",
      },
    },
    {
      en: {
        prompt: "Which major knee ligament prevents the tibia from sliding anteriorly beneath the femur?",
        options: ["Anterior cruciate ligament (ACL)", "Posterior cruciate ligament (PCL)", "Fibular collateral ligament", "Patellar tendon"],
        correct: 0,
        explanation: "The anterior cruciate ligament (ACL) resists anterior translation of the tibia relative to the femur.",
      },
      ru: {
        prompt: "Какая связка колена препятствует смещению голени вперёд относительно бедра?",
        options: ["Передняя крестообразная связка (ПКС)", "Задняя крестообразная связка (ЗКС)", "Малоберцовая коллатеральная связка", "Связка надколенника"],
        correct: 0,
        explanation: "Передняя крестообразная связка удерживает большеберцовую кость от чрезмерного смещения вперёд относительно мыщелков бедра.",
      },
    },
    {
      en: {
        prompt: "What type of bone is the patella (kneecap) categorized as anatomically?",
        options: ["Sesamoid bone embedded within the quadriceps tendon", "Long tubular bone of the lower extremity", "Pneumatized cranial bone", "Irregular vertebral bone"],
        correct: 0,
        explanation: "The patella is the largest sesamoid bone in the body, embedded within the quadriceps femoris tendon.",
      },
      ru: {
        prompt: "К какому типу костей относится надколенник (коленная чашечка)?",
        options: ["Сесамовидная кость в толще сухожилия квадрицепса", "Длинная трубчатая кость ноги", "Воздухоносная кость черепа", "Губчатая кость позвоночника"],
        correct: 0,
        explanation: "Надколенник — самая крупная сесамовидная кость скелета человека, залегающая в сухожилии четырёхглавой мышцы бедра.",
      },
    },
  ],
  sternum: [
    {
      en: {
        prompt: "Which anatomical landmark on the sternum marks the level of the second costal cartilage?",
        options: ["Sternal angle (Angle of Louis)", "Xiphoid process", "Jugular notch", "Clavicular notch"],
        correct: 0,
        explanation: "The sternal angle marks the junction between manubrium and body and aligns with the second ribs and T4–T5 vertebrae.",
      },
      ru: {
        prompt: "Какой анатомический ориентир грудины находится на уровне прикрепления хряща 2-го ребра?",
        options: ["Угол грудины (угол Луи)", "Мечевидный отросток", "Яремная вырезка", "Ключичная вырезка"],
        correct: 0,
        explanation: "Угол грудины (угол Луи) — выступ на границе рукоятки и тела, служащий надёжным ориентиром для пальпации 2-го ребра.",
      },
    },
    {
      en: {
        prompt: "How many pairs of 'true ribs' directly articulate with the sternum via costal cartilages?",
        options: ["7 pairs (ribs 1–7)", "12 pairs", "10 pairs", "5 pairs"],
        correct: 0,
        explanation: "Ribs 1 through 7 are true ribs (vertebrosternal) because their costal cartilages articulate directly with the sternum.",
      },
      ru: {
        prompt: "Сколько пар истинных рёбер непосредственно прикрепляются к грудине своими хрящами?",
        options: ["7 пар (1–7 рёбра)", "12 пар", "10 пар", "5 пар"],
        correct: 0,
        explanation: "Первые 7 пар рёбер называются истинными, поскольку они напрямую соединяются своими реберными хрящами с грудиной.",
      },
    },
    {
      en: {
        prompt: "Why is the sternum frequently utilized for bone marrow aspirations in clinical practice?",
        options: ["It retains active hematopoietic red marrow throughout adult life and is easily accessible", "It has no nerve supply so it is painless", "It is composed entirely of hollow cartilage", "It produces all mature lymphocytes"],
        correct: 0,
        explanation: "The sternum contains active red marrow under a thin cortical bone plate, making it an accessible biopsy site.",
      },
      ru: {
        prompt: "Почему грудина часто используется в клинике для пункции костного мозга?",
        options: ["Она сохраняет кроветворный красный костный мозг у взрослых и легко доступна", "В ней нет нервов, поэтому пункция безболезненна", "Она состоит только из хряща", "Она производит все зрелые лимфоциты"],
        correct: 0,
        explanation: "Грудина содержит активный красный мозг под тонкой компактной пластинкой, что делает стернальную пункцию доступной диагностической процедурой.",
      },
    },
  ],
  manubrium: [
    {
      en: {
        prompt: "Which pair of bones articulates with the superolateral notches of the manubrium?",
        options: ["Clavicles (collarbones)", "Scapulae", "Humeri", "First thoracic vertebrae"],
        correct: 0,
        explanation: "The clavicular notches on the superolateral borders of the manubrium articulate with the sternal ends of the clavicles.",
      },
      ru: {
        prompt: "Какие кости сочленяются с верхнелатеральными вырезками рукоятки грудины?",
        options: ["Ключицы", "Лопатки", "Плечевые кости", "Первые грудные позвонки"],
        correct: 0,
        explanation: "Ключичные вырезки по бокам верхнего края рукоятки образуют грудино-ключичные суставы с концами ключиц.",
      },
    },
    {
      en: {
        prompt: "What major cardiovascular structure lies immediately posterior to the manubrium?",
        options: ["Aortic arch and great vessels (brachiocephalic trunk, left carotid, subclavian)", "Left ventricle", "Inferior vena cava", "Abdominal aorta"],
        correct: 0,
        explanation: "The aortic arch and its three branches lie directly behind the protective bone plate of the manubrium.",
      },
      ru: {
        prompt: "Какая крупная сосудистая структура располагается непосредственно позади рукоятки грудины?",
        options: ["Дуга аорты и её главные ветви (плечеголовной ствол, сонная и подключичная артерии)", "Левый желудочек", "Нижняя полая вена", "Брюшная аорта"],
        correct: 0,
        explanation: "Дуга аорты и отходящие от неё сосуды лежат непосредственно за костной защитой рукоятки грудины в верхнем средостении.",
      },
    },
    {
      en: {
        prompt: "What is the easily palpable depression located on the superior border of the manubrium?",
        options: ["Jugular (suprasternal) notch", "Costal groove", "Xiphoid notch", "Infraglenoid tubercle"],
        correct: 0,
        explanation: "The jugular (suprasternal) notch is the central dip between the two clavicular joints at the base of the throat.",
      },
      ru: {
        prompt: "Какое легко пальпируемое углубление находится на верхнем крае рукоятки грудины?",
        options: ["Яремная (надгрудинная) вырезка", "Реберная борозда", "Мечевидная ямка", "Подсуставной бугорок"],
        correct: 0,
        explanation: "Яремная вырезка — срединное углубление между ключичными суставами в яремной ямке у основания шеи.",
      },
    },
  ],
  "main-bronchus": [
    {
      en: {
        prompt: "Why do aspirated foreign objects lodge more frequently in the right main bronchus than the left?",
        options: ["The right bronchus is wider, shorter, and more vertical", "The left bronchus is completely closed by a valve", "The right bronchus lacks cilia", "The right lung has fewer lobes"],
        correct: 0,
        explanation: "The right main bronchus is wider and runs more vertically directly in line with the trachea, so inhaled items easily enter it.",
      },
      ru: {
        prompt: "Почему аспирированные инородные тела чаще попадают в правый главный бронх, чем в левый?",
        options: ["Правый бронх шире, короче и направлен более вертикально", "Левый бронх наглухо закрыт клапаном", "В правом бронхе нет ресничек", "В правом лёгком меньше долей"],
        correct: 0,
        explanation: "Правый главный бронх шире и отходит от трахеи под более крутым углом, являясь как бы прямым продолжением трахеи.",
      },
    },
    {
      en: {
        prompt: "What is the internal ridge located at the bifurcation of the trachea called?",
        options: ["Carina", "Hilum", "Uvula", "Vallecula"],
        correct: 0,
        explanation: "The carina is the internal cartilaginous ridge between the openings of the right and left primary bronchi.",
      },
      ru: {
        prompt: "Как называется внутренний хрящевой гребень в месте разделения трахеи на бронхи?",
        options: ["Киль трахеи (карина)", "Ворота", "Язычок", "Валлекула"],
        correct: 0,
        explanation: "Карина (киль) трахеи — высокочувствительный хрящевой гребень на стыке устьев главных бронхов, вызывающий кашлевой рефлекс.",
      },
    },
    {
      en: {
        prompt: "What prevents the main bronchi from collapsing during forced expiration?",
        options: ["C-shaped or complete hyaline cartilaginous rings", "High arterial blood pressure", "Thick skeletal muscle fibers", "Surfactant fluid alone"],
        correct: 0,
        explanation: "Hyaline cartilage in the walls of the main bronchi keeps their lumen patent during thoracic pressure changes.",
      },
      ru: {
        prompt: "Что предотвращает спадение стенок главных бронхов при форсированном выдохе?",
        options: ["Гиалиновые хрящевые полукольца и пластинки", "Высокое артериальное давление", "Скелетные мышечные волокна", "Исключительно слой сурфактанта"],
        correct: 0,
        explanation: "Хрящевой остов из гиалинового хряща обеспечивает постоянный открытый просвет бронхов при перепадах внутригрудного давления.",
      },
    },
  ],
  "palatine-tonsil": [
    {
      en: {
        prompt: "In which anatomical compartment are the palatine tonsils located?",
        options: ["Tonsillar fossa of the lateral oropharynx", "Nasopharynx roof", "Submandibular triangle", "Laryngeal vestibule"],
        correct: 0,
        explanation: "The palatine tonsils sit in the tonsillar fossa between the palatoglossal and palatopharyngeal arches of the oropharynx.",
      },
      ru: {
        prompt: "В каком анатомическом пространстве расположены нёбные миндалины?",
        options: ["В миндаликовой ямке боковой стенки ротоглотки", "В своде носоглотки", "В поднижнечелюстном треугольнике", "В преддверии гортани"],
        correct: 0,
        explanation: "Нёбные миндалины лежат в миндаликовых нишах между небно-язычной и небно-глоточной дужками ротоглотки.",
      },
    },
    {
      en: {
        prompt: "What is the primary immunological role of tonsillar crypts?",
        options: ["To maximize surface contact between lymphocytes and ingested/inhaled pathogens", "To produce digestive pepsin", "To secrete lubricating saliva", "To drain lymph into the thoracic duct"],
        correct: 0,
        explanation: "Deep invaginated crypts allow inhaled and swallowed antigens to contact underlying lymphoid follicles and stimulate mucosal immunity.",
      },
      ru: {
        prompt: "Какова основная иммунологическая роль миндаликовых крипт?",
        options: ["Увеличение площади контакта лимфоцитов с микроорганизмами из пищи и воздуха", "Продукция пищеварительного пепсина", "Секреция слюны для смачивания пищи", "Отток лимфы в грудной проток"],
        correct: 0,
        explanation: "Глубокие ветвящиеся крипты многократно увеличивают площадь контакта антигенов с иммунокомпетентными клетками миндалины.",
      },
    },
    {
      en: {
        prompt: "The palatine tonsils are prominent components of which lymphoid defense ring?",
        options: ["Waldeyer's tonsillar ring", "Circle of Willis", "Femoral ring", "Anulus fibrosus"],
        correct: 0,
        explanation: "Waldeyer's pharyngeal ring consists of the palatine, pharyngeal (adenoid), lingual, and tubal tonsils protecting the aerodigestive tract.",
      },
      ru: {
        prompt: "Компонентом какого лимфоидного защитного кольца глотки являются нёбные миндалины?",
        options: ["Лимфоэпителиального кольца Пирогова–Вальдейера", "Виллизиева круга", "Бедренного кольца", "Фиброзного кольца сердца"],
        correct: 0,
        explanation: "Кольцо Пирогова–Вальдейера окружает вход в дыхательные и пищеварительные пути, защищая организм от респираторных и алиментарных инфекций.",
      },
    },
  ],
  "fallopian-tube": [
    {
      en: {
        prompt: "In which anatomical segment of the fallopian tube does fertilization typically take place?",
        options: ["Ampulla", "Isthmus", "Infundibulum", "Interstitium"],
        correct: 0,
        explanation: "Fertilization of the oocyte by a sperm cell most commonly occurs within the wider ampulla of the fallopian tube.",
      },
      ru: {
        prompt: "В каком анатомическом отделе маточной трубы обычно происходит оплодотворение?",
        options: ["Ампула", "Перешеек (истмус)", "Воронка", "Маточная часть"],
        correct: 0,
        explanation: "Оплодотворение яйцеклетки сперматозоидом чаще всего происходит в самом широком ампулярном отделе маточной трубы.",
      },
    },
    {
      en: {
        prompt: "What structures on the infundibulum sweep over the ovary to capture the ovulated egg?",
        options: ["Fimbriae", "Microvilli", "Flagella", "Haustra"],
        correct: 0,
        explanation: "The fimbriae are fringe-like finger projections at the distal end of the tube that guide the released egg into the tubal lumen.",
      },
      ru: {
        prompt: "Какие структуры на конце воронки маточной трубы захватывают вышедшую яйцеклетку?",
        options: ["Фимбрии (бахромки)", "Микроворсинки", "Жгутики", "Гаустры"],
        correct: 0,
        explanation: "Бахромки (фимбрии) воронки трубы совершают волнообразные движения над яичником, направляя ооцит в просвет воронки.",
      },
    },
    {
      en: {
        prompt: "What mechanism primarily moves the fertilized blastocyst toward the uterine cavity?",
        options: ["Coordinated epithelial ciliary beating and smooth muscle peristalsis", "Passive gravity drainage", "High arterial blood pressure pulses", "Centrifugal force from pelvic movement"],
        correct: 0,
        explanation: "Ciliated epithelial cells beating toward the uterus together with gentle muscular contractions propel the embryo over 3–4 days.",
      },
      ru: {
        prompt: "Какой механизм главным образом продвигает оплодотворённую яйцеклетку в матку?",
        options: ["Синхронное биение ресничек эпителия и перистальтика мышечной стенки", "Пассивное стекание под действием гравитации", "Пульсация артериального давления", "Центробежная сила при движениях таза"],
        correct: 0,
        explanation: "Реснички мерцательного эпителия создают ток жидкости к матке, а гладкие мышцы трубы продвигают зародыш волнообразными сокращениями.",
      },
    },
  ],
  ureter: [
    {
      en: {
        prompt: "How is urine actively transported through the ureters into the urinary bladder?",
        options: ["Rhythmic peristaltic smooth muscle contractions", "Passive gravity flow only", "Hydrostatic capillary pressure", "Negative suction pressure from the urethra"],
        correct: 0,
        explanation: "Smooth muscle in the ureteral wall produces rhythmic peristaltic waves that pump urine spurts down into the bladder.",
      },
      ru: {
        prompt: "Каким образом моча активно транспортируется по мочеточникам в мочевой пузырь?",
        options: ["Ритмическими перистальтическими сокращениями гладких мышц стенки", "Только пассивным стеканием под силой тяжести", "Гидростатическим давлением капилляров", "Отрицательным давлением из уретры"],
        correct: 0,
        explanation: "Гладкая мускулатура мочеточника совершает волнообразные перистальтические сокращения, проталкивая порции мочи даже в положении лёжа.",
      },
    },
    {
      en: {
        prompt: "What physiological mechanism prevents backflow of urine from the bladder into the ureter?",
        options: ["The oblique intramural passage of the ureter through the bladder wall", "A mechanical bicuspid valve with chordae", "A permanent skeletal muscle ring", "High venous pressure in the detrusor"],
        correct: 0,
        explanation: "As the bladder fills, internal intravesical pressure compresses the oblique intramural ureter, creating a natural anti-reflux valve.",
      },
      ru: {
        prompt: "Какой механизм препятствует обратному забросу мочи из мочевого пузыря в мочеточник?",
        options: ["Косой интрамуральный ход мочеточника в толще стенки пузыря", "Двустворчатый механический клапан с хордами", "Постоянный сфинктер из поперечнополосатых мышц", "Высокое венозное давление в стенке"],
        correct: 0,
        explanation: "При наполнении пузыря поднимающееся давление сдавливает косо проходящий в стенке канал мочеточника, закрывая его просвет.",
      },
    },
    {
      en: {
        prompt: "Where are the three classical anatomical sites of ureteral narrowing where stones often lodge?",
        options: ["Pelviureteric junction, pelvic brim crossing, and ureterovesical junction", "Renal cortex, glomerulus, and loop of Henle", "Prostatic urethra, membranous urethra, and meatus", "Superior vena cava, carina, and hilum"],
        correct: 0,
        explanation: "Renal calculi commonly impact at the pelviureteric junction (PUJ), where crossing the iliac vessels at the pelvic brim, or at the ureterovesical junction (UVJ).",
      },
      ru: {
        prompt: "В каких трёх анатомических сужениях мочеточника чаще всего застревают почечные камни?",
        options: ["Лоханочно-мочеточниковый сегмент, перекрёст с подвздошными сосудами и вход в пузырь", "Корковое вещество, клубочек и петля Генле", "Простатическая уретра, наружный сфинктер и меатус", "Верхняя полая вена, киль и ворота"],
        correct: 0,
        explanation: "Камни чаще всего вклиниваются на выходе из лоханки, при перегибе через подвздошные сосуды на границе таза и в стенке пузыря.",
      },
    },
  ],
  urethra: [
    {
      en: {
        prompt: "Which sphincter surrounding the urethra is under voluntary somatic motor control?",
        options: ["External urethral sphincter (via pudendal nerve)", "Internal urethral sphincter", "Sphincter of Oddi", "Pyloric sphincter"],
        correct: 0,
        explanation: "The external urethral sphincter in the deep perineal pouch is striated skeletal muscle innervated by the somatic pudendal nerve, allowing voluntary continence.",
      },
      ru: {
        prompt: "Какой сфинктер мочеиспускательного канала находится под произвольным соматическим контролем человека?",
        options: ["Наружный сфинктер уретры (иннервация половым нервом)", "Внутренний сфинктер уретры", "Сфинктер Одди", "Пилорический сфинктер желудка"],
        correct: 0,
        explanation: "Наружный сфинктер уретры образован поперечнополосатой мускулатурой промежности и управляется произвольно через половой нерв.",
      },
    },
    {
      en: {
        prompt: "Why are females anatomically much more susceptible to ascending cystitis (bladder infections)?",
        options: ["The female urethra is significantly shorter (~4 cm vs ~20 cm in males)", "Females lack transitional epithelium", "Females have no internal sphincter", "The female bladder holds less urine"],
        correct: 0,
        explanation: "The short length of the female urethra provides a much shorter transit path for external bacteria to migrate into the bladder.",
      },
      ru: {
        prompt: "Почему женщины анатомически более предрасположены к развитию восходящего цистита?",
        options: ["Женская уретра значительно короче и шире мужской (~4 см против ~20 см)", "У женщин отсутствует переходный эпителий", "У женщин нет внутреннего сфинктера", "Женский мочевой пузырь вмещает меньше мочи"],
        correct: 0,
        explanation: "Короткая протяжённость женского мочеиспускательного канала облегчает проникновение периуретральной микрофлоры в полость пузыря.",
      },
    },
    {
      en: {
        prompt: "Which segment of the male urethra receives secretions from the ejaculatory ducts and prostate gland?",
        options: ["Prostatic urethra", "Spongy (penile) urethra", "Membranous urethra", "Navicular fossa"],
        correct: 0,
        explanation: "The prostatic urethra traverses the prostate gland; the seminal colliculus contains openings for the ejaculatory ducts and prostatic sinuses.",
      },
      ru: {
        prompt: "В какой отдел мужской уретры открываются семявыносящие протоки и протоки предстательной железы?",
        options: ["Простатическая часть", "Губчатая часть", "Перепончатая часть", "Ладьевидная ямка"],
        correct: 0,
        explanation: "В простатической части уретры на семенном бугорке открываются отверстия семявыбрасывающих протоков и протоков долек простаты.",
      },
    },
  ],
  "renal-pelvis": [
    {
      en: {
        prompt: "What anatomical structures directly empty urine into the renal pelvis?",
        options: ["Major calyces (calices majores)", "Collecting ducts of Bellini directly", "Urethra", "Renal cortex columns"],
        correct: 0,
        explanation: "Urine drains from minor calyces into two or three major calyces, which combine to form the expanded renal pelvis funnel.",
      },
      ru: {
        prompt: "Какие анатомические структуры непосредственно опорожняют мочу в почечную лоханку?",
        options: ["Большие почечные чашечки", "Сосочковые протоки Беллини напрямую", "Мочеиспускательный канал", "Почечные столбы Бертена"],
        correct: 0,
        explanation: "Малые чашечки сливаются в 2–3 большие почечные чашечки, которые объединяются в общую воронку лоханки.",
      },
    },
    {
      en: {
        prompt: "What is the medical term for severe bacterial infection and inflammation of the renal pelvis and kidney?",
        options: ["Pyelonephritis", "Glomerulonephritis", "Cystitis", "Urethritis"],
        correct: 0,
        explanation: "Pyelonephritis is an inflammatory infection affecting the renal pelvis (pyelo-) and the renal nephron parenchyma.",
      },
      ru: {
        prompt: "Как называется бактериальное воспаление почечной лоханки и паренхимы почки?",
        options: ["Пиелонефрит", "Гломерулонефрит", "Цистит", "Уретрит"],
        correct: 0,
        explanation: "Пиелонефрит — инфекционно-воспалительное заболевание, поражающее почечную лоханку (pyelos) и интерстициальную ткань почки.",
      },
    },
    {
      en: {
        prompt: "What clinical condition occurs when the pelviureteric junction (PUJ) is obstructed, causing the renal pelvis to swell with urine?",
        options: ["Hydronephrosis", "Polycystic kidney disease", "Renal infarct", "Glomerulosclerosis"],
        correct: 0,
        explanation: "Hydronephrosis is the distension and dilation of the renal pelvis and calyces caused by obstruction to the outflow of urine.",
      },
      ru: {
        prompt: "Какое патологическое состояние возникает при обструкции выхода из лоханки с перерастяжением почки мочой?",
        options: ["Гидронефроз", "Поликистоз почек", "Инфаркт почки", "Гломерулосклероз"],
        correct: 0,
        explanation: "Гидронефроз — расширение чашечно-лоханочной системы почки с атрофией паренхимы из-за нарушения оттока мочи.",
      },
    },
  ],
  "large-intestine": [
    {
      en: {
        prompt: "What are the three longitudinal ribbon bands of smooth muscle along the colon called?",
        options: ["Teniae coli", "Haustra", "Epiploic appendages", "Peyer patches"],
        correct: 0,
        explanation: "Teniae coli are three distinct bands of longitudinal smooth muscle that bunch the colon wall into sacculations called haustra.",
      },
      ru: {
        prompt: "Как называются три продольные мышечные ленты на поверхности ободочной кишки?",
        options: ["Ленты ободочной кишки (teniae coli)", "Гаустры", "Сальниковые отростки", "Пейеровы бляшки"],
        correct: 0,
        explanation: "Ленты ободочной кишки (teniae coli) — пучки продольного мышечного слоя, стягивающие стенку кишки в мешковидные гаустры.",
      },
    },
    {
      en: {
        prompt: "What is the primary physiological function of the large intestine?",
        options: ["Absorption of water and electrolytes, and consolidation of feces", "Secretion of hydrochloric acid and pepsin", "Absorption of emulsified lipids via lacteals", "Production of bile salts"],
        correct: 0,
        explanation: "The colon absorbs roughly 90% of the remaining water and electrolytes entering from the ileum, dehydrating chyme into stool.",
      },
      ru: {
        prompt: "В чём заключается основная физиологическая функция толстой кишки?",
        options: ["Всасывание воды и электролитов, формирование каловых масс", "Секреция соляной кислоты и пепсина", "Всасывание расщеплённых жиров в лимфу", "Синтез солей жёлчных кислот"],
        correct: 0,
        explanation: "Толстая кишка всасывает около 90% оставшейся воды и минеральных солей, формируя плотные каловые массы.",
      },
    },
    {
      en: {
        prompt: "What vestigial-lymphoid organ projects from the posteromedial wall of the caecum?",
        options: ["Vermiform appendix", "Meckel diverticulum", "Palatine tonsil", "Spleen"],
        correct: 0,
        explanation: "The vermiform appendix is a narrow, blind tube rich in lymphoid tissue extending from the caecum near the ileocecal valve.",
      },
      ru: {
        prompt: "Какой богатый лимфоидной тканью орган отходит от купола слепой кишки?",
        options: ["Червеобразный отросток (аппендикс)", "Дивертикул Меккеля", "Нёбная миндалина", "Селезёнка"],
        correct: 0,
        explanation: "Червеобразный отросток (аппендикс) — трубчатый вырост слепой кишки, содержащий скопления лимфоидной ткани и служащий резервуаром микробиоты.",
      },
    },
  ],
  omentum: [
    {
      en: {
        prompt: "Why is the greater omentum historically referred to as the 'abdominal policeman'?",
        options: ["It migrates to sites of intra-abdominal inflammation to wrap and wall off infection", "It produces gastric acid to sterilize bowel contents", "It directly controls the voluntary abdominal wall muscles", "It acts as a physical barrier against external trauma only"],
        correct: 0,
        explanation: "Surgeons termed it the 'abdominal policeman' because its mobility and fibrin exudate seal perforations (like appendicitis), preventing generalized peritonitis.",
      },
      ru: {
        prompt: "Почему большой сальник в хирургии образно называют «жандармом брюшной полости»?",
        options: ["Он подпаивается к очагам воспаления, отграничивая инфекцию от брюшины", "Он выделяет соляную кислоту для стерилизации", "Он управляет мышцами брюшного пресса", "Он служит только подушкой при падениях"],
        correct: 0,
        explanation: "Большой сальник обладает подвижностью и богатым кровотоком: он мигрирует к перфорации или воспалению, склеиваясь фибрином и изолируя перитонит.",
      },
    },
    {
      en: {
        prompt: "From which anatomical organs does the greater omentum suspend downward as an apron?",
        options: ["Greater curvature of the stomach and transverse colon", "Inferior surface of the liver and gallbladder", "Duodenum and jejunum loops", "Urinary bladder and prostate"],
        correct: 0,
        explanation: "The greater omentum hangs down like an apron from the greater curvature of the stomach and connects to the transverse colon.",
      },
      ru: {
        prompt: "От каких органов большой сальник спускается вниз в виде брюшинного фартука?",
        options: ["От большой кривизны желудка и поперечной ободочной кишки", "От нижней поверхности печени и желчного пузыря", "От петель двенадцатиперстной и тощей кишки", "От мочевого пузыря и простаты"],
        correct: 0,
        explanation: "Большой сальник начинается четырьмя листками от большой кривизны желудка и срастается с поперечной ободочной кишкой, свисая над петлями кишок.",
      },
    },
    {
      en: {
        prompt: "What are the specialized microscopic immunological macrophage clusters within the omentum called?",
        options: ["Milky spots (milky spots of Ranvier)", "Peyer patches", "Islets of Langerhans", "Hassall corpuscles"],
        correct: 0,
        explanation: "Milky spots are dense submesothelial clusters of macrophages, lymphocytes, and plasma cells that filter peritoneal fluid and fight infection.",
      },
      ru: {
        prompt: "Как называются микроскопические скопления макрофагов в ткани сальника, фильтрующие брюшинную жидкость?",
        options: ["Млечные пятна (пятна Ранвье)", "Пейеровы бляшки", "Островки Лангерганса", "Тельца Гассаля"],
        correct: 0,
        explanation: "Млечные пятна — это лимфоидные скопления макрофагов и лимфоцитов в сальнике, обеспечивающие иммунную защиту и фагоцитоз в брюшной полости.",
      },
    },
  ],
};

export const QUIZ_QUESTIONS_PER_ORGAN = 5;
