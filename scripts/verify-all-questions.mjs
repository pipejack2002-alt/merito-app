import fs from "fs";

const files = [
  "src/data/questions-funcionales.ts",
  "src/data/questions-comportamentales.ts",
  "src/data/questions-integridad.ts",
  "src/data/questions-oficiales.ts",
  "src/data/questions-cargos.ts",
];

const allQuestions = [];
const idCounts = {};
let hasErrors = false;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  // Find all question blocks
  const matches = [...content.matchAll(/\{\s*id:\s*["']([^"']+)["']\s*,\s*\n\s*track:\s*["']([^"']+)["']/g)];
  console.log(`${file}: found ${matches.length} questions`);

  for (const m of matches) {
    const id = m[1];
    idCounts[id] = (idCounts[id] || 0) + 1;
    allQuestions.push({ id, track: m[2], file });
  }
}

console.log("\n=== TOTAL DIAN QUESTIONS ===");
console.log(`Total questions in DIAN exam bank: ${allQuestions.length}`);

// Check duplicates
const duplicates = Object.entries(idCounts).filter(([_, count]) => count > 1);
if (duplicates.length > 0) {
  console.error("DUPLICATES FOUND:", duplicates);
  hasErrors = true;
} else {
  console.log("✓ Zero duplicate IDs across all files!");
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log("✓ All question bank validations PASSED!");
}
