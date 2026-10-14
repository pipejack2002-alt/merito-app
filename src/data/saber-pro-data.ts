/**
 * Banco de Preguntas y Datos Oficiales ICFES Saber Pro 2026
 * Adaptado a la estructura oficial del ICFES:
 * - Sesión 1: Competencias Genéricas (Lectura Crítica, Razonamiento Cuantitativo,
 *   Competencias Ciudadanas, Inglés, Comunicación Escrita).
 * - Sesión 2: Competencias Específicas por Carrera (Contaduría Pública: Gestión Financiera
 *   y Aseguramiento de la Información, además de Administración, Derecho e Ingeniería).
 */

export interface SaberProChoice {
  id: string; // "A" | "B" | "C" | "D"
  text: string;
}

export interface SaberProQuestion {
  id: string;
  session: "generica" | "especifica";
  areaId: string;
  areaLabel: string;
  careerId?: string; // "contaduria" | "administracion" | "derecho" | "ingenieria" | "todas"
  careerLabel?: string;
  contextText?: string;
  stem: string;
  choices: SaberProChoice[];
  correct: string;
  explanation: string;
  methodTip?: string; // Técnica o método paso a paso para resolver preguntas similares en el examen
  distractorAnalysis?: string; // Análisis de descarte de trampas del ICFES
  competency: string;
  source: string;
}

export interface SaberProCareer {
  id: string;
  name: string;
  faculty: string;
  specificModules: { id: string; name: string; description: string }[];
}

export const SABER_PRO_CAREERS: SaberProCareer[] = [
  {
    id: "contaduria",
    name: "Contaduría Pública",
    faculty: "Ciencias Económicas y Administrativas",
    specificModules: [
      {
        id: "gestion-financiera",
        name: "Gestión Financiera",
        description:
          "Evaluación de la estructura financiera, análisis de razones financieras, flujos de caja, costo de capital y decisiones de inversión y financiamiento.",
      },
      {
        id: "aseguramiento-informacion",
        name: "Aseguramiento y Control de la Información",
        description:
          "Normas Internacionales de Auditoría (NIAs), marco de control interno COSO, dictámenes de revisoría fiscal, papeles de trabajo y riesgos de auditoría.",
      },
      {
        id: "informacion-contable",
        name: "Información Contable y Tributaria",
        description:
          "Aplicación de marcos normativos NIIF / IFRS, medición posterior de activos y pasivos, deterioro de valor e impuesto a las ganancias diferido (NIC 12).",
      },
    ],
  },
  {
    id: "administracion",
    name: "Administración de Empresas y Afines",
    faculty: "Ciencias Administrativas",
    specificModules: [
      {
        id: "gestion-organizaciones",
        name: "Gestión de Organizaciones",
        description:
          "Estrategia empresarial, diseño organizacional, dirección de operaciones y talento humano.",
      },
      {
        id: "gestion-financiera-admin",
        name: "Gestión Financiera",
        description:
          "Presupuestos, rentabilidad, decisiones de inversión y valor de la empresa.",
      },
    ],
  },
  {
    id: "derecho",
    name: "Derecho",
    faculty: "Ciencias Jurídicas",
    specificModules: [
      {
        id: "argumentacion-juridica",
        name: "Investigación y Argumentación Jurídica",
        description:
          "Análisis jurisprudencial, fuentes del derecho, interpretación normativa y litigio.",
      },
    ],
  },
  {
    id: "ingenieria",
    name: "Ingeniería (Sistemas, Industrial, Civil)",
    faculty: "Ingeniería y Tecnologías",
    specificModules: [
      {
        id: "formulacion-proyectos",
        name: "Formulación de Proyectos de Ingeniería",
        description:
          "Evaluación técnica y económica, riesgos, ciclo de vida del proyecto e impacto ambiental.",
      },
    ],
  },
];

export const GENERIC_AREAS = [
  {
    id: "lectura-critica",
    name: "Lectura Crítica",
    questionsCount: 35,
    description: "Comprensión inferencial, identificación de argumentos, premisas, falacias y visión del autor.",
    icon: "BookOpen",
  },
  {
    id: "razonamiento-cuantitativo",
    name: "Razonamiento Cuantitativo",
    questionsCount: 35,
    description: "Interpretación de datos estadísticos, gráficas, formulación matemática y resolución de problemas.",
    icon: "Calculator",
  },
  {
    id: "competencias-ciudadanas",
    name: "Competencias Ciudadanas",
    questionsCount: 35,
    description: "Constitución Política de 1991, mecanismos constitucionales, pensamiento social y análisis de perspectivas.",
    icon: "ShieldAlert",
  },
  {
    id: "ingles",
    name: "Inglés",
    questionsCount: 55,
    description: "Marco Común Europeo (A1 a B2), gramática contextual, vocabulario y comprensión de textos.",
    icon: "Languages",
  },
  {
    id: "comunicacion-escrita",
    name: "Comunicación Escrita",
    questionsCount: 1,
    description: "Producción de un texto argumentativo con tesis clara, cohesión y desarrollo de contraargumentos.",
    icon: "PenTool",
  },
];

