import type { OrganId } from "../anatomy-data";

/**
 * The twelve organ systems of the human body (following the standard
 * division used in Terminologia Anatomica and anatomy textbooks).
 *
 * `organIds` lists which of the site's interactive models belong to the
 * system. Systems without models are still listed — with an explicit
 * "coming soon" note — so the Systems view is an honest overview of the
 * body rather than a list of what happens to be modelled.
 */
export type BilingualSystem = {
  id: string;
  organIds: OrganId[];
  en: { name: string; description: string };
  ru: { name: string; description: string };
};

export const bodySystems: BilingualSystem[] = [
  {
    id: "cardiovascular",
    organIds: ["heart"],
    en: {
      name: "Cardiovascular system",
      description:
        "Heart, blood vessels and blood. Two circuits: the pulmonary circuit exchanges gases in the lungs, the systemic circuit delivers oxygen and nutrients to every tissue and removes waste. The heart beats ~100,000 times a day, moving about 7,000 litres of blood.",
    },
    ru: {
      name: "Сердечно-сосудистая система",
      description:
        "Сердце, сосуды и кровь. Два круга кровообращения: малый — газообмен в лёгких, большой — доставка кислорода и питательных веществ всем тканям и удаление продуктов обмена. Сердце сокращается около 100 000 раз в сутки, перекачивая примерно 7 000 литров крови.",
    },
  },
  {
    id: "respiratory",
    organIds: ["lungs", "trachea", "larynx"],
    en: {
      name: "Respiratory system",
      description:
        "Airways (nose, pharynx, larynx, trachea, bronchi) and the lungs. Gas exchange occurs across the alveolar–capillary membrane, whose ~70–100 m² surface is packed into the chest. The system also filters, warms and humidifies inspired air and produces voice.",
    },
    ru: {
      name: "Дыхательная система",
      description:
        "Воздухоносные пути (нос, глотка, гортань, трахея, бронхи) и лёгкие. Газообмен идёт через альвеолярно-капиллярную мембрану, поверхность которой около 70–100 м² упакована в грудную клетку. Система также очищает, согревает и увлажняет вдыхаемый воздух и участвует в голосообразовании.",
    },
  },
  {
    id: "digestive",
    organIds: ["liver", "intestine", "pancreas", "stomach", "gallbladder", "esophagus", "tongue"],
    en: {
      name: "Digestive system",
      description:
        "Gastrointestinal tract and accessory organs (liver, pancreas, gallbladder). Food is broken down mechanically and chemically, and nutrients, water and electrolytes are absorbed across the ~250–300 m² surface of the small intestine. The liver performs over 500 metabolic functions.",
    },
    ru: {
      name: "Пищеварительная система",
      description:
        "Желудочно-кишечный тракт и придаточные органы (печень, поджелудочная железа, жёлчный пузырь). Пища расщепляется механически и химически; питательные вещества, вода и электролиты всасываются через поверхность тонкой кишки около 250–300 м². Печень выполняет более 500 метаболических функций.",
    },
  },
  {
    id: "nervous",
    organIds: ["brain", "spinal-cord"],
    en: {
      name: "Nervous system",
      description:
        "Central (brain and spinal cord) and peripheral nervous systems. The brain integrates sensation, movement, memory and emotion using ~86 billion neurons; signals travel at up to ~120 m/s along myelinated axons. The system consumes about 20% of the body's energy.",
    },
    ru: {
      name: "Нервная система",
      description:
        "Центральная (головной и спинной мозг) и периферическая нервная система. Головной мозг интегрирует ощущения, движение, память и эмоции с помощью примерно 86 миллиардов нейронов; сигналы по миелинизированным аксонам идут со скоростью до ~120 м/с. Система потребляет около 20% энергии организма.",
    },
  },
  {
    id: "endocrine",
    organIds: ["pancreas", "thyroid", "adrenal", "pituitary"],
    en: {
      name: "Endocrine system",
      description:
        "Glands that release hormones into the blood: hypothalamus–pituitary axis, thyroid, parathyroids, adrenal glands, pancreatic islets, gonads. Hormones regulate metabolism, growth, reproduction and homeostasis over minutes to days.",
    },
    ru: {
      name: "Эндокринная система",
      description:
        "Железы, выделяющие гормоны в кровь: гипоталамо-гипофизарная ось, щитовидная и паращитовидные железы, надпочечники, островки поджелудочной железы, половые железы. Гормоны регулируют обмен веществ, рост, размножение и гомеостаз в масштабе минут и дней.",
    },
  },
  {
    id: "urinary",
    organIds: ["kidneys", "bladder"],
    en: {
      name: "Urinary system",
      description:
        "Kidneys, ureters, bladder and urethra. Nephrons filter about 180 litres of fluid daily and return 99% to the blood, fine-tuning fluid volume, electrolytes, pH and blood pressure, and excreting metabolic waste as urine.",
    },
    ru: {
      name: "Мочевыделительная система",
      description:
        "Почки, мочеточники, мочевой пузырь и мочеиспускательный канал. Нефроны фильтруют около 180 литров жидкости в сутки и возвращают 99% в кровь, тонко регулируя объём жидкости, электролиты, pH и артериальное давление и выводя продукты обмена с мочой.",
    },
  },
  {
    id: "integumentary",
    organIds: ["skin"],
    en: {
      name: "Integumentary system",
      description:
        "Skin, hair, nails and glands. The skin — the body's largest organ (~2 m², 3.5–5 kg) — is a waterproof, self-renewing barrier against microbes, UV and injury, and a key organ of thermoregulation and sensation.",
    },
    ru: {
      name: "Покровная система",
      description:
        "Кожа, волосы, ногти и железы. Кожа — самый большой орган тела (около 2 м², 3,5–5 кг) — водонепроницаемый, постоянно обновляющийся барьер против микробов, УФ-излучения и повреждений, а также важный орган терморегуляции и чувствительности.",
    },
  },
  {
    id: "sensory",
    organIds: ["eyeball"],
    en: {
      name: "Sensory organs",
      description:
        "Vision, hearing, balance, smell and taste. The eye focuses light onto the retina, where ~120 million rods and 6 million cones convert it into neural signals; the retina is an outgrowth of the central nervous system.",
    },
    ru: {
      name: "Органы чувств",
      description:
        "Зрение, слух, равновесие, обоняние и вкус. Глаз фокусирует свет на сетчатке, где около 120 млн палочек и 6 млн колбочек преобразуют его в нервные сигналы; сетчатка — вырост центральной нервной системы.",
    },
  },
  {
    id: "musculoskeletal",
    organIds: ["diaphragm", "biceps"],
    en: {
      name: "Musculoskeletal system",
      description:
        "Bones (206 in the adult), joints, skeletal muscles and connective tissue. The skeleton supports the body and protects organs, muscles produce movement, and bones act as a calcium reservoir and the site of haematopoiesis.",
    },
    ru: {
      name: "Опорно-двигательная система",
      description:
        "Кости (206 у взрослого), суставы, скелетные мышцы и соединительная ткань. Скелет поддерживает тело и защищает органы, мышцы обеспечивают движение, а кости служат резервуаром кальция и местом кроветворения.",
    },
  },
  {
    id: "lymphatic",
    organIds: ["spleen", "thymus", "lymph-node"],
    en: {
      name: "Lymphatic & immune system",
      description:
        "Lymphatic vessels, lymph nodes, spleen, thymus, tonsils and bone marrow. It returns interstitial fluid to the bloodstream, transports dietary fats, and defends the body with innate and adaptive immunity.",
    },
    ru: {
      name: "Лимфатическая и иммунная система",
      description:
        "Лимфатические сосуды, лимфатические узлы, селезёнка, тимус, миндалины и костный мозг. Система возвращает тканевую жидкость в кровоток, транспортирует пищевые жиры и защищает организм врождённым и адаптивным иммунитетом.",
    },
  },
  {
    id: "reproductive",
    organIds: ["uterus", "ovary", "testis", "prostate"],
    en: {
      name: "Reproductive system",
      description:
        "Gonads, genital tract and accessory glands. The reproductive system produces gametes and hormones, supports fertilisation and gestation, and drives sexual development from puberty.",
    },
    ru: {
      name: "Репродуктивная система",
      description:
        "Половые железы, половые пути и придаточные железы. Репродуктивная система производит гаметы и гормоны, обеспечивает оплодотворение и вынашивание беременности и определяет половое развитие с пубертата.",
    },
  },
  {
    id: "skeletal",
    organIds: ["femur"],
    en: {
      name: "Skeletal system",
      description:
        "The 206 bones of the adult skeleton — axial (skull, vertebral column, ribcage) and appendicular (limbs and girdles) — joined by joints and cartilages. It protects the brain, spinal cord and thoracic organs.",
    },
    ru: {
      name: "Скелетная система",
      description:
        "206 костей скелета взрослого человека — осевой (череп, позвоночный столб, грудная клетка) и добавочный (конечности и пояса) — соединённых суставами и хрящами. Скелет защищает головной мозг, спинной мозг и органы грудной клетки.",
    },
  },
];

