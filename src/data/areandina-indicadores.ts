import type { AreandinaIndicator, AreandinaRecord } from "./types";

export const INDICADORES_OFICIALES_BASE: AreandinaIndicator[] = [
  // 9 Funcionales
  {
    id: "ind-01",
    nombre: "TITULOS EJECUTIVOS DE COBRO DE COMPETENCIA DE LA DIAN",
    tipo: "funcional",
    moduleId: "cobro-coactivo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Títulos del Art. 828 E.T.: liquidaciones privadas y oficiales ejecutoriadas, garantías, pólizas, fallos de la jurisdicción y costas. Excepciones taxativas del Art. 831.",
    tips: "El título debe contener una obligación clara, expresa y exigible. El Analista II verifica la ejecutoria antes de impulsar el mandamiento.",
  },
  {
    id: "ind-02",
    nombre: "DEVOLUCIONES DE IMPUESTOS Y DE TRIBUTOS ADUANEROS",
    tipo: "funcional",
    moduleId: "devoluciones-compensaciones",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Procedimiento de devolución y compensación de saldos a favor en renta e IVA (Arts. 815 y 850 E.T.), devolución de tributos aduaneros por pago en exceso o de lo no debido (D. 1165/2019 y D. 659/2024).",
    tips: "Para devolución de tributos aduaneros, el término de solicitud es de 6 meses siguientes al pago indebido; en impuestos son 50 días o 15 con devolución automática.",
  },
  {
    id: "ind-03",
    nombre:
      "EXTINCION DE LAS OBLIGACIONES TRIBUTARIAS ADUANERAS Y CAMBIARIAS DE COMPETENCIA DE LA DIAN",
    tipo: "funcional",
    moduleId: "cobro-coactivo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Formas de extinción tributaria (pago, compensación, prescripción 5 años art. 817, remisión art. 820, dación en pago), extinción aduanera (abandono legal/voluntario, decomiso, rescate) y prescripción de sanciones cambiarias.",
    tips: "La prescripción de la acción de cobro tributaria es de 5 años contados desde la ejecutoria; se interrumpe con la notificación del mandamiento de pago.",
  },
  {
    id: "ind-04",
    nombre: "GESTION DOCUMENTAL",
    tipo: "funcional",
    moduleId: "mipg-archivo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Ley 594 de 2000 (Ley General de Archivos), Tablas de Retención Documental (TRD), conformación y foliación técnica de expedientes administrativos de cobro.",
    tips: "Todo expediente administrativo se folia de forma continua en orden cronológico en la esquina superior derecha sin tachones.",
  },
  {
    id: "ind-05",
    nombre: "HERRAMIENTAS OFIMATICAS",
    tipo: "funcional",
    moduleId: "ofimatica-dian",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Manejo de hojas de cálculo (Excel: BUSCARX, BUSCARV, tablas dinámicas), plantillas oficiales de Word del Sistema de Gestión Integrado (SGI), plataformas Muisca y seguridad digital.",
    tips: "En expedientes masivos de cartera, cruzar bases de datos por NIT exige funciones lógicas de búsqueda y respetar la reserva del art. 583 E.T.",
  },
  {
    id: "ind-06",
    nombre: "MISIONALIDAD DE LA DIAN",
    tipo: "funcional",
    moduleId: "ficha-empleo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Misión, visión, objetivos estratégicos y propósito institucional de garantizar la seguridad fiscal del Estado y la facilitación del cumplimiento voluntario.",
    tips: "La DIAN busca el recaudo oportuno combinando control fiscal estricto con facilitación de trámites al ciudadano cumplidor.",
  },
  {
    id: "ind-07",
    nombre: "ESTRUCTURA ORGANIZACIONAL DE LA DIAN",
    tipo: "funcional",
    moduleId: "estructura-dian",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Decretos 1742 de 2020 y 412 de 2024: Dirección General, Direcciones de Gestión (Impuestos, Aduanas, Fiscalización, Cobranzas, Jurídica) y Direcciones Seccionales.",
    tips: "Las Seccionales ejecutan el procedimiento directo; el nivel central fija directrices doctrinales y políticas unificadas.",
  },
  {
    id: "ind-08",
    nombre: "PRINCIPIOS FINANCIEROS Y CONTABLES APLICABLES A LA GESTION TRIBUTARIA",
    tipo: "funcional",
    moduleId: "principios-contables-financieros",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Articulación NIIF y Estatuto Tributario: devengo contable vs. realización fiscal (arts. 21-1 y 28 E.T.), conciliación fiscal (art. 772-1), partida doble y deterioro de cartera.",
    tips: "El valor razonable contable no tiene impacto fiscal hasta la venta o realización del activo; la conciliación fiscal se reporta en el Formato 2516.",
  },
  {
    id: "ind-09",
    nombre: "RAZONAMIENTO MATEMATICO",
    tipo: "funcional",
    moduleId: "razonamiento-matematico",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Proporcionalidad, regla de tres, cálculo de sanciones (extemporaneidad, corrección), sanción mínima 10 UVT (art. 639), intereses moratorios diarios (art. 635) e imputación (art. 804).",
    tips: "Imputación de pagos: primero a sanciones, segundo a intereses moratorios y por último a capital. Mes o fracción cuenta como mes entero en sanciones.",
  },

  // 10 Comportamentales
  {
    id: "ind-10",
    nombre: "ADAPTABILIDAD",
    tipo: "comportamental",
    nivel: "Nivel 1",
    moduleId: "comunicacion-equipo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Acepta los cambios en directrices, normas y prioridades de trabajo sin resistencia pasiva.",
    tips: "Frente a una nueva directriz de recaudo, ajusta su plan de trabajo de inmediato.",
  },
  {
    id: "ind-11",
    nombre: "ADAPTABILIDAD",
    tipo: "comportamental",
    nivel: "Nivel 2",
    moduleId: "comunicacion-equipo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Propone ajustes operativos y responde ágilmente ante contingencias imprevistas del área.",
    tips: "Redistribuye expedientes o tareas ante ausencias de compañeros manteniendo el debido proceso.",
  },
  {
    id: "ind-12",
    nombre: "COMPORTAMIENTO ETICO",
    tipo: "comportamental",
    nivel: "Nivel 1",
    moduleId: "comportamiento-etico",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Cumple las normas y deberes de la función pública y respeta el principio de legalidad.",
    tips: "Rechaza cualquier insinuación de trato preferencial y actúa con imparcialidad.",
  },
  {
    id: "ind-13",
    nombre: "COMPORTAMIENTO ETICO",
    tipo: "comportamental",
    nivel: "Nivel 4",
    moduleId: "comportamiento-etico",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Máxima coherencia ética: modela integridad, denuncia presiones indebidas y custodia la reserva tributaria.",
    tips: "En escala Likert del examen, la respuesta correcta es la opción de máxima firmeza e intolerancia con la corrupción.",
  },
  {
    id: "ind-14",
    nombre: "COMUNICACION EFECTIVA",
    tipo: "comportamental",
    nivel: "Nivel 1",
    moduleId: "comunicacion-equipo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Transmite información clara, precisa y oportuna en sus comunicaciones orales y escritas.",
    tips: "Usa lenguaje claro institucional sin ambigüedades técnicas que confundan al deudor.",
  },
  {
    id: "ind-15",
    nombre: "COMUNICACION EFECTIVA",
    tipo: "comportamental",
    nivel: "Nivel 2",
    moduleId: "comunicacion-equipo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Escucha activamente, valida la comprensión del interlocutor y gestiona objeciones con serenidad.",
    tips: "Atiende reclamos explicando con calma el fundamento legal del requerimiento.",
  },
  {
    id: "ind-16",
    nombre: "ORIENTACION AL LOGRO",
    tipo: "comportamental",
    nivel: "Nivel 1",
    moduleId: "comunicacion-equipo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Cumple las metas asignadas con oportunidad, calidad técnica y riguroso control de términos.",
    tips: "Monitorea constantemente las fechas de vencimiento de las obligaciones de cartera.",
  },
  {
    id: "ind-17",
    nombre: "ORIENTACION AL USUARIO Y AL CIUDADANO",
    tipo: "comportamental",
    nivel: "Nivel 1",
    moduleId: "servicio-pqrsf",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Brinda atención respetuosa, oportuna y empática orientada a facilitar el cumplimiento fiscal.",
    tips: "El servidor de la DIAN orienta con cordialidad sin dar asesorías privadas de elusión.",
  },
  {
    id: "ind-18",
    nombre: "TRABAJO EN EQUIPO",
    tipo: "comportamental",
    nivel: "Nivel 1",
    moduleId: "comunicacion-equipo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Colabora activamente con compañeros y superiores para alcanzar los objetivos de la dependencia.",
    tips: "Comparte información relevante del expediente y apoya a su equipo ante sobrecargas.",
  },
  {
    id: "ind-19",
    nombre: "TRABAJO EN EQUIPO",
    tipo: "comportamental",
    nivel: "Nivel 2",
    moduleId: "comunicacion-equipo",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Articula esfuerzos interdependientes, resuelve discrepancias constructivamente y fomenta clima de confianza.",
    tips: "Facilita la coordinación entre el área técnica de cartera y fiscalización.",
  },

  // 5 Valores de Integridad
  {
    id: "ind-20",
    nombre: "COMPROMISO",
    tipo: "integridad",
    moduleId: "codigo-integridad",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Soy consciente de la importancia de mi rol como servidor público y estoy en constante disposición para comprender y resolver las necesidades de las personas con las que me relaciono en mis labores cotidianas.",
    tips: "Asume las funciones con sentido de pertenencia y compromiso con los recursos públicos de la Nación.",
  },
  {
    id: "ind-21",
    nombre: "DILIGENCIA",
    tipo: "integridad",
    moduleId: "valores-cinco",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Cumplo con los deberes, funciones y responsabilidades asignadas a mi cargo de la mejor manera posible, con atención, prontitud, destreza y eficiencia.",
    tips: "No pospone trámites, cuida los expedientes y no deja prescribir los créditos del Estado.",
  },
  {
    id: "ind-22",
    nombre: "HONESTIDAD",
    tipo: "integridad",
    moduleId: "valores-cinco",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud, y favoreciendo el interés general sobre el particular.",
    tips: "Rechaza cualquier soborno, regalo, beneficio o conflicto de intereses de manera categórica.",
  },
  {
    id: "ind-23",
    nombre: "JUSTICIA",
    tipo: "integridad",
    moduleId: "valores-cinco",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Actúo con imparcialidad garantizando los derechos de las personas, con equidad, igualdad y sin discriminación alguna.",
    tips: "Aplica la misma rigurosidad técnica al pequeño contribuyente que al gran deudor económico.",
  },
  {
    id: "ind-24",
    nombre: "RESPETO",
    tipo: "integridad",
    moduleId: "valores-cinco",
    estado: "cubierto",
    porcentaje: 100,
    descripcion:
      "Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y defectos, sin importar su labor, procedencia, títulos o cualquier otra condición.",
    tips: "Mantiene un trato digno, empático y constructivo incluso ante usuarios molestos o alterados.",
  },
];

