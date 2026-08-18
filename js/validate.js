const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const context = {
  console,
  module: { exports: {} },
  typeof: undefined
};
context.window = context;
context.globalThis = context;
context.root = context;

function run(file) {
  const code = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInNewContext(code, context, { filename: file });
}

run("js/data.js");
run("js/species.js");

const G = context.TREE_GUIDE;
if (!G) {
  console.error("TREE_GUIDE missing");
  process.exit(1);
}

const coupletIds = new Set(G.couplets.map((c) => c.id));
const speciesIds = new Set(G.species.map((s) => s.id));
const errors = [];

if (G.species.length < 50 || G.species.length > 100) {
  errors.push(`species count ${G.species.length} is outside 50–100`);
}

G.couplets.forEach((c) => {
  if (!c.choices || c.choices.length < 2) errors.push(`couplet ${c.id} needs ≥2 choices`);
  (c.choices || []).forEach((ch, i) => {
    if (!ch.to) errors.push(`couplet ${c.id} choice ${i} missing to`);
    else if (ch.to.startsWith("c:") && !coupletIds.has(ch.to.slice(2)))
      errors.push(`couplet ${c.id} → missing couplet ${ch.to}`);
    else if (ch.to.startsWith("s:") && !speciesIds.has(ch.to.slice(2)))
      errors.push(`couplet ${c.id} → missing species ${ch.to}`);
    else if (!ch.to.startsWith("c:") && !ch.to.startsWith("s:"))
      errors.push(`couplet ${c.id} bad target ${ch.to}`);
  });
});

const reachableC = new Set();
const reachableS = new Set();
function walk(ref, stack) {
  if (stack.includes(ref) && ref.startsWith("c:")) {
    errors.push(`cycle at ${ref} via ${stack.join(" → ")}`);
    return;
  }
  if (ref.startsWith("s:")) {
    reachableS.add(ref.slice(2));
    return;
  }
  if (!ref.startsWith("c:")) return;
  const id = ref.slice(2);
  if (reachableC.has(id)) return;
  reachableC.add(id);
  const c = G.couplets.find((x) => x.id === id);
  if (!c) return;
  c.choices.forEach((ch) => walk(ch.to, stack.concat(ref)));
}
walk("c:start", []);

G.couplets.forEach((c) => {
  if (!reachableC.has(c.id)) errors.push(`unreachable couplet ${c.id}`);
});
G.species.forEach((s) => {
  if (!reachableS.has(s.id)) errors.push(`unreachable species ${s.id}`);
  (s.similar || []).forEach((id) => {
    if (!speciesIds.has(id)) errors.push(`${s.id} similar → missing ${id}`);
  });
  ["leaf", "bark", "flower", "fruit", "habitat", "notes", "plate", "latin", "family"].forEach((k) => {
    if (!s[k]) errors.push(`${s.id} missing ${k}`);
  });
  const plate = path.join(root, "assets", "plates", s.id + ".jpg");
  if (!fs.existsSync(plate)) errors.push("missing plate " + s.id + ".jpg");
});

if (new Set(G.species.map((s) => s.id)).size !== G.species.length) {
  errors.push("duplicate species ids");
}

console.log(`couplets: ${G.couplets.length}`);
console.log(`species: ${G.species.length}`);
console.log(`reachable species: ${reachableS.size}`);
if (errors.length) {
  console.error("FAIL");
  errors.forEach((e) => console.error(" -", e));
  process.exit(1);
}
console.log("OK");
