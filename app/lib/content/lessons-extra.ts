import type { OrganId } from "../anatomy-data";
import type { BilingualLesson } from "./lessons";

/** Concise but complete lessons for the extended organ set (see lessons.ts
 *  for the template and the sources used). */
export const lessonsExtra: Partial<Record<OrganId, BilingualLesson>> = {
  stomach: {
    en: {
      objectives: [
        "Describe the regions of the stomach and their functions",
        "Explain gastric juice secretion and its regulation",
        "Outline the main diseases of the stomach",
      ],
      structure:
        "The stomach is a J-shaped muscular pouch of ~25 cm connecting the esophagus and duodenum. Its regions are the cardia (entry), fundus (dome), body (main reservoir), and pyloric antrum ending at the pyloric sphincter. The wall has an extra oblique muscle layer, and the mucosa is thrown into rugae that flatten as the organ stretches. Fundic glands contain parietal cells (HCl, intrinsic factor), chief cells (pepsinogen), and mucous cells.",
      function:
        "The stomach stores food and releases it gradually into the duodenum. Parietal cells secrete hydrochloric acid, which kills microbes and activates pepsinogen into pepsin to begin protein digestion; intrinsic factor enables B₁₂ absorption. The pyloric sphincter meters chyme into the intestine, and the vagus nerve plus gastrin drive secretion while the duodenum brakes it via cholecystokinin and secretin. Empty, it contracts in hunger waves; full, it holds 1–1.5 L.",
      clinical: [
        "Peptic ulcer disease is usually caused by Helicobacter pylori or NSAIDs; H. pylori eradication heals most ulcers.",
        "Gastric cancer is linked to H. pylori, smoking and diet; early detection dramatically improves outcomes.",
        "GERD and gastroparesis impair the pyloric/esophageal function, causing reflux or delayed emptying.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать отделы желудка и их функции",
        "Объяснить секрецию желудочного сока и её регуляцию",
        "Перечислить основные заболевания желудка",
      ],
      structure:
        "Желудок — J-образный мышечный мешок около 25 см, соединяющий пищевод и двенадцатиперстную кишку. Его отделы: кардия (вход), дно (купол), тело (основной резервуар) и пилорический отдел, заканчивающийся привратником. В стенке есть дополнительный косой мышечный слой, а слизистая собрана в складки, расправляющиеся при растяжении. Фундальные железы содержат париетальные клетки (HCl, внутренний фактор), главные клетки (пепсиноген) и слизистые клетки.",
      function:
        "Желудок хранит пищу и постепенно выпускает её в двенадцатиперстную кишку. Париетальные клетки выделяют соляную кислоту, которая убивает микробов и активирует пепсиноген в пепсин, начиная расщепление белков; внутренний фактор обеспечивает всасывание B₁₂. Привратник порциями пропускает химус в кишечник; секрецию запускают блуждающий нерв и гастрин, а тормозят холецистокинин и секретин из двенадцатиперстной кишки. Пустой желудок сокращается «голодными волнами», полный вмещает 1–1,5 л.",
      clinical: [
        "Язвенную болезнь обычно вызывают Helicobacter pylori или НПВП; эрадикация H. pylori залечивает большинство язв.",
        "Рак желудка связан с H. pylori, курением и диетой; раннее выявление резко улучшает прогноз.",
        "ГЭРБ и гастропарез нарушают функцию привратника и пищевода, вызывая рефлюкс или замедленное опорожнение.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  gallbladder: {
    en: {
      objectives: [
        "Describe the anatomy of the gallbladder and biliary tree",
        "Explain bile storage, concentration and release",
        "Recognise the main gallbladder disorders",
      ],
      structure:
        "The gallbladder is a pear-shaped sac (7–10 cm) on the underside of the liver, with fundus, body and neck continuing into the cystic duct. The cystic duct joins the common hepatic duct to form the common bile duct, which meets the pancreatic duct at the hepatopancreatic ampulla opening into the duodenum. Its mucosa forms honeycomb-like folds; the wall has a thin muscle layer that expels bile on demand.",
      function:
        "Between meals the gallbladder stores and concentrates bile up to 10-fold by absorbing water. When fat reaches the duodenum, cholecystokinin makes the gallbladder contract and the sphincter of Oddi relax, delivering bile that emulsifies fat for pancreatic lipase. Bile salts are reabsorbed in the ileum and recycled to the liver (enterohepatic circulation).",
      clinical: [
        "Gallstones (cholesterol or pigment) can obstruct the cystic duct, causing biliary colic and cholecystitis.",
        "Cholecystectomy is the standard treatment; bile then flows directly from the liver.",
        "Gallstone pancreatitis occurs when a stone blocks the shared ampulla with the pancreatic duct.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать анатомию жёлчного пузыря и жёлчных путей",
        "Объяснить хранение, концентрацию и выделение желчи",
        "Распознавать основные заболевания жёлчного пузыря",
      ],
      structure:
        "Жёлчный пузырь — грушевидный мешок (7–10 см) на нижней поверхности печени, с дном, телом и шейкой, переходящей в пузырный проток. Пузырный проток соединяется с общим печёночным протоком в общий жёлчный проток, который встречается с панкреатическим протоком в печёночно-поджелудочной ампуле, открывающейся в двенадцатиперстную кишку. Слизистая образует сетчатые складки; в стенке есть тонкий мышечный слой, изгоняющий желчь по требованию.",
      function:
        "Между приёмами пищи пузырь хранит желчь и концентрирует её до 10 раз, всасывая воду. Когда жир попадает в двенадцатиперстную кишку, холецистокинин сокращает пузырь и расслабляет сфинктер Одди, и желчь эмульгирует жиры для панкреатической липазы. Жёлчные кислоты всасываются в подвздошной кишке и возвращаются в печень (печёночно-кишечная циркуляция).",
      clinical: [
        "Жёлчные камни (холестериновые или пигментные) могут закупорить пузырный проток, вызывая колику и холецистит.",
        "Холецистэктомия — стандартное лечение; затем желчь поступает прямо из печени.",
        "Билиарный панкреатит возникает, когда камень блокирует общую ампулу с панкреатическим протоком.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  esophagus: {
    en: {
      objectives: [
        "Describe the three parts of the esophagus and its sphincters",
        "Explain peristalsis and swallowing coordination",
        "Outline reflux disease and its complications",
      ],
      structure:
        "The esophagus is a 25 cm muscular tube from the pharynx to the stomach, passing through the neck, chest and the esophageal hiatus of the diaphragm. It has three narrowings (cricoid, aortic/bronchial, diaphragmatic) relevant for strictures and foreign bodies. The upper third is skeletal muscle, the middle mixed, the lower third smooth muscle; the upper and lower esophageal sphincters guard both ends.",
      function:
        "Swallowing is a reflex: the upper sphincter relaxes, the bolus is propelled by peristaltic waves (~2 s), and the lower sphincter opens to admit it into the stomach, then closes to prevent reflux. The mucosa resists friction and, at the lower end, its junction with gastric epithelium is where Barrett's changes can develop.",
      clinical: [
        "GERD results from a weak lower sphincter; chronic acid exposure can cause erosions, strictures and Barrett's esophagus.",
        "Achalasia — failed lower-sphincter relaxation — causes dysphagia and a dilated esophagus.",
        "Esophageal cancer (squamous or adenocarcinoma) is strongly linked to smoking, alcohol and reflux.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать три отдела пищевода и его сфинктеры",
        "Объяснить перистальтику и координацию глотания",
        "Рассмотреть рефлюксную болезнь и её осложнения",
      ],
      structure:
        "Пищевод — мышечная трубка 25 см от глотки до желудка, проходящая через шею, грудную клетку и пищеводное отверстие диафрагмы. У него три сужения (перстневидное, аортально-бронхиальное, диафрагмальное), значимые для стриктур и инородных тел. Верхняя треть — скелетная мышца, средняя — смешанная, нижняя — гладкая; верхний и нижний пищеводные сфинктеры охраняют оба конца.",
      function:
        "Глотание — рефлекс: верхний сфинктер расслабляется, пищевой комок продвигается перистальтическими волнами (~2 с), нижний сфинктер открывается, пропуская его в желудок, и закрывается, предотвращая рефлюкс. Слизистая устойчива к трению, а на границе с желудочным эпителием внизу возможно развитие пищевода Барретта.",
      clinical: [
        "ГЭРБ возникает из-за слабости нижнего сфинктера; хроническое воздействие кислоты ведёт к эрозиям, стриктурам и пищеводу Барретта.",
        "Ахалазия — нерасслабление нижнего сфинктера — вызывает дисфагию и расширение пищевода.",
        "Рак пищевода (плоскоклеточный или аденокарцинома) тесно связан с курением, алкоголем и рефлюксом.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
  },
  tongue: {
    en: {
      objectives: [
        "Describe the muscles of the tongue and its innervation",
        "Explain the structure and function of the papillae",
        "Outline common tongue disorders",
      ],
      structure:
        "The tongue is a muscular organ of the oral cavity divided into the oral part (body) and pharyngeal part (root). Intrinsic muscles shape it; extrinsic muscles (genioglossus, hyoglossus, styloglossus, palatoglossus) move it. The dorsum is covered by filiform, fungiform, circumvallate and foliate papillae; taste buds sit mainly in the fungiform and circumvallate. Motor supply is CN XII, taste is CN VII (anterior ⅔) and CN IX (posterior ⅓).",
      function:
        "The tongue manipulates food, mixes it with saliva, initiates swallowing and is essential for articulation. Taste buds detect sweet, salty, sour, bitter and umami, transmitting via cranial nerves VII and IX to the gustatory cortex. The tongue also cleans the teeth and, with its rich lymphatic drainage, is a sentinel for infections and tumours.",
      clinical: [
        "Ankyloglossia ('tongue-tie') restricts movement and may impair feeding and speech.",
        "Leukoplakia, ulcers and persistent lumps need evaluation — oral cancer risk is high with smoking and alcohol.",
        "CN XII palsy makes the tongue deviate towards the paralysed side on protrusion.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать мышцы языка и его иннервацию",
        "Объяснить строение и функцию сосочков",
        "Перечислить частые заболевания языка",
      ],
      structure:
        "Язык — мышечный орган ротовой полости, разделяемый на ротовую часть (тело) и глоточную часть (корень). Внутренние мышцы придают ему форму; наружные (подбородочно-язычная, подъязычно-язычная, шилоязычная, нёбно-язычная) двигают его. Спинка покрыта нитевидными, грибовидными, желобоватыми и листовидными сосочками; вкусовые луковицы — в основном в грибовидных и желобоватых. Двигательная иннервация — XII пара ЧН, вкус — VII (передние ⅔) и IX (задняя треть).",
      function:
        "Язык перемешивает пищу со слюной, запускает глотание и необходим для артикуляции. Вкусовые луковицы различают сладкое, солёное, кислое, горькое и умами, передавая сигналы через VII и IX пары в кору. Язык также очищает зубы и, благодаря богатому лимфооттоку, служит «стражем» инфекций и опухолей.",
      clinical: [
        "Анкилоглоссия («короткая уздечка») ограничивает движения и может мешать кормлению и речи.",
        "Лейкоплакия, язвы и стойкие уплотнения требуют обследования — риск рака полости рта высок при курении и алкоголе.",
        "При параличе XII пары язык при высовывании отклоняется в парализованную сторону.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
  },
  spleen: {
    en: {
      objectives: [
        "Describe the structure of the spleen and its blood supply",
        "Explain the functions of red and white pulp",
        "Discuss the consequences of splenectomy",
      ],
      structure:
        "The spleen (150–200 g) lies in the left hypochondrium under the diaphragm, wrapped in a capsule. Its hilum transmits the splenic artery and vein. Inside, red pulp (cords and sinusoids filtering blood) and white pulp (periarteriolar lymphoid sheaths and follicles, the immune part) are interspersed. It is intraperitoneal but develops in the dorsal mesogastrium, so its ligaments (gastrosplenic, splenorenal) carry its vessels.",
      function:
        "Red pulp removes old or damaged red cells, platelets and debris, and recycles iron; it also stores blood elements and can act as a reservoir. White pulp mounts immune responses to blood-borne pathogens — it is the largest lymphoid organ. During fetal life the spleen produces blood cells; after birth this function moves to the bone marrow.",
      clinical: [
        "Splenic rupture from blunt trauma causes life-threatening haemorrhage; splenectomy may be needed.",
        "Asplenia raises the risk of sepsis from encapsulated bacteria — vaccination and prophylaxis are essential.",
        "Splenomegaly occurs in infections (mononucleosis, malaria), haemolytic anaemias and portal hypertension.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать строение селезёнки и её кровоснабжение",
        "Объяснить функции красной и белой пульпы",
        "Обсудить последствия спленэктомии",
      ],
      structure:
        "Селезёнка (150–200 г) лежит в левом подреберье под диафрагмой, покрытая капсулой. Через ворота проходят селезёночные артерия и вена. Внутри чередуются красная пульпа (тяжи и синусоиды, фильтрующие кровь) и белая пульпа (периартериолярные лимфоидные муфты и фолликулы — иммунная часть). Она внутрибрюшинная, но развивается в дорсальной брыжейке, поэтому её связки (желудочно-селезёночная, селезёночно-почечная) несут её сосуды.",
      function:
        "Красная пульпа удаляет состарившиеся или повреждённые эритроциты, тромбоциты и обломки и возвращает железо; она также хранит форменные элементы крови. Белая пульпа организует иммунный ответ на возбудителей в крови — селезёнка крупнейший лимфоидный орган. Во внутриутробном периоде селезёнка производит клетки крови; после рождения эту функцию берёт костный мозг.",
      clinical: [
        "Разрыв селезёнки при тупой травме вызывает опасное кровотечение; может потребоваться спленэктомия.",
        "Аспления повышает риск сепсиса от инкапсулированных бактерий — обязательны вакцинация и профилактика.",
        "Спленомегалия бывает при инфекциях (мононуклеоз, малярия), гемолитических анемиях и портальной гипертензии.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
      ],
    },
  },
  thymus: {
    en: {
      objectives: [
        "Describe the location and structure of the thymus",
        "Explain T-cell selection in the thymus",
        "Discuss thymic disorders and involution",
      ],
      structure:
        "The thymus lies in the anterior mediastinum behind the sternum, with two lobes united by connective tissue. Each lobe has a cortex (dense thymocytes) and a medulla (with Hassall's corpuscles). The thymus is largest in childhood (20–40 g) and undergoes age-related involution, with lymphoid tissue progressively replaced by fat.",
      function:
        "Bone-marrow precursors enter the cortex as thymocytes and develop into T-cells. Positive selection keeps cells able to recognise self-MHC; negative selection eliminates those that react to self-antigens, preventing autoimmunity. Mature T-cells then seed the peripheral lymphoid organs. The thymus also produces hormones such as thymosin that support T-cell maturation.",
      clinical: [
        "DiGeorge syndrome (thymic aplasia) causes T-cell deficiency and susceptibility to infection.",
        "Myasthenia gravis is associated with thymic hyperplasia or thymoma and improves after thymectomy in many patients.",
        "Thymoma is a rare mediastinal tumour often found incidentally on imaging.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать расположение и строение тимуса",
        "Объяснить селекцию T-клеток в тимусе",
        "Обсудить заболевания тимуса и инволюцию",
      ],
      structure:
        "Тимус лежит в переднем средостении за грудиной, состоит из двух долей, соединённых соединительной тканью. В каждой доле — корковое вещество (плотные тимоциты) и мозговое (с тельцами Гассаля). Тимус максимален в детстве (20–40 г) и с возрастом подвергается инволюции: лимфоидная ткань постепенно замещается жиром.",
      function:
        "Предшественники из костного мозга входят в кору как тимоциты и развиваются в T-клетки. Положительная селекция сохраняет клетки, способные распознавать собственные молекулы MHC; отрицательная уничтожает клетки, реагирующие на собственные антигены, предотвращая аутоиммунитет. Зрелые T-клетки заселяют периферические лимфоидные органы. Тимус также вырабатывает гормоны (тимозин), поддерживающие созревание T-клеток.",
      clinical: [
        "Синдром Ди Джорджи (аплазия тимуса) вызывает дефицит T-клеток и восприимчивость к инфекциям.",
        "Миастения гравис связана с гиперплазией тимуса или тимомой; у многих пациентов улучшение наступает после тимэктомии.",
        "Тимома — редкая опухоль средостения, часто обнаруживается случайно при лучевой диагностике.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
      ],
    },
  },
  "lymph-node": {
    en: {
      objectives: [
        "Describe the structure of a lymph node",
        "Explain how lymph is filtered and immune responses start",
        "Recognise the significance of enlarged nodes",
      ],
      structure:
        "A lymph node is a bean-shaped organ (1–25 mm) along lymphatic vessels, with a fibrous capsule, afferent vessels entering the convex surface and efferent vessels leaving at the hilum. Beneath the capsule lies the cortex with B-cell follicles, the paracortex with T-cells, and the medulla with cords and sinuses. Reticular fibres form a mesh that slows lymph flow, maximising contact with immune cells.",
      function:
        "Lymph percolates through sinuses, where macrophages phagocytose pathogens and dendritic cells present antigens to lymphocytes, launching antibody and cellular responses. Nodes thus filter ~several litres of lymph daily and are the first place immune responses to tissue infections are organised. They also serve as staging sites for cancer spread.",
      clinical: [
        "Reactive lymphadenitis — painful, enlarged nodes during infections — is the most common cause of lymphadenopathy.",
        "Persistent, rubbery or matted nodes raise suspicion of lymphoma, metastases or tuberculosis.",
        "Sentinel node biopsy determines whether a cancer has spread to the draining node basin.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать строение лимфатического узла",
        "Объяснить фильтрацию лимфы и начало иммунного ответа",
        "Оценивать значение увеличенных узлов",
      ],
      structure:
        "Лимфатический узел — бобовидный орган (1–25 мм) на пути лимфатических сосудов: фиброзная капсула, приносящие сосуды на выпуклой поверхности и выносящие — в воротах. Под капсулой — корковое вещество с фолликулами B-клеток, паракортикальная зона с T-клетками и мозговое вещество с тяжами и синусами. Сеть ретикулярных волокон замедляет ток лимфы, усиливая контакт с иммунными клетками.",
      function:
        "Лимфа просачивается через синусы, где макрофаги фагоцитируют возбудителей, а дендритные клетки представляют антигены лимфоцитам, запуская гуморальный и клеточный ответ. Узлы фильтруют несколько литров лимфы в сутки и первыми организуют иммунный ответ на тканевые инфекции. Они также служат «этапами» распространения рака.",
      clinical: [
        "Реактивный лимфаденит — болезненные увеличенные узлы при инфекциях — самая частая причина лимфаденопатии.",
        "Стойкие, плотные или спаянные узлы подозрительны на лимфому, метастазы или туберкулёз.",
        "Биопсия сторожевого узла определяет, распространился ли рак в регионарные узлы.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Ross M.H., Pawlina W. Histology: A Text and Atlas. 8th ed. Wolters Kluwer, 2020.",
      ],
    },
  },
  thyroid: {
    en: {
      objectives: [
        "Describe the anatomy of the thyroid gland",
        "Explain thyroid hormone synthesis and regulation",
        "Outline hyperthyroidism and hypothyroidism",
      ],
      structure:
        "The thyroid gland (15–25 g) is butterfly-shaped in the front of the neck, with right and left lobes joined by an isthmus over the trachea, below the thyroid cartilage. It is enveloped by the pretracheal fascia and lies on the recurrent laryngeal nerves (which must be spared in surgery). Histologically it is built of follicles — spheres of follicular cells surrounding colloid, where thyroid hormones are stored.",
      function:
        "Follicular cells take up iodine and synthesize thyroxine (T4) and triiodothyronine (T3), stored in colloid and released under TSH control. T3/T4 raise the metabolic rate of nearly every cell — heat production, heart rate, growth and brain development in children. Parafollicular (C) cells secrete calcitonin, lowering blood calcium.",
      clinical: [
        "Hypothyroidism (fatigue, weight gain, cold intolerance) is usually autoimmune (Hashimoto's); treated with levothyroxine.",
        "Hyperthyroidism (weight loss, tremor, palpitations) — Graves' disease is the most common cause.",
        "Thyroid nodules are common; ultrasound and cytology (FNA) distinguish benign nodules from cancer.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать анатомию щитовидной железы",
        "Объяснить синтез и регуляцию тиреоидных гормонов",
        "Рассмотреть гипертиреоз и гипотиреоз",
      ],
      structure:
        "Щитовидная железа (15–25 г) бабочковидной формы расположена на передней поверхности шеи: правая и левая доли соединены перешейком над трахеей, ниже щитовидного хряща. Она покрыта предтрахеальной фасцией и лежит на возвратных гортанных нервах (их берегут при операциях). Гистологически железа состоит из фолликулов — шаров фолликулярных клеток вокруг коллоида, где хранятся тиреоидные гормоны.",
      function:
        "Фолликулярные клетки захватывают йод и синтезируют тироксин (T4) и трийодтиронин (T3), запасаемые в коллоиде и выделяемые под контролем ТТГ. T3/T4 повышают обмен веществ почти каждой клетки — теплопродукцию, частоту сердечных сокращений, рост и развитие мозга у детей. Парафолликулярные (C) клетки секретируют кальцитонин, снижающий уровень кальция в крови.",
      clinical: [
        "Гипотиреоз (слабость, набор веса, зябкость) обычно аутоиммунный (Хашимото); лечится левотироксином.",
        "Гипертиреоз (похудание, тремор, сердцебиение) — чаще всего болезнь Грейвса.",
        "Узлы щитовидной железы часты; УЗИ и цитология (ТАБ) отличают доброкачественные узлы от рака.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  adrenal: {
    en: {
      objectives: [
        "Describe the two parts of the adrenal gland",
        "Explain cortisol, aldosterone and catecholamine functions",
        "Outline adrenal insufficiency and excess states",
      ],
      structure:
        "Each adrenal gland (4–5 g) caps a kidney like a small pyramid, enclosed in the renal fascia. The outer cortex has three zones — zona glomerulosa (aldosterone), zona fasciculata (cortisol), zona reticularis (androgens) — and the inner medulla contains chromaffin cells producing catecholamines. The glands have a rich triple arterial supply and a single central vein.",
      function:
        "Cortisol, the stress hormone, mobilises glucose, modulates immunity and maintains vascular tone; aldosterone retains sodium and excretes potassium, controlling blood volume and pressure; adrenal androgens contribute to sexual development. The medulla releases adrenaline and noradrenaline within seconds for fight-or-flight — raised heart rate, bronchodilation, redirected blood flow.",
      clinical: [
        "Addison's disease — cortisol/aldosterone deficiency — causes hypotension, hyperpigmentation and salt craving.",
        "Cushing's syndrome — cortisol excess — causes central obesity, hypertension and hyperglycaemia.",
        "Pheochromocytoma — a catecholamine-secreting tumour — causes episodic hypertensive crises.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать две части надпочечника",
        "Объяснить функции кортизола, альдостерона и катехоламинов",
        "Рассмотреть недостаточность и избыток гормонов надпочечников",
      ],
      structure:
        "Каждый надпочечник (4–5 г) венчает почку маленькой пирамидой, заключённой в почечную фасцию. Наружная кора имеет три зоны — клубочковую (альдостерон), пучковую (кортизол) и сетчатую (андрогены), — а внутреннее мозговое вещество содержит хромаффинные клетки, производящие катехоламины. Железы имеют тройное артериальное кровоснабжение и одну центральную вену.",
      function:
        "Кортизол, гормон стресса, мобилизует глюкозу, модулирует иммунитет и поддерживает тонус сосудов; альдостерон задерживает натрий и выводит калий, управляя объёмом крови и давлением; андрогены надпочечников участвуют в половом развитии. Мозговое вещество за секунды выбрасывает адреналин и норадреналин для реакции «бей или беги» — учащение пульса, расширение бронхов, перераспределение кровотока.",
      clinical: [
        "Болезнь Аддисона — дефицит кортизола и альдостерона — вызывает гипотензию, гиперпигментацию и тягу к соли.",
        "Синдром Кушинга — избыток кортизола — вызывает центральное ожирение, гипертензию и гипергликемию.",
        "Феохромоцитома — опухоль, выделяющая катехоламины, — вызывает эпизодические гипертонические кризы.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  pituitary: {
    en: {
      objectives: [
        "Describe the anatomy of the pituitary and its connections",
        "List the hormones of the anterior and posterior lobes",
        "Explain the consequences of pituitary disorders",
      ],
      structure:
        "The pituitary (hypophysis, 0.5–1 g) sits in the sella turcica of the sphenoid bone, connected to the hypothalamus by the infundibulum. The anterior lobe (adenohypophysis) is a true gland of epithelial origin; the posterior lobe (neurohypophysis) is nervous tissue storing hypothalamic hormones. The hypophyseal portal system links the hypothalamus to the anterior lobe.",
      function:
        "The anterior lobe secretes growth hormone, prolactin, TSH, ACTH, FSH and LH, driven by hypothalamic releasing factors. The posterior lobe stores and releases oxytocin (labour, milk ejection) and antidiuretic hormone (water retention). Together these hormones govern growth, metabolism, stress, reproduction and fluid balance.",
      clinical: [
        "Pituitary adenomas can overproduce hormones (prolactinoma, acromegaly, Cushing's disease) or compress the optic chiasm, causing bitemporal hemianopia.",
        "Hypopituitarism causes secondary hypothyroidism, adrenal insufficiency and hypogonadism.",
        "Diabetes insipidus — ADH deficiency — causes large volumes of dilute urine and thirst.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать анатомию гипофиза и его связи",
        "Перечислить гормоны передней и задней долей",
        "Объяснить последствия заболеваний гипофиза",
      ],
      structure:
        "Гипофиз (0,5–1 г) лежит в турецком седле клиновидной кости и соединён с гипоталамусом воронкой (ножкой). Передняя доля (аденогипофиз) — настоящая железа эпителиального происхождения; задняя (нейрогипофиз) — нервная ткань, хранящая гормоны гипоталамуса. Портальная система гипофиза связывает гипоталамус с передней долей.",
      function:
        "Передняя доля секретирует соматотропный гормон, пролактин, ТТГ, АКТГ, ФСГ и ЛГ под действием рилизинг-факторов гипоталамуса. Задняя доля хранит и выделяет окситоцин (роды, выделение молока) и антидиуретический гормон (задержка воды). Вместе эти гормоны управляют ростом, обменом веществ, стрессом, размножением и водным балансом.",
      clinical: [
        "Аденомы гипофиза могут избыточно вырабатывать гормоны (пролактинома, акромегалия, болезнь Кушинга) или сдавливать перекрёст зрительных нервов, вызывая битемпоральную гемианопсию.",
        "Гипопитуитаризм вызывает вторичный гипотиреоз, надпочечниковую недостаточность и гипогонадизм.",
        "Несахарный диабет — дефицит АДГ — вызывает большие объёмы разведённой мочи и жажду.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  trachea: {
    en: {
      objectives: [
        "Describe the structure of the trachea and its rings",
        "Explain mucociliary clearance",
        "Recognise tracheal emergencies",
      ],
      structure:
        "The trachea is a 10–12 cm tube from the larynx to the carina at T4–T5, held open by 16–20 C-shaped hyaline cartilage rings open posteriorly, where the trachealis muscle lies. It is lined by pseudostratified ciliated epithelium with goblet cells. The right main bronchus is wider and more vertical than the left — a key fact for aspiration.",
      function:
        "The trachea conducts air, warms and humidifies it, and traps particles in mucus. Cilia beat in coordinated waves, sweeping the mucus carpet upward to the pharynx where it is swallowed — the mucociliary escalator that keeps the lungs clean. Coughing is the reflex back-up when the escalator is overwhelmed.",
      clinical: [
        "Foreign body aspiration most often lodges in the right main bronchus; acute obstruction of the trachea is an emergency.",
        "Tracheal stenosis after intubation or trauma narrows the lumen and causes stridor.",
        "Tracheostomy bypasses upper-airway obstruction below the larynx.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать строение трахеи и её колец",
        "Объяснить мукоцилиарный клиренс",
        "Распознавать неотложные состояния трахеи",
      ],
      structure:
        "Трахея — трубка 10–12 см от гортани до бифуркации на уровне T4–T5; просвет держат 16–20 C-образных колец гиалинового хряща, незамкнутых сзади, где лежит трахеальная мышца. Выстилает её многорядный реснитчатый эпителий с бокаловидными клетками. Правый главный бронх шире и вертикальнее левого — ключевой факт для аспирации.",
      function:
        "Трахея проводит воздух, согревает и увлажняет его и задерживает частицы в слизи. Реснички согласованными волнами гонят слизистый «ковёр» вверх к глотке, где слизь проглатывается, — мукоцилиарный эскалатор, сохраняющий лёгкие чистыми. Кашель — рефлекторное дублирование, когда эскалатор перегружен.",
      clinical: [
        "Аспирированное инородное тело чаще всего попадает в правый главный бронх; острая закупорка трахеи — неотложное состояние.",
        "Стеноз трахеи после интубации или травмы сужает просвет и вызывает стридор.",
        "Трахеостомия обходит обструкцию верхних дыхательных путей ниже гортани.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
  },
  larynx: {
    en: {
      objectives: [
        "Describe the cartilages and ligaments of the larynx",
        "Explain phonation and airway protection",
        "Outline common laryngeal disorders",
      ],
      structure:
        "The larynx (4–5 cm) is a cartilaginous framework between the pharynx and trachea: the thyroid cartilage (Adam's apple), cricoid ring, paired arytenoid cartilages, and the leaf-shaped epiglottis. The vocal folds — two folds of mucosa over the vocal ligaments — stretch between the thyroid and arytenoid cartilages. Intrinsic muscles adjust their tension; the recurrent laryngeal nerves (CN X) supply all but one.",
      function:
        "Phonation: air from the lungs sets the vocal folds vibrating; pitch depends on their tension and length, loudness on airflow. The epiglottis and the laryngeal inlet close during swallowing, protecting the airway. The larynx also generates the cough reflex and helps fix the chest for lifting.",
      clinical: [
        "Laryngitis (usually viral) causes hoarseness; voice rest speeds recovery.",
        "Recurrent laryngeal nerve injury (thyroid surgery, tumours) causes vocal fold paralysis and hoarseness.",
        "Acute epiglottitis is a life-threatening airway emergency, now rare thanks to Hib vaccination.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать хрящи и связки гортани",
        "Объяснить фонацию и защиту дыхательных путей",
        "Перечислить частые заболевания гортани",
      ],
      structure:
        "Гортань (4–5 см) — хрящевой каркас между глоткой и трахеей: щитовидный хрящ («кадык»), перстневидное кольцо, парные черпаловидные хрящи и листовидный надгортанник. Голосовые складки — две складки слизистой над голосовыми связками — натянуты между щитовидным и черпаловидными хрящами. Внутренние мышцы меняют их натяжение; все мышцы, кроме одной, иннервирует возвратный гортанный нерв (X пара).",
      function:
        "Фонация: воздух из лёгких приводит голосовые складки в колебание; высота тона зависит от их натяжения и длины, громкость — от потока воздуха. Надгортанник и вход в гортань при глотании закрываются, защищая дыхательные пути. Гортань также запускает кашлевой рефлекс и помогает фиксировать грудную клетку при подъёме тяжестей.",
      clinical: [
        "Ларингит (обычно вирусный) вызывает осиплость; голосовой покой ускоряет выздоровление.",
        "Повреждение возвратного гортанного нерва (операции на щитовидной железе, опухоли) ведёт к параличу голосовой складки и осиплости.",
        "Острый эпиглоттит — жизнеугрожающая обструкция дыхательных путей, ныне редкая благодаря вакцинации от гемофильной инфекции.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
  },
  bladder: {
    en: {
      objectives: [
        "Describe the anatomy of the bladder and its relations",
        "Explain the micturition reflex and voluntary control",
        "Outline common bladder disorders",
      ],
      structure:
        "The urinary bladder is a hollow muscular organ in the pelvis behind the pubic bone, with an apex, body, fundus and neck. Its floor carries the trigone — the fixed triangle between the ureteric orifices and the internal urethral orifice. The wall is the detrusor muscle lined by urothelium; the internal sphincter is involuntary smooth muscle, the external sphincter is voluntary skeletal muscle.",
      function:
        "Urine from the kidneys drains via the ureters into the bladder. The detrusor relaxes during filling (400–600 mL capacity); the first urge appears at ~150–250 mL. Micturition is a spinal reflex (sacral S2–S4) under cortical control: the sphincters relax, the detrusor contracts and urine flows out. Continence relies on intact pelvic floor and sphincter function.",
      clinical: [
        "Cystitis — bladder infection — causes frequency, urgency and dysuria; it is far more common in women.",
        "Bladder cancer (usually transitional cell) is linked to smoking; haematuria is the classic sign.",
        "Urinary incontinence has many causes — from sphincter weakness to neurogenic bladder.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать анатомию мочевого пузыря и его отношения",
        "Объяснить рефлекс мочеиспускания и произвольный контроль",
        "Перечислить частые заболевания мочевого пузыря",
      ],
      structure:
        "Мочевой пузырь — полый мышечный орган в малом тазу за лобковой костью, с верхушкой, телом, дном и шейкой. На дне — тригон — неподвижный треугольник между устьями мочеточников и внутренним отверстием уретры. Стенка — детрузор, выстланный уротелием; внутренний сфинктер — непроизвольная гладкая мышца, наружный — произвольная скелетная.",
      function:
        "Моча из почек по мочеточникам поступает в пузырь. Во время наполнения детрузор расслаблен (вместимость 400–600 мл); первый позыв — при ~150–250 мл. Мочеиспускание — спинномозговой рефлекс (S2–S4) под корковым контролем: сфинктеры расслабляются, детрузор сокращается, моча выходит. Удержание зависит от целостности тазового дна и функции сфинктеров.",
      clinical: [
        "Цистит — инфекция мочевого пузыря — вызывает учащённое и болезненное мочеиспускание; у женщин он встречается гораздо чаще.",
        "Рак мочевого пузыря (обычно переходно-клеточный) связан с курением; классический признак — гематурия.",
        "Недержание мочи имеет много причин — от слабости сфинктеров до нейрогенного пузыря.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  uterus: {
    en: {
      objectives: [
        "Describe the anatomy of the uterus and its layers",
        "Explain the menstrual cycle and implantation",
        "Outline common uterine disorders",
      ],
      structure:
        "The uterus is a pear-shaped, thick-walled organ (7–8 cm) in the pelvis between bladder and rectum, divided into fundus, body, isthmus and cervix. The wall has three layers: perimetrium (serosa), myometrium (thick smooth muscle) and endometrium (mucosa, with a functional layer shed each cycle). The fallopian tubes enter at the cornua; the cervix opens into the vagina.",
      function:
        "Each cycle, hormones drive endometrial proliferation (oestrogen) and secretory transformation (progesterone) preparing for implantation. If no pregnancy occurs, the functional layer is shed as menstruation; if implantation happens, the corpus luteum maintains the endometrium and the uterus expands ~500-fold during gestation. At birth, coordinated myometrial contractions expel the baby.",
      clinical: [
        "Uterine fibroids — benign smooth-muscle tumours — are common and can cause heavy bleeding.",
        "Endometriosis — endometrial tissue outside the uterus — causes pain and infertility.",
        "Cervical cancer screening (Pap smear, HPV testing) has dramatically reduced deaths.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать анатомию матки и её слои",
        "Объяснить менструальный цикл и имплантацию",
        "Перечислить частые заболевания матки",
      ],
      structure:
        "Матка — грушевидный толстостенный орган (7–8 см) в малом тазу между мочевым пузырём и прямой кишкой; в ней выделяют дно, тело, перешеек и шейку. Стенка имеет три слоя: периметрий (сероза), миометрий (толстая гладкая мышца) и эндометрий (слизистая с функциональным слоем, отторгающимся каждый цикл). Маточные трубы впадают в рога; шейка открывается во влагалище.",
      function:
        "Каждый цикл гормоны запускают пролиферацию эндометрия (эстроген) и секреторную трансформацию (прогестерон), готовя его к имплантации. Если беременности нет, функциональный слой отторгается — менструация; если наступила имплантация, жёлтое тело поддерживает эндометрий, а матка во время беременности увеличивается примерно в 500 раз. В родах согласованные сокращения миометрия изгоняют плод.",
      clinical: [
        "Миомы матки — доброкачественные опухоли гладкой мускулатуры — часты и могут вызывать обильные кровотечения.",
        "Эндометриоз — ткань эндометрия вне матки — вызывает боль и бесплодие.",
        "Скрининг рака шейки матки (цитология, тест на ВПЧ) резко снизил смертность.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  ovary: {
    en: {
      objectives: [
        "Describe the structure of the ovary and its blood supply",
        "Explain folliculogenesis and ovulation",
        "Outline common ovarian disorders",
      ],
      structure:
        "Each ovary (3–4 cm, 5–8 g) is an almond-shaped gonad in the ovarian fossa, attached by the mesovarium, ovarian and suspensory ligaments. It has a cortex packed with follicles at various stages and a medulla of vessels and nerves. The ovarian artery (from the aorta) and the ovarian branch of the uterine artery supply it; the veins form the pampiniform plexus.",
      function:
        "Folliculogenesis: each cycle a cohort of follicles grows under FSH; one becomes dominant and ovulates at mid-cycle under the LH surge. The remaining follicle becomes the corpus luteum, secreting progesterone. Ovarian oestrogen drives the proliferative phase and female secondary characteristics; the ovary also contains the oocyte reserve — ~1–2 million at birth, ~400 ovulated.",
      clinical: [
        "Polycystic ovary syndrome — androgen excess with ovulatory dysfunction — is a leading cause of infertility.",
        "Ovarian cysts are usually benign and resolve; torsion or rupture causes acute pain.",
        "Ovarian cancer is often asymptomatic until late — one reason it is the deadliest gynaecologic cancer.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать строение яичника и его кровоснабжение",
        "Объяснить фолликулогенез и овуляцию",
        "Перечислить частые заболевания яичников",
      ],
      structure:
        "Каждый яичник (3–4 см, 5–8 г) — миндалевидная гонада в яичниковой ямке, фиксированная брыжейкой и связками. В корковом веществе — фолликулы на разных стадиях, в мозговом — сосуды и нервы. Кровоснабжают яичниковая артерия (от аорты) и яичниковая ветвь маточной артерии; вены образуют лозовидное сплетение.",
      function:
        "Фолликулогенез: каждый цикл под действием ФСГ растёт когорта фолликулов; один становится доминантным и овулирует в середине цикла под пиком ЛГ. Оставшийся фолликул превращается в жёлтое тело, секретирующее прогестерон. Эстроген яичников управляет пролиферативной фазой и женскими вторичными признаками; яичник также хранит резерв ооцитов — 1–2 млн при рождении, овулирует ~400.",
      clinical: [
        "Синдром поликистозных яичников — избыток андрогенов с нарушением овуляции — ведущая причина бесплодия.",
        "Кисты яичников обычно доброкачественны и рассасываются; перекрут или разрыв вызывает острую боль.",
        "Рак яичников долго протекает бессимптомно — одна из причин, почему это самый смертоносный гинекологический рак.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  testis: {
    en: {
      objectives: [
        "Describe the structure of the testis and its coverings",
        "Explain spermatogenesis and hormonal control",
        "Outline common testicular disorders",
      ],
      structure:
        "Each testis (4–5 cm, 15–25 g) is an oval organ in the scrotum, covered by the tunica albuginea and, outside it, by the visceral and parietal layers of the tunica vaginalis. Septa divide it into ~250 lobules of seminiferous tubules that join the rete testis and efferent ducts to the epididymis. Leydig cells lie between tubules; Sertoli cells line them and form the blood–testis barrier.",
      function:
        "Spermatogenesis in the seminiferous tubules produces ~1,500 sperm per second, taking ~74 days; the epididymis matures and stores them. Sertoli cells nourish germ cells and secrete inhibin; Leydig cells secrete testosterone under LH, while FSH drives spermatogenesis. The scrotum keeps the testes 2–3 °C below core temperature — essential for sperm production.",
      clinical: [
        "Testicular torsion — twisting of the spermatic cord — is a surgical emergency; salvage depends on time.",
        "Testicular cancer is the most common cancer in young men (15–35); early cure rates exceed 95%.",
        "Undescended testis should be corrected early to preserve fertility and reduce cancer risk.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать строение яичка и его оболочки",
        "Объяснить сперматогенез и гормональную регуляцию",
        "Перечислить частые заболевания яичек",
      ],
      structure:
        "Каждое яичко (4–5 см, 15–25 г) — овальный орган в мошонке, покрытый белочной оболочкой, а снаружи — висцеральным и париетальным листками влагалищной оболочки. Перегородки делят его на ~250 долек семенных канальцев, соединяющихся в сеть яичка и выносящие канальцы, ведущие к придатку. Клетки Лейдига лежат между канальцами; клетки Сертоли выстилают их и образуют гематотестикулярный барьер.",
      function:
        "Сперматогенез в семенных канальцах даёт около 1 500 сперматозоидов в секунду и занимает ~74 дня; придаток дозревает и хранит их. Клетки Сертоли питают половые клетки и секретируют ингибин; клетки Лейдига под действием ЛГ выделяют тестостерон, а ФСГ управляет сперматогенезом. Мошонка держит яички на 2–3 °C холоднее тела — это необходимо для продукции спермы.",
      clinical: [
        "Перекрут яичка — поворот семенного канатика — хирургическая неотложная ситуация; шанс спасти яичко зависит от времени.",
        "Рак яичка — самая частая опухоль у молодых мужчин (15–35 лет); при раннем лечении излечивается более чем в 95% случаев.",
        "Неопущенное яичко нужно лечить рано, чтобы сохранить фертильность и снизить риск рака.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  prostate: {
    en: {
      objectives: [
        "Describe the anatomy and zones of the prostate",
        "Explain its role in semen and urination",
        "Outline BPH, prostatitis and prostate cancer",
      ],
      structure:
        "The prostate (15–25 g) is a walnut-sized fibromuscular gland below the bladder, surrounding the prostatic urethra. It has a peripheral zone (where most cancers arise), a transition zone (site of BPH), a central zone and a fibromuscular stroma. The prostatic urethra is joined by the ejaculatory ducts; the gland is enclosed in a capsule and supplied by the inferior vesical and middle rectal arteries.",
      function:
        "Prostatic glands secrete ~30% of semen volume — a thin, slightly acidic fluid rich in prostate-specific antigen (PSA), zinc and citric acid that supports sperm motility. The smooth muscle of the gland contracts at ejaculation, mixing its secretions with sperm and seminal vesicle fluid. The gland also participates in urinary control by virtue of its position around the urethra.",
      clinical: [
        "BPH — transition-zone hyperplasia — compresses the urethra causing hesitancy, weak stream and nocturia.",
        "Prostatitis (acute or chronic) causes pelvic pain, urinary symptoms and sometimes fever.",
        "Prostate cancer (mostly peripheral zone) is screened with PSA and DRE; most cases are slow-growing.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать анатомию и зоны предстательной железы",
        "Объяснить её роль в семяизвержении и мочеиспускании",
        "Рассмотреть ДГПЖ, простатит и рак предстательной железы",
      ],
      structure:
        "Предстательная железа (15–25 г) — фиброзно-мышечный орган размером с грецкий орех, ниже мочевого пузыря, окружающий простатическую часть уретры. В ней выделяют периферическую зону (здесь чаще всего рак), переходную зону (место ДГПЖ), центральную зону и фиброзно-мышечную строму. В уретру впадают семявыбрасывающие протоки; железа покрыта капсулой и кровоснабжается нижними пузырными и средними прямокишечными артериями.",
      function:
        "Предстательные железы секретируют около 30% объёма эякулята — тонкую слабокислую жидкость, богатую простатическим специфическим антигеном (ПСА), цинком и лимонной кислотой, поддерживающую подвижность сперматозоидов. Гладкая мускулатура железы сокращается при эякуляции, смешивая секрет со спермой и жидкостью семенных пузырьков. Расположение вокруг уретры делает железу участницей мочеиспускания.",
      clinical: [
        "ДГПЖ — гиперплазия переходной зоны — сдавливает уретру, вызывая затруднённое мочеиспускание, слабую струю и никтурию.",
        "Простатит (острый или хронический) вызывает тазовую боль, дизурию, иногда лихорадку.",
        "Рак предстательной железы (в основном периферическая зона) скринируют ПСА и пальцевым исследованием; большинство случаев растут медленно.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Guyton A.C., Hall J.E. Textbook of Medical Physiology. 14th ed. Elsevier, 2020.",
      ],
    },
  },
  "spinal-cord": {
    en: {
      objectives: [
        "Describe the external and internal anatomy of the spinal cord",
        "Explain ascending and descending tracts",
        "Recognise the effects of spinal cord injury",
      ],
      structure:
        "The spinal cord (~45 cm) lies in the vertebral canal from the foramen magnum to L1–L2 in adults. It has cervical and lumbar enlargements for the limbs, and tapers into the conus medullaris; below it, nerve roots form the cauda equina. Cross-section: central H-shaped grey matter (dorsal, lateral and ventral horns) surrounded by white matter columns (dorsal, lateral, ventral funiculi) carrying tracts.",
      function:
        "Ascending tracts (dorsal columns for touch/proprioception, spinothalamic for pain/temperature) carry sensation to the brain; descending tracts (corticospinal) carry motor commands to muscles. Reflex arcs — sensory neuron → interneuron → motor neuron — are computed in the cord in ~30 ms. The cord also coordinates micturition, defecation and sexual reflexes via its autonomic centres.",
      clinical: [
        "Spinal cord injury: cervical lesions cause tetraplegia, thoracic lesions paraplegia; the level determines function.",
        "Complete cord transection abolishes sensation and voluntary movement below the lesion, with spinal shock first.",
        "Multiple sclerosis — demyelination of cord and brain tracts — causes weakness, sensory loss and sphincter problems.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Nolte J. The Human Brain. 8th ed. Elsevier, 2020.",
      ],
    },
    ru: {
      objectives: [
        "Описать наружное и внутреннее строение спинного мозга",
        "Объяснить восходящие и нисходящие пути",
        "Распознавать последствия травмы спинного мозга",
      ],
      structure:
        "Спинной мозг (~45 см) лежит в позвоночном канале от большого затылочного отверстия до L1–L2 у взрослых. У него есть шейное и поясничное утолщения для конечностей; книзу он сужается в мозговой конус, а ниже корешки образуют «конский хвост». На поперечном срезе — центральное H-образное серое вещество (задние, боковые и передние рога), окружённое канатиками белого вещества (задние, боковые, передние) с проводящими путями.",
      function:
        "Восходящие пути (задние канатики — прикосновение и проприоцепция, спиноталамический — боль и температура) несут ощущения в мозг; нисходящие (кортикоспинальный) — двигательные команды к мышцам. Рефлекторные дуги — чувствительный нейрон → вставочный → двигательный — замыкаются в спинном мозге за ~30 мс. Спинной мозг также координирует мочеиспускание, дефекацию и половые рефлексы через свои вегетативные центры.",
      clinical: [
        "Травма спинного мозга: поражения на шейном уровне вызывают тетраплегию, на грудном — параплегию; уровень определяет функции.",
        "Полный перерыв спинного мозга устраняет чувствительность и произвольные движения ниже повреждения; вначале — спинальный шок.",
        "Рассеянный склероз — демиелинизация путей мозга и спинного мозга — вызывает слабость, расстройства чувствительности и тазовые нарушения.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Nolte J. The Human Brain. 8th ed. Elsevier, 2020.",
      ],
    },
  },
  diaphragm: {
    en: {
      objectives: [
        "Describe the structure of the diaphragm and its openings",
        "Explain its role in breathing and the thoracoabdominal pump",
        "Outline diaphragm disorders",
      ],
      structure:
        "The diaphragm is a dome-shaped skeletal muscle separating the thorax from the abdomen, with a peripheral muscular part and a central tendon. It has three major openings: the aortic hiatus, the esophageal hiatus (with the vagus nerves) and the vena caval foramen. It is innervated by the phrenic nerves (C3–C5) and supplied by the inferior phrenic and musculophrenic arteries.",
      function:
        "Contraction flattens the dome, enlarging the thoracic cavity and drawing air in (inspiration, ~60–75% of the work of breathing); relaxation lets the dome rise and air flow out. The diaphragm also assists coughing, vomiting, defecation and childbirth by raising intra-abdominal pressure, and its descent aids venous return to the heart (thoracoabdominal pump).",
      clinical: [
        "Hiatal hernia — protrusion of the stomach through the esophageal hiatus — predisposes to GERD.",
        "Phrenic nerve paralysis causes paradoxical (paradoxical) breathing and dyspnoea.",
        "Congenital diaphragmatic hernia — a developmental defect — is a neonatal emergency.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать строение диафрагмы и её отверстия",
        "Объяснить её роль в дыхании и грудобрюшном насосе",
        "Перечислить заболевания диафрагмы",
      ],
      structure:
        "Диафрагма — куполообразная скелетная мышца, разделяющая грудную и брюшную полости: периферическая мышечная часть и сухожильный центр. В ней три крупных отверстия: аортальное, пищеводное (с блуждающими нервами) и отверстие нижней полой вены. Иннервируется диафрагмальными нервами (C3–C5), кровоснабжается нижними диафрагмальными и мышечно-диафрагмальными артериями.",
      function:
        "Сокращение уплощает купол, увеличивая грудную полость и втягивая воздух (вдох, ~60–75% работы дыхания); расслабление поднимает купол и выпускает воздух. Диафрагма также помогает кашлю, рвоте, дефекации и родам, повышая внутрибрюшное давление, а её опускание улучшает венозный возврат к сердцу (грудобрюшной насос).",
      clinical: [
        "Грыжа пищеводного отверстия — выпячивание желудка через пищеводное отверстие — предрасполагает к ГЭРБ.",
        "Паралич диафрагмального нерва вызывает парадоксальное дыхание и одышку.",
        "Врождённая диафрагмальная грыжа — порок развития — неотложное состояние новорождённых.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
  },
  biceps: {
    en: {
      objectives: [
        "Describe the origins and insertion of the biceps brachii",
        "Explain its actions and innervation",
        "Recognise common biceps injuries",
      ],
      structure:
        "The biceps brachii is a two-headed muscle of the anterior arm. The long head arises from the supraglenoid tubercle and passes through the shoulder joint capsule; the short head arises from the coracoid process. Both heads converge into a single distal tendon inserting on the radial tuberosity, and the bicipital aponeurosis fans into forearm fascia. The musculocutaneous nerve (C5–C6) innervates it.",
      function:
        "The biceps is a powerful flexor of the elbow and the strongest supinator of the forearm — its supination force is greatest when the elbow is flexed. It also assists shoulder flexion. It is the muscle people 'show' when flexing, and its distal tendon is the familiar Popeye-like landmark after rupture.",
      clinical: [
        "Distal biceps rupture occurs with sudden eccentric loading; surgical repair restores strength and supination.",
        "Long head tendinopathy causes anterior shoulder pain, common in overhead athletes.",
        "Nerve injury (musculocutaneous) weakens elbow flexion and supination and diminishes the biceps reflex.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать начало и прикрепление двуглавой мышцы плеча",
        "Объяснить её функции и иннервацию",
        "Распознавать частые повреждения бицепса",
      ],
      structure:
        "Двуглавая мышца плеча — мышца передней поверхности плеча с двумя головками. Длинная головка начинается от надсуставного бугорка лопатки и проходит через капсулу плечевого сустава; короткая — от клювовидного отростка. Обе головки сходятся в одно дистальное сухожилие, прикрепляющееся к бугристости лучевой кости, а биципитальный апоневроз веером расходится в фасцию предплечья. Иннервирует её мышечно-кожный нерв (C5–C6).",
      function:
        "Бицепс — мощный сгибатель локтя и сильнейший супинатор предплечья: супинация сильнее всего при согнутом локте. Он также помогает сгибанию плеча. Это мышца, которую «показывают», сгибая руку, а её дистальное сухожилие — знакомый ориентир «бицепс Попая» после разрыва.",
      clinical: [
        "Разрыв дистального сухожилия бицепса случается при резкой эксцентричной нагрузке; операция восстанавливает силу и супинацию.",
        "Тендинопатия длинной головки вызывает боль в передней части плеча — часто у спортсменов с движениями над головой.",
        "Повреждение мышечно-кожного нерва ослабляет сгибание локтя и супинацию и снижает рефлекс бицепса.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
  },
  femur: {
    en: {
      objectives: [
        "Describe the parts of the femur",
        "Explain its role in the hip and knee joints",
        "Outline common femoral fractures and diseases",
      ],
      structure:
        "The femur (~45–50 cm) is the longest and strongest bone. Its upper end has the head (articulating with the acetabulum), neck, greater and lesser trochanters; the shaft is a cylindrical tube of thick compact bone; the lower end flares into medial and lateral condyles articulating with the tibia and patella. The neck is angled ~125° and is the classic site of osteoporotic fracture.",
      function:
        "The femur transmits body weight from the pelvis to the knee and serves as the lever arm for the powerful thigh muscles (quadriceps, hamstrings, gluteals). It houses the largest bone marrow cavity — a major site of haematopoiesis in adults — and contains the nutrient artery supplying the marrow. Its articular surfaces allow flexion, extension and rotation at hip and knee.",
      clinical: [
        "Hip fractures (femoral neck) are common in the elderly with osteoporosis; treatment is usually surgery.",
        "Femoral shaft fractures from high-energy trauma can cause major blood loss (up to 1–2 L).",
        "Avascular necrosis of the femoral head follows disruption of its blood supply — from fracture or steroids.",
      ],
      sources: [
        "Standring S. Gray's Anatomy. 42nd ed. Elsevier, 2020.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
    ru: {
      objectives: [
        "Описать части бедренной кости",
        "Объяснить её роль в тазобедренном и коленном суставах",
        "Перечислить частые переломы и заболевания бедра",
      ],
      structure:
        "Бедренная кость (~45–50 см) — самая длинная и прочная кость. Верхний конец: головка (сочленяется с вертлужной впадиной), шейка, большой и малый вертелы; диафиз — цилиндрическая трубка толстого компактного вещества; нижний конец расширяется в медиальный и латеральный мыщелки, сочленяющиеся с большеберцовой костью и надколенником. Шейка наклонена под углом ~125° — классическое место остеопоротического перелома.",
      function:
        "Бедренная кость передаёт вес тела от таза к колену и служит рычагом для мощных мышц бедра (квадрицепс, задняя группа, ягодичные). В ней самая большая костномозговая полость — крупный очаг кроветворения у взрослых — и питающая артерия, снабжающая мозг. Суставные поверхности обеспечивают сгибание, разгибание и ротацию в тазобедренном и коленном суставах.",
      clinical: [
        "Переломы шейки бедра часты у пожилых с остеопорозом; лечение обычно хирургическое.",
        "Переломы диафиза при высокоэнергетической травме могут вызывать большую кровопотерю (до 1–2 л).",
        "Аваскулярный некроз головки бедра развивается при нарушении её кровоснабжения — после перелома или приёма стероидов.",
      ],
      sources: [
        "Синельников Р.Д. Атлас анатомии человека. 8-е изд. — М.: Новая волна, 2021.",
        "Netter F.H. Atlas of Human Anatomy. 7th ed. Elsevier, 2018.",
      ],
    },
  },
};
