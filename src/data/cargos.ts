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

function guidesFromTopics(
  moduleIds: string[],
  roleNotes: Record<string, string>,
): FunctionGuide[] {
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
  "cobro-persuasivo":
    "Tú clasificas, contactas y registras. No decretas cautelares ni ‘perdonas’.",
  "cobro-coactivo":
    "Verificas expediente y proyectas. El mandamiento lo libra quien tenga competencia; tú impulsas el trámite.",
  "medidas-cautelares":
    "Apoyas la investigación de bienes y el registro. No ‘negocias’ el alzamiento.",
  "devoluciones-compensaciones":
    "Apoyas el trámite y la cuenta corriente. No giras por fuera del procedimiento.",
  "recaudo-ear":
    "Concilias reportes y corriges recibos. Nunca recibes efectivo.",
  "control-extensivo":
    "Orientas frente al requerimiento de campaña. No adelantas el acto.",
  "procesos-concursales":
    "Detectas el concurso y reportas. No sigues el remate como si nada.",
  "razonamiento-matematico":
    "Cálculos exactos sin calculadora: sanciones, intereses moratorios, retenciones y lectura analítica de tablas de recaudo.",
  "principios-contables-financieros":
    "Confrontas el devengo contable con la regla fiscal, interpretas estados financieros y conciliaciones fiscales (772-1).",
  "estructura-dian":
    "Conoces las Direcciones de Gestión y Seccionales (D. 1742/2020 y D. 412/2024); identificas la autoridad competente para cada acto.",
  "ofimatica-dian":
    "Manejas Excel para cruces y tablas dinámicas de cartera, respetas plantillas oficiales y reservas del sistema Muisca.",
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
  "recaudo-ear":
    "Exiges conciliación antes de firmar un cobro con pago alegado.",
  "control-extensivo":
    "Diriges la campaña y el criterio único de orientación. No asesorías privadas.",
  "procesos-concursales":
    "Reorientas el cobro y presentas la acreencia. No condonas.",
  "rol-gestor":
    "Asigna, revisa, deja instrucción escrita. No firmes sin competencia ni hagas el oficio del Analista para lucirte.",
};

const analistaFiscalNotes: Record<string, string> = {
  "ficha-empleo":
    "Analista II de fiscalización: armas el expediente, cruces y proyectos. No profieres la liquidación.",
  "fiscalizacion-determinacion":
    "Preparas hechos, pruebas y glosas del requerimiento. El Gestor decide el acto.",
  "control-extensivo":
    "Ejecutas cruces masivos y emplazamientos de campaña, con el mismo mensaje.",
  "inspeccion-visitas":
    "Si te asignan apoyo de visita, registras. No determinas en el predio.",
};

const gestorFiscalNotes: Record<string, string> = {
  "ficha-empleo":
    "Gestor de fiscalización: decides el programa del expediente y proyectas o suscribes el requerimiento y la liquidación según competencia.",
  "fiscalizacion-determinacion":
    "No saltes el requerimiento especial. Controla el término de respuesta (3 meses) y el de liquidar.",
  "control-extensivo":
    "El emplazamiento 705 no te ahorra el 703 cuando va revisión.",
  "rol-gestor":
    "Calidad del expediente antes del acto. El Analista arma; tú glosas y decides.",
};

const inspectorNotes: Record<string, string> = {
  "ficha-empleo":
    "Inspector: pruebas y hechos. No liquidas ni cobras en la visita.",
  "inspeccion-visitas":
    "Identifícate, respeta el objeto, acta los hechos, rechaza dádivas, traslada.",
  "fiscalizacion-determinacion":
    "Tu acta alimenta el requerimiento. No adelantes la liquidación.",
  "control-extensivo":
    "Si la visita nace de un programa masivo, no improvises un objeto distinto.",
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
    functionGuides: guidesFromTopics(
      [...CARTERA_MODULE_IDS, "rol-gestor"],
      gestorCarteraNotes,
    ),
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
    functionGuides: guidesFromTopics(
      [...CARTERA_MODULE_IDS, "rol-gestor"],
      gestorCarteraNotes,
    ),
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
    blurb:
      "Practica visitas, recoge pruebas y deja actas. No determina el tributo en el predio.",
    ficha: {
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
      estudios: "Título de formación técnica profesional o aprobación de estudios tecnológicos afines.",
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
    functionGuides: guidesFromTopics(
      ["ficha-empleo", ...SHARED_MODULE_IDS],
      analistaCarteraNotes,
    ),
    moduleIds: ["ficha-empleo", ...SHARED_MODULE_IDS],
  },
  {
    id: "facilitador-iii-servicio",
    family: "facilitador",
    shortLabel: "Facilitador III",
    processLabel: "Servicio y ventanilla única",
    blurb:
      "Nivel asistencial (Código 103). Atención presencial al ciudadano, radicación de PQRSF, gestión de correspondencia y apoyo logístico.",
    ficha: {
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
        "ficha-empleo": "Facilitador III: nivel asistencial. Radicas, atiendes y custodias. No decides de fondo.",
        "servicio-pqrsf": "Atención empática, cumplimiento estricto de términos de ley y cero asesoría privada.",
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
      "comportamiento-etico",
      "comunicacion-equipo",
      "codigo-integridad",
      "valores-cinco",
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
      "comportamiento-etico",
      "comunicacion-equipo",
      "codigo-integridad",
      "valores-cinco",
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
      estudios: "Título profesional en Comercio Exterior, Derecho, Administración, Economía o afines.",
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
      estudios: "Título profesional en Derecho y título de posgrado en Derecho Tributario, Administrativo o afín.",
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
        "cpaca": "CPACA: debido proceso, recursos y caducidad de acciones contenciosas.",
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
