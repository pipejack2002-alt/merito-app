import { FICHA } from "./ficha";
import { MODULES } from "./modules";
import type { CargoFamily, CargoProfile, FunctionGuide } from "./types";
import { TOPICS } from "./topics";

const ALL_MODULE_IDS = MODULES.map((m) => m.id);

export const SHARED_MODULE_IDS = [
  "cpaca",
  "constitucion-funcion",
  "estructura-dian",
  "sistema-tributario",
  "mipg-archivo",
  "ofimatica-dian",
  "servicio-pqrsf",
  "razonamiento-matematico",
  "principios-contables-financieros",
  "comportamiento-etico",
  "comunicacion-equipo",
  "codigo-integridad",
  "valores-cinco",
] as const;

const CARTERA_MODULE_IDS = [
  "ficha-empleo",
  "cobro-persuasivo",
  "cobro-coactivo",
  "medidas-cautelares",
  "devoluciones-compensaciones",
  "recaudo-ear",
  "control-extensivo",
  "procesos-concursales",
  ...SHARED_MODULE_IDS,
] as const;

function guidesFromTopics(moduleIds: string[], roleNotes: Record<string, string>): FunctionGuide[] {
  return moduleIds
    .map((id) => TOPICS.find((t) => t.moduleId === id))
    .filter((t): t is (typeof TOPICS)[number] => Boolean(t))
    .map((t) => ({
      topicId: t.id,
      functionTitle: t.title,
      howToResolve: t.how,
      steps: t.steps,
      typicalFail: t.trap,
      correctMove: t.correctMove,
      source: t.source,
      relatedModuleIds: [t.moduleId],
      roleNote: roleNotes[t.moduleId],
    }));
}

const analistaCarteraNotes: Record<string, string> = {
  "ficha-empleo":
    "Eres Analista II, nivel técnico: ejecutas labores técnicas. No diseñas la política ni firmas como Gestor.",
  "cobro-persuasivo": "Tú clasificas, contactas y registras. No decretas cautelares ni ‘perdonas’.",
  "cobro-coactivo":
    "Verificas expediente y proyectas. El mandamiento lo libra quien tenga competencia; tú impulsas el trámite.",
  "medidas-cautelares":
    "Apoyas la investigación de bienes y el registro. No ‘negocias’ el alzamiento.",
  "devoluciones-compensaciones":
    "Apoyas el trámite y la cuenta corriente. No giras por fuera del procedimiento.",
  "recaudo-ear": "Concilias reportes y corriges recibos. Nunca recibes efectivo.",
  "control-extensivo": "Orientas frente al requerimiento de campaña. No adelantas el acto.",
  "procesos-concursales": "Detectas el concurso y reportas. No sigues el remate como si nada.",
  "razonamiento-matematico":
    "Cálculos exactos sin calculadora: sanciones, intereses moratorios, retenciones y lectura analítica de tablas de recaudo.",
  "principios-contables-financieros":
    "Confrontas el devengo contable con la regla fiscal, interpretas estados financieros y conciliaciones fiscales (772-1).",
  "estructura-dian":
    "Conoces las Direcciones de Gestión y Seccionales (D. 1742/2020 y D. 412/2024); identificas la autoridad competente para cada acto.",
  "ofimatica-dian":
    "Manejas Excel para cruces y tablas dinámicas de cartera, respetas plantillas oficiales y reservas del sistema Muisca.",
};

const analistaIiiNotes: Record<string, string> = {
  "ficha-empleo":
    "Eres Analista III, nivel técnico (Código 203, Grado 03): ejecutas labores técnicas de mayor complejidad, sustanciación de expedientes y análisis de cruces. No firmas como Gestor.",
  "cobro-persuasivo": "Clasificas y coordinas el contacto de lotes complejos. No decretas cautelares ni condonas.",
  "cobro-coactivo":
    "Sustancias el expediente coactivo de alta cuantía y proyectas mandamientos o resoluciones de excepciones para revisión del Gestor.",
  "medidas-cautelares":
    "Apoyas la investigación patrimonial avanzada de bienes y registras embargos. No levantas cautelares sin orden legal.",
  "devoluciones-compensaciones":
    "Depuras cuentas corrientes complejas y proyectas autos de verificación de saldos a favor.",
  "recaudo-ear": "Concilias inconsistencias complejas entre bancos recaudadores y sistemas institucionales.",
  "control-extensivo": "Ejecutas cruces de información exógena y perfilamiento de omisos e inexactos.",
  "procesos-concursales": "Analizas acreencias fiscales en procesos de reorganización e insolvencia.",
  "razonamiento-matematico":
    "Cálculo avanzado de intereses moratorios, liquidación de sanciones tributarias y prorrateo de pagos.",
  "principios-contables-financieros":
    "Confrontas normas contables (NIIF) con reglas fiscales y analizas estados financieros del deudor.",
  "estructura-dian":
    "Conoces la competencia de Direcciones Seccionales y Nivel Central (D. 1742/2020 y D. 412/2024).",
  "ofimatica-dian":
    "Manejas herramientas ofimáticas avanzadas para análisis de bases de datos y custodia de reservas.",
};

const gestorCarteraNotes: Record<string, string> = {
  "ficha-empleo":
    "Nivel profesional: priorizas, revisas calidad, proyectas o suscribes según competencia y respondes por términos.",
  "cobro-persuasivo":
    "Defines el lote y el momento de pasar a coactivo. El Analista ejecuta el contacto.",
  "cobro-coactivo":
    "Revisas título y competencia. Libras o elevas el mandamiento. Controlas prescripción.",
  "medidas-cautelares":
    "Decides, según competencia, el embargo preventivo simultáneo o previo al mandamiento. No en persuasivo.",
  "devoluciones-compensaciones":
    "Resuelves o proyectas el acto de devolución/rechazo/compensación. Primero depurar.",
  "recaudo-ear": "Exiges conciliación antes de firmar un cobro con pago alegado.",
  "control-extensivo":
    "Diriges la campaña y el criterio único de orientación. No asesorías privadas.",
  "procesos-concursales": "Reorientas el cobro y presentas la acreencia. No condonas.",
  "rol-gestor":
    "Asigna, revisa, deja instrucción escrita. No firmes sin competencia ni hagas el oficio del Analista para lucirte.",
};

const analistaFiscalNotes: Record<string, string> = {
  "ficha-empleo":
    "Analista II de fiscalización: armas el expediente, cruces y proyectos. No profieres la liquidación.",
  "fiscalizacion-determinacion":
    "Preparas hechos, pruebas y glosas del requerimiento. El Gestor decide el acto.",
  "control-extensivo": "Ejecutas cruces masivos y emplazamientos de campaña, con el mismo mensaje.",
  "inspeccion-visitas": "Si te asignan apoyo de visita, registras. No determinas en el predio.",
};

const gestorFiscalNotes: Record<string, string> = {
  "ficha-empleo":
    "Gestor de fiscalización: decides el programa del expediente y proyectas o suscribes el requerimiento y la liquidación según competencia.",
  "fiscalizacion-determinacion":
    "No saltes el requerimiento especial. Controla el término de respuesta (3 meses) y el de liquidar.",
  "control-extensivo": "El emplazamiento 705 no te ahorra el 703 cuando va revisión.",
  "rol-gestor": "Calidad del expediente antes del acto. El Analista arma; tú glosas y decides.",
};

const inspectorNotes: Record<string, string> = {
  "ficha-empleo": "Inspector: pruebas y hechos. No liquidas ni cobras en la visita.",
  "inspeccion-visitas":
    "Identifícate, respeta el objeto, acta los hechos, rechaza dádivas, traslada.",
  "fiscalizacion-determinacion": "Tu acta alimenta el requerimiento. No adelantes la liquidación.",
  "control-extensivo": "Si la visita nace de un programa masivo, no improvises un objeto distinto.",
};

export const DEFAULT_CARGO_ID = "analista-ii-cartera";