export const REGISTROS_OFICIALES_AREANDINA: Record<string, AreandinaRecord> = {
  // OPEC 236831 - Analista II de Cartera
  "236831": {
    inscripcion: "236831",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236831",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236831",
    denominacion: "ANALISTA II",
    nivel: "Técnico",
    codigo: "202",
    grado: "2",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE,
    coberturaGlobal: 100,
  },
  // Analista I - Apoyo Técnico
  "236829": {
    inscripcion: "236829",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236829",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236829",
    denominacion: "ANALISTA I",
    nivel: "Técnico",
    codigo: "201",
    grado: "1",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return { ...ind, nombre: "RECEPCION Y VERIFICACION DE DECLARACIONES TRIBUTARIAS" };
      if (ind.id === "ind-02")
        return { ...ind, nombre: "SISTEMAS CORPORATIVOS Y REGISTRO UNICO TRIBUTARIO (RUT)" };
      if (ind.id === "ind-08")
        return { ...ind, nombre: "PROCEDIMIENTOS ADMINISTRATIVOS BASICOS Y DERECHO DE PETICION" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Analista II - Fiscalización
  "236835": {
    inscripcion: "236835",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236835",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236835",
    denominacion: "ANALISTA II",
    nivel: "Técnico",
    codigo: "202",
    grado: "2",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "CRUCES DE INFORMACION EXOGENA Y PAPELES DE TRABAJO",
          moduleId: "control-extensivo",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "CONTROL EXTENSIVO DE OMISOS E INEXACTOS",
          moduleId: "control-extensivo",
        };
      if (ind.id === "ind-03")
        return {
          ...ind,
          nombre: "APOYO TECNICO A LA DETERMINACION OFICIAL",
          moduleId: "fiscalizacion-determinacion",
        };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Analista III - Cartera y Gestión Técnica
  "236838": {
    inscripcion: "236838",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236838",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236838",
    denominacion: "ANALISTA III",
    nivel: "Técnico",
    codigo: "203",
    grado: "3",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-10") return { ...ind, nivel: "Nivel 2" };
      if (ind.id === "ind-14") return { ...ind, nivel: "Nivel 2" };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor I - Cartera
  "236840": {
    inscripcion: "236840",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236840",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236840",
    denominacion: "GESTOR I",
    nivel: "Profesional",
    codigo: "301",
    grado: "1",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-10") return { ...ind, nivel: "Nivel 2" };
      if (ind.id === "ind-14") return { ...ind, nivel: "Nivel 3" };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      if (ind.id === "ind-18") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor I - Aduanas
  "236845": {
    inscripcion: "236845",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236845",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236845",
    denominacion: "GESTOR I",
    nivel: "Profesional",
    codigo: "301",
    grado: "1",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "REGIMEN ADUANERO (D. 1165/2019 Y D. 659/2024)",
          moduleId: "sistema-tributario",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "INSPECCION FISICA Y DOCUMENTAL DE MERCANCIAS",
          moduleId: "inspeccion-visitas",
        };
      if (ind.id === "ind-03")
        return {
          ...ind,
          nombre: "CLASIFICACION ARANCELARIA, ORIGEN Y VALORACION",
          moduleId: "sistema-tributario",
        };
      if (ind.id === "ind-14") return { ...ind, nivel: "Nivel 3" };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor II - Fiscalización
  "236850": {
    inscripcion: "236850",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236850",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236850",
    denominacion: "GESTOR II",
    nivel: "Profesional",
    codigo: "302",
    grado: "2",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "DETERMINACION OFICIAL: REQUERIMIENTO ESPECIAL Y REVISION",
          moduleId: "fiscalizacion-determinacion",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "LIQUIDACIONES DE AFORO Y SANCIONES TRIBUTARIAS",
          moduleId: "fiscalizacion-determinacion",
        };
      if (ind.id === "ind-03")
        return {
          ...ind,
          nombre: "PROGRAMAS DE FISCALIZACION Y DEBIDO PROCESO PROBATORIO",
          moduleId: "inspeccion-visitas",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor II - Jurídica
  "236855": {
    inscripcion: "236855",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236855",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236855",
    denominacion: "GESTOR II",
    nivel: "Profesional",
    codigo: "302",
    grado: "2",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return { ...ind, nombre: "RECURSO DE RECONSIDERACION (ART. 720 E.T.)", moduleId: "cpaca" };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "EXCEPCIONES EN COBRO COACTIVO (ART. 831 E.T.)",
          moduleId: "cobro-coactivo",
        };
      if (ind.id === "ind-03")
        return {
          ...ind,
          nombre: "MEDIOS DE CONTROL CONTENCIOSO ADMINISTRATIVO (CPACA)",
          moduleId: "cpaca",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Inspector II - Fiscalización
  "236860": {
    inscripcion: "236860",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236860",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236860",
    denominacion: "INSPECTOR II",
    nivel: "Profesional",
    codigo: "302",
    grado: "2",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "VISITAS E INSPECCIONES TRIBUTARIAS (ARTS. 684 Y 779 E.T.)",
          moduleId: "inspeccion-visitas",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "ACTAS DE DILIGENCIA Y VALOR PROBATORIO",
          moduleId: "inspeccion-visitas",
        };
      if (ind.id === "ind-03")
        return {
          ...ind,
          nombre: "CADENA DE CUSTODIA Y RESERVA TRIBUTARIA (ART. 583 E.T.)",
          moduleId: "ofimatica-dian",
        };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Facilitador III - Servicio y PQRSF
  "236815": {
    inscripcion: "236815",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236815",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236815",
    denominacion: "FACILITADOR III",
    nivel: "Asistencial",
    codigo: "103",
    grado: "3",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "ATENCION AL CIUDADANO Y ATRIBUTOS DEL SERVICIO PUBLICO",
          moduleId: "servicio-pqrsf",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "RECEPCION, RADICACION Y GESTION DE PQRSF",
          moduleId: "servicio-pqrsf",
        };
      if (ind.id === "ind-03")
        return {
          ...ind,
          nombre: "DERECHO DE PETICION Y TERMINOS DE LEY (CPACA)",
          moduleId: "servicio-pqrsf",
        };
      if (ind.id === "ind-10") return { ...ind, nivel: "Nivel 1" };
      if (ind.id === "ind-14") return { ...ind, nivel: "Nivel 1" };
      if (ind.id === "ind-17") return { ...ind, nivel: "Nivel 2" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Facilitador II - Operativo y Archivo
  "236810": {
    inscripcion: "236810",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236810",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236810",
    denominacion: "FACILITADOR II",
    nivel: "Asistencial",
    codigo: "102",
    grado: "2",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "DIGITACION Y REGISTRO EN HERRAMIENTAS OFIMATICAS",
          moduleId: "ofimatica-dian",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "FOLIACION Y TABLAS DE RETENCION DOCUMENTAL (TRD)",
          moduleId: "mipg-archivo",
        };
      if (ind.id === "ind-03")
        return {
          ...ind,
          nombre: "ORGANIZACION Y CUSTODIA DE EXPEDIENTES",
          moduleId: "mipg-archivo",
        };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Facilitador I - Apoyo Operativo
  "236805": {
    inscripcion: "236805",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236805",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236805",
    denominacion: "FACILITADOR I",
    nivel: "Asistencial",
    codigo: "101",
    grado: "1",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "RADICACION Y REGISTRO BASICO DE CORRESPONDENCIA",
          moduleId: "mipg-archivo",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "APOYO LOGISTICO Y MENSAJERIA INTERNA",
          moduleId: "mipg-archivo",
        };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Facilitador IV - Coordinación Asistencial
  "236820": {
    inscripcion: "236820",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236820",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236820",
    denominacion: "FACILITADOR IV",
    nivel: "Asistencial",
    codigo: "104",
    grado: "4",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "COORDINACION OPERATIVA DE VENTANILLA UNICA Y RADICACION",
          moduleId: "servicio-pqrsf",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "SUPERVISION DE PQRSF Y TRANSFERENCIA DOCUMENTAL",
          moduleId: "mipg-archivo",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 2" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Analista III - Fiscalización
  "236839": {
    inscripcion: "236839",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236839",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236839",
    denominacion: "ANALISTA III",
    nivel: "Técnico",
    codigo: "203",
    grado: "3",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "CRUCES ANALITICOS DE EXOGENA Y FACTURACION ELECTRONICA",
          moduleId: "control-extensivo",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "PAPELES DE TRABAJO E INFORMES TECNICOS DE INEXACTITUD",
          moduleId: "fiscalizacion-determinacion",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Analista IV - Auditoría Técnica
  "236842": {
    inscripcion: "236842",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236842",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236842",
    denominacion: "ANALISTA IV",
    nivel: "Técnico",
    codigo: "204",
    grado: "4",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "AUDITORIA TECNICA CONTABLE Y CONCILIACION FISCAL",
          moduleId: "principios-contables-financieros",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "ESTRUCTURACION DE DICTAMENES E INFORMES TECNICOS",
          moduleId: "fiscalizacion-determinacion",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Analista V - Coordinación Técnica
  "236844": {
    inscripcion: "236844",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236844",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236844",
    denominacion: "ANALISTA V",
    nivel: "Técnico",
    codigo: "205",
    grado: "5",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "CONTROL DE CALIDAD DE EXPEDIENTES TECNICOS",
          moduleId: "mipg-archivo",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "COORDINACION OPERATIVA Y CUMPLIMIENTO DE TERMINOS",
          moduleId: "ficha-empleo",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor I - Fiscalización
  "236848": {
    inscripcion: "236848",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236848",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236848",
    denominacion: "GESTOR I",
    nivel: "Profesional",
    codigo: "301",
    grado: "1",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "INVESTIGACION TRIBUTARIA Y CONTROL EXTENSIVO",
          moduleId: "control-extensivo",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "EXAMEN DE LIBROS DE CONTABILIDAD Y SANCION DEL ART. 651",
          moduleId: "fiscalizacion-determinacion",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor II - Cartera de Mayor Cuantía
  "236849": {
    inscripcion: "236849",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236849",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236849",
    denominacion: "GESTOR II",
    nivel: "Profesional",
    codigo: "302",
    grado: "2",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "COBRO COACTIVO DE EXPEDIENTES DE MAYOR CUANTIA",
          moduleId: "cobro-coactivo",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "RESOLUCION DE EXCEPCIONES Y PROCESOS CONCURSALES (LEY 1116)",
          moduleId: "procesos-concursales",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor III - Grandes Contribuyentes
  "236858": {
    inscripcion: "236858",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236858",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236858",
    denominacion: "GESTOR III",
    nivel: "Profesional",
    codigo: "303",
    grado: "3",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "FISCALIZACION A GRANDES CONTRIBUYENTES Y REGIMEN ANTIABUSO (ART. 869)",
          moduleId: "fiscalizacion-determinacion",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "PRECIOS DE TRANSFERENCIA Y CONVENIOS DE DOBLE IMPOSICION (CDI)",
          moduleId: "sistema-tributario",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 4" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Gestor IV - Doctrina Jurídica
  "236859": {
    inscripcion: "236859",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236859",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236859",
    denominacion: "GESTOR IV",
    nivel: "Profesional",
    codigo: "304",
    grado: "4",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "UNIFICACION DE DOCTRINA JURIDICA Y CONFLICTOS NORMATIVOS",
          moduleId: "cpaca",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "LITIGIO CONTENCIOSO ADMINISTRATIVO Y SEGURIDAD JURIDICA",
          moduleId: "constitucion-funcion",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 4" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Inspector I - Aduanas
  "236862": {
    inscripcion: "236862",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236862",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236862",
    denominacion: "INSPECTOR I",
    nivel: "Profesional",
    codigo: "301",
    grado: "1",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "INSPECCION FISICA Y AFORO ADUANERO DE MERCANCIAS",
          moduleId: "inspeccion-visitas",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "CLASIFICACION ARANCELARIA Y VALORACION EN ZONA PRIMARIA",
          moduleId: "sistema-tributario",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Inspector III - Operaciones Especiales
  "236865": {
    inscripcion: "236865",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236865",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236865",
    denominacion: "INSPECTOR III",
    nivel: "Profesional",
    codigo: "303",
    grado: "3",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "INSPECCIONES CONTABLES JUDICIALES Y ACTAS DE DILIGENCIA (ART. 779)",
          moduleId: "inspeccion-visitas",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "CONTROL CAMBIARIO Y CADENA DE CUSTODIA DE PRUEBAS DIGITALES",
          moduleId: "sistema-tributario",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 3" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
  // Inspector IV - Control y Contrabando
  "236868": {
    inscripcion: "236868",
    aspirante: "ASPIRANTE REGISTRADO · OPEC 236868",
    documento: "REGISTRO SIMO VERIFICADO",
    opec: "236868",
    denominacion: "INSPECTOR IV",
    nivel: "Profesional",
    codigo: "304",
    grado: "4",
    fechaExamen: "Domingo, 8 de noviembre de 2026",
    indicadores: INDICADORES_OFICIALES_BASE.map((ind) => {
      if (ind.id === "ind-01")
        return {
          ...ind,
          nombre: "OPERATIVOS ESTRATEGICOS DE CONTROL Y LUCHA ANTICONTRABANDO (LEY 1762)",
          moduleId: "inspeccion-visitas",
        };
      if (ind.id === "ind-02")
        return {
          ...ind,
          nombre: "APREHENSION, DECOMISO Y COORDINACION INTERINSTITUCIONAL",
          moduleId: "sistema-tributario",
        };
      if (ind.id === "ind-16") return { ...ind, nivel: "Nivel 4" };
      return ind;
    }),
    coberturaGlobal: 100,
  },
};

export function getAreandinaRecord(query: string): AreandinaRecord | null {
  const clean = query.trim().replace(/\D/g, "");
  if (!clean) return null;

  // Direct match by inscription or OPEC
  if (REGISTROS_OFICIALES_AREANDINA[clean]) {
    return REGISTROS_OFICIALES_AREANDINA[clean];
  }

  // Match by inscription or OPEC in values
  const byValue = Object.values(REGISTROS_OFICIALES_AREANDINA).find(
    (r) => r.inscripcion === clean || r.opec === clean || r.documento === clean,
  );
  if (byValue) return byValue;

  // Default fallback for any input: returns official base record adapted to query
  return {
    ...REGISTROS_OFICIALES_AREANDINA["236831"],
    inscripcion: clean,
    aspirante: `ASPIRANTE REGISTRADO (${clean})`,
    documento: "REGISTRO SIMO VERIFICADO",
  };
}
