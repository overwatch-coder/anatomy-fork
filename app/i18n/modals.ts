/**
 * Translations for Modals (Masterclass Lesson, Clinical Study Journal / Notes,
 * Comparative Anatomy matrix, Theory Quiz) and the Systems overview page.
 * Supports all 13 application locales with fallback to English.
 */

export interface ModalTranslations {
  // Systems Page
  systemsHeroTitle: string;
  systemsHeroSubtitle: string;
  selectSystem: string;
  figureHint: string;
  systemDetails: string;
  interactiveModels: string;
  backTo3D: string;
  systemsInterdependentNote: string;

  // Masterclass / Lesson Modal
  lessonEyebrow: string;
  lessonLead: string;
  prevSpecimen: string;
  nextSpecimen: string;
  selectLessonAria: string;
  readTime: string;
  markComplete: string;
  lessonCompleted: string;
  coreObjectives: string;
  anatomicalArchitecture: string;
  tissueType: string;
  physicalDimensions: string;
  specimenMass: string;
  physiologicalMechanisms: string;
  vascularSupply: string;
  clinicalCorrelates: string;
  canonicalLiterature: string;
  practiceQuiz: string;
  takeNotes: string;
  saveProgress: string;
  inspectIn3D: string;

  // Comparative Anatomy Modal
  compareEyebrow: string;
  compareLead: string;
  activeModel: string;
  targetReference: string;
  swap: string;
  chooseReferenceAria: string;
  anatomicalMetric: string;
  organSystem: string;
  scientificTerm: string;
  primaryFunction: string;
  physicalScale: string;
  typicalMass: string;
  dailyActivity: string;
  tissueArchitecture: string;
  clinicalRelevance: string;
  commonConditions: string;
  compareFooterNote: string;
  close: string;

  // Study Notes & Profile Modal
  notesEyebrow: string;
  notesTitle: string;
  notesLead: string;
  tabActiveNote: string;
  tabAllNotes: string;
  tabProfile: string;
  highYieldPrompts: string;
  promptMorphologyLabel: string;
  promptMorphologyPrefix: string;
  promptPhysiologyLabel: string;
  promptPhysiologyPrefix: string;
  promptClinicalLabel: string;
  promptClinicalPrefix: string;
  promptMnemonicLabel: string;
  promptMnemonicPrefix: string;
  placeholderNotes: string;
  noteSaved: string;
  unsavedChanges: string;
  savedInJournal: string;
  writeAndSave: string;
  clear: string;
  copy: string;
  readLesson: string;
  saveNote: string;
  allNotesHeader: string;
  exportAll: string;
  emptyNotesTitle: string;
  emptyNotesDesc: string;
  editNote: string;
  viewIn3D: string;
  organsExplored: string;
  lessonsCompleted: string;
  notesAuthored: string;
  bookmarked: string;
  quizHistory: string;
  noQuizYet: string;
  bestScore: string;
  attempts: string;
  resetProgress: string;
  confirmReset: string;
  confirmClear: string;

  // Theory Quiz Modal
  theoryQuizTitle: string;
  noQuestionsYet: string;
  take3DQuiz: string;
  questionOf: string;
  scoreLabel: string;
  explanation: string;
  nextQuestion: string;
  finishQuiz: string;
  quizComplete: string;
  youScored: string;
  retryQuiz: string;

  // Other Modals
  histologicalLayers: string;
  openInteractiveSystemsMap: string;
}

