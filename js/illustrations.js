(function (root) {
  const NS = "http://www.w3.org/2000/svg";

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function el(name, attrs, parent) {
    const node = document.createElementNS(NS, name);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (attrs[k] !== undefined && attrs[k] !== null) node.setAttribute(k, attrs[k]);
      });
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function jitterPoly(points, rng, amp, close) {
    let d = "";
    const pts = points.map((p, i) => {
      const j = i === 0 || i === points.length - 1 ? amp * 0.2 : amp;
      return [p[0] + (rng() - 0.5) * j, p[1] + (rng() - 0.5) * j];
    });
    d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
    for (let i = 1; i < pts.length; i++) {
      const q = pts[i - 1];
      const p = pts[i];
      const mx = (q[0] + p[0]) / 2 + (rng() - 0.5) * amp;
      const my = (q[1] + p[1]) / 2 + (rng() - 0.5) * amp;
      d += ` Q ${mx.toFixed(2)} ${my.toFixed(2)} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
    }
    if (close) d += " Z";
    return d;
  }

  function stroke(parent, d, rng, opts) {
    opts = opts || {};
    const g = el("g", { fill: opts.fill || "none", opacity: opts.opacity || 1 }, parent);
    el("path", {
      d,
      stroke: "#2c2416",
      "stroke-width": (opts.w || 0.9) + 0.7,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      opacity: 0.12,
      fill: opts.fill || "none"
    }, g);
    el("path", {
      d,
      stroke: "#3a3328",
      "stroke-width": opts.w || 0.9,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      fill: opts.fill || "none",
      opacity: 0.85
    }, g);
    if (!opts.fill && rng() > 0.35) {
      el("path", {
        d,
        stroke: "#5a5346",
        "stroke-width": (opts.w || 0.9) * 0.45,
        "stroke-linecap": "round",
        fill: "none",
        opacity: 0.35,
        transform: `translate(${(rng() - 0.5) * 0.6} ${(rng() - 0.5) * 0.6})`
      }, g);
    }
    return g;
  }

  function hatch(parent, outline, rng, bounds, density) {
    const clipId = "c" + Math.floor(rng() * 1e9);
    const defs = parent.ownerSVGElement.querySelector("defs");
    const clip = el("clipPath", { id: clipId }, defs);
    el("path", { d: outline }, clip);
    const g = el("g", { clipPath: `url(#${clipId})`, stroke: "#3a3328", "stroke-width": 0.35, opacity: 0.28 }, parent);
    const [x, y, w, h] = bounds;
    const angle = 18 + rng() * 16;
    const rad = (angle * Math.PI) / 180;
    const step = density || 3.4;
    const len = Math.hypot(w, h) * 1.4;
    for (let i = -len; i < len; i += step + rng() * 0.5) {
      const cx = x + w / 2 + i * Math.cos(rad + Math.PI / 2);
      const cy = y + h / 2 + i * Math.sin(rad + Math.PI / 2);
      const x1 = cx - Math.cos(rad) * len;
      const y1 = cy - Math.sin(rad) * len;
      const x2 = cx + Math.cos(rad) * len;
      const y2 = cy + Math.sin(rad) * len;
      el("line", { x1, y1, x2, y2 }, g);
    }
  }

  function label(parent, x, y, text, rng) {
    const t = el("text", {
      x,
      y,
      "font-family": "Caveat, cursive",
      "font-size": 13 + rng() * 1.5,
      fill: "#4a4030",
      opacity: 0.85,
      transform: `rotate(${(rng() - 0.5) * 6} ${x} ${y})`
    }, parent);
    t.textContent = text;
  }

  function ovalLeaf(cx, cy, len, wid, rng, opts) {
    opts = opts || {};
    const n = 22;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * Math.PI * 2;
      let px = Math.sin(t) * wid;
      let py = -Math.cos(t) * len;
      if (opts.tip) py *= t > Math.PI ? 1 : 1 + opts.tip * Math.cos(t);
      if (opts.cordate && py > len * 0.55) {
        px *= 1.05;
        py += Math.cos(t) * 6;
      }
      if (opts.teeth) {
        const tooth = Math.sin(t * opts.teeth) * (t % (Math.PI) > 0.2 && t % Math.PI < Math.PI - 0.2 ? 2.2 : 0);
        const nx = Math.sin(t);
        const ny = -Math.cos(t);
        px += nx * tooth;
        py += ny * tooth * 0.6;
      }
      pts.push([cx + px, cy + py]);
    }
    if (opts.auricles) {
      pts.splice(1, 0, [cx - wid * 0.55, cy + len * 0.92], [cx - wid * 0.15, cy + len * 0.78]);
      pts.splice(pts.length - 2, 0, [cx + wid * 0.15, cy + len * 0.78], [cx + wid * 0.55, cy + len * 0.92]);
    }
    return jitterPoly(pts, rng, 0.9, true);
  }

  function lobedLeaf(cx, cy, len, wid, rng, opts) {
    opts = opts || {};
    const lobes = opts.lobes || 4;
    const pts = [];
    const steps = lobes * 8;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const side = t <= 0.5 ? 1 : -1;
      const s = t <= 0.5 ? t * 2 : (1 - t) * 2;
      const envelope = Math.sin(s * Math.PI) * wid;
      const lobeWave = 0.55 + 0.45 * Math.abs(Math.sin(s * Math.PI * lobes));
      let r = envelope * (opts.deep ? 0.35 + 0.65 * lobeWave : 0.62 + 0.38 * lobeWave);
      if (opts.pointed) r *= 1.05;
      const y = cy + len - s * 2 * len;
      const x = cx + side * r;
      let px = x;
      let py = y;
      if (opts.bristle && lobeWave > 0.9) {
        px += side * 4.5;
      }
      pts.push([px, py]);
    }
    if (opts.auricles) {
      pts.push([cx + 7, cy + len + 2], [cx + 3, cy + len - 4], [cx - 3, cy + len - 4], [cx - 7, cy + len + 2]);
    }
    pts.push(pts[0]);
    return jitterPoly(pts, rng, 1.1, true);
  }

  function mapleLeaf(cx, cy, size, rng, opts) {
    opts = opts || {};
    const lobes = opts.lobes || 5;
    const pts = [];
    for (let i = 0; i <= lobes * 6; i++) {
      const a = -Math.PI / 2 + (i / (lobes * 6)) * Math.PI * 2;
      const lobeT = (i / 6) % 1;
      const main = Math.cos(((i / (lobes * 6)) * lobes * Math.PI * 2) / 2);
      const r = size * (0.42 + 0.58 * Math.pow(Math.abs(Math.cos(a * (lobes / 2))), 0.45));
      const spike = opts.pointed && Math.abs(Math.sin(a * lobes / 2)) < 0.2 ? 1.18 : 1;
      pts.push([cx + Math.cos(a) * r * spike, cy + Math.sin(a) * r * spike * 1.05 + size * 0.15]);
    }
    return jitterPoly(pts, rng, 1.0, true);
  }

  function veins(parent, cx, cy, len, rng, pairs) {
    const mid = `M ${cx} ${cy + len * 0.92} L ${cx + (rng() - 0.5) * 1.5} ${cy - len * 0.9}`;
    stroke(parent, mid, rng, { w: 0.55 });
    const n = pairs || 6;
    for (let i = 0; i < n; i++) {
      const t = 0.15 + (i / n) * 0.7;
      const y = cy + len * (0.8 - t * 1.6);
      const reach = 12 + (1 - t) * 10;
      stroke(parent, `M ${cx} ${y} Q ${cx - reach * 0.6} ${y - 4} ${cx - reach} ${y - 8}`, rng, { w: 0.4 });
      stroke(parent, `M ${cx} ${y} Q ${cx + reach * 0.6} ${y - 4} ${cx + reach} ${y - 8}`, rng, { w: 0.4 });
    }
  }

  function petiole(parent, x1, y1, x2, y2, rng) {
    stroke(parent, jitterPoly([[x1, y1], [x2, y2]], rng, 0.4), rng, { w: 1.1 });
  }

  function acorn(parent, x, y, rng, stalk) {
    if (stalk) stroke(parent, jitterPoly([[x, y - 18], [x + 10, y - 6]], rng, 0.4), rng, { w: 0.9 });
    const cup = ovalLeaf(x, y - 2, 7, 9, rng);
    stroke(parent, cup, rng, { w: 0.8, fill: "rgba(60,50,30,0.06)" });
    for (let i = 0; i < 6; i++) {
      stroke(parent, `M ${x - 7 + i * 2.4} ${y - 6} l 1.2 6`, rng, { w: 0.35 });
    }
    const nut = ovalLeaf(x, y + 8, 8, 6.2, rng);
    stroke(parent, nut, rng, { w: 0.7 });
    hatch(parent, nut, rng, [x - 8, y, 16, 18], 2.6);
  }

  function cone(parent, x, y, rng, opts) {
    opts = opts || {};
    const h = opts.h || 28;
    const w = opts.w || 10;
    const rows = opts.rows || 7;
    for (let r = 0; r < rows; r++) {
      const yy = y - h / 2 + (r / (rows - 1)) * h;
      const ww = w * (0.45 + 0.55 * Math.sin((r / (rows - 1)) * Math.PI));
      const reflex = opts.reflex ? 3 : 0;
      stroke(parent, jitterPoly([[x - ww, yy], [x - ww * 0.2, yy + 4 + reflex], [x, yy + 2]], rng, 0.4), rng, { w: 0.55 });
      stroke(parent, jitterPoly([[x + ww, yy], [x + ww * 0.2, yy + 4 + reflex], [x, yy + 2]], rng, 0.4), rng, { w: 0.55 });
    }
    stroke(parent, jitterPoly([[x, y + h / 2 + 2], [x, y + h / 2 + 10]], rng, 0.3), rng, { w: 0.8 });
  }

  function berry(parent, x, y, rng, n, clustered) {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 1.6 - 0.4;
      const r = clustered ? 6 + rng() * 3 : 0;
      const bx = x + Math.cos(a) * r;
      const by = y + Math.sin(a) * r * 0.8 + i * 0.3;
      const d = ovalLeaf(bx, by, 3.2, 2.8, rng);
      stroke(parent, d, rng, { w: 0.5, fill: "rgba(80,30,20,0.07)" });
    }
  }

  function samara(parent, x, y, rng, angle) {
    const g = el("g", { transform: `translate(${x} ${y}) rotate(${angle})` }, parent);
    stroke(g, ovalLeaf(12, 0, 5, 16, rng), rng, { w: 0.6 });
    stroke(g, `M 0 0 L 8 0`, rng, { w: 0.7 });
    stroke(g, ovalLeaf(0, 0, 3, 3, rng), rng, { w: 0.5 });
  }

  function catkin(parent, x, y, rng, hanging) {
    const pts = [];
    const len = hanging ? 28 : 16;
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      pts.push([x + Math.sin(t * 6) * 2.2, y + t * len]);
    }
    stroke(parent, jitterPoly(pts, rng, 0.5), rng, { w: 2.8, fill: "none" });
    for (let i = 0; i < 8; i++) {
      stroke(parent, ovalLeaf(x + (rng() - 0.5) * 3, y + 3 + i * 3.2, 2, 3.2, rng), rng, { w: 0.4 });
    }
  }

  function needles(parent, x, y, rng, opts) {
    opts = opts || {};
    const count = opts.count || 18;
    const len = opts.len || 22;
    if (opts.fascicle) {
      stroke(parent, jitterPoly([[x, y + 6], [x, y]], rng, 0.2), rng, { w: 1.4 });
      for (let i = 0; i < opts.fascicle; i++) {
        const a = -70 + i * (opts.fascicle === 2 ? 28 : 12);
        const rad = (a * Math.PI) / 180;
        stroke(parent, jitterPoly([[x, y], [x + Math.cos(rad) * len, y + Math.sin(rad) * len]], rng, 0.5), rng, { w: 0.7 });
      }
      return;
    }
    if (opts.whorl3) {
      for (let k = 0; k < 4; k++) {
        for (let i = 0; i < 3; i++) {
          const a = -90 + i * 120 + (rng() - 0.5) * 10;
          const rad = (a * Math.PI) / 180;
          const bx = x + k * 9;
          stroke(parent, jitterPoly([[bx, y], [bx + Math.cos(rad) * 16, y + Math.sin(rad) * 16]], rng, 0.4), rng, { w: 0.7 });
        }
      }
      return;
    }
    if (opts.cluster) {
      for (let i = 0; i < 28; i++) {
        const a = -150 + rng() * 120;
        const rad = (a * Math.PI) / 180;
        const l = 10 + rng() * 10;
        stroke(parent, jitterPoly([[x, y], [x + Math.cos(rad) * l, y + Math.sin(rad) * l]], rng, 0.3), rng, { w: 0.45 });
      }
      return;
    }
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const bx = x + t * 70 - 10;
      const by = y + Math.sin(t * 4) * 3;
      const dir = opts.tworank && i % 2 ? 1 : opts.tworank ? -1 : (rng() - 0.5);
      const a = (opts.tworank ? dir * 75 : -20 - rng() * 50) * Math.PI / 180;
      const l = (opts.mixed ? 8 + (i % 5) * 3 : len) * (0.85 + rng() * 0.2);
      stroke(parent, jitterPoly([[bx, by], [bx + Math.cos(a) * l * (opts.tworank ? dir || 1 : 0.2), by + Math.sin(a) * l]], rng, 0.35), rng, { w: 0.55 });
    }
  }

  function scaleSpray(parent, x, y, rng, butterfly) {
    for (let i = 0; i < 5; i++) {
      const d = ovalLeaf(x + i * 7 - 14, y - i * 2, 16 - i, 5, rng);
      stroke(parent, d, rng, { w: 0.5 });
      hatch(parent, d, rng, [x + i * 7 - 22, y - 20, 18, 28], 2.8);
    }
    if (butterfly) {
      label(parent, x - 36, y + 22, "pale marks beneath", rng);
    }
  }

  function pinnate(parent, x, y, rng, opts) {
    opts = opts || {};
    const pairs = opts.pairs || 5;
    stroke(parent, jitterPoly([[x, y + 8], [x, y - pairs * 16 - 8]], rng, 0.3), rng, { w: 0.9 });
    for (let i = 0; i < pairs; i++) {
      const yy = y - i * 16;
      const leafL = ovalLeaf(x - 18, yy, opts.long ? 14 : 9, opts.long ? 6 : 7, rng, { teeth: opts.teeth ? 10 : 0, tip: 0.2 });
      const leafR = ovalLeaf(x + 18, yy, opts.long ? 14 : 9, opts.long ? 6 : 7, rng, { teeth: opts.teeth ? 10 : 0, tip: 0.2 });
      stroke(parent, leafL, rng, { w: 0.6 });
      stroke(parent, leafR, rng, { w: 0.6 });
      hatch(parent, leafL, rng, [x - 32, yy - 14, 28, 26], 3.2);
      hatch(parent, leafR, rng, [x + 4, yy - 14, 28, 26], 3.2);
    }
    const tip = ovalLeaf(x, y - pairs * 16 - 12, 10, 7, rng, { teeth: opts.teeth ? 8 : 0 });
    stroke(parent, tip, rng, { w: 0.6 });
  }

  function palmate(parent, x, y, rng, n) {
    for (let i = 0; i < n; i++) {
      const a = -110 + (i / (n - 1)) * 40;
      const rad = (a * Math.PI) / 180;
      const lx = x + Math.cos(rad) * 36;
      const ly = y + Math.sin(rad) * 36;
      const d = ovalLeaf(lx, ly, 16, 8, rng, { teeth: 12, tip: 0.3 });
      stroke(parent, d, rng, { w: 0.6 });
      hatch(parent, d, rng, [lx - 16, ly - 18, 32, 36], 3);
      petiole(parent, x, y + 10, lx, ly + 12, rng);
    }
  }

  function silhouette(parent, x, y, rng, kind) {
    const g = el("g", { opacity: 0.55 }, parent);
    let pts;
    if (kind === "column") {
      pts = [[x, y + 28], [x - 6, y + 20], [x - 7, y - 22], [x, y - 32], [x + 7, y - 22], [x + 6, y + 20]];
    } else if (kind === "cone") {
      pts = [[x, y + 28], [x - 16, y + 24], [x - 4, y - 30], [x + 4, y - 30], [x + 16, y + 24]];
    } else if (kind === "round") {
      pts = [];
      for (let i = 0; i <= 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        pts.push([x + Math.cos(a) * (12 + rng() * 3), y - 6 + Math.sin(a) * (14 + rng() * 2)]);
      }
      pts.push([x - 2, y + 28], [x + 2, y + 28]);
    } else {
      pts = [[x, y + 28], [x - 8, y + 18], [x - 22, y + 8], [x - 18, y - 6], [x - 8, y - 22], [x, y - 30], [x + 10, y - 18], [x + 22, y - 4], [x + 16, y + 12], [x + 6, y + 20]];
    }
    stroke(g, jitterPoly(pts, rng, 0.8, true), rng, { w: 0.6, fill: "rgba(40,30,16,0.07)" });
    stroke(g, jitterPoly([[x, y + 28], [x, y + 8]], rng, 0.2), rng, { w: 1.3 });
  }

  function hollyLeaf(cx, cy, rng) {
    const pts = [];
    const spines = 5;
    for (let i = 0; i <= spines * 2; i++) {
      const t = i / (spines * 2);
      const y = cy + 22 - t * 44;
      const side = i % 2 === 0 ? 1 : -1;
      const env = Math.sin(t * Math.PI) * 14;
      if (i % 2 === 0) pts.push([cx + side * (env * 0.4), y]);
      else pts.push([cx + (i < spines ? -1 : 1) * (env + 4), y - 1]);
    }
    return jitterPoly(pts, rng, 0.7, true);
  }

  const PLATES = {
    cedar: { conifer: "scale", fruit: "cone-small", sil: "cone", notes: ["spray", "cone"] },
    cypress: { conifer: "scale", fruit: "cone-round", sil: "column", notes: ["spray", "cone"] },
    "pine-scots": { conifer: "fascicle2", fruit: "cone-pine", sil: "spread", extra: "bark", notes: ["needles in 2s", "cone"] },
    "pine-black": { conifer: "fascicle2long", fruit: "cone-pine", sil: "cone", notes: ["long needles", "cone"] },
    "pine-lodgepole": { conifer: "fascicle2", fruit: "cone-small", sil: "cone", notes: ["needles in 2s", "closed cones"] },
    "larch-eu": { conifer: "cluster", fruit: "cone-larch", sil: "cone", notes: ["needle cluster", "cone"] },
    "larch-jp": { conifer: "cluster", fruit: "cone-reflex", sil: "cone", notes: ["needles", "reflexed cone"] },
    "spruce-norway": { conifer: "spruce", fruit: "cone-long", sil: "cone", notes: ["pegs", "long cone"] },
    "spruce-sitka": { conifer: "spruce", fruit: "cone-papery", sil: "cone", notes: ["needles", "papery cone"] },
    juniper: { conifer: "whorl3", fruit: "berry", sil: "round", notes: ["needles in 3s", "berry"] },
    fir: { conifer: "tworank", fruit: "cone-up", sil: "column", notes: ["two lengths", "upright cone"] },
    douglas: { conifer: "allround", fruit: "cone-mouse", sil: "cone", notes: ["needles", "mouse-tail bracts"] },
    hemlock: { conifer: "mixed", fruit: "cone-small", sil: "cone", notes: ["mixed needles", "small cone"] },
    yew: { conifer: "tworank", fruit: "aril", sil: "round", notes: ["needles", "red aril"] },
    holly: { leaf: "holly", fruit: "berry-red", sil: "round", notes: ["spiny leaf", "berry"] },
    "oak-holm": { leaf: "holm", fruit: "acorn", sil: "round", notes: ["evergreen leaf", "acorn"] },
    box: { leaf: "tiny-opp", fruit: "capsule", sil: "round", notes: ["opposite leaves"] },
    "horse-chestnut": { leaf: "palmate7", fruit: "conker", sil: "round", notes: ["palmate leaf", "conker"] },
    ash: { leaf: "pinnate-opp", fruit: "keys", sil: "spread", notes: ["leaflets", "keys"] },
    elder: { leaf: "pinnate-opp-few", fruit: "berry-head", sil: "round", notes: ["leaflets", "berries"] },
    robinia: { leaf: "pinnate-entire", fruit: "pod", sil: "round", notes: ["leaflets", "pod"] },
    ailanthus: { leaf: "pinnate-long", fruit: "wings", sil: "spread", notes: ["glandular teeth", "keys"] },
    walnut: { leaf: "pinnate-arom", fruit: "nut", sil: "round", notes: ["leaflets", "nut"] },
    rowan: { leaf: "pinnate-alt", fruit: "berry-head", sil: "round", notes: ["leaflets", "berries"] },
    "maple-norway": { leaf: "maple-point", fruit: "keys-flat", sil: "round", notes: ["leaf", "keys ~180°"] },
    "maple-field": { leaf: "maple-round", fruit: "keys-flat", sil: "round", notes: ["small leaf", "corky twig"] },
    guelder: { leaf: "maple3", fruit: "berry-red", sil: "round", notes: ["3-lobed leaf", "berries"] },
    sycamore: { leaf: "maple5", fruit: "keys-right", sil: "round", notes: ["leaf", "keys ~90°"] },
    dogwood: { leaf: "arcuate", fruit: "berry", sil: "round", notes: ["curved veins"] },
    privet: { leaf: "lance-opp", fruit: "berry", sil: "round", notes: ["leaves", "berries"] },
    spindle: { leaf: "elliptic-opp", fruit: "spindle", sil: "round", notes: ["4-angled twig", "fruit"] },
    wayfaring: { leaf: "wrinkled", fruit: "berry", sil: "round", notes: ["wrinkled leaf", "berries"] },
    plane: { leaf: "plane", fruit: "balls", sil: "spread", notes: ["leaf", "button-balls"] },
    "poplar-white": { leaf: "maple-white", fruit: "catkin", sil: "spread", notes: ["white underside"] },
    "poplar-grey": { leaf: "round-grey", fruit: "catkin", sil: "spread", notes: ["grey leaf"] },
    service: { leaf: "service", fruit: "chequer", sil: "round", notes: ["lobed leaf", "chequers"] },
    "whitebeam-sw": { leaf: "shallow-lobe", fruit: "berry-red", sil: "round", notes: ["shallow lobes"] },
    hawthorn: { leaf: "haw-deep", fruit: "haw", sil: "round", notes: ["deep lobes", "thorn"] },
    "hawthorn-mid": { leaf: "haw-shallow", fruit: "haw", sil: "round", notes: ["shallow lobes", "haw"] },
    "oak-robur": { leaf: "oak-ears", fruit: "acorn-stalk", sil: "spread", notes: ["auricles", "stalked acorn"] },
    "oak-petraea": { leaf: "oak-taper", fruit: "acorn", sil: "spread", notes: ["wedge base", "sessile acorn"] },
    "oak-turkey": { leaf: "oak-whisker", fruit: "acorn-moss", sil: "spread", notes: ["whiskered lobes", "mossy cup"] },
    "oak-red": { leaf: "oak-bristle", fruit: "acorn-saucer", sil: "spread", notes: ["bristle tips", "shallow cup"] },
    "elm-wych": { leaf: "elm-large", fruit: "samara-disc", sil: "spread", notes: ["rough leaf", "winged disc"] },
    "elm-english": { leaf: "elm-small", fruit: "samara-disc", sil: "spread", notes: ["leaf", "samara"] },
    "lime-small": { leaf: "lime-small", fruit: "lime", sil: "round", notes: ["leaf", "bract"] },
    "lime-large": { leaf: "lime-large", fruit: "lime", sil: "round", notes: ["hairy leaf", "bract"] },
    "lime-common": { leaf: "lime-mid", fruit: "lime", sil: "round", notes: ["leaf", "bract"] },
    chestnut: { leaf: "chestnut", fruit: "bur", sil: "spread", notes: ["toothed leaf", "bur"] },
    "sea-buckthorn": { leaf: "silver-narrow", fruit: "berry-orange", sil: "round", notes: ["silver leaves", "berries"] },
    "willow-osier": { leaf: "willow-narrow", fruit: "catkin", sil: "round", notes: ["narrow leaf"] },
    "willow-crack": { leaf: "willow-lance", fruit: "catkin", sil: "spread", notes: ["leaf", "brittle twig"] },
    "willow-white": { leaf: "willow-silky", fruit: "catkin", sil: "spread", notes: ["silky leaf"] },
    beech: { leaf: "beech", fruit: "mast", sil: "round", notes: ["wavy leaf", "mast"] },
    hornbeam: { leaf: "hornbeam", fruit: "bract3", sil: "round", notes: ["corrugated leaf", "3-lobed bract"] },
    "birch-silver": { leaf: "birch-tri", fruit: "catkin", sil: "spread", notes: ["leaf", "warty twig"] },
    "birch-downy": { leaf: "birch-round", fruit: "catkin", sil: "round", notes: ["rounder leaf"] },
    alder: { leaf: "alder", fruit: "cone-alder", sil: "round", notes: ["notched tip", "cone"] },
    "alder-grey": { leaf: "alder-point", fruit: "cone-alder", sil: "round", notes: ["pointed leaf", "cone"] },
    "alder-italian": { leaf: "alder-heart", fruit: "cone-alder", sil: "round", notes: ["cordate leaf"] },
    aspen: { leaf: "aspen", fruit: "catkin", sil: "round", notes: ["flattened stalk"] },
    "poplar-lombardy": { leaf: "poplar-tri", fruit: "catkin", sil: "column", notes: ["leaf", "columnar crown"] },
    "poplar-black": { leaf: "poplar-tri", fruit: "catkin", sil: "spread", notes: ["leaf", "bossed bark"] },
    "poplar-hybrid": { leaf: "poplar-tri", fruit: "catkin", sil: "spread", notes: ["triangular leaf"] },
    blackthorn: { leaf: "small-oval", fruit: "sloe", sil: "round", notes: ["thorn", "sloe"] },
    "cherry-plum": { leaf: "cherry", fruit: "plum", sil: "round", notes: ["leaf", "fruit"] },
    cherry: { leaf: "cherry", fruit: "cherry", sil: "spread", notes: ["glands on stalk", "cherry"] },
    "bird-cherry": { leaf: "cherry", fruit: "raceme", sil: "round", notes: ["raceme"] },
    hazel: { leaf: "hazel", fruit: "hazel", sil: "round", notes: ["leaf", "nut"] },
    whitebeam: { leaf: "whitebeam", fruit: "berry-red", sil: "round", notes: ["white underside", "berries"] },
    "willow-goat": { leaf: "sallow", fruit: "pussy", sil: "round", notes: ["broad leaf", "catkin"] },
    "willow-grey": { leaf: "sallow-long", fruit: "catkin", sil: "round", notes: ["oblong leaf"] },
    apple: { leaf: "apple", fruit: "crab", sil: "round", notes: ["leaf", "crab"] },
    pear: { leaf: "pear", fruit: "pear", sil: "round", notes: ["glossy leaf", "pear"] },
    "buckthorn-alder": { leaf: "many-vein", fruit: "berry", sil: "round", notes: ["parallel veins"] },
    "buckthorn-purging": { leaf: "few-vein", fruit: "berry", sil: "round", notes: ["toothed leaf", "thorn"] }
  };

  function drawLeaf(svg, g, spec, rng) {
    const x = 88;
    const y = 108;
    let d;
    const kind = spec.leaf;
    if (kind === "holly") {
      d = hollyLeaf(x, y, rng);
      stroke(g, d, rng, { w: 0.85 });
      hatch(g, d, rng, [x - 24, y - 28, 48, 56], 3);
      petiole(g, x, y + 22, x, y + 36, rng);
    } else if (kind === "oak-ears") {
      d = lobedLeaf(x, y, 48, 28, rng, { lobes: 4, auricles: true });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 36, y - 50, 72, 100], 3.2);
      veins(g, x, y, 40, rng, 4);
    } else if (kind === "oak-taper") {
      d = lobedLeaf(x, y - 4, 50, 26, rng, { lobes: 4 });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 34, y - 54, 68, 100], 3.2);
      veins(g, x, y, 42, rng, 4);
    } else if (kind === "oak-whisker" || kind === "oak-bristle") {
      d = lobedLeaf(x, y, 50, 28, rng, { lobes: 5, pointed: true, bristle: true, deep: kind === "oak-whisker" });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 36, y - 54, 72, 104], 3);
    } else if (kind && kind.startsWith("maple") || kind === "plane" || kind === "service" || kind === "maple3" || kind === "guelder") {
      d = mapleLeaf(x, y, kind === "maple3" ? 36 : 42, rng, { lobes: kind === "maple3" ? 3 : 5, pointed: kind === "maple-point" || kind === "plane" });
      stroke(g, d, rng, { w: 0.85 });
      hatch(g, d, rng, [x - 44, y - 40, 88, 88], 3.1);
    } else if (kind === "haw-deep" || kind === "haw-shallow" || kind === "shallow-lobe") {
      d = lobedLeaf(x, y, 36, kind === "haw-deep" ? 28 : 22, rng, { lobes: 3, deep: kind === "haw-deep" });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 32, y - 40, 64, 80], 3);
    } else if (kind === "palmate7") {
      palmate(g, x, y + 20, rng, 7);
    } else if (kind && kind.startsWith("pinnate")) {
      pinnate(g, x, y + 20, rng, {
        pairs: kind.includes("few") ? 3 : kind.includes("long") ? 7 : 5,
        teeth: !kind.includes("entire"),
        long: kind.includes("long")
      });
    } else if (kind === "chestnut") {
      d = ovalLeaf(x, y, 52, 14, rng, { teeth: 16, tip: 0.35 });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 20, y - 54, 40, 108], 3);
      veins(g, x, y, 48, rng, 12);
    } else if (kind === "beech") {
      d = ovalLeaf(x, y, 40, 22, rng, { tip: 0.2 });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 26, y - 42, 52, 84], 3.4);
      veins(g, x, y, 36, rng, 7);
    } else if (kind === "hornbeam") {
      d = ovalLeaf(x, y, 38, 20, rng, { teeth: 18, tip: 0.15 });
      stroke(g, d, rng, { w: 0.8 });
      veins(g, x, y, 34, rng, 10);
      hatch(g, d, rng, [x - 24, y - 40, 48, 80], 2.6);
    } else if (kind === "elm-large" || kind === "elm-small") {
      const L = kind === "elm-large" ? 44 : 32;
      d = ovalLeaf(x + 4, y, L, 22, rng, { teeth: 14, tip: 0.2 });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 24, y - 46, 56, 90], 2.8);
      veins(g, x + 4, y, L - 4, rng, 8);
    } else if (kind && kind.startsWith("lime")) {
      d = ovalLeaf(x, y, kind === "lime-small" ? 28 : 40, 24, rng, { teeth: 10, cordate: true, tip: 0.15 });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 28, y - 42, 56, 84], 3.2);
    } else if (kind === "aspen") {
      d = ovalLeaf(x, y, 22, 24, rng, { teeth: 8, tip: 0.4 });
      stroke(g, d, rng, { w: 0.8 });
      petiole(g, x, y + 22, x, y + 48, rng);
      hatch(g, d, rng, [x - 26, y - 26, 52, 50], 3);
    } else if (kind === "alder") {
      d = ovalLeaf(x, y, 26, 24, rng, { teeth: 8 });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 26, y - 28, 52, 56], 3);
    } else if (kind === "hazel") {
      d = ovalLeaf(x, y, 30, 28, rng, { teeth: 12, tip: 0.1, cordate: true });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 32, y - 32, 64, 64], 3);
    } else if (kind === "willow-narrow" || kind === "silver-narrow") {
      d = ovalLeaf(x, y, 48, 7, rng, { teeth: 6, tip: 0.2 });
      stroke(g, d, rng, { w: 0.7 });
      hatch(g, d, rng, [x - 12, y - 50, 24, 100], 2.8);
    } else if (kind && kind.startsWith("willow") || kind === "sallow" || kind === "sallow-long") {
      const w = kind === "sallow" ? 22 : kind === "sallow-long" ? 14 : 11;
      d = ovalLeaf(x, y, 40, w, rng, { teeth: 8, tip: 0.25 });
      stroke(g, d, rng, { w: 0.75 });
      hatch(g, d, rng, [x - w - 6, y - 42, w * 2 + 12, 84], 3);
    } else if (kind === "holm") {
      d = ovalLeaf(x, y, 32, 16, rng, { teeth: 0, tip: 0.1 });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - 20, y - 34, 40, 68], 2.5);
    } else {
      const teeth = kind === "apple" || kind === "pear" || kind === "cherry" || kind === "small-oval" || kind === "birch-tri" || kind === "birch-round" || kind === "few-vein" ? 10 : 0;
      const len = kind === "tiny-opp" ? 16 : kind === "lance-opp" ? 34 : 32;
      const wid = kind === "birch-tri" ? 16 : kind === "tiny-opp" ? 10 : kind === "lance-opp" ? 10 : 18;
      d = ovalLeaf(x, y, len, wid, rng, { teeth, tip: kind === "birch-tri" ? 0.45 : 0.15, cordate: kind === "alder-heart" || kind === "lime-mid" });
      stroke(g, d, rng, { w: 0.8 });
      hatch(g, d, rng, [x - wid - 6, y - len - 4, wid * 2 + 12, len * 2 + 8], 3.1);
      veins(g, x, y, len - 6, rng, kind === "many-vein" ? 9 : 6);
    }
  }

  function drawFruit(svg, g, spec, rng) {
    const x = 210;
    const y = 78;
    const f = spec.fruit;
    if (!f) return;
    if (f === "acorn" || f === "acorn-stalk" || f === "acorn-moss" || f === "acorn-saucer") {
      acorn(g, x, y, rng, f === "acorn-stalk");
      if (f === "acorn-moss") {
        for (let i = 0; i < 10; i++) stroke(g, `M ${x - 8 + i} ${y - 8} l ${(rng() - 0.5) * 3} -5`, rng, { w: 0.4 });
      }
    } else if (f.startsWith("cone")) {
      cone(g, x, y, rng, {
        h: f === "cone-long" ? 42 : f === "cone-small" ? 16 : 28,
        w: f === "cone-papery" ? 12 : 9,
        rows: f === "cone-long" ? 10 : 6,
        reflex: f === "cone-reflex"
      });
      if (f === "cone-mouse") {
        for (let i = 0; i < 5; i++) stroke(g, `M ${x - 8 + i * 4} ${y - 8 + i * 4} l 6 2 l -2 5`, rng, { w: 0.45 });
      }
      if (f === "cone-alder") cone(g, x, y + 8, rng, { h: 14, w: 7, rows: 4 });
    } else if (f === "berry" || f === "berry-red" || f === "berry-orange" || f === "berry-head") {
      berry(g, x, y, rng, f === "berry-head" ? 14 : 7, true);
    } else if (f === "keys" || f === "keys-flat" || f === "keys-right" || f === "wings") {
      const ang = f === "keys-flat" ? 0 : f === "keys-right" ? 45 : 25;
      samara(g, x - 6, y, rng, -ang);
      samara(g, x - 6, y, rng, ang + (f === "keys-flat" ? 180 : 90));
    } else if (f === "catkin" || f === "pussy") {
      catkin(g, x, y - 10, rng, f !== "pussy");
    } else if (f === "aril") {
      stroke(g, ovalLeaf(x, y + 4, 6, 5, rng), rng, { w: 0.6 });
      stroke(g, ovalLeaf(x, y - 2, 7, 8, rng), rng, { w: 0.7, fill: "rgba(120,30,20,0.08)" });
    } else if (f === "conker") {
      stroke(g, ovalLeaf(x, y, 16, 14, rng), rng, { w: 0.7 });
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        stroke(g, `M ${x} ${y} l ${Math.cos(a) * 16} ${Math.sin(a) * 14}`, rng, { w: 0.4 });
      }
    } else if (f === "pod") {
      stroke(g, ovalLeaf(x, y, 6, 22, rng), rng, { w: 0.7 });
    } else if (f === "nut" || f === "hazel" || f === "mast" || f === "bur") {
      stroke(g, ovalLeaf(x, y, 10, 9, rng), rng, { w: 0.7 });
      if (f === "bur" || f === "mast") {
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2;
          stroke(g, `M ${x + Math.cos(a) * 8} ${y + Math.sin(a) * 8} l ${Math.cos(a) * 6} ${Math.sin(a) * 6}`, rng, { w: 0.4 });
        }
      }
      if (f === "hazel") {
        stroke(g, ovalLeaf(x, y - 10, 8, 12, rng), rng, { w: 0.5 });
      }
    } else if (f === "lime") {
      stroke(g, ovalLeaf(x - 8, y, 6, 18, rng), rng, { w: 0.55 });
      stroke(g, jitterPoly([[x - 8, y], [x + 10, y + 14]], rng, 0.3), rng, { w: 0.6 });
      stroke(g, ovalLeaf(x + 12, y + 18, 5, 4, rng), rng, { w: 0.5 });
    } else if (f === "balls") {
      stroke(g, jitterPoly([[x, y - 20], [x, y + 18]], rng, 0.3), rng, { w: 0.6 });
      stroke(g, ovalLeaf(x, y - 8, 8, 8, rng), rng, { w: 0.5 });
      stroke(g, ovalLeaf(x, y + 12, 8, 8, rng), rng, { w: 0.5 });
    } else if (f === "spindle") {
      stroke(g, ovalLeaf(x, y, 8, 8, rng), rng, { w: 0.6 });
      stroke(g, `M ${x - 10} ${y} L ${x + 10} ${y} M ${x} ${y - 10} L ${x} ${y + 10}`, rng, { w: 0.5 });
    } else if (f === "samara-disc") {
      stroke(g, ovalLeaf(x, y, 10, 12, rng), rng, { w: 0.55 });
      stroke(g, ovalLeaf(x, y, 3, 3, rng), rng, { w: 0.5 });
    } else if (f === "haw" || f === "sloe" || f === "cherry" || f === "plum" || f === "crab" || f === "pear" || f === "chequer") {
      const w = f === "pear" ? 7 : 8;
      const h = f === "pear" ? 12 : f === "crab" ? 9 : 7;
      stroke(g, ovalLeaf(x, y, h, w, rng), rng, { w: 0.65, fill: "rgba(90,30,20,0.06)" });
      stroke(g, jitterPoly([[x, y - h], [x, y - h - 6]], rng, 0.2), rng, { w: 0.5 });
    } else if (f === "bract3") {
      stroke(g, jitterPoly([[x, y], [x - 14, y + 8], [x - 6, y + 18], [x, y + 6], [x + 8, y + 18], [x + 14, y + 4]], rng, 0.5, true), rng, { w: 0.55 });
    } else if (f === "raceme") {
      stroke(g, jitterPoly([[x, y - 16], [x + 2, y + 22]], rng, 0.3), rng, { w: 0.6 });
      for (let i = 0; i < 8; i++) berry(g, x + 6, y - 10 + i * 4, rng, 1, false);
    }
  }

  function drawConifer(g, spec, rng) {
    const x = 90;
    const y = 100;
    const c = spec.conifer;
    if (c === "scale") scaleSpray(g, x, y, rng, true);
    else if (c === "fascicle2") needles(g, x, y, rng, { fascicle: 2, len: 28 });
    else if (c === "fascicle2long") needles(g, x, y, rng, { fascicle: 2, len: 48 });
    else if (c === "cluster") needles(g, x, y, rng, { cluster: true });
    else if (c === "whorl3") needles(g, x - 20, y, rng, { whorl3: true });
    else if (c === "tworank") needles(g, x - 24, y, rng, { tworank: true, count: 20, len: 16 });
    else if (c === "mixed") needles(g, x - 24, y, rng, { mixed: true, count: 22, len: 14 });
    else if (c === "allround") needles(g, x - 10, y, rng, { count: 24, len: 20 });
    else needles(g, x - 10, y, rng, { count: 20, len: 14 });
  }

  function extraMarks(g, spec, rng) {
    if (spec.leaf === "oak-ears" || spec.notes && spec.notes.includes("auricles")) {
      /* already in leaf */
    }
    if (spec.leaf === "haw-deep" || spec.leaf === "haw-shallow" || spec.fruit === "sloe") {
      stroke(g, jitterPoly([[40, 150], [52, 128], [48, 118]], rng, 0.4), rng, { w: 1.2 });
      stroke(g, jitterPoly([[48, 122], [62, 112]], rng, 0.3), rng, { w: 0.9 });
    }
    if (spec.notes && spec.notes.includes("4-angled twig")) {
      stroke(g, jitterPoly([[40, 160], [40, 120], [52, 120], [52, 160], [40, 160]], rng, 0.3, true), rng, { w: 0.7 });
    }
    if (spec.notes && spec.notes.includes("warty twig")) {
      stroke(g, jitterPoly([[36, 168], [90, 150]], rng, 0.4), rng, { w: 1.1 });
      for (let i = 0; i < 6; i++) stroke(g, ovalLeaf(44 + i * 8, 165 - i * 3, 1.6, 1.6, rng), rng, { w: 0.4 });
    }
    if (spec.notes && spec.notes.includes("brittle twig")) {
      stroke(g, jitterPoly([[40, 160], [70, 148]], rng, 0.3), rng, { w: 1.1 });
      stroke(g, jitterPoly([[72, 147], [96, 140]], rng, 0.3), rng, { w: 1.1 });
      label(g, 58, 176, "snaps cleanly", rng);
    }
    if (spec.notes && spec.notes.includes("bossed bark")) {
      stroke(g, jitterPoly([[38, 170], [48, 90], [58, 170]], rng, 0.5, true), rng, { w: 0.7 });
      stroke(g, ovalLeaf(48, 120, 8, 10, rng), rng, { w: 0.6 });
    }
    if (spec.notes && spec.notes.includes("glands on stalk")) {
      stroke(g, ovalLeaf(88, 158, 2, 2, rng), rng, { w: 0.5, fill: "rgba(90,20,20,0.15)" });
      stroke(g, ovalLeaf(96, 158, 2, 2, rng), rng, { w: 0.5, fill: "rgba(90,20,20,0.15)" });
    }
  }

  function drawPlate(container, species) {
    container.innerHTML = "";
    const img = document.createElement("img");
    img.className = "plate photo-plate";
    img.alt = "Pencil plate of " + species.common + ", showing the useful field characters";
    img.src = "assets/plates/" + species.id + ".jpg";
    img.addEventListener("error", function fallback() {
      img.removeEventListener("error", fallback);
      img.remove();
      drawSvgPlate(container, species);
    });
    container.appendChild(img);
  }

  function drawSvgPlate(container, species) {
    const svg = el("svg", {
      viewBox: "0 0 280 200",
      class: "plate",
      role: "img",
      "aria-label": `Pencil plate of ${species.common}: ${ (PLATES[species.plate] || {}).notes || "defining characters" }`
    }, container);
    const defs = el("defs", null, svg);
    const filt = el("filter", { id: "graphite", x: "-8%", y: "-8%", width: "116%", height: "116%" }, defs);
    el("feTurbulence", { type: "fractalNoise", baseFrequency: "0.8", numOctaves: "2", result: "n" }, filt);
    el("feDisplacementMap", { in: "SourceGraphic", in2: "n", scale: "0.8" }, filt);
    const rng = mulberry32(hash(species.id));
    const spec = PLATES[species.plate] || { leaf: "oval", fruit: "berry", sil: "round", notes: ["leaf", "fruit"] };
    const g = el("g", { filter: "url(#graphite)" }, svg);
    silhouette(g, 236, 158, rng, spec.sil || "round");
    if (spec.conifer) drawConifer(g, spec, rng);
    else drawLeaf(svg, g, spec, rng);
    drawFruit(svg, g, spec, rng);
    extraMarks(g, spec, rng);
    const notes = spec.notes || ["leaf", "fruit"];
    label(g, 24, 22, notes[0] || "leaf", rng);
    if (notes[1]) label(g, 188, 28, notes[1], rng);
    label(g, 210, 196, "habit", rng);
    return svg;
  }

  root.drawTreePlate = drawPlate;
})(typeof window !== "undefined" ? window : globalThis);
