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
export type SystemText = { name: string; description: string };

export type BilingualSystem = {
  id: string;
  organIds: OrganId[];
  en: SystemText;
  ru: SystemText;
  fr?: SystemText;
  es?: SystemText;
  ar?: SystemText;
  pt?: SystemText;
  [locale: string]: any;
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
    fr: {
      name: "Système cardiovasculaire",
      description:
        "Cœur, vaisseaux sanguins et sang. Deux circuits : la circulation pulmonaire assure les échanges gazeux dans les poumons, la circulation systémique apporte oxygène et nutriments à tous les tissus et élimine les déchets. Le cœur bat environ 100 000 fois par jour et propulse près de 7 000 litres de sang.",
    },
    es: {
      name: "Sistema cardiovascular",
      description:
        "Corazón, vasos sanguíneos y sangre. Dos circuitos: el circuito pulmonar intercambia gases en los pulmones, el circuito sistémico suministra oxígeno y nutrientes a todos los tejidos y elimina los desechos. El corazón late unas 100.000 veces al día, movilizando cerca de 7.000 litros de sangre.",
    },
    ar: {
      name: "الجهاز القلبي الوعائي",
      description:
        "القلب والأوعية الدموية والدم. دورتان: الدورة الرئوية لتبادل الغازات في الرئتين، والدورة الجهازية لتوصيل الأكسجين والمغذيات إلى جميع أنسجة الجسم وإزالة الفضلات. ينبض القلب نحو 100,000 مرة يومياً ويضخ قرابة 7,000 لتر من الدم.",
    },
    pt: {
      name: "Sistema cardiovascular",
      description:
        "Coração, vasos sanguíneos e sangue. Dois circuitos: o circuito pulmonar realiza trocas gasosas nos pulmões, o circuito sistêmico fornece oxigênio e nutrientes a todos os tecidos e recolhe resíduos. O coração bate cerca de 100.000 vezes ao dia, impulsionando aproximadamente 7.000 litros de sangue.",
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
    fr: {
      name: "Système respiratoire",
      description:
        "Voies aériennes (nez, pharynx, larynx, trachée, bronches) et poumons. Les échanges gazeux se font à travers la membrane alvéolo-capillaire, dont la surface de 70 à 100 m² est logée dans le thorax. Le système filtre, réchauffe et humidifie également l'air inspiré et participe à la phonation.",
    },
    es: {
      name: "Sistema respiratorio",
      description:
        "Vías respiratorias (nariz, faringe, laringe, tráquea, bronquios) y pulmones. El intercambio de gases ocurre a través de la membrana alvéolo-capilar, cuya superficie de 70 a 100 m² se aloja en el tórax. El sistema también filtra, calienta y humidifica el aire inspirado y produce la voz.",
    },
    ar: {
      name: "الجهاز التنفسي",
      description:
        "المجاري الهوائية (الأنف والبلعوم والحنجرة والقصبة الهوائية والشعب الهوائية) والرئتان. يحدث تبادل الغازات عبر الغشاء السنخي الشعري الذي تبلغ مساحته نحو 70–100 م² داخل القفص الصدري. كما يقوم الجهاز بتنقية وتدفئة وترطيب هواء الشهيق وإصدار الصوت.",
    },
    pt: {
      name: "Sistema respiratório",
      description:
        "Vias aéreas (nariz, faringe, laringe, traqueia, brônquios) e pulmões. As trocas gasosas ocorrem através da membrana alvéolo-capilar, cuja superfície de 70 a 100 m² fica acomodada no tórax. O sistema também filtra, aquece e umidifica o ar inspirado e produz a voz.",
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
    fr: {
      name: "Système digestif",
      description:
        "Tube digestif et organes annexes (foie, pancréas, vésicule biliaire). Les aliments sont décomposés mécaniquement et chimiquement ; les nutriments, l'eau et les électrolytes sont absorbés sur les 250 à 300 m² d'intestin grêle. Le foie assure plus de 500 fonctions métaboliques.",
    },
    es: {
      name: "Sistema digestivo",
      description:
        "Tracto gastrointestinal y órganos accesorios (hígado, páncreas, vesícula biliar). Los alimentos se descomponen de forma mecánica y química; los nutrientes, el agua y los electrolitos se absorben a lo largo de los 250 a 300 m² del intestino delgado. El hígado realiza más de 500 funciones metabólicas.",
    },
    ar: {
      name: "الجهاز الهضمي",
      description:
        "القناة الهضمية والأعضاء الملحقة (الكبد والبنكرياس والمرارة). يتم تفكيك الطعام ميكانيكياً وكيميائياً، وتُمتص العناصر الغذائية والماء والكهارل عبر مساحة الأمعاء الدقيقة البالغة نحو 250–300 م². ويؤدي الكبد أكثر من 500 وظيفة أيضية.",
    },
    pt: {
      name: "Sistema digestório",
      description:
        "Trato gastrointestinal e órgãos anexos (fígado, pâncreas, vesícula biliar). O alimento é processado mecânica e quimicamente; nutrientes, água e eletrólitos são absorvidos ao longo dos 250 a 300 m² do intestino delgado. O fígado desempenha mais de 500 funções metabólicas.",
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
    fr: {
      name: "Système nerveux",
      description:
        "Systèmes nerveux central (cerveau et moelle épinière) et périphérique. Le cerveau intègre les sensations, le mouvement, la mémoire et les émotions grâce à ~86 milliards de neurones ; l'influx nerveux se propage jusqu'à 120 m/s le long des axones myélinisés. Il consomme près de 20 % de l'énergie de l'organisme.",
    },
    es: {
      name: "Sistema nervioso",
      description:
        "Sistemas nerviosos central (encéfalo y médula espinal) y periférico. El encéfalo integra sensaciones, movimiento, memoria y emociones mediante unos 86 mil millones de neuronas; las señales viajan hasta a 120 m/s por axones mielinizados. Consume cerca del 20 % de la energía del organismo.",
    },
    ar: {
      name: "الجهاز العصبي",
      description:
        "الجهاز العصبي المركزي (الدماغ والحبل الشوكي) والمحيطي. يدمج الدماغ الحواس والحركة والذاكرة والمشاعر مستخدماً نحو 86 مليار خلية عصبية، وتنتقل الإشارات بسرعة تصل إلى 120 م/ث عبر المحاور العصبية الميالينية. ويستهلك الجهاز نحو 20% من طاقة الجسم.",
    },
    pt: {
      name: "Sistema nervoso",
      description:
        "Sistemas nerviosos central (encéfalo e medula espinhal) e periférico. O cérebro integra sensações, movimento, memória e emoções usando cerca de 86 bilhões de neurônios; sinais viajam a até 120 m/s ao longo de axônios mielinizados. Consome aproximadamente 20% da energia corporal.",
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
    fr: {
      name: "Système endocrinien",
      description:
        "Glandes libérant des hormones dans la circulation sanguine : axe hypothalamo-hypophysaire, thyroïde, parathyroïdes, surrénales, îlots pancréatiques, gonades. Les hormones régulent le métabolisme, la croissance, la reproduction et l'homéostasie en quelques minutes ou sur plusieurs jours.",
    },
    es: {
      name: "Sistema endocrino",
      description:
        "Glándulas que liberan hormonas al torrente sanguíneo: eje hipotálamo-hipofisario, tiroides, paratiroides, suprarrenales, islotes pancreáticos, gónadas. Las hormonas regulan el metabolismo, el crecimiento, la reproducción y la homeostasis en lapsos de minutos a días.",
    },
    ar: {
      name: "جهاز الغدد الصماء",
      description:
        "غدد تفرز الهرمونات في مجرى الدم مباشرة: المحور الوطائي النخامي، والغدة الدرقية وجارات الدرقية، والغدتان الكظريتان، وجزر البنكرياس، والغدد التناسلية. تنظم الهرمونات الأيض والنمو والتكاثر والتوازن الداخلي على مدى دقائق إلى أيام.",
    },
    pt: {
      name: "Sistema endócrino",
      description:
        "Glândulas que liberam hormônios no sangue: eixo hipotálamo-hipófise, tireoide, paratireoides, suprarrenais, ilhotas pancreáticas e gônadas. Os hormônios regulam metabolismo, crescimento, reprodução e homeostase ao longo de minutos ou dias.",
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
    fr: {
      name: "Système urinaire",
      description:
        "Reins, uretères, vessie et urètre. Les néphrons filtrent environ 180 litres de liquide par jour et en réabsorbent 99 % dans le sang, régulant avec précision le volume liquidien, les électrolytes, le pH et la pression artérielle, tout en éliminant les déchets sous forme d'urine.",
    },
    es: {
      name: "Sistema urinario",
      description:
        "Riñones, uréteres, vejiga y uretra. Las nefronas filtran unos 180 litros de líquido al día y devuelven el 99 % a la sangre, ajustando minuciosamente el volumen hídrico, los electrolitos, el pH y la presión arterial, y excretando los desechos metabólicos como orina.",
    },
    ar: {
      name: "الجهاز البولي",
      description:
        "الكليتان والحالبان والمثانة والإحليل. ترشح الكبيبات الكلوية نحو 180 لتراً من السوائل يومياً وتستعيد 99% منها إلى الدم، مع ضبط دقيق لحجم السوائل والكهارل ودرجة الحموضة وضغط الدم، وإخراج الفضلات الأيضية في البول.",
    },
    pt: {
      name: "Sistema urinário",
      description:
        "Rins, ureteres, bexiga e uretra. Os néfrons filtram cerca de 180 litros de fluido por dia e devolvem 99% ao sangue, regulando com precisão o volume hídrico, eletrólitos, pH e pressão arterial, excretando resíduos na urina.",
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
    fr: {
      name: "Système tégumentaire",
      description:
        "Peau, cheveux, ongles et glandes. La peau — le plus grand organe du corps (~2 m², 3,5 à 5 kg) — forme une barrière imperméable et autorégénérante contre les microbes, les rayons UV et les traumatismes, tout en assurant la thermorégulation et la sensibilité.",
    },
    es: {
      name: "Sistema tegumentario",
      description:
        "Piel, pelo, uñas y glándulas. La piel —el órgano más extenso del cuerpo (~2 m², 3,5–5 kg)— constituye una barrera impermeable y autorrenovable frente a microorganismos, radiación UV y traumatismos, clave en la termorregulación y el tacto.",
    },
    ar: {
      name: "الجهاز اللحافي (الجلد وملحقاته)",
      description:
        "الجلد والشعر والأظافر والغدد. يُعد الجلد أكبر عضو في الجسم (نحو 2 م² و3.5–5 كغ)، وهو حاجز مقاوم للماء ومتجدد ذاتياً ضد الميكروبات والأشعة فوق البنفسجية والإصابات، وعضو رئيسي في تنظيم الحرارة والإحساس.",
    },
    pt: {
      name: "Sistema tegumentar",
      description:
        "Pele, pelos, unhas e glândulas. A pele — o maior órgão do corpo (~2 m², 3,5–5 kg) — é uma barreira impermeável e autorrenovável contra micróbios, radiação UV e lesões, além de atuar na termorregulação e sensibilidade.",
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
    fr: {
      name: "Organes des sens",
      description:
        "Vision, ouïe, équilibre, odorat et goût. L'œil concentre la lumière sur la rétine, où ~120 millions de bâtonnets et 6 millions de cônes la convertissent en influx nerveux ; la rétine est une extension directe du système nerveux central.",
    },
    es: {
      name: "Órganos sensoriales",
      description:
        "Visión, audición, equilibrio, olfato y gusto. El ojo enfoca la luz en la retina, donde unos 120 millones de bastones y 6 millones de conos la transforman en impulsos nerviosos; la retina es una prolongación del sistema nervioso central.",
    },
    ar: {
      name: "أعضاء الحواس",
      description:
        "الرؤية والسمع والتوازن والشم والتذوق. تركز العين الضوء على الشبكية، حيث يحول نحو 120 مليون عصية و6 ملايين مخروط الضوء إلى إشارات عصبية؛ وتعد الشبكية امتداداً للجهاز العصبي المركزي.",
    },
    pt: {
      name: "Órgãos dos sentidos",
      description:
        "Visão, audição, equilíbrio, olfato e paladar. O olho foca a luz na retina, onde cerca de 120 milhões de bastonetes e 6 milhões de cones a transformam em sinais neurais; a retina é uma extensão do sistema nervoso central.",
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
    fr: {
      name: "Système musculosquelettique",
      description:
        "Os (206 chez l'adulte), articulations, muscles squelettiques et tissu conjonctif. Le squelette soutient le corps et protège les organes vitaux, les muscles génèrent le mouvement et les os servent de réserve de calcium et de siège de l'hématopoïèse.",
    },
    es: {
      name: "Sistema musculoesquelético",
      description:
        "Huesos (206 en el adulto), articulaciones, músculos esqueléticos y tejido conectivo. El esqueleto sostiene el cuerpo y protege los órganos, los músculos generan el movimiento y los huesos almacenan calcio y albergan la hematopoyesis.",
    },
    ar: {
      name: "الجهاز العضلي الهيكلي",
      description:
        "العظام (206 عظمة لدى البالغ) والمفاصل والعضلات الهيكلية والأنسجة الضامة. يدعم الهيكل العظمي الجسم ويحمي الأعضاء الداخلية، بينما تنتج العضلات الحركة، وتعمل العظام كمخزن للكالسيوم وموقع لتكوين خلايا الدم.",
    },
    pt: {
      name: "Sistema musculoesquelético",
      description:
        "Ossos (206 no adulto), articulações, músculos esqueléticos e tecido conjuntivo. O esqueleto sustenta o corpo e protege órgãos, os músculos geram movimento e os ossos servem de reserva de cálcio e local de hematopoiese.",
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
    fr: {
      name: "Système lymphatique et immunitaire",
      description:
        "Vaisseaux lymphatiques, ganglions, rate, thymus, amygdales et moelle osseuse. Il draine le liquide interstitiel vers la circulation sanguine, transporte les graisses alimentaires et défend l'organisme par l'immunité innée et adaptative.",
    },
    es: {
      name: "Sistema linfático e inmunitario",
      description:
        "Vasos linfáticos, ganglios linfáticos, bazo, timo, amígdalas y médula ósea. Drena el líquido intersticial hacia el torrente sanguíneo, transporta lípidos dietéticos y defiende el cuerpo mediante inmunidad innata y adaptativa.",
    },
    ar: {
      name: "الجهاز اللمفاوي والمناعي",
      description:
        "الأوعية اللمفاوية والعقد اللمفاوية والطحال والغدة الزعترية واللوزتان ونخاع العظم. يعيد السائل الخلالي إلى مجرى الدم، وينقل الدهون الغذائية، ويدافع عن الجسم بالمناعة الفطرية والتكيفية.",
    },
    pt: {
      name: "Sistema linfático e imunológico",
      description:
        "Vasos linfáticos, linfonodos, baço, timo, amígdalas e medula óssea. Retorna fluido intersticial à corrente sanguínea, transporta gorduras da dieta e defende o organismo com imunidade inata e adaptativa.",
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
    fr: {
      name: "Système reproducteur",
      description:
        "Gonades, voies génitales et glandes annexes. Le système reproducteur produit les gamètes et les hormones sexuelles, assure la fécondation et la gestation, et orchestre le développement sexuel dès la puberté.",
    },
    es: {
      name: "Sistema reproductor",
      description:
        "Gónadas, vías genitales y glándulas accesorias. El sistema reproductor genera gametos y hormonas, sustenta la fecundación y la gestación, y dirige el desarrollo sexual desde la pubertad.",
    },
    ar: {
      name: "الجهاز التناسلي",
      description:
        "المناسل والقنوات التناسلية والغدد الملحقة. ينتج الجهاز التناسلي الأمشاج والهرمونات، ويدعم الإخصاب والحمل، ويوجه التطور الجنسي بدءاً من سن البلوغ.",
    },
    pt: {
      name: "Sistema reprodutor",
      description:
        "Gônadas, vias genitais e glândulas anexas. Produz gametas e hormônios, possibilita a fecundação e a gestação, e orienta o desenvolvimento sexual desde a puberdade.",
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
    fr: {
      name: "Système squelettique",
      description:
        "Les 206 os du squelette adulte — axial (crâne, colonne vertébrale, cage thoracique) et appendiculaire (membres et ceintures) — unis par des articulations et des cartilages. Il protège le cerveau, la moelle épinière et les viscères thoraciques.",
    },
    es: {
      name: "Sistema esquelético",
      description:
        "Los 206 huesos del esqueleto adulto —axial (cráneo, columna vertebral, caja torácica) y apendicular (miembros y cinturas)— unidos por articulaciones y cartílagos. Protege el encéfalo, la médula espinal y los órganos torácicos.",
    },
    ar: {
      name: "الجهاز الهيكلي",
      description:
        "206 عظمة يتألف منها الهيكل العظمي للبالغ — محوري (الجمجمة والعمود الفقري والقفص الصدري) وطرفي (الأطراف والأحزمة الحوضية والصدرية) — متصلة بمفاصل وغضاريف. يحمي الدماغ والنخاع الشوكي وأعضاء الصدر.",
    },
    pt: {
      name: "Sistema esquelético",
      description:
        "Os 206 ossos do esqueleto adulto — axial (crânio, coluna vertebral, caixa torácica) e apendicular (membros e cinturas) — conectados por articulações e cartilagens. Protege encéfalo, medula espinhal e órgãos torácicos.",
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
