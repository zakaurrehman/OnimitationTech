/**
 * Procedural SVG illustrations in the brand palette. Server-rendered, tiny,
 * crisp at any size, and animated only with CSS (so reduced-motion applies).
 */
import { cn } from "@/lib/utils";

const r2 = (n: number) => Math.round(n * 100) / 100;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3478F6" />
        <stop offset="0.55" stopColor="#19D4E5" />
        <stop offset="1" stopColor="#9275FF" />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0" stopColor="#3478F6" stopOpacity="0.45" />
        <stop offset="1" stopColor="#3478F6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-node`}>
        <stop offset="0" stopColor="#E6FCFF" />
        <stop offset="0.5" stopColor="#19D4E5" />
        <stop offset="1" stopColor="#19D4E5" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* ───────────── IT Consulting: isometric architecture blueprint ───────────── */
export function ArchitectureArt({ className, id = "arch" }: { className?: string; id?: string }) {
  const layers = [
    { y: 300, label: "INFRASTRUCTURE", tone: "#3478F6" },
    { y: 210, label: "ARCHITECTURE", tone: "#19D4E5" },
    { y: 120, label: "STRATEGY", tone: "#9275FF" },
  ];
  const W = 150, H = 75, CX = 200;
  const pt = (y: number, u: number, v: number) => [r2(CX + W * u - W * v), r2(y - H + H * u + H * v)] as const;
  const nodes: [number, number][][] = [
    [[0.2, 0.3], [0.5, 0.25], [0.8, 0.4], [0.35, 0.7], [0.7, 0.75]],
    [[0.25, 0.5], [0.5, 0.25], [0.75, 0.55], [0.5, 0.8]],
    [[0.5, 0.25], [0.5, 0.75], [0.3, 0.5]],
  ];
  const verticals: [number, number][] = [[0.5, 0.25], [0.25, 0.5], [0.75, 0.55]];

  return (
    <svg viewBox="0 0 500 400" fill="none" className={cn("h-auto w-full", className)} role="img" aria-label="Isometric diagram of strategy, architecture, and infrastructure layers">
      <Defs id={id} />
      <ellipse cx="220" cy="215" rx="210" ry="150" fill={`url(#${id}-glow)`} opacity="0.55" />
      {layers.map((layer, li) => {
        const [tx, ty] = pt(layer.y, 0, 0);
        const [rx, ry] = pt(layer.y, 1, 0);
        const [bx, by] = pt(layer.y, 1, 1);
        const [lx, ly] = pt(layer.y, 0, 1);
        return (
          <g key={layer.label}>
            <path d={`M${tx} ${ty}L${rx} ${ry}L${bx} ${by}L${lx} ${ly}Z`} fill={layer.tone} fillOpacity="0.06" stroke={layer.tone} strokeOpacity="0.55" />
            {[0.25, 0.5, 0.75].map((t) => {
              const [a1, a2] = pt(layer.y, t, 0);
              const [b1, b2] = pt(layer.y, t, 1);
              const [c1, c2] = pt(layer.y, 0, t);
              const [d1, d2] = pt(layer.y, 1, t);
              return (
                <g key={t} stroke={layer.tone} strokeOpacity="0.16">
                  <line x1={a1} y1={a2} x2={b1} y2={b2} />
                  <line x1={c1} y1={c2} x2={d1} y2={d2} />
                </g>
              );
            })}
            {nodes[li].map(([u, v], ni) => {
              const [x, y] = pt(layer.y, u, v);
              return (
                <g key={ni}>
                  <circle cx={x} cy={y} r="9" fill={layer.tone} fillOpacity="0.12" />
                  <circle cx={x} cy={y} r="3" fill={layer.tone} className="animate-pulse-soft" style={{ animationDelay: `${(li * 5 + ni) * 0.37}s` }} />
                </g>
              );
            })}
            <g className="font-mono" fontSize="9" letterSpacing="2">
              <line x1={rx + 8} y1={ry} x2={rx + 28} y2={ry} stroke={layer.tone} strokeOpacity="0.6" />
              <text x={rx + 34} y={ry + 3} fill="#94A3B8">
                {layer.label}
              </text>
            </g>
          </g>
        );
      })}
      {verticals.map(([u, v], i) => {
        const [x1, y1] = pt(300, u, v);
        const [, y2] = pt(120, u, v);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x1} y2={y2} stroke={`url(#${id}-line)`} strokeOpacity="0.35" />
            <line x1={x1} y1={y1} x2={x1} y2={y2} stroke="#19D4E5" strokeWidth="1.5" strokeDasharray="6 194" className="animate-dash" style={{ animationDelay: `${i * -2}s` }} />
          </g>
        );
      })}
    </svg>
  );
}

