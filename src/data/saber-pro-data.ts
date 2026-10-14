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
      "La opción B recoge con exactitud la tesis central: el autor define la libertad no como actuar por impulsos ni como ausencia de leyes externas, sino como el autodominio racional guiado por principios éticos universales (autonomía interior). Quien cede a pasiones ciegas o a la presión de la masa renuncia a su condición de sujeto autónomo.",
    methodTip:
      "Técnica para preguntas de Tesis Principal en Lectura Crítica:\n1. Identifica qué idea defiende el autor frente a las posturas contrarias que él mismo rechaza.\n2. Busca oraciones contrastivas («no consiste en... sino en...»).\n3. Desecha opciones que agreguen elementos ajenos al texto (como leyes del Estado) o lleven la idea a extremos no formulados.",
    distractorAnalysis:
      "Trampas del ICFES en esta pregunta:\n- Opción A: Añade 'restricción legal impuesta por el Estado', desviando el tema hacia el plano jurídico cuando el texto habla de ética y gobierno personal interno.\n- Opciones C y D: Utilizan términos absolutistas ('siempre falsas', 'incompatibles'), un distractor clásico de generalización indebida que el ICFES coloca para tentar a lectores apresurados.",
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
      "La opción B es la correcta porque el congresista comete la falacia «ad hominem» (ataque a la persona): en lugar de controvertir los méritos urbanísticos, ambientales o financieros del plan de movilidad, busca descalificar el proyecto técnico atacando una circunstancia personal del diseñador (que no sabe montar bicicleta). Los atributos personales del autor no invalidan la solidez técnica de su propuesta.",
    methodTip:
      "Técnica para identificar Falacias en el Examen:\nPregúntate: ¿El emisor está rebatiendo con datos las premisas técnicas de la propuesta o está descalificando la vida, hábitos o moral de quien la expone? Si ataca a la persona en vez del argumento, descarta de plano las demás opciones y marca 'Ad Hominem'.",
    distractorAnalysis:
      "Trampas del ICFES en esta pregunta:\n- Opción A (Ad misericordiam): Apela a la lástima o piedad, algo inexistente en las palabras del congresista.\n- Opción C (Falsa analogía): No se compara la bicicleta con camiones u otro transporte.\n- Opción D (Petición de principio): No incluye la conclusión dentro de las premisas, sino que desvía el debate hacia la vida privada del profesional.",
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
      "Paso 1: Aumento del 20% sobre $120.000.000 COP:\n$120.000.000 × 1.20 = $144.000.000 COP.\nPaso 2: Reducción del 10% sobre la nueva base resultante ($144.000.000 COP):\n$144.000.000 × (1 - 0.10) = $144.000.000 × 0.90 = $129.600.000 COP.\nEl costo final de producción es $129.600.000 COP.",
    methodTip:
      "Regla de Oro para Variaciones Porcentuales Sucesivas en el ICFES:\nNunca sumes ni restes porcentajes sucesivos de manera lineal. Multiplica los factores de cambio:\n- Aumentar 20% equivale a multiplicar por 1.20.\n- Reducir 10% equivale a multiplicar por 0.90.\nFactor acumulado: 1.20 × 0.90 = 1.08 (+8% neto).\nCálculo directo: $120.000.000 × 1.08 = $129.600.000 COP.",
    distractorAnalysis:
      "Trampa reina del ICFES:\n- Opción B ($132.000.000): Es la trampa en la que cae la mayoría de evaluados al restar directamente 20% - 10% = 10% y aplicarlo a la base inicial ($120M + 10% = $132M). Es falsa porque la reducción del 10% opera sobre los $144 millones ya aumentados, no sobre los $120 millones originales.\n- Opción A ($120.000.000): Asume que subir 20% y bajar 10% deja el valor intacto.",
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
      "Bajo interés compuesto, los rendimientos periódicos se capitalizan (generan nuevos intereses):\n- Mes 1: $10.000.000 + (1% de 10M = $100.000) = $10.100.000 COP.\n- Mes 2: $10.100.000 + (1% de 10.1M = $101.000) = $10.201.000 COP.\n- Mes 3: $10.201.000 + (1% de 10.201.000 = $102.010) = $10.303.010 COP.\nFórmula matemática: VF = $10.000.000 × (1 + 0.01)^3 = $10.303.010 COP.",
    methodTip:
      "Técnica sin calculadora para Interés Compuesto:\nCalcula el 1% mentalmente corriendo dos decimales a la izquierda:\nMes 1: 10.000.000 -> 1% es 100.000 -> Saldo: 10.100.000\nMes 2: 10.100.000 -> 1% es 101.000 -> Saldo: 10.201.000\nMes 3: 10.201.000 -> 1% es 102.010 -> Saldo: 10.303.010 COP.\nCuando haya reinversión periódica, busca siempre la opción que incluya los intereses sobre los intereses.",
    distractorAnalysis:
      "Trampas del ICFES en Interés Compuesto:\n- Opción A ($10.300.000): Calcula interés simple (1% × 3 meses = 3% lineal; $10M + $300k). Es el distractor predilecto para quienes ignoran la capitalización mensual.\n- Opciones C y D: Emplean tasas infladas o multiplican por periodos no pactados.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. SESIÓN 1 · GENÉRICAS · COMPETENCIAS CIUDADANAS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cc-01",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    methodTip:
      "Técnica para Mecanismos Constitucionales de Protección de Derechos:\n- Si la víctima es una persona individual y está en riesgo inminente su vida, salud o debido proceso -> ACCIÓN DE TUTELA (falla en 10 días hábiles ante cualquier juez).\n- Si se afecta a toda la comunidad (medio ambiente, espacio público, moralidad) -> ACCIÓN POPULAR.\n- Si la autoridad desobedece una ley expresa -> ACCIÓN DE CUMPLIMIENTO.",
    distractorAnalysis:
      "Trampas del ICFES en esta pregunta:\n- Opción B (Acción Popular): Solo protege derechos colectivos; un juez no autoriza una cirugía individual mediante acción popular.\n- Opción C (Acción de Cumplimiento): Sirve para hacer cumplir una ley general, no para ordenar procedimientos médicos urgentes.\n- Opción D (Demanda ordinaria): Un proceso contencioso tarda entre 3 y 5 años; para cuando salga la sentencia, la paciente habría fallecido.",
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
      "El Artículo 86 de la Constitución Política de 1991 consagra la Acción de Tutela como el instrumento judicial idóneo, preferente y sumario para proteger de forma inmediata derechos fundamentales (la vida y la salud en conexidad) vulnerados o amenazados por entidades públicas o particulares que presten el servicio de salud (EPS). Los jueces tienen un plazo perentorio de 10 días para fallar.",
  },
  {
    id: "sp-cc-02",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    methodTip:
      "Técnica para Preguntas de Conflicto y Multiperspectivismo:\n1. Identifica a las dos partes involucradas y su argumento central.\n2. Busca la opción que describa la tensión de valores de forma equilibrada y neutral, sin juzgar moralmente a ninguna de las partes como 'los buenos' o 'los malos'.\n3. Descarta opciones que mencionen normas, entidades o trámites no contemplados en el texto.",
    distractorAnalysis:
      "Trampas del ICFES en Multiperspectivismo:\n- Opción A: Introduce 'tratados de libre comercio', un elemento completamente ajeno al texto.\n- Opción C: Menciona a la Fiscalía, que es un órgano de persecución penal, no de resolución de conflictos socioambientales.\n- Opción D: Reduce el conflicto a un debate técnico de propiedad del subsuelo, ignorando la dimensión humana del agua y el empleo.",
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
      "En el módulo de Competencias Ciudadanas, el análisis multiperspectivista exige identificar los intereses y valores contrapuestos en un conflicto social. La opción B sintetiza con exactitud los dos polos del debate: la legítima pretensión económica de empleo y regalías (800 puestos de trabajo) frente a la preservación del ecosistema y el derecho humano fundamental al agua potable de la población.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. SESIÓN 1 · GENÉRICAS · INGLÉS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-in-01",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    methodTip:
      "Reading Strategy for English Passages:\n1. Identify question keywords: 'why is CSR no longer considered optional?'.\n2. Scan the text for consequences: «Organizations that fail to implement... face severe reputational backlash and regulatory penalties».\n3. Match paraphrased vocabulary: 'reputational backlash and regulatory penalties' = 'financial and reputational risks'.",
    distractorAnalysis:
      "Common ICFES Traps in English:\n- Option A: Uses an extreme, fabricated claim ('governments have completely eliminated corporate taxes').\n- Option C: Contains an absolutist trap word ('consumers only buy from non-profits').\n- Option D: Expresses the exact opposite of the passage by stating companies can easily hide operations.",
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
      "The passage explicitly states that corporate social responsibility (CSR) is no longer a luxury because investors and consumers actively scrutinize how corporate profits are made. Organizations that fail to adopt ethical, labor, and environmental practices face regulatory sanctions and reputational loss. Option B captures these precise causes through accurate paraphrasing.",
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
      "Cálculos de Liquidez:\n1. Razón Corriente = Activo Corriente / Pasivo Corriente = $500.000.000 / $250.000.000 = 2.0. Por cada peso que debe a corto plazo, la firma tiene $2.00 de activos para responder.\n2. Prueba Ácida = (Activo Corriente - Inventarios - Gastos Anticipados) / Pasivo Corriente = ($500.000.000 - $220.000.000 - $30.000.000) / $250.000.000 = $250.000.000 / $250.000.000 = 1.0.\nUn resultado de 1.0 en la prueba ácida certifica que la empresa puede pagar el 100% de sus pasivos corrientes inmediatos sin depender de vender sus inventarios.",
    methodTip:
      "Técnica para Índices de Liquidez:\n- Razón Corriente = AC / PC.\n- Prueba Ácida = (AC - Inventarios - Gastos Pagados por Anticipado) / PC.\nRecuerda: Los gastos pagados por anticipado NO son dinero disponible para liquidar pasivos, por lo que siempre deben deducirse junto con los inventarios.",
    distractorAnalysis:
      "Trampas del ICFES en Liquidez:\n- Opción C: Olvida restar los gastos anticipados o divide erróneamente.\n- Opción B: Invierte la fórmula diciendo que la prueba ácida es mayor a la corriente, lo cual es matemáticamente imposible cuando existen inventarios.\n- Opción D: Asume valores arbitrarios sin sustento contable.",
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
      "En finanzas corporativas, ante proyectos mutuamente excluyentes (donde aceptar uno descarta al otro), el criterio jerárquicamente superior es el Valor Presente Neto (VPN). El Proyecto Alfa genera $45 millones de riqueza neta presente frente a solo $20 millones del Proyecto Beta. La TIR (28% de Beta vs 21% de Alfa) es una tasa porcentual relativa que distorsiona la decisión por asumir tasas irreales de reinversión y no considerar la escala absoluta del capital invertido.",
    methodTip:
      "Regla de Oro en Finanzas para el Examen:\nEn proyectos mutuamente excluyentes, el VPN prevalece SIEMPRE sobre la TIR y sobre el Payback.\nEl objetivo del gerente financiero es maximizar el valor absoluto en pesos de la empresa (mayor VPN), no presumir una tasa porcentual más alta con menor ganancia monetaria.",
    distractorAnalysis:
      "Trampas del ICFES en Evaluación de Proyectos:\n- Opción A: Es la trampa más frecuente del examen: elegir la TIR más alta (28% vs 21%). Un 28% de un proyecto pequeño genera menos dinero que un 21% de un proyecto grande que aporta $45 millones netos al patrimonio.\n- Opción B: Caer en el error del Payback (recuperación rápida), el cual ignora los flujos de caja posteriores al año 2 y el valor del dinero en el tiempo.",
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
      "Conforme a la NIA 705 (Opinión Modificada): Cuando el auditor obtiene evidencia de incorrecciones que son MATERIALES pero NO GENERALIZADAS (no permean la totalidad de los estados financieros), debe emitir una «Opinión con Salvedades» empleando la fórmula «excepto por». La opinión desfavorable solo procede si el error es material Y generalizado. La abstención procede únicamente ante imposibilidad de obtener evidencia suficiente.",
    methodTip:
      "Matriz Mnemotécnica NIA 705 para Dictámenes:\n- Incorrección Material pero NO Generalizada -> Opinión con SALVEDADES («Excepto por»).\n- Incorrección Material Y GENERALIZADA -> Opinión DESFAVORABLE / ADVERSA.\n- Falta de evidencia Material Y GENERALIZADA -> ABSTENCIÓN DE OPINIÓN.",
    distractorAnalysis:
      "Trampas del ICFES en Auditoría y Dictámenes:\n- Opción A: No puede emitirse dictamen limpio porque la administración se negó a corregir una distorsión material probada.\n- Opción C (Desfavorable): Solo procedería si el enunciado dijera que el error destruye la razonabilidad de todo el balance en su conjunto.\n- Opción D (Abstención): Solo aplica si el auditor no pudo conseguir papeles ni pruebas, no cuando el error ya fue descubierto y medido.",
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
      "El marco COSO III define las «Actividades de Control» como las políticas y procedimientos específicos que garantizan que se cumplan las instrucciones de la gerencia para mitigar riesgos. La segregación de funciones, límites de autorización, firmas mancomunadas y conciliaciones periódicas son ejemplos típicos de actividades de control preventivas.",
    methodTip:
      "Mnemotecnia de los 5 Componentes de COSO III:\n1. Entorno de control: Cultura ética y gobierno corporativo.\n2. Evaluación de riesgos: Identificación de impactos y probabilidades.\n3. Actividades de control: Procedimientos concretos (firmas, autorizaciones, arqueos, límites).\n4. Información y comunicación: Canales y flujo de reportes.\n5. Monitoreo: Supervisión y auditoría para evaluar el funcionamiento del sistema.",
    distractorAnalysis:
      "Trampas del ICFES en Control Interno:\n- Opción A (Entorno de control): Representa los valores éticos de la organización, no la regla procedimental de cheques con firma mancomunada.\n- Opción B (Evaluación de riesgos): Es el análisis previo del mapa de calor, no la medida de control adoptada.\n- Opción D (Monitoreo): Es la labor de auditoría que evalúa periódicamente el sistema, no la ejecución diaria del pago.",
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
    methodTip:
      "Técnica para Estrategias Genéricas de Porter en el Examen:\n- Si la empresa minimiza costos para cobrar el precio más bajo de todo el mercado -> Liderazgo en Costos.\n- Si la empresa añade valor, calidad, servicio o marca para cobrar un sobreprecio -> Diferenciación.\n- Si la empresa atiende exclusivamente un nicho muy angosto o específico -> Enfoque / Alta Segmentación.",
    distractorAnalysis:
      "Trampas del ICFES en Administración Estratégica:\n- Opción A: Liderazgo en costos es la estrategia del competidor de Hard Discount, no la que adoptó la empresa que busca diferenciarse.\n- Opción C: No es un enfoque en un nicho desatendido, sino una propuesta transversal en toda su red de tiendas.\n- Opción D: Integración vertical implicaría adquirir a sus fabricantes o proveedores, algo que no guarda relación con la atención al cliente.",
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
      "La opción B describe con precisión la estrategia de «Diferenciación» de Michael Porter: ante competidores de descuento duro (Hard Discount), la empresa evita una guerra de precios destructiva y opta por dotar a sus productos y servicios de atributos valorados como únicos y superiores (experiencia de compra prémium, asesoría personalizada, omnicanalidad). Esto le permite fijar precios más altos protegiendo su margen operativo.",
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
    methodTip:
      "Técnica para Defectos Procesales y Vía de Hecho en Tutela:\n- Desconocer jurisprudencia reiterada o Sentencias SU -> Desconocimiento del Precedente.\n- Valorar pruebas inexistentes o ignorar pruebas determinantes -> Defecto Fáctico.\n- Actuar sin competencia o fuera de la jurisdicción -> Defecto Orgánico.\n- Aplicar una norma derogada o manifiestamente inaplicable -> Defecto Sustantivo.",
    distractorAnalysis:
      "Trampas del ICFES en Argumentación Jurídica:\n- Opción A (Defecto fáctico): Guarda relación con el decreto y valoración de pruebas, no con ignorar la jurisprudencia unificada de las altas cortes.\n- Opción C (Defecto orgánico): El juez sí tenía competencia para tramitar el litigio civil ordinario.\n- Opción D (Defecto procedimental): Ocurre cuando el funcionario aplica un procedimiento totalmente equivocado o exige formalismos desmedidos.",
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
      "El desconocimiento del precedente judicial constitucional vinculante (especialmente las Sentencias de Unificación - SU de la Corte Constitucional) vulnera de forma directa los principios de igualdad, seguridad jurídica y confianza legítima. Esta conducta configura una causal específica de procedibilidad de la Acción de Tutela contra Providencias Judiciales por vía de hecho.",
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
    methodTip:
      "Técnica para Ruta Crítica (CPM) en Proyectos:\n- Holgura Total = 0: Actividad crítica en la ruta más larga. Todo retraso en ella retrasa la entrega global del proyecto.\n- Holgura Total > 0: Actividad no crítica. Puede demorarse hasta el límite de su holgura sin perjudicar el hito final.",
    distractorAnalysis:
      "Trampas del ICFES en Formulación y Gestión de Proyectos:\n- Opción A: Confunde la holgura en días de cronograma con un ahorro en costos financieros.\n- Opción C: Afirma que puede postergarse indefinidamente, lo cual es la definición opuesta a una actividad con holgura cero.\n- Opción D: Sugiere prescindir de interventoría, una conclusión absurda en ingeniería civil.",
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
      "En la metodología del Camino Crítico (CPM / Critical Path Method), las actividades que forman parte de la Ruta Crítica tienen holgura total igual a cero (Holgura = Inicio Tardío - Inicio Temprano = 0). Esto significa que no tienen margen de retraso: cualquier demora de un día en el pilotaje traslada de forma inmediata y automática un retraso de un día a la fecha final de entrega de toda la obra.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. SESIÓN 1 · GENÉRICAS ADICIONALES (Lectura Crítica)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-lc-03",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    methodTip:
      "Técnica de la Prueba de Negación para Supuestos Implícitos:\n1. Toma la opción que crees correcta y niégala mentalmente: «¿Qué pasaría si los datos históricos estuvieran 100% libres de sesgos e injusticias?».\n2. Si al negarla la tesis del autor se desmorona por completo, ¡esa es la premisa implícita correcta!\n3. Descarta opciones que lleven la idea a extremos absurdos no planteados.",
    distractorAnalysis:
      "Trampas del ICFES en Supuestos y Premisas Implícitas:\n- Opción A: Plantea errores en cálculos aritméticos de computadores, un aspecto técnico no relacionado con el argumento ético de los sesgos sociales.\n- Opción C: Es una exageración destructiva ('ningún banco o universidad debería usar computadores').\n- Opción D: Descalifica a las matemáticas como disciplina injusta, distractor visceral diseñado para confundir.",
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
      "Un supuesto implícito es una premisa indispensable que no está expresada de forma textual, pero sin la cual el argumento central carece de sustento lógico. El autor afirma que entrenar algoritmos con datos históricos automatizará injusticias; para que esta conclusión sea válida, es lógicamente forzoso asumir que los datos históricos contienen efectivamente prejuicios, inequidades y sesgos sociales preexistentes.",
  },
  {
    id: "sp-lc-04",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    methodTip:
      "Técnica para detectar Ironía y Tono del Autor en el ICFES:\n1. Fíjate en la contradicción entre los elogios superficiales y la realidad narrada. Si el autor usa adjetivos pomposos ('¡maravilla!', '¡prodigio!') pero a continuación narra situaciones indignantes o absurdas, NUNCA interpretes la frase de forma literal: ¡es una ironía!\n2. Identifica el propósito: El tono irónico persigue la burla, la parodia y la crítica mordaz (sarcasmo).\n3. Desecha opciones que asuman una alabanza real o que confundan la sátira social con poesía lírica.",
    distractorAnalysis:
      "Trampas del ICFES en esta pregunta (Descarte detallado):\n- Opción B (Elogio sincero): La trampa reina de lectura literal; un lector descuidado cree que el autor aplaude los controles del Estado porque dijo 'qué maravilla'.\n- Opción C (Metáfora poética): Confunde una crítica social con una figura estética de embellecimiento.\n- Opción D (Falacia ad misericordiam): Apela a una falacia inexistente, pues el texto no busca generar lástima por los burócratas, sino exponer la indignación del ciudadano.",
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
      "La opción A es la correcta: La ironía es una figura discursiva en la que se expresa literalmente lo contrario de lo que realmente se piensa, apoyándose en el tono y la exageración contextual para que el lector capte el sentido crítico. Al calificar como *«¡Qué maravilla de sistema administrativo!»* una cadena de trámites absurdos (40 formularios notariados, seis meses de espera en tres ventanillas y demostrar no haber muerto por $10.000 pesos), el autor no elogia al Estado, sino que emplea un sarcasmo punzante para fustigar la ineficiencia burocrática.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. SESIÓN 1 · GENÉRICAS ADICIONALES (Razonamiento Cuantitativo)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-rc-03",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    methodTip:
      "Técnica para Probabilidad Condicional Sin Reemplazo:\n1. Primera extracción: (casos favorables) / (total inicial).\n2. Segunda extracción: Resta SIEMPRE 1 al numerador y 1 al denominador: (favorables - 1) / (total - 1).\n3. Multiplica ambas fracciones. Jamás las sumes, porque se requiere que ocurran ambos eventos sucesivamente (evento 1 Y evento 2).",
    distractorAnalysis:
      "Trampas del ICFES en Probabilidad:\n- Opción B (94/100 × 94/100): Es la trampa de asumir muestreo CON reemplazo (como si devolvieran la pieza a la caja).\n- Opción C (6/100 × 5/99): Calcula la probabilidad de que AMBAS sean defectuosas, lo contrario a lo pedido.\n- Opción D (94/100 + 93/99): Suma las probabilidades en vez de multiplicarlas (la suma aplica para eventos excluyentes alternativos, no para extracciones conjuntas).",
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
      "Al realizar una extracción sucesiva y **sin reemplazo** de una caja con 100 piezas (94 en buen estado y 6 defectuosas), los eventos son dependientes:\n1. Probabilidad de que la primera pieza sea buena: 94 / 100.\n2. Al no devolverla a la caja, quedan 99 piezas totales y 93 en buen estado. La probabilidad condicional de que la segunda también sea buena es: 93 / 99.\nPor la regla del producto para eventos dependientes: P(ambas buenas) = (94 / 100) × (93 / 99).",
  },
  {
    id: "sp-rc-04",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    methodTip:
      "Técnica para Promedios Ponderados en el ICFES:\n1. Multiplica cantidad × precio de cada lote y suma para obtener el desembolso total.\n2. Divide el desembolso total entre la suma total de unidades adquiridas.\nAtajo de estimación: Como la mitad del inventario (500 unidades) costó $10.000, el costo promedio forzosamente debe estar muy cerca de $10.000 y por debajo de $12.000.",
    distractorAnalysis:
      "Trampas del ICFES en Promedios:\n- Opción A ($12.333 COP): La trampa clásica de calcular el promedio aritmético simple: ($10.000 + $12.000 + $15.000) / 3 = $12.333. Ignora que no se compraron cantidades iguales en los tres pedidos.\n- Opciones C y D: Son aproximaciones empíricas sin sustento contable.",
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
      "Cálculo del Costo Promedio Ponderado:\n1. Gasto monetario total acumulado:\n- Orden 1: 500 u × $10.000 = $5.000.000 COP\n- Orden 2: 300 u × $12.000 = $3.600.000 COP\n- Orden 3: 200 u × $15.000 = $3.000.000 COP\nTotal invertido = $5.000.000 + $3.600.000 + $3.000.000 = $11.600.000 COP.\n2. Unidades totales adquiridas = 500 + 300 + 200 = 1.000 unidades.\n3. Costo unitario promedio ponderado = $11.600.000 / 1.000 u = $11.600 COP.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. SESIÓN 1 · GENÉRICAS ADICIONALES (Competencias Ciudadanas)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cc-03",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    methodTip:
      "Técnica para Control Constitucional de Decretos de Excepción:\n- Decretos Legislativos en Estados de Excepción -> Control AUTOMÁTICO e integral de la CORTE CONSTITUCIONAL (no requiere demanda ciudadana previa).\n- Leyes ordinarias del Congreso -> Control por Acción Pública de Inconstitucionalidad (requiere demanda de un ciudadano).\n- Decretos administrativos ordinarios -> Consejo de Estado.",
    distractorAnalysis:
      "Trampas del ICFES en Estructura del Estado:\n- Opción A: Le otorga la competencia al Consejo de Estado y exige demanda previa, lo cual es falso para estados de excepción.\n- Opción C: Sugiere que una comisión del Congreso anula el decreto, confundiendo el control político con el control jurisdiccional.\n- Opción D: Atribuye potestades de veto preventivo a la Contraloría, entidad que solo ejerce vigilancia fiscal posterior.",
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
      "En el marco del equilibrio de poderes (Checks and Balances), los Artículos 214 y 241 de la Constitución Política disponen que los decretos legislativos dictados por el Presidente durante un Estado de Excepción (como la Emergencia Económica) deben ser enviados al día siguiente a la Corte Constitucional para que esta adelante un control automático, oficioso, integral y definitivo de constitucionalidad, sin necesidad de que un ciudadano interponga demanda.",
  },
  {
    id: "sp-cc-04",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    methodTip:
      "Diferenciador Rápido de Mecanismos de Participación Ciudadana:\n- Consulta Popular: El pueblo vota 'Sí' o 'No' sobre una decisión o proyecto de trascendencia territorial.\n- Plebiscito: El Presidente somete a consideración del pueblo una decisión del poder ejecutivo.\n- Referendo: Votación popular para aprobar o derogar un proyecto de norma o reforma constitucional.\n- Cabildo Abierto: Sesión deliberativa de asambleas/concejos (sin votación vinculante en urnas).",
    distractorAnalysis:
      "Trampas del ICFES en Participación Ciudadana:\n- Opción A (Plebiscito): Es potestad exclusiva del Presidente y opera a nivel nacional; no procede para decisiones de alcaldes o concejos.\n- Opción C (Cabildo Abierto): Es un espacio público de diálogo pero no tiene valor decisorio vinculante en urnas.\n- Opción D (Revocatoria): Busca dar por terminado el mandato de un alcalde o gobernador por incumplimiento del programa de gobierno, no votar proyectos de obras.",
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
      "La Consulta Popular (Art. 105 C.P. y Leyes 134/1994 y 1757/2015) es el mecanismo de participación ciudadana mediante el cual se formula una pregunta de carácter general al pueblo sobre un asunto de trascendencia departamental, distrital o municipal. La decisión popular tomada en las urnas es de obligatorio cumplimiento formal para los gobernantes cuando se alcanza el umbral legal.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. SESIÓN 1 · GENÉRICAS ADICIONALES (Inglés B1-B2)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-in-02",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    methodTip:
      "Reading Strategy for English Passages:\n1. Look for textual synonyms: 'analyzing 100% of transaction data' matches 'analyzing the complete set of transactions'.\n2. Match causes and outcomes: 'detect anomalies immediately' matches 'immediate real-time detection'.\n3. Discard extreme or unrelated options.",
    distractorAnalysis:
      "Common Distractors in English Reading:\n- Option A: Absurd exaggeration ('fire all internal audit personnel').\n- Option C: Extrapolates into tax laws that are never mentioned in the text.\n- Option D: Claims it restricts testing to small periodic samples, which is the exact opposite of what the reading argues.",
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
      "The text highlights that continuous auditing replaces retrospective sampling with predictive analytics, allowing organizations to analyze '100% of transaction data in real time' to identify anomalies immediately rather than months later after losses have happened. Option B summarizes both core attributes accurately.",
  },
  {
    id: "sp-in-03",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    methodTip:
      "Atajo Gramatical para Conectores de Contraste en Inglés:\nMira qué viene inmediatamente después del espacio en blanco:\n- Si hay solo un sustantivo o frase nominal sin verbo conjugado -> Elige DESPITE o IN SPITE OF.\n- Si hay una oración con sujeto + verbo conjugado -> Elige ALTHOUGH o EVEN THOUGH.",
    distractorAnalysis:
      "Trampas Gramaticales del ICFES:\n- Opción B (Although): Es la trampa típica; exige verbo conjugado (ej: «Although the central bank raised rates...»).\n- Opción C (Whereas): Conjunción comparativa que requiere oración con sujeto y verbo.\n- Opción D (Because): Denota causa o justificación, lo cual es contrario al sentido de resiliencia del consumo frente a tasas altas.",
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
      "Regla gramatical en inglés: 'Despite' y 'In spite of' son preposiciones que expresan concesión y contraste, y van seguidas obligatoriamente de una frase nominal (noun phrase), un pronombre o un gerundio: «Despite strict monetary tightening and elevated central bank interest rates [frase nominal]...». En cambio, conectores como 'Although', 'Even though' y 'Whereas' son conjunciones subordinadas y requieren una oración completa con sujeto y verbo conjugado.",
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
    methodTip:
      "Técnica para el WACC en el ICFES:\n1. Aplica el factor (1 - T) únicamente al costo de la deuda financiera (Kd), porque solo los intereses financieros generan deducción fiscal.\n2. El patrimonio propio (Ke) nunca se multiplica por (1 - T), porque los dividendos no constituyen gasto deducible para la empresa.\n3. Suma ambos aportes ponderados.",
    distractorAnalysis:
      "Trampas del ICFES en Costo de Capital:\n- Opción A (15.00%): Es el distractor más habitual: sumar linealmente sin aplicar el escudo fiscal a la deuda: (40% × 12%) + (60% × 18%) = 4.8% + 10.8% = 15.6% o sacar el promedio simple (12+18)/2 = 15.0%.\n- Opciones C y D: Aplican el escudo fiscal de forma errática sobre el costo del patrimonio de los accionistas.",
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
      "Fórmula del WACC: WACC = [Wd × Kd × (1 - T)] + [We × Ke].\n1. Costo de la deuda tras el escudo fiscal (35% de tasa impositiva deducible):\nKd_neto = 12% × (1 - 0.35) = 12% × 0.65 = 7.80% E.A.\n2. Ponderación de la deuda en la estructura (40%):\n40% × 7.80% = 3.12%.\n3. Ponderación del patrimonio propio (60% al 18% Ke):\n60% × 18% = 10.80%.\n4. WACC consolidado = 3.12% + 10.80% = 13.92% E.A.",
  },
  {
    id: "sp-cp-gf-04",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Técnica para el Ciclo de Conversión de Efectivo:\n- Ciclo Operativo = Inventario + Cartera.\n- Ciclo de Efectivo = Ciclo Operativo - Proveedores.\nInterpretación rápida: Cobras en 90 días y pagas a proveedores a los 60 días; la brecha de 30 días es el CCE que debes cubrir con tu capital de trabajo.",
    distractorAnalysis:
      "Trampas del ICFES en Capital de Trabajo:\n- Opción B: Suma los tres términos (50 + 40 + 60 = 150), lo cual es erróneo porque los proveedores financian y por tanto restan días al ciclo de caja.\n- Opción C: Resta arbitrariamente inventarios de cartera sin aplicar la fórmula estándar.\n- Opción D: Invierte la denominación de los dos indicadores.",
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
      "Fórmulas de Gestión de Capital de Trabajo:\n1. Ciclo Operativo = Días de Inventario + Días de Cartera = 50 + 40 = 90 días. Corresponde al tiempo transcurrido desde que entra la mercancía hasta que se recibe el efectivo de los clientes.\n2. Ciclo de Conversión de Efectivo (CCE) = Ciclo Operativo - Días de Proveedores = 90 - 60 = 30 días. Indica que los proveedores financian 60 días de la operación, debiendo la empresa fondear con recursos bancarios o caja propia los 30 días restantes.",
  },
  {
    id: "sp-cp-gf-05",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Técnica para Punto de Equilibrio sin Fallar:\n1. Calcula el margen unitario restando: Precio - Costo Variable ($50k - $30k = $20k).\n2. Divide el costo fijo total entre el margen unitario ($40M / $20k = 2.000 unidades).\nComprobación en el examen: 2.000 unidades × $20.000 de margen cubren exactamente los $40.000.000 de costos fijos.",
    distractorAnalysis:
      "Trampas del ICFES en Punto de Equilibrio:\n- Opción A (800 unidades): Divide el costo fijo entre el precio total ($40M / $50k = 800), ignorando que cada unidad vendida consume $30k de costos variables.\n- Opción B (1.333 unidades): Divide el costo fijo entre el costo variable ($40M / $30k = 1.333).\n- Opción D: Introduce cifras inventadas para tentar al descarte por azar.",
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
      "Fórmula de Punto de Equilibrio en Unidades:\nQ_eq = Costos Fijos Totales / Margen de Contribución Unitario.\n1. Margen de Contribución Unitario = Precio de Venta - Costo Variable Unitario = $50.000 - $30.000 = $20.000 COP por unidad.\n2. Q_eq = $40.000.000 / $20.000 = 2.000 unidades mensuales.\nVender 2.000 unidades genera ingresos de $100M y costos totales de $100M ($40M fijos + $60M variables), dejando una UAII exactamente igual a cero.",
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
    methodTip:
      "Técnica para la NIA 701 en el Examen:\n- Si el asunto fue muy complejo y demandó atención prioritaria, pero se obtuvo evidencia suficiente y está bien revelado en notas -> CUESTIÓN CLAVE DE AUDITORÍA (KAM).\n- Si hubiera un error material no corregido -> Opinión con Salvedades.\n- Si faltara evidencia determinante -> Limitación en el alcance.",
    distractorAnalysis:
      "Trampas del ICFES en Auditoría NIA 701:\n- Opción A: Es erróneo emitir salvedad porque no hay ningún error contable; la provisión está adecuadamente respaldada y revelada.\n- Opción C: Es ilegal ocultar un asunto clave en memorandos internos cuando la norma exige su publicación obligatoria en el dictamen.\n- Opción D: No procede abstención de opinión porque el auditor sí obtuvo evidencia suficiente y adecuada.",
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
      "La NIA 701 dispone que en entidades cotizadas (y aquellas exigidas por regulación), el auditor debe incluir la sección de «Cuestiones Clave de la Auditoría» (KAM - Key Audit Matters). Las KAM son asuntos que, según el juicio profesional del auditor, han sido de la mayor significatividad en la auditoría del periodo (como estimaciones complejas de provisiones ambientales). Las KAM NO constituyen una salvedad ni una opinión modificada, sino una mayor transparencia para el mercado.",
  },
  {
    id: "sp-cp-as-04",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Técnica para Régimen de Inhabilidades del Contador (Ley 43/90):\n- Inhabilidad por asesoría previa: Mínimo 6 meses de abstención antes de aceptar revisoría fiscal en la misma empresa.\n- Inhabilidad por parentesco: Hasta 4° grado de consanguinidad, 1° de afinidad o 1° civil con administradores o directivos.\n- Si el contador fue asesor en el ejercicio inmediato anterior, NUNCA puede ser revisor fiscal del mismo periodo.",
    distractorAnalysis:
      "Trampas del ICFES en Ética e Inhabilidades del Contador:\n- Opción A: La renuncia a honorarios no subsana una inhabilidad legal expresa ni elimina la pérdida de independencia.\n- Opción C: La autorización unánime de los accionistas no puede derogar una ley imperativa de orden público como la Ley 43 de 1990.\n- Opción D: Contratar a un auxiliar para firmar constituye complicidad en ejercicio ilegal de la profesión.",
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
      "El Artículo 51 de la Ley 43 de 1990 establece una inhabilidad estricta: el Contador Público que haya actuado como empleado o asesor contable/tributario de una sociedad no puede aceptar cargos que exijan fe pública e independencia (como Revisor Fiscal) en esa misma entidad antes de transcurrir al menos seis (6) meses desde el cese de sus funciones. Además, auditaría su propia contabilidad previa, configurando una grave amenaza de autorrevisión insalvable.",
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
    methodTip:
      "Técnica para NIIF 15 en el Examen:\n1. Pregúntate: ¿El servicio se entrega en un momento determinado o a lo largo del tiempo? Licencias SaaS y soporte continuo son siempre A LO LARGO DEL TIEMPO.\n2. El dinero cobrado por anticipado NUNCA es ingreso inmediato: entra al banco contra un Pasivo Contractual (Ingreso Diferido) y se amortiza mes a mes.",
    distractorAnalysis:
      "Trampas del ICFES en Normas NIIF:\n- Opción A: Es la trampa del criterio de caja: creer que porque el dinero entró al banco ya es ingreso. Viola el principio fundamental de devengo contable.\n- Opción C: Postergar todo el ingreso hasta el año 2 ignora que en el año 1 el cliente ya recibió y consumió 12 meses de servicio.\n- Opción D: Confunde pasivos contractuales con aportes patrimoniales de socios.",
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
      "Bajo la NIIF 15 (Modelo de los 5 Pasos), cuando la obligación de desempeño se satisface a lo largo del tiempo (over time) —como sucede en contratos de software en la nube y soporte continuo de 24 meses—, el ingreso se reconoce proporcionalmente al servicio prestado ($48M / 24 meses = $2.000.000/mes). Al final del año 1 se habrán reconocido $24.000.000 como ingreso y los restantes $24.000.000 permanecen en el pasivo como Pasivo Contractual (Ingreso Diferido).",
  },
  {
    id: "sp-cp-ct-02",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Regla Mnemotécnica Infalible para la NIC 12 en el Examen:\nPara ACTIVOS:\n- Base Fiscal > Valor en Libros -> ACTIVO por Impuesto Diferido (Diferencia Temporaria Deducible).\n- Base Fiscal < Valor en Libros -> PASIVO por Impuesto Diferido (Diferencia Temporaria Imponible).\nPara PASIVOS: La regla se invierte exactamente.",
    distractorAnalysis:
      "Trampas del ICFES en Impuesto Diferido:\n- Opción B: Confunde activo diferido con pasivo diferido, un error frecuente cuando se invierte la resta entre valor contable y base fiscal.\n- Opción C: Afirma que es una diferencia permanente, cuando las diferencias de depreciación en el tiempo son el ejemplo clásico de diferencias temporarias reversibles.\n- Opción D: Desconoce que el gasto sí será deducible en los años fiscales siguientes.",
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
      "Regla rectora de la NIC 12 (Impuesto a las Ganancias):\nCuando la Base Fiscal del activo ($90.000.000) es MAYOR que el Valor en Libros contable ($80.000.000), se origina una Diferencia Temporaria Deducible ($10.000.000). Esto significa que en el futuro la empresa podrá deducir fiscalmente ese mayor valor, pagando menos impuesto de renta. Por tanto: Activo por Impuesto Diferido = $10.000.000 × 35% = $3.500.000 COP.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 17. SESIÓN 1 · GENÉRICAS ADICIONALES · LECTURA CRÍTICA (Nivel 4 Avanzado)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-lc-05",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    distractorAnalysis:
      "Trampas del ICFES en Lectura Crítica:\n- Opción B: Insulta la capacidad de los usuarios, algo que el autor jamás afirma (la culpa se atribuye al diseño algorítmico, no a la estupidez del usuario).\n- Opción C: Idealiza el debate presencial con la palabra absolutista 'siempre'.\n- Opción D: Propone la censura estatal total de redes, una conclusión autoritaria que no se deriva del texto.",
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
      "El autor argumenta que el modelo de negocio algorítmico de las redes sociales, diseñado para retener la atención del usuario, explota deliberadamente el sesgo de confirmación para confinarlo en cámaras de eco que fracturan la deliberación pública. La opción A sintetiza esta relación de causa-efecto de manera objetiva y fiel a la argumentación del fragmento.",
    methodTip:
      "Técnica para Preguntas de Consecuencias e Implicaciones Argumentativas:\n1. Traza la cadena causal del texto: Modelo de negocio de retención -> diseño algorítmico -> sesgo de confirmación -> cámaras de eco y polarización.\n2. Elige la opción que recoja esa cadena sin caer en exageraciones viscerales.\n3. Descarta opciones que contengan generalizaciones absolutas ('todos los usuarios carecen de criterio', 'siempre fue inmune').",
  },
  {
    id: "sp-lc-06",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    distractorAnalysis:
      "Trampas del ICFES en Identificación de Falacias:\n- Opción B (Ad verecundiam): Exigiría citar a un experto o autoridad como prueba incuestionable, lo cual no ocurre aquí.\n- Opción C (Ad baculum): Apela a la amenaza física o coacción directa, no a pronósticos económicos sombríos.\n- Opción D (Generalización apresurada): Involucra extrapolar a partir de una muestra estadística reducida, no una cadena de eventos catastróficos.",
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
      "La falacia de la «pendiente resbaladiza» (slippery slope) consiste en sostener que un paso inicial moderado o debatible (aumentar el salario por encima de la inflación) desencadenará inexorablemente una serie sucesiva de calamidades apocalípticas (quiebra masiva de empresas -> desempleo al 30% -> colapso de la economía nacional), sin aportar ninguna prueba empírica del encadenamiento causal forzoso entre cada evento.",
    methodTip:
      "Cómo Detectar la Pendiente Resbaladiza en el Examen:\nBusca argumentos con el patrón dramático: «Si permitimos A, irremediablemente pasará B, luego C y ocurrirá la destrucción total Z».\nSi no se demuestran los vínculos causales intermedios con evidencia rigurosa, se trata de una Pendiente Resbaladiza.",
  },
  {
    id: "sp-lc-07",
    session: "generica",
    areaId: "lectura-critica",
    areaLabel: "Lectura Crítica",
    methodTip:
      "Técnica para Textos Filosóficos y Éticos en el ICFES:\n- Si el texto cita a Kant y menciona 'usar a la persona como un medio' -> La falta ética es INSTRUMENTALIZAR o violar la dignidad y autonomía de la persona.\n- Si el texto hablara de Bentham o Stuart Mill (Utilitarismo) -> La regla sería el cálculo de placer, utilidad o mayor bienestar para el mayor número.",
    distractorAnalysis:
      "Trampas del ICFES en Filosofía Moral:\n- Opción A: Es la definición de la ética utilitarista (cálculo de placer neto), doctrina contra la cual Kant argumenta diametralmente.\n- Opción C: Confunde una falta moral de la ética del deber con una infracción reglamentaria comercial.\n- Opción D: Desvía el foco hacia temas bancarios de garantías hipotecarias.",
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
      "La segunda formulación del Imperativo Categórico de Immanuel Kant prescribe obrar de tal modo que se trate a la humanidad siempre como un fin en sí misma y nunca meramente como un medio. Formular una promesa de pago mentirosa instrumentaliza la buena fe y la dignidad del prójimo, degradándolo a una simple herramienta subordinada al beneficio egoísta del deudor.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 18. SESIÓN 1 · GENÉRICAS ADICIONALES · RAZONAMIENTO CUANTITATIVO
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-rc-05",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    distractorAnalysis:
      "Trampas del ICFES en Finanzas Cuantitativas:\n- Opción A: Es la trampa clásica de multiplicar 2% × 12 = 24% ignorando la capitalización compuesta.\n- Opción C: Afirma que las cuotas no amortizan, dato inventado que no guarda relación con el costo porcentual de la tasa.\n- Opción D: Agrega comisiones fantasmas no mencionadas en el enunciado.",
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
      "Cálculo de Tasa Efectiva Anual (E.A.):\nEl Banco B ofrece una tasa del 2% mes vencido capitalizable. Por interés compuesto, la tasa efectiva anual equivalente es: (1 + 0.02)^12 - 1 = (1.26824) - 1 = 26.824% E.A.\nAl comparar el 24.00% E.A. del Banco A frente al 26.824% E.A. del Banco B, se concluye con total certeza matemática que la oferta del Banco A es más económica en casi 2.82 puntos porcentuales anuales.",
    methodTip:
      "Técnica para Tasas de Interés en el Examen:\nNunca multipliques linealmente tasas mensuales cuando haya capitalización periódica:\n- 2% mensual por 12 meses NO es 24%: es (1.02)^12 - 1 ≈ 26.82% E.A. debido al interés de los intereses.\n- Por tanto, una tasa del 24% E.A. siempre será más barata que un 2% mes vencido capitalizable.",
  },
  {
    id: "sp-rc-06",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    distractorAnalysis:
      "Trampas del ICFES en Estadística Gráfica:\n- Opción B: Afirma que una oficina atendió el doble de ciudadanos, un error típico ya que el gráfico de caja no revela el tamaño absoluto de la muestra n.\n- Opción C: Confunde la mediana con la media aritmética; en distribuciones asimétricas la media difiere de la mediana.\n- Opción D: Dice que ninguna petición tardó menos de 20 min en Norte, olvidando que el mínimo fue de 10 min.",
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
      "Por definición estadística rigurosa, en un Diagrama de Caja y Bigotes (Boxplot), la Mediana (Q2) divide las observaciones ordenadas exactamente en dos mitades (50% de los datos se ubican por debajo y 50% por encima). Como la mediana de la Oficina Centro es 18 minutos y la de la Oficina Norte es 28 minutos, es indiscutiblemente cierto que al menos el 50% de los casos en Centro demoran 18 minutos o menos, y en Norte el 50% tarda 28 minutos o menos.",
    methodTip:
      "Parámetros Clave del Diagrama de Caja y Bigotes (Boxplot):\n- Mínimo: Inicio del bigote inferior.\n- Q1 (Primer cuartil): Percentil 25 (el 25% de los datos es menor o igual a Q1).\n- Mediana (Q2 / Línea interior): Percentil 50 (la mitad exacta de los datos está por debajo).\n- Q3 (Tercer cuartil): Percentil 75.\n- Máximo: Fin del bigote superior.\nRecuerda: El boxplot muestra dispersión porcentual, NO cuántas personas se evaluaron (la muestra total n es desconocida).",
  },
  {
    id: "sp-rc-07",
    session: "generica",
    areaId: "razonamiento-cuantitativo",
    areaLabel: "Razonamiento Cuantitativo",
    methodTip:
      "Técnica para Sistemas de Inecuaciones y Restricciones en el Examen:\nPrueba de inmediato las opciones dadas contra las restricciones más fáciles primero:\n1. Revisa la cota inferior sanitaria (A ≥ 100): descarta la Opción C de inmediato porque A=50.\n2. Revisa el espacio en bodega (A + B ≤ 350): descarta la Opción D porque 250+150=400 > 350.\n3. Evalúa el costo de las restantes: la Opción A da $12.5 millones (supera presupuesto), dejando como única opción factible la B.",
    distractorAnalysis:
      "Trampas del ICFES en Modelación Matemática:\n- Opción A: Excede el presupuesto disponible: (150 × 30k) + (200 × 40k) = $4.5M + $8.0M = $12.5M > $12.0M.\n- Opción C: Incumple la exigencia sanitaria mínima (compra solo 50 frascos de A cuando se exigían al menos 100).\n- Opción D: Supera la capacidad de almacenamiento (400 unidades > 350 unidades permitidas).",
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
      "Comprobación de restricciones simultáneas para la Opción B (200 frascos de A y 150 frascos de B):\n1. Restricción de bodega: A + B ≤ 350 -> 200 + 150 = 350 unidades (cumple exactamente el límite).\n2. Restricción sanitaria: A ≥ 100 -> 200 ≥ 100 (cumple holgadamente).\n3. Restricción presupuestal: ($30.000 × 200) + ($40.000 × 150) = $6.000.000 + $6.000.000 = $12.000.000 COP (cumple exactamente el presupuesto de $12 millones).",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 19. SESIÓN 1 · GENÉRICAS ADICIONALES · COMPETENCIAS CIUDADANAS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-cc-05",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    distractorAnalysis:
      "Trampas del ICFES en Acciones Constitucionales:\n- Opción B: La tutela no es el mecanismo colectivo ordinario para descontaminar ríos, ni una denuncia penal indemniza automáticamente a los 40 campesinos.\n- Opción C: La acción de cumplimiento exige leyes o decretos desobedecidos, y el plebiscito es un mecanismo de participación electoral.\n- Opción D: La acción de repetición la interpone el Estado contra funcionarios culpables de dolo, no los particulares.",
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
      "El ordenamiento constitucional colombiano distingue con claridad:\n1. La Acción Popular (Art. 88 C.P. y Ley 472/1998) protege derechos e intereses colectivos (como el medio ambiente sano) y tiene carácter preventivo y restitutorio para frenar la contaminación del río.\n2. La Acción de Grupo (Ley 472/1998) procede para reclamar la indemnización de perjuicios individuales causados a un grupo de mínimo 20 personas que comparten una causa común de daño (los 40 piscicultores).",
    methodTip:
      "Diferenciador Clave de Acciones Constitucionales:\n- Acción Popular: Protege a la comunidad entera en derechos colectivos (ambiente, espacio público, moralidad). NO busca indemnización de dinero.\n- Acción de Grupo: Exige al menos 20 personas afectadas por el mismo hecho y su fin EXCLUSIVO es el pago de una indemnización económica.\n- Acción de Tutela: Protege derechos fundamentales individuales (vida, salud, debido proceso).",
  },
  {
    id: "sp-cc-06",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    methodTip:
      "Regla de Caducidad del Reporte Negativo en Centrales de Riesgo:\n- Si la mora fue inferior a 2 años y se paga la deuda -> El reporte dura el DOBLE del tiempo que duró la mora (ej: 8 meses de mora = 16 meses de reporte desde el pago).\n- Si la mora fue de más de 2 años y se paga -> El reporte dura un MÁXIMO de 4 años.\n- Los reportes negativos NUNCA son imprescriptibles ni vitalicios en Colombia.",
    distractorAnalysis:
      "Trampas del ICFES en Habeas Data:\n- Opción B: Afirma que los reportes son imprescriptibles y de por vida, lo que viola la prohibición constitucional de penas perpetuas.\n- Opción C: Condiciona el derecho fundamental a una tarifa económica, lo cual es inconstitucional.\n- Opción D: Desconoce que las centrales de riesgo privadas sí son legales siempre que respeten la Ley Estatutaria de Habeas Data.",
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
      "La Ley Estatutaria 1266 de 2008 y la Ley 2157 de 2021 (Borrón y Cuenta Nueva), en armonía con la jurisprudencia de la Corte Constitucional (Sentencia C-282/21), establecen que el término de caducidad del dato negativo cuando se extingue la obligación en mora es del doble del tiempo de la mora, sin exceder en ningún caso de cuatro (4) años. Como la mora fue de 8 meses, el castigo máximo legal era de 16 meses tras el pago; habiendo transcurrido más de 24 meses, el reporte negativo es flagrantemente ilegal y vulnera el Habeas Data.",
  },
  {
    id: "sp-cc-07",
    session: "generica",
    areaId: "competencias-ciudadanas",
    areaLabel: "Competencias Ciudadanas",
    methodTip:
      "Técnica para Test de Proporcionalidad y Ponderación de Derechos:\n1. Recuerda: NINGÚN DERECHO FUNDAMENTAL ES ABSOLUTO (ni siquiera el libre culto o la libre locomoción).\n2. Para que una restricción gubernamental sea válida debe ser: Transitoria, Proporcionada, Idónea y orientada a proteger un bien jurídico superior y apremiante (como la vida o la salud de la comunidad).",
    distractorAnalysis:
      "Trampas del ICFES en Filosofía Constitucional:\n- Opción B: Afirma que Colombia es un Estado confesional, lo cual es falso: desde la Constitución de 1991 Colombia es un Estado laico y pluralista.\n- Opción C: Inventa un impuesto al culto religioso inexistente.\n- Opción D: Afirma que el Presidente puede suspender derechos de forma permanente, desconociendo los límites tajantes del Art. 214 de la Constitución.",
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
      "En el marco del Estado Social de Derecho, ningún derecho fundamental es absoluto. Cuando colisionan la libertad de cultos (derecho de primera generación) y los derechos a la vida y la salud pública de toda la población en un contexto de saturación hospitalaria crítica, el juicio de ponderación y el test de proporcionalidad avalan medidas transitorias, idóneas y necesarias para mitigar la mortalidad masiva, protegiendo el bien jurídico supremo de la vida.",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 20. SESIÓN 1 · GENÉRICAS ADICIONALES · INGLÉS (CEFR B1-B2)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "sp-in-04",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    methodTip:
      "Reading Strategy for Legal/Tech English Passages:\n1. Look for contrasting discourse markers like 'Nevertheless', 'However', or 'Caution'.\n2. The clause following the contrast word always delivers the core caveat or qualifying argument: «Nevertheless, legal scholars caution that algorithm transparency and human oversight remain essential...».\n3. Discard extreme overstatements.",
    distractorAnalysis:
      "Reading Distractors Analysis in English:\n- Option A: Extremist distractor proposing that computers should be banned from finances.\n- Option C: Extrapolates into an irrelevant discussion about returning to paper receipts.\n- Option D: Claims AI made human tax auditors obsolete, which directly contradicts the author's plea for human oversight.",
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
      "The passage argues that while predictive machine learning models are powerful tools against tax evasion, legal experts emphasize that algorithmic transparency and human oversight are non-negotiable to safeguard taxpayers' constitutional right to due process. Option B reproduces this exact conclusion without distortions.",
  },
  {
    id: "sp-in-05",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    methodTip:
      "Third Conditional Formula for the Exam:\nIf clause: HAD + Past Participle (had addressed).\nResult clause: WOULD HAVE + Past Participle (would have avoided).\nIf you see 'would have + participle' in the main sentence, the 'If' blank MUST take HAD + Participle.",
    distractorAnalysis:
      "Grammar Distractors in English:\n- Option B (addresses): Corresponds to First Conditional (present fact/real possibility).\n- Option C (has addressed): Present Perfect cannot follow the hypothetical past conditional structure.\n- Option D (will address): Future tense, entirely incompatible with a retrospective unreal condition.",
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
      "Grammar Rule for the Third Conditional (Past Unreal Conditional):\nUsed to speak about hypothetical past conditions and their unreal past consequences.\nStructure:\nIf + Subject + Past Perfect ('had addressed'), ... Subject + would have + Past Participle ('would have avoided').\nOnly 'had addressed' satisfies the required Past Perfect structure.",
  },
  {
    id: "sp-in-06",
    session: "generica",
    areaId: "ingles",
    areaLabel: "Inglés",
    methodTip:
      "Connectors Classification for ICFES English:\n- Result / Effect: Consequently, Therefore, As a result, Thus.\n- Contrast / Concession: Nevertheless, However, On the other hand, In spite of.\n- Comparison: Whereas, While.\n- Cause: Because, Since, Due to.",
    distractorAnalysis:
      "ICFES Vocabulary Distractors:\n- Option B (Nevertheless): Denotes unexpected contrast or concession, but a factory slowdown is the expected logical result of having no raw materials.\n- Option C (Whereas): Used to compare two contrasting facts in complex clauses.\n- Option D (On the contrary): Used to deny a previous negative claim, which does not apply here.",
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
      "Discourse Connectors Analysis:\n'Consequently' is an adverb of result/consequence (synonymous with therefore, as a result, or thus), perfectly connecting the disruption in raw material supply with its direct economic effect: the 15% drop in manufacturing output.",
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
    distractorAnalysis:
      "Trampas del ICFES en DuPont:\n- Opción A (12.0%): Se detiene en el ROA (8% × 1.5) olvidando multiplicar por el apalancamiento financiero de 2.0.\n- Opción C (16.0%): Multiplica arbitrariamente 8% × 2.0 omitiendo la rotación de activos.\n- Opción D: Cifra inventada cercana al promedio para despistar.",
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
      "Fórmula del Modelo DuPont en 3 Etapas:\nROE = Margen Neto de Utilidad × Rotación de Activos × Multiplicador de Apalancamiento Financiero.\nROE = (Utilidad Neta / Ventas) × (Ventas / Activo Total) × (Activo Total / Patrimonio).\nROE = 8% × 1.5 × 2.0 = 12% × 2.0 = 24.0%.\nEsto demuestra que el 24% de retorno sobre el patrimonio de los socios proviene de un 8% de margen comercial, 1.5 rotaciones de activos y un apalancamiento de 2.0 veces.",
    methodTip:
      "Técnica para el Modelo DuPont en Finanzas:\n1. Multiplica los tres factores dados: Margen × Rotación × Apalancamiento.\n2. 8% × 1.5 = 12% (este paso intermedio es el ROA o Rentabilidad del Activo).\n3. 12% (ROA) × 2.0 (Apalancamiento) = 24.0% (ROE).\nEsta descomposición permite saber si la rentabilidad surge de la eficiencia operativa, del volumen de ventas o de la deuda.",
  },
  {
    id: "sp-cp-gf-07",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Técnica para el Flujo de Caja Libre (FCL):\n1. Empieza con la UODI (Utilidad Operativa después de Impuestos).\n2. SUMA las partidas virtuales que no demandaron salida de efectivo (+ Depreciaciones y amortizaciones).\n3. RESTA las reinversiones necesarias para operar (- CAPEX en activos fijos y - Aumento de KTNO en inventarios/cartera).\nEl resultado es el dinero líquido sobrante de la operación.",
    distractorAnalysis:
      "Trampas del ICFES en Flujo de Caja:\n- Opción B ($150M): Asume que la UODI equivale al flujo de caja, ignorando el CAPEX y la variación de capital de trabajo.\n- Opción C ($270M): Suma todas las partidas sin discriminar entradas de salidas de fondos.\n- Opción D ($70M): Resta dos veces las depreciaciones o calcula erróneamente los signos.",
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
      "Fórmula de Flujo de Caja Libre de la Firma (FCFF):\nFCL = UODI + Depreciaciones y Amortizaciones - Inversión en Activos Fijos (CAPEX) - Aumento del Capital de Trabajo Neto Operativo (ΔKTNO).\nFCL = $150.000.000 + $40.000.000 - $60.000.000 - $20.000.000 = $190.000.000 - $80.000.000 = $110.000.000 COP.\nEste valor representa el efectivo verdaderamente disponible para servir la deuda bancaria (capital e intereses) y repartir dividendos a los socios sin descapitalizar la empresa.",
  },
  {
    id: "sp-cp-gf-08",
    session: "especifica",
    areaId: "gestion-financiera",
    areaLabel: "Gestión Financiera",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Técnica para el EVA (Economic Value Added):\n1. Halla el cargo por capital: Multiplica los Activos Netos de Operación por la tasa WACC ($800M × 12% = $96M).\n2. Réstalo de la UODI: $140M - $96M = +$44M.\nRegla de decisión:\n- EVA > 0: La empresa GENERA valor económico para sus accionistas.\n- EVA < 0: La empresa DESTRUYE valor (aunque tenga utilidad contable positiva).",
    distractorAnalysis:
      "Trampas del ICFES en EVA:\n- Opción A: Acierta en el cálculo numérico (+44M) pero formula una conclusión conceptualmente falsa al decir que 'destruyó valor'.\n- Opción C: Confunde el EVA con una pérdida neta contable.\n- Opción D: Toma la UODI sin descontar el costo de oportunidad del capital aportado.",
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
      "Cálculo del Valor Económico Agregado (EVA):\nFórmula: EVA = UODI - (Capital Invertido × Costo de Capital WACC).\n1. Costo del Capital Invertido en pesos = $800.000.000 × 12% = $96.000.000 COP.\n2. EVA = $140.000.000 - $96.000.000 = +$44.000.000 COP.\nUn EVA positivo (+44M) confirma que la gestión empresarial no solo cubrió todos sus costos de operación y amortizaciones, sino que superó la rentabilidad mínima exigida por accionistas y acreedores financieros, creando una verdadera riqueza económica.",
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
    methodTip:
      "Los Tres Vértices del Triángulo del Fraude (NIA 240):\n- Incentivo / Presión: Bonos atados a metas inalcanzables, deudas personales, presión de la junta.\n- Oportunidad: Ausencia de controles, falta de segregación de funciones, claves maestras unilaterales en el sistema.\n- Racionalización: Justificación moral interna del defraudador («la empresa me paga poco, solo estoy tomando un préstamo temporal»).",
    distractorAnalysis:
      "Trampas del ICFES en Auditoría de Fraude:\n- Opción B: Menciona colusión con auditores estatales, una conjetura que jamás fue expuesta en el caso.\n- Opción C: Habla de errores involuntarios de redondeo, cuando las metas agresivas y permisos unilaterales son banderas rojas (Red Flags) de fraude intencional deliberado.\n- Opción D: Atribuye el riesgo a caso fortuito por inflación, excusa absurda en auditoría forense.",
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
      "Bajo la NIA 240 (Responsabilidades del Auditor en Relación con el Fraude), el 'Triángulo del Fraude' de Donald Cressey está compuesto por tres factores de riesgo: 1) Incentivo / Presión, 2) Oportunidad, y 3) Actitud / Racionalización. En el caso expuesto, la remuneración variable atada a metas agresivas de EBITDA genera un evidente Incentivo/Presión financiera, mientras que el poder unilateral para anular controles en el software ERP proporciona la Oportunidad técnica indispensable para cometer la incorrección sin ser detectado.",
  },
  {
    id: "sp-cp-as-06",
    session: "especifica",
    areaId: "aseguramiento-informacion",
    areaLabel: "Aseguramiento y Control de la Información",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Técnica para Negativas de la Gerencia a Circularizar (NIA 505):\n1. El auditor NUNCA acata ciegamente la orden de la administración.\n2. Primero debe indagar los motivos y verificar su razonabilidad.\n3. Buscar procedimientos de auditoría sustitutivos (ej. cobros posteriores en extractos bancarios).\n4. Si no es posible obtener evidencia adecuada de una partida material, emite Salvedad o Abstención de Opinión por limitación en el alcance.",
    distractorAnalysis:
      "Trampas del ICFES en Evidencia de Auditoría:\n- Opción A: Aceptar la imposición de la gerencia sin indagar vulnera el principio de escepticismo profesional y subordinaría al revisor fiscal al criterio del auditado.\n- Opción C: Llamar a escondidas desde un teléfono privado viola las normas profesionales y los protocolos de evidencia documentada en papeles de trabajo.\n- Opción D: Castigar al 100% la cartera sin pruebas técnicas previas constituiría un ajuste contable arbitrario infundado.",
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
      "De conformidad con los apartados 8 y 9 de la NIA 505 (Confirmaciones Externas): Si la administración se rehúsa a autorizar el envío de una confirmación a un tercero clave, el auditor debe indagar sobre las razones que sustentan dicha negativa y obtener evidencia sobre su validez. Si la negativa carece de justificación razonable y le impide aplicar procedimientos alternativos eficaces para obtener evidencia suficiente sobre el 35% de la cartera, el auditor se enfrenta a una limitación en el alcance que debe reflejarse en su dictamen mediante una opinión con salvedades o abstención de opinión.",
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
    methodTip:
      "Técnica para Deterioro de Inventarios (NIC 2):\n1. Halla el VNR: Resta del precio de venta todos los costos de flete, embalaje o comisiones necesarios para vender ($42k - $2k = $40k).\n2. Compara con el Costo: ¿VNR < Costo? Sí ($40k < $50k).\n3. La diferencia ($10.000 por unidad) es el deterioro que va directo a pérdidas en resultados.",
    distractorAnalysis:
      "Trampas del ICFES en NIC 2 Inventarios:\n- Opción B ($42.000): Olvida deducir los gastos de embalaje y flete del precio de venta ($42k en vez de $40k).\n- Opción C: Defiende el costo histórico rígido, doctrina superada por las normas NIIF que exigen reconocer pérdidas por desvalorización inmediatamente.\n- Opción D: Aumenta el valor del inventario sumando fletes futuros de venta, lo que inflaría indebidamente el activo.",
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
      "Fórmula de la NIC 2 (Inventarios):\nValor Neto Realizable (VNR) = Precio estimado de venta - Costos estimados para terminar y vender.\nVNR unitario = $42.000 - $2.000 = $40.000 COP por unidad.\nRegla de medición de la NIC 2: Los inventarios se miden al MENOR entre el Costo de adquisición ($50.000) y el VNR ($40.000).\nPérdida por deterioro unitaria = $50.000 - $40.000 = $10.000 COP.\nDeterioro total del periodo = 1.000 unidades × $10.000 = $10.000.000 COP, que debe reconocerse como gasto en resultados contra la cuenta de provisión/deterioro acumulado de inventarios.",
  },
  {
    id: "sp-cp-ct-04",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Regla Fundamental de NIIF 16 Arrendamientos:\n- Para el ARRENDATARIO no existen arrendamientos operativos (salvo excepciones menores de corto plazo <1 año o bajo valor <$5.000 USD).\n- Se contabiliza SIEMPRE en el Balance: Débito a Activo por Derecho de Uso y Crédito a Pasivo Financiero por Arrendamiento al VALOR PRESENTE de los cánones.",
    distractorAnalysis:
      "Trampas del ICFES en Arrendamientos NIIF 16:\n- Opción A: Es el tratamiento del antiguo arrendamiento operativo (gasto lineal fuera de balance), el cual quedó abolido con la entrada en vigencia de la NIIF 16.\n- Opción C: Registra el valor nominal acumulado ($300M) sin descontar a valor presente, violando el principio del valor del dinero en el tiempo.\n- Opción D: Registra el bien en copropiedad con el dueño, lo que es un disparate jurídico.",
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
      "Bajo el modelo único de arrendatario de la NIIF 16: Se eliminó la clasificación tradicional entre arrendamiento operativo y financiero para el arrendatario. En la fecha de inicio del contrato, todo arrendamiento que exceda de 12 meses debe reconocerse en el balance general registrando en el activo un 'Activo por Derecho de Uso' y en el pasivo un 'Pasivo por Arrendamiento' financiero, ambos medidos inicialmente al valor presente de los pagos futuros descontados con la tasa del contrato ($227.447.000 COP).",
  },
  {
    id: "sp-cp-ct-05",
    session: "especifica",
    areaId: "informacion-contable",
    areaLabel: "Información Contable y Tributaria",
    careerId: "contaduria",
    careerLabel: "Contaduría Pública",
    methodTip:
      "Técnica para Retenciones en la Fuente en Colombia:\n1. ReteRenta por honorarios a personas jurídicas: 11% sobre el subtotal antes de IVA.\n2. ReteIVA (Grandes Contribuyentes adquiriendo a régimen común): 15% sobre el valor del IVA facturado (NO sobre el valor del contrato).\nBase de cálculo de ReteIVA = $1.900.000 × 15% = $285.000 COP.",
    distractorAnalysis:
      "Trampas del ICFES en Derecho Tributario:\n- Opción B: Afirma que no hay retención entre personas jurídicas, desconociendo el mecanismo general de recaudo anticipado del Estado.\n- Opción C: Asume erróneamente que ser Gran Contribuyente exonera de retener impuestos nacionales.\n- Opción D: Retener el 100% del contrato confunde una retención fiscal con un embargo o confiscación total.",
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
      "Conforme al Estatuto Tributario colombiano:\n1. Retención en la fuente a título de renta por servicios calificados / honorarios prestados por una persona jurídica: Tarifa general del 11% sobre la base antes de IVA ($10.000.000 × 11% = $1.100.000 COP).\n2. Retención en la fuente de IVA (ReteIVA): El Artículo 437-2 numeral 1 designa a los Grandes Contribuyentes como agentes retenedores de IVA cuando adquieren bienes o servicios de contribuyentes comunes; la tarifa general de retención es del 15% sobre el IVA facturado ($1.900.000 × 15% = $285.000 COP).",
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
    methodTip:
      "Las 4 Perspectivas del Balanced Scorecard en el Examen:\n- Perspectiva Financiera: Utilidad neta, ROE, EBITDA, reducción de costos de deuda.\n- Perspectiva de Clientes: Satisfacción del cliente, cuota de mercado, retención.\n- Perspectiva de Procesos Internos: Calidad en manufactura, tiempos de entrega, adopción de Scrum, reducción de desperdicios.\n- Perspectiva de Aprendizaje y Crecimiento: Capacitación del personal, clima laboral, tecnología de la información.",
    distractorAnalysis:
      "Trampas del ICFES en Balanced Scorecard:\n- Opción A (Financiera): La reducción de tiempos puede abaratar costos, pero la actividad física en planta pertenece a los procesos internos.\n- Opción B (Clientes): Los clientes percibirán el beneficio indirectamente, pero Scrum y los tiempos de máquina son operaciones internas.\n- Opción D: Se inventa una perspectiva de responsabilidad fiscal pública que no existe en el modelo de Kaplan y Norton.",
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
      "El Cuadro de Mando Integral (Balanced Scorecard) de Kaplan y Norton estructura la gestión estratégica en cuatro perspectivas interconectadas: 1) Financiera, 2) Clientes, 3) Procesos Internos, y 4) Aprendizaje y Crecimiento. La reducción de tiempos de ciclo de fabricación y la implementación de marcos de trabajo ágiles (Scrum) en la línea de montaje impactan directamente la excelencia de la cadena operativa, perteneciendo indiscutiblemente a la 'Perspectiva de Procesos Internos de Negocio'.",
  },
  {
    id: "sp-der-02",
    session: "especifica",
    areaId: "argumentacion-juridica",
    areaLabel: "Investigación y Argumentación Jurídica",
    careerId: "derecho",
    careerLabel: "Derecho",
    methodTip:
      "Técnica para el Bloque de Constitucionalidad (Art. 93 C.P.):\n1. Todo tratado de Derechos Humanos ratificado por Colombia forma parte del BLOQUE DE CONSTITUCIONALIDAD.\n2. Tiene rango SUPRALEGAL (está por encima de leyes ordinarias, decretos o resoluciones).\n3. Si una ley del Congreso contradice el Pacto de San José o un convenio de DDHH, la ley es inconstitucional y debe inaplicarse o anularse.",
    distractorAnalysis:
      "Trampas del ICFES en Derecho Constitucional:\n- Opción B: Califica el tratado como una directriz optativa, violando el principio pacta sunt servanda y la obligatoriedad vinculante de los derechos humanos.\n- Opción C: Otorga rango inferior a los tratados frente a leyes ordinarias, doctrina contraria a la jurisprudencia constitucional colombiana.\n- Opción D: Exige intervención directa de la OEA, desconociendo que los jueces colombianos deben aplicar directamente el control de convencionalidad.",
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
      "Por expreso mandato del Artículo 93 de la Constitución Política de Colombia, los tratados y convenios internacionales sobre derechos humanos ratificados por el Congreso integran el Bloque de Constitucionalidad en sentido estricto. Esto les confiere jerarquía constitucional y prevalencia en el orden interno, sirviendo como parámetro obligatorio de control supralegal (control de constitucionalidad y de convencionalidad) frente al cual cualquier ley ordinaria contraria debe ser declarada inexequible.",
  },
  {
    id: "sp-ing-02",
    session: "especifica",
    areaId: "formulacion-proyectos",
    areaLabel: "Formulación de Proyectos",
    careerId: "ingenieria",
    careerLabel: "Ingeniería",
    methodTip:
      "Reglas de Oro de Valor Ganado (EVM) para el Examen:\n- SPI = EV / PV (Desempeño de Tiempo): Si SPI < 1.0 -> Proyecto RETRASADO. Si SPI > 1.0 -> Proyecto ADELANTADO.\n- CPI = EV / AC (Desempeño de Costo): Si CPI < 1.0 -> SOBRECOSTO (se gasta más de lo ganado). Si CPI > 1.0 -> AHORRO.\nMemoriza: EV siempre va en el numerador para ambos índices.",
    distractorAnalysis:
      "Trampas del ICFES en Gestión de Proyectos:\n- Opción B: Invierte los numeradores y denominadores (PV/EV y AC/EV) arrojando erróneamente valores mayores a 1.0.\n- Opción C: Asume equilibrio perfecto (1.00 y 1.00) ignorando que las cifras de PV, EV y AC difieren entre sí.\n- Opción D: Afirma que no puede evaluarse sin consultar un software específico, un distractor común en preguntas cuantitativas.",
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
      "Cálculos de Gestión del Valor Ganado (EVM):\n1. Índice de Desempeño del Cronograma: SPI = EV / PV = $400M / $500M = 0.80. Como SPI < 1.0, el proyecto avanza a un ritmo del 80% de lo programado (retraso en el cronograma).\n2. Índice de Desempeño del Costo: CPI = EV / AC = $400M / $480M = 0.833. Como CPI < 1.0, por cada peso gastado solo se han generado 83 centavos de avance físico real (sobrecosto presupuestal).\nDiagnóstico integral: Proyecto con retraso y sobrecosto simultáneos.",
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
