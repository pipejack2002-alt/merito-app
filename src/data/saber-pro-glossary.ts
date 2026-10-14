/**
 * Glosario y Traductor Oficial de Términos y Jerga ICFES Saber Pro 2026
 * Traduce conceptos técnicos, falacias lógicas en latín, términos contables/financieros
 * y figuras jurídicas a lenguaje cotidiano con ejemplos prácticos y claves para el examen.
 */

export interface GlossaryTerm {
  id: string;
  term: string;
  category: "falacias" | "ciudadanas" | "cuantitativo" | "financiero" | "auditoria";
  categoryLabel: string;
  plainMeaning: string; // Traducción al lenguaje común y corriente
  example: string; // Ejemplo de la vida real o del debate
  examTip: string; // Cómo identificarlo en las preguntas del ICFES
  searchTerms: string[];
}

export const SABER_PRO_GLOSSARY: GlossaryTerm[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. FALACIAS ARGUMENTATIVAS Y LECTURA CRÍTICA (LATÍN Y LÓGICA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "ad-hominem",
    term: "Ataque a la Persona (Ad Hominem)",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Descalificar la idea o propuesta de alguien atacando sus defectos personales, su pasado, su profesión o su estilo de vida, en lugar de demostrar si la idea en sí misma es buena o mala.",
    example:
      "«No debemos aprobar el plan de ciclorrutas del arquitecto porque él admitió que no sabe montar bicicleta». (El plan técnico puede ser brillante aunque él no pedalee).",
    examTip:
      "Si el personaje del texto insulta, cuestiona la moral o los hábitos del autor de la propuesta en vez de mostrar cifras técnicas o argumentos lógicos, marca siempre 'Ad Hominem'.",
    searchTerms: ["ad hominem", "hominem", "ataque a la persona", "descalificar", "falacia"],
  },
  {
    id: "ad-misericordiam",
    term: "Apelación a la Piedad (Ad Misericordiam)",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Intentar convencer a los demás provocando lástima, compasión o culpa, en lugar de presentar razones lógicas o pruebas válidas.",
    example:
      "«Profesor, no me puede reprobar la materia, porque si la pierdo mi mamá se va a enfermar del disgusto y me van a quitar el subsidio».",
    examTip:
      "Busca palabras de sufrimiento, enfermedad, tragedia o lágrimas que se utilicen como 'prueba' para que se tome una decisión.",
    searchTerms: ["ad misericordiam", "misericordiam", "piedad", "lastima", "compasion", "falacia"],
  },
  {
    id: "ad-verecundiam",
    term: "Apelación a la Falsa Autoridad (Ad Verecundiam)",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Dar por cierta una afirmación únicamente porque la dijo una persona famosa o respetada, pero que no es experta en ese tema específico.",
    example:
      "«Esta pasta dental cura enfermedades cardíacas porque lo afirmó un famoso actor de telenovelas en televisión».",
    examTip:
      "Identifica si la persona citada como autoridad realmente tiene título o experticia demostrada en el área sobre la que opina.",
    searchTerms: ["ad verecundiam", "verecundiam", "autoridad", "falsa autoridad", "famoso"],
  },
  {
    id: "hombre-de-paja",
    term: "Falacia del Hombre de Paja (Straw Man)",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Distorsionar, exagerar o caricaturizar lo que dijo la otra persona para que parezca una locura ridícula y así sea más fácil atacarla.",
    example:
      "Persona A: «Deberíamos regular el tráfico de motocicletas en horas pico». Persona B: «Usted lo que quiere es destruir la economía y dejar a todos los trabajadores sin transporte».",
    examTip:
      "Verifica si la respuesta del oponente cambia completamente las palabras del autor original llevándolas a un extremo absurdo.",
    searchTerms: ["hombre de paja", "straw man", "distorsion", "exageracion", "caricaturizar"],
  },
  {
    id: "falso-dilema",
    term: "Falso Dilema (Blanco o Negro)",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Reducir una situación compleja a solo dos opciones extremas e incompatibles, ocultando que existen opciones intermedias y matices.",
    example:
      "«O privatizamos completamente la salud o nos convertimos en un estado fallido en ruinas; no hay término medio».",
    examTip:
      "Detecta expresiones como «O estás con nosotros o estás contra nosotros», «O todo o nada». El ICFES premia identificar que hay matices y terceras vías.",
    searchTerms: ["falso dilema", "blanco o negro", "dos opciones", "polarizacion"],
  },
  {
    id: "peticion-de-principio",
    term: "Petición de Principio (Razonamiento Circular)",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Pretender demostrar algo usando la misma afirmación como prueba (un círculo vicioso que no aporta evidencia nueva).",
    example:
      "«El candidato siempre dice la verdad porque es una persona honesta y las personas honestas nunca mienten».",
    examTip:
      "Si la conclusión y la premisa dicen exactamente lo mismo con distintas palabras sin presentar datos nuevos, es petición de principio.",
    searchTerms: ["peticion de principio", "circular", "circulo vicioso", "razonamiento circular"],
  },
  {
    id: "falsa-analogia",
    term: "Falsa Analogía",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Comparar dos cosas que tienen una semejanza superficial mínima, pero que en el fondo funcionan bajo reglas completamente distintas.",
    example:
      "«Si un padre de familia puede castigar sin juicio a su hijo de 5 años, el presidente puede encarcelar ciudadanos sin debido proceso».",
    examTip:
      "Pregúntate si la comparación entre las dos entidades es jurídicamente o lógicamente válida o si ignora diferencias sustanciales.",
    searchTerms: ["falsa analogia", "analogia", "comparacion", "semejanza"],
  },
  {
    id: "generalizacion-apresurada",
    term: "Generalización Apresurada",
    category: "falacias",
    categoryLabel: "Falacias y Argumentación (Lectura Crítica)",
    plainMeaning:
      "Sacar una regla general universal para todo el mundo a partir de apenas uno o dos casos aislados.",
    example:
      "«Mi tío compró ese modelo de carro y se le dañó el motor a los dos meses; por lo tanto, esa marca es la peor del mundo».",
    examTip:
      "Cuidado con las palabras absolutistas en las opciones de respuesta: 'siempre', 'nunca', 'todos', 'ninguno'. Suelen ser distractores.",
    searchTerms: ["generalizacion", "apresurada", "todos", "siempre", "muestra pequena"],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. COMPETENCIAS CIUDADANAS Y DERECHO CONSTITUCIONAL
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "accion-tutela",
    term: "Acción de Tutela (Artículo 86)",
    category: "ciudadanas",
    categoryLabel: "Competencias Ciudadanas y Constitución",
    plainMeaning:
      "Mecanismo rápido y urgente ante cualquier juez para proteger derechos fundamentales individuales (vida, salud, debido proceso, libertad) cuando están siendo vulnerados y no existe otro medio eficaz.",
    example:
      "Una EPS le niega a un paciente con cáncer un medicamento vital ordenado por el médico tratante; el paciente interpone tutela para que el juez ordene la entrega en 48 horas.",
    examTip:
      "Aplica para derechos FUNDAMENTALES e INDIVIDUALES. Si el derecho es colectivo (como contaminación de un río o espacio público), la tutela NO es el mecanismo; sería Acción Popular.",
    searchTerms: ["tutela", "accion de tutela", "derecho fundamental", "salud", "vida", "juez"],
  },
  {
    id: "accion-popular",
    term: "Acción Popular (Artículo 88)",
    category: "ciudadanas",
    categoryLabel: "Competencias Ciudadanas y Constitución",
    plainMeaning:
      "Mecanismo judicial para defender derechos colectivos de toda la comunidad (medio ambiente sano, moralidad administrativa, espacio público, seguridad pública).",
    example:
      "Una constructora invade la zona verde comunitaria de un barrio para hacer un parqueadero privado; los vecinos presentan Acción Popular para proteger el espacio público de todos.",
    examTip:
      "Derechos de la comunidad entera = Acción Popular. Derechos individuales de una persona = Acción de Tutela. Esta distinción es una pregunta fija del ICFES.",
    searchTerms: ["accion popular", "derechos colectivos", "medio ambiente", "espacio publico", "comunidad"],
  },
  {
    id: "habeas-corpus",
    term: "Habeas Corpus",
    category: "ciudadanas",
    categoryLabel: "Competencias Ciudadanas y Constitución",
    plainMeaning:
      "Garantía constitucional que protege la libertad personal cuando alguien es detenido ilegalmente o se prolonga su detención más de 36 horas sin resolver su situación judicial.",
    example:
      "La policía retiene a un ciudadano sin orden judicial y pasan dos días sin presentarlo ante un juez de control de garantías; se interpone Habeas Corpus para ordenar su libertad inmediata en 36 horas.",
    examTip:
      "El plazo máximo para resolver un Habeas Corpus es de 36 horas continuas. Es un derecho inviolable incluso durante estados de conmoción interior.",
    searchTerms: ["habeas corpus", "libertad", "detencion ilegal", "36 horas", "captura"],
  },
  {
    id: "debido-proceso",
    term: "Debido Proceso (Artículo 29)",
    category: "ciudadanas",
    categoryLabel: "Competencias Ciudadanas y Constitución",
    plainMeaning:
      "Garantía de que a cualquier persona se le deben respetar las reglas, los tiempos, el derecho a presentar pruebas y la oportunidad de defenderse antes de imponerle una sanción o condena.",
    example:
      "Una universidad expulsa a un estudiante de forma sumaria sin permitirle presentar descargos ni controvertir las pruebas; vulneró su derecho fundamental al debido proceso.",
    examTip:
      "Aplica a todas las actuaciones judiciales y administrativas (incluidos trámites ante la DIAN, colegios, universidades o empresas públicas).",
    searchTerms: ["debido proceso", "defensa", "descargos", "pruebas", "presuncion de inocencia"],
  },
  {
    id: "test-proporcionalidad",
    term: "Test de Proporcionalidad y Ponderación",
    category: "ciudadanas",
    categoryLabel: "Competencias Ciudadanas y Constitución",
    plainMeaning:
      "Método de la Corte Constitucional cuando dos derechos fundamentales chocan entre sí: se evalúa si la medida es idónea, necesaria y proporcionada, sin anular ninguno de los dos derechos.",
    example:
      "Libertad de culto vs. Derecho a la tranquilidad del vecindario por el ruido de un templo en la noche: el juez no prohíbe el culto, pero ordena insonorizar el recinto.",
    examTip:
      "En dilemas de derechos, el ICFES descarta opciones radicales que 'anulan totalmente' un derecho. La clave siempre busca la solución más armónica y menos lesiva.",
    searchTerms: ["ponderacion", "proporcionalidad", "choque de derechos", "corte constitucional"],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. GESTIÓN FINANCIERA (CONTADURÍA, ADMINISTRACIÓN, INGENIERÍA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "vpn",
    term: "VPN (Valor Presente Neto)",
    category: "financiero",
    categoryLabel: "Gestión Financiera (Pruebas Específicas)",
    plainMeaning:
      "Calcular a dinero de hoy cuánta ganancia neta dejará un proyecto después de recuperar toda la inversión inicial y cubrir la tasa de interés requerida.",
    example:
      "Inviertes $100 millones hoy. Traes a valor presente los flujos que recibirás en 5 años y suman $130 millones. El VPN es +$30 millones (el proyecto genera riqueza y se acepta).",
    examTip:
      "Criterio de decisión oficial: Si VPN > 0, el proyecto se ACEPTA. Si compiten dos proyectos mutuamente excluyentes, gana el de MAYOR VPN (el VPN prevalece sobre la TIR).",
    searchTerms: ["vpn", "valor presente neto", "van", "evaluacion de proyectos", "inversion"],
  },
  {
    id: "tir",
    term: "TIR (Tasa Interna de Retorno)",
    category: "financiero",
    categoryLabel: "Gestión Financiera (Pruebas Específicas)",
    plainMeaning:
      "La rentabilidad porcentual exacta que rinde el dinero invertido en el proyecto (la tasa a la cual el VPN se vuelve exactamente cero).",
    example:
      "Si la TIR de un proyecto es del 18% anual y el banco te presta al 12%, el proyecto es rentable porque rinde más de lo que cuesta el financiamiento.",
    examTip:
      "Criterio de decisión: Si TIR > Costo de Capital (Tasa de descuento), el proyecto es viable. Si TIR < Costo, se rechaza.",
    searchTerms: ["tir", "tasa interna de retorno", "rentabilidad", "porcentaje", "tasa de descuento"],
  },
  {
    id: "wacc",
    term: "WACC (Costo Promedio Ponderado de Capital)",
    category: "financiero",
    categoryLabel: "Gestión Financiera (Pruebas Específicas)",
    plainMeaning:
      "El promedio ponderado de lo que le cuesta a una empresa conseguir dinero, combinando la tasa que le cobra el banco y la rentabilidad que le exigen los accionistas.",
    example:
      "Si el 60% del dinero viene del banco al 10% (con ahorro tributario) y el 40% de socios al 15%, el WACC promedio ponderado es del 10.4%.",
    examTip:
      "Recuerda la trampa del escudo fiscal: la tasa de interés de la deuda se multiplica por (1 - Tasa de Impuestos) porque los intereses son deducibles de renta.",
    searchTerms: ["wacc", "cpoc", "costo de capital", "escudo fiscal", "deuda y patrimonio"],
  },
  {
    id: "prueba-acida",
    term: "Prueba Ácida (Razón Rápida de Liquidez)",
    category: "financiero",
    categoryLabel: "Gestión Financiera (Pruebas Específicas)",
    plainMeaning:
      "Mide cuántos pesos tiene la empresa en efectivo y cuentas por cobrar inmediatas por cada peso de deuda a corto plazo, SIN contar el inventario (porque vender inventario toma tiempo).",
    example:
      "Activo corriente = $100M, Inventario = $40M, Pasivo corriente = $50M. Prueba ácida = (100 - 40) / 50 = 1.20 (la empresa tiene $1.20 de liquidez pura por cada $1 de deuda).",
    examTip:
      "Fórmula clave: (Activo Corriente - Inventarios) / Pasivo Corriente. Si en el examen te preguntan por qué se excluye el inventario, responde: 'por ser el activo corriente de menor liquidez'.",
    searchTerms: ["prueba acida", "razon rapida", "liquidez", "inventarios", "pasivo corriente"],
  },
  {
    id: "roa-roe",
    term: "Diferencia entre ROA y ROE",
    category: "financiero",
    categoryLabel: "Gestión Financiera (Pruebas Específicas)",
    plainMeaning:
      "ROA mide qué tan productivos son todos los bienes de la empresa. ROE mide cuánto ganaron específicamente los dueños/accionistas por su propio dinero invertido.",
    example:
      "Una empresa con activos de $500M y patrimonio de $200M que gana $50M tiene un ROA del 10% (sobre activos) y un ROE del 25% (sobre patrimonio de los socios).",
    examTip:
      "ROA = Utilidad Neta / Activos Totales. ROE = Utilidad Neta / Patrimonio. Si la empresa usa deuda productiva (apalancamiento favorable), el ROE siempre será mayor que el ROA.",
    searchTerms: ["roa", "roe", "rentabilidad sobre activos", "patrimonio", "du pont"],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. ASEGURAMIENTO Y NORMAS INTERNACIONALES DE AUDITORÍA (NIAs)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "nia-705-salvedades",
    term: "Opinión con Salvedades (NIA 705)",
    category: "auditoria",
    categoryLabel: "Aseguramiento y Control (Contaduría)",
    plainMeaning:
      "El auditor dictamina que los estados financieros en general están bien presentados, 'EXCEPTO POR' un error específico que es importante pero que no contamina toda la empresa.",
    example:
      "La empresa calculó mal la depreciación de un edificio ($50M de error sobre activos de $10.000M): es un error material pero aislado; el auditor opina con salvedades («excepto por la depreciación...»).",
    examTip:
      "Clave NIA 705: El error es MATERIAL pero NO GENERALIZADO. En el examen busca la frase 'opinión con salvedades' o 'excepto por'.",
    searchTerms: ["nia 705", "salvedades", "excepto por", "material no generalizado", "auditoria"],
  },
  {
    id: "nia-705-desfavorable",
    term: "Opinión Desfavorable o Adversa (NIA 705)",
    category: "auditoria",
    categoryLabel: "Aseguramiento y Control (Contaduría)",
    plainMeaning:
      "El auditor concluye que los estados financieros están tan plagados de errores y fraudes que NO representan la realidad económica de la entidad.",
    example:
      "Una empresa infló artificialmente los ingresos en un 70% y ocultó deudas masivas: el error altera toda la contabilidad de arriba a abajo.",
    examTip:
      "Clave NIA 705: El error es MATERIAL Y GENERALIZADO (afecta a casi todos los rubros o representa una porción sustancial).",
    searchTerms: ["opinion adversa", "desfavorable", "nia 705", "material y generalizado", "fraude"],
  },
  {
    id: "nia-705-abstencion",
    term: "Abstención de Opinión (Denegación) (NIA 705)",
    category: "auditoria",
    categoryLabel: "Aseguramiento y Control (Contaduría)",
    plainMeaning:
      "El auditor NO emite opinión porque la empresa le negó información, se quemaron los archivos o hubo una limitación tan grave que no pudo obtener pruebas suficientes para saber si está bien o mal.",
    example:
      "La gerencia no permitió al auditor revisar los inventarios ni los extractos bancarios de las 10 sucursales principales: ante la falta total de pruebas, el auditor se abstiene de opinar.",
    examTip:
      "Falta de evidencia adecuada y suficiente + efecto generalizado = Abstención de Opinión.",
    searchTerms: ["abstencion", "denegacion", "nia 705", "falta de evidencia", "limitacion al alcance"],
  },
  {
    id: "coso",
    term: "Marco de Control Interno COSO",
    category: "auditoria",
    categoryLabel: "Aseguramiento y Control (Contaduría)",
    plainMeaning:
      "El estándar mundial de 5 componentes que garantiza que una entidad opere con honestidad, prevenga fraudes y reporte información financiera veraz.",
    example:
      "Los 5 componentes son: 1) Entorno de control (ética de la gerencia), 2) Evaluación de riesgos, 3) Actividades de control (segregación de funciones), 4) Información y comunicación, 5) Supervisión o monitoreo.",
    examTip:
      "El ICFES evalúa frecuentemente la 'Segregación de funciones': quien autoriza el pago no puede ser quien gira el cheque ni quien concilia el banco.",
    searchTerms: ["coso", "control interno", "segregacion de funciones", "ambiente de control", "riesgos"],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. RAZONAMIENTO CUANTITATIVO Y ESTADÍSTICA
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "aumentos-sucesivos",
    term: "Aumentos y Descuentos Sucesivos",
    category: "cuantitativo",
    categoryLabel: "Razonamiento Cuantitativo",
    plainMeaning:
      "Regla de oro: En porcentajes sucesivos NUNCA sumes ni restes los números directamente (+20% y luego -10% NO es +10%), porque la segunda operación se aplica sobre la nueva cantidad modificada.",
    example:
      "Cuesta $100. Sube 20% -> queda en $120. Luego baja 10% de $120 -> baja $12, quedando en $108 (no en $110). La variación neta real fue del +8%.",
    examTip:
      "Multiplica siempre factores: Aumento del 20% = × 1.20. Disminución del 10% = × 0.90. Factor total: 1.20 × 0.90 = 1.08 (+8%). Este es el distractor número 1 del ICFES.",
    searchTerms: ["aumentos sucesivos", "porcentajes", "descuentos sucesivos", "factor multiplicador"],
  },
  {
    id: "probabilidad-sin-reemplazo",
    term: "Probabilidad Sin Reemplazo",
    category: "cuantitativo",
    categoryLabel: "Razonamiento Cuantitativo",
    plainMeaning:
      "Cuando sacas un objeto o persona de un grupo y no lo devuelves, en la siguiente extracción tanto el total de casos favorables como el total general disminuyen en 1 unidad.",
    example:
      "Hay 5 bolas rojas en una bolsa de 10. La primera roja tiene 5/10 de probabilidad. La segunda roja tiene 4/9 de probabilidad. Total: (5/10) × (4/9) = 20/90 = 2/9.",
    examTip:
      "Atento a la frase del enunciado: 'sin reposición' o 'sin reemplazo'. Resta siempre 1 unidad al numerador y al denominador para el segundo evento.",
    searchTerms: ["probabilidad", "sin reemplazo", "sin reposicion", "fraccion", "eventos dependientes"],
  },
];

/**
 * Función que detecta automáticamente qué términos del glosario
 * aplican a una pregunta específica (analizando contexto, enunciado y opciones).
 */
export function getTermsForQuestion(stem: string, context?: string, choicesText?: string): GlossaryTerm[] {
  const combinedText = `${context || ""} ${stem} ${choicesText || ""}`.toLowerCase();
  
  return SABER_PRO_GLOSSARY.filter((term) => {
    return term.searchTerms.some((st) => combinedText.includes(st.toLowerCase()));
  });
}
