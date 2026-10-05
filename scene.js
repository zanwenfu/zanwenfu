// The whole banner as a moving mosaic: sunlight through a canopy, cast on a paper wall,
// drawn as an ordered-dither mosaic (4x4 Bayer) in three colours. A tree stands at the right;
// its limbs, twigs and leaves throw shadows that sway in the wind, so the tiles flip as they
// move. Where the light turns, the shadow's rim catches a warm accent. The text keeps a clear
// border of light, so it never sits on a shadow. draw(t) is deterministic and loops every T s.
const W = 2560, H = 800, CELL = 8, COLS = W / CELL, ROWS = H / CELL, A = W / H;
const Q = new URLSearchParams(location.search);
const num = (k, d) => (Q.has(k) ? +Q.get(k) : d);
const T = num("loop", 16);
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const THEME = Q.get("theme") || "light";
const PAL = THEME === "dark"
  ? { light: hex(Q.get("light") || "#253b33"), shadow: hex(Q.get("shadow") || "#13221b"), accent: hex(Q.get("accent") || "#d2c09a") }
  : { light: hex(Q.get("light") || "#f7f7f2"), shadow: hex(Q.get("shadow") || "#253b33"), accent: hex(Q.get("accent") || "#c8913a") };
const RIM = num("rim", THEME === "dark" ? 0.75 : 1); // gold reads louder on the dark wall
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);
const bayer = (x, y) => BAYER[(x & 3) + ((y & 3) << 2)];
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const TAU = Math.PI * 2;

