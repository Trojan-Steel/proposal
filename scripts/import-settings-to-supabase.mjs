import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before running import:settings.",
  );
  process.exit(1);
}

const exportPath = path.resolve(process.cwd(), "settings-export.json");

let raw;
try {
  raw = await fs.readFile(exportPath, "utf8");
} catch (error) {
  console.error(`Unable to read ${exportPath}: ${error.message}`);
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(raw);
} catch (error) {
  console.error(`settings-export.json is not valid JSON: ${error.message}`);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const { error } = await supabase
  .from("app_settings")
  .upsert({ id: "default", data: parsed }, { onConflict: "id" });

if (error) {
  console.error(`Supabase upsert failed: ${error.message}`);
  process.exit(1);
}

const keys = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? Object.keys(parsed) : [];
console.log("OK");
console.log(keys.join(", "));
