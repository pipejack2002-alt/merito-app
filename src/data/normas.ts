/**
 * Biblioteca normativa dentro de la app.
 *
 * Texto de los artículos que sostienen cada lección, transcrito con fines de
 * estudio. Algunos se presentan en extracto (marcado con «[…]»). Antes de citar
 * en un escrito oficial, confronta la versión vigente en la fuente oficial.
 */

export type NormaId =
  | "et"
  | "cp"
  | "cpaca"
  | "l1755"
  | "l1066"
  | "l1116"
  | "l594"
  | "integridad"
  | "mipg"
  | "aduanas";

export interface Norma {
  id: NormaId;
  sigla: string;
  nombre: string;
  descripcion: string;
  href: string;
}

export interface Articulo {
  /** id estable, p. ej. "et-817" */
  id: string;
  norma: NormaId;
  /** Número tal como se cita: "817", "833-1", "95 num. 9" */
  numero: string;
  titulo: string;
  /** Párrafos / numerales del texto. */
  texto: string[];
  /** Dato que más se pregunta en examen. */
  clave?: string;
  /** true si el texto es un extracto. */
  extracto?: boolean;
}

export const NORMAS: Record<NormaId, Norma> = {
  et: {
    id: "et",
    sigla: "E.T.",
    nombre: "Estatuto Tributario",
    descripcion: "Decreto 624 de 1989 y sus reformas. Procedimiento, cobro, devoluciones y sanciones.",
    href: "https://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario.html",
  },
  cp: {
    id: "cp",
    sigla: "C.P.",
    nombre: "Constitución Política de 1991",
    descripcion: "Estado social de derecho, función pública y principios tributarios.",
    href: "https://www.secretariasenado.gov.co/senado/basedoc/constitucion_politica_1991.html",
  },
  cpaca: {
    id: "cpaca",
    sigla: "CPACA",
    nombre: "Ley 1437 de 2011 (CPACA)",
    descripcion: "Procedimiento administrativo: principios, conflictos de interés, recursos, silencio y revocación.",
    href: "https://www.secretariasenado.gov.co/senado/basedoc/ley_1437_2011.html",
  },
  l1755: {
    id: "l1755",
    sigla: "Ley 1755",
    nombre: "Ley 1755 de 2015",
    descripcion: "Regula el derecho fundamental de petición (sustituye el Título II del CPACA).",
    href: "https://www.secretariasenado.gov.co/senado/basedoc/ley_1755_2015.html",
  },
  l1066: {
    id: "l1066",
    sigla: "Ley 1066",
    nombre: "Ley 1066 de 2006",
    descripcion: "Normalización de la cartera pública.",
    href: "https://www.secretariasenado.gov.co/senado/basedoc/ley_1066_2006.html",
  },
  l1116: {
    id: "l1116",
    sigla: "Ley 1116",
    nombre: "Ley 1116 de 2006",
    descripcion: "Régimen de insolvencia empresarial.",
    href: "https://www.secretariasenado.gov.co/senado/basedoc/ley_1116_2006.html",
  },
  l594: {
    id: "l594",
    sigla: "Ley 594",
    nombre: "Ley 594 de 2000",
    descripcion: "Ley General de Archivos.",
    href: "https://www.secretariasenado.gov.co/senado/basedoc/ley_0594_2000.html",
  },
  integridad: {
    id: "integridad",
    sigla: "Integridad",
    nombre: "Código de Integridad del Servicio Público",
    descripcion: "Cinco valores adoptados por la Ley 2016 de 2020 y aterrizados en el Código DIAN v3.",
    href: "https://www.funcionpublica.gov.co/web/eva/codigo-integridad",
  },
  mipg: {
    id: "mipg",
    sigla: "MIPG",
    nombre: "Decreto 1083 de 2015 (mod. Decreto 1499 de 2017)",
    descripcion: "Modelo Integrado de Planeación y Gestión.",
    href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=83433",
  },
  aduanas: {
    id: "aduanas",
    sigla: "Aduanas / Cambios",
    nombre: "Régimen Aduanero, Cambiario y Anticontrabando",
    descripcion: "Decreto 1165 de 2019 (mod. D. 659/2024), Decreto Ley 2245 de 2011 y Ley 1762 de 2015.",
    href: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=97329",
  },
};

export const NORMA_ORDER: NormaId[] = [
  "et",
  "cp",
  "cpaca",
  "l1755",
  "l1066",
  "l1116",
  "l594",
  "mipg",
  "aduanas",
  "integridad",
];