// ---- noise ----
function hash3(i, j, k) {
  let h = Math.imul(i, 0x27d4eb2d) ^ Math.imul(j, 0x165667b1) ^ Math.imul(k, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b); h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35); h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash3(xi, yi, s), b = hash3(xi + 1, yi, s), c = hash3(xi, yi + 1, s), d = hash3(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, s, octaves = 4) {
  let sum = 0, amp = 0.5;
  for (let o = 0; o < octaves; o++) { sum += amp * vnoise(x, y, s + o * 101); x = x * 2.03 + 3.1; y = y * 2.03 + 1.7; amp *= 0.5; }
  return sum / (1 - Math.pow(0.5, octaves));
}
function rng(seed) {
  return () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

// ---- the tree: a trunk at the right, limbs reaching left, twigs at their ends (x in 0..A, y down 0..1) ----
const R = rng(num("seed", 11));
const B = []; // { parent, f (where on the parent), rel (angle to the parent), len, w, depth, k, ph }
function grow(parent, f, rel, len, w, depth) {
  const id = B.push({ parent, f, rel, len, w, depth, k: 1 + (R() * 2 | 0), ph: R() * TAU }) - 1;
  if (depth >= 5 || len < 0.045) return;
  const kids = depth < 2 ? 3 : 2;
  for (let i = 0; i < kids; i++) {
    const side = i % 2 ? 1 : -1;
    grow(id, 0.3 + 0.6 * R(), side * (0.32 + 0.5 * R()), len * (0.52 + 0.2 * R()), w * 0.6, depth + 1);
  }
  grow(id, 0.97, (R() - 0.5) * 0.35, len * (0.62 + 0.12 * R()), w * 0.7, depth + 1);
}
const TRUNK_X = num("trunk", 2.93);
B.push({ parent: -1, f: 0, rel: -Math.PI / 2 - 0.035, len: 1.3, w: 0.05, depth: 0, k: 1, ph: 0, x0: TRUNK_X, y0: 1.12 });
for (const [f, rel, len, w] of [[0.80, -1.55, 0.72, 0.026], [0.58, -1.22, 0.62, 0.030], [0.34, -1.85, 0.48, 0.022], [0.95, -2.05, 0.55, 0.018]])
  grow(0, f, rel, len, w, 1);

function pose(t, gust) {
  // Each branch turns about its base; the sway grows toward the twigs and follows the gust.
  const P = new Array(B.length);
  for (let i = 0; i < B.length; i++) {
    const b = B[i];
    const sway = (b.depth === 0 ? 0.004 : 0.012 + 0.016 * b.depth) * gust * Math.sin(TAU * b.k * t / T + b.ph);
    let x0, y0, ang;
    if (b.parent < 0) { x0 = b.x0; y0 = b.y0; ang = b.rel + sway; }
    else { const p = P[b.parent]; x0 = p.x0 + (p.x1 - p.x0) * b.f; y0 = p.y0 + (p.y1 - p.y0) * b.f; ang = p.ang + b.rel + sway; }
    const w0 = b.parent < 0 ? b.w : Math.min(b.w, P[b.parent].w1 * 1.0);
    P[i] = { x0, y0, ang, x1: x0 + Math.cos(ang) * b.len, y1: y0 + Math.sin(ang) * b.len, w0, w1: w0 * 0.68, depth: b.depth };
  }
  return P;
}

// ---- tiles ----
const tiles = [];
for (let ty = 0; ty < ROWS; ty++) for (let tx = 0; tx < COLS; tx++)
  tiles.push({ tx, ty, x: (tx + 0.5) * CELL / H, y: (ty + 0.5) * CELL / H });
const L = new Float32Array(COLS * ROWS), CLEAR = new Float32Array(COLS * ROWS);

// The text's clear border: tiles that touch text are fully lit; the light fades back into the scene over a few tiles.
window.setMask = async (url) => {
  const img = new Image(); img.src = url; await img.decode();
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d"); x.drawImage(img, 0, 0, W, H);
  const a = x.getImageData(0, 0, W, H).data, text = new Uint8Array(COLS * ROWS);
  for (let ty = 0; ty < ROWS; ty++) for (let tx = 0; tx < COLS; tx++) {
    let m = 0;
    for (let y = ty * CELL; y < ty * CELL + CELL; y++) for (let xx = tx * CELL; xx < tx * CELL + CELL; xx++) m = Math.max(m, a[4 * (y * W + xx) + 3]);
    text[ty * COLS + tx] = m > 24 ? 1 : 0;
  }
  // Distance in tiles to the nearest text tile (two-pass chamfer).
  const D = new Float32Array(COLS * ROWS).fill(1e9);
  for (let i = 0; i < D.length; i++) if (text[i]) D[i] = 0;
  const pass = (y0, y1, dy, x0, x1, dx) => {
    for (let y = y0; y !== y1; y += dy) for (let xx = x0; xx !== x1; xx += dx) {
      const i = y * COLS + xx;
      for (const [ox, oy, w] of [[-dx, 0, 1], [0, -dy, 1], [-dx, -dy, 1.414], [dx, -dy, 1.414]]) {
        const nx = xx + ox, ny = y + oy;
        if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) continue;
        D[i] = Math.min(D[i], D[ny * COLS + nx] + w);
      }
    }
  };
  pass(0, ROWS, 1, 0, COLS, 1); pass(ROWS - 1, -1, -1, COLS - 1, -1, -1);
  const inner = num("halo", 2.5), outer = inner + num("fade", 11.5);
  for (let i = 0; i < D.length; i++) CLEAR[i] = 1 - smooth(inner, outer, D[i]);
  window.ready = true;
};

const grid = document.createElement("canvas"); grid.width = COLS; grid.height = ROWS;
const gctx = grid.getContext("2d"), img = gctx.createImageData(COLS, ROWS);
const out = document.getElementById("mosaic").getContext("2d"); out.imageSmoothingEnabled = false;

