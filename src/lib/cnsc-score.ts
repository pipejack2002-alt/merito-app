/**
 * Motor de Cálculo Matemático y Estadístico Oficial CNSC · Proceso 2676
 * Basado estrictamente en:
 * - Acuerdo 21 de 2025 (CNSC)
 * - Anexo Técnico de Pruebas Escritas
 * - Matriz de Calificación Areandina
 */

/** Anexo técnico 2676: escala 0–100, dos decimales truncados (no redondeados). */
export function trunc100(correct: number, total: number): number {
  if (!total || total <= 0 || correct <= 0) return 0;
  const clampedCorrect = Math.min(correct, total);
  return Math.trunc((clampedCorrect / total) * 10000) / 100;
}

/** Formatea cualquier puntaje en formato colombiano estándar (dos decimales). */
export function formatPuntaje(n: number): string {
  if (isNaN(n) || !isFinite(n)) return "0.00";
  return n.toFixed(2);
}

/**
 * Ponderado Oficial Global de Pruebas Escritas (Acuerdo 21, Artículo 17)
 * - Prueba de Competencias Funcionales (Eliminatoria): 60%
 * - Prueba de Competencias Comportamentales (Clasificatoria): 25%
 * - Prueba de Integridad Pública DIAN (Clasificatoria): 15%
 */
export function calculateWeightedScore(
  scores: {
    funcional: number;
    comportamental: number;
    integridad: number;
  },
  weights = {
    funcional: 0.6,
    comportamental: 0.25,
    integridad: 0.15,
  },
): number {
  const sumWeights = weights.funcional + weights.comportamental + weights.integridad;
  const raw =
    scores.funcional * weights.funcional +
    scores.comportamental * weights.comportamental +
    scores.integridad * weights.integridad;
  const normalized = sumWeights > 0 ? raw / sumWeights : 0;
  return Math.trunc(normalized * 100) / 100;
}

export type ConfidenceLevel = "baja" | "media" | "alta";
export type PassingStatus = "seguro" | "competitivo" | "en_riesgo" | "critico";

export interface PassingProbabilityResult {
  probability: number; // 0 a 100
  margin: number; // Margen respecto al corte
  confidence: ConfidenceLevel;
  status: PassingStatus;
  label: string;
  recommendation: string;
}

/**
 * Estimador Bayesiano / Z-Score de Probabilidad de Superar la Fase Eliminatoria
 * La prueba funcional exige superar el umbral eliminatorio (por defecto 70.00 pts).
 * Ajusta la probabilidad teniendo en cuenta el tamaño muestral (número de preguntas respondidas)
 * para evitar sobreconfianza con pocas preguntas.
 */
export function calculatePassingProbability(
  funcionalScore: number,
  answeredCount: number,
  cutoff = 70.0,
): PassingProbabilityResult {
  if (answeredCount <= 0 || isNaN(funcionalScore)) {
    return {
      probability: 0,
      margin: -cutoff,
      confidence: "baja",
      status: "critico",
      label: "Sin datos suficientes",
      recommendation: "Responde al menos 10 preguntas en el simulador o entrenador para calcular tu probabilidad.",
    };
  }

  const margin = Math.round((funcionalScore - cutoff) * 100) / 100;

  // Nivel de confianza estadística según tamaño muestral
  let confidence: ConfidenceLevel = "baja";
  let sampleWeight = 0.5; // Factor de amortiguación hacia el prior (50%)
  if (answeredCount >= 35) {
    confidence = "alta";
    sampleWeight = 0.95;
  } else if (answeredCount >= 15) {
    confidence = "media";
    sampleWeight = 0.8;
  } else {
    confidence = "baja";
    sampleWeight = 0.55;
  }

  // Modelo logístico sigmoide centrado en el corte (cutoff)
  // Con k = 0.15, un puntaje de 70 da 50%, 80 da ~82%, 60 da ~18%, 90 da ~95%
  const k = 0.14;
  const rawLogistic = 1 / (1 + Math.exp(-k * margin));
  const rawPct = rawLogistic * 100;

  // Aplicamos ponderación bayesiana con la incertidumbre muestral
  // Si hay pocas preguntas, la probabilidad gravita moderadamente hacia el promedio neutro (50%)
  const adjustedProb = Math.round(rawPct * sampleWeight + 50 * (1 - sampleWeight));
  const finalProb = Math.min(99, Math.max(1, adjustedProb));

  let status: PassingStatus = "critico";
  let label = "Zona Crítica · Riesgo de Exclusión";
  let recommendation =
    "Tu puntaje actual en funcionales está por debajo del umbral de 70.00. Enfócate urgentemente en repasar los módulos débiles en Guías de Estudio.";

  if (funcionalScore >= 75) {
    status = "seguro";
    label = "Zona Segura · Alta Probabilidad";
    recommendation =
      "Superas cómodamente el corte eliminatorio. Mantén el ritmo practicando con cronómetro para consolidar velocidad.";
  } else if (funcionalScore >= 70) {
    status = "competitivo";
    label = "Zona Competitiva · Aprobado Justo";
    recommendation =
      "Estás por encima del corte mínimo de 70.00, pero con margen ajustado. Unas pocas preguntas dudosas podrían comprometer tu elegibilidad.";
  } else if (funcionalScore >= 60) {
    status = "en_riesgo";
    label = "Zona de Riesgo · Cerca del Umbral";
    recommendation =
      "Estás a pocos aciertos de alcanzar el 70.00 eliminatorio. Repasar la sección de Fallos puede subirte directamente a zona aprobatoria.";
  }

  return {
    probability: finalProb,
    margin,
    confidence,
    status,
    label,
    recommendation,
  };
}

/**
 * Calcula cuántos aciertos consecutivos adicionales se necesitan
 * para alcanzar o superar el puntaje objetivo (ej. 70.00 pts).
 */
export function calculateQuestionsNeeded(
  currentCorrect: number,
  currentTotal: number,
  targetScore = 70.0,
): number {
  if (currentTotal <= 0) return 1;
  const targetFraction = targetScore / 100;
  // (currentCorrect + x) / (currentTotal + x) >= targetFraction
  // currentCorrect + x >= targetFraction * currentTotal + targetFraction * x
  // x * (1 - targetFraction) >= targetFraction * currentTotal - currentCorrect
  const numerator = targetFraction * currentTotal - currentCorrect;
  if (numerator <= 0) return 0;
  const denominator = 1 - targetFraction;
  if (denominator <= 0) return 0;
  return Math.ceil(numerator / denominator);
}