export const systemById = Object.fromEntries(bodySystems.map((system) => [system.id, system])) as Record<
  string,
  BilingualSystem
>;

/** Primary system of each modelled organ (used to preselect a system when the
 *  Systems view is opened). For organs that span two systems (e.g. pancreas —
 *  digestive and endocrine) the primary one is chosen. */
export const systemForOrgan: Record<OrganId, string> = {
  heart: "cardiovascular",
  brain: "nervous",
  lungs: "respiratory",
  liver: "digestive",
  kidneys: "urinary",
  eyeball: "sensory",
  intestine: "digestive",
  pancreas: "digestive",
  skin: "integumentary",
  stomach: "digestive",
  gallbladder: "digestive",
  esophagus: "digestive",
  tongue: "digestive",
  spleen: "lymphatic",
  thymus: "lymphatic",
  "lymph-node": "lymphatic",
  thyroid: "endocrine",
  adrenal: "endocrine",
  pituitary: "endocrine",
  trachea: "respiratory",
  larynx: "respiratory",
  bladder: "urinary",
  uterus: "reproductive",
  ovary: "reproductive",
  testis: "reproductive",
  prostate: "reproductive",
  "spinal-cord": "nervous",
  diaphragm: "musculoskeletal",
  biceps: "musculoskeletal",
  femur: "skeletal",
};