export const CATALOG: CargoProfile[] = [
  {
    id: DEFAULT_CARGO_ID,
    family: "analista",
    shortLabel: "Analista II",
    processLabel: "Cartera, recaudo y devoluciones",
    blurb:
      "Nivel técnico. Ejecutas clasificación de cartera, recaudo, devoluciones y cobro hasta el coactivo.",
    ficha: {
      opec: "236831",
      formato: FICHA.formato,
      denominacion: FICHA.denominacion,
      codigo: FICHA.codigo,
      grado: FICHA.grado,
      nivel: FICHA.nivel,
      tipoEmpleo: FICHA.tipoEmpleo,
      codigoFicha: FICHA.codigoFicha,
      proceso: FICHA.proceso,
      subproceso: FICHA.subproceso,
      aplicacion: FICHA.aplicacion,
      proposito: FICHA.proposito,
      funciones: [...FICHA.funciones],
      estudios: FICHA.estudios,
      nbc: [...FICHA.nbc],
      experiencia: FICHA.experiencia,
      equivalencias: FICHA.equivalencias,
      competenciasFuncionales: [...FICHA.competenciasFuncionales],
      competenciasComportamentales: FICHA.competenciasComportamentales.map((c) => ({
        ...c,
      })),
      competenciasBasicas: [...FICHA.competenciasBasicas],
    },
    rolBoundary: {
      youDo: [
        "Clasificar, priorizar y verificar expedientes de cartera.",
        "Apoyar devoluciones, compensaciones y conciliación con EAR.",
        "Actualizar cuenta corriente y corregir inconsistencias.",
        "Impulsar cobro persuasivo y proyectar piezas del coactivo.",
        "Orientar por el canal institucional frente a un requerimiento de control.",
      ],
      youDont: [
        "Firmar mandamientos o liquidaciones si tu grado no tiene competencia.",
        "Decretar embargos en etapa persuasiva.",
        "Recibir dinero o ‘arreglar’ un saldo a mano.",
        "Asesorar la estrategia fiscal del contribuyente.",
      ],
      vsOthers:
        "El Gestor prioriza, revisa y decide el acto. El Inspector visita y acta. Tú ejecutas la técnica del expediente de cartera.",
    },
    examFocus: [
      "Mandamiento, títulos 828, excepciones 15 días, prescripción 5 años.",
      "Cautelares previa o simultáneas al mandamiento, nunca en persuasivo.",
      "Devolución 850 vs compensación 815 y cuenta corriente.",
      "CPACA 15/10/30 y recursos 10 días.",
      "Ético nivel 4 en Likert.",
    ],
    functionGuides: guidesFromTopics([...CARTERA_MODULE_IDS], analistaCarteraNotes),
    moduleIds: [...ALL_MODULE_IDS],
  },
  {
    id: "gestor-i-cartera",
    family: "gestor",
    shortLabel: "Gestor I",
    processLabel: "Cartera, recaudo y devoluciones",
    blurb:
      "Nivel profesional. Coordina al equipo técnico, controla términos y proyecta actos de recaudo.",
    ficha: {
      opec: "236840",
      denominacion: "Gestor I",
      codigo: "301",
      grado: "01",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Cumplimiento de obligaciones tributarias",
      subproceso: "Administración de cartera, Recaudo-Devoluciones",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Gestionar la cartera, el recaudo y las devoluciones de competencia de la entidad, coordinando la operación técnica y proyectando los actos que correspondan, de acuerdo con la normativa, la delegación y el grado de responsabilidad del empleo.",
      funciones: [
        "Priorizar y asignar la cartera según cuantía, antigüedad y riesgo de prescripción.",
        "Revisar la calidad de expedientes, títulos ejecutivos y cuenta corriente antes del acto.",
        "Proyectar y, según competencia, impulsar mandamientos, facilidades y levantamientos de cautelares.",
        "Dirigir la conciliación con EAR y la depuración de saldos.",
        "Resolver o proyectar trámites de devolución y compensación con control previo.",
        "Hacer seguimiento a términos de cobro, excepciones y recursos.",
        "Orientar al equipo de Analistas y unificar criterio de campaña.",
        "Reportar al superior los casos de concurso, prescripción inminente o conflicto de interés.",
        "Las funciones comunes de planta y las que asigne la autoridad competente.",
      ],
      estudios:
        "Título profesional en NBC de Administración, Contaduría, Derecho, Economía o ingenierías administrativa, de sistemas o industrial.",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería Administrativa y afines",
        "Ingeniería de Sistemas, Telemática y afines",
        "Ingeniería Industrial y afines",
      ],
      experiencia: "Sin experiencia o la que señale la OPEC específica.",
      equivalencias: true,
      competenciasFuncionales: [
        "Cobro coactivo",
        "Cobro persuasivo",
        "Medidas cautelares",
        "Devoluciones y compensaciones",
        "Técnicas administrativas para recaudar",
        "Procesos concursales",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Priorizar lotes y asignar al Analista.",
        "Revisar título y cuenta corriente antes del acto.",
        "Proyectar mandamiento, facilidad o rechazo de devolución.",
        "Controlar prescripción y excepciones.",
        "Unificar el criterio del grupo.",
      ],
      youDont: [
        "Firmar un acto sin competencia ni delegación.",
        "Hacer tú todas las citaciones para ‘cumplir la meta personal’.",
        "Dar trato preferente a un NIT influyente.",
        "Dejar prescribir porque el Analista ‘se atrasó’ sin seguimiento.",
      ],
      vsOthers:
        "El Analista ejecuta la técnica. Tú decides el rumbo del expediente y respondes por el término. El jefe de división define la política de la seccional.",
    },
    examFocus: [
      "Competencia para firmar vs. proyectar.",
      "Prescripción: el Gestor no puede ‘no enterarse’.",
      "Calidad del título y conciliación EAR antes del mandamiento.",
      "Mismos saberes de cobro que el Analista, con verbo de decisión.",
      "Ético 4 + logro y comunicación en 3.",
    ],
    functionGuides: guidesFromTopics([...CARTERA_MODULE_IDS, "rol-gestor"], gestorCarteraNotes),
    moduleIds: [...CARTERA_MODULE_IDS, "rol-gestor"],
  },
  {
    id: "gestor-ii-cartera",
    family: "gestor",
    shortLabel: "Gestor II",
    processLabel: "Cartera, recaudo y devoluciones",
    blurb:
      "Mayor complejidad y cuantía. Dirige Analistas, suscribe más actos y responde por la meta de recaudo con debido proceso.",
    ficha: {
      opec: "236849",
      denominacion: "Gestor II",
      codigo: "302",
      grado: "02",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Cumplimiento de obligaciones tributarias",
      subproceso: "Administración de cartera, Recaudo-Devoluciones",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Dirigir técnicamente la gestión de cartera, recaudo y devoluciones de mayor complejidad, adoptando o proyectando los actos de competencia del empleo y asegurando la calidad, el recaudo y el debido proceso.",
      funciones: [
        "Liderar la priorización de la cartera de mayor cuantía y riesgo.",
        "Suscribir o proyectar mandamientos, resoluciones de excepciones, facilidades y actos de devolución según delegación.",
        "Resolver, en su grado, controversias de cuenta corriente y de EAR.",
        "Coordinar la relación con procesos de fiscalización cuando el título nace de una liquidación oficial.",
        "Asegurar que las cautelares se decreten en el momento legal y se levanten solo por causa.",
        "Hacer seguimiento a concursos, sucesiones y acreencias fiscales.",
        "Evaluar la calidad del trabajo del equipo técnico y devolver expedientes incompletos.",
        "Las funciones comunes de planta y las que asigne la autoridad competente.",
      ],
      estudios:
        "Título profesional en NBC de Administración, Contaduría, Derecho, Economía o ingenierías afines. La OPEC puede exigir experiencia.",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería Administrativa y afines",
        "Ingeniería de Sistemas, Telemática y afines",
        "Ingeniería Industrial y afines",
      ],
      experiencia: "La que señale la OPEC (habitualmente un año o más).",
      equivalencias: true,
      competenciasFuncionales: [
        "Cobro coactivo",
        "Medidas cautelares",
        "Devoluciones y compensaciones",
        "Procesos concursales",
        "Control de términos y calidad del acto",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
        { nombre: "Adaptabilidad", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Decidir el acto en expedientes de mayor cuantía.",
        "Resolver excepciones o proyectar la resolución.",
        "Coordinar fiscalización y cobro cuando el título es una liquidación oficial.",
        "Devolver al Analista un expediente incompleto, con observación.",
      ],
      youDont: [
        "Sacrificar el debido proceso por el indicador de recaudo.",
        "Levantar un embargo ‘de favor’.",
        "Usar la meta para atropellar una excepción válida.",
      ],
      vsOthers:
        "Más decisión que el Gestor I y el Analista. Sigue sin ser el Subdirector: la competencia escrita manda.",
    },
    examFocus: [
      "Excepciones al mandamiento y cuándo prosperan.",
      "Cautelares excesivas vs. inembargabilidad.",
      "Concurso (Ley 1116) y reorientación del cobro.",
      "Justicia: mismo procedimiento al grande y al pequeño.",
    ],
    functionGuides: guidesFromTopics([...CARTERA_MODULE_IDS, "rol-gestor"], gestorCarteraNotes),
    moduleIds: [...CARTERA_MODULE_IDS, "rol-gestor"],
  },
  {
    id: "analista-ii-fiscalizacion",
    family: "analista",
    shortLabel: "Analista II",
    processLabel: "Fiscalización tributaria",
    blurb:
      "Armas el expediente de inexactos y omisos: cruces, emplazamientos y proyectos de requerimiento.",
    ficha: {
      opec: "236835",
      denominacion: "Analista II",
      codigo: "202",
      grado: "02",
      nivel: "Nivel Técnico",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización tributaria",
      subproceso: "Control extensivo y apoyo a la determinación",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Ejecutar labores técnicas de apoyo a la fiscalización y al control de obligaciones tributarias, conforme a la normativa, los sistemas institucionales y el grado de responsabilidad del empleo.",
      funciones: [
        "Adelantar cruces de información exógena, RUT y declaraciones.",
        "Preparar emplazamientos para declarar o corregir en programas masivos.",
        "Armar el expediente de inexactitud: hechos, papeles de trabajo y pruebas.",
        "Proyectar piezas del requerimiento especial para revisión del Gestor.",
        "Apoyar visitas en lo documental, sin determinar el tributo.",
        "Orientar al obligado por el canal institucional frente a la campaña.",
        "Actualizar el sistema de fiscalización y la trazabilidad del caso.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Técnico profesional, tecnológico o tres años de profesional en NBC de Administración, Contaduría, Derecho, Economía o ingenierías afines.",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería Administrativa y afines",
        "Ingeniería de Sistemas, Telemática y afines",
        "Ingeniería Industrial y afines",
      ],
      experiencia: "Un (1) año de experiencia laboral, o la que señale la OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Control extensivo de obligaciones",
        "Fiscalización y determinación (apoyo)",
        "Papeles de trabajo y prueba",
        "Sistemas de información de fiscalización",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Comunicación efectiva", nivel: 2 },
        { nombre: "Adaptabilidad", nivel: 2 },
        { nombre: "Trabajo en equipo", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Cruzar datos y armar papeles de trabajo.",
        "Proyectar emplazamientos y piezas del 703.",
        "Mantener el sistema al día.",
        "Orientar con el mensaje de la campaña.",
      ],
      youDont: [
        "Proferir la liquidación de revisión o de aforo.",
        "Asesorar cómo ‘maquillar’ la declaración.",
        "Saltar el requerimiento especial ‘porque no hay tiempo’.",
      ],
      vsOthers:
        "El Gestor decide el acto de determinación. El Inspector visita. Tú construyes el expediente técnico.",
    },
    examFocus: [
      "Requerimiento especial 703 vs emplazamiento 705 vs aforo 717.",
      "Tres meses para responder el 703 (art. 707).",
      "Omiso vs inexacto: cadenas distintas.",
      "CPACA, Constitución y MIPG (gestión pública de todos los cargos).",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "fiscalizacion-determinacion",
        "control-extensivo",
        "inspeccion-visitas",
        ...SHARED_MODULE_IDS,
      ],
      analistaFiscalNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "fiscalizacion-determinacion",
      "control-extensivo",
      "inspeccion-visitas",
      "devoluciones-compensaciones",
      "sistema-tributario",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "gestor-ii-fiscalizacion",
    family: "gestor",
    shortLabel: "Gestor II",
    processLabel: "Fiscalización tributaria",
    blurb:
      "Determina: requerimiento especial, liquidación de revisión o aforo, según competencia y término.",
    ficha: {
      opec: "236850",
      denominacion: "Gestor II",
      codigo: "302",
      grado: "02",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización tributaria",
      subproceso: "Determinación oficial y programas de control",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Adelantar la fiscalización y la determinación oficial de obligaciones tributarias, proyectando o suscribiendo los actos de competencia del empleo y asegurando el debido proceso.",
      funciones: [
        "Dirigir el programa del expediente: inexacto u omiso.",
        "Proferir o proyectar el requerimiento especial con hechos, pruebas y glosas.",
        "Evaluar la respuesta del contribuyente (art. 707) y liquidar de revisión en término.",
        "Proferir o proyectar emplazamientos para declarar y liquidaciones de aforo.",
        "Ordenar o coordinar visitas con objeto delimitado.",
        "Garantizar reserva tributaria y cadena de pruebas.",
        "Trasladar el acto ejecutoriado a cobro cuando haya suma líquida.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en NBC de Administración, Contaduría, Derecho, Economía o ingenierías afines.",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería Administrativa y afines",
        "Ingeniería de Sistemas, Telemática y afines",
        "Ingeniería Industrial y afines",
      ],
      experiencia: "La que señale la OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Determinación oficial",
        "Requerimiento especial y liquidación de revisión",
        "Aforo de omisos",
        "Control de términos de fiscalización",
        "Dirección de visitas",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Decidir si el caso es revisión o aforo.",
        "Proferir el 703 con hechos y pruebas.",
        "Liquidar después de la respuesta o del silencio, en término.",
        "Ordenar la visita con objeto claro.",
      ],
      youDont: [
        "Liquidar de revisión sin requerimiento especial (regla general).",
        "Usar aforo contra quien sí declaró.",
        "Pactar de palabra una corrección a cambio de no actuar.",
      ],
      vsOthers:
        "El Analista arma el cruce. El Inspector acta la visita. Tú determinas. El cobro llega cuando el acto está ejecutoriado.",
    },
    examFocus: [
      "Cadena de revisión (703 → 707 → 713) vs cadena de omiso (715 → 717).",
      "Contenido del requerimiento especial (704).",
      "El acto ejecutoriado es título 828-2.",
      "Reserva y conflicto de interés.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "rol-gestor",
        "fiscalizacion-determinacion",
        "control-extensivo",
        "inspeccion-visitas",
        ...SHARED_MODULE_IDS,
      ],
      { ...gestorFiscalNotes, ...gestorCarteraNotes },
    ),
    moduleIds: [
      "ficha-empleo",
      "rol-gestor",
      "fiscalizacion-determinacion",
      "control-extensivo",
      "inspeccion-visitas",
      "cobro-coactivo",
      "sistema-tributario",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "inspector-ii-fiscalizacion",
    family: "inspector",
    shortLabel: "Inspector II",
    processLabel: "Fiscalización tributaria",
    blurb: "Practica visitas, recoge pruebas y deja actas. No determina el tributo en el predio.",
    ficha: {
      opec: "236860",
      denominacion: "Inspector II",
      codigo: "302",
      grado: "02",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización tributaria",
      subproceso: "Inspección, visita y material probatorio",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Practicar inspecciones, visitas y demás diligencias de prueba en la fiscalización tributaria, dejando constancia fidedigna de los hechos, de acuerdo con la normativa y el objeto del acto que ordena la diligencia.",
      funciones: [
        "Practicar visitas e inspecciones con identificación y objeto delimitado.",
        "Recoger documentos, testimonios y otras pruebas con cadena de custodia.",
        "Elaborar actas que relaten hechos, no acuerdos de recaudo.",
        "Informar hallazgos al Gestor o al competente para el requerimiento.",
        "Guardar reserva de la información tributaria.",
        "Rechazar dádivas y reportar presiones indebidas.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en NBC de Administración, Contaduría, Derecho, Economía o ingenierías afines.",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería Administrativa y afines",
        "Ingeniería de Sistemas, Telemática y afines",
        "Ingeniería Industrial y afines",
      ],
      experiencia: "La que señale la OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Visitas e inspecciones",
        "Material probatorio",
        "Actas de diligencia",
        "Facultades de fiscalización (apoyo)",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Diligencia / orientación al detalle", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Adaptabilidad", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Identificarte y delimitar el objeto.",
        "Actar hechos y documentos.",
        "Custodiar la prueba.",
        "Trasladar el informe al que determina.",
      ],
      youDont: [
        "Liquidar o ‘cerrar’ el caso en el predio.",
        "Recibir almuerzo, dinero o favores del visitado.",
        "Exceder el objeto del acto que ordena la visita.",
        "Omitir un hallazgo porque el visitado lo pidió.",
      ],
      vsOthers:
        "No eres el Gestor que determina ni el Analista de escritorio. Eres la prueba en terreno. Sin acta sólida, el 703 se cae.",
    },
    examFocus: [
      "Acta: hechos, renuencia a firmar, objeto delimitado.",
      "Dádiva = rechazo + rastro.",
      "La liquidación no se firma en la visita.",
      "Reserva tributaria.",
      "Cadena 684 → visita → 703 → 713 (tu eslabón es la visita).",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "inspeccion-visitas",
        "fiscalizacion-determinacion",
        "control-extensivo",
        ...SHARED_MODULE_IDS,
      ],
      inspectorNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "inspeccion-visitas",
      "fiscalizacion-determinacion",
      "control-extensivo",
      "sistema-tributario",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "analista-i-apoyo",
    family: "analista",
    shortLabel: "Analista I",
    processLabel: "Apoyo técnico tributario y aduanero",
    blurb:
      "Nivel técnico (Código 201). Apoyas labores técnicas en recepción, verificación preliminar de declaraciones y archivo de expedientes.",
    ficha: {
      opec: "236829",
      denominacion: "Analista I",
      codigo: "201",
      grado: "01",
      nivel: "Nivel Técnico",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Cumplimiento de obligaciones",
      subproceso: "Gestión de apoyo técnico y documental",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Ejecutar labores técnicas de apoyo en la gestión tributaria, aduanera y cambiaria, conforme a las directrices de nivel central y procedimientos institucionales.",
      funciones: [
        "Verificar el cumplimiento de requisitos formales en documentos tributarios y aduaneros.",
        "Apoyar la radicación y actualización de expedientes en los sistemas corporativos.",
        "Brindar soporte técnico a los usuarios en el uso de los servicios informáticos electrónicos.",
        "Consolidar reportes básicos de inconsistencias en declaraciones y pagos.",
        "Participar en el archivo y custodia de documentos de cobro y fiscalización.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título de formación técnica profesional o aprobación de estudios tecnológicos afines.",
      nbc: ["Administración", "Contaduría Pública", "Economía", "Ingeniería de Sistemas"],
      experiencia: "Seis (6) meses de experiencia laboral o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Herramientas ofimáticas",
        "Gestión documental",
        "Razonamiento matemático",
        "Misionalidad de la DIAN",
        "Estructura organizacional de la DIAN",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Comunicación efectiva", nivel: 2 },
        { nombre: "Adaptabilidad", nivel: 2 },
        { nombre: "Trabajo en equipo", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Verificar requisitos formales y foliar expedientes.",
        "Operar hojas de cálculo y registrar datos en Muisca.",
        "Orientar al ciudadano en trámites virtuales.",
      ],
      youDont: [
        "Proyectar actos sancionatorios o liquidaciones oficiales.",
        "Decidir sobre el levantamiento de medidas cautelares.",
        "Modificar registros sin la autorización o el soporte técnico.",
      ],
      vsOthers:
        "El Analista II ejecuta análisis de cartera y expedientes complejos. Tú aseguras la exactitud de los registros base y el soporte operativo.",
    },
    examFocus: [
      "Razonamiento matemático básico: porcentajes, tarifas y proporciones.",
      "Ofimática: fórmulas de Excel y plantillas oficiales.",
      "Misionalidad y estructura orgánica de la DIAN.",
      "Código de Integridad y conducta ética nivel 4.",
    ],
    functionGuides: guidesFromTopics(["ficha-empleo", ...SHARED_MODULE_IDS], analistaCarteraNotes),
    moduleIds: ["ficha-empleo", ...SHARED_MODULE_IDS],
  },
  {
    id: "analista-iii-cartera",
    family: "analista",
    shortLabel: "Analista III",
    processLabel: "Cartera y gestión técnica",
    blurb:
      "Nivel técnico superior (Código 203, Grado 03). Sustanciación técnica de expedientes complejos, cruces masivos y apoyo al cobro coactivo.",
    ficha: {
      opec: "236838",
      denominacion: "Analista III",
      codigo: "203",
      grado: "03",
      nivel: "Nivel Técnico",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Cumplimiento de obligaciones tributarias",
      subproceso: "Administración de cartera, Recaudo-Devoluciones",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Desarrollar labores técnicas de mayor complejidad y análisis en la gestión tributaria, aduanera o cambiaria, sustanciando expedientes, verificando información y proyectando documentos de acuerdo con los procedimientos y normativa vigente.",
      funciones: [
        "Analizar y depurar expedientes técnicos de cartera y recaudo de mayor complejidad o cuantía.",
        "Proyectar piezas procesales de cobro coactivo, excepciones y facilidades para revisión del Gestor.",
        "Adelantar cruces de información contable, exógena y tributaria para verificar la exigibilidad de títulos.",
        "Sustanciar actuaciones administrativas sobre medidas cautelares, embargos y remanentes.",
        "Participar en la conciliación de inconsistencias con Entidades Autorizadas para Recaudar (EAR).",
        "Apoyar la verificación de solicitudes complejas de devolución y compensación de saldos a favor.",
        "Hacer seguimiento al estado de los procesos concursales y de reorganización empresarial.",
        "Las funciones comunes de planta y las que asigne la autoridad competente.",
      ],
      estudios:
        "Título de formación técnica profesional o tecnológica, o terminación y aprobación de materias de pénsum académico de pregrado en NBC afines (Administración, Contaduría, Derecho, Economía o Ingenierías).",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería Administrativa y afines",
        "Ingeniería de Sistemas, Telemática y afines",
        "Ingeniería Industrial y afines",
      ],
      experiencia: "Un (1) a dos (2) años de experiencia laboral relacionada o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Cobro coactivo y persuasivo",
        "Medidas cautelares y procesos concursales",
        "Devoluciones y compensaciones",
        "Herramientas ofimáticas y cruces masivos",
        "Técnicas de depuración contable y tributaria",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 2 },
        { nombre: "Trabajo en equipo", nivel: 2 },
        { nombre: "Adaptabilidad", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Sustanciar expedientes técnicos de mayor cuantía y complejidad.",
        "Realizar cruces de información y depuración de saldos a favor.",
        "Proyectar mandamientos, autos de trámite y respuestas a excepciones.",
        "Apoyar la investigación patrimonial para medidas cautelares.",
      ],
      youDont: [
        "Firmar actos decisorios sin competencia o delegación expresa.",
        "Decretar o levantar embargos sin la orden y firma del funcionario competente.",
        "Modificar registros tributarios en el sistema sin soporte probatorio.",
      ],
      vsOthers:
        "Nivel técnico superior: mayor autonomía técnica en la sustanciación de expedientes que el Analista I y II, pero la decisión formal y suscripción del acto corresponde al Gestor.",
    },
    examFocus: [
      "Estatuto Tributario: Títulos ejecutivos (art. 828), excepciones (art. 831) y prescripción (art. 817).",
      "Medidas cautelares: embargo de cuentas, bienes inembargables y prelación legal.",
      "Devoluciones y compensaciones: términos del art. 850 y cruces con cuenta corriente.",
      "Código de Integridad: rectitud, diligencia y comportamiento ético nivel 4.",
    ],
    functionGuides: guidesFromTopics([...CARTERA_MODULE_IDS], analistaIiiNotes),
    moduleIds: [...CARTERA_MODULE_IDS],
  },
  {
    id: "facilitador-iii-servicio",
    family: "facilitador",
    shortLabel: "Facilitador III",
    processLabel: "Servicio y ventanilla única",
    blurb:
      "Nivel asistencial (Código 103). Atención presencial al ciudadano, radicación de PQRSF, gestión de correspondencia y apoyo logístico.",
    ficha: {
      opec: "236815",
      denominacion: "Facilitador III",
      codigo: "103",
      grado: "03",
      nivel: "Nivel Asistencial",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "ESTRATÉGICO: Servicio y relación con el ciudadano",
      subproceso: "Atención al usuario, ventanilla única y PQRSF",
      aplicacion: "Puntos de Contacto y Seccionales",
      proposito:
        "Desarrollar actividades asistenciales y operativas de atención al usuario, radicación y gestión de correspondencia para garantizar el servicio oportuno y de calidad.",
      funciones: [
        "Recibir, radicar y direccionar solicitudes, derechos de petición y correspondencia institucional.",
        "Atender y orientar de manera presencial o telefónica a los ciudadanos sobre los trámites y requisitos institucionales.",
        "Organizar, foliar y custodiar los expedientes y archivos de gestión de la dependencia.",
        "Registrar información en los aplicativos institucionales de correspondencia y PQRSF.",
        "Apoyar la logística de las campañas de orientación y formalización tributaria.",
        "Las funciones comunes de planta.",
      ],
      estudios: "Diploma de bachiller y curso específico o estudios técnicos en áreas afines.",
      nbc: ["Educación Media / Bachillerato"],
      experiencia: "Un (1) año de experiencia laboral.",
      equivalencias: true,
      competenciasFuncionales: [
        "Servicio al ciudadano y PQRSF",
        "Gestión documental y archivo",
        "Herramientas ofimáticas",
        "Comprensión lectora y redacción",
        "Misionalidad de la DIAN",
      ],
      competenciasComportamentales: [
        { nombre: "Orientación al usuario y al ciudadano", nivel: 2 },
        { nombre: "Comportamiento ético", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 2 },
        { nombre: "Trabajo en equipo", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Recibir y radicar en el sistema con fecha y hora oficial.",
        "Tratar al ciudadano con empatía, respeto y lenguaje claro.",
        "Custodiar la correspondencia y los expedientes asignados.",
      ],
      youDont: [
        "Interpretar normas sustanciales o dar asesorías privadas de planeación fiscal.",
        "Retener o rechazar peticiones por falta de requisitos no esenciales.",
        "Recibir dinero, propinas o favores por agilizar turnos.",
      ],
      vsOthers:
        "Eres el primer rostro de la DIAN frente a la ciudadanía. La técnica del tributo es del Analista y la decisión es del Gestor.",
    },
    examFocus: [
      "CPACA: plazos de derecho de petición (15 días, 10 días, 30 días).",
      "Atributos del servicio público DIAN y manejo de usuarios alterados.",
      "Gestión documental (Ley 594/2000): radicación y foliación.",
      "Código de Integridad: Respeto y Diligencia.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "servicio-pqrsf",
        "mipg-archivo",
        "ofimatica-dian",
        "estructura-dian",
        "comportamiento-etico",
        "comunicacion-equipo",
        "codigo-integridad",
        "valores-cinco",
      ],
      {
        "ficha-empleo":
          "Facilitador III: nivel asistencial. Radicas, atiendes y custodias. No decides de fondo.",
        "servicio-pqrsf":
          "Atención empática, cumplimiento estricto de términos de ley y cero asesoría privada.",
        "mipg-archivo": "Radicación rigurosa y foliación técnica de cada expediente recibido.",
        "ofimatica-dian": "Registro ágil en aplicativos de ventanilla y correspondencia.",
      },
    ),
    moduleIds: [
      "ficha-empleo",
      "servicio-pqrsf",
      "mipg-archivo",
      "ofimatica-dian",
      "estructura-dian",
      "razonamiento-matematico",
      "constitucion-funcion",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "facilitador-ii-operativo",
    family: "facilitador",
    shortLabel: "Facilitador II",
    processLabel: "Apoyo operativo y digitación",
    blurb:
      "Nivel asistencial (Código 102). Digitación de datos, apoyo en archivo, mensajería interna y logística de expedientes.",
    ficha: {
      opec: "236810",
      denominacion: "Facilitador II",
      codigo: "102",
      grado: "02",
      nivel: "Nivel Asistencial",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "APOYO: Gestión operativa",
      subproceso: "Operación de expedientes y archivo",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Ejecutar actividades asistenciales de apoyo operativo, digitación y conservación física y digital de expedientes en la dependencia.",
      funciones: [
        "Digitar y actualizar datos en las herramientas ofimáticas y aplicativos corporativos.",
        "Foliar, rotular y archivar expedientes cumpliendo las tablas de retención documental.",
        "Apoyar la entrega y traslado de expedientes a las áreas de cobro y fiscalización.",
        "Verificar inventarios básicos de papelería y archivo físico.",
        "Las funciones comunes de planta.",
      ],
      estudios: "Diploma de bachiller en cualquier modalidad.",
      nbc: ["Educación Media / Bachillerato"],
      experiencia: "Seis (6) meses de experiencia laboral.",
      equivalencias: true,
      competenciasFuncionales: [
        "Gestión documental",
        "Herramientas ofimáticas",
        "Razonamiento matemático",
        "Misionalidad de la DIAN",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 3 },
        { nombre: "Diligencia", nivel: 2 },
        { nombre: "Trabajo en equipo", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Digitar con exactitud y verificar los soportes.",
        "Foliar expedientes de forma consecutiva.",
        "Mantener el orden y la seguridad del archivo.",
      ],
      youDont: [
        "Emitir conceptos técnicos o proyectar actos.",
        "Modificar registros sin soporte documental.",
        "Permitir la salida de expedientes sin formato de préstamo.",
      ],
      vsOthers:
        "Apoyo operativo puro. La solidez de los expedientes depende de tu cuidado y trazabilidad física.",
    },
    examFocus: [
      "Reglas de archivo y foliación de expedientes.",
      "Ofimática: digitación y hojas de cálculo.",
      "Código de Integridad: Diligencia y Honestidad.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "mipg-archivo",
        "ofimatica-dian",
        "razonamiento-matematico",
        "estructura-dian",
        "codigo-integridad",
        "valores-cinco",
      ],
      {
        "ficha-empleo": "Facilitador II: apoyo operativo y foliación de expedientes.",
        "mipg-archivo": "Tablas de retención y custodia documental estricta.",
      },
    ),
    moduleIds: [
      "ficha-empleo",
      "mipg-archivo",
      "ofimatica-dian",
      "razonamiento-matematico",
      "estructura-dian",
      "constitucion-funcion",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "gestor-i-aduanas",
    family: "gestor",
    shortLabel: "Gestor I Aduanas",
    processLabel: "Aduanas y control de carga",
    blurb:
      "Nivel profesional (Código 301). Desaduanamiento, inspección física y documental de mercancías, control arancelario y valoración.",
    ficha: {
      opec: "236845",
      denominacion: "Gestor I",
      codigo: "301",
      grado: "01",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Operación aduanera",
      subproceso: "Desaduanamiento, inspección y control de carga",
      aplicacion: "Seccionales de Aduanas y Puertos/Aeropuertos",
      proposito:
        "Adelantar actividades profesionales en los procesos de inspección aduanera, desaduanamiento, control de carga y valoración para asegurar el cumplimiento del régimen de aduanas.",
      funciones: [
        "Realizar inspecciones físicas y documentales a declaraciones de importación, exportación y tránsito.",
        "Verificar la correcta clasificación arancelaria, origen y valoración de las mercancías.",
        "Proyectar o proferir actas de inspección, autos de aprehensión y requerimientos aduaneros.",
        "Controlar el ingreso y salida de mercancías en zonas primarias, depósitos y puertos.",
        "Resolver controversias de valor y liquidar tributos aduaneros y rescates según competencia.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en Comercio Exterior, Derecho, Administración, Economía o afines.",
      nbc: ["Administración", "Derecho y afines", "Economía", "Ingeniería Industrial y afines"],
      experiencia: "Sin experiencia o la que señale la OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Régimen aduanero (D. 1165/2019 y D. 659/2024)",
        "Inspección y control de carga",
        "Clasificación arancelaria y valoración",
        "Extinción y devolución de tributos aduaneros",
        "Estructura organizacional de la DIAN",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Inspeccionar mercancías y confrontar con la declaración aduanera.",
        "Aprehender cuando haya causal legal y levantar acta con inventario exacto.",
        "Liquidar rescate o tributos aduaneros según arancel.",
      ],
      youDont: [
        "Permitir el levante de mercancías con inconsistencias graves sin garantía.",
        "Aceptar dádivas, 'muestras gratis' o atenciones de declarantes o agencias de aduana.",
        "Omitir hallazgos en el acta de inspección por agilizar el desaduanamiento.",
      ],
      vsOthers:
        "Eres la autoridad profesional en puerto, aeropuerto o depósito. Sin tu levante legal, la mercancía no entra al comercio nacional.",
    },
    examFocus: [
      "Decreto 1165 de 2019 y Decreto 659 de 2024 (régimen aduanero).",
      "Causales de aprehensión vs. allanamiento y rescate.",
      "Clasificación arancelaria, valoración y origen.",
      "Ética e integridad nivel 4 frente a riesgos de contrabando.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "rol-gestor",
        "sistema-tributario",
        "estructura-dian",
        "devoluciones-compensaciones",
        "cobro-coactivo",
        ...SHARED_MODULE_IDS,
      ],
      {
        "ficha-empleo": "Gestor I Aduanas: inspección y control aduanero en puertos y depósitos.",
        "sistema-tributario": "Régimen aduanero: tributos aduaneros, levante y aprehensión.",
      },
    ),
    moduleIds: [
      "ficha-empleo",
      "rol-gestor",
      "sistema-tributario",
      "estructura-dian",
      "devoluciones-compensaciones",
      "cobro-coactivo",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "gestor-ii-juridico",
    family: "gestor",
    shortLabel: "Gestor II Jurídico",
    processLabel: "Jurídica y Cobranzas",
    blurb:
      "Nivel profesional (Código 302). Proyectas decisiones de recursos de reconsideración, excepciones en cobro coactivo y defensa judicial.",
    ficha: {
      opec: "236855",
      denominacion: "Gestor II",
      codigo: "302",
      grado: "02",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Jurídica y Cobranzas",
      subproceso: "Recursos tributarios, excepciones y defensa judicial",
      aplicacion: "Dirección de Gestión Jurídica y Seccionales",
      proposito:
        "Proyectar actos jurídicos resolutivos de recursos tributarios, aduaneros y cambiarios, excepciones de cobro coactivo y defensas judiciales de la DIAN.",
      funciones: [
        "Resolver recursos de reconsideración contra liquidaciones oficiales y resoluciones sanción.",
        "Proyectar autos y resoluciones que deciden excepciones contra mandamientos de pago (art. 831 E.T.).",
        "Sustanciar solicitudes de revocatoria directa y peticiones complejas de nulidad.",
        "Representar a la entidad en audiencias y contestaciones de demandas ante lo contencioso administrativo.",
        "Garantizar la unificación de doctrina jurídica institucional en los fallos proyectados.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en Derecho y título de posgrado en Derecho Tributario, Administrativo o afín.",
      nbc: ["Derecho y afines"],
      experiencia: "Dos (2) años de experiencia profesional relacionada o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Recurso de reconsideración (art. 720 E.T.)",
        "Excepciones de cobro coactivo (art. 831 E.T.)",
        "CPACA y procedimiento contencioso",
        "Doctrina y jurisprudencia tributaria",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Analizar pruebas y argumentos del recurrente con imparcialidad.",
        "Proyectar la resolución que confirma, modifica o revoca el acto oficial.",
        "Revisar la firmeza del título antes de ordenar continuar la ejecución.",
      ],
      youDont: [
        "Dilatar fallos para beneficiar la prescripción o caducidad del contribuyente.",
        "Revocar actos oficiales válidos por simple presión mediática o política.",
        "Emitir fallos contrarios a la doctrina unificada de la Dirección de Gestión Jurídica.",
      ],
      vsOthers:
        "El Analista arma el expediente; el Gestor de fiscalización liquida; tú eres el control jurídico de legalidad antes de la sede judicial.",
    },
    examFocus: [
      "Recurso de reconsideración: términos de interposición y de fallo (1 año, art. 732).",
      "Excepciones taxativas del art. 831 E.T. y recurso de reposición contra la resolución que las rechaza (art. 834).",
      "Silencio administrativo positivo (art. 734 E.T.) y cómo evitarlo.",
      "CPACA: caducidad del medio de control de nulidad y restablecimiento del derecho (4 meses).",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "rol-gestor",
        "cpaca",
        "cobro-coactivo",
        "estructura-dian",
        "sistema-tributario",
        ...SHARED_MODULE_IDS,
      ],
      {
        "ficha-empleo": "Gestor II Jurídico: control de legalidad, recursos y excepciones.",
        cpaca: "CPACA: debido proceso, recursos y caducidad de acciones contenciosas.",
        "cobro-coactivo": "Resolución de excepciones taxativas del 831 y control de prescripción.",
      },
    ),
    moduleIds: [
      "ficha-empleo",
      "rol-gestor",
      "cpaca",
      "cobro-coactivo",
      "estructura-dian",
      "sistema-tributario",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "facilitador-i-apoyo",
    family: "facilitador",
    shortLabel: "Facilitador I",
    processLabel: "Apoyo operativo y radicación",
    blurb:
      "Nivel asistencial (Código 101, Grado 01). Apoyo logístico preliminar, radicación simple, mensajería interna y recepción física.",
    ficha: {
      opec: "236805",
      denominacion: "Facilitador I",
      codigo: "101",
      grado: "01",
      nivel: "Nivel Asistencial",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "APOYO: Gestión operativa y documental",
      subproceso: "Recepción, radicación y mensajería",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Desarrollar labores asistenciales y operativas básicas de recepción de correspondencia, apoyo logístico y mensajería en las dependencias de la entidad.",
      funciones: [
        "Recibir y radicar correspondencia y documentos conforme a los protocolos institucionales.",
        "Apoyar la entrega y distribución física y electrónica de expedientes y comunicaciones.",
        "Organizar y mantener actualizados los registros básicos de ingreso y salida documental.",
        "Brindar soporte logístico en reuniones, audiencias y eventos de formalización tributaria.",
        "Custodiar los documentos bajo su responsabilidad y respetar las normas de archivo.",
        "Las funciones comunes de planta.",
      ],
      estudios: "Diploma de bachiller en cualquier modalidad.",
      nbc: ["Educación Media / Bachillerato"],
      experiencia: "Sin experiencia previa o la señalada en la OPEC específica.",
      equivalencias: true,
      competenciasFuncionales: [
        "Gestión documental básica",
        "Herramientas ofimáticas",
        "Misionalidad de la DIAN",
        "Atención y servicio al ciudadano",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 3 },
        { nombre: "Diligencia", nivel: 2 },
        { nombre: "Trabajo en equipo", nivel: 2 },
        { nombre: "Orientación al usuario y al ciudadano", nivel: 1 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Radicar en el sistema oficial con fecha y número consecutivo.",
        "Entregar correspondencia y trasladar carpetas con planilla de recibido.",
        "Apoyar el orden físico de las dependencias.",
      ],
      youDont: [
        "Emitir conceptos técnicos o asesorar sobre declaraciones.",
        "Retener documentos sin radicar o cobrar por trámites gratuitos.",
        "Alterar o suplantar radicados institucionales.",
      ],
      vsOthers:
        "Apoyo asistencial de base. La clasificación y análisis del expediente corresponde a los Analistas.",
    },
    examFocus: [
      "Ley General de Archivos (Ley 594 de 2000): principios básicos de radicación y archivo.",
      "Código de Integridad: Diligencia, Honestidad y Respeto.",
      "Misionalidad de la DIAN y estructura general del Estado.",
      "Herramientas ofimáticas básicas.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "mipg-archivo",
        "ofimatica-dian",
        "estructura-dian",
        "codigo-integridad",
        "valores-cinco",
      ],
      {
        "ficha-empleo": "Facilitador I: nivel asistencial, apoyo logístico y radicación.",
        "mipg-archivo": "Radicación técnica, foliación consecutiva y custodia documental.",
      },
    ),
    moduleIds: [
      "ficha-empleo",
      "mipg-archivo",
      "ofimatica-dian",
      "estructura-dian",
      "constitucion-funcion",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "facilitador-iv-coordinacion",
    family: "facilitador",
    shortLabel: "Facilitador IV",
    processLabel: "Coordinación asistencial y ventanilla",
    blurb:
      "Nivel asistencial superior (Código 104, Grado 04). Coordinación operativa de ventanilla única, supervisión de radicación masiva y archivo central.",
    ficha: {
      opec: "236820",
      denominacion: "Facilitador IV",
      codigo: "104",
      grado: "04",
      nivel: "Nivel Asistencial",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "ESTRATÉGICO: Servicio y relación con el ciudadano",
      subproceso: "Ventanilla única, gestión de correspondencia y archivo",
      aplicacion: "Puntos de Contacto y Direcciones Seccionales",
      proposito:
        "Coordinar y supervisar operativamente las actividades asistenciales de ventanilla única, radicación, gestión de PQRSF y custodia documental en la dependencia.",
      funciones: [
        "Coordinar los turnos de atención y la operación de las ventanillas de radicación.",
        "Supervisar el cumplimiento de los tiempos de radicación y distribución de PQRSF.",
        "Controlar los inventarios documentales y la transferencia técnica de expedientes al archivo central.",
        "Capacitar y apoyar a los Facilitadores de menor grado en el uso de los aplicativos corporativos.",
        "Gestionar casos especiales de usuarios alterados o con requerimientos prioritarios.",
        "Las funciones comunes de planta.",
      ],
      estudios: "Diploma de bachiller y estudios técnicos o tecnológicos en áreas administrativas.",
      nbc: ["Educación Media / Bachillerato", "Administración"],
      experiencia: "Dos (2) años de experiencia laboral.",
      equivalencias: true,
      competenciasFuncionales: [
        "Servicio al ciudadano y gestión de PQRSF",
        "Gestión documental y TRD",
        "Coordinación de equipos asistenciales",
        "Herramientas ofimáticas avanzadas",
      ],
      competenciasComportamentales: [
        { nombre: "Orientación al usuario y al ciudadano", nivel: 3 },
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
        { nombre: "Orientación al logro", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Coordinar la ventanilla y asegurar que ninguna PQRSF quede sin radicar.",
        "Supervisar que los expedientes cumplan la foliación antes de ser transferidos.",
        "Resolver incidentes de atención en ventanilla con serenidad y apego a la norma.",
      ],
      youDont: [
        "Emitir pronunciamientos sobre el fondo de las solicitudes tributarias.",
        "Alterar el orden de turnos por preferencias indebidas.",
        "Permitir la pérdida o deterioro de piezas documentales bajo custodia.",
      ],
      vsOthers:
        "Liderazgo operativo asistencial. Aseguras que la puerta de entrada de la DIAN funcione con excelencia y oportunidad.",
    },
    examFocus: [
      "CPACA: plazos de respuesta (15 días petición general, 10 información, 30 consultas).",
      "Protocolos de atención al ciudadano y lenguaje claro institucional.",
      "Organización y transferencia documental según TRD (Ley 594/2000).",
      "Integridad y resolución asertiva de conflictos.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "servicio-pqrsf",
        "mipg-archivo",
        "ofimatica-dian",
        "estructura-dian",
        ...SHARED_MODULE_IDS,
      ],
      {
        "ficha-empleo": "Facilitador IV: coordinación de ventanilla y supervisión asistencial.",
        "servicio-pqrsf": "Control estricto de términos de ley y atención prioritaria.",
      },
    ),
    moduleIds: [
      "ficha-empleo",
      "servicio-pqrsf",
      "mipg-archivo",
      "ofimatica-dian",
      "estructura-dian",
      "razonamiento-matematico",
      "constitucion-funcion",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "analista-iii-fiscalizacion",
    family: "analista",
    shortLabel: "Analista III Fiscalización",
    processLabel: "Fiscalización y determinación tributaria",
    blurb:
      "Nivel técnico (Código 203, Grado 03). Cruces complejos de exógena, perfilamiento de contribuyentes y apoyo a liquidaciones de revisión.",
    ficha: {
      opec: "236839",
      denominacion: "Analista III",
      codigo: "203",
      grado: "03",
      nivel: "Nivel Técnico",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización tributaria",
      subproceso: "Control extensivo y apoyo a la determinación",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Adelantar análisis técnicos de mayor complejidad en la fiscalización tributaria, cruzando bases de datos masivas y proyectando requerimientos y resoluciones sanción.",
      funciones: [
        "Ejecutar cruces analíticos entre declaraciones de renta, IVA, exógena y facturación electrónica.",
        "Estructurar papeles de trabajo e informes técnicos de inexactitud u omisión.",
        "Proyectar emplazamientos para declarar o corregir y pliegos de cargos para revisión del Gestor.",
        "Verificar la consistencia técnica de las pruebas documentales aportadas por el investigado.",
        "Monitorear el vencimiento de términos de firmeza y de caducidad de la facultad de determinación.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título técnico profesional, tecnológico o tres años de carrera profesional en NBC afines.",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería de Sistemas, Telemática y afines",
        "Ingeniería Industrial y afines",
      ],
      experiencia: "Un (1) a dos (2) años de experiencia laboral relacionada o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Fiscalización tributaria y determinación",
        "Cruces de información exógena y analítica de datos",
        "Papeles de trabajo e informes de inspección",
        "Control de términos legales de fiscalización",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 2 },
        { nombre: "Trabajo en equipo", nivel: 2 },
        { nombre: "Adaptabilidad", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Armar matrices de cruce y papeles de trabajo con rigor probatorio.",
        "Proyectar pliegos y requerimientos especiales con fundamento legal.",
        "Custodiar la reserva tributaria de los datos analizados.",
      ],
      youDont: [
        "Firmar actos administrativos de determinación sin delegación.",
        "Negociar glosas o aceptar pagos por fuera de los canales bancarios.",
        "Omitir hallazgos relevantes de evasión fiscal identificados en los cruces.",
      ],
      vsOthers:
        "Especialista técnico en pruebas y cruces de datos. El Gestor evalúa y firma el requerimiento especial.",
    },
    examFocus: [
      "Art. 703 E.T. (Requerimiento especial), art. 705 (Término para notificarlo) y art. 707 (Respuesta).",
      "Diferencia entre emplazamiento para corregir (709) y requerimiento especial.",
      "Facturación electrónica y cruces de información exógena como prueba fiscal.",
      "Código de Integridad y confidencialidad de la información tributaria.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "fiscalizacion-determinacion",
        "control-extensivo",
        "inspeccion-visitas",
        ...SHARED_MODULE_IDS,
      ],
      analistaFiscalNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "fiscalizacion-determinacion",
      "control-extensivo",
      "inspeccion-visitas",
      "sistema-tributario",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "analista-iv-gestion",
    family: "analista",
    shortLabel: "Analista IV",
    processLabel: "Auditoría técnica y análisis tributario",
    blurb:
      "Nivel técnico superior (Código 204, Grado 04). Auditoría analítica de declaraciones, sustanciación de controversias y apoyo a peritajes técnicos.",
    ficha: {
      opec: "236842",
      denominacion: "Analista IV",
      codigo: "204",
      grado: "04",
      nivel: "Nivel Técnico",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización y Cobranzas",
      subproceso: "Auditoría técnica y control integral",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Ejecutar análisis técnicos especializados en auditoría tributaria, aduanera o cambiaria, estructurando papeles de trabajo complejos y apoyando la formulación de glosas.",
      funciones: [
        "Desarrollar auditorías técnicas a estados financieros y declaraciones tributarias complejas.",
        "Estructurar dictámenes e informes técnicos para sustentar actos de determinación y cobro.",
        "Apoyar la depuración de expedientes con saldos en litigio de alta cuantía.",
        "Verificar la correcta aplicación de tarifas, retenciones y bases gravables en auditorías integrales.",
        "Colaborar en el diseño de modelos técnicos de cruce de datos para campañas seccionales.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título tecnológico o aprobación de 4 años de educación superior profesional en NBC afines.",
      nbc: [
        "Administración",
        "Contaduría Pública",
        "Derecho y afines",
        "Economía",
        "Ingeniería de Sistemas, Telemática y afines",
      ],
      experiencia: "Dos (2) años de experiencia laboral relacionada.",
      equivalencias: true,
      competenciasFuncionales: [
        "Auditoría técnica tributaria y contable",
        "Análisis de estados financieros y conciliación fiscal",
        "Control de términos y debido proceso probatorio",
        "Sistemas corporativos DIAN y analítica avanzada",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
        { nombre: "Adaptabilidad", nivel: 2 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Emitir conceptos técnicos soportados en normas contables y fiscales.",
        "Revisar la coherencia numérica de los proyectos de liquidación.",
        "Detectar fraudes o maniobras de simulación en facturas y transacciones.",
      ],
      youDont: [
        "Adoptar decisiones jurídicas que corresponden al Gestor o Jefe de División.",
        "Asesorar externamente a contribuyentes en planeación tributaria.",
        "Permitir la prescripción por demoras injustificadas en el análisis del expediente.",
      ],
      vsOthers:
        "Máximo rigor técnico en auditoría numérica y contable antes de la decisión profesional.",
    },
    examFocus: [
      "Art. 772-1 E.T. (Conciliación fiscal) y relación NIIF - Estatuto Tributario.",
      "Régimen de sanciones tributarias: inexactitud (art. 647/648), no declarar (art. 643).",
      "Prueba pericial y contable en el procedimiento tributario (arts. 772 a 777).",
      "Comportamiento ético e intolerancia a la corrupción en auditorías.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "fiscalizacion-determinacion",
        "principios-contables-financieros",
        "razonamiento-matematico",
        ...SHARED_MODULE_IDS,
      ],
      analistaIiiNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "fiscalizacion-determinacion",
      "principios-contables-financieros",
      "razonamiento-matematico",
      "sistema-tributario",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "analista-v-coordinacion",
    family: "analista",
    shortLabel: "Analista V",
    processLabel: "Coordinación operativa técnica",
    blurb:
      "Máximo nivel técnico (Código 205, Grado 05). Coordinación de grupos de analistas técnicos, control de calidad del expediente y enlace con gestores.",
    ficha: {
      opec: "236844",
      denominacion: "Analista V",
      codigo: "205",
      grado: "05",
      nivel: "Nivel Técnico",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Gestión tributaria y aduanera",
      subproceso: "Control de calidad y coordinación técnica",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Coordinar operativamente la ejecución de labores técnicas en el área misional, revisando la consistencia y calidad de expedientes y asegurando el cumplimiento de metas.",
      funciones: [
        "Organizar la distribución técnica de cargas de trabajo en el equipo de analistas.",
        "Realizar el control de calidad preliminar a los expedientes antes de ser elevados al Gestor.",
        "Monitorear el cumplimiento de metas operativas y cronogramas de campañas institucionales.",
        "Servir de enlace operativo entre el nivel técnico y las jefaturas de división.",
        "Identificar fallas recurrentes en la sustanciación de expedientes y proponer mejoras técnicas.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título tecnológico o aprobación del pénsum académico completo de pregrado en NBC afines.",
      nbc: ["Administración", "Contaduría Pública", "Derecho y afines", "Economía", "Ingenierías"],
      experiencia: "Dos (2) a tres (3) años de experiencia laboral relacionada.",
      equivalencias: true,
      competenciasFuncionales: [
        "Coordinación operativa de equipos técnicos",
        "Control de calidad de expedientes administrativos",
        "Procedimiento tributario y aduanero",
        "Gestión de indicadores de rendimiento",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Liderazgo de grupos de trabajo", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Distribuir expedientes con criterios de equidad y complejidad.",
        "Devolver con observaciones fundadas los expedientes incompletos o errados.",
        "Asegurar que los términos de ley se cumplan con margen de seguridad.",
      ],
      youDont: [
        "Asumir la firma o delegación legal reservada al nivel profesional.",
        "Favorecer a compañeros o contribuyentes en la asignación de casos.",
        "Permitir cuellos de botella que afecten las metas del área.",
      ],
      vsOthers:
        "Vértice del nivel técnico. Articulas el esfuerzo operativo de los Analistas para que los Gestores reciban insumos impecables.",
    },
    examFocus: [
      "Control de términos perentorios en cobro, fiscalización y devoluciones.",
      "Calidad probatoria y archivo de expedientes judiciales y administrativos.",
      "Liderazgo, trabajo en equipo y comunicación efectiva en el servicio público.",
      "Código de Integridad nivel 4.",
    ],
    functionGuides: guidesFromTopics(
      ["ficha-empleo", "rol-gestor", "cpaca", "sistema-tributario", ...SHARED_MODULE_IDS],
      analistaIiiNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "rol-gestor",
      "cpaca",
      "sistema-tributario",
      "estructura-dian",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "gestor-i-fiscalizacion",
    family: "gestor",
    shortLabel: "Gestor I Fiscalización",
    processLabel: "Fiscalización e investigación tributaria",
    blurb:
      "Nivel profesional (Código 301, Grado 01). Programas de control extensivo, emplazamientos para declarar y proyectos de requerimiento especial.",
    ficha: {
      opec: "236848",
      denominacion: "Gestor I",
      codigo: "301",
      grado: "01",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización tributaria",
      subproceso: "Investigación y determinación de obligaciones",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Adelantar investigaciones tributarias y programas de fiscalización masiva, evaluando declaraciones y proyectando requerimientos especiales y pliegos de cargos.",
      funciones: [
        "Planear y ejecutar programas de fiscalización a omisos e inexactos.",
        "Evaluar la contabilidad, libros y documentos de contribuyentes investigados.",
        "Proyectar requerimientos ordinarios y pliegos de cargos por no enviar información (art. 651 E.T.).",
        "Analizar las respuestas y pruebas aportadas a los emplazamientos tributarios.",
        "Coordinar técnicamente con el equipo de analistas asignado a la investigación.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en NBC de Contaduría Pública, Derecho, Administración, Economía o Ingenierías afines.",
      nbc: ["Contaduría Pública", "Derecho y afines", "Economía", "Administración"],
      experiencia: "Sin experiencia previa o la señalada en la OPEC específica.",
      equivalencias: true,
      competenciasFuncionales: [
        "Fiscalización y procedimiento tributario",
        "Contabilidad fiscal y examen de libros",
        "Régimen probatorio tributario",
        "Sanciones tributarias y pliegos de cargos",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Formular las glosas con base en normas tributarias expresas.",
        "Evaluar las pruebas contables aportadas en el expediente.",
        "Proyectar actos respetando los términos de firmeza de las declaraciones.",
      ],
      youDont: [
        "Proponer sanciones desproporcionadas o sin sustento normativo.",
        "Aceptar acuerdos informales o pagos no oficiales de contribuyentes.",
        "Dilatar la investigación hasta que opere la prescripción.",
      ],
      vsOthers:
        "Profesional de investigación fiscal. Eres el responsable de fundamentar con solidez probatoria cada glosa antes del requerimiento especial.",
    },
    examFocus: [
      "Art. 651 E.T.: sanción por no enviar información o enviarla con errores.",
      "Término de firmeza general de declaraciones (art. 714 E.T.) y firmeza con beneficio de auditoría (art. 689-3).",
      "Presunciones en materia tributaria (arts. 755 y ss. E.T.).",
      "Código de Integridad: Imparcialidad y Honestidad.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "rol-gestor",
        "fiscalizacion-determinacion",
        "control-extensivo",
        ...SHARED_MODULE_IDS,
      ],
      gestorFiscalNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "rol-gestor",
      "fiscalizacion-determinacion",
      "control-extensivo",
      "sistema-tributario",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "gestor-iii-grandes-contribuyentes",
    family: "gestor",
    shortLabel: "Gestor III",
    processLabel: "Grandes Contribuyentes y fiscalización internacional",
    blurb:
      "Nivel profesional superior (Código 303, Grado 03). Auditoría a Grandes Contribuyentes, precios de transferencia, operaciones internacionales y planificación fiscal agresiva.",
    ficha: {
      opec: "236858",
      denominacion: "Gestor III",
      codigo: "303",
      grado: "03",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización tributaria y aduanera",
      subproceso: "Grandes Contribuyentes y fiscalización internacional",
      aplicacion: "Dirección Operativa de Grandes Contribuyentes y Nivel Central",
      proposito:
        "Liderar investigaciones y auditorías tributarias y aduaneras de alta complejidad económica en Grandes Contribuyentes, régimen de precios de transferencia y operaciones internacionales.",
      funciones: [
        "Adelantar auditorías integrales a Grandes Contribuyentes calificados por la DIAN.",
        "Evaluar informes locales, archivos maestros y declaraciones informativas de precios de transferencia (art. 260-1 y ss.).",
        "Investigar esquemas de abuso en materia tributaria y planificación fiscal agresiva (art. 869 E.T.).",
        "Proyectar requerimientos especiales y liquidaciones oficiales en expedientes de gran cuantía económica.",
        "Atender controversias internacionales bajo convenios de doble imposición (CDI).",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en NBC afines y título de posgrado (especialización o maestría) en tributación, derecho, finanzas o auditoría.",
      nbc: ["Contaduría Pública", "Derecho y afines", "Economía", "Administración"],
      experiencia: "Tres (3) años de experiencia profesional relacionada o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Régimen de Grandes Contribuyentes",
        "Precios de transferencia y fiscalización internacional",
        "Cláusula general antiautolavado y antiabuso (art. 869 E.T.)",
        "Convenios para Evitar la Doble Imposición (CDI)",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
        { nombre: "Pensamiento analítico y estratégico", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Analizar transacciones transfronterizas y partes vinculadas con rigor metodológico.",
        "Aplicar los métodos de precios de transferencia (precio comparable no controlado, precio de reventa, etc.).",
        "Sustentar la recaracterización de operaciones en casos de abuso tributario.",
      ],
      youDont: [
        "Emitir fallos o conceptos sin confrontar la doctrina internacional OCDE y la ley colombiana.",
        "Transigir sobre créditos fiscales millonarios sin las autorizaciones legales.",
        "Filtrar información confidencial amparada por convenios bilaterales.",
      ],
      vsOthers:
        "Máximo nivel de auditoría económica y corporativa en la DIAN. Tratas con las empresas más representativas del país.",
    },
    examFocus: [
      "Art. 260-1 a 260-11 E.T.: régimen y métodos de precios de transferencia.",
      "Art. 869 E.T.: cláusula general antiabuso y procedimiento de recalificación.",
      "Convenios de doble imposición (CDI) y Modelo de Convenio Tributario OCDE.",
      "Código de Integridad nivel 4 ante presiones corporativas de gran escala.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "rol-gestor",
        "fiscalizacion-determinacion",
        "principios-contables-financieros",
        "sistema-tributario",
        ...SHARED_MODULE_IDS,
      ],
      gestorFiscalNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "rol-gestor",
      "fiscalizacion-determinacion",
      "principios-contables-financieros",
      "sistema-tributario",
      "estructura-dian",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "gestor-iv-doctrina",
    family: "gestor",
    shortLabel: "Gestor IV",
    processLabel: "Doctrina jurídica y coordinación misional",
    blurb:
      "Máximo nivel profesional (Código 304, Grado 04). Unificación de doctrina tributaria, coordinación técnica de directrices y fallos de máxima cuantía.",
    ficha: {
      opec: "236859",
      denominacion: "Gestor IV",
      codigo: "304",
      grado: "04",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "ESTRATÉGICO Y MISIONAL: Seguridad jurídica y coordinación",
      subproceso: "Doctrina tributaria, aduanera y cambiaria",
      aplicacion: "Dirección de Gestión Jurídica y Nivel Central",
      proposito:
        "Coordinar y dirigir la unificación de criterios técnicos y doctrinales, proyectando conceptos de obligatoria aplicación y resolviendo controversias de máxima jerarquía.",
      funciones: [
        "Proyectar conceptos jurídicos vinculantes en interpretación de normas tributarias, aduaneras y de comercio exterior.",
        "Unificar la doctrina institucional frente a fallos del Consejo de Estado y la Corte Constitucional.",
        "Dirigir la defensa judicial de la DIAN en demandas de nulidad de gran impacto fiscal.",
        "Coordinar mesas de trabajo interinstitucionales con Ministerios y entes de control.",
        "Asesorar a la Dirección General en reformas normativas y decretos reglamentarios.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en Derecho, Contaduría o Economía y título de maestría o posgrado afín.",
      nbc: ["Derecho y afines", "Contaduría Pública", "Economía"],
      experiencia: "Cuatro (4) años de experiencia profesional relacionada o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Doctrina y jurisprudencia tributaria y aduanera",
        "Hermeneútica jurídica y técnica normativa",
        "Litigio contencioso administrativo de alta complejidad",
        "Unificación de criterios institucionales",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Liderazgo técnico y estratégico", nivel: 4 },
        { nombre: "Comunicación asertiva y argumentativa", nivel: 4 },
        { nombre: "Orientación al logro", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Garantizar la coherencia y estabilidad jurídica de los pronunciamientos de la DIAN.",
        "Revisar y unificar conceptos divergentes entre seccionales.",
        "Defender con solvencia técnica la constitucionalidad de las normas fiscales.",
      ],
      youDont: [
        "Emitir conceptos particulares con carácter vinculante general sin competencia.",
        "Modificar doctrina para favorecer intereses particulares en litigio.",
        "Ignorar sentencias de unificación del Consejo de Estado.",
      ],
      vsOthers:
        "Máxima autoridad técnica en doctrina y legalidad. Tus conceptos orientan la actuación de todos los funcionarios de la entidad.",
    },
    examFocus: [
      "Art. 131 Ley 2010 de 2019: carácter vinculante de los conceptos de la DIAN para los funcionarios.",
      "Jurisprudencia constitucional y del Consejo de Estado sobre debido proceso y principio de legalidad tributaria.",
      "CPACA: recursos, excepciones, revocatoria directa y medios de control judicial.",
      "Código de Integridad nivel 4: Rectitud y Justicia.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "rol-gestor",
        "cpaca",
        "constitucion-funcion",
        "sistema-tributario",
        ...SHARED_MODULE_IDS,
      ],
      gestorFiscalNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "rol-gestor",
      "cpaca",
      "constitucion-funcion",
      "sistema-tributario",
      "estructura-dian",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "inspector-i-aduanas",
    family: "inspector",
    shortLabel: "Inspector I Aduanas",
    processLabel: "Inspección física y control en frontera",
    blurb:
      "Nivel profesional (Código 301, Grado 01). Inspección física de mercancías, aforo aduanero y verificación de cumplimiento arancelario en zona primaria.",
    ficha: {
      opec: "236862",
      denominacion: "Inspector I",
      codigo: "301",
      grado: "01",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Operación aduanera",
      subproceso: "Inspección física, documental y control de carga",
      aplicacion: "Puertos, Aeropuertos y Seccionales de Aduanas",
      proposito:
        "Realizar inspecciones físicas y documentales de mercancías en operaciones aduaneras de importación, exportación y tránsito, verificando peso, cantidad y arancel.",
      funciones: [
        "Efectuar la inspección física de contenedores y cargas en depósitos y zonas primarias.",
        "Confrontar la mercancía física contra la factura comercial, lista de empaque y declaración aduanera.",
        "Verificar el estado, cantidad, descripción arancelaria y seriales de los bienes inspeccionados.",
        "Levantar actas de inspección física dejando constancia inmediata de faltantes, sobrantes o irregularidades.",
        "Proyectar autos de suspensión de levante cuando se configuren dudas sobre el origen o la valoración.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en Comercio Exterior, Negocios Internacionales, Derecho, Administración o afines.",
      nbc: ["Administración", "Derecho y afines", "Economía", "Ingeniería Industrial y afines"],
      experiencia: "Sin experiencia previa o la señalada en la OPEC específica.",
      equivalencias: true,
      competenciasFuncionales: [
        "Régimen de aduanas y desaduanamiento",
        "Técnicas de inspección física de mercancías",
        "Clasificación arancelaria y reglas generales de interpretación",
        "Valoración aduanera (Acuerdo OMC)",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Diligencia y atención al detalle", nivel: 3 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Trabajo en equipo", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Verificar físicamente la carga y registrar minuciosamente los números de precinto.",
        "Actar las inconsistencias en el sistema de manera transparente.",
        "Garantizar la seguridad e integridad de la mercancía durante la diligencia.",
      ],
      youDont: [
        "Recibir muestras, propinas, comidas o dádivas de importadores o agentes de aduana.",
        "Autorizar el levante de mercancías con descripción errónea o incompleta sin saneamiento.",
        "Delegar la inspección en personas ajenas a la institución.",
      ],
      vsOthers:
        "Ojos y presencia de la DIAN en muelle y bodega. De tu inspección rigurosa depende que no entre contrabando al país.",
    },
    examFocus: [
      "Decreto 1165 de 2019 y Decreto 659 de 2024: proceso de inspección aduanera y causales de suspensión.",
      "Aprehensión y decomiso: causales taxativas y acta de aprehensión.",
      "Reglas Generales de Interpretación del Arancel de Aduanas (RGI 1 a 6).",
      "Ética e integridad nivel 4 frente a riesgos en puertos y pasos fronterizos.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "inspeccion-visitas",
        "sistema-tributario",
        "estructura-dian",
        ...SHARED_MODULE_IDS,
      ],
      inspectorNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "inspeccion-visitas",
      "sistema-tributario",
      "estructura-dian",
      "cobro-coactivo",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "inspector-iii-operaciones",
    family: "inspector",
    shortLabel: "Inspector III Operaciones Especiales",
    processLabel: "Operativos de fiscalización en terreno",
    blurb:
      "Nivel profesional superior (Código 303, Grado 03). Visitas tributarias integrales, inspecciones contables judiciales y control cambiario en puertos y zonas francas.",
    ficha: {
      opec: "236865",
      denominacion: "Inspector III",
      codigo: "303",
      grado: "03",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización tributaria y aduanera",
      subproceso: "Inspecciones complejas, operativos y control cambiario",
      aplicacion: "Niveles Central y Seccional",
      proposito:
        "Planear y ejecutar visitas de inspección tributaria y aduanera de alta complejidad en terreno, levantando actas con plena validez probatoria y custodia de evidencias.",
      funciones: [
        "Liderar visitas de inspección tributaria integral a establecimientos de comercio y domicilios fiscales.",
        "Practicar inspecciones contables judiciales con examen directo de libros y sistemas electrónicos (art. 779 E.T.).",
        "Ejecutar controles cambiarios en casas de cambio, aeropuertos y zonas de frontera (D. 2245/2011).",
        "Dirigir la recolección de pruebas digitales, respaldos informáticos y cadena de custodia.",
        "Redactar informes técnicos probatorios concluyentes para la formulación de requerimientos especiales.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en NBC afines y experiencia profesional relacionada.",
      nbc: ["Contaduría Pública", "Derecho y afines", "Economía", "Administración"],
      experiencia: "Tres (3) años de experiencia profesional relacionada o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Inspección tributaria y contable (art. 779 E.T.)",
        "Régimen cambiario y control de divisas",
        "Cadena de custodia de evidencias y pruebas digitales",
        "Procedimiento sancionatorio tributario y aduanero",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Firmeza y resolución de conflictos", nivel: 4 },
        { nombre: "Comunicación efectiva", nivel: 3 },
        { nombre: "Diligencia y trabajo en terreno", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Notificar el auto que ordena la diligencia antes de iniciar la inspección.",
        "Dejar constancia detallada de los libros exhibidos o la renuencia a exhibirlos.",
        "Asegurar los medios probatorios electrónicos con sellos de seguridad.",
      ],
      youDont: [
        "Practicar inspecciones sin acto administrativo que las faculte expresamente.",
        "Adelantar acuerdos económicos en el lugar de la visita.",
        "Violentar el domicilio o exceder los límites del objeto de la visita.",
      ],
      vsOthers:
        "Investigador principal de campo. Sin tu acta rigurosa, el Gestor no puede sostener la liquidación de revisión en juzgado.",
    },
    examFocus: [
      "Art. 779 E.T.: formalidades de la inspección tributaria y acta de visita.",
      "Art. 654 y 655 E.T.: sanción por irregularidades en la contabilidad y no exhibición de libros.",
      "Régimen sancionatorio cambiario (Decreto 2245 de 2011).",
      "Código de Integridad: Firmeza absoluta frente a presiones en campo.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "inspeccion-visitas",
        "fiscalizacion-determinacion",
        "sistema-tributario",
        ...SHARED_MODULE_IDS,
      ],
      inspectorNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "inspeccion-visitas",
      "fiscalizacion-determinacion",
      "sistema-tributario",
      "estructura-dian",
      ...SHARED_MODULE_IDS,
    ],
  },
  {
    id: "inspector-iv-control",
    family: "inspector",
    shortLabel: "Inspector IV Lucha contra el Contrabando",
    processLabel: "Control aduanero e interdicción",
    blurb:
      "Máximo nivel de inspección (Código 304, Grado 04). Dirección de operativos especiales contra el contrabando, decomiso masivo y coordinación interinstitucional.",
    ficha: {
      opec: "236868",
      denominacion: "Inspector IV",
      codigo: "304",
      grado: "04",
      nivel: "Nivel Profesional",
      tipoEmpleo: "Carrera Administrativa",
      proceso: "MISIONAL: Fiscalización aduanera y control",
      subproceso: "Operativos especiales, interdicción y decomiso",
      aplicacion: "Dirección de Fiscalización Aduanera y Seccionales de Frontera",
      proposito:
        "Dirigir y coordinar operativos estratégicos de interdicción aduanera y control tributario contra la evasión y el contrabando, articulando acciones con autoridades de control.",
      funciones: [
        "Planear y dirigir operativos de control aduanero en vías de comunicación, bodegas y centros comerciales.",
        "Articular operativos conjuntos con la Policía Fiscal y Aduanera (POLFA), Fiscalía y DIJIN.",
        "Coordinar la aprehensión y traslado de cargamentos de contrabando a los recintos oficiales de almacenamiento.",
        "Garantizar la cadena de custodia y los inventarios exactos de las mercancías aprehendidas.",
        "Elaborar informes de inteligencia y riesgo para neutralizar rutas de contrabando.",
        "Las funciones comunes de planta.",
      ],
      estudios:
        "Título profesional en NBC afines y título de posgrado en aduanas, seguridad, derecho o afín.",
      nbc: ["Derecho y afines", "Administración", "Economía", "Ingeniería Industrial y afines"],
      experiencia: "Cuatro (4) años de experiencia profesional relacionada o según OPEC.",
      equivalencias: true,
      competenciasFuncionales: [
        "Operativos de control e interdicción aduanera",
        "Procedimiento de aprehensión y decomiso de mercancías",
        "Coordinación interinstitucional de seguridad y control",
        "Gestión de riesgos aduaneros e inteligencia fiscal",
      ],
      competenciasComportamentales: [
        { nombre: "Comportamiento ético", nivel: 4 },
        { nombre: "Liderazgo de operativos de alto riesgo", nivel: 4 },
        { nombre: "Toma de decisiones bajo presión", nivel: 4 },
        { nombre: "Comunicación efectiva", nivel: 3 },
      ],
    },
    rolBoundary: {
      youDo: [
        "Liderar la diligencia con estricto apego a los derechos humanos y el debido proceso.",
        "Verificar el inventario detallado de cada ítem aprehendido en el acta.",
        "Entregar formalmente la mercancía al depósito oficial con acta y sello.",
      ],
      youDont: [
        "Apropiarse de mercancías o permitir su sustracción en el operativo.",
        "Realizar operativos sin la orden o coordinación debida.",
        "Pactar con contrabandistas o delincuentes bajo ninguna circunstancia.",
      ],
      vsOthers:
        "Máximo rango de inspección en campo. Comandas la acción frontal del Estado colombiano contra el contrabando.",
    },
    examFocus: [
      "Ley 1762 de 2015 (Ley Anticontrabando): tipos penales, agravantes y competencias.",
      "Decreto 1165 de 2019: trámite de aprehensión, pruebas, allanamiento y decomiso.",
      "Acta de aprehensión: requisitos formales de validez jurídica.",
      "Código de Integridad nivel 4: Honestidad y Diligencia en situaciones de alto riesgo.",
    ],
    functionGuides: guidesFromTopics(
      [
        "ficha-empleo",
        "inspeccion-visitas",
        "sistema-tributario",
        "estructura-dian",
        ...SHARED_MODULE_IDS,
      ],
      inspectorNotes,
    ),
    moduleIds: [
      "ficha-empleo",
      "inspeccion-visitas",
      "sistema-tributario",
      "estructura-dian",
      "cobro-coactivo",
      ...SHARED_MODULE_IDS,
    ],
  },
];

export const ALLOWED_MODULE_IDS = [
  ...ALL_MODULE_IDS,
  "rol-gestor",
  "fiscalizacion-determinacion",
  "inspeccion-visitas",
];

export function catalogCargo(id: string): CargoProfile | undefined {
  return CATALOG.find((c) => c.id === id);
}

export function familyLabel(family: CargoFamily) {
  if (family === "analista") return "Analista";
  if (family === "gestor") return "Gestor";
  if (family === "inspector") return "Inspector";
  if (family === "facilitador") return "Facilitador";
  return "Otro";
}