export const SABER_PRO_QUESTIONS: SaberProQuestion[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. SESIÓN 1 · GENÉRICAS · LECTURA CRÍTICA
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-lc-01",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    competency: "Identificar y entender los contenidos locales y la articulación de un texto",
    source: "Guía de Orientación Saber Pro · ICFES",
    contextText:
      "«Nadie es libre si no es dueño de sí mismo. Aquel que sucumbe ante sus impulsos más bajos o ante las opiniones volubles de las multitudes renuncia a su autonomía interior. La verdadera libertad no consiste en hacer lo que nos plazca sin restricciones externas, sino en la capacidad racional de autodeterminarse conforme a principios universales, incluso cuando las inclinaciones inmediatas sugieran el camino opuesto.»",
    stem: "¿Cuál de los siguientes enunciados sintetiza con mayor precisión la tesis principal del autor?",
    choices: [
      { id: "A", text: "La libertad consiste en eliminar toda forma de restricción legal impuesta por el Estado." },
      { id: "B", text: "La autonomía interior y el autocontrol racional son la base indispensable de la auténtica libertad." },
      { id: "C", text: "Las opiniones de las multitudes son siempre falsas y conducen a la tiranía social." },
      { id: "D", text: "El placer y los impulsos individuales son incompatibles con la vida en sociedad." },
    ],
    correct: "B",
    explanation:
      "La opción B recoge con exactitud la tesis central: el autor define la libertad no como actuar por impulso, sino como el autodominio racional guiado por principios. Las demás opciones generalizan en exceso o desvían el foco del texto.",
    methodTip:
      "Técnica para preguntas de Tesis Principal: Identifica el núcleo afirmativo que el autor defiende contra opiniones contrarias. Descarta premisas secundarias, ejemplos o conclusiones extremas que agreguen términos no formulados en el texto.",
    distractorAnalysis:
      "La A añade 'restricción legal impuesta por el Estado' (el texto habla de autonomía interior, no de leyes estatales). La C y D usan términos absolutistas ('siempre falsas', 'incompatibles'), que son distractores típicos de generalización indebida.",
  },
  {
    id: "sp-lc-02",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    competency: "Reflexionar a partir de un texto y evaluar su contenido",
    source: "Módulo Oficial Lectura Crítica ICFES",
    contextText:
      "En un debate sobre políticas públicas de transporte, un congresista afirma: «No debemos invertir recursos públicos en ciclorrutas ni subsidiar la bicicleta, porque el arquitecto que diseñó el plan maestro de movilidad admitió públicamente que nunca ha tenido una bicicleta ni sabe manejarla».",
    stem: "¿Qué debilidad lógica o falacia argumentativa comete el congresista?",
    choices: [
      { id: "A", text: "Apelación a la piedad (ad misericordiam), pues busca conmover emocionalmente al público." },
      { id: "B", text: "Ataque a la persona (ad hominem), pues desacredita la propuesta atacando un rasgo personal del autor en lugar de refutar los méritos técnicos del plan." },
      { id: "C", text: "Falsa analogía, porque compara erróneamente el uso de la bicicleta con los vehículos de carga pesada." },
      { id: "D", text: "Petición de principio, pues asume de antemano que la movilidad sostenible es imposible." },
    ],
    correct: "B",
    explanation:
      "La falacia es 'ad hominem': el congresista intenta invalidar un proyecto técnico de transporte argumentando que el diseñador no monta bicicleta, en vez de evaluar la viabilidad financiera, técnica o ambiental del plan.",
    methodTip:
      "Técnica para identificar Falacias: Pregúntate ¿el interlocutor está atacando la validez técnica de la propuesta o la vida/hábitos personales de quien la propone? Si ataca al emisor en lugar del argumento, es invariable 'ad hominem'.",
    distractorAnalysis:
      "Ad misericordiam exige manipulación de culpa o lástima (inexistente aquí); falsa analogía compara dos escenarios disímiles; petición de principio usa la conclusión dentro de la premisa.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. SESIÓN 1 · GENÉRICAS · RAZONAMIENTO CUANTITATIVO
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-rc-01",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    competency: "Interpretación y representación de datos",
    source: "Banco Oficial Razonamiento Cuantitativo ICFES",
    contextText:
      "Una empresa manufacturera reportó que sus costos de producción en el primer semestre fueron de $120.000.000 COP. Para el segundo semestre, debido a la inflación de materias primas, los costos aumentaron un 20%. Posteriormente, mediante un plan de eficiencia energética, se logró reducir el nuevo costo en un 10%.",
    stem: "¿Cuál fue el costo final de producción de la empresa al terminar el segundo semestre?",
    choices: [
      { id: "A", text: "$120.000.000 COP, pues el aumento del 20% se compensa con la reducción del 10% y el margen." },
      { id: "B", text: "$132.000.000 COP." },
      { id: "C", text: "$129.600.000 COP." },
      { id: "D", text: "$134.400.000 COP." },
    ],
    correct: "C",
    explanation:
      "Paso 1: Aumento del 20% sobre $120.000.000 = $120.000.000 × 1.20 = $144.000.000 COP. Paso 2: Reducción del 10% sobre la nueva base: $144.000.000 × (1 - 0.10) = $144.000.000 × 0.90 = $129.600.000 COP. La trampa habitual es restar directamente 20% - 10% = 10%, lo que daría erróneamente $132.000.000.",
    methodTip:
      "Regla de Aumentos y Descuentos Sucesivos: Multiplica los factores de cambio (1 + a) × (1 - d). Aquí: 1.20 × 0.90 = 1.08. El costo final es 108% del inicial: $120M × 1.08 = $129.6M. Aplica este atajo en cualquier pregunta de variaciones sucesivas sin calculadora.",
    distractorAnalysis:
      "La opción B ($132.000.000) es la trampa reina del ICFES: restar 20% - 10% = 10% y aplicarlo a la base inicial. Recuerda que el segundo porcentaje se calcula sobre la nueva base aumentada ($144M), no sobre los $120M.",
  },
  {
    id: "sp-rc-02",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    competency: "Formulación y ejecución",
    source: "ICFES Saber Pro",
    contextText:
      "Una entidad financiera ofrece un rendimiento del 12% nominal anual liquidado mes vencido (1% mensual simple de interés compuesto). Un inversionista deposita $10.000.000 COP durante un plazo de 3 meses bajo interés compuesto con reinversión de rendimientos.",
    stem: "¿Cuál es el valor acumulado final aproximado que recibirá el inversionista al cabo del tercer mes?",
    choices: [
      { id: "A", text: "$10.300.000 COP." },
      { id: "B", text: "$10.303.010 COP." },
      { id: "C", text: "$10.360.000 COP." },
      { id: "D", text: "$11.200.000 COP." },
    ],
    correct: "B",
    explanation:
      "Fórmula de interés compuesto: VF = VP × (1 + i)^n. VF = $10.000.000 × (1 + 0.01)^3 = $10.000.000 × (1.01)^3 = $10.000.000 × 1.030301 = $10.303.010 COP. La opción A corresponde a interés simple.",
    methodTip:
      "Método de Interés Compuesto sin Calculadora: Calcula mes a mes el 1%: Mes 1: 10M + 100k = 10.100.000. Mes 2: 10.100.000 + 101.000 = 10.201.000. Mes 3: 10.201.000 + 102.010 = 10.303.010 COP. Sumar los 'intereses de los intereses' te da la clave exacta.",
    distractorAnalysis:
      "La opción A ($10.300.000) calcula interés simple (10M + 300k), ignorando la capitalización periódica.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. SESIÓN 1 · GENÉRICAS · COMPETENCIAS CIUDADANAS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cc-01",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    competency: "Pensamiento social y mecanismos constitucionales",
    source: "Módulo Competencias Ciudadanas ICFES",
    contextText:
      "A una ciudadana de 68 años con una afección cardiaca grave, su Entidad Promotora de Salud (EPS) le niega la autorización de un procedimiento quirúrgico de urgencia alegando demoras en trámites administrativos internos. El médico tratante certifica que aplazar la cirugía pone en riesgo inminente la vida de la paciente.",
    stem: "¿Cuál es el mecanismo constitucional expedito, idóneo y prioritario que la ciudadana debe interponer para proteger inmediatamente su derecho a la vida y a la salud?",
    choices: [
      { id: "A", text: "Acción de Tutela ante cualquier juez de la República." },
      { id: "B", text: "Acción Popular ante el Tribunal Administrativo." },
      { id: "C", text: "Acción de Cumplimiento ante la Procuraduría General de la Nación." },
      { id: "D", text: "Demanda de nulidad y restablecimiento del derecho ante el Consejo de Estado." },
    ],
    correct: "A",
    explanation:
      "Según el Artículo 86 de la Constitución Política de 1991, la Acción de Tutela es el mecanismo judicial preferente y sumario para proteger derechos fundamentales (como la vida y la salud conexa) ante vulneraciones o amenazas inminentes de autoridades o particulares que prestan servicios públicos.",
  },
  {
    id: "sp-cc-02",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    competency: "Multiperspectivismo y análisis de conflictos",
    source: "ICFES Competencias Ciudadanas",
    contextText:
      "En un municipio andino se debate la concesión de títulos de minería de oro en una zona boscosa cercana a la cuenca que abastece el acueducto municipal. La empresa minera argumenta que el proyecto generará 800 empleos directos y regalías millonarias para obras. La comunidad campesina e indígena se opone argumentando la contaminación con cianuro y la destrucción irreversible de la fuente hídrica.",
    stem: "¿Qué tensión fundamental de valores o intereses subyace en este conflicto?",
    choices: [
      { id: "A", text: "Entre la soberanía energética del país y los tratados de libre comercio." },
      { id: "B", text: "Entre el crecimiento económico / generación de empleo local y la sostenibilidad ambiental / derecho fundamental al agua." },
      { id: "C", text: "Entre el orden público municipal y las competencias exclusivas de la Fiscalía." },
      { id: "D", text: "Entre el derecho a la propiedad privada del subsuelo y la potestad del alcalde." },
    ],
    correct: "B",
    explanation:
      "El conflicto enfrenta directamente dos dimensiones legítimas pero contrapuestas: el desarrollo económico y rentabilidad financiera versus la protección ambiental y el acceso al agua potable como derecho humano fundamental.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. SESIÓN 1 · GENÉRICAS · INGLÉS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-in-01",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    competency: "Reading comprehension and grammatical knowledge",
    source: "ICFES Saber Pro English Module (CEFR B1-B2)",
    contextText:
      "Read the text: «Corporate social responsibility (CSR) has evolved from a philanthropic luxury into a core business imperative. Modern stakeholders, including investors and consumers, increasingly scrutinize not only what a company earns, but how those earnings are generated. Organizations that fail to implement sustainable environmental and labor practices face severe reputational backlash and regulatory penalties.»",
    stem: "According to the passage, why is CSR no longer considered optional for modern organizations?",
    choices: [
      { id: "A", text: "Because governments have completely eliminated traditional corporate taxes for sustainable companies." },
      { id: "B", text: "Because stakeholders actively evaluate ethical, labor, and environmental practices, and failing to comply leads to financial and reputational risks." },
      { id: "C", text: "Because consumers only buy products from non-profit charitable organizations." },
      { id: "D", text: "Because companies can easily hide their internal operations from external regulators." },
    ],
    correct: "B",
    explanation:
      "The passage explicitly states that stakeholders scrutinize how earnings are generated, and companies that fail to adopt sustainable practices face regulatory penalties and reputational backlash.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. SESIÓN 2 · ESPECÍFICAS · CONTADURÍA PÚBLICA (Gestión Financiera)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-gf-01",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Evaluación y diagnóstico de la situación financiera empresarial",
    source: "Guía Saber Pro Módulo de Gestión Financiera (ICFES)",
    contextText:
      "La empresa Comercial Andina S.A.S. presenta al 31 de diciembre los siguientes datos en su Estado de Situación Financiera: Activo Corriente = $500.000.000 COP; Inventarios = $220.000.000 COP; Gastos pagados por anticipado = $30.000.000 COP; Pasivo Corriente = $250.000.000 COP.",
    stem: "Al calcular la Razón Corriente y la Prueba Ácida (Razón Rápida), ¿cuál es el diagnóstico correcto de la liquidez inmediata de la compañía?",
    choices: [
      { id: "A", text: "Razón Corriente = 2.0 y Prueba Ácida = 1.0; la empresa posee respaldo corriente holgado y liquidez inmediata justa para cubrir sus pasivos a corto plazo sin depender de la venta de inventarios." },
      { id: "B", text: "Razón Corriente = 1.0 y Prueba Ácida = 2.0; la compañía está en quiebra técnica por exceso de inventarios." },
      { id: "C", text: "Razón Corriente = 2.0 y Prueba Ácida = 0.5; la empresa no puede cubrir sus deudas a corto plazo." },
      { id: "D", text: "Razón Corriente = 1.5 y Prueba Ácida = 1.5; la liquidez de la empresa no depende de sus inventarios." },
    ],
    correct: "A",
    explanation:
      "Cálculos: 1) Razón Corriente = Activo Corriente / Pasivo Corriente = $500.000.000 / $250.000.000 = 2.0. Por cada peso de deuda a corto plazo, la empresa tiene $2.00 de respaldo. 2) Prueba Ácida = (Activo Corriente - Inventarios - Gastos Anticipados) / Pasivo Corriente = ($500.000.000 - $220.000.000 - $30.000.000) / $250.000.000 = $250.000.000 / $250.000.000 = 1.0. Esto significa que la empresa puede cubrir el 100% de sus pasivos corrientes inmediatos sin necesidad de vender sus inventarios.",
    methodTip:
      "Técnica para Índices de Liquidez: Primero calcula la Razón Corriente = AC / PC. Si todas las opciones son distintas, ya tienes la respuesta. Para la Prueba Ácida, SIEMPRE resta los Inventarios y los Gastos Anticipados del numerador antes de dividir entre el Pasivo Corriente.",
    distractorAnalysis:
      "La opción C omite restar gastos anticipados; la D inventa valores sin sustento en el balance; la B invierte la relación entre razón corriente y prueba ácida.",
  },
  {
    id: "sp-cp-gf-02",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Decisiones de inversión y estructura de capital",
    source: "ICFES Saber Pro · Gestión Financiera",
    contextText:
      "Una empresa evalúa dos proyectos de inversión mutuamente excluyentes (Proyecto Alfa y Proyecto Beta) con una tasa de descuento (WACC) del 14% E.A.:\n- Proyecto Alfa: VPN = +$45.000.000 COP; TIR = 21%; Periodo de Recuperación (Payback) = 3.5 años.\n- Proyecto Beta: VPN = +$20.000.000 COP; TIR = 28%; Periodo de Recuperación (Payback) = 2.0 años.\nNo existe racionamiento de capital.",
    stem: "Bajo la teoría financiera moderna y el criterio rector de maximización de valor para los accionistas, ¿cuál decisión debe adoptar el Director Financiero?",
    choices: [
      { id: "A", text: "Seleccionar el Proyecto Beta porque tiene mayor TIR (28%), lo cual garantiza el rendimiento más alto por peso invertido." },
      { id: "B", text: "Seleccionar el Proyecto Beta porque recupera la inversión en menor tiempo (2 años)." },
      { id: "C", text: "Seleccionar el Proyecto Alfa, porque ante proyectos mutuamente excluyentes el Valor Presente Neto (VPN) es el criterio jerárquicamente superior al reflejar la mayor riqueza neta añadida a la empresa ($45M vs $20M)." },
      { id: "D", text: "Rechazar ambos proyectos porque la tasa de descuento es superior a la inflación." },
    ],
    correct: "C",
    explanation:
      "En proyectos mutuamente excluyentes, el VPN es el criterio definitivo y prevalece sobre la TIR y el Payback. La TIR puede distorsionar decisiones debido al supuesto de reinversión de flujos y diferencias de escala. El Proyecto Alfa genera $45 millones de valor presente neto frente a $20 millones de Beta.",
    methodTip:
      "Regla de Oro en Finanzas: En proyectos mutuamente excluyentes (solo puedes elegir uno), NUNCA decidas por la TIR más alta ni por el Payback más rápido. Manda siempre el mayor VPN, porque representa el valor absoluto en dinero actual transferido al patrimonio de los socios.",
    distractorAnalysis:
      "La opción A es el distractor más habitual: asumir que mayor porcentaje (28% vs 21%) significa más dinero; un 28% de un proyecto de $10M rinde menos riqueza que un 21% de un proyecto de $100M.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. SESIÓN 2 · ESPECÍFICAS · CONTADURÍA PÚBLICA (Aseguramiento y Control)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-as-01",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Auditoría financiera y emisión de dictámenes bajo Normas Internacionales (NIAs)",
    source: "Saber Pro ICFES · Módulo de Aseguramiento de la Información",
    contextText:
      "Durante la auditoría a los estados financieros de un cliente, el Revisor Fiscal detecta una sobreestimación material en los ingresos operacionales por ventas facturadas ficticiamente en los últimos días de diciembre. La administración se niega rotundamente a reclasificar y corregir el error en los estados financieros. El auditor determina que el efecto del error es material pero no generalizado en el conjunto de los estados financieros.",
    stem: "Conforme a la Norma Internacional de Auditoría NIA 705 (Opinión Modificada), ¿qué tipo de opinión debe emitir el Revisor Fiscal en su dictamen?",
    choices: [
      { id: "A", text: "Opinión Limpia (Favorable o No Modificada) con párrafo de énfasis." },
      { id: "B", text: "Opinión con Salvedades (Calificada), manifestando que, excepto por los efectos de la sobreestimación no corregida, los estados financieros presentan razonablemente la situación financiera." },
      { id: "C", text: "Opinión Desfavorable (Adversa o Negativa)." },
      { id: "D", text: "Abstención de Opinión (Denegación de Opinión)." },
    ],
    correct: "B",
    explanation:
      "Según la NIA 705: Cuando el auditor obtiene evidencia de que los estados financieros contienen incorrecciones que son MATERIALES pero NO GENERALIZADAS (pervasivas), debe emitir una 'Opinión con Salvedades' («excepto por»). Si la incorrección fuera material Y generalizada, correspondería opinión desfavorable (adversa). Si no pudiera obtener evidencia suficiente y fuera generalizada, correspondería abstención.",
    methodTip:
      "Matriz Mnemotécnica NIA 705 para el examen:\n1. ¿Hay incorrección material? Sí.\n2. ¿Es generalizada a todo el balance? No -> Opinión con Salvedades.\n3. Si fuera material Y generalizada -> Desfavorable/Adversa.\n4. Si no hay evidencia y es generalizada -> Abstención.",
    distractorAnalysis:
      "La opción A es inviable porque la administración no corrigió el error material. La C (adversa) solo aplica cuando el error pervierte sustancialmente todos los estados financieros. La D solo opera por limitación grave en el alcance de auditoría.",
  },
  {
    id: "sp-cp-as-02",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Sistema de Control Interno (Marco Integrado COSO)",
    source: "ICFES Saber Pro Aseguramiento",
    contextText:
      "Una empresa colombiana implementa el marco integrado de control interno COSO III (versión 2013). La junta directiva establece políticas de segregación de funciones, límites de autorización para giros bancarios y firmas mancomunadas para pagos superiores a 50 salarios mínimos.",
    stem: "¿A cuál de los cinco componentes del marco COSO corresponden primordialmente estas medidas operativas?",
    choices: [
      { id: "A", text: "Entorno de Control." },
      { id: "B", text: "Evaluación de Riesgos." },
      { id: "C", text: "Actividades de Control." },
      { id: "D", text: "Monitoreo y Supervisión." },
    ],
    correct: "C",
    explanation:
      "Las 'Actividades de Control' son las políticas y procedimientos que ayudan a asegurar que se lleven a cabo las directrices de la administración para mitigar riesgos (segregación de funciones, autorizaciones, conciliaciones y firmas mancomunadas).",
    methodTip:
      "Componentes COSO (5 dedos de la mano):\n1. Entorno de control: tono de la alta gerencia y código de ética.\n2. Evaluación de riesgos: matriz de riesgos y probabilidad/impacto.\n3. Actividades de control: acciones concretas (autorizaciones, firmas, segregación de funciones).\n4. Información y comunicación: canales y reportes.\n5. Monitoreo: auditoría interna y seguimiento.",
    distractorAnalysis:
      "Entorno de Control evalúa la cultura ética organizacional; Evaluación de Riesgos mide probabilidades de pérdida; Monitoreo evalúa si los controles funcionan a lo largo del tiempo.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. SESIÓN 2 · ESPECÍFICAS · ADMINISTRACIÓN DE EMPRESAS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-adm-01",
    session: "especifica",
    areaId: "gestion-organizaciones",
    areaLabel: "Gestión de Organizaciones",
    careerId: "administracion",
    careerLabel: "Administración de Empresas",
    competency: "Estrategia y análisis competitivo",
    source: "Saber Pro Administración ICFES",
    contextText:
      "Una compañía de retail enfrenta la entrada de competidores 'Hard Discount' (tiendas de descuento duro con marcas propias de bajo precio). La junta decide rediseñar su modelo hacia la diferenciación, ofreciendo una experiencia omnicanal prémium, servicio personalizado al cliente y garantías extendidas.",
    stem: "Bajo el modelo de estrategias genéricas de Michael Porter, ¿qué ventaja competitiva busca consolidar la compañía?",
    choices: [
      { id: "A", text: "Liderazgo en costos absolutos mediante economía de escala." },
      { id: "B", text: "Diferenciación, haciendo que los clientes perciban un valor único superior por el cual están dispuestos a pagar un precio mayor." },
      { id: "C", text: "Enfoque en costos en un nicho desatendido." },
      { id: "D", text: "Integración vertical regresiva." },
    ],
    correct: "B",
    explanation:
      "La estrategia de diferenciación busca ofrecer atributos percibidos como únicos en el mercado (servicio, calidad, garantías, experiencia) para no competir por precio bajo.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. SESIÓN 2 · ESPECÍFICAS · DERECHO
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-der-01",
    session: "especifica",
    areaId: "argumentacion-juridica",
    areaLabel: "Investigación y Argumentación Jurídica",
    careerId: "derecho",
    careerLabel: "Derecho",
    competency: "Fuentes del derecho y precedente judicial",
    source: "Saber Pro Derecho ICFES",
    contextText:
      "Un juez de primera instancia resuelve un litigio civil desconociendo de forma deliberada y sin motivación suficiente una línea jurisprudencial uniforme y reiterada de la Corte Constitucional (Sentencia de Unificación - SU) sobre la protección del debido proceso probatorio.",
    stem: "¿Qué defecto o vía de hecho procesal se configura primordialmente en la providencia del juez?",
    choices: [
      { id: "A", text: "Defecto fáctico por falta de valoración de testigos." },
      { id: "B", text: "Desconocimiento del precedente constitucional, que habilita la procedencia de la tutela contra providencia judicial." },
      { id: "C", text: "Defecto orgánico por falta absoluta de jurisdicción." },
      { id: "D", text: "Defecto procedimental por exceso de rigor formal." },
    ],
    correct: "B",
    explanation:
      "El desconocimiento del precedente constitucional vinculante (especialmente sentencias SU o C) constituye una causal específica de procedibilidad de la tutela contra providencias judiciales por vulneración del principio de igualdad y seguridad jurídica.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. SESIÓN 2 · ESPECÍFICAS · INGENIERÍA
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-ing-01",
    session: "especifica",
    areaId: "formulacion-proyectos",
    areaLabel: "Formulación de Proyectos",
    careerId: "ingenieria",
    careerLabel: "Ingeniería",
    competency: "Gestión de alcance y tiempo en proyectos (PMBOK / Agile)",
    source: "Saber Pro Ingeniería ICFES",
    contextText:
      "En el cronograma de construcción de una planta de tratamiento, la actividad de pilotaje de cimientos tiene una holgura total de cero (0) días en el diagrama de red CPM (Método de la Ruta Crítica).",
    stem: "¿Qué implicación técnica tiene que una actividad posea holgura cero?",
    choices: [
      { id: "A", text: "Que el costo de la actividad puede reducirse a la mitad." },
      { id: "B", text: "Que cualquier retraso de un día en dicha actividad retrasará en la misma medida la fecha final de entrega de todo el proyecto." },
      { id: "C", text: "Que la actividad puede postergarse indefinidamente sin afectar los hitos." },
      { id: "D", text: "Que el proyecto no requiere supervisión de interventoría." },
    ],
    correct: "B",
    explanation:
      "Las actividades pertenecientes a la ruta crítica (Critical Path) tienen holgura total igual a cero; cualquier demora en ellas impacta directamente la fecha de finalización del proyecto.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. SESIÓN 1 · GENÉRICAS ADICIONALES (Lectura Crítica)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-lc-03",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    competency: "Identificar supuestos, premisas implícitas y presupuestos ético-filosóficos",
    source: "ICFES Saber Pro · Banco Oficial Lectura Crítica",
    contextText:
      "«Si permitimos que algoritmos de inteligencia artificial decidan de manera autónoma quién recibe un crédito hipotecario o quién es admitido en la universidad basándose únicamente en correlaciones estadísticas del pasado, estaremos condenados a perpetuar y automatizar las mismas injusticias históricas bajo un manto de supuesta neutralidad matemática.»",
    stem: "¿Cuál de los siguientes es un supuesto implícito indispensable para que la advertencia del autor sea válida?",
    choices: [
      { id: "A", text: "Los algoritmos de inteligencia artificial cometen más errores de cálculo aritmético que los seres humanos." },
      { id: "B", text: "Los datos históricos con los que se entrenan los algoritmos reflejan desigualdades y sesgos sociales preexistentes." },
      { id: "C", text: "Ningún banco o universidad debería utilizar computadores para procesar solicitudes de crédito o ingreso." },
      { id: "D", text: "Las matemáticas son una disciplina intrínsecamente injusta diseñada para discriminar a minorías." },
    ],
    correct: "B",
    explanation:
      "El autor argumenta que usar datos históricos del pasado automatizará injusticias; esto presupone necesariamente que dichos datos históricos contienen sesgos y desigualdades. Si el pasado hubiera sido 100% justo y neutral, la advertencia carecería de base lógica.",
  },
  {
    id: "sp-lc-04",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    competency: "Reconocer las estrategias discursivas y el tono del autor",
    source: "Módulo Oficial Lectura Crítica ICFES",
    contextText:
      "«¡Qué maravilla de sistema administrativo! Para solicitar una exención tributaria de diez mil pesos, el honorable ciudadano solo debe diligenciar cuarenta formularios notariados, esperar seis meses en tres ventanillas distintas y demostrar que no falleció en el transcurso del trámite.»",
    stem: "¿Qué recurso retórico y qué tono emplea primordialmente el autor en el fragmento?",
    choices: [
      { id: "A", text: "Ironía y sarcasmo, para criticar la ineficiencia y el exceso de trámites de la burocracia estatal." },
      { id: "B", text: "Elogio sincero, para resaltar los exhaustivos controles de auditoría del Estado." },
      { id: "C", text: "Metáfora poética, para embellecer las virtudes de los funcionarios públicos." },
      { id: "D", text: "Falacia ad misericordiam, para despertar compasión por los trabajadores del sector público." },
    ],
    correct: "A",
    explanation:
      "El autor dice lo contrario de lo que realmente piensa («¡Qué maravilla de sistema...!») para ridiculizar el exceso de trámites absurdos. Es un uso evidente de ironía con tono sarcástico y crítico.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. SESIÓN 1 · GENÉRICAS ADICIONALES (Razonamiento Cuantitativo)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-rc-03",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    competency: "Interpretación y cálculo de probabilidad condicional",
    source: "ICFES Saber Pro · Razonamiento Cuantitativo",
    contextText:
      "En el departamento de control de calidad de una fábrica de empaques, se revisa una caja que contiene 100 piezas electrónicas, de las cuales exactamente 6 presentan defectos de soldadura (94 están en perfecto estado). Un inspector extrae al azar 2 piezas sucesivamente y sin reemplazo.",
    stem: "¿Cuál es la expresión matemática exacta que permite calcular la probabilidad de que ninguna de las dos piezas extraídas sea defectuosa?",
    choices: [
      { id: "A", text: "(94 / 100) × (93 / 99)" },
      { id: "B", text: "(94 / 100) × (94 / 100)" },
      { id: "C", text: "(6 / 100) × (5 / 99)" },
      { id: "D", text: "(94 / 100) + (93 / 99)" },
    ],
    correct: "A",
    explanation:
      "Al ser un muestreo sin reemplazo: la probabilidad de que la primera pieza sea buena es 94/100. Quedan 99 piezas en la caja, de las cuales 93 son buenas. Por la regla del producto para eventos dependientes: P(ambas buenas) = (94/100) × (93/99).",
  },
  {
    id: "sp-rc-04",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    competency: "Formulación y ejecución con medias ponderadas",
    source: "Guía Saber Pro Cuantitativo",
    contextText:
      "Una empresa compra insumos en 3 órdenes durante el mes:\n- Orden 1: 500 unidades a $10.000 COP cada una.\n- Orden 2: 300 unidades a $12.000 COP cada una.\n- Orden 3: 200 unidades a $15.000 COP cada una.",
    stem: "¿Cuál es el costo unitario promedio ponderado de todo el inventario adquirido?",
    choices: [
      { id: "A", text: "$12.333 COP (promedio aritmético simple de los 3 precios)." },
      { id: "B", text: "$11.600 COP." },
      { id: "C", text: "$11.000 COP." },
      { id: "D", text: "$12.000 COP." },
    ],
    correct: "B",
    explanation:
      "Costo Total = (500 × 10.000) + (300 × 12.000) + (200 × 15.000) = 5.000.000 + 3.600.000 + 3.000.000 = $11.600.000 COP. Unidades totales = 500 + 300 + 200 = 1.000 unidades. Costo promedio ponderado = $11.600.000 / 1.000 = $11.600 COP por unidad.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. SESIÓN 1 · GENÉRICAS ADICIONALES (Competencias Ciudadanas)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cc-03",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    competency: "Estructura del Estado y pesos y contrapesos constitucionales",
    source: "Constitución Política de Colombia · ICFES",
    contextText:
      "Ante una grave crisis económica imprevista, el Presidente de la República con la firma de todos sus ministros declara el Estado de Emergencia Económica (Art. 215 C.P.) y expide decretos legislativos con fuerza de ley que crean un nuevo tributo temporal.",
    stem: "En el marco del sistema de frenos y contrapesos (Checks and Balances), ¿qué entidad y qué tipo de control ejerce obligatoriamente sobre dichos decretos legislativos?",
    choices: [
      { id: "A", text: "El Consejo de Estado ejerce control de nulidad por inconstitucionalidad únicamente si un ciudadano interpone demanda previa." },
      { id: "B", text: "La Corte Constitucional ejerce un control automático, oficioso, integral y definitivo de constitucionalidad." },
      { id: "C", text: "El Congreso de la República puede anular el decreto mediante votación simple de la Comisión Tercera." },
      { id: "D", text: "La Contraloría General de la República aprueba previamente la viabilidad fiscal antes de su promulgación." },
    ],
    correct: "B",
    explanation:
      "Según el Artículo 214 y 241 de la Constitución Política, los decretos legislativos dictados en estados de excepción son enviados al día siguiente a la Corte Constitucional para que esta ejerza su control de constitucionalidad automático, oficioso y definitivo, sin requerir demanda ciudadana previa.",
  },
  {
    id: "sp-cc-04",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    competency: "Mecanismos de participación democrática (Ley 134/1994 y 1757/2015)",
    source: "ICFES Competencias Ciudadanas",
    contextText:
      "La ciudadanía de un municipio donde se proyecta la construcción de una represa hidroeléctrica que inundará tierras ancestrales exige ser consultada formal y vinculantemente para decidir si se autoriza o no el proyecto en su territorio.",
    stem: "¿Cuál es el mecanismo formal de participación ciudadana de origen institucional o popular aplicable para someter a votación del pueblo una decisión de trascendencia municipal?",
    choices: [
      { id: "A", text: "Plebiscito nacional." },
      { id: "B", text: "Consulta Popular." },
      { id: "C", text: "Cabildo Abierto (que es puramente deliberativo y no decisorio)." },
      { id: "D", text: "Revocatoria del Mandato." },
    ],
    correct: "B",
    explanation:
      "La Consulta Popular es la institución mediante la cual una pregunta de carácter general sobre un asunto de trascendencia nacional, departamental o municipal es sometida a consideración del pueblo para que este se pronuncie formalmente de manera vinculante.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. SESIÓN 1 · GENÉRICAS ADICIONALES (Inglés B1-B2)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-in-02",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    competency: "Reading comprehension in business and governance contexts",
    source: "Saber Pro English CEFR B2",
    contextText:
      "«Internal audit departments are undergoing a digital transformation. Traditional retrospective sampling is being rapidly replaced by continuous auditing and AI-driven predictive analytics. By analyzing 100% of transaction data in real time, auditors can detect anomalies and control breakdowns immediately rather than discovering them months after financial losses have occurred.»",
    stem: "What is the primary advantage of continuous auditing highlighted in the text?",
    choices: [
      { id: "A", text: "It allows organizations to completely dismiss their internal audit personnel." },
      { id: "B", text: "It provides immediate real-time detection of anomalies by analyzing the complete set of transactions." },
      { id: "C", text: "It guarantees that no taxes will be paid on electronic transactions." },
      { id: "D", text: "It limits audit testing to small periodic random samples once a year." },
    ],
    correct: "B",
    explanation:
      "The text states that continuous auditing analyzes '100% of transaction data in real time' to detect anomalies immediately rather than discovering them months later.",
  },
  {
    id: "sp-in-03",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    competency: "Use of English: Discourse markers and contrastive connectors",
    source: "ICFES English Grammar & Structure",
    contextText:
      "Complete the sentence correctly: «_______ strict monetary tightening and elevated central bank interest rates, consumer spending in the retail sector remained surprisingly resilient throughout the third quarter.»",
    stem: "Which connector grammatically and logically fits the sentence?",
    choices: [
      { id: "A", text: "Despite" },
      { id: "B", text: "Although" },
      { id: "C", text: "Whereas" },
      { id: "D", text: "Because" },
    ],
    correct: "A",
    explanation:
      "'Despite' is a preposition expressing concession and must be followed by a noun phrase ('strict monetary tightening and elevated central bank interest rates'). 'Although' and 'whereas' require a full subject + verb clause.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 14. SESIÓN 2 · CONTADURÍA PÚBLICA (Gestión Financiera Avanzada)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-gf-03",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Cálculo del Costo Promedio Ponderado de Capital (WACC / CPPC)",
    source: "ICFES Saber Pro Contaduría · Finanzas Corporativas",
    contextText:
      "Una sociedad anónima financia sus activos con la siguiente estructura de capital:\n- 40% Deuda financiera a una tasa de interés del 12% E.A.\n- 60% Patrimonio propio con un costo de oportunidad exigido por los accionistas (Ke) del 18% E.A.\nLa tarifa del impuesto de renta corporativo es del 35%. Los intereses son 100% deducibles de renta.",
    stem: "¿Cuál es el Costo Promedio Ponderado de Capital (WACC / CPPC) después de impuestos de la empresa?",
    choices: [
      { id: "A", text: "15.00% E.A." },
      { id: "B", text: "13.92% E.A." },
      { id: "C", text: "11.25% E.A." },
      { id: "D", text: "14.50% E.A." },
    ],
    correct: "B",
    explanation:
      "Fórmula: WACC = [Wd × Kd × (1 - T)] + [We × Ke].\n1) Costo de la deuda después del escudo fiscal: Kd × (1 - T) = 12% × (1 - 0.35) = 12% × 0.65 = 7.80%.\n2) Ponderación de la deuda: 40% × 7.80% = 3.12%.\n3) Ponderación del patrimonio: 60% × 18% = 10.80%.\n4) WACC = 3.12% + 10.80% = 13.92% E.A. La opción A ignora el escudo fiscal del 35% en los intereses.",
  },
  {
    id: "sp-cp-gf-04",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Administración del capital de trabajo y Ciclo de Conversión de Efectivo (CCE)",
    source: "Saber Pro ICFES · Gestión Financiera",
    contextText:
      "La compañía Manufacturas del Caribe presenta los siguientes indicadores de rotación operativa:\n- Periodo promedio de inventario (días en bodega): 50 días.\n- Periodo promedio de cobro a clientes (días de cartera): 40 días.\n- Periodo promedio de pago a proveedores comerciales: 60 días.",
    stem: "¿Cuáles son, respectivamente, el Ciclo Operativo y el Ciclo de Conversión de Efectivo (CCE) de la compañía?",
    choices: [
      { id: "A", text: "Ciclo Operativo = 90 días; Ciclo de Conversión de Efectivo = 30 días." },
      { id: "B", text: "Ciclo Operativo = 150 días; Ciclo de Conversión de Efectivo = 90 días." },
      { id: "C", text: "Ciclo Operativo = 50 días; Ciclo de Conversión de Efectivo = -10 días." },
      { id: "D", text: "Ciclo Operativo = 90 días; Ciclo de Conversión de Efectivo = 150 días." },
    ],
    correct: "A",
    explanation:
      "Fórmulas:\n1) Ciclo Operativo = Días de Inventario + Días de Cartera = 50 + 40 = 90 días.\n2) Ciclo de Conversión de Efectivo (CCE) = Ciclo Operativo - Días de Proveedores = 90 - 60 = 30 días.\nEsto significa que la empresa debe financiar con recursos propios o bancarios 30 días de operación antes de recuperar el efectivo.",
  },
  {
    id: "sp-cp-gf-05",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Análisis de Costo-Volumen-Utilidad y Punto de Equilibrio Operativo",
    source: "Saber Pro Contaduría Pública",
    contextText:
      "Una empresa produce un bien industrial con los siguientes parámetros:\n- Costos Fijos mensuales = $40.000.000 COP.\n- Precio de Venta Unitario = $50.000 COP.\n- Costo Variable Unitario = $30.000 COP.",
    stem: "¿Cuántas unidades debe vender mensualmente la empresa para alcanzar su Punto de Equilibrio Operativo (donde la Utilidad Operativa UAII es exactamente cero)?",
    choices: [
      { id: "A", text: "800 unidades." },
      { id: "B", text: "1.333 unidades." },
      { id: "C", text: "2.000 unidades." },
      { id: "D", text: "2.500 unidades." },
    ],
    correct: "C",
    explanation:
      "Fórmula: Q_eq = Costos Fijos / Margen de Contribución Unitario.\nMargen de Contribución Unitario = Precio - Costo Variable = $50.000 - $30.000 = $20.000 COP por unidad.\nQ_eq = $40.000.000 / $20.000 = 2.000 unidades mensuales.\nEn pesos: 2.000 × $50.000 = $100.000.000 COP.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 15. SESIÓN 2 · CONTADURÍA PÚBLICA (Aseguramiento y Control · NIAs)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-as-03",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "NIA 701 (Cuestiones Clave de la Auditoría - KAM) vs Párrafos de Énfasis",
    source: "Normas Internacionales de Auditoría (NIAs) · ICFES",
    contextText:
      "En la auditoría de una entidad que cotiza en bolsa, el auditor identifica que la estimación contable de la provisión para litigios y contingencias ambientales demandó un juicio profesional altamente complejo y subjetivo, siendo el asunto de mayor significatividad en la auditoría del periodo actual. No obstante, el auditor obtuvo evidencia suficiente y adecuada y concluye que la provisión está razonablemente revelada según NIIF.",
    stem: "De acuerdo con la NIA 701, ¿cómo debe reportar el auditor este asunto en su informe de auditoría?",
    choices: [
      { id: "A", text: "Como una Salvedad formal a su dictamen («excepto por»)." },
      { id: "B", text: "En la sección de Cuestiones Clave de la Auditoría (KAM - Key Audit Matters), describiendo el motivo por el cual fue considerado de mayor significatividad y cómo fue abordado en la auditoría." },
      { id: "C", text: "En un memorando confidencial interno sin revelarlo a los accionistas ni al mercado de valores." },
      { id: "D", text: "Mediante una abstención de opinión sobre el rubro de pasivos contingentes." },
    ],
    correct: "B",
    explanation:
      "La NIA 701 exige que en entidades cotizadas (y aquellas requeridas por ley) los asuntos de mayor significatividad en la auditoría se comuniquen en la sección de 'Cuestiones Clave de la Auditoría' (KAM). Las KAM no constituyen una opinión modificada ni salvedad, sino transparencia sobre los juicios más complejos abordados durante la auditoría.",
  },
  {
    id: "sp-cp-as-04",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Ética profesional e independencia del Revisor Fiscal (Ley 43 de 1990)",
    source: "Régimen Legal del Contador Público en Colombia",
    contextText:
      "Un Contador Público prestó servicios de asesoría contable y tributaria a una sociedad durante todo el año gravable 2025. En marzo de 2026, la asamblea general de accionistas de esa misma sociedad propone nombrarlo unánimemente como Revisor Fiscal principal para el periodo 2026-2027.",
    stem: "Conforme al Artículo 51 de la Ley 43 de 1990 y los principios de independencia y objetividad del Código de Ética de la IFAC/IESBA, ¿puede el profesional aceptar el cargo?",
    choices: [
      { id: "A", text: "Sí puede aceptar, siempre que renuncie a cobrar honorarios retroactivos por la asesoría del 2025." },
      { id: "B", text: "No puede aceptar, porque la ley colombiana prohíbe aceptar el cargo de revisor fiscal en la misma entidad donde se actuó como empleado o asesor antes de transcurrir al menos seis (6) meses o un (1) año, configurándose una amenaza insalvable de autorrevisión." },
      { id: "C", text: "Sí puede aceptar, siempre y cuando la asamblea lo autorice por unanimidad mediante acta protocolizada." },
      { id: "D", text: "Solo puede aceptar si contrata a un contador auxiliar para que firme los papeles de trabajo." },
    ],
    correct: "B",
    explanation:
      "El Art. 51 de la Ley 43 de 1990 establece inhabilidad estricta: el contador que haya sido asesor o empleado de una empresa no puede aceptar cargos que exijan independencia (como Revisor Fiscal) antes de transcurrir al menos 6 meses desde el cese de sus funciones. Además, auditaría su propia contabilidad previa (amenaza de autorrevisión insalvable).",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 16. SESIÓN 2 · CONTADURÍA PÚBLICA (Información Contable y Tributaria · NIIF / Impuestos)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-ct-01",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Reconocimiento de ingresos bajo NIIF 15 (Modelo de 5 Pasos)",
    source: "Marco Técnico Normativo Contable NIIF · ICFES",
    contextText:
      "Una empresa de tecnología firma el 1 de enero un contrato de 2 años para suministrar software en la nube (SaaS) con soporte técnico continuo a un cliente corporativo por un valor total de $48.000.000 COP, recibiendo el 100% del pago por anticipado el mismo día de la firma.",
    stem: "Bajo la NIIF 15 (Ingresos de Actividades Ordinarias procedentes de Contratos con Clientes), ¿cómo debe reconocerse contablemente este ingreso en los estados financieros del primer año?",
    choices: [
      { id: "A", text: "Reconocer los $48.000.000 COP como ingreso ordinario el 1 de enero, porque el dinero ya ingresó a la cuenta bancaria." },
      { id: "B", text: "Reconocer el ingreso a lo largo del tiempo (over time) a razón de $2.000.000 COP mensuales ($24.000.000 en el año 1) y mantener los restantes $24.000.000 COP en el pasivo como un Pasivo por Contrato / Ingreso Diferido." },
      { id: "C", text: "No reconocer ningún ingreso hasta que expire el contrato de 2 años completos." },
      { id: "D", text: "Registrarlo como un aporte de capital en el patrimonio neto." },
    ],
    correct: "B",
    explanation:
      "Bajo NIIF 15, cuando la obligación de desempeño se satisface a lo largo del tiempo (como servicios de suscripción y soporte continuo de 24 meses), el ingreso se reconoce proporcionalmente al avance del servicio ($48M / 24 meses = $2.000.000/mes). Al final del año 1 se habrán reconocido $24.000.000 como ingreso y los restantes $24.000.000 permanecen en el pasivo como obligación contractual.",
  },
  {
    id: "sp-cp-ct-02",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Tratamiento contable del Impuesto Diferido (NIC 12 / Sección 29)",
    source: "NIC 12 Impuesto a las Ganancias · Saber Pro",
    contextText:
      "Al 31 de diciembre, una entidad posee una maquinaria adquirida por $100.000.000 COP. Contablemente se deprecia por línea recta en 5 años (depreciación acumulada contable = $20.000.000, valor en libros = $80.000.000). Para efectos fiscales, el Estatuto Tributario solo permitió deducir en el año una tasa máxima del 10% (depreciación acumulada fiscal = $10.000.000, base fiscal del activo = $90.000.000). La tarifa de renta es del 35%.",
    stem: "¿Qué efecto tributario e impuesto diferido se genera al cierre de dicho periodo?",
    choices: [
      { id: "A", text: "Una diferencia temporaria deducible de $10.000.000 COP que da origen a un Activo por Impuesto Diferido de $3.500.000 COP." },
      { id: "B", text: "Una diferencia temporaria imponible de $10.000.000 COP que da origen a un Pasivo por Impuesto Diferido de $3.500.000 COP." },
      { id: "C", text: "Una diferencia permanente que no genera impuesto diferido alguno." },
      { id: "D", text: "Un gasto por impuesto de renta no deducible en periodos futuros." },
    ],
    correct: "A",
    explanation:
      "Regla de la NIC 12: Cuando la base fiscal del activo ($90.000.000) es MAYOR que el valor en libros contable ($80.000.000), se genera una Diferencia Temporaria DEDUCIBLE ($10.000.000). En periodos futuros, la empresa podrá deducir fiscalmente ese mayor valor, reduciendo su pago de impuestos futuro. Por tanto: Activo por Impuesto Diferido = $10.000.000 × 35% = $3.500.000 COP.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 17. SESIÓN 1 · GENÉRICAS ADICIONALES · LECTURA CRÍTICA (Nivel 4 Avanzado)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-lc-05",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    competency: "Evaluar la solidez de una argumentación y detectar sesgos cognitivos en el discurso",
    source: "Banco Oficial ICFES Saber Pro · Lectura Crítica",
    contextText:
      "«Las plataformas de redes sociales han optimizado sus algoritmos para maximizar el tiempo de retención mediante el sesgo de confirmación. Al priorizar contenidos que refuerzan las convicciones previas de los usuarios y ocultar puntos de vista divergentes, crean cámaras de eco impermeables al debate racional. El resultado no es una plaza pública plural, sino una fragmentación tribal donde cualquier evidencia contraria es descartada como conspiración enemiga.»",
    stem: "¿Cuál de los siguientes enunciados representa la consecuencia argumentativa medular que se desprende de la postura del autor?",
    choices: [
      { id: "A", text: "La polarización digital no es un accidente técnico imprevisto, sino el resultado directo del modelo de negocio algorítmico basado en la retención emocional." },
      { id: "B", text: "Los usuarios de redes sociales carecen de criterio moral e intelectual para navegar en internet." },
      { id: "C", text: "El debate democrático presencial siempre ha sido inmune a las falacias y a las cámaras de eco." },
      { id: "D", text: "Todas las redes sociales deberían ser nacionalizadas y administradas por comités estatales de censura." },
    ],
    correct: "A",
    explanation:
      "El autor articula claramente que el diseño algorítmico diseñado para maximizar la permanencia ('tiempo de retención') estimula el sesgo de confirmación y fractura el debate democrático en cámaras de eco. La opción A sintetiza esta implicación de forma rigurosa y sin exageraciones.",
    methodTip:
      "Técnica para Implicaciones y Consecuencias: Identifica la relación causa-efecto que propone el texto. Descarta opciones absolutistas (como 'carecen de criterio', 'siempre ha sido', 'todas deberían ser censuradas').",
  },
  {
    id: "sp-lc-06",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    competency: "Identificar y evaluar falacias lógicas en debates socioeconómicos",
    source: "Módulo Oficial Lectura Crítica ICFES",
    contextText:
      "En una mesa de concertación salarial, un gremio empresarial afirma: «Si aumentamos el salario mínimo por encima de la inflación proyectada, las empresas entrarán en quiebra masiva, el desempleo escalará al 30% y la economía nacional colapsará inexorablemente. Por consiguiente, el salario no puede incrementarse más de un 1%».",
    stem: "¿Qué falacia argumentativa predomina en el razonamiento del vocero gremial?",
    choices: [
      { id: "A", text: "Falacia de la pendiente resbaladiza (slippery slope), al concatenar consecuencias catastróficas inevitables sin demostrar el vínculo causal necesario entre cada una." },
      { id: "B", text: "Apelación a la autoridad (ad verecundiam), pues cita estudios del Banco Central." },
      { id: "C", text: "Argumento ad baculum (apelación al bastón), pues amenaza con violencia física." },
      { id: "D", text: "Generalización apresurada por inducción con muestra insuficiente." },
    ],
    correct: "A",
    explanation:
      "La falacia de la 'pendiente resbaladiza' consiste en sostener que un primer paso moderado (aumentar el salario por encima de la inflación) desencadenará de forma inexorable e incontrolable una cadena de eventos catastróficos extremos (quiebra masiva -> 30% desempleo -> colapso nacional) sin aportar pruebas de dicha inevitabilidad.",
    methodTip:
      "Detectar Pendiente Resbaladiza: Busca la estructura «Si ocurre A, entonces indefectiblemente ocurrirá B, luego C y finalmente la catástrofe Z». Si no se prueba la relación forzosa entre cada eslabón, es pendiente resbaladiza.",
  },
  {
    id: "sp-lc-07",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    competency: "Comprensión de textos filosóficos y marcos éticos",
    source: "ICFES Saber Pro",
    contextText:
      "«Obra de tal modo que uses la humanidad, tanto en tu persona como en la persona de cualquier otro, siempre como un fin al mismo tiempo y nunca meramente como un medio. Aquel que formula una promesa mentirosa con el propósito de salir de un apuro financiero utiliza a su semejante exclusivamente como un instrumento, un objeto instrumental para su conveniencia momentánea.» (Immanuel Kant, Fundamentación de la metafísica de las costumbres).",
    stem: "¿En qué consiste la infracción moral fundamental según el imperativo categórico kantiano expuesto en el fragmento?",
    choices: [
      { id: "A", text: "En no calcular si la mentira produce mayor placer neto que la verdad para la mayoría de los involucrados." },
      { id: "B", text: "En instrumentalizar la dignidad racional de otra persona reduciéndola a un simple medio para un fin egoísta." },
      { id: "C", text: "En desacatar las leyes comerciales expedidas por el tribunal de comercio." },
      { id: "D", text: "En prestar dinero a personas que no cuentan con garantías hipotecarias suficientes." },
    ],
    correct: "B",
    explanation:
      "La segunda formulación del imperativo categórico kantiano exige respetar el valor intrínseco de cada ser humano como fin en sí mismo. Mentir para obtener dinero vulnera la autonomía del otro y lo degrada a un mero instrumento funcional para un fin propio.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 18. SESIÓN 1 · GENÉRICAS ADICIONALES · RAZONAMIENTO CUANTITATIVO
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-rc-05",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    competency: "Formulación y ejecución de modelos de tasas de interés y matemática financiera",
    source: "Banco Oficial ICFES Razonamiento Cuantitativo",
    contextText:
      "Un microempresario necesita un crédito de liquidez de $20.000.000 COP a 1 año y compara dos propuestas bancarias:\n- Banco A: Tasa del 24% Efectiva Anual (E.A.).\n- Banco B: Tasa del 2% Nominal Mes Vencido (interés mensual simple de 2% capitalizable mensualmente).",
    stem: "Al comparar el costo financiero real de ambas ofertas al cabo del año, ¿cuál es la conclusión matemáticamente correcta?",
    choices: [
      { id: "A", text: "Ambas opciones son exactamente iguales porque 2% mensual multiplicado por 12 meses equivale al 24% anual." },
      { id: "B", text: "El Banco A es más económico, porque el 2% mensual capitalizable del Banco B equivale a una Tasa Efectiva Anual superior al 26.82% (1.02^12 - 1 ≈ 26.82% E.A.)." },
      { id: "C", text: "El Banco B es más económico porque las cuotas mensuales son fijas sin amortización." },
      { id: "D", text: "El Banco A cobra un 4% adicional de comisión de desembolso no revelado en el enunciado." },
    ],
    correct: "B",
    explanation:
      "Debido al interés compuesto, la tasa efectiva anual correspondiente al 2% mensual es: (1 + 0.02)^12 - 1 = (1.26824) - 1 = 26.824% E.A. Por ende, el Banco A (24% E.A.) resulta más económico que el Banco B (~26.82% E.A.). Multiplicar 2% × 12 = 24% es el error común de confundir tasa nominal con tasa efectiva.",
    methodTip:
      "Tasa Efectiva vs. Nominal: Nunca sumes ni multipliques linealmente tasas mensuales cuando hay capitalización de intereses. La fórmula (1 + i_m)^12 siempre resulta mayor que 12 × i_m.",
  },
  {
    id: "sp-rc-06",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    competency: "Interpretación estadística de diagramas de caja y bigotes (Boxplot)",
    source: "ICFES Saber Pro Cuantitativo",
    contextText:
      "En una auditoría de tiempos de atención, se analiza el diagrama de caja y bigotes del tiempo (en minutos) que tardan dos oficinas en resolver peticiones ciudadanas:\n- Oficina Centro: Mínimo = 5 min, Q1 = 12 min, Mediana (Q2) = 18 min, Q3 = 25 min, Máximo = 35 min.\n- Oficina Norte: Mínimo = 10 min, Q1 = 20 min, Mediana (Q2) = 28 min, Q3 = 38 min, Máximo = 50 min.",
    stem: "Con base estricta en los parámetros del diagrama, ¿cuál afirmación es indudablemente cierta?",
    choices: [
      { id: "A", text: "Al menos el 50% de las peticiones en la Oficina Centro se resuelven en 18 minutos o menos, mientras que en la Oficina Norte el 50% tarda 28 minutos o menos." },
      { id: "B", text: "La Oficina Norte atendió el doble de ciudadanos que la Oficina Centro." },
      { id: "C", text: "El promedio aritmético de la Oficina Centro es forzosamente 18 minutos." },
      { id: "D", text: "Ninguna petición en la Oficina Norte demoró menos de 20 minutos." },
    ],
    correct: "A",
    explanation:
      "Por definición estadística, la Mediana (Q2) divide la distribución ordenada en dos mitades exactas (50% de las observaciones por debajo y 50% por encima). En Centro la mediana es 18 min (50% ≤ 18 min) y en Norte es 28 min (50% ≤ 28 min).",
    methodTip:
      "Claves de Boxplot para el ICFES:\n- Q1 = percentil 25 (el 25% está por debajo).\n- Mediana (Q2) = percentil 50 (la mitad de los datos está por debajo).\n- Q3 = percentil 75.\n- El boxplot NO indica el total de personas evaluadas (la opción B es indemostrable).",
  },
  {
    id: "sp-rc-07",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    competency: "Modelación matemática y resolución de sistemas de inecuaciones",
    source: "Banco Oficial ICFES Razonamiento Cuantitativo",
    contextText:
      "Un distribuidor farmacéutico dispone de $12.000.000 COP de presupuesto para adquirir dos medicamentos genéricos A y B. El frasco de A cuesta $30.000 COP y el frasco de B cuesta $40.000 COP. Por espacio de bodega, el número total de frascos (A + B) no puede superar las 350 unidades. Además, la secretaría de salud exige comprar al menos 100 frascos de A.",
    stem: "¿Cuál de las siguientes combinaciones de compra es factible cumpliendo simultáneamente todas las restricciones de presupuesto, espacio y exigencia sanitaria?",
    choices: [
      { id: "A", text: "150 frascos de A y 200 frascos de B." },
      { id: "B", text: "200 frascos de A y 150 frascos de B." },
      { id: "C", text: "50 frascos de A y 250 frascos de B." },
      { id: "D", text: "250 frascos de A y 150 frascos de B." },
    ],
    correct: "B",
    explanation:
      "Verificación para la opción B (200 de A y 150 de B):\n1) Restricción de espacio: 200 + 150 = 350 unidades (cumple, ≤ 350).\n2) Restricción sanitaria: A = 200 ≥ 100 (cumple).\n3) Restricción presupuestal: (200 × $30.000) + (150 × $40.000) = $6.000.000 + $6.000.000 = $12.000.000 COP (cumple, ≤ $12.000.000).\nLa opción A supera el presupuesto (150 × 30k + 200 × 40k = $12.5M). La C incumple A ≥ 100. La D supera el espacio (400 unidades).",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 19. SESIÓN 1 · GENÉRICAS ADICIONALES · COMPETENCIAS CIUDADANAS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cc-05",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    competency: "Diferenciación de acciones constitucionales (Tutela vs. Popular vs. Grupo)",
    source: "Constitución Política de Colombia (Arts. 86, 87 y 88) · ICFES",
    contextText:
      "El desbordamiento de una laguna de oxidación de una empresa química vierte aguas residuales tóxicas sobre un río comunal, destruyendo la fauna acuática y contaminando el agua que usan 5.000 habitantes. Adicionalmente, el agua contaminada causó la pérdida de las cosechas de peces de 40 piscicultores locales claramente individualizados, causándoles un daño patrimonial directo a cada uno.",
    stem: "¿Cuáles son las dos acciones constitucionales que proceden respectivamente: 1) para detener la contaminación del río y proteger el derecho colectivo al medio ambiente sano; y 2) para obtener la indemnización económica individual de los perjuicios sufridos por los piscicultores?",
    choices: [
      { id: "A", text: "1) Acción Popular (Ley 472 de 1998); y 2) Acción de Grupo (mínimo 20 personas afectadas con causa común)." },
      { id: "B", text: "1) Acción de Tutela; y 2) Denuncia penal por prevaricato." },
      { id: "C", text: "1) Acción de Cumplimiento; y 2) Plebiscito municipal." },
      { id: "D", text: "1) Acción de Repetición; y 2) Demanda de casación." },
    ],
    correct: "A",
    explanation:
      "La Acción Popular protege derechos colectivos (medio ambiente sano, moralidad administrativa, espacio público) y tiene carácter preventivo o restitutorio. La Acción de Grupo exige al menos 20 personas y persigue exclusivamente el resarcimiento indemnizatorio de perjuicios individuales derivados de una causa común.",
    methodTip:
      "Mnemotecnia Constitucional:\n- ¿Se busca defender a la comunidad entera sin pedir indemnización? -> Acción Popular.\n- ¿Se busca dinero/indemnización para un grupo de mínimo 20 personas con el mismo daño? -> Acción de Grupo.\n- ¿Se viola un derecho fundamental individual (vida, salud, debido proceso)? -> Tutela.",
  },
  {
    id: "sp-cc-06",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    competency: "Habeas Data, caducidad del dato financiero negativo y debido proceso",
    source: "Ley Estatutaria 1266 de 2008 y Ley 2157 de 2021 (Borrón y Cuenta Nueva)",
    contextText:
      "Un ciudadano incurrió en una mora de 8 meses en una tarjeta de crédito en 2023. En enero de 2024 canceló la totalidad de la deuda y los intereses moratorios. En marzo de 2026 (más de dos años después de haber extinguido la obligación por completo), solicita un crédito de vivienda y es rechazado porque el banco consulta la central de riesgo y constata que la entidad financiera sigue reportando negativamente la mora histórica.",
    stem: "De acuerdo con el derecho fundamental al Habeas Data y la jurisprudencia de la Corte Constitucional (Sentencia C-282/21), ¿es legal que el reporte negativo persista en las centrales de información?",
    choices: [
      { id: "A", text: "No es legal, porque el término máximo de permanencia del reporte negativo cuando se paga la deuda es del doble de la mora pero sin exceder de 4 años; al haber estado en mora 8 meses, el castigo máximo legal era de 16 meses tras el pago, plazo que ya venció." },
      { id: "B", text: "Sí es legal, porque los reportes crediticios negativos son vitalicios e imprescriptibles en Colombia." },
      { id: "C", text: "Sí es legal, siempre y cuando la central de riesgo cobre una tarifa de mantenimiento de datos." },
      { id: "D", text: "No es legal, porque ninguna entidad privada puede almacenar bases de datos de personas naturales." },
    ],
    correct: "A",
    explanation:
      "La regla constitucional y legal de caducidad del dato financiero dispone que el reporte negativo permanece por el doble del tiempo de la mora (8 meses × 2 = 16 meses de sanción), contados a partir del pago, sin superar jamás los 4 años. Tras 26 meses del pago, el reporte negativo debió ser eliminado automáticamente.",
  },
  {
    id: "sp-cc-07",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    competency: "Ponderación de derechos y test de proporcionalidad constitucional",
    source: "Jurisprudencia Corte Constitucional de Colombia",
    contextText:
      "Durante una emergencia sanitaria por pandemia, el gobierno nacional expide un decreto que prohíbe las aglomeraciones y ritos religiosos presenciales en templos e iglesias de cualquier credo durante tres semanas críticas de saturación hospitalaria. Un colectivo de feligreses interpone tutela argumentando que se les vulnera el núcleo esencial de su libertad de cultos y religión.",
    stem: "Al aplicar el principio de ponderación y el test de proporcionalidad constitucional, ¿por qué la medida gubernamental resulta admisible bajo la Carta Política?",
    choices: [
      { id: "A", text: "Porque la libertad de cultos no es un derecho absoluto y puede ser restringida temporalmente para salvaguardar un bien jurídico superior y apremiante: la vida y la salud pública de la colectividad." },
      { id: "B", text: "Porque el Estado colombiano es confesional y solo admite religiones autorizadas por el Ministerio del Interior." },
      { id: "C", text: "Porque los feligreses deben pagar un impuesto previo para ejercer cultos en el espacio privado." },
      { id: "D", text: "Porque el Presidente puede suspender los derechos humanos de forma definitiva en estados de excepción." },
    ],
    correct: "A",
    explanation:
      "Ningún derecho fundamental es absoluto. En la colisión entre libertad de cultos y el derecho a la vida y la salud pública, la restricción temporal, idónea y proporcionada de cultos presenciales busca evitar muertes masivas por contagio, superando el test estricto de proporcionalidad.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 20. SESIÓN 1 · GENÉRICAS ADICIONALES · INGLÉS (CEFR B1-B2)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-in-04",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    competency: "Reading comprehension: Business technology, governance and artificial intelligence",
    source: "ICFES Saber Pro English Module (CEFR B2)",
    contextText:
      "«Modern tax authorities and regulatory bodies increasingly rely on predictive machine-learning models to combat tax evasion and cross-border profit shifting. By continuously cross-referencing electronic invoicing data, banking records, and customs declarations, algorithms detect statistical anomalies in real time. Nevertheless, legal scholars caution that algorithm transparency and human oversight remain essential to guarantee taxpayers' constitutional right to due process.»",
    stem: "According to the passage, what is the crucial caveat emphasized by legal scholars regarding the use of predictive AI by tax authorities?",
    choices: [
      { id: "A", text: "That computers should be totally banned from tracking financial transactions." },
      { id: "B", text: "That human supervision and algorithmic transparency are indispensable to preserve the taxpayer's right to due process." },
      { id: "C", text: "That electronic invoices will soon be replaced by traditional paper receipts." },
      { id: "D", text: "That artificial intelligence has eliminated the need for human tax inspectors." },
    ],
    correct: "B",
    explanation:
      "The text directly concludes that 'legal scholars caution that algorithm transparency and human oversight remain essential to guarantee taxpayers' constitutional right to due process'.",
  },
  {
    id: "sp-in-05",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    competency: "Grammar and Sentence Structure: Conditional Clauses in Business Contexts",
    source: "ICFES Saber Pro English",
    contextText:
      "Choose the correct grammatical option to complete the statement: «If the board of directors _______ the external audit findings earlier, the company would have avoided the substantial financial penalties imposed by the securities regulator.»",
    stem: "Which verb form correctly completes the Third Conditional sentence?",
    choices: [
      { id: "A", text: "had addressed" },
      { id: "B", text: "addresses" },
      { id: "C", text: "has addressed" },
      { id: "D", text: "will address" },
    ],
    correct: "A",
    explanation:
      "The Third Conditional expresses a hypothetical situation in the past and its unreal past outcome. Structure: If + Past Perfect ('had addressed'), ... would have + Past Participle ('would have avoided').",
  },
  {
    id: "sp-in-06",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    competency: "Lexical Knowledge and Discourse Connectors in Corporate Reporting",
    source: "ICFES English Grammar & Vocabulary",
    contextText:
      "Select the connector that logically expresses result: «The corporation experienced a sudden disruption in raw material supply chains; _______, quarterly manufacturing output contracted by fifteen percent.»",
    stem: "Which transition word accurately indicates the consequence of the supply chain disruption?",
    choices: [
      { id: "A", text: "consequently" },
      { id: "B", text: "nevertheless" },
      { id: "C", text: "whereas" },
      { id: "D", text: "on the contrary" },
    ],
    correct: "A",
    explanation:
      "'Consequently' is a transition adverb denoting result/effect (sinónimo de therefore / as a result). 'Nevertheless' expresses concession/contrast; 'whereas' introduces contrastive clauses; 'on the contrary' refutes a previous statement.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 21. SESIÓN 2 · CONTADURÍA PÚBLICA · GESTIÓN FINANCIERA (Nivel Avanzado)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-gf-06",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Análisis DuPont de Rentabilidad del Patrimonio (ROE)",
    source: "Saber Pro Contaduría Pública · Finanzas Corporativas",
    contextText:
      "Una empresa manufacturera presenta los siguientes indicadores en su análisis financiero:\n- Margen Neto de Utilidad (Utilidad Neta / Ventas) = 8%.\n- Rotación de Activos (Ventas / Activos Totales) = 1.5 veces al año.\n- Multiplicador del Apalancamiento Financiero (Activos Totales / Patrimonio Neto) = 2.0 veces.",
    stem: "Al aplicar la fórmula del Modelo DuPont de 3 factores, ¿cuál es la Rentabilidad sobre el Patrimonio (ROE) generada por la empresa?",
    choices: [
      { id: "A", text: "12.0%" },
      { id: "B", text: "24.0%" },
      { id: "C", text: "16.0%" },
      { id: "D", text: "18.5%" },
    ],
    correct: "B",
    explanation:
      "Fórmula del Modelo DuPont en 3 etapas: ROE = Margen Neto × Rotación del Activo × Multiplicador de Apalancamiento.\nROE = 8% × 1.5 × 2.0 = 12% × 2.0 = 24.0%.\nEsto demuestra que el 24% de rendimiento para los accionistas se descompone en 8% de eficiencia operativa en precios y costos, 1.5 veces de eficiencia en el uso de activos fijos/corrientes, y 2.0 veces de apalancamiento mediante deuda.",
    methodTip:
      "Ecuación DuPont: ROE = (UN/V) × (V/AT) × (AT/Patrimonio). Observa que Ventas y Activos se cancelan algebraicamente quedando UN/Patrimonio, pero descomponerlo te permite auditar de dónde proviene exactamente la rentabilidad.",
  },
  {
    id: "sp-cp-gf-07",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Flujo de Caja Libre (FCL) y Valor Económico Agregado (EVA)",
    source: "ICFES Saber Pro · Finanzas Avanzadas",
    contextText:
      "Al cierre de ejercicio, la compañía Andina de Alimentos reporta los siguientes datos (en millones de pesos):\n- Utilidad Operativa después de Impuestos (UODI / NOPAT) = $150 millones.\n- Depreciaciones y Amortizaciones del periodo = $40 millones.\n- Inversión neta en Activos Fijos (CAPEX) = $60 millones.\n- Aumento del Capital de Trabajo Neto Operativo (ΔKTNO) = $20 millones.",
    stem: "¿A cuánto asciende el Flujo de Caja Libre (FCL) disponible de la compañía para atender servicio de deuda y dividendos a los socios?",
    choices: [
      { id: "A", text: "$110 millones COP." },
      { id: "B", text: "$150 millones COP." },
      { id: "C", text: "$270 millones COP." },
      { id: "D", text: "$70 millones COP." },
    ],
    correct: "A",
    explanation:
      "Fórmula de Flujo de Caja Libre de la Firma (FCFF):\nFCL = UODI + Depreciaciones - CAPEX - ΔKTNO.\nFCL = $150M + $40M - $60M - $20M = $190M - $80M = $110 millones COP.\nEste es el efectivo genuinamente disponible que genera la operación para pagar a acreedores financieros (capital + intereses) y repartir dividendos a los accionistas.",
  },
  {
    id: "sp-cp-gf-08",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Cálculo del Valor Económico Agregado (EVA)",
    source: "Finanzas Estratégicas · Saber Pro ICFES",
    contextText:
      "Una empresa cuenta con Activos Netos de Operación (Capital Invertido) de $800.000.000 COP. La Utilidad Operativa después de Impuestos (UODI) del año fue de $140.000.000 COP. El Costo Promedio Ponderado de Capital (WACC) de la compañía es del 12% E.A.",
    stem: "¿Cuál es el Valor Económico Agregado (EVA) generado por la gestión de la empresa en el periodo?",
    choices: [
      { id: "A", text: "+$44.000.000 COP, lo que indica que la empresa destruyó valor financiero." },
      { id: "B", text: "+$44.000.000 COP, lo que confirma que la empresa generó una verdadera riqueza económica por encima del costo de los recursos invertidos." },
      { id: "C", text: "-$20.000.000 COP de pérdida contable neta." },
      { id: "D", text: "+$140.000.000 COP correspondiente al resultado operacional." },
    ],
    correct: "B",
    explanation:
      "Fórmula de EVA: EVA = UODI - (Capital Invertido × WACC).\nCosto del Capital = $800.000.000 × 12% = $96.000.000 COP.\nEVA = $140.000.000 - $96.000.000 = +$44.000.000 COP.\nUn EVA positivo (+44M) certifica que la empresa no solo cubrió todos sus costos y gastos operacionales, sino que rindió $44 millones adicionales por encima de la tasa exigida por bancos y accionistas.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 22. SESIÓN 2 · CONTADURÍA PÚBLICA · ASEGURAMIENTO Y NIAS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-as-05",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "NIA 240: Responsabilidades del auditor en relación con el fraude",
    source: "Normas Internacionales de Auditoría (NIAs) · ICFES",
    contextText:
      "Durante la fase de planeación de una auditoría externa, el equipo evalúa las presiones sobre la gerencia. La junta directiva ató el 70% de la remuneración variable del Director General al cumplimiento de una meta agresiva de EBITDA trimestral. Adicionalmente, el Director General tiene facultades unilaterales para anular controles automatizados en el módulo de facturación ERP.",
    stem: "Bajo la NIA 240 (Fraude en los Estados Financieros), ¿cuáles dos condiciones del 'Triángulo del Fraude' se encuentran notoriamente configuradas?",
    choices: [
      { id: "A", text: "Incentivo / Presión financiera (bono agresivo por EBITDA) y Oportunidad (poder unilateral para anular controles internos en el ERP)." },
      { id: "B", text: "Racionalización moral y colusión con auditores gubernamentales." },
      { id: "C", text: "Incompetencia profesional y error involuntario de redondeo contable." },
      { id: "D", text: "Fuerza mayor y caso fortuito derivado de la inflación." },
    ],
    correct: "A",
    explanation:
      "El modelo de la NIA 240 define los 3 factores de riesgo de fraude: 1) Incentivo/Presión (la remuneración ligada a metas financieras agresivas); 2) Oportunidad (capacidad de anular controles por falta de segregación o concentración de permisos); y 3) Actitud/Racionalización. Aquí se configuran nítidamente Incentivo y Oportunidad.",
  },
  {
    id: "sp-cp-as-06",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "NIA 505: Procedimientos de confirmación externa (Circularizaciones)",
    source: "Saber Pro Contaduría · Auditoría de Estados Financieros",
    contextText:
      "Al auditar el saldo de Cuentas por Cobrar Comerciales al 31 de diciembre, el auditor envía solicitudes de confirmación externa positiva a una muestra de clientes clave. La gerencia de la empresa auditada solicita por escrito al auditor que NO envíe la circularización al cliente más grande (que representa el 35% de la cartera total), argumentando que dicho cliente se encuentra en una negociación sensible y que recibir una carta de auditoría podría 'molestarlo y arruinar el negocio'.",
    stem: "Conforme a los requerimientos taxativos de la NIA 505, ¿cómo debe proceder éticamente el auditor frente a esta negativa gerencial?",
    choices: [
      { id: "A", text: "Aceptar inmediatamente la solicitud de la gerencia sin indagar, para evitar que el cliente cancele contratos comerciales." },
      { id: "B", text: "Indagar sobre las razones de la gerencia y evaluar su validez; si la negativa carece de justificación razonable y le impide obtener evidencia suficiente, debe evaluar el impacto en su dictamen (posible opinión con salvedades o abstención de opinión por limitación en el alcance)." },
      { id: "C", text: "Llamar telefónicamente a escondidas al cliente desde un número privado sin dejar papel de trabajo." },
      { id: "D", text: "Calcular automáticamente una provisión de cartera del 100% sobre ese cliente sin más pruebas." },
    ],
    correct: "B",
    explanation:
      "Según la NIA 505 (apartados 8 y 9): Si la dirección se niega a permitir el envío de confirmaciones, el auditor debe indagar las razones y validar su razonabilidad. Si no hay justificación válida o no es posible obtener evidencia alternativa sustitutiva suficiente, se configura una limitación en el alcance que impacta el dictamen (salvedades o abstención).",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 23. SESIÓN 2 · CONTADURÍA PÚBLICA · INFORMACIÓN CONTABLE Y TRIBUTARIA
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cp-ct-03",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Medición y reconocimiento de inventarios bajo NIC 2 (Costo vs. VNR)",
    source: "Normas Internacionales de Información Financiera (NIIF Plenas / Pymes)",
    contextText:
      "Al 31 de diciembre, una empresa comercializadora tiene en bodega 1.000 unidades de un artículo con un costo de adquisición contable de $50.000 COP cada una (Costo total en libros = $50.000.000 COP). Por obsolescencia tecnológica, el precio de venta estimado en el mercado cayó a $42.000 COP por unidad, y se requiere incurrir en gastos de embalaje y flete de $2.000 COP por unidad para poder venderlas.",
    stem: "Conforme a la NIC 2 (Inventarios), ¿cuál es el Valor Neto Realizable (VNR) y cuál es el ajuste por deterioro de inventarios que debe reconocerse en los resultados del periodo?",
    choices: [
      { id: "A", text: "VNR = $40.000 COP por unidad; y debe reconocerse un gasto por deterioro de $10.000.000 COP en el estado de resultados contra la provisión de inventarios." },
      { id: "B", text: "VNR = $42.000 COP por unidad; y debe reconocerse un deterioro de $8.000.000 COP." },
      { id: "C", text: "No debe reconocerse ningún ajuste porque el costo histórico de adquisición ($50.000) permanece inmutable hasta que los productos sean facturados." },
      { id: "D", text: "Debe aumentarse el valor del inventario en $2.000.000 COP para compensar los fletes." },
    ],
    correct: "A",
    explanation:
      "Fórmula NIC 2: VNR = Precio estimado de venta - Costos estimados para terminar y vender.\nVNR unitario = $42.000 - $2.000 = $40.000 COP.\nComo el VNR ($40.000) es menor que el Costo ($50.000), el inventario debe medirse al menor valor (VNR).\nPérdida por deterioro unitaria = $50.000 - $40.000 = $10.000 COP.\nDeterioro total = 1.000 unidades × $10.000 = $10.000.000 COP de gasto por deterioro en el periodo.",
  },
  {
    id: "sp-cp-ct-04",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Reconocimiento de contratos de arrendamiento bajo NIIF 16",
    source: "NIIF 16 Arrendamientos · Marco Técnico Contable",
    contextText:
      "Una empresa suscribe el 1 de enero un contrato de arrendamiento sobre una bodega industrial por un plazo no cancelable de 5 años, comprometiéndose a pagar un canon anual de $60.000.000 COP al final de cada año. La tasa de interés implícita en el arrendamiento (o tasa incremental de endeudamiento) es del 10% E.A. El valor presente de los 5 cánones descontados al 10% es de $227.447.000 COP.",
    stem: "Bajo el modelo único de arrendatario de la NIIF 16, ¿cómo debe reconocerse la operación en el balance inicial del arrendatario al 1 de enero?",
    choices: [
      { id: "A", text: "Registrar simplemente un gasto de arrendamiento mensual de $5.000.000 COP en el estado de resultados a medida que se pague, sin afectar el balance general." },
      { id: "B", text: "Reconocer en el activo un 'Activo por Derecho de Uso' por $227.447.000 COP y en el pasivo un 'Pasivo por Arrendamiento' financiero por el mismo valor de $227.447.000 COP." },
      { id: "C", text: "Registrar un pasivo por el total nominal de los 5 años ($300.000.000 COP) sin descontar a valor presente." },
      { id: "D", text: "Registrar la bodega como propiedad, planta y equipo en copropiedad con el arrendador." },
    ],
    correct: "B",
    explanation:
      "La NIIF 16 eliminó la distinción entre arrendamiento operativo y financiero para el arrendatario. En la fecha de inicio, todo arrendamiento debe reconocerse en el balance midiendo el 'Activo por Derecho de Uso' y el 'Pasivo por Arrendamiento' al valor presente de los pagos futuros descontados con la tasa de interés.",
  },
  {
    id: "sp-cp-ct-05",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    competency: "Régimen de Retención en la Fuente a título de Renta e IVA en Colombia",
    source: "Estatuto Tributario Nacional (Arts. 368, 392, 437-1 y 437-2)",
    contextText:
      "Una sociedad calificada como Gran Contribuyente y Autorretenedor de Renta por la DIAN contrata los servicios de asesoría jurídica especializada de una persona jurídica del régimen ordinario (no autorretenedora) por valor de $10.000.000 COP más IVA del 19% ($1.900.000).",
    stem: "Al momento del pago o abono en cuenta, ¿qué retenciones en la fuente obligatorias debe practicar la empresa contratante?",
    choices: [
      { id: "A", text: "Retención en la fuente por servicios/honorarios de renta a la tarifa del 11% ($1.100.000 COP) y Retención de IVA (ReteIVA) a la tarifa general del 15% sobre el valor del IVA ($285.000 COP)." },
      { id: "B", text: "Ninguna retención, porque entre personas jurídicas no existe retención en la fuente en Colombia." },
      { id: "C", text: "Retención de ICA únicamente, pues los Grandes Contribuyentes están exentos de retener renta e IVA." },
      { id: "D", text: "Retención del 100% del valor total de la factura para consignarlo a la DIAN." },
    ],
    correct: "A",
    explanation:
      "1) Retención en la fuente a título de renta por honorarios a personas jurídicas: 11% sobre la base antes de IVA ($10.000.000 × 11% = $1.100.000 COP). 2) Como el adquirente es Gran Contribuyente del Art. 437-2 E.T., actúa como agente retenedor del IVA frente a proveedores ordinarios: retiene el 15% del impuesto generado ($1.900.000 × 15% = $285.000 COP).",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 24. SESIÓN 2 · OTRAS CARRERAS PROFESIONALES (Administración, Derecho, Ingeniería)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-adm-02",
    session: "especifica",
    areaId: "gestion-organizaciones",
    areaLabel: "Gestión de Organizaciones",
    careerId: "administracion",
    careerLabel: "Administración de Empresas",
    competency: "Cuadro de Mando Integral (Balanced Scorecard) de Kaplan y Norton",
    source: "Saber Pro Administración ICFES",
    contextText:
      "En el proceso de planeación estratégica, la alta gerencia define metas de 'Reducción del ciclo de producción en planta en 20%' e 'Implementación de metodologías ágiles Scrum en la línea de ensamble'.",
    stem: "¿A cuál de las cuatro perspectivas del Balanced Scorecard pertenecen primordialmente estos objetivos?",
    choices: [
      { id: "A", text: "Perspectiva Financiera." },
      { id: "B", text: "Perspectiva de Clientes y Mercado." },
      { id: "C", text: "Perspectiva de Procesos Internos de Negocio." },
      { id: "D", text: "Perspectiva de Responsabilidad Fiscal del Estado." },
    ],
    correct: "C",
    explanation:
      "La Perspectiva de Procesos Internos identifica los procesos críticos (innovación, operación, servicio postventa) en los que la empresa debe sobresalir para satisfacer las expectativas de clientes y accionistas. Reducir tiempos de ciclo y adoptar Scrum son mejoras netas de procesos internos.",
  },
  {
    id: "sp-der-02",
    session: "especifica",
    areaId: "argumentacion-juridica",
    areaLabel: "Investigación y Argumentación Jurídica",
    careerId: "derecho",
    careerLabel: "Derecho",
    competency: "Bloque de Constitucionalidad y Control de Convencionalidad",
    source: "Artículo 93 de la Constitución Política y Jurisprudencia Corte Constitucional",
    contextText:
      "Una norma con fuerza de ley expedida por el Congreso limita las garantías judiciales mínimas en procesos disciplinarios. El demandante alega que dicha ley vulnera el Artículo 8 de la Convención Americana sobre Derechos Humanos (Pacto de San José).",
    stem: "En virtud del Artículo 93 de la Constitución Política de Colombia, ¿qué jerarquía ostenta el tratado internacional de derechos humanos ratificado por Colombia frente a la ley ordinaria?",
    choices: [
      { id: "A", text: "Integra el Bloque de Constitucionalidad en sentido estricto, prevalece en el orden interno y sirve como parámetro supralegal obligatorio para declarar la inexequibilidad de la ley contraria." },
      { id: "B", text: "Es una directriz simplemente optativa que los jueces pueden inaplicar a su criterio." },
      { id: "C", text: "Tiene rango inferior a las leyes ordinarias expedidas por el Congreso." },
      { id: "D", text: "Solo aplica si la OEA interviene directamente en el litigio municipal." },
    ],
    correct: "A",
    explanation:
      "Por mandato del Art. 93 C.P., los tratados de derechos humanos ratificados por el Congreso integran el Bloque de Constitucionalidad y prevalecen sobre el orden interno, vinculando a todos los operadores judiciales a ejercer control de constitucionalidad y de convencionalidad.",
  },
  {
    id: "sp-ing-02",
    session: "especifica",
    areaId: "formulacion-proyectos",
    areaLabel: "Formulación de Proyectos",
    careerId: "ingenieria",
    careerLabel: "Ingeniería",
    competency: "Gestión del Valor Ganado (EVM) en control de costos y cronograma",
    source: "Guía PMBOK / Estándar Internacional de Gestión de Proyectos",
    contextText:
      "Al cierre del sexto mes de ejecución de una obra de infraestructura vial, el director de proyecto obtiene los siguientes indicadores de Valor Ganado (EVM):\n- Valor Planeado (PV) = $500 millones COP.\n- Valor Ganado (EV) = $400 millones COP.\n- Costo Real Incurrido (AC) = $480 millones COP.",
    stem: "Al calcular el Índice de Desempeño del Cronograma (SPI = EV/PV) y el Índice de Desempeño del Costo (CPI = EV/AC), ¿cuál es el estado real del proyecto?",
    choices: [
      { id: "A", text: "SPI = 0.80 y CPI = 0.83; el proyecto está retrasado frente al cronograma (SPI < 1) y con sobrecostos respecto al presupuesto planeado (CPI < 1)." },
      { id: "B", text: "SPI = 1.25 y CPI = 1.20; el proyecto va adelantado y generando ahorros financieros." },
      { id: "C", text: "SPI = 1.00 y CPI = 1.00; el proyecto está en perfecto equilibrio según lo planeado." },
      { id: "D", text: "El proyecto no puede evaluarse sin consultar el software Primavera P6." },
    ],
    correct: "A",
    explanation:
      "Cálculos EVM:\n1) SPI = EV / PV = $400M / $500M = 0.80. Como SPI < 1.0, el avance físico real es menor al programado (retraso en cronograma).\n2) CPI = EV / AC = $400M / $480M = 0.833. Como CPI < 1.0, por cada peso gastado solo se han generado 83 centavos de valor físico (sobrecosto en presupuesto).",
  },
];

