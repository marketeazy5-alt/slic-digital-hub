import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const file = join(
  ".vercel", "output", "functions", "__server.func", "_libs",
  "supabase__functions-js.mjs",
);

try {
  let content = readFileSync(file, "utf8");
  const original = 'import { __awaiter } from "tslib";';
  const inline = [
    "var __awaiter=function(t,a,p,g){",
    "function ad(v){return v instanceof p?v:new p(function(r){r(v)})}",
    "return new(p||(p=Promise))(function(r,j){",
    "function fn(v){try{st(g.next(v))}catch(e){j(e)}}",
    'function rj(v){try{st(g["throw"](v))}catch(e){j(e)}}',
    "function st(r){r.done?r(r.value):ad(r.value).then(fn,rj)}",
    "st((g=g.apply(t,a||[])).next())",
    "});};",
  ].join("");
  content = content.replace(original, inline);
  writeFileSync(file, content, "utf8");
  console.log("✓ Inlined __awaiter in supabase__functions-js.mjs");
} catch {
  console.warn("⚠ supabase__functions-js.mjs not found, skipping postbuild");
}