export const ARTICULOS: Articulo[] = [
  // ───────────────────────── ESTATUTO TRIBUTARIO ─────────────────────────
  {
    id: "et-583",
    norma: "et",
    numero: "583",
    titulo: "Reserva de la declaración",
    texto: [
      "La información tributaria respecto de las bases gravables y la determinación privada de los impuestos que figuren en las declaraciones tributarias, tendrá el carácter de información reservada; por consiguiente, los funcionarios de la Dirección de Impuestos y Aduanas Nacionales sólo podrán utilizarla para el control, recaudo, determinación, discusión y administración de los impuestos y para efectos de informaciones impersonales de estadística.",
      "PARÁGRAFO. En los procesos penales, podrá suministrarse copia de las declaraciones, cuando la correspondiente autoridad lo decrete como prueba en la providencia respectiva. […]",
    ],
    clave: "La información de las declaraciones es reservada: solo se usa para control, recaudo, determinación, discusión y administración, o para estadística impersonal.",
    extracto: true,
  },
  {
    id: "et-635",
    norma: "et",
    numero: "635",
    titulo: "Determinación de la tasa de interés moratorio",
    texto: [
      "Para efectos de las obligaciones administradas por la Dirección de Impuestos y Aduanas Nacionales, el interés moratorio se liquidará diariamente a la tasa de interés diario que sea equivalente a la tasa de usura vigente determinada por la Superintendencia Financiera de Colombia para las modalidades de crédito de consumo, menos dos (2) puntos.",
      "La Dirección de Impuestos y Aduanas Nacionales publicará la tasa correspondiente en su página web. […]",
    ],
    clave: "Interés moratorio diario = tasa de usura (crédito de consumo) menos 2 puntos.",
    extracto: true,
  },
  {
    id: "et-639",
    norma: "et",
    numero: "639",
    titulo: "Sanción mínima",
    texto: [
      "El valor mínimo de cualquier sanción, incluidas las sanciones reducidas, ya sea que deba liquidarla la persona o entidad sometida a ella, o la Administración de Impuestos, será equivalente a la suma de 10 UVT.",
      "Lo dispuesto en este artículo no será aplicable a los intereses de mora, ni a las sanciones contenidas en los artículos 668, 674, 675 y 676. […]",
    ],
    clave: "Ninguna sanción puede ser inferior a 10 UVT (no aplica a intereses de mora).",
    extracto: true,
  },
  {
    id: "et-641",
    norma: "et",
    numero: "641",
    titulo: "Extemporaneidad en la presentación",
    texto: [
      "Las personas o entidades obligadas a declarar, que presenten las declaraciones tributarias en forma extemporánea, deberán liquidar y pagar una sanción por cada mes o fracción de mes calendario de retardo, equivalente al cinco por ciento (5%) del total del impuesto a cargo o retención objeto de la declaración tributaria, sin exceder del ciento por ciento (100%) del impuesto o retención, según el caso.",
      "Esta sanción se cobrará sin perjuicio de los intereses que origine el incumplimiento en el pago del impuesto, anticipo o retención a cargo del contribuyente, responsable o agente retenedor. […]",
    ],
    clave: "5% por mes o fracción de mes, tope 100% del impuesto. Antes del emplazamiento.",
    extracto: true,
  },
  {
    id: "et-642",
    norma: "et",
    numero: "642",
    titulo: "Extemporaneidad en la presentación de las declaraciones con posterioridad al emplazamiento",
    texto: [
      "El contribuyente, responsable o agente retenedor obligado a declarar, que presente la declaración con posterioridad al emplazamiento, deberá liquidar y pagar una sanción por extemporaneidad por cada mes o fracción de mes calendario de retardo, equivalente al diez por ciento (10%) del total del impuesto a cargo o retención objeto de la declaración tributaria, sin exceder del doscientos por ciento (200%) del impuesto o retención, según el caso. […]",
    ],
    clave: "Después del emplazamiento: 10% por mes o fracción, tope 200%.",
    extracto: true,
  },
  {
    id: "et-644",
    norma: "et",
    numero: "644",
    titulo: "Sanción por corrección de las declaraciones",
    texto: [
      "Cuando los contribuyentes, responsables o agentes retenedores, corrijan sus declaraciones tributarias, deberán liquidar y pagar una sanción equivalente a:",
      "1. El diez por ciento (10%) del mayor valor a pagar o del menor saldo a su favor, según el caso, que se genere entre la corrección y la declaración inmediatamente anterior a aquella, cuando la corrección se realice antes de que se produzca emplazamiento para corregir de que trata el artículo 685, o auto que ordene visita de inspección tributaria.",
      "2. El veinte por ciento (20%) del mayor valor a pagar o del menor saldo a su favor, según el caso, que se genere entre la corrección y la declaración inmediatamente anterior a aquella, si la corrección se realiza después de notificado el emplazamiento para corregir o auto que ordene visita de inspección tributaria y antes de notificarle el requerimiento especial o pliego de cargos. […]",
    ],
    clave: "10% antes del emplazamiento para corregir; 20% después del emplazamiento y antes del requerimiento especial.",
    extracto: true,
  },
  {
    id: "et-684",
    norma: "et",
    numero: "684",
    titulo: "Facultades de fiscalización e investigación",
    texto: [
      "La Administración Tributaria tiene amplias facultades de fiscalización e investigación para asegurar el efectivo cumplimiento de las normas sustanciales. Para tal efecto podrá:",
      "a) Verificar la exactitud de las declaraciones u otros informes, cuando lo considere necesario.",
      "b) Adelantar las investigaciones que estime convenientes para establecer la ocurrencia de hechos generadores de obligaciones tributarias, no informados.",
      "c) Citar o requerir al contribuyente o a terceros para que rindan informes o contesten interrogatorios.",
      "d) Exigir del contribuyente o de terceros la presentación de documentos que registren sus operaciones cuando unos u otros estén obligados a llevar libros registrados.",
      "e) Ordenar la exhibición y examen parcial de los libros, comprobantes y documentos, tanto del contribuyente como de terceros, legalmente obligados a llevar contabilidad.",
      "f) En general, efectuar todas las diligencias necesarias para la correcta y oportuna determinación de los impuestos, facilitando al contribuyente la aclaración de toda duda u omisión que conduzca a una correcta determinación.",
    ],
    clave: "Amplias facultades para verificar, investigar, citar, exigir documentos y examinar libros.",
  },
  {
    id: "et-685",
    norma: "et",
    numero: "685",
    titulo: "Emplazamiento para corregir",
    texto: [
      "Cuando la Administración de Impuestos tenga indicios sobre la inexactitud de la declaración del contribuyente, responsable o agente retenedor, podrá enviarle un emplazamiento para corregir, con el fin de que dentro del mes siguiente a su notificación, la persona o entidad emplazada, si lo considera procedente, corrija la declaración liquidando la sanción de corrección respectiva de conformidad con el artículo 644.",
      "La no respuesta a este emplazamiento no ocasiona sanción alguna. […]",
    ],
    clave: "Un mes para corregir. No responder no genera sanción. Es acto de trámite, no liquidación.",
    extracto: true,
  },
  {
    id: "et-702",
    norma: "et",
    numero: "702",
    titulo: "Facultad de modificación de las liquidaciones privadas",
    texto: [
      "La Administración de Impuestos podrá modificar, por una sola vez, las liquidaciones privadas de los contribuyentes, responsables o agentes retenedores, mediante liquidación de revisión, la cual deberá contraerse exclusivamente a la respectiva declaración y a los hechos que hubieren sido contemplados en el requerimiento especial.",
    ],
    clave: "Por una sola vez, mediante liquidación de revisión, y solo sobre hechos del requerimiento especial.",
  },
  {
    id: "et-703",
    norma: "et",
    numero: "703",
    titulo: "El requerimiento especial como requisito previo a la liquidación",
    texto: [
      "Antes de efectuar la liquidación de revisión, la Administración enviará al contribuyente, responsable, agente retenedor o declarante, por una sola vez, un requerimiento especial que contenga todos los puntos que se proponga modificar, con explicación de las razones en que se sustenta.",
    ],
    clave: "Sin requerimiento especial previo no hay liquidación de revisión válida.",
  },
  {
    id: "et-704",
    norma: "et",
    numero: "704",
    titulo: "Contenido del requerimiento",
    texto: [
      "El requerimiento deberá contener la cuantificación de los impuestos, anticipos, retenciones y sanciones, que se pretende adicionar a la liquidación privada.",
    ],
  },
  {
    id: "et-705",
    norma: "et",
    numero: "705",
    titulo: "Término para notificar el requerimiento",
    texto: [
      "El requerimiento de que trata el artículo 703, deberá notificarse a más tardar dentro de los tres (3) años siguientes a la fecha de vencimiento del plazo para declarar. Cuando la declaración inicial se haya presentado en forma extemporánea, los tres (3) años se contarán a partir de la fecha de presentación de la misma.",
      "Cuando la declaración tributaria presente un saldo a favor del contribuyente o responsable, el requerimiento deberá notificarse a más tardar tres (3) años después de la fecha de presentación de la solicitud de devolución o compensación respectiva.",
    ],
    clave: "3 años desde el vencimiento para declarar (o desde la presentación si fue extemporánea).",
  },
  {
    id: "et-707",
    norma: "et",
    numero: "707",
    titulo: "Respuesta al requerimiento especial",
    texto: [
      "Dentro de los tres (3) meses siguientes, contados a partir de la fecha de notificación del requerimiento especial, el contribuyente, responsable, agente retenedor o declarante, deberá formular por escrito sus objeciones, solicitar pruebas, subsanar las omisiones que permita la ley, solicitar a la Administración se alleguen al proceso documentos que reposen en sus archivos, así como la práctica de inspecciones tributarias, siempre y cuando tales solicitudes sean conducentes, caso en el cual, éstas deben ser atendidas.",
    ],
    clave: "3 meses para responder el requerimiento especial.",
  },
  {
    id: "et-710",
    norma: "et",
    numero: "710",
    titulo: "Término para practicar la liquidación de revisión",
    texto: [
      "Dentro de los seis (6) meses siguientes a la fecha de vencimiento del término para dar respuesta al requerimiento especial o a su ampliación, según el caso, la Administración deberá notificar la liquidación de revisión, si hay mérito para ello. […]",
    ],
    clave: "6 meses desde el vencimiento del término de respuesta.",
    extracto: true,
  },
  {
    id: "et-715",
    norma: "et",
    numero: "715",
    titulo: "Emplazamiento previo por no declarar",
    texto: [
      "Quienes incumplan con la obligación de presentar las declaraciones tributarias, estando obligados a ello, serán emplazados por la Administración de Impuestos, previa comprobación de su obligación, para que lo hagan en el término perentorio de un (1) mes, advirtiéndoseles de las consecuencias legales en caso de persistir su omisión.",
      "El contribuyente, responsable, agente retenedor o declarante, que presente la declaración con posterioridad al emplazamiento, deberá liquidar y pagar la sanción por extemporaneidad, en los términos previstos en el artículo 642.",
    ],
    clave: "Omisos: emplazamiento para declarar con plazo de 1 mes; si declaran después, sanción del 642.",
  },
  {
    id: "et-717",
    norma: "et",
    numero: "717",
    titulo: "Liquidación de aforo",
    texto: [
      "Agotado el procedimiento previsto en los artículos 643, 715 y 716, la Administración podrá, dentro de los cinco (5) años siguientes al vencimiento del plazo señalado para declarar, determinar mediante una liquidación de aforo, la obligación tributaria al contribuyente, responsable, agente retenedor o declarante, que no haya declarado.",
    ],
    clave: "Aforo solo para quien NO declaró, dentro de 5 años desde el vencimiento para declarar.",
  },
  {
    id: "et-772",
    norma: "et",
    numero: "772",
    titulo: "La contabilidad como medio de prueba",
    texto: [
      "Los libros de contabilidad del contribuyente constituyen prueba a su favor, siempre que se lleven en debida forma.",
    ],
  },
  {
    id: "et-772-1",
    norma: "et",
    numero: "772-1",
    titulo: "Conciliación fiscal",
    texto: [
      "Los contribuyentes obligados a llevar contabilidad deberán llevar un sistema de control o de conciliaciones de las diferencias que surjan entre la aplicación de los nuevos marcos técnicos normativos contables y las disposiciones de este Estatuto. El Gobierno Nacional reglamentará la materia.",
      "PARÁGRAFO. El incumplimiento de esta obligación se considerará como una irregularidad en la contabilidad.",
    ],
    clave: "No llevar conciliación fiscal = irregularidad en la contabilidad.",
  },
  {
    id: "et-779",
    norma: "et",
    numero: "779",
    titulo: "Inspección tributaria",
    texto: [
      "La Administración podrá ordenar la práctica de inspección tributaria, para verificar la exactitud de las declaraciones, para establecer la existencia de hechos gravables declarados o no, y para verificar el cumplimiento de obligaciones formales.",
      "Se entiende por inspección tributaria, un medio de prueba en virtud del cual se realiza la constatación directa de los hechos que interesan a un proceso adelantado por la Administración Tributaria, para verificar su existencia, características y demás circunstancias de tiempo, modo y lugar, en la cual pueden decretarse todos los medios de prueba autorizados por la legislación tributaria y otros ordenamientos legales, previa la observancia de las ritualidades que les sean propias.",
      "La inspección tributaria se decretará mediante auto que se notificará por correo o personalmente, debiéndose en él indicar los hechos materia de la prueba y los funcionarios comisionados para practicarla. […] De ella se levantará un acta que contenga todos los puntos relevantes. […]",
    ],
    clave: "Se decreta por auto que indica hechos y funcionarios comisionados; se levanta acta.",
    extracto: true,
  },
  {
    id: "et-800",
    norma: "et",
    numero: "800",
    titulo: "Lugar de pago",
    texto: [
      "El pago de los impuestos, anticipos, retenciones, sanciones e intereses, deberá efectuarse en los lugares que para tal efecto señale el Gobierno Nacional.",
      "El Gobierno Nacional podrá recaudar total o parcialmente los impuestos, anticipos, retenciones, sanciones e intereses, a través de bancos y demás entidades financieras.",
    ],
  },
  {
    id: "et-801",
    norma: "et",
    numero: "801",
    titulo: "Autorización para recaudar impuestos",
    texto: [
      "En desarrollo de lo dispuesto en el artículo 800, el Gobierno Nacional podrá señalar los bancos y demás entidades especializadas, que cumpliendo con los requisitos exigidos, están autorizados para recaudar y cobrar impuestos, anticipos, retenciones, sanciones e intereses, y para recibir las declaraciones de impuestos. […]",
    ],
    clave: "El recaudo se hace por bancos y entidades autorizadas (EAR); la DIAN no es caja.",
    extracto: true,
  },
  {
    id: "et-804",
    norma: "et",
    numero: "804",
    titulo: "Prelación en la imputación del pago",
    texto: [
      "Los pagos que por cualquier concepto hagan los contribuyentes, responsables o agentes de retención en relación con deudas vencidas a su cargo, deberán imputarse al período e impuesto que estos indiquen, en las mismas proporciones con que participan las sanciones actualizadas, intereses, anticipos, impuestos y retenciones, dentro de la obligación total al momento del pago. […]",
    ],
    clave: "Desde la Ley 1819 de 2016 la imputación es PROPORCIONAL (sanciones, intereses e impuesto en la proporción en que participan en la deuda).",
    extracto: true,
  },
  {
    id: "et-814",
    norma: "et",
    numero: "814",
    titulo: "Facilidades para el pago",
    texto: [
      "El Subdirector de Cobranzas y los Administradores de Impuestos Nacionales podrán mediante resolución conceder facilidades para el pago al deudor o a un tercero a su nombre, hasta por cinco (5) años, para el pago de los impuestos administrados por la Dirección de Impuestos y Aduanas Nacionales, así como para la cancelación de los intereses y demás sanciones a que haya lugar, siempre que el deudor o un tercero a su nombre constituya fiducia en garantía, ofrezca bienes para su embargo y secuestro, garantías personales, reales, bancarias o de compañías de seguros, o cualquiera otra garantía que respalde suficientemente la deuda a satisfacción de la Administración. […]",
    ],
    clave: "Facilidad hasta por 5 años, por resolución y con garantía suficiente.",
    extracto: true,
  },
  {
    id: "et-815",
    norma: "et",
    numero: "815",
    titulo: "Compensación con saldos a favor",
    texto: [
      "Los contribuyentes o responsables que liquiden saldos a favor en sus declaraciones tributarias podrán:",
      "a) Imputarlos dentro de su liquidación privada del mismo impuesto, correspondiente al siguiente período gravable.",
      "b) Solicitar su compensación con deudas por concepto de impuestos, anticipos, retenciones, intereses y sanciones que figuren a su cargo. […]",
    ],
    clave: "Saldo a favor: imputar al período siguiente o compensar con deudas a cargo.",
    extracto: true,
  },
  {
    id: "et-816",
    norma: "et",
    numero: "816",
    titulo: "Término para solicitar la compensación",
    texto: [
      "La solicitud de compensación de impuestos deberá presentarse a más tardar dos (2) años después de la fecha de vencimiento del término para declarar. […]",
    ],
    clave: "2 años desde el vencimiento para declarar.",
    extracto: true,
  },
  {
    id: "et-817",
    norma: "et",
    numero: "817",
    titulo: "Término de prescripción de la acción de cobro",
    texto: [
      "La acción de cobro de las obligaciones fiscales, prescribe en el término de cinco (5) años, contados a partir de:",
      "1. La fecha de vencimiento del término para declarar, fijado por el Gobierno Nacional, para las declaraciones presentadas oportunamente.",
      "2. La fecha de presentación de la declaración, en el caso de las presentadas en forma extemporánea.",
      "3. La fecha de presentación de la declaración de corrección, en relación con los mayores valores.",
      "4. La fecha de ejecutoria del respectivo acto administrativo de determinación o discusión.",
      "La competencia para decretar la prescripción de la acción de cobro será de los Administradores de Impuestos o de Impuestos y Aduanas Nacionales respectivos, o de los servidores públicos de la respectiva administración en quien estos deleguen dicha facultad y será decretada de oficio o a petición de parte.",
    ],
    clave: "5 años. Se decreta de oficio o a petición de parte.",
  },
  {
    id: "et-818",
    norma: "et",
    numero: "818",
    titulo: "Interrupción y suspensión del término de prescripción",
    texto: [
      "El término de la prescripción de la acción de cobro se interrumpe por la notificación del mandamiento de pago, por el otorgamiento de facilidades para el pago, por la admisión de la solicitud del concordato y por la declaratoria oficial de la liquidación forzosa administrativa.",
      "Interrumpida la prescripción, comenzará a correr de nuevo el tiempo desde el día siguiente a la notificación del mandamiento de pago, desde la terminación del concordato o desde la terminación de la liquidación forzosa administrativa.",
      "El término de prescripción de la acción de cobro se suspende desde que se dicte el auto de suspensión de la diligencia del remate y hasta: la ejecutoria de la providencia que decide la revocatoria; la ejecutoria de la providencia que resuelve la situación contemplada en el artículo 567 del Estatuto Tributario; el pronunciamiento definitivo de la Jurisdicción Contencioso Administrativa en el caso contemplado en el artículo 835 del Estatuto Tributario.",
    ],
    clave: "Interrumpen: mandamiento notificado, facilidad de pago, concordato/insolvencia y liquidación forzosa.",
  },
  {
    id: "et-823",
    norma: "et",
    numero: "823",
    titulo: "Procedimiento administrativo coactivo",
    texto: [
      "Para el cobro coactivo de las deudas fiscales por concepto de impuestos, anticipos, retenciones, intereses y sanciones, de competencia de la Dirección de Impuestos y Aduanas Nacionales, deberá seguirse el procedimiento administrativo coactivo que se establece en los artículos siguientes.",
    ],
  },
  {
    id: "et-824",
    norma: "et",
    numero: "824",
    titulo: "Competencia funcional",
    texto: [
      "Para exigir el cobro coactivo de las deudas por los conceptos referidos en el artículo anterior, son competentes los funcionarios de cobranzas que señale la estructura de la entidad (jefes de las dependencias de cobranzas del nivel central y seccional), así como los funcionarios de los grupos de cobranzas a quienes se les deleguen estas funciones. […]",
    ],
    clave: "Solo es competente el funcionario de cobranzas facultado o delegado. Firmar sin competencia = excepción del 831-7.",
    extracto: true,
  },
  {
    id: "et-825",
    norma: "et",
    numero: "825",
    titulo: "Competencia territorial",
    texto: [
      "El procedimiento coactivo se adelantará por la oficina de cobranzas de la Administración del lugar en donde se hayan originado las respectivas obligaciones tributarias o por la de la Administración de los grandes contribuyentes, según el caso.",
      "Cuando se estén adelantando varios procedimientos administrativos coactivos respecto de un mismo deudor, éstos podrán acumularse.",
    ],
    clave: "Varios procesos coactivos de un mismo deudor pueden acumularse.",
  },
  {
    id: "et-825-1",
    norma: "et",
    numero: "825-1",
    titulo: "Facultades de investigación en el cobro",
    texto: [
      "Los funcionarios competentes para adelantar el cobro coactivo tendrán las mismas facultades de investigación que los funcionarios de fiscalización.",
    ],
  },
  {
    id: "et-826",
    norma: "et",
    numero: "826",
    titulo: "Mandamiento de pago",
    texto: [
      "El funcionario competente para exigir el cobro coactivo, producirá el mandamiento de pago ordenando la cancelación de las obligaciones pendientes más los intereses respectivos. Este mandamiento se notificará personalmente al deudor, previa citación para que comparezca en un término de diez (10) días. Si vencido el término no comparece, el mandamiento ejecutivo se notificará por correo. En la misma forma se notificará el mandamiento a los herederos del deudor y a los deudores solidarios.",
      "Cuando la notificación del mandamiento ejecutivo se haga por correo, deberá informarse de ello por cualquier medio de comunicación del lugar. La omisión de esta formalidad, no invalida la notificación efectuada.",
      "PARÁGRAFO. El mandamiento de pago podrá referirse a más de un título ejecutivo del mismo deudor.",
    ],
    clave: "Citación para notificación personal en 10 días; si no comparece, por correo.",
  },
  {
    id: "et-827",
    norma: "et",
    numero: "827",
    titulo: "Comunicación sobre aceptación del concordato",
    texto: [
      "Cuando el juez o funcionario que esté conociendo de la solicitud del concordato preventivo, potestativo u obligatorio, le dé aviso a la Administración, el funcionario que esté adelantando el proceso administrativo coactivo, deberá suspender el proceso e intervenir en el mismo conforme a las disposiciones legales.",
    ],
    clave: "Aviso de concurso/insolvencia → se suspende el coactivo y la DIAN interviene como acreedora.",
  },
  {
    id: "et-828",
    norma: "et",
    numero: "828",
    titulo: "Títulos ejecutivos",
    texto: [
      "Prestan mérito ejecutivo:",
      "1. Las liquidaciones privadas y sus correcciones, contenidas en las declaraciones tributarias presentadas, desde el vencimiento de la fecha para su cancelación.",
      "2. Las liquidaciones oficiales ejecutoriadas.",
      "3. Los demás actos de la Administración de Impuestos debidamente ejecutoriados, en los cuales se fijen sumas líquidas de dinero a favor del fisco nacional.",
      "4. Las garantías y cauciones prestadas a favor de la Nación para afianzar el pago de las obligaciones tributarias, a partir de la ejecutoria del acto de la Administración que declare el incumplimiento o exigibilidad de las obligaciones garantizadas.",
      "5. Las sentencias y demás decisiones jurisdiccionales ejecutoriadas, que decidan sobre las demandas presentadas en relación con los impuestos, anticipos, retenciones, sanciones e intereses que administra la Dirección de Impuestos y Aduanas Nacionales.",
      "PARÁGRAFO. Para efectos de los numerales 1 y 2 del presente artículo, bastará con la certificación del Administrador de Impuestos o su delegado, sobre la existencia y el valor de las liquidaciones privadas u oficiales. Para el cobro de los intereses será suficiente la liquidación que de ellos haya efectuado el funcionario competente.",
    ],
    clave: "Cinco títulos. La declaración privada es título desde el vencimiento para pagar.",
  },
  {
    id: "et-829",
    norma: "et",
    numero: "829",
    titulo: "Ejecutoria de los actos",
    texto: [
      "Se entienden ejecutoriados los actos administrativos que sirven de fundamento al cobro coactivo:",
      "1. Cuando contra ellos no proceda recurso alguno.",
      "2. Cuando vencido el término para interponer los recursos, no se hayan interpuesto o no se presenten en debida forma.",
      "3. Cuando se renuncie expresamente a los recursos o se desista de ellos, y",
      "4. Cuando los recursos interpuestos en la vía gubernativa o las acciones de restablecimiento del derecho o de revisión de impuestos se hayan decidido en forma definitiva, según el caso.",
    ],
  },
  {
    id: "et-830",
    norma: "et",
    numero: "830",
    titulo: "Término para pagar o presentar excepciones",
    texto: [
      "Dentro de los quince (15) días siguientes a la notificación del mandamiento de pago, el deudor deberá cancelar el monto de la deuda con sus respectivos intereses. Dentro del mismo término, podrán proponerse mediante escrito las excepciones contempladas en el artículo siguiente.",
    ],
    clave: "15 días para pagar o proponer excepciones (no 10 como los recursos del CPACA).",
  },
  {
    id: "et-831",
    norma: "et",
    numero: "831",
    titulo: "Excepciones",
    texto: [
      "Contra el mandamiento de pago procederán las siguientes excepciones:",
      "1. El pago efectivo.",
      "2. La existencia de acuerdo de pago.",
      "3. La de falta de ejecutoria del título.",
      "4. La pérdida de ejecutoria del título por revocación o suspensión provisional del acto administrativo, hecha por autoridad competente.",
      "5. La interposición de demandas de restablecimiento del derecho o de proceso de revisión de impuestos, ante la jurisdicción de lo contencioso administrativo.",
      "6. La prescripción de la acción de cobro, y",
      "7. La falta de título ejecutivo o incompetencia del funcionario que lo profirió.",
      "PARÁGRAFO. Contra el mandamiento de pago que vincule los deudores solidarios procederán además, las siguientes excepciones: 1. La calidad de deudor solidario. 2. La indebida tasación del monto de la deuda.",
    ],
    clave: "Lista taxativa de 7 excepciones (+2 para solidarios).",
  },
  {
    id: "et-832",
    norma: "et",
    numero: "832",
    titulo: "Trámite de excepciones",
    texto: [
      "Dentro del mes siguiente a la presentación del escrito mediante el cual se proponen las excepciones, el funcionario competente decidirá sobre ellas, ordenando previamente la práctica de las pruebas, cuando sea del caso.",
    ],
    clave: "Un mes para decidir las excepciones.",
  },
  {
    id: "et-833",
    norma: "et",
    numero: "833",
    titulo: "Excepciones probadas",
    texto: [
      "Si se encuentran probadas las excepciones, el funcionario competente así lo declarará y ordenará la terminación del procedimiento cuando fuere del caso y el levantamiento de las medidas preventivas cuando se hubieren decretado. En igual forma, procederá si en cualquier etapa del procedimiento el deudor cancela la totalidad de las obligaciones. […]",
    ],
    extracto: true,
  },
  {
    id: "et-833-1",
    norma: "et",
    numero: "833-1",
    titulo: "Recursos en el procedimiento administrativo de cobro",
    texto: [
      "Las actuaciones administrativas realizadas en el procedimiento administrativo de cobro, son de trámite y contra ellas no procede recurso alguno, excepto los que en forma expresa se señalen en este procedimiento para las actuaciones definitivas.",
    ],
    clave: "Las actuaciones del coactivo son de trámite: sin recursos, salvo norma expresa.",
  },
  {
    id: "et-834",
    norma: "et",
    numero: "834",
    titulo: "Recurso contra la resolución que decide las excepciones",
    texto: [
      "En la resolución que rechace las excepciones propuestas, se ordenará adelantar la ejecución y remate de los bienes embargados y secuestrados. Contra dicha resolución procede únicamente el recurso de reposición ante el Jefe de la División de Cobranzas, dentro del mes siguiente a su notificación, quien tendrá para resolver un mes, contado a partir de su interposición en debida forma.",
    ],
    clave: "Solo reposición, dentro del mes siguiente.",
  },
  {
    id: "et-835",
    norma: "et",
    numero: "835",
    titulo: "Intervención del Contencioso Administrativo",
    texto: [
      "Dentro del proceso de cobro administrativo coactivo, sólo serán demandables ante la Jurisdicción Contencioso-Administrativa las resoluciones que fallan las excepciones y ordenan llevar adelante la ejecución; la admisión de la demanda no suspende el proceso de cobro, pero el remate no se realizará hasta que exista pronunciamiento definitivo de dicha jurisdicción.",
    ],
    clave: "La demanda no suspende el cobro, pero sí impide el remate hasta el fallo definitivo.",
  },
  {
    id: "et-836",
    norma: "et",
    numero: "836",
    titulo: "Orden de ejecución",
    texto: [
      "Si vencido el término para excepcionar no se hubieren propuesto excepciones, o el deudor no hubiere pagado, el funcionario competente proferirá resolución ordenando la ejecución y el remate de los bienes embargados y secuestrados. Contra esta resolución no procede recurso alguno.",
      "PARÁGRAFO. Cuando previamente a la orden de ejecución de que trata el presente artículo, no se hubieren dispuesto medidas preventivas, en dicho acto se decretará el embargo y secuestro de los bienes del deudor si estuvieren identificados; en caso de desconocerse los mismos, se ordenará la investigación de ellos para que una vez identificados se embarguen y secuestren y se prosiga con el remate de los mismos.",
    ],
    clave: "Sin excepciones ni pago → orden de ejecución, sin recurso.",
  },
  {
    id: "et-837",
    norma: "et",
    numero: "837",
    titulo: "Medidas preventivas",
    texto: [
      "Previa o simultáneamente con el mandamiento de pago, el funcionario podrá decretar el embargo y secuestro preventivo de los bienes del deudor que se hayan establecido como de su propiedad.",
      "Para este efecto, los funcionarios competentes podrán identificar los bienes del deudor por medio de las informaciones tributarias, o de las informaciones suministradas por entidades públicas o privadas, que estarán obligadas en todos los casos a dar pronta y cumplida respuesta a la Administración, so pena de ser sancionadas al tenor del artículo 651 literal a).",
      "PARÁGRAFO. Cuando se hubieren decretado medidas cautelares y el deudor demuestre que se ha admitido demanda contra el título ejecutivo y que ésta se encuentra pendiente de fallo ante la Jurisdicción de lo Contencioso Administrativo se ordenará levantarlas. Las medidas cautelares también podrán levantarse cuando admitida la demanda ante la Jurisdicción de lo Contencioso Administrativo contra las resoluciones que fallan las excepciones y ordenan llevar adelante la ejecución, se presta garantía bancaria o de compañía de seguros, por el valor adeudado.",
    ],
    clave: "«Previa o simultáneamente con el mandamiento de pago». Nunca en persuasivo.",
  },
  {
    id: "et-838",
    norma: "et",
    numero: "838",
    titulo: "Límite de los embargos",
    texto: [
      "El valor de los bienes embargados no podrá exceder del doble de la deuda más sus intereses. Si efectuado el avalúo de los bienes, éstos excedieren la suma indicada, deberá reducirse el embargo si ello fuere posible, hasta dicho valor, oficiosamente o a solicitud del interesado.",
      "PARÁGRAFO. El avalúo de los bienes embargados lo hará la Administración teniendo en cuenta el valor comercial de éstos y lo notificará personalmente o por correo. Si el deudor no estuviere de acuerdo, podrá solicitar dentro de los diez (10) días siguientes a la notificación, un nuevo avalúo con intervención de un perito particular designado por la Administración, caso en el cual, el deudor le deberá cancelar los honorarios. Contra este avalúo no procede recurso alguno.",
    ],
    clave: "Tope del embargo: el doble de la deuda más intereses.",
  },
  {
    id: "et-841",
    norma: "et",
    numero: "841",
    titulo: "Suspensión por acuerdo de pago",
    texto: [
      "En cualquier etapa del procedimiento administrativo coactivo el deudor podrá celebrar un acuerdo de pago con la Administración, en cuyo caso se suspenderá el procedimiento y se podrán levantar las medidas preventivas que hubieren sido decretadas.",
      "Sin perjuicio de la exigibilidad de garantías, cuando se declare el incumplimiento del acuerdo de pago, deberá reanudarse el procedimiento si aquellas no son suficientes para cubrir la totalidad de la deuda.",
    ],
    clave: "Acuerdo de pago en cualquier etapa → se suspende el coactivo.",
  },
  {
    id: "et-850",
    norma: "et",
    numero: "850",
    titulo: "Devolución de saldos a favor",
    texto: [
      "Los contribuyentes o responsables que liquiden saldos a favor en sus declaraciones tributarias podrán solicitar su devolución.",
      "La Dirección de Impuestos y Aduanas Nacionales deberá devolver oportunamente a los contribuyentes, los pagos en exceso o de lo no debido, que éstos hayan efectuado por concepto de obligaciones tributarias y aduaneras, cualquiera que fuere el concepto del pago, siguiendo el mismo procedimiento que se aplica para las devoluciones de los saldos a favor. […]",
    ],
    extracto: true,
  },
  {
    id: "et-854",
    norma: "et",
    numero: "854",
    titulo: "Término para solicitar la devolución de saldos a favor",
    texto: [
      "La solicitud de devolución de impuestos deberá presentarse a más tardar dos (2) años después de la fecha de vencimiento del término para declarar. […]",
    ],
    clave: "2 años desde el vencimiento para declarar.",
    extracto: true,
  },
  {
    id: "et-855",
    norma: "et",
    numero: "855",
    titulo: "Término para efectuar la devolución",
    texto: [
      "La Administración de Impuestos deberá devolver, previa las compensaciones a que haya lugar, los saldos a favor originados en los impuestos sobre la renta y complementarios y sobre las ventas, dentro de los cincuenta (50) días siguientes a la fecha de la solicitud de devolución presentada oportunamente y en debida forma. […]",
    ],
    clave: "50 días, previa compensación de deudas.",
    extracto: true,
  },
  {
    id: "et-857",
    norma: "et",
    numero: "857",
    titulo: "Rechazo e inadmisión de las solicitudes de devolución o compensación",
    texto: [
      "Las solicitudes de devolución o compensación se rechazarán en forma definitiva:",
      "1. Cuando fueren presentadas extemporáneamente.",
      "2. Cuando el saldo materia de la solicitud ya haya sido objeto de devolución, compensación o imputación anterior.",
      "3. Cuando dentro del término de la investigación previa de la solicitud de devolución o compensación, como resultado de la corrección de la declaración efectuada por el contribuyente o responsable, se genera un saldo a pagar. […]",
    ],
    extracto: true,
  },
  {
    id: "et-860",
    norma: "et",
    numero: "860",
    titulo: "Devolución con presentación de garantía",
    texto: [
      "Cuando el contribuyente o responsable presente con la solicitud de devolución una garantía a favor de la Nación, otorgada por entidades bancarias o de compañías de seguros, por valor equivalente al monto objeto de devolución, la Administración de Impuestos, dentro de los veinte (20) días siguientes deberá hacer entrega del cheque, título o giro. […]",
    ],
    clave: "Con garantía, la devolución se hace en 20 días.",
    extracto: true,
  },

  // ───────────────────────── CONSTITUCIÓN ─────────────────────────
  {
    id: "cp-1",
    norma: "cp",
    numero: "1",
    titulo: "Estado social de derecho",
    texto: [
      "Colombia es un Estado social de derecho, organizado en forma de República unitaria, descentralizada, con autonomía de sus entidades territoriales, democrática, participativa y pluralista, fundada en el respeto de la dignidad humana, en el trabajo y la solidaridad de las personas que la integran y en la prevalencia del interés general.",
    ],
  },
  {
    id: "cp-13",
    norma: "cp",
    numero: "13",
    titulo: "Derecho a la igualdad",
    texto: [
      "Todas las personas nacen libres e iguales ante la ley, recibirán la misma protección y trato de las autoridades y gozarán de los mismos derechos, libertades y oportunidades sin ninguna discriminación por razones de sexo, raza, origen nacional o familiar, lengua, religión, opinión política o filosófica.",
      "El Estado promoverá las condiciones para que la igualdad sea real y efectiva y adoptará medidas en favor de grupos discriminados o marginados.",
      "El Estado protegerá especialmente a aquellas personas que por su condición económica, física o mental, se encuentren en circunstancia de debilidad manifiesta y sancionará los abusos o maltratos que contra ellas se cometan.",
    ],
  },
  {
    id: "cp-23",
    norma: "cp",
    numero: "23",
    titulo: "Derecho de petición",
    texto: [
      "Toda persona tiene derecho a presentar peticiones respetuosas a las autoridades por motivos de interés general o particular y a obtener pronta resolución. El legislador podrá reglamentar su ejercicio ante organizaciones privadas para garantizar los derechos fundamentales.",
    ],
  },
  {
    id: "cp-29",
    norma: "cp",
    numero: "29",
    titulo: "Debido proceso",
    texto: [
      "El debido proceso se aplicará a toda clase de actuaciones judiciales y administrativas.",
      "Nadie podrá ser juzgado sino conforme a leyes preexistentes al acto que se le imputa, ante juez o tribunal competente y con observancia de la plenitud de las formas propias de cada juicio. […]",
      "Es nula, de pleno derecho, la prueba obtenida con violación del debido proceso.",
    ],
    clave: "Aplica también a las actuaciones administrativas (cobro, fiscalización, visitas).",
    extracto: true,
  },
  {
    id: "cp-95",
    norma: "cp",
    numero: "95 num. 9",
    titulo: "Deber de contribuir",
    texto: [
      "Son deberes de la persona y del ciudadano: […] 9. Contribuir al financiamiento de los gastos e inversiones del Estado dentro de conceptos de justicia y equidad.",
    ],
    extracto: true,
  },
  {
    id: "cp-122",
    norma: "cp",
    numero: "122",
    titulo: "Empleo público",
    texto: [
      "No habrá empleo público que no tenga funciones detalladas en ley o reglamento y para proveer los de carácter remunerado se requiere que estén contemplados en la respectiva planta y previstos sus emolumentos en el presupuesto correspondiente.",
      "Ningún servidor público entrará a ejercer su cargo sin prestar juramento de cumplir y defender la Constitución y desempeñar los deberes que le incumben. […]",
    ],
    extracto: true,
  },
  {
    id: "cp-125",
    norma: "cp",
    numero: "125",
    titulo: "Carrera administrativa",
    texto: [
      "Los empleos en los órganos y entidades del Estado son de carrera. Se exceptúan los de elección popular, los de libre nombramiento y remoción, los de trabajadores oficiales y los demás que determine la ley. […]",
      "El ingreso a los cargos de carrera y el ascenso en los mismos, se harán previo cumplimiento de los requisitos y condiciones que fije la ley para determinar los méritos y calidades de los aspirantes.",
      "El retiro se hará: por calificación no satisfactoria en el desempeño del empleo; por violación del régimen disciplinario y por las demás causales previstas en la Constitución o la ley. […]",
    ],
    clave: "El concurso DIAN 2676 existe por este artículo: ingreso por mérito.",
    extracto: true,
  },
  {
    id: "cp-209",
    norma: "cp",
    numero: "209",
    titulo: "Función administrativa",
    texto: [
      "La función administrativa está al servicio de los intereses generales y se desarrolla con fundamento en los principios de igualdad, moralidad, eficacia, economía, celeridad, imparcialidad y publicidad, mediante la descentralización, la delegación y la desconcentración de funciones.",
      "Las autoridades administrativas deben coordinar sus actuaciones para el adecuado cumplimiento de los fines del Estado. La administración pública, en todos sus órdenes, tendrá un control interno que se ejercerá en los términos que señale la ley.",
    ],
    clave: "Siete principios: igualdad, moralidad, eficacia, economía, celeridad, imparcialidad y publicidad.",
  },
  {
    id: "cp-338",
    norma: "cp",
    numero: "338",
    titulo: "Legalidad tributaria",
    texto: [
      "En tiempo de paz, solamente el Congreso, las asambleas departamentales y los concejos distritales y municipales podrán imponer contribuciones fiscales o parafiscales. La ley, las ordenanzas y los acuerdos deben fijar, directamente, los sujetos activos y pasivos, los hechos y las bases gravables, y las tarifas de los impuestos. […]",
      "Las leyes, ordenanzas o acuerdos que regulen contribuciones en las que la base sea el resultado de hechos ocurridos durante un período determinado, no pueden aplicarse sino a partir del período que comience después de iniciar la vigencia de la respectiva ley, ordenanza o acuerdo.",
    ],
    clave: "Elementos del tributo fijados por ley: sujetos, hecho generador, base y tarifa.",
    extracto: true,
  },
  {
    id: "cp-363",
    norma: "cp",
    numero: "363",
    titulo: "Principios del sistema tributario",
    texto: [
      "El sistema tributario se funda en los principios de equidad, eficiencia y progresividad.",
      "Las leyes tributarias no se aplicarán con retroactividad.",
    ],
    clave: "Equidad, eficiencia, progresividad e irretroactividad.",
  },

  // ───────────────────────── CPACA ─────────────────────────
  {
    id: "cpaca-3",
    norma: "cpaca",
    numero: "3",
    titulo: "Principios",
    texto: [
      "Todas las autoridades deberán interpretar y aplicar las disposiciones que regulan las actuaciones y procedimientos administrativos a la luz de los principios consagrados en la Constitución Política, en la Parte Primera de este Código y en las leyes especiales.",
      "Las actuaciones administrativas se desarrollarán, especialmente, con arreglo a los principios del debido proceso, igualdad, imparcialidad, buena fe, moralidad, participación, responsabilidad, transparencia, publicidad, coordinación, eficacia, economía y celeridad. […]",
    ],
    clave: "Trece principios (debido proceso… celeridad).",
    extracto: true,
  },
  {
    id: "cpaca-11",
    norma: "cpaca",
    numero: "11",
    titulo: "Conflictos de interés y causales de impedimento y recusación",
    texto: [
      "Cuando el interés general propio de la función pública entre en conflicto con el interés particular y directo del servidor público, este deberá declararse impedido.",
      "Todo servidor público que deba adelantar o sustanciar actuaciones administrativas, realizar investigaciones, practicar pruebas o pronunciar decisiones definitivas podrá ser recusado si no manifiesta su impedimento por:",
      "1. Tener interés particular y directo en la regulación, gestión, control o decisión del asunto, o tenerlo su cónyuge, compañero o compañera permanente, o alguno de sus parientes dentro del cuarto grado de consanguinidad, segundo de afinidad o primero civil, o su socio o socios de hecho o de derecho. […]",
    ],
    clave: "Si hay interés particular (propio, de pariente o socio), te declaras impedido y te apartas.",
    extracto: true,
  },
  {
    id: "cpaca-74",
    norma: "cpaca",
    numero: "74",
    titulo: "Recursos contra los actos administrativos",
    texto: [
      "Por regla general, contra los actos definitivos procederán los siguientes recursos:",
      "1. El de reposición, ante quien expidió la decisión para que la aclare, modifique, adicione o revoque.",
      "2. El de apelación, para ante el inmediato superior administrativo o funcional con el mismo propósito. […]",
      "3. El de queja, cuando se rechace el de apelación. […]",
    ],
    extracto: true,
  },
  {
    id: "cpaca-75",
    norma: "cpaca",
    numero: "75",
    titulo: "Improcedencia",
    texto: [
      "No habrá recurso contra los actos de carácter general, ni contra los de trámite, preparatorios, o de ejecución excepto en los casos previstos en norma expresa.",
    ],
    clave: "Actos generales, de trámite, preparatorios o de ejecución: sin recurso.",
  },
  {
    id: "cpaca-76",
    norma: "cpaca",
    numero: "76",
    titulo: "Oportunidad y presentación",
    texto: [
      "Los recursos de reposición y apelación deberán interponerse por escrito en la diligencia de notificación personal, o dentro de los diez (10) días siguientes a ella, o a la notificación por aviso, o al vencimiento del término de publicación, según el caso. […]",
      "El recurso de apelación podrá interponerse directamente, o como subsidiario del de reposición y cuando proceda será obligatorio para acceder a la jurisdicción.",
      "Los recursos de reposición y de queja no serán obligatorios.",
    ],
    clave: "10 días para reposición y apelación.",
    extracto: true,
  },
  {
    id: "cpaca-83",
    norma: "cpaca",
    numero: "83",
    titulo: "Silencio negativo",
    texto: [
      "Transcurridos tres (3) meses contados a partir de la presentación de una petición sin que se haya notificado decisión que la resuelva, se entenderá que esta es negativa. […]",
    ],
    clave: "3 meses sin respuesta = decisión negativa (regla general).",
    extracto: true,
  },
  {
    id: "cpaca-93",
    norma: "cpaca",
    numero: "93",
    titulo: "Causales de revocación",
    texto: [
      "Los actos administrativos deberán ser revocados por las mismas autoridades que los hayan expedido o por sus inmediatos superiores jerárquicos o funcionales, de oficio o a solicitud de parte, en cualquiera de los siguientes casos:",
      "1. Cuando sea manifiesta su oposición a la Constitución Política o a la ley.",
      "2. Cuando no estén conformes con el interés público o social, o atenten contra él.",
      "3. Cuando con ellos se cause agravio injustificado a una persona.",
    ],
    clave: "Tres causales: oposición a la Constitución/ley, contrario al interés público, agravio injustificado.",
  },

  // ───────────────────────── LEY 1755 ─────────────────────────
  {
    id: "l1755-14",
    norma: "l1755",
    numero: "14",
    titulo: "Términos para resolver las distintas modalidades de peticiones",
    texto: [
      "Salvo norma legal especial y so pena de sanción disciplinaria, toda petición deberá resolverse dentro de los quince (15) días siguientes a su recepción. Estará sometida a término especial la resolución de las siguientes peticiones:",
      "1. Las peticiones de documentos y de información deberán resolverse dentro de los diez (10) días siguientes a su recepción. Si en ese lapso no se ha dado respuesta al peticionario, se entenderá, para todos los efectos legales, que la respectiva solicitud ha sido aceptada y, por consiguiente, la administración ya no podrá negar la entrega de dichos documentos al peticionario, y como consecuencia las copias se entregarán dentro de los tres (3) días siguientes.",
      "2. Las peticiones mediante las cuales se eleva una consulta a las autoridades en relación con las materias a su cargo deberán resolverse dentro de los treinta (30) días siguientes a su recepción.",
      "PARÁGRAFO. Cuando excepcionalmente no fuere posible resolver la petición en los plazos aquí señalados, la autoridad deberá informar esta circunstancia al interesado, antes del vencimiento del término señalado en la ley, expresando los motivos de la demora y señalando a la vez el plazo razonable en que se resolverá o dará respuesta, el cual no podrá exceder del doble del inicialmente previsto.",
    ],
    clave: "15 general · 10 documentos e información · 30 consultas. Prórroga máxima: el doble.",
  },

  // ───────────────────────── LEY 1066 ─────────────────────────
  {
    id: "l1066-1",
    norma: "l1066",
    numero: "1",
    titulo: "Gestión del recaudo de cartera pública",
    texto: [
      "Conforme a los principios que regulan la Administración Pública contenidos en el artículo 209 de la Constitución Política, los servidores públicos que tengan a su cargo el recaudo de obligaciones a favor del Tesoro Público deberán realizar su gestión de manera ágil, eficaz, eficiente y oportuna, con el fin de obtener liquidez para el Tesoro Público.",
    ],
    clave: "El recaudo de cartera pública debe ser ágil, eficaz, eficiente y oportuno.",
  },

  // ───────────────────────── LEY 1116 ─────────────────────────
  {
    id: "l1116-20",
    norma: "l1116",
    numero: "20",
    titulo: "Nuevos procesos de ejecución y procesos de ejecución en curso",
    texto: [
      "A partir de la fecha de inicio del proceso de reorganización no podrá admitirse ni continuarse demanda de ejecución o cualquier otro proceso de cobro en contra del deudor.",
      "Así, los procesos de ejecución o cobro que hayan comenzado antes del inicio del proceso de reorganización, deberán remitirse para ser incorporados al trámite y considerar el crédito y las excepciones de mérito pendientes de decisión, las cuales serán tramitadas como objeciones, para efectos de calificación y graduación y las medidas cautelares quedarán a disposición del juez del concurso […].",
    ],
    clave: "Iniciada la reorganización no se admite ni continúa ningún cobro (incluido el coactivo).",
    extracto: true,
  },

  // ───────────────────────── LEY 594 ─────────────────────────
  {
    id: "l594-11",
    norma: "l594",
    numero: "11",
    titulo: "Obligatoriedad de la conformación de los archivos públicos",
    texto: [
      "El Estado está obligado a la creación, organización, preservación y control de los archivos, teniendo en cuenta los principios de procedencia y orden original, el ciclo vital de los documentos y la normatividad archivística.",
    ],
  },
  {
    id: "l594-23",
    norma: "l594",
    numero: "23",
    titulo: "Formación de archivos",
    texto: [
      "Teniendo en cuenta el ciclo vital de los documentos, los archivos se clasifican en:",
      "a) Archivo de gestión. Comprende toda la documentación que es sometida a continua utilización y consulta administrativa por las oficinas productoras u otras que la soliciten. […]",
      "b) Archivo central. En el que se agrupan documentos transferidos por los distintos archivos de gestión de la entidad respectiva, cuya consulta no es tan frecuente pero que siguen teniendo vigencia y son objeto de consulta por las propias oficinas y particulares en general.",
      "c) Archivo histórico. Es aquel al que se transfieren desde el archivo central los documentos de archivo de conservación permanente.",
    ],
    clave: "Ciclo vital: gestión → central → histórico.",
    extracto: true,
  },

  // ───────────────────────── MIPG ─────────────────────────
  {
    id: "mipg-def",
    norma: "mipg",
    numero: "2.2.22.3.2",
    titulo: "Definición del Modelo Integrado de Planeación y Gestión",
    texto: [
      "El Modelo Integrado de Planeación y Gestión – MIPG es un marco de referencia para dirigir, planear, ejecutar, hacer seguimiento, evaluar y controlar la gestión de las entidades y organismos públicos, con el fin de generar resultados que atiendan los planes de desarrollo y resuelvan las necesidades y problemas de los ciudadanos, con integridad y calidad en el servicio.",
      "Dimensiones operativas: 1) Talento humano; 2) Direccionamiento estratégico y planeación; 3) Gestión con valores para resultados; 4) Evaluación de resultados; 5) Información y comunicación; 6) Gestión del conocimiento y la innovación; 7) Control interno.",
    ],
    clave: "Siete dimensiones; el Talento humano es el corazón del modelo.",
  },

  // ───────────────────────── CÓDIGO DE INTEGRIDAD ─────────────────────────
  {
    id: "int-honestidad",
    norma: "integridad",
    numero: "Valor 1",
    titulo: "Honestidad",
    texto: [
      "Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud, y siempre favoreciendo el interés general.",
      "Lo que hago: digo la verdad, incluso cuando cometo errores; facilito el acceso a la información pública; denuncio las faltas, delitos o violaciones de derechos de las que tengo conocimiento.",
      "Lo que no hago: no doy trato preferencial a personas cercanas para favorecerlas en un proceso en igualdad de condiciones; no acepto incentivos, favores ni ningún otro tipo de beneficio que me ofrezcan personas o grupos con intereses en un proceso de toma de decisiones; no uso recursos públicos para fines personales.",
    ],
  },
  {
    id: "int-respeto",
    norma: "integridad",
    numero: "Valor 2",
    titulo: "Respeto",
    texto: [
      "Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y defectos, sin importar su labor, su procedencia, títulos o cualquier otra condición.",
      "Lo que hago: atiendo con amabilidad, igualdad y equidad a todas las personas; estoy abierto al diálogo y a la comprensión a pesar de perspectivas y opiniones distintas.",
      "Lo que no hago: no actúo de manera discriminatoria, grosera o hiriente; no baso mis decisiones en presunciones, estereotipos o prejuicios; no agredo, ignoro o maltrato de ninguna manera a los ciudadanos ni a otros servidores públicos.",
    ],
  },
  {
    id: "int-compromiso",
    norma: "integridad",
    numero: "Valor 3",
    titulo: "Compromiso",
    texto: [
      "Soy consciente de la importancia de mi rol como servidor público y estoy en disposición permanente para comprender y resolver las necesidades de las personas con las que me relaciono en mis labores cotidianas, buscando siempre mejorar su bienestar.",
      "Lo que hago: asumo mi papel como servidor público entendiendo el valor de los compromisos y responsabilidades que he adquirido frente a la ciudadanía y al país; escucho, atiendo y oriento a quien necesite cualquier información o guía en algún asunto público.",
      "Lo que no hago: nunca trabajo con una actitud negativa; no llego nunca a pensar que mi trabajo como servidor es un ‘favor’ que le hago a la ciudadanía; no asumo que mi trabajo como servidor es irrelevante para la sociedad.",
    ],
  },
  {
    id: "int-diligencia",
    norma: "integridad",
    numero: "Valor 4",
    titulo: "Diligencia",
    texto: [
      "Cumplo con los deberes, funciones y responsabilidades asignadas a mi cargo de la mejor manera posible, con atención, prontitud, destreza y eficiencia, para así optimizar el uso de los recursos del Estado.",
      "Lo que hago: uso responsablemente los recursos públicos para cumplir con mis obligaciones; cumplo con los tiempos estipulados para el logro de cada obligación laboral; aseguro la calidad en cada uno de los productos que entrego.",
      "Lo que no hago: no malgasto ningún recurso público; no postergo las decisiones ni actividades que den solución a problemáticas ciudadanas o que hagan parte del funcionamiento de mi cargo; no demuestro desinterés en mis actuaciones ante los ciudadanos y los demás servidores públicos; no evado mis funciones y responsabilidades por ningún motivo.",
    ],
  },
  {
    id: "int-justicia",
    norma: "integridad",
    numero: "Valor 5",
    titulo: "Justicia",
    texto: [
      "Actúo con imparcialidad garantizando los derechos de las personas, con equidad, igualdad y sin discriminación.",
      "Lo que hago: tomo decisiones informadas y objetivas basadas en evidencias y datos confiables; reconozco y protejo los derechos de cada persona de acuerdo con sus necesidades y condiciones; tomo decisiones estableciendo mecanismos de diálogo y concertación con todas las partes involucradas.",
      "Lo que no hago: no promuevo ni ejecuto políticas, programas o medidas que afectan la igualdad y la libertad de las personas; no favorezco el punto de vista de un grupo de interés sin tener en cuenta a todos los actores involucrados en una situación; nunca permito que odios, simpatías, antipatías, caprichos, presiones o intereses de orden personal o grupal interfieran en mi criterio, toma de decisión y gestión pública.",
    ],
  },

  // ─────────── COMPLEMENTOS E.T. (FISCALIZACIÓN, JURÍDICA Y GRANDES CONTRIBUYENTES) ───────────
  {
    id: "et-260-1",
    norma: "et",
    numero: "260-1 y 260-2",
    titulo: "Criterios de vinculación y principio de plena competencia (Precios de Transferencia)",
    texto: [
      "Los contribuyentes del impuesto sobre la renta y complementarios que celebren operaciones con vinculados del exterior, o con personas, sociedades, entidades o empresas ubicadas, residentes o domiciliadas en jurisdicciones no cooperantes, de baja o nula imposición y regímenes tributarios preferenciales, están obligados a determinar, para efectos del impuesto sobre la renta y complementarios, sus ingresos ordinarios y extraordinarios, sus costos y deducciones, y sus activos y pasivos, considerando para esas operaciones el Principio de Plena Competencia.",
      "Se entenderá que el Principio de Plena Competencia es aquel en el cual una operación entre vinculados cumple con las condiciones que se hubieren utilizado en operaciones comparables con o entre partes independientes.",
    ],
    clave: "Principio de Plena Competencia (Arm's Length): operaciones con vinculados del exterior o paraísos fiscales deben pactarse como entre independientes.",
    extracto: true,
  },
  {
    id: "et-647",
    norma: "et",
    numero: "647 y 648",
    titulo: "Infracción y sanción por inexactitud",
    texto: [
      "Constituye inexactitud sancionable en las declaraciones tributarias, siempre que se derive un menor impuesto o saldo a pagar, o un mayor saldo a favor para el contribuyente, agente retenedor o responsable: 1) La omisión de ingresos o impuestos generados por las operaciones gravadas, de bienes, activos o actuaciones susceptibles de gravamen. 2) No incluir en la declaración de retención la totalidad de retenciones que han debido efectuarse o el efectuarlas y no declararlas, o efectuarlas por un valor inferior. 3) La inclusión de costos, deducciones, descuentos, exenciones, pasivos, impuestos descontables, retenciones o anticipos, inexistentes o inexactos.",
      "Art. 648 E.T.: La sanción por inexactitud será equivalente al ciento por ciento (100%) de la diferencia entre el saldo a pagar o saldo a favor, según el caso, determinado en la liquidación oficial y el declarado por el contribuyente (o 15% / 200% en casos especiales señalados por la ley).",
    ],
    clave: "Sanción general por inexactitud (Art. 648 E.T.): 100% de la diferencia entre el valor oficial y el declarado. No hay inexactitud cuando se origina en diferencias de criterio razonables sobre el derecho aplicable siempre que los hechos y cifras sean completos y verdaderos.",
    extracto: true,
  },
  {
    id: "et-651",
    norma: "et",
    numero: "651",
    titulo: "Sanción por no enviar información o enviarla con errores",
    texto: [
      "Las personas y entidades obligadas a suministrar información tributaria así como aquellas a quienes se les haya solicitado informaciones o pruebas, que no la suministren, que no la suministren dentro del plazo establecido para ello o cuyo contenido presente errores o no corresponda a lo solicitado, incurrirán en la siguiente sanción:",
      "1. Una multa que no supere siete mil quinientas (7.500) UVT, la cual será fijada teniendo en cuenta los siguientes criterios: a) El uno por ciento (1%) de las sumas respecto de las cuales no se suministró la información exigida; b) El punto siete por ciento (0,7%) de las sumas respecto de las cuales se suministró en forma errónea; c) El punto cinco por ciento (0,5%) de las sumas respecto de las cuales se suministró de forma extemporánea.",
    ],
    clave: "Exógena / información (mod. Ley 2277/2022): tope máximo 7.500 UVT; 1% por no suministrar, 0,7% por errores, 0,5% por extemporaneidad.",
    extracto: true,
  },
  {
    id: "et-714",
    norma: "et",
    numero: "714",
    titulo: "Término general de firmeza de las declaraciones tributarias",
    texto: [
      "La declaración tributaria quedará en firme sí, dentro de los tres (3) años siguientes a la fecha del vencimiento del plazo para declarar, no se ha notificado requerimiento especial. Cuando la declaración inicial se haya presentado en forma extemporánea, los tres (3) años se contarán a partir de la fecha de presentación de la misma.",
      "La declaración tributaria en la que se presente un saldo a favor del contribuyente o responsable quedará en firme sí, tres (3) años después de la fecha de presentación de la solicitud de devolución o compensación, no se ha notificado requerimiento especial.",
    ],
    clave: "Firmeza general: 3 años desde el vencimiento para declarar (o desde la presentación si fue extemporánea, o desde la solicitud de devolución cuando hay saldo a favor). En precios de transferencia o pérdidas fiscales son 5 años.",
    extracto: true,
  },
  {
    id: "et-720",
    norma: "et",
    numero: "720 y 732",
    titulo: "Recurso de reconsideración contra los actos de la Administración Tributaria",
    texto: [
      "Sin perjuicio de lo dispuesto en normas especiales de este Estatuto, contra las liquidaciones oficiales, resoluciones que impongan sanciones u ordenen el reintegro de sumas devueltas y demás actos producidos, en relación con los impuestos administrados por la Unidad Administrativa Especial Dirección General de Impuestos Nacionales, procede el Recurso de Reconsideración.",
      "El recurso de reconsideración, salvo norma expresa en contrario, deberá interponerse ante la oficina competente, dentro de los dos (2) meses siguientes a la notificación del mismo.",
      "PARÁGRAFO (Prescindencia — Per Saltum): Cuando se hubiere atendido en debida forma el requerimiento especial y no obstante se practique liquidación oficial, el contribuyente podrá prescindir del recurso de reconsideración y acudir directamente ante la jurisdicción contencioso administrativa dentro de los cuatro (4) meses siguientes a la notificación de la liquidación oficial.",
      "Art. 732 E.T. (Término para resolver): La Administración de Impuestos tendrá un (1) año para resolver los recursos de reconsideración o reposición, contado a partir de su interposición en debida forma (so pena de silencio administrativo positivo del Art. 734 E.T.).",
    ],
    clave: "Recurso de reconsideración: se interpone en 2 meses; la DIAN tiene 1 año para resolver y notificar (Art. 732), o se configura silencio administrativo positivo (Art. 734). Procede demanda per saltum en 4 meses si se respondió en debida forma el requerimiento especial.",
    extracto: true,
  },
  {
    id: "et-869",
    norma: "et",
    numero: "869",
    titulo: "Abuso en materia tributaria (Cláusula antiabuso)",
    texto: [
      "La Administración Tributaria podrá recaracterizar o reconfigurar toda operación o serie de operaciones que constituya abuso en materia tributaria y, consecuentemente, desconocer sus efectos. En este sentido, podrá expedir los actos administrativos correspondientes en los cuales proponga y liquide los impuestos, intereses y sanciones respectivos.",
      "Una operación o serie de operaciones constituirá abuso en materia tributaria cuando involucre el uso o la implementación de uno o varios actos o negocios jurídicos artificiosos, sin razón o propósito económico y/o comercial aparente, con el fin de obtener provecho tributario, independientemente de cualquier intención subjetiva adicional.",
    ],
    clave: "Abuso tributario: actos artificiosos sin razón o propósito económico/comercial aparente para obtener provecho tributario; faculta a la DIAN para recaracterizar la operación.",
    extracto: true,
  },

  // ───────────────────────── ADUANAS, CAMBIOS Y ANTICONTRABANDO ─────────────────────────
  {
    id: "adu-3",
    norma: "aduanas",
    numero: "D. 1165/2019 Arts. 3 y 4",
    titulo: "Obligación aduanera y responsables",
    texto: [
      "La obligación aduanera es el vínculo jurídico entre la Administración Aduanera y cualquier persona directa o indirectamente relacionada con cualquier formalidad, régimen, destino u operación aduanera, derivado del cumplimiento de las obligaciones correspondientes a cada una de ellas, quedando las mercancías sometidas a la potestad aduanera y a la aplicación de las medidas de control.",
      "Son responsables de la obligación aduanera el importador, el exportador, el propietario, el poseedor o el tenedor de la mercancía; así mismo, serán responsables de las obligaciones que se deriven por su intervención, el transportador, el agente de carga internacional, el depositario, intermediario y el declarante (Agencia de Aduanas).",
    ],
    clave: "La obligación aduanera comprende presentar la declaración, pagar los tributos aduaneros y conservar los documentos soporte (5 años).",
    extracto: true,
  },
  {
    id: "adu-648",
    norma: "aduanas",
    numero: "D. 1165/2019 (Medida cautelar)",
    titulo: "Aprehensión y decomiso de mercancías",
    texto: [
      "La aprehensión es una medida cautelar consistente en la retención de mercancías, medios de transporte o unidades de carga, mientras la autoridad aduanera verifica su legal introducción, permanencia y circulación en el territorio aduanero nacional, en los términos previstos en este decreto.",
      "El decomiso es el acto en virtud del cual pasan a poder de la Nación las mercancías, medios de transporte o unidades de carga, respecto de los cuales no se acredite el cumplimiento de los trámites previstos para su legal introducción, permanencia y circulación en el territorio aduanero nacional.",
    ],
    clave: "Aprehensión = medida cautelar administrativa de retención física en acta motivada. Decomiso = decisión de fondo por la cual la mercancía pasa a poder de la Nación.",
    extracto: true,
  },
  {
    id: "adu-727",
    norma: "aduanas",
    numero: "D. 1165/2019 Art. 727",
    titulo: "Devolución y compensación de tributos aduaneros",
    texto: [
      "Podrá solicitarse la devolución o compensación de los tributos aduaneros y demás sumas pagadas en exceso o por pago de lo no debido, dentro de los seis (6) meses siguientes a la fecha en que se realizó el pago que dio origen al saldo a favor o desde la ejecutoria del acto administrativo que declare el pago en exceso o de lo no debido.",
    ],
    clave: "Devolución de tributos aduaneros: el término para radicar la solicitud es de 6 meses siguientes al pago o ejecutoria del acto.",
    extracto: true,
  },
  {
    id: "cam-2245",
    norma: "aduanas",
    numero: "D.L. 2245/2011 Arts. 3 y 5",
    titulo: "Régimen sancionatorio cambiario de competencia DIAN y prescripción de la acción",
    texto: [
      "La Dirección de Impuestos y Aduanas Nacionales ejerce el control y vigilancia sobre el cumplimiento del régimen cambiario en materia de importación y exportación de bienes y servicios, gastos asociados a las mismas, financiación en moneda extranjera de importaciones y exportaciones, y sobrefacturación y subfacturación de estas operaciones.",
      "Prescripción de la acción sancionatoria cambiaria (Art. 5): La imposición de sanciones cambiarias requiere la formulación previa de un acto de formulación de cargos, el cual deberá notificarse dentro de los cinco (5) años siguientes a la fecha en que ocurrieron los hechos constitutivos de infracción.",
    ],
    clave: "El acto de formulación de cargos cambiarios debe notificarse dentro de los 5 años siguientes a la ocurrencia de la infracción.",
    extracto: true,
  },
  {
    id: "l1762-1",
    norma: "aduanas",
    numero: "Ley 1762/2015 Art. 4",
    titulo: "Delito de contrabando y umbral penal (50 SMLMV)",
    texto: [
      "El que introduzca o extraiga mercancías en cuantía superior a cincuenta (50) salarios mínimos legales mensuales vigentes, al o desde el territorio colombiano, por lugares no habilitados de acuerdo con la normativa aduanera vigente, u oculte, disimule o sustraiga de la intervención y control aduanero mercancías en cuantía superior a cincuenta (50) salarios mínimos legales mensuales vigentes, incurrirá en prisión de cuatro (4) a ocho (8) años y multa del doscientos (200%) al trescientos (300%) por ciento del valor aduanero de los bienes objeto del delito.",
    ],
    clave: "En cuantía superior a 50 SMLMV, además del proceso administrativo de aprehensión y decomiso de la DIAN, se configura el delito penal de contrabando (Art. 319 C. Penal).",
    extracto: true,
  },
];

