import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data");
const files = [
  { file: path.join(root, "cars_ds_final.csv"), source: "final" },
  { file: path.join(root, "cars_ds_final_2021.csv"), source: "final_2021" }
];

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const rowsByKey = new Map();

for (const { file, source } of files) {
  const csvText = fs.readFileSync(file, "utf8");
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  for (const record of records) {
    const row = { ...record };
    delete row[""]; // remove empty index header if present

    const canonicalKey = [row.Make, row.Model, row.Variant, row.Ex-Showroom_Price].map((v) => (v || "").trim()).join("|");
    if (!canonicalKey.trim()) continue;

    const normalized = {
      ...row,
      source,
      id: `car-${Array.from(rowsByKey.keys()).length + 1}`,
      exShowroomPriceRaw: row["Ex-Showroom_Price"],
      exShowroomPrice: (() => {
        const p = (row["Ex-Showroom_Price"] || "").replace(/Rs\.?\s*/gi, "").replace(/,/g, "").trim();
        const num = Number(p);
        return Number.isFinite(num) ? num : null;
      })()
    };

    if (!rowsByKey.has(canonicalKey)) {
      rowsByKey.set(canonicalKey, normalized);
    }
  }
}

const combined = Array.from(rowsByKey.values());
const outputPath = path.join(dataDir, "cars_ds_combined.json");
fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2), "utf8");
console.log(`Wrote ${combined.length} combined car records to ${outputPath}`);