/**
 * Guía Rápida de Fórmulas y Claves para Contaduría Pública y Genéricas (Para los 4 días restantes)
 */
export const SABER_PRO_CHEATSHEET = [
  {
    category: "Contaduría: Ratios de Liquidez",
    title: "Razón Corriente y Prueba Ácida",
    formula: "Razón Corriente = Activo Corriente / Pasivo Corriente\nPrueba Ácida = (Activo Corriente - Inventarios - Gastos Anticipados) / Pasivo Corriente",
    keyTip: "Un resultado > 1.0 en la prueba ácida indica que la empresa puede pagar todas sus deudas a corto plazo sin tener que vender inventarios.",
  },
  {
    category: "Contaduría: Ratios de Rentabilidad",
    title: "Margen Neto, ROE y ROA",
    formula: "ROA = Utilidad Neta / Activo Total\nROE = Utilidad Neta / Patrimonio Neto\nMargen Neto = Utilidad Neta / Ingresos Operacionales",
    keyTip: "El ROE mide el retorno que reciben los accionistas por su capital invertido. Si ROE > ROA, la empresa se beneficia del apalancamiento financiero positivo.",
  },
  {
    category: "Contaduría: Evaluación de Proyectos",
    title: "VPN y TIR (Criterio Rector)",
    formula: "VPN = ∑ [Flujo_t / (1 + WACC)^t] - Inversión Inicial",
    keyTip: "Ante proyectos mutuamente excluyentes, SIEMPRE manda el mayor VPN, no la mayor TIR. El VPN mide la riqueza neta generada en pesos constantes.",
  },
  {
    category: "Contaduría: Auditoría NIAs",
    title: "Matriz de Tipos de Dictamen (NIA 700 / 705)",
    formula: "Material pero NO generalizado -> Opinión con Salvedades («Excepto por»)\nMaterial Y Generalizado -> Opinión Desfavorable (Adversa)\nFalta de Evidencia Material Y Generalizada -> Abstención de Opinión",
    keyTip: "Si la administración se niega a corregir una incorrección de gran impacto en todo el balance, el dictamen es DESFAVORABLE, no abstención.",
  },
  {
    category: "Genérica: Razonamiento Cuantitativo",
    title: "Variación Porcentual y Regla de 3",
    formula: "% Variación = [(Valor Final - Valor Inicial) / Valor Inicial] × 100",
    keyTip: "Si un precio sube 20% y luego baja 20%, el precio NO vuelve al original: queda 4% por debajo (1.20 × 0.80 = 0.96).",
  },
  {
    category: "Genérica: Competencias Ciudadanas",
    title: "Mecanismos Constitucionales Clave (Constitución 1991)",
    formula: "Acción de Tutela: Derechos fundamentales individuales (vida, salud, debido proceso).\nAcción Popular: Derechos colectivos (medio ambiente sano, espacio público).\nAcción de Cumplimiento: Hacer cumplir una ley o acto administrativo desobedecido.",
    keyTip: "La tutela es sumaria (10 días para fallo) y no requiere abogado.",
  },
  {
    category: "Genérica: Lectura Crítica",
    title: "Falacias Argumentativas Frecuentes en el ICFES",
    formula: "Ad Hominem: Descalificar el argumento atacando a la persona.\nHombre de Paja: Caricaturizar o exagerar la postura rival para refutarla fácil.\nFalso Dilema: Reducir un problema complejo a solo dos opciones extremas.",
    keyTip: "El ICFES premia identificar la debilidad estructural del argumento, no tu opinión ideológica sobre el tema.",
  },
  {
    category: "Contaduría: Finanzas Corporativas",
    title: "Costo Promedio Ponderado de Capital (WACC / CPPC)",
    formula: "WACC = [W_d × K_d × (1 - T)] + [W_e × K_e]\nDonde:\nW_d = Peso de la Deuda, K_d = Costo de Deuda\nT = Tasa Impositiva (35% en Colombia)\nW_e = Peso del Patrimonio, K_e = Costo de Oportunidad",
    keyTip: "Los intereses financieros generan escudo fiscal (Tax Shield) reduciendo el costo real de la deuda: K_d × (1 - T). El patrimonio NO tiene escudo fiscal.",
  },
  {
    category: "Contaduría: Finanzas Operativas",
    title: "Ciclo de Conversión de Efectivo (CCE)",
    formula: "Ciclo Operativo = Días de Inventario + Días de Cartera\nCCE = Ciclo Operativo - Días de Proveedores",
    keyTip: "Un CCE más bajo o negativo significa que la empresa financia su operación con los proveedores antes de pagar, requiriendo menos crédito bancario.",
  },
  {
    category: "Contaduría: Análisis de Costos",
    title: "Punto de Equilibrio Operativo (Q_eq)",
    formula: "Margen de Contribución Unitario (MCU) = Precio - Costo Variable Unitario\nQ_eq (unidades) = Costos Fijos Totales / MCU\nVentas de Equilibrio ($) = Costos Fijos Totales / (MCU / Precio)",
    keyTip: "Por encima del punto de equilibrio, cada unidad adicional vendida aporta su MCU íntegramente a la utilidad operativa.",
  },
  {
    category: "Contaduría: Auditoría NIAs",
    title: "Cuestiones Clave de Auditoría (KAM - NIA 701)",
    formula: "KAM = Asuntos que demandaron mayor atención del auditor por complejidad en estimaciones contables o juicios de la dirección.\nNO es una salvedad ni una opinión modificada.",
    keyTip: "Las KAM se incluyen obligatoriamente en dictámenes de entidades cotizadas y no sustituyen la revelación en notas ni la opinión de auditoría.",
  },
  {
    category: "Contaduría: Normas NIIF / IFRS",
    title: "Impuesto Diferido: Regla Mnemotécnica (NIC 12)",
    formula: "Para ACTIVOS:\n- Base Fiscal > Valor en Libros  -> Activo por Impuesto Diferido (Diferencia Temporaria Deducible).\n- Base Fiscal < Valor en Libros  -> Pasivo por Impuesto Diferido (Diferencia Temporaria Imponible).\nPara PASIVOS: Se invierte la relación.",
    keyTip: "Un Activo Diferido representa un derecho a pagar menos impuesto en el futuro. Requiere que sea probable la existencia de ganancias fiscales futuras.",
  },
  {
    category: "Contaduría: Normas NIIF / IFRS",
    title: "Reconocimiento de Ingresos (NIIF 15 en 5 Pasos)",
    formula: "Paso 1: Identificar el contrato.\nPaso 2: Identificar las obligaciones de desempeño separables.\nPaso 3: Determinar el precio de la transacción.\nPaso 4: Asignar el precio a cada obligación.\nPaso 5: Reconocer el ingreso cuando (o a medida que) se satisfaga la obligación.",
    keyTip: "Si la obligación es continua en el tiempo (licencias + soporte), el ingreso se difiere mensualmente y el saldo anticipado queda en Pasivo Contractual.",
  },
];
