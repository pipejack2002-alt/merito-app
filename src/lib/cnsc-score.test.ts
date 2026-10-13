import test from "node:test";
import assert from "node:assert/strict";
import {
  trunc100,
  formatPuntaje,
  calculateWeightedScore,
  calculatePassingProbability,
  calculateQuestionsNeeded,
} from "./cnsc-score.ts";

test("trunc100 calcula truncado a 2 decimales sin redondeo según Anexo Técnico", () => {
  // 66.66666... debe ser 66.66, NO 66.67
  assert.equal(trunc100(2, 3), 66.66);
  // 100% debe ser 100
  assert.equal(trunc100(10, 10), 100);
  // 0% debe ser 0
  assert.equal(trunc100(0, 10), 0);
  // división por 0 debe ser 0 sin errores
  assert.equal(trunc100(0, 0), 0);
  assert.equal(trunc100(5, 0), 0);
  // 7 de 10 = 70
  assert.equal(trunc100(7, 10), 70);
  // correct > total debe limitarse al 100%
  assert.equal(trunc100(15, 10), 100);
});

test("formatPuntaje formatea correctamente a dos decimales", () => {
  assert.equal(formatPuntaje(70), "70.00");
  assert.equal(formatPuntaje(66.66), "66.66");
  assert.equal(formatPuntaje(0), "0.00");
  assert.equal(formatPuntaje(NaN), "0.00");
});

test("calculateWeightedScore pondera según pesos oficiales del Acuerdo 21", () => {
  // Funcional 80, Comportamental 70, Integridad 90 con pesos 0.60, 0.25, 0.15
  // (80 * 0.6) + (70 * 0.25) + (90 * 0.15) = 48 + 17.5 + 13.5 = 79.0
  const score = calculateWeightedScore({
    funcional: 80,
    comportamental: 70,
    integridad: 90,
  });
  assert.equal(score, 79);
});

test("calculatePassingProbability estima la probabilidad de superar la eliminatoria", () => {
  // Caso 1: Sin datos
  const empty = calculatePassingProbability(0, 0);
  assert.equal(empty.probability, 0);
  assert.equal(empty.confidence, "baja");
  assert.equal(empty.status, "critico");

  // Caso 2: Puntaje alto (85.0) con alta muestra (50 preguntas)
  const safe = calculatePassingProbability(85.0, 50);
  assert.ok(safe.probability >= 85, "Probabilidad debe ser alta");
  assert.equal(safe.confidence, "alta");
  assert.equal(safe.status, "seguro");

  // Caso 3: Justo en el corte (70.0)
  const cutoff = calculatePassingProbability(70.0, 40);
  assert.equal(cutoff.status, "competitivo");
  assert.ok(cutoff.probability >= 45 && cutoff.probability <= 60);

  // Caso 4: Por debajo del corte (55.0)
  const low = calculatePassingProbability(55.0, 40);
  assert.equal(low.status, "critico");
  assert.ok(low.probability <= 30);
});

test("calculateQuestionsNeeded calcula aciertos necesarios para alcanzar el corte", () => {
  // Si ya tiene 7 de 10 (70%), necesita 0
  assert.equal(calculateQuestionsNeeded(7, 10, 70), 0);
  // Si tiene 4 de 10 (40%), para llegar al 70%:
  // (4 + x) / (10 + x) >= 0.7 => 4 + x >= 7 + 0.7x => 0.3x >= 3 => x >= 10
  assert.equal(calculateQuestionsNeeded(4, 10, 70), 10);
});