window.draw = (t) => {
  const gust = 0.72 + 0.28 * Math.sin(TAU * t / T - 1.2);
  const P = pose(t, gust);
  // Leaves sway on closed paths, so the loop is seamless; nearer layers are larger, darker and sharper.
  const sway = (k, a, ph) => [a * gust * Math.sin(TAU * k * t / T + ph), a * 0.6 * gust * Math.cos(TAU * k * t / T + ph * 1.7)];
  const layers = [
    { scale: num("s1", 6.5), d: sway(1, 0.07, 0.4), soft: 0.05, floor: num("f1", 0.12), seed: 11 },
    { scale: num("s2", 11), d: sway(2, 0.09, 2.1), soft: 0.10, floor: num("f2", 0.45), seed: 23 },
    { scale: num("s3", 15), d: sway(3, 0.08, 4.0), soft: 0.16, floor: num("f3", 0.68), seed: 37 },
  ];
  // Only tiles right of the tree's farthest reach need the branch test.
  const reach = Math.min(...P.map(s => Math.min(s.x0, s.x1) - s.w0)) - 0.08;
  const glowShift = [0.35 * Math.cos(TAU * t / T), 0.35 * Math.sin(TAU * t / T)];
  for (let i = 0; i < tiles.length; i++) {
    const { x, y } = tiles[i];
    // Limb and twig shadows: a soft rim whose width grows with the branch's depth (farther, softer).
    let shade = 1, near = 9;
    if (x > reach) for (const s of P) {
      const ax = x - s.x0, ay = y - s.y0, bx = s.x1 - s.x0, by = s.y1 - s.y0;
      const h = Math.max(0, Math.min(1, (ax * bx + ay * by) / (bx * bx + by * by)));
      const dist = Math.hypot(ax - bx * h, ay - by * h) - (s.w0 + (s.w1 - s.w0) * h);
      if (s.depth >= 2) near = Math.min(near, dist);
      const pen = 0.004 + 0.007 * s.depth;
      if (dist > pen * 2) continue;
      const umbra = s.depth === 0 ? 0.02 : Math.min(0.6, 0.05 + 0.1 * s.depth);
      shade = Math.min(shade, umbra + (1 - umbra) * smooth(-pen, pen, dist));
    }
    // Leaf cover: dense around the twigs and in the canopy at the right, sparse over the open wall.
    const canopy = Math.max(smooth(2.05, 2.85, x) * (0.55 + 0.45 * smooth(0.95, 0.1, y)), smooth(0.22, 0.0, y) * smooth(1.5, 2.4, x) * 0.6);
    const cover = Math.min(1, Math.max(canopy, 0.8 * Math.exp(-Math.max(0, near) / 0.05)));
    let leaves = 1;
    for (const l of layers) {
      const n = fbm(x * l.scale + l.d[0], y * l.scale + l.d[1], l.seed, 3);
      const thr = 0.95 - num("dense", 0.41) * cover; // no cover, no leaves: the open wall stays clean
      leaves *= 1 - (1 - l.floor) * smooth(thr - l.soft, thr + l.soft, n); // a leaf where the noise rises above the threshold
    }
    const glow = 1 + num("glow", 0.35) * (fbm(x * 1.1 + glowShift[0], y * 1.1 + glowShift[1], 91, 3) - 0.5);
    const light = Math.pow(shade * leaves, 0.75) * glow * (1.06 - 0.06 * y);
    let v = Math.min(1, (light - 0.5) * 1.35 + num("center", 0.6));
    if (CLEAR[i] > 0) { v += (1 - v) * CLEAR[i]; if (v > 0.8) v = 1; }
    L[i] = v;
  }
  const d = img.data;
  for (let i = 0; i < tiles.length; i++) {
    const { tx, ty } = tiles[i], v = L[i];
    // Accent on the rim: mid tones where the light changes fast (a lit edge), never near text.
    const gx = (L[ty * COLS + Math.min(COLS - 1, tx + 1)] - L[ty * COLS + Math.max(0, tx - 1)]) / 2;
    const gy = (L[Math.min(ROWS - 1, ty + 1) * COLS + tx] - L[Math.max(0, ty - 1) * COLS + tx]) / 2;
    const rim = RIM * smooth(0.28, 0.5, v) * smooth(0.7, 0.45, v) * smooth(0.05, 0.16, Math.hypot(gx, gy)) * (1 - CLEAR[i]);
    const col = v > bayer(tx, ty) ? PAL.light : (rim > bayer(tx + 2, ty + 1) ? PAL.accent : PAL.shadow);
    d[4 * i] = col[0]; d[4 * i + 1] = col[1]; d[4 * i + 2] = col[2]; d[4 * i + 3] = 255;
  }
  gctx.putImageData(img, 0, 0);
  out.clearRect(0, 0, W, H); out.drawImage(grid, 0, 0, COLS * CELL, ROWS * CELL);
};
