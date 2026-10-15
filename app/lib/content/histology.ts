import type { OrganId } from "../anatomy-data";

/**
 * Labeled histology for every organ: the tissue layers an introductory course
 * expects you to identify, each with a one-line description. Bilingual and
 * rendered in the lesson view as a labelled "tissue layers" list. The
 * descriptions describe real, verifiable structures (see sources in
 * `lessons.ts`); they are educational, not diagnostic.
 */
export type HistologyLayer = { name: string; detail: string };

export type BilingualHistology = {
  en: HistologyLayer[];
  ru: HistologyLayer[];
};

export const histology: Record<OrganId, BilingualHistology> = {

  stomach: {
    en: [
      { name: "Mucosa", detail: "Gastric pits leading to fundic glands: parietal, chief and mucous cells." },
      { name: "Muscularis mucosae", detail: "Thin smooth-muscle layer that wrinkles the mucosa into rugae." },
      { name: "Muscularis externa", detail: "Three layers — oblique, circular, longitudinal — enabling churning." },
    ],
    ru: [
      { name: "Слизистая оболочка", detail: "Желудочные ямки, ведущие в фундальные железы: париетальные, главные и слизистые клетки." },
      { name: "Мышечная пластинка слизистой", detail: "Тонкий слой гладких мышц, собирающий слизистую в складки." },
      { name: "Мышечная оболочка", detail: "Три слоя — косой, циркулярный, продольный — обеспечивают перемешивание." },
    ],
  },
  gallbladder: {
    en: [
      { name: "Mucosa", detail: "Tall columnar epithelium on honeycomb folds, concentrating bile by water absorption." },
      { name: "Muscularis", detail: "Thin smooth-muscle layer that expels bile when cholecystokinin triggers contraction." },
      { name: "Serosa", detail: "Peritoneal covering of the fundus and body." },
    ],
    ru: [
      { name: "Слизистая оболочка", detail: "Высокий призматический эпителий на сетчатых складках; концентрирует желчь, всасывая воду." },
      { name: "Мышечная оболочка", detail: "Тонкий слой гладких мышц, изгоняющий желчь при сокращении под действием холецистокинина." },
      { name: "Серозная оболочка", detail: "Брюшинный покров дна и тела." },
    ],
  },
  esophagus: {
    en: [
      { name: "Mucosa", detail: "Stratified squamous epithelium, resistant to friction and rapid transit." },
      { name: "Muscularis externa", detail: "Skeletal muscle in the upper third, smooth muscle in the lower third." },
      { name: "Adventitia", detail: "Connective tissue anchoring the tube to surrounding structures (no serosa)." },
    ],
    ru: [
      { name: "Слизистая оболочка", detail: "Многослойный плоский эпителий, устойчивый к трению и быстрому транзиту." },
      { name: "Мышечная оболочка", detail: "В верхней трети — скелетная мышца, в нижней — гладкая." },
      { name: "Адвентиция", detail: "Соединительная ткань, фиксирующая трубку к окружающим структурам (серозы нет)." },
    ],
  },
  tongue: {
    en: [
      { name: "Stratified squamous epithelium", detail: "Keratinised on the dorsum, with filiform, fungiform and circumvallate papillae." },
      { name: "Taste buds", detail: "Neuroepithelial clusters in the lateral walls of circumvallate and fungiform papillae." },
      { name: "Skeletal muscle", detail: "Interwoven intrinsic and extrinsic muscle bundles in three planes." },
    ],
    ru: [
      { name: "Многослойный плоский эпителий", detail: "Ороговевающий на спинке, с нитевидными, грибовидными и желобоватыми сосочками." },
      { name: "Вкусовые луковицы", detail: "Нейроэпителиальные скопления в боковых стенках желобоватых и грибовидных сосочков." },
      { name: "Скелетная мышца", detail: "Переплетённые пучки внутренних и наружных мышц в трёх плоскостях." },
    ],
  },
  spleen: {
    en: [
      { name: "Capsule and trabeculae", detail: "Fibroelastic capsule with smooth muscle sending trabeculae into the pulp." },
      { name: "White pulp", detail: "Periarteriolar lymphoid sheaths (T-cells) and follicles (B-cells)." },
      { name: "Red pulp", detail: "Cords of Billroth and venous sinusoids that filter blood and recycle iron." },
    ],
    ru: [
      { name: "Капсула и трабекулы", detail: "Фиброэластическая капсула с гладкими мышцами, отдающая трабекулы в пульпу." },
      { name: "Белая пульпа", detail: "Периартериолярные лимфоидные муфты (T-клетки) и фолликулы (B-клетки)." },
      { name: "Красная пульпа", detail: "Тяжи Бильрота и венозные синусоиды, фильтрующие кровь и возвращающие железо." },
    ],
  },
  thymus: {
    en: [
      { name: "Cortex", detail: "Dense thymocytes in a delicate epithelial network — site of positive selection." },
      { name: "Medulla", detail: "Looser thymocytes with Hassall's corpuscles (keratinised epithelial whorls)." },
      { name: "Septae", detail: "Connective tissue septa dividing the lobes into lobules." },
    ],
    ru: [
      { name: "Корковое вещество", detail: "Плотные тимоциты в нежной эпителиальной сети — место положительной селекции." },
      { name: "Мозговое вещество", detail: "Более рыхлые тимоциты с тельцами Гассаля (ороговевающие эпителиальные завитки)." },
      { name: "Перегородки", detail: "Соединительнотканные перегородки, делящие доли на дольки." },
    ],
  },
  "lymph-node": {
    en: [
      { name: "Cortex", detail: "B-cell follicles; germinal centres form during antibody responses." },
      { name: "Paracortex", detail: "T-cell zone between follicles and medulla." },
      { name: "Medulla", detail: "Medullary cords of plasma cells and macrophages between lymphatic sinuses." },
    ],
    ru: [
      { name: "Корковое вещество", detail: "Фолликулы B-клеток; при антительном ответе образуются герминативные центры." },
      { name: "Паракортикальная зона", detail: "Зона T-клеток между фолликулами и мозговым веществом." },
      { name: "Мозговое вещество", detail: "Мозговые тяжи из плазматических клеток и макрофагов между лимфатическими синусами." },
    ],
  },
  thyroid: {
    en: [
      { name: "Follicles", detail: "Spheres of follicular cells around colloid — the storage form of thyroid hormones." },
      { name: "Parafollicular (C) cells", detail: "Scattered cells between follicles that secrete calcitonin." },
      { name: "Connective stroma", detail: "Rich capillary network and lymphatics supporting the gland." },
    ],
    ru: [
      { name: "Фолликулы", detail: "Шары фолликулярных клеток вокруг коллоида — депо тиреоидных гормонов." },
      { name: "Парафолликулярные (C) клетки", detail: "Клетки между фолликулами, секретирующие кальцитонин." },
      { name: "Соединительнотканная строма", detail: "Богатая капиллярная сеть и лимфатические сосуды, питающие железу." },
    ],
  },
  adrenal: {
    en: [
      { name: "Zona glomerulosa", detail: "Outer cortex: clusters of cells secreting aldosterone." },
      { name: "Zona fasciculata", detail: "Middle cortex: cords of cells secreting cortisol." },
      { name: "Medulla", detail: "Chromaffin cells storing and releasing adrenaline and noradrenaline." },
    ],
    ru: [
      { name: "Клубочковая зона", detail: "Наружная кора: скопления клеток, секретирующих альдостерон." },
      { name: "Пучковая зона", detail: "Средняя кора: тяжи клеток, секретирующих кортизол." },
      { name: "Мозговое вещество", detail: "Хромаффинные клетки, хранящие и выделяющие адреналин и норадреналин." },
    ],
  },
  pituitary: {
    en: [
      { name: "Adenohypophysis", detail: "Anterior lobe: glandular cords of acidophilic and basophilic hormone cells." },
      { name: "Neurohypophysis", detail: "Posterior lobe: axons of hypothalamic neurons with Herring bodies." },
      { name: "Pars intermedia", detail: "Thin zone between the lobes, vestigial in humans." },
    ],
    ru: [
      { name: "Аденогипофиз", detail: "Передняя доля: железистые тяжи ацидофильных и базофильных клеток." },
      { name: "Нейрогипофиз", detail: "Задняя доля: аксоны нейронов гипоталамуса с тельцами Херринга." },
      { name: "Промежуточная часть", detail: "Тонкая зона между долями, у человека рудиментарна." },
    ],
  },
  trachea: {
    en: [
      { name: "Mucosa", detail: "Pseudostratified ciliated columnar epithelium with goblet cells." },
      { name: "Submucosa", detail: "Connective tissue with seromucous glands opening into the lumen." },
      { name: "Cartilage rings", detail: "C-shaped hyaline rings joined by the annular ligaments." },
    ],
    ru: [
      { name: "Слизистая оболочка", detail: "Многорядный реснитчатый эпителий с бокаловидными клетками." },
      { name: "Подслизистая основа", detail: "Соединительная ткань с белково-слизистыми железами, открывающимися в просвет." },
      { name: "Хрящевые кольца", detail: "C-образные кольца гиалинового хряща, соединённые кольцевыми связками." },
    ],
  },
  larynx: {
    en: [
      { name: "Vocal folds", detail: "Stratified squamous epithelium over the vocal ligament, vibrating during phonation." },
      { name: "Cartilages", detail: "Hyaline (thyroid, cricoid, arytenoid) and elastic (epiglottis) cartilage." },
      { name: "Vestibular folds", detail: "Mucosal folds above the vocal folds that help close the airway." },
    ],
    ru: [
      { name: "Голосовые складки", detail: "Многослойный плоский эпителий над голосовой связкой, колеблющийся при фонации." },
      { name: "Хрящи", detail: "Гиалиновые (щитовидный, перстневидный, черпаловидные) и эластический (надгортанник) хрящ." },
      { name: "Вестибулярные складки", detail: "Складки слизистой над голосовыми складками, участвующие в закрытии дыхательных путей." },
    ],
  },
  bladder: {
    en: [
      { name: "Urothelium", detail: "Transitional epithelium, ~6 layers when empty, thinning as the bladder distends." },
      { name: "Lamina propria", detail: "Connective tissue with a rich capillary network beneath the epithelium." },
      { name: "Detrusor muscle", detail: "Thick interlacing smooth-muscle bundles expelling urine during micturition." },
    ],
    ru: [
      { name: "Уротелий", detail: "Переходный эпителий: ~6 слоёв в пустом пузыре, утончается при растяжении." },
      { name: "Собственная пластинка", detail: "Соединительная ткань с богатой капиллярной сетью под эпителием." },
      { name: "Детрузор", detail: "Толстые переплетающиеся пучки гладких мышц, изгоняющие мочу при мочеиспускании." },
    ],
  },
  uterus: {
    en: [
      { name: "Endometrium", detail: "Functional layer (shed each cycle) and basal layer (regenerates it), with spiral arteries." },
      { name: "Myometrium", detail: "Thick smooth-muscle layer, the largest part of the wall." },
      { name: "Perimetrium", detail: "Serous covering continuous with the broad ligament." },
    ],
    ru: [
      { name: "Эндометрий", detail: "Функциональный слой (отторгается каждый цикл) и базальный слой (восстанавливает его), со спиральными артериями." },
      { name: "Миометрий", detail: "Толстый слой гладких мышц — основная часть стенки." },
      { name: "Периметрий", detail: "Серозный покров, переходящий в широкую связку матки." },
    ],
  },
  ovary: {
    en: [
      { name: "Germinal epithelium", detail: "Simple cuboidal surface epithelium (misnomer — it is mesothelium)." },
      { name: "Cortex", detail: "Follicles at every stage: primordial, primary, secondary, Graafian, corpus luteum." },
      { name: "Medulla", detail: "Loose connective tissue with the ovarian vessels and nerves." },
    ],
    ru: [
      { name: "Поверхностный эпителий", detail: "Однослойный кубический эпителий (название «зародышевый» — дань традиции, это мезотелий)." },
      { name: "Корковое вещество", detail: "Фолликулы на всех стадиях: примордиальные, первичные, вторичные, граафовы, жёлтое тело." },
      { name: "Мозговое вещество", detail: "Рыхлая соединительная ткань с яичниковыми сосудами и нервами." },
    ],
  },
  testis: {
    en: [
      { name: "Seminiferous tubules", detail: "Coiled tubules of Sertoli cells and germ cells at all stages of spermatogenesis." },
      { name: "Leydig cells", detail: "Interstitial cells between tubules that secrete testosterone." },
      { name: "Tunica albuginea", detail: "Dense fibrous capsule with septa dividing the gland into lobules." },
    ],
    ru: [
      { name: "Семенные канальцы", detail: "Извитые канальцы из клеток Сертоли и половых клеток на всех стадиях сперматогенеза." },
      { name: "Клетки Лейдига", detail: "Интерстициальные клетки между канальцами, секретирующие тестостерон." },
      { name: "Белочная оболочка", detail: "Плотная фиброзная капсула с перегородками, делящими железу на дольки." },
    ],
  },
  prostate: {
    en: [
      { name: "Glands", detail: "Tubuloalveolar glands with prostatic concretions (corpora amylacea)." },
      { name: "Fibromuscular stroma", detail: "Smooth muscle and connective tissue that contract at ejaculation." },
      { name: "Capsule", detail: "Fibrous capsule; the peripheral zone lies just beneath it." },
    ],
    ru: [
      { name: "Железы", detail: "Трубчато-альвеолярные железы с простатическими конкрециями (амилоидные тельца)." },
      { name: "Фиброзно-мышечная строма", detail: "Гладкие мышцы и соединительная ткань, сокращающиеся при эякуляции." },
      { name: "Капсула", detail: "Фиброзная капсула; прямо под ней лежит периферическая зона." },
    ],
  },
  "spinal-cord": {
    en: [
      { name: "Grey matter", detail: "H-shaped: dorsal (sensory), lateral (autonomic) and ventral (motor) horns." },
      { name: "White matter", detail: "Myelinated tracts — dorsal columns, spinothalamic, corticospinal and others." },
      { name: "Central canal", detail: "Lined by ependyma, filled with cerebrospinal fluid." },
    ],
    ru: [
      { name: "Серое вещество", detail: "H-образное: задние (чувствительные), боковые (вегетативные) и передние (двигательные) рога." },
      { name: "Белое вещество", detail: "Миелинизированные пути — задние канатики, спиноталамический, кортикоспинальный и другие." },
      { name: "Центральный канал", detail: "Выстлан эпендимой, заполнен спинномозговой жидкостью." },
    ],
  },
  diaphragm: {
    en: [
      { name: "Skeletal muscle", detail: "Radiating fibres from the periphery to the central tendon." },
      { name: "Central tendon", detail: "Aponeurotic sheet where muscle fibres converge." },
      { name: "Pleura and peritoneum", detail: "Serous membranes covering the thoracic and abdominal surfaces." },
    ],
    ru: [
      { name: "Скелетная мышца", detail: "Волокна, расходящиеся от периферии к сухожильному центру." },
      { name: "Сухожильный центр", detail: "Апоневротическая пластинка, где сходятся мышечные волокна." },
      { name: "Плевра и брюшина", detail: "Серозные оболочки, покрывающие грудную и брюшную поверхности." },
    ],
  },
  biceps: {
    en: [
      { name: "Muscle fascicles", detail: "Parallel bundles of striated fibres with strong endomysial septa." },
      { name: "Tendon", detail: "Dense regular connective tissue transmitting force to the radius." },
      { name: "Bicipital aponeurosis", detail: "Fascial expansion protecting the brachial artery and median nerve." },
    ],
    ru: [
      { name: "Мышечные пучки", detail: "Параллельные пучки поперечнополосатых волокон с прочными эндомизиальными перегородками." },
      { name: "Сухожилие", detail: "Плотная оформленная соединительная ткань, передающая усилие лучевой кости." },
      { name: "Биципитальный апоневроз", detail: "Фасциальное расширение, защищающее плечевую артерию и срединный нерв." },
    ],
  },
  femur: {
    en: [
      { name: "Periosteum", detail: "Outer fibrous membrane with osteogenic inner layer." },
      { name: "Compact bone", detail: "Thick cylinder of osteons around the medullary cavity." },
      { name: "Bone marrow", detail: "Haematopoietic red marrow in adults, mostly in the femoral head." },
    ],
    ru: [
      { name: "Надкостница", detail: "Наружная фиброзная оболочка с остеогенным внутренним слоем." },
      { name: "Компактное вещество", detail: "Толстый цилиндр остеонов вокруг костномозговой полости." },
      { name: "Костный мозг", detail: "Кроветворный красный мозг у взрослых — в основном в головке бедра." },
    ],
  },
  heart: {
    en: [
      { name: "Epicardium", detail: "Visceral pericardium — a serous layer covering the heart; carries the coronary vessels and nerves." },
      { name: "Myocardium", detail: "Cardiac muscle, thickest in the left ventricle; cells are connected by intercalated discs." },
      { name: "Endocardium", detail: "Thin endothelial lining of the chambers and the heart valves." },
    ],
    ru: [
      { name: "Эпикард", detail: "Висцеральный листок перикарда — серозный слой, покрывающий сердце; несёт венечные сосуды и нервы." },
      { name: "Миокард", detail: "Сердечная мышца, толще всего в левом желудочке; клетки соединены вставочными дисками." },
      { name: "Эндокард", detail: "Тонкая эндотелиальная выстилка камер сердца и клапанов." },
    ],
  },
  brain: {
    en: [
      { name: "Cerebral cortex (grey matter)", detail: "2–4 mm of neuron cell bodies; the neocortex has six layers." },
      { name: "White matter", detail: "Myelinated axons connecting cortical regions with each other and with deeper centres." },
      { name: "Meninges", detail: "Dura mater, arachnoid mater and pia mater, with cerebrospinal fluid in the subarachnoid space." },
    ],
    ru: [
      { name: "Кора больших полушарий (серое вещество)", detail: "2–4 мм тел нейронов; неокортекс имеет шесть слоёв." },
      { name: "Белое вещество", detail: "Миелинизированные аксоны, соединяющие области коры между собой и с глубинными центрами." },
      { name: "Мозговые оболочки", detail: "Твёрдая, паутинная и мягкая оболочки; спинномозговая жидкость — в подпаутинном пространстве." },
    ],
  },
  lungs: {
    en: [
      { name: "Visceral pleura", detail: "Serous membrane that lets the lung glide against the chest wall during breathing." },
      { name: "Alveolar epithelium", detail: "Type I pneumocytes (thin, for gas exchange) and type II pneumocytes (produce surfactant)." },
      { name: "Alveolar–capillary membrane", detail: "Fused basement membranes, 0.5–1 µm thick — the site of oxygen and CO₂ diffusion." },
    ],
    ru: [
      { name: "Висцеральная плевра", detail: "Серозная оболочка, позволяющая лёгкому скользить относительно грудной стенки при дыхании." },
      { name: "Альвеолярный эпителий", detail: "Пневмоциты I типа (тонкие, для газообмена) и II типа (вырабатывают сурфактант)." },
      { name: "Альвеолярно-капиллярная мембрана", detail: "Сросшиеся базальные мембраны толщиной 0,5–1 мкм — место диффузии кислорода и CO₂." },
    ],
  },
  liver: {
    en: [
      { name: "Glisson's capsule", detail: "Fibrous connective-tissue capsule at the surface of the organ." },
      { name: "Hepatic lobules", detail: "Plates of hepatocytes radiating from a central vein; the functional unit of the liver." },
      { name: "Sinusoids", detail: "Fenestrated capillaries lined by endothelium and Kupffer cells (macrophages)." },
      { name: "Portal triads", detail: "At the lobule corners: a branch of the portal vein, the hepatic artery and a bile duct." },
    ],
    ru: [
      { name: "Капсула Глиссона", detail: "Фиброзная соединительнотканная капсула на поверхности органа." },
      { name: "Печёночные дольки", detail: "Пластинки гепатоцитов, расходящиеся от центральной вены; функциональная единица печени." },
      { name: "Синусоиды", detail: "Фенестрированные капилляры с эндотелием и клетками Купфера (макрофагами)." },
      { name: "Портальные триады", detail: "По углам дольки: ветвь воротной вены, печёночная артерия и жёлчный проток." },
    ],
  },
  kidneys: {
    en: [
      { name: "Fibrous capsule", detail: "Collagenous sheath surrounding the kidney." },
      { name: "Renal cortex", detail: "Contains the renal corpuscles (glomerulus + Bowman's capsule) and convoluted tubules." },
      { name: "Renal medulla", detail: "Loops of Henle and collecting ducts arranged into pyramids converging on the papillae." },
      { name: "Urothelium", detail: "Transitional epithelium lining the renal pelvis and ureter." },
    ],
    ru: [
      { name: "Фиброзная капсула", detail: "Коллагеновая оболочка, окружающая почку." },
      { name: "Корковое вещество", detail: "Содержит почечные тельца (клубочек + капсула Боумена) и извитые канальцы." },
      { name: "Мозговое вещество", detail: "Петли Генле и собирательные трубочки, образующие пирамиды, сходящиеся к сосочкам." },
      { name: "Переходный эпителий", detail: "Выстилает почечную лоханку и мочеточник." },
    ],
  },
  eyeball: {
    en: [
      { name: "Sclera and cornea", detail: "The outer fibrous coat; the cornea is avascular, transparent and highly innervated." },
      { name: "Choroid", detail: "Vascular layer between sclera and retina, supplying the outer retinal layers." },
      { name: "Retina", detail: "Ten layers: retinal pigment epithelium, photoreceptors (rods and cones), bipolar and ganglion cells." },
      { name: "Lens", detail: "Avascular biconvex body of lens fibres, suspended by zonular fibres from the ciliary body." },
    ],
    ru: [
      { name: "Склера и роговица", detail: "Наружная фиброзная оболочка; роговица бессосудистая, прозрачная и богато иннервирована." },
      { name: "Сосудистая оболочка", detail: "Сосудистый слой между склерой и сетчаткой, питающий наружные слои сетчатки." },
      { name: "Сетчатка", detail: "Десять слоёв: пигментный эпителий, фоторецепторы (палочки и колбочки), биполярные и ганглиозные клетки." },
      { name: "Хрусталик", detail: "Бессосудистое двояковыпуклое тело из хрусталиковых волокон, подвешенное на цинновых связках." },
    ],
  },
  intestine: {
    en: [
      { name: "Mucosa", detail: "Villi with enterocytes and goblet cells; crypts of Lieberkühn at their bases." },
      { name: "Submucosa", detail: "Connective tissue with blood vessels and the submucosal (Meissner) nerve plexus." },
      { name: "Muscularis externa", detail: "Inner circular and outer longitudinal smooth muscle layers with the myenteric (Auerbach) plexus." },
      { name: "Serosa", detail: "Visceral peritoneum covering the free surface of the gut." },
    ],
    ru: [
      { name: "Слизистая оболочка", detail: "Ворсинки с энтероцитами и бокаловидными клетками; крипты Либеркюна у их оснований." },
      { name: "Подслизистая основа", detail: "Соединительная ткань с сосудами и подслизистым (мейснеровским) нервным сплетением." },
      { name: "Мышечная оболочка", detail: "Внутренний циркулярный и наружный продольный слои гладких мышц с межмышечным (ауэрбаховским) сплетением." },
      { name: "Серозная оболочка", detail: "Висцеральная брюшина, покрывающая свободную поверхность кишки." },
    ],
  },
  pancreas: {
    en: [
      { name: "Acini", detail: "Pyramid-shaped cells secreting digestive enzymes, stored as zymogen granules." },
      { name: "Islets of Langerhans", detail: "Endocrine clusters: α-cells (glucagon), β-cells (insulin), δ-cells (somatostatin), PP-cells." },
      { name: "Ductal system", detail: "Intercalated and intralobular ducts merging into the main pancreatic duct." },
    ],
    ru: [
      { name: "Ацинусы", detail: "Пирамидальные клетки, секретирующие пищеварительные ферменты в виде зимогенных гранул." },
      { name: "Островки Лангерганса", detail: "Эндокринные скопления: α-клетки (глюкагон), β-клетки (инсулин), δ-клетки (соматостатин), PP-клетки." },
      { name: "Протоковая система", detail: "Вставочные и внутридольковые протоки, сливающиеся в главный панкреатический проток." },
    ],
  },
  skin: {
    en: [
      { name: "Epidermis", detail: "Stratified keratinising epithelium: stratum basale, spinosum, granulosum, lucidum, corneum." },
      { name: "Dermis", detail: "Papillary layer (capillaries, Meissner corpuscles) and reticular layer (collagen, elastin, glands, follicles)." },
      { name: "Hypodermis", detail: "Adipose tissue with Pacinian corpuscles; insulates and cushions." },
    ],
    ru: [
      { name: "Эпидермис", detail: "Многослойный ороговевающий эпителий: базальный, шиповатый, зернистый, блестящий и роговой слои." },
      { name: "Дерма", detail: "Сосочковый слой (капилляры, тельца Мейснера) и сетчатый слой (коллаген, эластин, железы, фолликулы)." },
      { name: "Гиподерма", detail: "Жировая ткань с тельцами Пачини; изолирует и смягчает." },
    ],
  },
};
