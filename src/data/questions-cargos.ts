import type { Question } from "./types";

export const QUESTIONS_CARGOS: Question[] = [
  {
    id: "g01",
    track: "funcional",
    moduleId: "rol-gestor",
    kind: "sjt",
    caseText:
      "En cartera hay un lote de 40 títulos próximos a prescribir. El Analista II del grupo te pide que ‘tú mismo diligencies las citaciones’ porque vas más rápido. Eres Gestor I de cartera.",
    stem: "La conducta más alineada con tu empleo es",
    choices: [
      { id: "a", text: "diligenciar tú las 40 citaciones para cumplir la meta personal." },
      {
        id: "b",
        text: "priorizar el lote, asignar al Analista, revisar calidad del expediente y controlar el término de prescripción con rastro en el sistema.",
      },
      { id: "c", text: "archivar los de menor cuantía para no complicarse." },
      { id: "d", text: "firmar mandamientos en blanco ‘por si acaso se vencen hoy’." },
    ],
    correct: "b",
    explanation:
      "El Gestor coordina, prioriza y responde por el término. La ejecución del oficio de citación es del Analista. Mandamientos en blanco son vicio y falta grave.",
    source: "Manual de funciones · nivel profesional",
    difficulty: 2,
  },
  {
    id: "g02",
    track: "funcional",
    moduleId: "rol-gestor",
    kind: "sjt",
    caseText:
      "El jefe de división está en comisión. Un Analista te trae un mandamiento de pago listo. En tu ficha no aparece la competencia para librarlo; sí aparece proyectar y revisar.",
    stem: "Debes",
    choices: [
      { id: "a", text: "firmarlo tú, porque ‘alguien tiene que hacerlo’." },
      { id: "b", text: "dejarlo en el cajón hasta que vuelva el jefe, aunque prescriba." },
      {
        id: "c",
        text: "revisar el expediente y elevarlo a quien sí tiene competencia, dejando constancia del riesgo de prescripción.",
      },
      { id: "d", text: "pedirle al Analista que lo firme con tu visto bueno verbal." },
    ],
    correct: "c",
    explanation:
      "Firmar sin competencia vicia el acto (falta de competencia, excepción 831). Dejar prescribir viola diligencia. Se revisa, se eleva y se deja rastro.",
    source: "E.T. art. 824 y 831 · principio de competencia",
    difficulty: 2,
  },
  {
    id: "g03",
    track: "funcional",
    moduleId: "rol-gestor",
    kind: "knowledge",
    stem: "En el concurso 2676, la diferencia típica de grado entre Analista II y Gestor I es",
    choices: [
      { id: "a", text: "el Analista es nivel profesional y el Gestor es técnico." },
      {
        id: "b",
        text: "el Analista es nivel técnico (ejecuta labores técnicas) y el Gestor es nivel profesional (coordina, proyecta y decide según competencia).",
      },
      { id: "c", text: "no hay diferencia de funciones, solo de salario." },
      { id: "d", text: "el Gestor no presenta prueba funcional." },
    ],
    correct: "b",
    explanation:
      "Analista II: código 202, nivel técnico. Gestor I: código 301, nivel profesional. La prueba funcional se arma sobre el grado de responsabilidad del empleo.",
    source: "OPEC 2676 · Manual de funciones",
    difficulty: 1,
  },
  {
    id: "g04",
    track: "funcional",
    moduleId: "rol-gestor",
    kind: "sjt",
    caseText:
      "Un Analista te entrega un proyecto de mandamiento. La cuenta corriente no está conciliada: el deudor alega un pago en EAR de hace 20 días.",
    stem: "Como Gestor, lo correcto es",
    choices: [
      { id: "a", text: "firmar igual para no perder el indicador de ‘actos proferidos’." },
      {
        id: "b",
        text: "devolver el expediente para conciliar con la EAR y depurar el título antes del acto.",
      },
      { id: "c", text: "descontar de palabra el valor alegado, sin soporte." },
      { id: "d", text: "embargar preventivo mientras ‘se aclara’." },
    ],
    correct: "b",
    explanation:
      "Calidad del título y de la cuenta corriente es control profesional. Un pago no reportado se concilia; no se ignora ni se ‘descuenta de palabra’. Cautelar sin mandamiento/título limpio es trampa.",
    source: "E.T. arts. 801, 828 · función de depuración",
    difficulty: 2,
  },
  {
    id: "g05",
    track: "funcional",
    moduleId: "rol-gestor",
    kind: "sjt",
    caseText:
      "Eres Gestor II de cartera. El Analista clasificó mal un título: lo dejó en persuasivo y faltan 40 días para prescribir.",
    stem: "Tu decisión",
    choices: [
      { id: "a", text: "llamar al deudor una vez más ‘para no ser agresivos’." },
      {
        id: "b",
        text: "reorientar a coactivo, verificar título y competencia, y impulsar el mandamiento con prioridad de prescripción.",
      },
      { id: "c", text: "sancionar al Analista en redes internas antes de tocar el expediente." },
      { id: "d", text: "esperar a que prescriba y luego pedir remisión masiva." },
    ],
    correct: "b",
    explanation:
      "El Gestor corrige la clasificación y protege el crédito. El persuasivo no es presupuesto legal ineludible cuando el título está listo y el término apremia. Prescripción por descuido es falta de diligencia.",
    source: "E.T. arts. 817 y 823 · rol del Gestor",
    difficulty: 2,
  },
  {
    id: "fs01",
    track: "funcional",
    moduleId: "fiscalizacion-determinacion",
    kind: "knowledge",
    stem: "Por regla general, antes de proferir una liquidación de revisión la administración debe",
    choices: [
      { id: "a", text: "librar mandamiento de pago." },
      { id: "b", text: "proferir requerimiento especial." },
      { id: "c", text: "decretar el remate de bienes." },
      { id: "d", text: "demandar ante lo contencioso." },
    ],
    correct: "b",
    explanation:
      "Arts. 703 y 704 E.T.: el requerimiento especial es el acto previo, por regla, a la liquidación de revisión. El mandamiento es de cobro, no de determinación.",
    source: "E.T. arts. 703-704",
    difficulty: 1,
  },
  {
    id: "fs02",
    track: "funcional",
    moduleId: "fiscalizacion-determinacion",
    kind: "knowledge",
    stem: "El término que tiene el contribuyente para responder el requerimiento especial es, en la regla del art. 707 E.T.,",
    choices: [
      { id: "a", text: "diez (10) días." },
      { id: "b", text: "quince (15) días." },
      { id: "c", text: "tres (3) meses." },
      { id: "d", text: "un (1) año." },
    ],
    correct: "c",
    explanation:
      "Art. 707: tres meses para responder el requerimiento especial. No se confunde con los 10 días de recursos del CPACA ni con los 15 de excepciones al mandamiento.",
    source: "E.T. art. 707",
    difficulty: 1,
  },
  {
    id: "fs03",
    track: "funcional",
    moduleId: "fiscalizacion-determinacion",
    kind: "knowledge",
    stem: "La liquidación de aforo (art. 717) procede, como regla, cuando",
    choices: [
      { id: "a", text: "el contribuyente declaró y la DIAN considera inexacta la declaración." },
      { id: "b", text: "el omiso fue emplazado para declarar y no presentó la declaración." },
      { id: "c", text: "hay un saldo a favor pedido en devolución." },
      { id: "d", text: "el deudor pidió facilidad de pago." },
    ],
    correct: "b",
    explanation:
      "Aforo = omiso emplazado que no declara. Inexactitud de quien sí declaró se determina por liquidación de revisión, precedida de requerimiento especial.",
    source: "E.T. arts. 715 y 717",
    difficulty: 2,
  },
  {
    id: "fs04",
    track: "funcional",
    moduleId: "fiscalizacion-determinacion",
    kind: "sjt",
    caseText:
      "Eres Gestor II de fiscalización. El Analista armó un expediente de inexactitud en renta. Te pide ‘liquidar ya’ porque el término de fiscalización apremia y ‘el requerimiento especial demora’.",
    stem: "Debes",
    choices: [
      {
        id: "a",
        text: "proferir la liquidación de revisión sin requerimiento, para no perder el término.",
      },
      {
        id: "b",
        text: "proferir el requerimiento especial con hechos, pruebas y glosas, y controlar el término legal.",
      },
      { id: "c", text: "llamar al contribuyente y pactar una corrección de palabra." },
      { id: "d", text: "pasar el caso a cobro coactivo aunque no hay acto de determinación." },
    ],
    correct: "b",
    explanation:
      "El apremio del término no elimina el requerimiento especial. Un acto viciado no salva la fiscalización. Cobro sin título de determinación (cuando se necesita) es poner la carreta delante.",
    source: "E.T. arts. 703, 704 y 713",
    difficulty: 2,
  },
  {
    id: "fs05",
    track: "funcional",
    moduleId: "control-extensivo",
    kind: "sjt",
    caseText:
      "En una campaña de omisos de IVA, un contribuyente pide que le adelantes si ‘ya le van a aforar’ y cómo maquillar la declaración.",
    stem: "La respuesta correcta del empleo es",
    choices: [
      { id: "a", text: "explicarle extraoficialmente cómo minimizar el aforo." },
      {
        id: "b",
        text: "orientarlo por el canal institucional sobre el emplazamiento y el deber de declarar, sin adelantar el acto ni diseñar su estrategia.",
      },
      { id: "c", text: "decirle que ignore el emplazamiento." },
      { id: "d", text: "cobrarle una suma para ‘acelerar’ la respuesta." },
    ],
    correct: "b",
    explanation:
      "Orientar ≠ asesorar para eludir. Función de control extensivo y de servicio: mismo mensaje de la campaña, canal oficial, sin adelantar el sentido del acto.",
    source: "E.T. art. 715 · Código de Integridad",
    difficulty: 2,
  },
  {
    id: "in01",
    track: "funcional",
    moduleId: "inspeccion-visitas",
    kind: "sjt",
    caseText:
      "En una visita de IVA el representante legal te ofrece almuerzo y te pide ‘no anotar’ una caja menor sin soportes. Eres Inspector II.",
    stem: "Debes",
    choices: [
      { id: "a", text: "aceptar el almuerzo para no tensar la visita y omitir la caja." },
      {
        id: "b",
        text: "rechazar la dádiva, dejar constancia de los hechos en el acta y trasladar el hallazgo al expediente.",
      },
      { id: "c", text: "liquidar el IVA en el predio a cambio de no reportar." },
      { id: "d", text: "guardar silencio y contarlo solo en un grupo de WhatsApp del equipo." },
    ],
    correct: "b",
    explanation:
      "El Inspector no negocia el tributo ni recibe dádivas. El acta recoge hechos. WhatsApp personal no es expediente. La determinación la hace el competente después.",
    source: "E.T. art. 779 · Código de Integridad v3",
    difficulty: 1,
  },
  {
    id: "in02",
    track: "funcional",
    moduleId: "inspeccion-visitas",
    kind: "knowledge",
    stem: "Durante la visita, el documento principal que deja rastro de lo ocurrido es",
    choices: [
      { id: "a", text: "un mensaje de voz al jefe." },
      { id: "b", text: "el acta de visita, con hechos, documentos y observaciones." },
      { id: "c", text: "la liquidación oficial firmada en el predio." },
      { id: "d", text: "un acuerdo de pago verbal." },
    ],
    correct: "b",
    explanation:
      "El acta es la prueba de la visita. La liquidación no se firma en el predio. Lo verbal sin rastro no sostiene el requerimiento.",
    source: "E.T. arts. 684 y 779",
    difficulty: 1,
  },
  {
    id: "in03",
    track: "funcional",
    moduleId: "inspeccion-visitas",
    kind: "sjt",
    caseText:
      "El acto que ordena la visita delimita el objeto a IVA del año 2023. En el archivo aparece un hallazgo fuerte de renta 2022.",
    stem: "Lo correcto es",
    choices: [
      { id: "a", text: "ampliar de hecho el objeto y llevarte toda la renta, sin nuevo acto." },
      { id: "b", text: "ignorar el hallazgo porque ‘no es IVA’." },
      {
        id: "c",
        text: "dejar constancia, no exceder el objeto de esta visita, e informar al competente para que, si procede, ordene la actuación de renta.",
      },
      { id: "d", text: "avisar al contribuyente que esconda esa carpeta." },
    ],
    correct: "c",
    explanation:
      "Exceder el objeto vicia la prueba. Ocultar el hallazgo es falta. Se acta lo observado, se respeta el objeto y se escala para una actuación con competencia y objeto propios.",
    source: "Debido proceso · facultades 684 con objeto delimitado",
    difficulty: 2,
  },
  {
    id: "in04",
    track: "funcional",
    moduleId: "inspeccion-visitas",
    kind: "sjt",
    caseText: "El visitado se niega a firmar el acta y dice que ‘sin firma no vale’.",
    stem: "Debes",
    choices: [
      { id: "a", text: "romper el acta y volverte otro día." },
      {
        id: "b",
        text: "dejar constancia de la renuencia, firmar tú y los testigos que procedan, y conservar el acta.",
      },
      { id: "c", text: "amenazar con embargo inmediato." },
      { id: "d", text: "aceptar que el acta no existe." },
    ],
    correct: "b",
    explanation:
      "La renuencia a firmar se consigna. El acta no desaparece porque el visitado no quiera suscribirla. Embargo es cobro, no visita.",
    source: "Práctica de actas de visita · debido proceso",
    difficulty: 2,
  },
  {
    id: "fs06",
    track: "funcional",
    moduleId: "fiscalizacion-determinacion",
    kind: "knowledge",
    stem: "El emplazamiento para corregir (art. 705 E.T.) es",
    choices: [
      { id: "a", text: "una liquidación oficial ejecutoriada." },
      {
        id: "b",
        text: "un acto de trámite que invita a corregir, no la liquidación ni el requerimiento especial.",
      },
      { id: "c", text: "un mandamiento de pago." },
      { id: "d", text: "una sentencia." },
    ],
    correct: "b",
    explanation:
      "El 705 no determina ni reemplaza el 703. Es trámite. Confundirlo es el error más rentable para el examinador.",
    source: "E.T. art. 705",
    difficulty: 2,
  },
  {
    id: "g06",
    track: "funcional",
    moduleId: "rol-gestor",
    kind: "sjt",
    caseText:
      "Un contribuyente influyente te llama para que ‘le bajes la prioridad’ a su expediente de cobro. Tu Analista ya lo tiene clasificado por riesgo de prescripción.",
    stem: "Como Gestor",
    choices: [
      { id: "a", text: "reordenas el lote a su favor y pides reserva al Analista." },
      {
        id: "b",
        text: "mantienes el criterio objetivo (prescripción, cuantía, riesgo), dejas rastro de la gestión y no aceptas trato preferente.",
      },
      { id: "c", text: "le pides al Analista que ‘desaparezca’ el expediente una semana." },
      { id: "d", text: "cierras el cobro por ‘razones de imagen institucional’." },
    ],
    correct: "b",
    explanation:
      "Justicia e imparcialidad (209 C.P. y Código de Integridad). El Gestor no vende la prioridad. Prescripción y cuantía mandan, no el apellido.",
    source: "Art. 209 C.P. · Justicia · rol profesional",
    difficulty: 2,
  },
  // ── ANALISTA I (CÓDIGO 201 - NIVEL TÉCNICO) ──
  {
    id: "an01",
    track: "funcional",
    moduleId: "ficha-empleo",
    kind: "sjt",
    caseText:
      "Eres Analista I en una Dirección Seccional. Llega a tu ventanilla una declaración tributaria presentada físicamente por un contribuyente no obligado a presentarla de manera virtual, pero el documento carece de la firma del declarante.",
    stem: "En ejercicio de tus funciones técnicas de recepción y verificación preliminar, debes",
    choices: [
      { id: "a", text: "firmar tú en el espacio del declarante para no perjudicar al ciudadano." },
      {
        id: "b",
        text: "informar de inmediato al contribuyente que la omisión de la firma es causal para tenerla como no presentada (art. 580 E.T.) e invitarlo a suscribirla antes de radicar.",
      },
      { id: "c", text: "radicarla en silencio y proyectar una sanción penal de inmediato." },
      { id: "d", text: "destruir el formulario y pedirle que regrese al día siguiente." },
    ],
    correct: "b",
    explanation:
      "El Analista I apoya y verifica el cumplimiento de requisitos formales. La falta de firma es causal de dar por no presentada la declaración (art. 580 E.T.). El deber técnico es advertirlo y permitir la firma oportuna.",
    source: "Estatuto Tributario art. 580 · Funciones Analista I",
    difficulty: 1,
  },
  {
    id: "an02",
    track: "funcional",
    moduleId: "ofimatica-dian",
    kind: "sjt",
    caseText:
      "Tu supervisor te asigna consolidar una base de datos con 500 registros de pagos bancarios para cotejarlos contra el listado de obligaciones pendientes. El archivo está desordenado y con formatos inconsistentes.",
    stem: "La herramienta y procedimiento ofimático idóneo para ejecutar esta tarea técnica es",
    choices: [
      { id: "a", text: "revisar uno a uno los 500 registros en papel con resaltador." },
      {
        id: "b",
        text: "estandarizar el formato de texto y número de la columna NIT, y aplicar la función BUSCARX o BUSCARV/COINCIDIR para automatizar el cruce.",
      },
      { id: "c", text: "borrar los registros que no coincidan a primera vista." },
      { id: "d", text: "redactar un oficio en Word pidiendo que el banco vuelva a enviar todo." },
    ],
    correct: "b",
    explanation:
      "El manejo técnico de Excel requiere estandarización de claves (NIT/identificación) y aplicación de funciones de búsqueda masiva, garantizando eficiencia y exactitud.",
    source: "Manual de Ofimática DIAN · Funciones de Hoja de Cálculo",
    difficulty: 1,
  },
  {
    id: "an03",
    track: "funcional",
    moduleId: "mipg-archivo",
    kind: "knowledge",
    stem: "Al organizar un expediente físico de apoyo documental, la foliación técnica que debe realizar el Analista I conforme a las directrices del Archivo General de la Nación consiste en:",
    choices: [
      { id: "a", text: "Numerar únicamente las páginas impares con tinta roja." },
      {
        id: "b",
        text: "Escribir el número correlativo y consecutivo en la esquina superior derecha de cada hoja útil, con lápiz de mina negra, en el orden cronológico en que se incorporaron.",
      },
      { id: "c", text: "Poner números aleatorios en el pie de página." },
      { id: "d", text: "Foliar de atrás hacia adelante en orden inverso." },
    ],
    correct: "b",
    explanation:
      "La foliación técnica exige numeración consecutiva en la esquina superior derecha, con lápiz grafito suave para no deteriorar el documento, respetando el orden cronológico del trámite.",
    source: "Acuerdo 002 de 2014 AGN · Ley 594 de 2000",
    difficulty: 1,
  },

  // ── FACILITADOR III (CÓDIGO 103 - NIVEL ASISTENCIAL - SERVICIO Y PQRSF) ──
  {
    id: "fa01",
    track: "funcional",
    moduleId: "servicio-pqrsf",
    kind: "sjt",
    caseText:
      "Un ciudadano llega muy ofuscado a la ventanilla de atención presencial de la DIAN alegando que el sistema Muisca le bloqueó la firma electrónica y que hoy se le vence el plazo para declarar. Grita exigiendo que el Facilitador III le solucione ya.",
    stem: "La conducta asistencial correcta y alineada con los atributos del servicio al ciudadano es",
    choices: [
      {
        id: "a",
        text: "responderle con igual tono de voz y advertirle que si sigue gritando llamará a la policía para expulsarlo.",
      },
      {
        id: "b",
        text: "escucharlo con serenidad y empatía, validar su situación en el sistema, orientarlo en la recuperación de la contraseña o radicar su contingencia técnica para amparar su término legal.",
      },
      { id: "c", text: "decirle que eso no es su problema y que contrate a un contador privado." },
      {
        id: "d",
        text: "darle su número de celular personal para que le transfiera dinero por agilizarle el trámite.",
      },
    ],
    correct: "b",
    explanation:
      "Atributos del servicio: empatía, autocontrol, escucha activa y solución institucional. Si hay falla técnica en el sistema, la radicación del ticket ampara la contingencia del art. 579-2 E.T.",
    source: "Protocolo de Servicio al Ciudadano DIAN · CPACA",
    difficulty: 1,
  },
  {
    id: "fa02",
    track: "funcional",
    moduleId: "servicio-pqrsf",
    kind: "knowledge",
    stem: "En la ventanilla única de radicación, un ciudadano presenta una petición solicitando copias de documentos públicos que no tienen reserva legal. El término máximo perentorio que tiene la entidad para responder dicha solicitud (art. 14 CPACA) es de:",
    choices: [
      { id: "a", text: "Cinco (5) días hábiles." },
      { id: "b", text: "Diez (10) días siguientes a su recepción." },
      { id: "c", text: "Treinta (30) días calendario." },
      { id: "d", text: "Dos (2) meses prorrogables." },
    ],
    correct: "b",
    explanation:
      "Art. 14 CPACA (sustituido por Ley 1755/2015): Las peticiones de información y consulta o expedición de copias deben resolverse dentro de los diez (10) días siguientes a su recepción. Las de interés general o particular tienen 15 días.",
    source: "Ley 1437 de 2011 (CPACA) art. 14 · Ley 1755 de 2015",
    difficulty: 1,
  },
  {
    id: "fa03",
    track: "funcional",
    moduleId: "servicio-pqrsf",
    kind: "sjt",
    caseText:
      "Un usuario se acerca al punto de contacto de la DIAN y entrega un derecho de petición incompleto, pues no anexó la fotocopia de su cédula. El Facilitador III está en la ventanilla de radicación.",
    stem: "Conforme al artículo 15 del CPACA sobre radicación de peticiones, el Facilitador debe",
    choices: [
      {
        id: "a",
        text: "rechazar de plano la petición y negarse a radicarla hasta que traiga la copia.",
      },
      {
        id: "b",
        text: "recibirla y radicarla obligatoriamente, advirtiéndole al peticionario en el acto sobre los documentos faltantes y dejando constancia en la copia que le entrega.",
      },
      { id: "c", text: "romper el documento frente al usuario." },
      { id: "d", text: "cobrarle una tarifa especial de radicación extemporánea." },
    ],
    correct: "b",
    explanation:
      "En ningún caso se podrán rechazar peticiones por motivos de falta de documentos o de requisitos de forma. Se radica dejando constancia del faltante y otorgándole 1 mes para subsanar (art. 17 CPACA).",
    source: "CPACA art. 15 · Ley 1755 de 2015",
    difficulty: 1,
  },
  {
    id: "fa04",
    track: "funcional",
    moduleId: "mipg-archivo",
    kind: "sjt",
    caseText:
      "Al finalizar la jornada de atención presencial, un tramitador le ofrece al Facilitador III una propina en efectivo de $50.000 como 'agradecimiento' por haber radicado rápidamente los turnos de sus clientes.",
    stem: "La actuación que exige el Código de Integridad y el régimen disciplinario es",
    choices: [
      {
        id: "a",
        text: "recibir el dinero, pues fue una donación voluntaria posterior al servicio.",
      },
      {
        id: "b",
        text: "rechazar tajantemente el dinero, explicarle que todos los trámites en la DIAN son gratuitos y reportar el intento de dádiva a su superior inmediato.",
      },
      { id: "c", text: "guardar el dinero en la caja menor de la entidad." },
      { id: "d", text: "repartir la propina con los vigilantes de la entrada." },
    ],
    correct: "b",
    explanation:
      "Valor Honestidad y Código de Integridad: El servidor público tiene prohibido solicitar o recibir dádivas, propinas o gratificaciones de cualquier índole. Los trámites son gratuitos.",
    source: "Código de Integridad DIAN · Valor Honestidad · Ley 1952 de 2019",
    difficulty: 1,
  },

  // ── FACILITADOR II (CÓDIGO 102 - NIVEL ASISTENCIAL - OPERATIVO Y ARCHIVO) ──
  {
    id: "fo01",
    track: "funcional",
    moduleId: "mipg-archivo",
    kind: "sjt",
    caseText:
      "En el archivo central de la seccional, un funcionario de otra dependencia solicita llevarse a su oficina tres expedientes originales de cobro coactivo sin diligenciar la boleta o formato de préstamo institucional.",
    stem: "Como Facilitador II encargado de la custodia y entrega de expedientes, debes",
    choices: [
      {
        id: "a",
        text: "entregarle los expedientes porque es un compañero de trabajo de confianza.",
      },
      {
        id: "b",
        text: "exigir el diligenciamiento formal del formato de control y préstamo de archivo antes de permitir la salida de los expedientes, garantizando la cadena de custodia documental.",
      },
      { id: "c", text: "esconder los expedientes y fingir que se perdieron." },
      { id: "d", text: "prestarle solo uno y quedarse con los otros dos." },
    ],
    correct: "b",
    explanation:
      "La custodia documental prohíbe el retiro de expedientes sin registro y firma de préstamo. El Facilitador II responde por el inventario y la trazabilidad de los documentos institucionales.",
    source: "Sistema de Gestión Documental DIAN · Tablas de Retención",
    difficulty: 1,
  },
  {
    id: "fo02",
    track: "funcional",
    moduleId: "ofimatica-dian",
    kind: "sjt",
    caseText:
      "Al digitar una relación de 200 resoluciones en la planilla corporativa, el Facilitador II nota que en una fila digitó por error el NIT de una empresa diferente a la del soporte físico.",
    stem: "La conducta adecuada es",
    choices: [
      { id: "a", text: "dejar el error para no perder el tiempo de digitación." },
      {
        id: "b",
        text: "corregir de inmediato el registro en el sistema con base en el soporte físico para evitar vicios en las notificaciones del área.",
      },
      {
        id: "c",
        text: "modificar el documento físico a mano con tachones para que cuadre con lo digitado.",
      },
      { id: "d", text: "borrar toda la base de datos de la semana." },
    ],
    correct: "b",
    explanation:
      "La calidad del dato es esencial en la gestión técnica y operativa. Un NIT mal digitado genera notificaciones indebidas y nulidades procesales.",
    source: "Políticas de Calidad del Dato DIAN",
    difficulty: 1,
  },

  // ── GESTOR I ADUANAS (CÓDIGO 301 - NIVEL PROFESIONAL - OPERACIÓN ADUANERA) ──
  {
    id: "ad01",
    track: "funcional",
    moduleId: "sistema-tributario",
    kind: "sjt",
    caseText:
      "En una inspección aduanera física en puerto, el Gestor I Aduanas detecta que un contenedor declarado como 'juguetes plásticos' contiene en realidad 500 teléfonos celulares de alta gama no declarados ni amparados en los documentos de transporte.",
    stem: "Conforme al Decreto 1165 de 2019 y Decreto 659 de 2024, la medida administrativa que procede inmediatamente es",
    choices: [
      {
        id: "a",
        text: "autorizar el levante y pedirle al declarante que pague después lo que quiera.",
      },
      {
        id: "b",
        text: "proferir acta de aprehensión de las mercancías no declaradas y trasladarlas al depósito habilitado para iniciar el proceso de decomiso.",
      },
      { id: "c", text: "vender los celulares en el puerto entre los funcionarios presentes." },
      { id: "d", text: "devolver el buque inmediatamente a su país de origen sin levantar acta." },
    ],
    correct: "b",
    explanation:
      "Mercancía no declarada ni amparada en los documentos de viaje constituye causal de aprehensión aduanera (art. 647 D. 1165/2019). El Gestor levanta acta de aprehensión e inicia el proceso de decomiso.",
    source: "Decreto 1165 de 2019 arts. 647 y ss. · Régimen Aduanero",
    difficulty: 2,
  },
  {
    id: "ad02",
    track: "funcional",
    moduleId: "sistema-tributario",
    kind: "knowledge",
    stem: "El acto por el cual la autoridad aduanera permite a los declarantes la disposición y retiro de las mercancías de la zona primaria o del depósito habilitado, previo cumplimiento de los requisitos legales, se denomina formalmente:",
    choices: [
      { id: "a", text: "Aprehensión." },
      { id: "b", text: "Levante de mercancías." },
      { id: "c", text: "Decomiso ordinario." },
      { id: "d", text: "Abandono legal." },
    ],
    correct: "b",
    explanation:
      "El 'levante' es la autorización aduanera que permite al importador disponer libremente de la mercancía, una vez cancelados los tributos aduaneros y verificados los requisitos legales.",
    source: "Decreto 1165 de 2019 art. 3 · Glosario Aduanero",
    difficulty: 1,
  },
  {
    id: "ad03",
    track: "funcional",
    moduleId: "sistema-tributario",
    kind: "sjt",
    caseText:
      "El representante de una agencia de aduanas le solicita al Gestor I de Aduanas que 'agilice' la inspección documental omitiendo la verificación del certificado de origen de un cargamento de confecciones, ofreciéndole obsequios de la marca importada.",
    stem: "El Gestor I de Aduanas debe",
    choices: [
      { id: "a", text: "recibir los obsequios si son de bajo valor comercial." },
      {
        id: "b",
        text: "rechazar enfáticamente los obsequios, verificar minuciosamente el certificado de origen conforme a la normativa y reportar el intento de cohecho.",
      },
      { id: "c", text: "aprobar el certificado sin leerlo para evitar congestión en el puerto." },
      { id: "d", text: "cobrar una tarifa personal de agilización aduanera." },
    ],
    correct: "b",
    explanation:
      "La integridad en el control aduanero es crítica frente a riesgos de fraude y contrabando. No se aceptan obsequios y se garantiza la rigurosidad en origen y arancel.",
    source: "Código de Integridad DIAN · Régimen Disciplinario",
    difficulty: 2,
  },

  // ── GESTOR II JURÍDICA (CÓDIGO 302 - RECURSOS, EXCEPCIONES Y DEFENSA) ──
  {
    id: "ju01",
    track: "funcional",
    moduleId: "cpaca",
    kind: "knowledge",
    stem: "Contra las liquidaciones oficiales y las resoluciones que imponen sanciones proferidas por la DIAN procede el Recurso de Reconsideración (art. 720 E.T.), el cual debe interponerse dentro del término perentorio de:",
    choices: [
      { id: "a", text: "Diez (10) días hábiles." },
      { id: "b", text: "Dos (2) meses siguientes a su notificación." },
      { id: "c", text: "Seis (6) meses calendario." },
      { id: "d", text: "Un (1) año siguiente al vencimiento." },
    ],
    correct: "b",
    explanation:
      "Art. 720 E.T.: El recurso de reconsideración debe interponerse ante la oficina competente dentro de los dos (2) meses siguientes a la notificación de la liquidación oficial o resolución sanción.",
    source: "Estatuto Tributario art. 720",
    difficulty: 2,
  },
  {
    id: "ju02",
    track: "funcional",
    moduleId: "cpaca",
    kind: "knowledge",
    stem: "La DIAN cuenta con un término máximo para fallar el Recurso de Reconsideración de un (1) año contado a partir de su interposición en debida forma (art. 732 E.T.). Si la administración no profiere ni notifica el fallo dentro de dicho plazo, opera:",
    choices: [
      { id: "a", text: "El silencio administrativo negativo que confirma la liquidación oficial." },
      {
        id: "b",
        text: "El silencio administrativo positivo, entendiéndose fallado el recurso a favor del contribuyente (art. 734 E.T.).",
      },
      { id: "c", text: "La prescripción de oficio de la cédula del contribuyente." },
      { id: "d", text: "La prórroga automática por dos años más." },
    ],
    correct: "b",
    explanation:
      "Art. 734 E.T.: Si transcurrido un año no se ha notificado la decisión del recurso de reconsideración, se configura el silencio administrativo positivo en favor del recurrente.",
    source: "Estatuto Tributario arts. 732 y 734",
    difficulty: 2,
  },
  {
    id: "ju03",
    track: "funcional",
    moduleId: "cobro-coactivo",
    kind: "sjt",
    caseText:
      "Un ejecutado formula excepciones contra el mandamiento de pago alegando 'Prescripción de la acción de cobro' y demuestra que la liquidación oficial quedó en firme hace 6 años sin que la DIAN notificara mandamiento de pago alguno.",
    stem: "Al proyectar la decisión de las excepciones (art. 831 num. 6 y art. 832 E.T.), el Gestor II Jurídico debe",
    choices: [
      {
        id: "a",
        text: "rechazar la excepción porque las deudas con la DIAN son imprescriptibles.",
      },
      {
        id: "b",
        text: "declarar probada la excepción de prescripción, ordenar el levantamiento de las medidas cautelares y el archivo del expediente coactivo.",
      },
      {
        id: "c",
        text: "ordenar el remate urgente de los bienes antes de que quede en firme la decisión.",
      },
      { id: "d", text: "exigirle al deudor el pago de una sanción para perdonarle el tiempo." },
    ],
    correct: "b",
    explanation:
      "Art. 817 y 831 num. 6 E.T.: La prescripción de la acción de cobro opera a los 5 años. Probada la excepción, el funcionario competente debe levantar cautelares y archivar (art. 833 E.T.).",
    source: "Estatuto Tributario arts. 817, 831 y 833",
    difficulty: 2,
  },

  // ── INSPECTOR II (CÓDIGO 302 - FISCALIZACIÓN Y PRUEBAS) ──
  {
    id: "in05",
    track: "funcional",
    moduleId: "inspeccion-visitas",
    kind: "sjt",
    caseText:
      "Durante una inspección tributaria a una cadena de restaurantes, el Inspector II solicita los libros de contabilidad registrados y el contribuyente manifiesta que 'se le extraviaron ayer' pero no exhibe denuncia penal ni soportes.",
    stem: "El procedimiento técnico y probatorio que debe adelantar el Inspector es",
    choices: [
      { id: "a", text: "creer en la palabra del contribuyente y archivar la visita." },
      {
        id: "b",
        text: "consignar detalladamente en el acta la no exhibición de los libros de contabilidad, otorgar el plazo legal probatorio si procede o remitir el informe para la imposición de la sanción por no exhibir libros (art. 654 y 655 E.T.).",
      },
      { id: "c", text: "llevarse los computadores personales de los comensales presentes." },
      { id: "d", text: "clausurar el restaurante inmediatamente sin orden escrita." },
    ],
    correct: "b",
    explanation:
      "La no exhibición de libros de contabilidad es causal de rechazo de deducciones y sanción por libros (art. 654 E.T.). El Inspector deja constancia en acta para que el área de determinación sancione.",
    source: "Estatuto Tributario arts. 654, 655 y 779",
    difficulty: 2,
  },
  {
    id: "in06",
    track: "funcional",
    moduleId: "inspeccion-visitas",
    kind: "knowledge",
    stem: "En desarrollo de las facultades de fiscalización e investigación del artículo 684 del Estatuto Tributario, los funcionarios de la DIAN comisionados tienen atribución legal para:",
    choices: [
      { id: "a", text: "Modificar las declaraciones privadas sin notificar requerimiento alguno." },
      {
        id: "b",
        text: "Verificar la exactitud de las declaraciones, ordenar la exhibición de libros, documentos y correspondencia comercial, y practicar inspecciones tributarias y contables.",
      },
      { id: "c", text: "Decretar la privación de la libertad de los representantes legales." },
      { id: "d", text: "Fijar tributos territoriales como el impuesto predial." },
    ],
    correct: "b",
    explanation:
      "El art. 684 E.T. confiere amplias facultades de inspección, cruces, verificación de libros y obtención de pruebas documentales para constatar la realidad tributaria.",
    source: "Estatuto Tributario art. 684",
    difficulty: 1,
  },
];