const BY_ID = new Map(ARTICULOS.map((a) => [a.id, a]));

export function getArticulo(id: string): Articulo | undefined {
  return BY_ID.get(id);
}

export function citaArticulo(a: Articulo): string {
  const n = NORMAS[a.norma];
  if (a.norma === "integridad") return `${n.nombre} · ${a.titulo}`;
  if (a.norma === "aduanas") return `${a.numero}`;
  return `Art. ${a.numero} ${n.sigla}`;
}

const VALORES = ["int-honestidad", "int-respeto", "int-compromiso", "int-diligencia", "int-justicia"];

/** Artículos que se estudian dentro de cada lección. */
export const MODULE_ARTICLES: Record<string, string[]> = {
  "ficha-empleo": ["cp-122", "cp-125", "cp-209"],
  "cobro-persuasivo": ["l1066-1", "et-814", "et-817", "et-818", "et-841"],
  "cobro-coactivo": [
    "et-823",
    "et-824",
    "et-825",
    "et-826",
    "et-828",
    "et-829",
    "et-830",
    "et-831",
    "et-832",
    "et-833",
    "et-833-1",
    "et-834",
    "et-835",
    "et-836",
    "et-817",
    "et-818",
  ],
  "medidas-cautelares": ["et-837", "et-838", "et-825-1", "et-836", "et-841", "et-833"],
  "devoluciones-compensaciones": ["et-815", "et-816", "et-850", "et-854", "et-855", "et-857", "et-860", "adu-727"],
  "recaudo-ear": ["et-800", "et-801", "et-804", "et-828"],
  "control-extensivo": ["et-684", "et-685", "et-714", "et-715", "et-717", "et-644", "et-642", "et-651"],
  "procesos-concursales": ["l1116-20", "et-827", "et-818"],
  cpaca: ["cpaca-3", "l1755-14", "cpaca-74", "cpaca-75", "cpaca-76", "cpaca-83", "cpaca-93", "et-720", "cp-23"],
  "constitucion-funcion": ["cp-1", "cp-13", "cp-29", "cp-95", "cp-122", "cp-125", "cp-209", "cp-338", "cp-363"],
  "sistema-tributario": ["cp-338", "cp-363", "cp-95", "et-260-1", "et-869", "adu-3", "adu-648", "cam-2245"],
  "mipg-archivo": ["mipg-def", "l594-11", "l594-23", "et-583"],
  "servicio-pqrsf": ["cp-23", "l1755-14", "cpaca-3"],
  "comportamiento-etico": ["cpaca-11", ...VALORES],
  "comunicacion-equipo": ["cp-209", "int-respeto", "int-compromiso"],
  "codigo-integridad": [...VALORES, "cpaca-11", "et-583"],
  "valores-cinco": VALORES,
  "razonamiento-matematico": ["et-635", "et-639", "et-641", "et-642", "et-644", "et-804"],
  "principios-contables-financieros": ["et-772", "et-772-1", "et-260-1"],
  "estructura-dian": ["cp-209", "et-824", "et-825"],
  "ofimatica-dian": ["et-583", "et-651"],
  "rol-gestor": ["et-824", "et-826", "et-817", "et-720", "cpaca-11"],
  "fiscalizacion-determinacion": [
    "et-684",
    "et-702",
    "et-703",
    "et-704",
    "et-705",
    "et-707",
    "et-710",
    "et-714",
    "et-715",
    "et-717",
    "et-647",
    "et-651",
    "et-720",
    "et-869",
  ],
  "inspeccion-visitas": ["et-684", "et-779", "et-583", "cp-29", "adu-3", "adu-648", "cam-2245", "l1762-1"],
};

export function articlesForModule(moduleId: string): Articulo[] {
  return (MODULE_ARTICLES[moduleId] ?? [])
    .map((id) => BY_ID.get(id))
    .filter((a): a is Articulo => Boolean(a));
}

/** Lecciones (ids) que citan un artículo. */
export function modulesForArticle(articleId: string): string[] {
  return Object.entries(MODULE_ARTICLES)
    .filter(([, ids]) => ids.includes(articleId))
    .map(([mid]) => mid);
}