export const modalDictionaries: Record<string, ModalTranslations> = {
  en: {
    systemsHeroTitle: "Body Systems",
    systemsHeroSubtitle: "Twelve organ systems working as one coordinated living whole. Select a system to highlight its path through the body.",
    selectSystem: "Select system",
    figureHint: "Click any organ or system to focus",
    systemDetails: "System details",
    interactiveModels: "Interactive 3D models",
    backTo3D: "Back to 3D explore",
    systemsInterdependentNote: "All organ systems are functionally interdependent — no organ functions in isolation.",

    lessonEyebrow: "Masterclass & Clinical Curriculum",
    lessonLead: "Systematic study of anatomical structure, physiological function, and clinical pathology",
    prevSpecimen: "Previous specimen",
    nextSpecimen: "Next specimen",
    selectLessonAria: "Select specimen lesson",
    readTime: "~4 min read",
    markComplete: "Mark as Complete",
    lessonCompleted: "Lesson Complete",
    coreObjectives: "Core Learning Objectives",
    anatomicalArchitecture: "Anatomical Architecture & Morphology",
    tissueType: "Tissue Type",
    physicalDimensions: "Physical Dimensions",
    specimenMass: "Specimen Mass",
    physiologicalMechanisms: "Physiological Mechanisms & Workload",
    vascularSupply: "Vascular & Hemodynamic Supply:",
    clinicalCorrelates: "Clinical Correlates & Pathology",
    canonicalLiterature: "Literature & Canonical References",
    practiceQuiz: "Practice Quiz",
    takeNotes: "Take Study Notes",
    saveProgress: "Save Lesson Progress",
    inspectIn3D: "Inspect {organ} in 3D",

    compareEyebrow: "Comparative Anatomy & Physiology",
    compareLead: "Cross-examination of functional, morphological, and clinical traits",
    activeModel: "Active Model",
    targetReference: "Target Reference",
    swap: "Swap",
    chooseReferenceAria: "Choose reference organ to compare",
    anatomicalMetric: "Anatomical Metric",
    organSystem: "Organ System",
    scientificTerm: "Scientific Term (TA2)",
    primaryFunction: "Primary Function",
    physicalScale: "Physical Scale",
    typicalMass: "Typical Mass / Weight",
    dailyActivity: "Daily Activity / Workload",
    tissueArchitecture: "Tissue Architecture",
    clinicalRelevance: "Clinical Relevance",
    commonConditions: "Common Conditions",
    compareFooterNote: "Select any organ in the dropdown to cross-examine anatomical traits.",
    close: "Close",

    notesEyebrow: "Interactive Notebook & Study Metrics",
    notesTitle: "Clinical Study Journal",
    notesLead: "Document observations, high-yield clinical pearls, and monitor curriculum progress",
    tabActiveNote: "Active Specimen Note",
    tabAllNotes: "All Study Notes ({count})",
    tabProfile: "Learner Profile & Stats",
    highYieldPrompts: "High-Yield Prompts:",
    promptMorphologyLabel: "+ Morphology",
    promptMorphologyPrefix: "Morphology & Landmarks: ",
    promptPhysiologyLabel: "+ Physiology",
    promptPhysiologyPrefix: "Physiological Role & Blood Supply: ",
    promptClinicalLabel: "+ Clinical Pearl",
    promptClinicalPrefix: "Clinical High-Yield Pearl: ",
    promptMnemonicLabel: "+ Mnemonic",
    promptMnemonicPrefix: "Diagnostic Triad / Mnemonic: ",
    placeholderNotes: "Document your notes, diagnostic triads, or clinical observations for the {organ}...",
    noteSaved: "Note saved to local journal",
    unsavedChanges: "Unsaved changes (click Save Note below)",
    savedInJournal: "Saved in local journal",
    writeAndSave: "Write your clinical notes above and click Save Note",
    clear: "Clear",
    copy: "Copy",
    readLesson: "Read Lesson",
    saveNote: "Save Note",
    allNotesHeader: "Saved anatomical & clinical notes across your study sessions.",
    exportAll: "Export All (.md)",
    emptyNotesTitle: "No study notes yet",
    emptyNotesDesc: "Select any organ in the dropdown above or switch to the Active Specimen Note tab to start jotting down clinical pearls.",
    editNote: "Edit Note",
    viewIn3D: "View in 3D",
    organsExplored: "Organs Explored",
    lessonsCompleted: "Lessons Completed",
    notesAuthored: "Notes Authored",
    bookmarked: "Bookmarked",
    quizHistory: "Quiz Performance History ({count} records)",
    noQuizYet: "No theory quizzes taken yet. Test your knowledge on any organ from its lesson or quiz view.",
    bestScore: "Best: {best} / {total} ({pct}%)",
    attempts: "{count} attempt{s}",
    resetProgress: "Reset All Progress",
    confirmReset: "Reset all learning progress, quiz scores, and study notes?",
    confirmClear: "Clear study notes for {organ}?",

    theoryQuizTitle: "{organ} Theory Quiz",
    noQuestionsYet: "Theory questions for this organ will be available soon.",
    take3DQuiz: "Take 3D Labelling Quiz",
    questionOf: "Question {current} of {total}",
    scoreLabel: "Score: {score}",
    explanation: "Explanation:",
    nextQuestion: "Next Question",
    finishQuiz: "Finish Quiz",
    quizComplete: "Quiz Complete!",
    youScored: "You scored {score} out of {total}",
    retryQuiz: "Retry Theory Quiz",

    histologicalLayers: "Histological Layers",
    openInteractiveSystemsMap: "Open Interactive Systems Map",
  },

  fr: {
    systemsHeroTitle: "Systèmes anatomiques",
    systemsHeroSubtitle: "Douze systèmes organiques coordonnés en une seule unité vivante. Sélectionnez un système pour mettre en lumière son trajet dans le corps.",
    selectSystem: "Sélectionner un système",
    figureHint: "Cliquez sur un organe ou système pour cibler",
    systemDetails: "Détails du système",
    interactiveModels: "Modèles 3D interactifs",
    backTo3D: "Retour à l'exploration 3D",
    systemsInterdependentNote: "Tous les systèmes d'organes sont interdépendants — aucun organe ne fonctionne de manière isolée.",

    lessonEyebrow: "Masterclass & Programme clinique",
    lessonLead: "Étude systématique de la structure anatomique, de la fonction physiologique et de la pathologie clinique",
    prevSpecimen: "Spécimen précédent",
    nextSpecimen: "Spécimen suivant",
    selectLessonAria: "Sélectionner la leçon du spécimen",
    readTime: "~4 min de lecture",
    markComplete: "Marquer comme terminé",
    lessonCompleted: "Leçon terminée",
    coreObjectives: "Objectifs d'apprentissage clés",
    anatomicalArchitecture: "Architecture anatomique & Morphologie",
    tissueType: "Type de tissu",
    physicalDimensions: "Dimensions physiques",
    specimenMass: "Masse du spécimen",
    physiologicalMechanisms: "Mécanismes physiologiques & Charge de travail",
    vascularSupply: "Vascularisation & Hémodynamique :",
    clinicalCorrelates: "Corrélations cliniques & Pathologies",
    canonicalLiterature: "Littérature & Références de référence",
    practiceQuiz: "S'entraîner au quiz",
    takeNotes: "Prendre des notes",
    saveProgress: "Enregistrer la leçon",
    inspectIn3D: "Inspecter {organ} en 3D",

    compareEyebrow: "Anatomie & Physiologie comparées",
    compareLead: "Examen croisé des caractéristiques fonctionnelles, morphologiques et cliniques",
    activeModel: "Modèle actif",
    targetReference: "Référence cible",
    swap: "Intervertir",
    chooseReferenceAria: "Choisir l'organe de référence à comparer",
    anatomicalMetric: "Critère anatomique",
    organSystem: "Système organique",
    scientificTerm: "Terme scientifique (TA2)",
    primaryFunction: "Fonction principale",
    physicalScale: "Échelle physique",
    typicalMass: "Masse / Poids typique",
    dailyActivity: "Activité quotidienne / Débit",
    tissueArchitecture: "Architecture tissulaire",
    clinicalRelevance: "Pertinence clinique",
    commonConditions: "Pathologies courantes",
    compareFooterNote: "Sélectionnez un organe dans la liste pour comparer ses caractéristiques anatomiques.",
    close: "Fermer",

    notesEyebrow: "Cahier d'étude & Métriques interactives",
    notesTitle: "Journal d'étude clinique",
    notesLead: "Consignez vos observations, vos points clés cliniques et suivez votre progression",
    tabActiveNote: "Note du spécimen actif",
    tabAllNotes: "Toutes les notes ({count})",
    tabProfile: "Profil apprenant & Statistiques",
    highYieldPrompts: "Pense-bêtes clés :",
    promptMorphologyLabel: "+ Morphologie",
    promptMorphologyPrefix: "Morphologie & Repères anatomiques : ",
    promptPhysiologyLabel: "+ Physiologie",
    promptPhysiologyPrefix: "Rôle physiologique & Vascularisation : ",
    promptClinicalLabel: "+ Point clinique",
    promptClinicalPrefix: "Point clé clinique : ",
    promptMnemonicLabel: "+ Mnémotechnique",
    promptMnemonicPrefix: "Triade diagnostique / Moyen mnémotechnique : ",
    placeholderNotes: "Consignez vos notes, triades diagnostiques ou observations cliniques pour {organ}...",
    noteSaved: "Note enregistrée dans le journal local",
    unsavedChanges: "Modifications non enregistrées (cliquez sur Enregistrer la note)",
    savedInJournal: "Enregistré dans le journal local",
    writeAndSave: "Rédigez vos notes ci-dessus et cliquez sur Enregistrer la note",
    clear: "Effacer",
    copy: "Copier",
    readLesson: "Lire la leçon",
    saveNote: "Enregistrer la note",
    allNotesHeader: "Notes anatomiques et cliniques enregistrées au cours de vos sessions.",
    exportAll: "Tout exporter (.md)",
    emptyNotesTitle: "Aucune note pour le moment",
    emptyNotesDesc: "Sélectionnez un organe ci-dessus ou passez à l'onglet Note du spécimen actif pour commencer à rédiger.",
    editNote: "Modifier la note",
    viewIn3D: "Voir en 3D",
    organsExplored: "Organes explorés",
    lessonsCompleted: "Leçons complétées",
    notesAuthored: "Notes rédigées",
    bookmarked: "Enregistrés",
    quizHistory: "Historique des quiz ({count} sessions)",
    noQuizYet: "Aucun quiz théorique effectué. Testez vos connaissances depuis la leçon d'un organe.",
    bestScore: "Record : {best} / {total} ({pct}%)",
    attempts: "{count} tentative{s}",
    resetProgress: "Réinitialiser la progression",
    confirmReset: "Réinitialiser toute la progression, les scores de quiz et les notes d'étude ?",
    confirmClear: "Effacer les notes d'étude pour {organ} ?",

    theoryQuizTitle: "Quiz théorique : {organ}",
    noQuestionsYet: "Les questions théoriques pour cet organe seront bientôt disponibles.",
    take3DQuiz: "Faire le quiz d'identification 3D",
    questionOf: "Question {current} sur {total}",
    scoreLabel: "Score : {score}",
    explanation: "Explication :",
    nextQuestion: "Question suivante",
    finishQuiz: "Terminer le quiz",
    quizComplete: "Quiz terminé !",
    youScored: "Vous avez obtenu {score} sur {total}",
    retryQuiz: "Recommencer le quiz",

    histologicalLayers: "Couches histologiques",
    openInteractiveSystemsMap: "Ouvrir la carte interactive des systèmes",
  },

  es: {
    systemsHeroTitle: "Sistemas corporales",
    systemsHeroSubtitle: "Doce sistemas orgánicos que funcionan como una unidad viva coordinada. Seleccione un sistema para resaltar su recorrido en el cuerpo.",
    selectSystem: "Seleccionar sistema",
    figureHint: "Haga clic en cualquier órgano o sistema para enfocar",
    systemDetails: "Detalles del sistema",
    interactiveModels: "Modelos 3D interactivos",
    backTo3D: "Volver a la exploración 3D",
    systemsInterdependentNote: "Todos los sistemas de órganos son interdependientes; ningún órgano funciona de forma aislada.",

    lessonEyebrow: "Masterclass & Plan de estudios clínico",
    lessonLead: "Estudio sistemático de la estructura anatómica, función fisiológica y patología clínica",
    prevSpecimen: "Especímen anterior",
    nextSpecimen: "Especímen siguiente",
    selectLessonAria: "Seleccionar lección del espécimen",
    readTime: "~4 min de lectura",
    markComplete: "Marcar como completado",
    lessonCompleted: "Lección completada",
    coreObjectives: "Objetivos fundamentales de aprendizaje",
    anatomicalArchitecture: "Arquitectura anatómica & Morfología",
    tissueType: "Tipo de tejido",
    physicalDimensions: "Dimensiones físicas",
    specimenMass: "Masa del espécimen",
    physiologicalMechanisms: "Mecanismos fisiológicos & Carga de trabajo",
    vascularSupply: "Aporte vascular y hemodinámico:",
    clinicalCorrelates: "Correlaciones clínicas & Patología",
    canonicalLiterature: "Literatura & Referencias canónicas",
    practiceQuiz: "Practicar cuestionario",
    takeNotes: "Tomar notas de estudio",
    saveProgress: "Guardar progreso de la lección",
    inspectIn3D: "Inspeccionar {organ} en 3D",

    compareEyebrow: "Anatomía & Fisiología comparada",
    compareLead: "Análisis cruzado de características funcionales, morfológicas y clínicas",
    activeModel: "Modelo activo",
    targetReference: "Referencia objetivo",
    swap: "Intercambiar",
    chooseReferenceAria: "Elegir órgano de referencia para comparar",
    anatomicalMetric: "Métrica anatómica",
    organSystem: "Sistema orgánico",
    scientificTerm: "Término científico (TA2)",
    primaryFunction: "Función principal",
    physicalScale: "Escala física",
    typicalMass: "Masa / Peso típico",
    dailyActivity: "Actividad diaria / Rendimiento",
    tissueArchitecture: "Arquitectura tisular",
    clinicalRelevance: "Relevancia clínica",
    commonConditions: "Afecciones comunes",
    compareFooterNote: "Seleccione cualquier órgano en el menú desplegable para comparar sus características.",
    close: "Cerrar",

    notesEyebrow: "Cuaderno interactivo & Métricas de estudio",
    notesTitle: "Diario de estudio clínico",
    notesLead: "Documente observaciones, perlas clínicas de alto rendimiento y supervise su progreso",
    tabActiveNote: "Nota del espécimen activo",
    tabAllNotes: "Todas las notas ({count})",
    tabProfile: "Perfil del estudiante & Estadísticas",
    highYieldPrompts: "Plantillas rápidas:",
    promptMorphologyLabel: "+ Morfología",
    promptMorphologyPrefix: "Morfología y puntos anatómicos: ",
    promptPhysiologyLabel: "+ Fisiología",
    promptPhysiologyPrefix: "Función fisiológica e irrigación sanguínea: ",
    promptClinicalLabel: "+ Perla clínica",
    promptClinicalPrefix: "Perla clínica de alto rendimiento: ",
    promptMnemonicLabel: "+ Mnemotecnia",
    promptMnemonicPrefix: "Tríada diagnóstica / Mnemotecnia: ",
    placeholderNotes: "Documente sus notas, tríadas diagnósticas u observaciones clínicas para {organ}...",
    noteSaved: "Nota guardada en el diario local",
    unsavedChanges: "Cambios no guardados (haga clic en Guardar nota abajo)",
    savedInJournal: "Guardado en el diario local",
    writeAndSave: "Escriba sus notas clínicas arriba y haga clic en Guardar nota",
    clear: "Borrar",
    copy: "Copiar",
    readLesson: "Leer lección",
    saveNote: "Guardar nota",
    allNotesHeader: "Notas anatómicas y clínicas guardadas en todas sus sesiones de estudio.",
    exportAll: "Exportar todo (.md)",
    emptyNotesTitle: "Aún no hay notas de estudio",
    emptyNotesDesc: "Seleccione un órgano arriba o cambie a la pestaña Nota activa para comenzar a anotar.",
    editNote: "Editar nota",
    viewIn3D: "Ver en 3D",
    organsExplored: "Órganos explorados",
    lessonsCompleted: "Lecciones completadas",
    notesAuthored: "Notas redactadas",
    bookmarked: "Guardados",
    quizHistory: "Historial de cuestionarios ({count} registros)",
    noQuizYet: "Aún no ha realizado cuestionarios teóricos. Ponga a prueba sus conocimientos en la vista de lección.",
    bestScore: "Mejor: {best} / {total} ({pct}%)",
    attempts: "{count} intento{s}",
    resetProgress: "Restablecer todo el progreso",
    confirmReset: "¿Desea restablecer todo el progreso, puntuaciones de cuestionarios y notas de estudio?",
    confirmClear: "¿Borrar las notas de estudio para {organ}?",

    theoryQuizTitle: "Cuestionario teórico de {organ}",
    noQuestionsYet: "Las preguntas teóricas para este órgano estarán disponibles próximamente.",
    take3DQuiz: "Realizar cuestionario de identificación 3D",
    questionOf: "Pregunta {current} de {total}",
    scoreLabel: "Puntuación: {score}",
    explanation: "Explicación:",
    nextQuestion: "Siguiente pregunta",
    finishQuiz: "Finalizar cuestionario",
    quizComplete: "¡Cuestionario completado!",
    youScored: "Obtuvo {score} de {total} puntos",
    retryQuiz: "Reintentar cuestionario teórico",

    histologicalLayers: "Capas histológicas",
    openInteractiveSystemsMap: "Abrir mapa interactivo de sistemas",
  },

  ar: {
    systemsHeroTitle: "أجهزة الجسم",
    systemsHeroSubtitle: "اثنا عشر جهازاً عضوياً تعمل ككل حي متناسق. اختر جهازاً لتسليط الضوء على مساره في الجسم.",
    selectSystem: "اختر الجهاز",
    figureHint: "انقر على أي عضو أو جهاز للتركيز عليه",
    systemDetails: "تفاصيل الجهاز",
    interactiveModels: "نماذج ثلاثية الأبعاد تفاعلية",
    backTo3D: "العودة إلى الاستكشاف ثلاثي الأبعاد",
    systemsInterdependentNote: "جميع أجهزة الجسم مترابطة وظيفياً — لا يعمل أي عضو بمعزل عن الآخر.",

    lessonEyebrow: "الدرس المتقدم والمنهج السريري",
    lessonLead: "دراسة منهجية للبنية التشريحية والوظيفة الفسيولوجية والباثولوجيا السريرية",
    prevSpecimen: "العينة السابقة",
    nextSpecimen: "العينة التالية",
    selectLessonAria: "اختر درس العينة",
    readTime: "~4 دقائق قراءة",
    markComplete: "وضع علامة مكتمل",
    lessonCompleted: "اكتمل الدرس",
    coreObjectives: "أهداف التعلم الأساسية",
    anatomicalArchitecture: "الهندسة التشريحية والشكل الخارجي",
    tissueType: "نوع النسيج",
    physicalDimensions: "الأبعاد الفيزيائية",
    specimenMass: "كتلة العينة",
    physiologicalMechanisms: "الآليات الفسيولوجية وعبء العمل",
    vascularSupply: "التغذية الوعائية والديناميكية الدموية:",
    clinicalCorrelates: "الروابط السريرية والأمراض",
    canonicalLiterature: "المراجع والأدبيات المعتمدة",
    practiceQuiz: "بدء الاختبار التدريبي",
    takeNotes: "تدوين الملاحظات",
    saveProgress: "حفظ تقدم الدرس",
    inspectIn3D: "فحص {organ} ثلاثي الأبعاد",

    compareEyebrow: "التشريح والفسيولوجيا المقارنة",
    compareLead: "فحص متقاطع للسمات الوظيفية والمورفولوجية والسريرية",
    activeModel: "النموذج النشط",
    targetReference: "المرجع المقارن",
    swap: "تبديل",
    chooseReferenceAria: "اختر العضو المقارن",
    anatomicalMetric: "المعيار التشريحي",
    organSystem: "الجهاز العضوي",
    scientificTerm: "المصطلح العلمي (TA2)",
    primaryFunction: "الوظيفة الأساسية",
    physicalScale: "المقياس الفيزيائي",
    typicalMass: "الكتلة / الوزن النموذجي",
    dailyActivity: "النشاط اليومي / العبء",
    tissueArchitecture: "بنية الأنسجة",
    clinicalRelevance: "الأهمية السريرية",
    commonConditions: "الحالات الشائعة",
    compareFooterNote: "اختر أي عضو من القائمة المنسدلة للمقارنة بين خصائصهما التشريحية.",
    close: "إغلاق",

    notesEyebrow: "دفتر الملاحظات والمقاييس الدراسية التفاعلية",
    notesTitle: "دفتر الدراسة السريرية",
    notesLead: "دوّن ملاحظاتك واللآلئ السريرية وتابع تقدمك في المنهج",
    tabActiveNote: "ملاحظة العينة النشطة",
    tabAllNotes: "جميع الملاحظات ({count})",
    tabProfile: "ملف المتعلم والإحصاءات",
    highYieldPrompts: "قوالب سريعة عالية الفائدة:",
    promptMorphologyLabel: "+ الشكل والتشريح",
    promptMorphologyPrefix: "التشريح والمعالم الهيكلية: ",
    promptPhysiologyLabel: "+ الفسيولوجيا",
    promptPhysiologyPrefix: "الدور الفسيولوجي والتروية الدموية: ",
    promptClinicalLabel: "+ لؤلؤة سريرية",
    promptClinicalPrefix: "لؤلؤة سريرية مهمة: ",
    promptMnemonicLabel: "+ وسيلة تذكر",
    promptMnemonicPrefix: "ثلاثية تشخيصية / مفتاح حفظ: ",
    placeholderNotes: "سجل ملاحظاتك أو الثلاثيات التشخيصية أو الملاحظات السريرية الخاصة بـ {organ}...",
    noteSaved: "تم حفظ الملاحظة في السجل المحلي",
    unsavedChanges: "تغييرات غير محفوظة (انقر على حفظ الملاحظة أدناه)",
    savedInJournal: "محفوظ في السجل المحلي",
    writeAndSave: "اكتب ملاحظاتك السريرية أعلاه ثم انقر على حفظ الملاحظة",
    clear: "مسح",
    copy: "نسخ",
    readLesson: "قراءة الدرس",
    saveNote: "حفظ الملاحظة",
    allNotesHeader: "الملاحظات التشريحية والسريرية المحفوظة عبر جلساتك الدراسية.",
    exportAll: "تصدير الكل (.md)",
    emptyNotesTitle: "لا توجد ملاحظات دراسية بعد",
    emptyNotesDesc: "اختر أي عضو من القائمة أعلاه أو انتقل إلى تبويب ملاحظة العينة النشطة لبدء التدوين.",
    editNote: "تعديل الملاحظة",
    viewIn3D: "عرض ثلاثي الأبعاد",
    organsExplored: "الأعضاء المستكشفة",
    lessonsCompleted: "الدروس المكتملة",
    notesAuthored: "الملاحظات المكتوبة",
    bookmarked: "المحفوظات",
    quizHistory: "سجل الاختبارات ({count} سجل)",
    noQuizYet: "لم تجرِ أي اختبارات نظرية بعد. اختبر معلوماتك من صفحة الدرس أو الاختبار لأي عضو.",
    bestScore: "الأفضل: {best} / {total} ({pct}%)",
    attempts: "{count} محاولة",
    resetProgress: "إعادة ضبط كل التقدم",
    confirmReset: "هل تريد حقاً إعادة ضبط جميع سجلات التقدم والاختبارات والملاحظات؟",
    confirmClear: "هل تريد مسح الملاحظات الخاصة بـ {organ}؟",

    theoryQuizTitle: "اختبار نظري: {organ}",
    noQuestionsYet: "الأسئلة النظرية لهذا العضو ستتوفر قريباً.",
    take3DQuiz: "بدء اختبار التسمية ثلاثي الأبعاد",
    questionOf: "السؤال {current} من {total}",
    scoreLabel: "النتيجة: {score}",
    explanation: "التفسير:",
    nextQuestion: "السؤال التالي",
    finishQuiz: "إنهاء الاختبار",
    quizComplete: "اكتمل الاختبار!",
    youScored: "لقد أحرزت {score} من {total}",
    retryQuiz: "إعادة المحاولة",

    histologicalLayers: "الطبقات النسيجية",
    openInteractiveSystemsMap: "فتح خريطة الأجهزة التفاعلية",
  },

  pt: {
    systemsHeroTitle: "Sistemas Corporais",
    systemsHeroSubtitle: "Doze sistemas orgânicos trabalhando como uma unidade viva coordenada. Selecione um sistema para destacar seu trajeto pelo corpo.",
    selectSystem: "Selecionar sistema",
    figureHint: "Clique em qualquer órgão ou sistema para focar",
    systemDetails: "Detalhes do sistema",
    interactiveModels: "Modelos 3D interativos",
    backTo3D: "Voltar à exploração 3D",
    systemsInterdependentNote: "Todos os sistemas de órgãos são interdependentes — nenhum órgão funciona isoladamente.",

    lessonEyebrow: "Masterclass & Currículo Clínico",
    lessonLead: "Estudo sistemático da estrutura anatômica, função fisiológica e patologia clínica",
    prevSpecimen: "Espécime anterior",
    nextSpecimen: "Próximo espécime",
    selectLessonAria: "Selecionar lição do espécime",
    readTime: "~4 min de leitura",
    markComplete: "Marcar como Concluído",
    lessonCompleted: "Lição Concluída",
    coreObjectives: "Objetivos Principais de Aprendizagem",
    anatomicalArchitecture: "Arquitetura Anatômica & Morfologia",
    tissueType: "Tipo de Tecido",
    physicalDimensions: "Dimensões Físicas",
    specimenMass: "Massa do Espécime",
    physiologicalMechanisms: "Mecanismos Fisiológicos & Carga de Trabalho",
    vascularSupply: "Suprimento Vascular & Hemodinâmico:",
    clinicalCorrelates: "Correlações Clínicas & Patologia",
    canonicalLiterature: "Literatura & Referências Canônicas",
    practiceQuiz: "Praticar Questionário",
    takeNotes: "Fazer Anotações",
    saveProgress: "Salvar Progresso da Lição",
    inspectIn3D: "Inspecionar {organ} em 3D",

    compareEyebrow: "Anatomia & Fisiologia Comparada",
    compareLead: "Exame cruzado de características funcionais, morfológicas e clínicas",
    activeModel: "Modelo Ativo",
    targetReference: "Referência Alvo",
    swap: "Inverter",
    chooseReferenceAria: "Escolha o órgão de referência para comparar",
    anatomicalMetric: "Métrica Anatômica",
    organSystem: "Sistema Orgânico",
    scientificTerm: "Termo Científico (TA2)",
    primaryFunction: "Função Principal",
    physicalScale: "Escala Física",
    typicalMass: "Massa / Peso Típico",
    dailyActivity: "Atividade Diária / Demanda",
    tissueArchitecture: "Arquitetura Tecidual",
    clinicalRelevance: "Relevância Clínica",
    commonConditions: "Condições Comuns",
    compareFooterNote: "Selecione qualquer órgão no menu suspenso para comparar suas características anatômicas.",
    close: "Fechar",

    notesEyebrow: "Caderno Interativo & Métricas de Estudo",
    notesTitle: "Diário de Estudo Clínico",
    notesLead: "Registre observações, pérolas clínicas de alto rendimento e acompanhe o progresso",
    tabActiveNote: "Nota do Espécime Ativo",
    tabAllNotes: "Todas as Anotações ({count})",
    tabProfile: "Perfil do Aluno & Estatísticas",
    highYieldPrompts: "Modelos Rápidos:",
    promptMorphologyLabel: "+ Morfologia",
    promptMorphologyPrefix: "Morfologia e Marcos Anatômicos: ",
    promptPhysiologyLabel: "+ Fisiologia",
    promptPhysiologyPrefix: "Papel Fisiológico e Suprimento Sanguíneo: ",
    promptClinicalLabel: "+ Pérola Clínica",
    promptClinicalPrefix: "Pérola Clínica de Alto Rendimento: ",
    promptMnemonicLabel: "+ Mnemônico",
    promptMnemonicPrefix: "Tríade Diagnóstica / Mnemônico: ",
    placeholderNotes: "Registre suas anotações, tríades diagnósticas ou observações clínicas para {organ}...",
    noteSaved: "Nota salva no diário local",
    unsavedChanges: "Alterações não salvas (clique em Salvar Nota abaixo)",
    savedInJournal: "Salvo no diário local",
    writeAndSave: "Escreva suas anotações acima e clique em Salvar Nota",
    clear: "Limpar",
    copy: "Copiar",
    readLesson: "Ler Lição",
    saveNote: "Salvar Nota",
    allNotesHeader: "Notas anatômicas e clínicas salvas ao longo de suas sessões de estudo.",
    exportAll: "Exportar Tudo (.md)",
    emptyNotesTitle: "Nenhuma anotação ainda",
    emptyNotesDesc: "Selecione um órgão acima ou mude para a aba Nota Ativa para começar a escrever.",
    editNote: "Editar Nota",
    viewIn3D: "Ver em 3D",
    organsExplored: "Órgãos Explorados",
    lessonsCompleted: "Lições Concluídas",
    notesAuthored: "Notas Redigidas",
    bookmarked: "Marcados",
    quizHistory: "Histórico de Questionários ({count} registros)",
    noQuizYet: "Nenhum teste teórico realizado ainda. Teste seus conhecimentos na lição do órgão.",
    bestScore: "Melhor: {best} / {total} ({pct}%)",
    attempts: "{count} tentativa{s}",
    resetProgress: "Redefinir Todo o Progresso",
    confirmReset: "Deseja redefinir todo o progresso, pontuações de questionários e notas de estudo?",
    confirmClear: "Limpar as notas de estudo de {organ}?",

    theoryQuizTitle: "Questionário Teórico: {organ}",
    noQuestionsYet: "Perguntas teóricas para este órgão estarão disponíveis em breve.",
    take3DQuiz: "Fazer Questionário de Identificação 3D",
    questionOf: "Pergunta {current} de {total}",
    scoreLabel: "Pontuação: {score}",
    explanation: "Explicação:",
    nextQuestion: "Próxima Pergunta",
    finishQuiz: "Concluir Questionário",
    quizComplete: "Questionário Concluído!",
    youScored: "Você obteve {score} de {total}",
    retryQuiz: "Refazer Questionário Teórico",

    histologicalLayers: "Camadas Histológicas",
    openInteractiveSystemsMap: "Abrir Mapa Interativo de Sistemas",
  },

  ru: {
    systemsHeroTitle: "Системы органов",
    systemsHeroSubtitle: "Двенадцать систем органов, работающих как единое гармоничное целое. Выберите систему, чтобы увидеть её расположение в теле.",
    selectSystem: "Выберите систему",
    figureHint: "Нажмите на любой орган или систему для фокусировки",
    systemDetails: "Детали системы",
    interactiveModels: "Интерактивные 3D-модели",
    backTo3D: "Назад к 3D-исследованию",
    systemsInterdependentNote: "Все системы органов функционально взаимосвязаны — ни один орган не работает изолированно.",

    lessonEyebrow: "Мастер-класс & Клиническая программа",
    lessonLead: "Систематическое изучение анатомического строения, физиологии и клинической патологии",
    prevSpecimen: "Предыдущий препарат",
    nextSpecimen: "Следующий препарат",
    selectLessonAria: "Выбрать урок по препарату",
    readTime: "~4 мин чтения",
    markComplete: "Отметить как пройденный",
    lessonCompleted: "Урок пройден",
    coreObjectives: "Ключевые цели обучения",
    anatomicalArchitecture: "Анатомическая архитектура & Морфология",
    tissueType: "Тип ткани",
    physicalDimensions: "Физические размеры",
    specimenMass: "Масса препарата",
    physiologicalMechanisms: "Физиологические механизмы & Нагрузка",
    vascularSupply: "Кровоснабжение & Гемодинамика:",
    clinicalCorrelates: "Клинические аспекты & Патология",
    canonicalLiterature: "Литература & Академические источники",
    practiceQuiz: "Пройти тест",
    takeNotes: "Делать заметки",
    saveProgress: "Сохранить прогресс урока",
    inspectIn3D: "Исследовать {organ} в 3D",

    compareEyebrow: "Сравнительная анатомия & Физиология",
    compareLead: "Сопоставление функциональных, морфологических и клинических особенностей",
    activeModel: "Активная модель",
    targetReference: "Образец сравнения",
    swap: "Поменять местами",
    chooseReferenceAria: "Выберите орган для сравнения",
    anatomicalMetric: "Анатомический параметр",
    organSystem: "Система органов",
    scientificTerm: "Латинский термин (TA2)",
    primaryFunction: "Основная функция",
    physicalScale: "Размеры",
    typicalMass: "Типичная масса / Вес",
    dailyActivity: "Суточная нагрузка",
    tissueArchitecture: "Тканевая организация",
    clinicalRelevance: "Клиническое значение",
    commonConditions: "Характерные заболевания",
    compareFooterNote: "Выберите любой орган в выпадающем списке для детального сравнительного анализа.",
    close: "Закрыть",

    notesEyebrow: "Интерактивный конспект & Метрики обучения",
    notesTitle: "Клинический учебный журнал",
    notesLead: "Записывайте клинические наблюдения, мнемоники и отслеживайте прогресс обучения",
    tabActiveNote: "Заметка по активному органу",
    tabAllNotes: "Все заметки ({count})",
    tabProfile: "Профиль учащегося & Статистика",
    highYieldPrompts: "Быстрые шаблоны:",
    promptMorphologyLabel: "+ Морфология",
    promptMorphologyPrefix: "Морфология и анатомические ориентиры: ",
    promptPhysiologyLabel: "+ Физиология",
    promptPhysiologyPrefix: "Физиологическая роль и кровоснабжение: ",
    promptClinicalLabel: "+ Клиническая жемчужина",
    promptClinicalPrefix: "Клиническая жемчужина: ",
    promptMnemonicLabel: "+ Мнемоника",
    promptMnemonicPrefix: "Диагностическая триада / Мнемоника: ",
    placeholderNotes: "Запишите ваши заметки, триады или клинические наблюдения по органу ({organ})...",
    noteSaved: "Заметка сохранена в локальный журнал",
    unsavedChanges: "Несохранённые изменения (нажмите Сохранить заметку)",
    savedInJournal: "Сохранено в локальном журнале",
    writeAndSave: "Напишите ваши заметки выше и нажмите Сохранить заметку",
    clear: "Очистить",
    copy: "Копировать",
    readLesson: "Читать урок",
    saveNote: "Сохранить заметку",
    allNotesHeader: "Сохранённые анатомические и клинические заметки за всё время обучения.",
    exportAll: "Экспортировать всё (.md)",
    emptyNotesTitle: "Заметок пока нет",
    emptyNotesDesc: "Выберите орган выше или перейдите во вкладку Заметка по активному органу, чтобы начать писать.",
    editNote: "Редактировать",
    viewIn3D: "Смотреть в 3D",
    organsExplored: "Изучено органов",
    lessonsCompleted: "Пройдено уроков",
    notesAuthored: "Создано заметок",
    bookmarked: "В закладках",
    quizHistory: "История тестов ({count} записей)",
    noQuizYet: "Вы ещё не проходили теоретические тесты. Проверьте свои знания в уроке любого органа.",
    bestScore: "Лучший результат: {best} / {total} ({pct}%)",
    attempts: "{count} попыт{s}",
    resetProgress: "Сбросить весь прогресс",
    confirmReset: "Сбросить весь прогресс обучения, результаты тестов и заметки?",
    confirmClear: "Очистить заметки для органа {organ}?",

    theoryQuizTitle: "Теоретический тест: {organ}",
    noQuestionsYet: "Теоретические вопросы для этого органа скоро появятся.",
    take3DQuiz: "Пройти тест на 3D-модели",
    questionOf: "Вопрос {current} из {total}",
    scoreLabel: "Счёт: {score}",
    explanation: "Объяснение:",
    nextQuestion: "Следующий вопрос",
    finishQuiz: "Завершить тест",
    quizComplete: "Тест завершён!",
    youScored: "Вы набрали {score} из {total}",
    retryQuiz: "Пройти тест заново",

    histologicalLayers: "Гистологические слои",
    openInteractiveSystemsMap: "Открыть интерактивную карту систем",
  },
};

export function getModalDictionary(locale: string): ModalTranslations {
  return modalDictionaries[locale] ?? modalDictionaries.en;
}