/* ───────────── Network Services: topology with travelling packets ───────────── */
export function NetworkArt({ className, id = "net" }: { className?: string; id?: string }) {
  const rand = seeded(7);
  const C = { x: 240, y: 200 };
  const ring = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: r2(C.x + Math.cos(a) * 105), y: r2(C.y + Math.sin(a) * 92) };
  });
  const outer = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2 + 0.2;
    const r = 170 + rand() * 30;
    return { x: r2(C.x + Math.cos(a) * r), y: r2(C.y + Math.sin(a) * r * 0.78) };
  });
  const links: { d: string; strong?: boolean }[] = [];
  ring.forEach((n, i) => {
    links.push({ d: `M${C.x} ${C.y}L${n.x} ${n.y}`, strong: true });
    const m = ring[(i + 1) % ring.length];
    const mx = (n.x + m.x) / 2, my = (n.y + m.y) / 2;
    const cx = r2(C.x + (mx - C.x) * 1.25), cy = r2(C.y + (my - C.y) * 1.25);
    links.push({ d: `M${n.x} ${n.y}Q${cx} ${cy} ${m.x} ${m.y}` });
  });
  outer.forEach((o, i) => {
    const n = ring[Math.floor(i / 2)];
    links.push({ d: `M${n.x} ${n.y}L${o.x} ${o.y}` });
  });

  return (
    <svg viewBox="0 0 480 400" fill="none" className={cn("h-auto w-full", className)} role="img" aria-label="Network topology diagram with a central hub, distribution nodes, and edge devices">
      <Defs id={id} />
      <circle cx={C.x} cy={C.y} r="190" fill={`url(#${id}-glow)`} opacity="0.5" />
      {[60, 120, 180].map((r) => (
        <ellipse key={r} cx={C.x} cy={C.y} rx={r} ry={r * 0.82} stroke="#94A3B8" strokeOpacity="0.08" strokeDasharray="2 6" />
      ))}
      {links.map((l, i) => (
        <path key={`l${i}`} d={l.d} stroke={l.strong ? `url(#${id}-line)` : "#3478F6"} strokeOpacity={l.strong ? 0.55 : 0.28} />
      ))}
      {links
        .filter((_, i) => i % 3 !== 2)
        .map((l, i) => (
          <path
            key={`p${i}`}
            d={l.d}
            stroke="#19D4E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 197"
            className="animate-dash"
            style={{ animationDuration: `${4 + (i % 5)}s`, animationDelay: `${i * -0.7}s` }}
          />
        ))}
      {outer.map((o, i) => (
        <g key={`o${i}`}>
          <rect x={o.x - 5} y={o.y - 5} width="10" height="10" rx="2.5" fill="#0D1422" stroke="#3478F6" strokeOpacity="0.7" />
          <circle cx={o.x} cy={o.y} r="1.6" fill="#94A3B8" />
        </g>
      ))}
      {ring.map((n, i) => (
        <g key={`r${i}`}>
          <circle cx={n.x} cy={n.y} r="14" fill="#19D4E5" fillOpacity="0.08" />
          <circle cx={n.x} cy={n.y} r="7" fill="#0D1422" stroke="#19D4E5" strokeOpacity="0.85" />
          <circle cx={n.x} cy={n.y} r="2.5" fill="#19D4E5" className="animate-pulse-soft" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
      <circle cx={C.x} cy={C.y} r="34" fill={`url(#${id}-node)`} opacity="0.35" />
      <circle cx={C.x} cy={C.y} r="18" fill="#0D1422" stroke={`url(#${id}-line)`} strokeWidth="2" />
      <circle cx={C.x} cy={C.y} r="6" fill="#E6FCFF" />
    </svg>
  );
}

/* ───────────── AI: layered neural network ───────────── */
export function NeuralArt({ className, id = "neural" }: { className?: string; id?: string }) {
  const counts = [4, 6, 7, 6, 3];
  const W = 520, H = 400, padX = 60, padY = 50;
  const layers = counts.map((c, li) => {
    const x = padX + (li * (W - padX * 2)) / (counts.length - 1);
    return Array.from({ length: c }, (_, ni) => ({ x: r2(x), y: r2(padY + ((ni + 0.5) * (H - padY * 2)) / c) }));
  });
  const hot = [1, 2, 3, 2, 1]; // a highlighted activation path
  const lines: { x1: number; y1: number; x2: number; y2: number; hot: boolean }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (let a = 0; a < layers[l].length; a++) {
      for (let b = 0; b < layers[l + 1].length; b++) {
        const A = layers[l][a], B = layers[l + 1][b];
        lines.push({ x1: A.x, y1: A.y, x2: B.x, y2: B.y, hot: hot[l] === a && hot[l + 1] === b });
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" className={cn("h-auto w-full", className)} role="img" aria-label="Neural network diagram with input, hidden, and output layers">
      <Defs id={id} />
      <ellipse cx={W / 2} cy={H / 2} rx="250" ry="180" fill={`url(#${id}-glow)`} opacity="0.45" />
      {lines.map((ln, i) =>
        ln.hot ? null : <line key={i} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} stroke="#3478F6" strokeOpacity="0.13" />,
      )}
      {lines
        .filter((ln) => ln.hot)
        .map((ln, i) => (
          <g key={`h${i}`}>
            <line x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} stroke={`url(#${id}-line)`} strokeWidth="1.5" strokeOpacity="0.9" />
            <line x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} stroke="#E6FCFF" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 196" className="animate-dash" style={{ animationDuration: "3s", animationDelay: `${i * -0.6}s` }} />
          </g>
        ))}
      {layers.map((layer, li) =>
        layer.map((n, ni) => {
          const isHot = hot[li] === ni;
          return (
            <g key={`${li}-${ni}`}>
              {isHot && <circle cx={n.x} cy={n.y} r="22" fill={`url(#${id}-node)`} opacity="0.45" className="animate-pulse-soft" style={{ animationDelay: `${li * 0.4}s` }} />}
              <circle cx={n.x} cy={n.y} r={isHot ? 8 : 6} fill="#0D1422" stroke={isHot ? "#19D4E5" : li % 2 ? "#9275FF" : "#3478F6"} strokeOpacity={isHot ? 1 : 0.7} strokeWidth="1.5" />
              {isHot && <circle cx={n.x} cy={n.y} r="3" fill="#E6FCFF" />}
            </g>
          );
        }),
      )}
      <g className="font-mono" fontSize="9" letterSpacing="2" fill="#94A3B8">
        <text x={padX} y={H - 12} textAnchor="middle">INPUT</text>
        <text x={W / 2} y={H - 12} textAnchor="middle">HIDDEN LAYERS</text>
        <text x={W - padX} y={H - 12} textAnchor="middle">OUTPUT</text>
      </g>
    </svg>
  );
}

/* ───────────── AI consultancy: processor core with circuit traces ───────────── */
export function SynapseArt({ className, id = "syn" }: { className?: string; id?: string }) {
  const C = { x: 240, y: 200 };
  const S = 46; // half-size of the core
  // orthogonal PCB-style traces leaving each side of the core
  const traces: string[] = [];
  const terminals: { x: number; y: number }[] = [];
  const offsets = [-28, -10, 10, 28];
  offsets.forEach((o, i) => {
    const len = 70 + (i % 2) * 40;
    const bend = i < 2 ? -1 : 1;
    // right
    const r = { x: C.x + S + len + 40, y: C.y + o + bend * 26 };
    traces.push(`M${C.x + S} ${C.y + o}H${C.x + S + len}L${C.x + S + len + 26} ${r.y}H${r.x}`);
    terminals.push(r);
    // left
    const l = { x: C.x - S - len - 40, y: C.y + o + bend * 26 };
    traces.push(`M${C.x - S} ${C.y + o}H${C.x - S - len}L${C.x - S - len - 26} ${l.y}H${l.x}`);
    terminals.push(l);
    // top
    const t = { x: C.x + o + bend * 22, y: C.y - S - len * 0.6 - 34 };
    traces.push(`M${C.x + o} ${C.y - S}V${C.y - S - len * 0.6}L${t.x} ${C.y - S - len * 0.6 - 22}V${t.y}`);
    terminals.push(t);
    // bottom
    const b = { x: C.x + o + bend * 22, y: C.y + S + len * 0.6 + 34 };
    traces.push(`M${C.x + o} ${C.y + S}V${C.y + S + len * 0.6}L${b.x} ${C.y + S + len * 0.6 + 22}V${b.y}`);
    terminals.push(b);
  });

  return (
    <svg viewBox="0 0 480 400" fill="none" className={cn("h-auto w-full", className)} role="img" aria-label="Abstract processor core with circuit traces radiating outward">
      <Defs id={id} />
      <circle cx={C.x} cy={C.y} r="170" fill={`url(#${id}-glow)`} opacity="0.55" />
      {traces.map((d, i) => (
        <g key={i}>
          <path d={d} stroke={i % 3 === 0 ? "#9275FF" : "#3478F6"} strokeOpacity="0.35" strokeLinejoin="round" />
          {i % 2 === 0 && (
            <path
              d={d}
              stroke={i % 4 === 0 ? "#E6FCFF" : "#19D4E5"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5 195"
              className="animate-dash"
              style={{ animationDuration: `${3.5 + (i % 4)}s`, animationDelay: `${i * -0.45}s` }}
            />
          )}
        </g>
      ))}
      {terminals.map((t, i) => (
        <circle key={i} cx={r2(t.x)} cy={r2(t.y)} r="3" fill="#0D1422" stroke="#19D4E5" strokeOpacity="0.8" />
      ))}
      {/* core */}
      <rect x={C.x - S - 14} y={C.y - S - 14} width={(S + 14) * 2} height={(S + 14) * 2} rx="18" fill={`url(#${id}-node)`} opacity="0.18" />
      <rect x={C.x - S} y={C.y - S} width={S * 2} height={S * 2} rx="12" fill="#0D1422" stroke={`url(#${id}-line)`} strokeWidth="1.5" />
      <rect x={C.x - S + 12} y={C.y - S + 12} width={(S - 12) * 2} height={(S - 12) * 2} rx="6" stroke="#94A3B8" strokeOpacity="0.2" />
      {[-1, 0, 1].map((gx) =>
        [-1, 0, 1].map((gy) => (
          <circle
            key={`${gx}${gy}`}
            cx={C.x + gx * 14}
            cy={C.y + gy * 14}
            r={gx === 0 && gy === 0 ? 4 : 2.2}
            fill={gx === 0 && gy === 0 ? "#E6FCFF" : "#19D4E5"}
            className="animate-pulse-soft"
            style={{ animationDelay: `${(gx + 1) * 0.4 + (gy + 1) * 0.25}s` }}
          />
        )),
      )}
    </svg>
  );
}

/* ───────────── Global: dotted sphere with arcs from a Dubai origin ───────────── */
export function GlobalArt({ className, id = "globe" }: { className?: string; id?: string }) {
  const CX = 260, CY = 230, R = 170;
  const tilt = 0.38;
  const dots: { x: number; y: number; o: number }[] = [];
  for (let lat = -80; lat <= 80; lat += 10) {
    const phi = (lat * Math.PI) / 180;
    const count = Math.max(6, Math.round(36 * Math.cos(phi)));
    for (let k = 0; k < count; k++) {
      const lambda = (k / count) * Math.PI * 2;
      const x = Math.cos(phi) * Math.sin(lambda);
      const y0 = Math.sin(phi);
      const z0 = Math.cos(phi) * Math.cos(lambda);
      const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
      const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
      if (z <= 0) continue;
      dots.push({ x: r2(CX + x * R), y: r2(CY - y * R), o: r2(0.15 + z * 0.55) });
    }
  }
  const origin = { x: CX + 38, y: CY - 46 };
  const targets = [
    { x: CX - 120, y: CY - 92 },
    { x: CX - 150, y: CY + 20 },
    { x: CX - 40, y: CY + 120 },
    { x: CX + 120, y: CY + 70 },
    { x: CX + 135, y: CY - 70 },
    { x: CX - 20, y: CY - 145 },
  ];
  const arcs = targets.map((t) => {
    const mx = (origin.x + t.x) / 2, my = (origin.y + t.y) / 2;
    const dx = mx - CX, dy = my - CY;
    const len = Math.hypot(dx, dy) || 1;
    const lift = 70;
    return `M${r2(origin.x)} ${r2(origin.y)}Q${r2(mx + (dx / len) * lift)} ${r2(my + (dy / len) * lift - 30)} ${r2(t.x)} ${r2(t.y)}`;
  });

  return (
    <svg viewBox="0 0 520 440" fill="none" className={cn("h-auto w-full", className)} role="img" aria-label="Abstract globe with connections radiating from Dubai">
      <Defs id={id} />
      <circle cx={CX} cy={CY} r={R + 40} fill={`url(#${id}-glow)`} opacity="0.55" />
      <circle cx={CX} cy={CY} r={R} stroke="#3478F6" strokeOpacity="0.3" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.3" fill="#94A3B8" fillOpacity={d.o} />
      ))}
      {arcs.map((d, i) => (
        <g key={i}>
          <path d={d} stroke={`url(#${id}-line)`} strokeOpacity="0.6" />
          <path d={d} stroke="#E6FCFF" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 196" className="animate-dash" style={{ animationDuration: `${5 + i}s`, animationDelay: `${i * -1.1}s` }} />
        </g>
      ))}
      {targets.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r="3" fill="#9275FF" />
      ))}
      <circle cx={origin.x} cy={origin.y} r="26" fill={`url(#${id}-node)`} opacity="0.5" className="animate-pulse-soft" />
      <circle cx={origin.x} cy={origin.y} r="5" fill="#E6FCFF" />
      <g className="font-mono" fontSize="10" letterSpacing="2.5">
        <line x1={origin.x + 10} y1={origin.y - 10} x2={origin.x + 46} y2={origin.y - 46} stroke="#19D4E5" strokeOpacity="0.7" />
        <text x={origin.x + 52} y={origin.y - 48} fill="#F8FAFC">DUBAI</text>
        <text x={origin.x + 52} y={origin.y - 34} fill="#94A3B8">UAE</text>
      </g>
    </svg>
  );
}
