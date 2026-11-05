"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useVisibleAnimationFrame } from "./use-animation-frame";

type Pulse = { edge: number; t: number; speed: number };

function buildGraph(count: number, neighbours: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = golden * i;
    // slight radial jitter keeps the sphere organic rather than perfectly geometric
    const j = 0.96 + ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * 0.08;
    pts[i * 3] = Math.cos(theta) * rad * j;
    pts[i * 3 + 1] = y * j;
    pts[i * 3 + 2] = Math.sin(theta) * rad * j;
  }
  const seen = new Set<string>();
  const edges: number[] = [];
  for (let i = 0; i < count; i++) {
    const d: [number, number][] = [];
    for (let k = 0; k < count; k++) {
      if (k === i) continue;
      const dx = pts[i * 3] - pts[k * 3];
      const dy = pts[i * 3 + 1] - pts[k * 3 + 1];
      const dz = pts[i * 3 + 2] - pts[k * 3 + 2];
      d.push([dx * dx + dy * dy + dz * dz, k]);
    }
    d.sort((a, b) => a[0] - b[0]);
    for (let n = 0; n < neighbours; n++) {
      const k = d[n][1];
      const key = i < k ? `${i}-${k}` : `${k}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push(i, k);
      }
    }
  }
  return { pts, edges: new Uint16Array(edges) };
}

/**
 * A rotating 3D "neural sphere": nodes on a sphere linked to their nearest
 * neighbours, with signal pulses travelling along connections and orbit rings.
 * Rendered with Canvas 2D (no 3D library needed) and tilts toward the cursor.
 */
export function NeuralGlobe({
  className,
  nodes = 300,
  scale = 0.36,
  rings = true,
}: {
  className?: string;
  nodes?: number;
  scale?: number;
  rings?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graph = useRef<ReturnType<typeof buildGraph> | null>(null);
  const proj = useRef<Float32Array | null>(null);
  const pulses = useRef<Pulse[]>([]);
  const tilt = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const size = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    graph.current = buildGraph(nodes, 3);
    proj.current = new Float32Array(nodes * 3);
  }, [nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      size.current = { w, h, dpr };
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      tilt.current.tx = Math.max(-1, Math.min(1, nx)) * 0.6;
      tilt.current.ty = Math.max(-1, Math.min(1, ny)) * 0.4;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useVisibleAnimationFrame(wrapRef, (time, delta) => {
    const canvas = canvasRef.current;
    const g = graph.current;
    const p = proj.current;
    if (!canvas || !g || !p) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h, dpr } = size.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const tl = tilt.current;
    tl.x += (tl.tx - tl.x) * 0.05;
    tl.y += (tl.ty - tl.y) * 0.05;

    const R = Math.min(w, h) * scale;
    const cx = w / 2;
    const cy = h / 2;
    const a = time * 0.00012 + tl.x;
    const b = 0.32 + tl.y;
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    const F = 3.2;
    const n = g.pts.length / 3;

    for (let i = 0; i < n; i++) {
      const x = g.pts[i * 3], y = g.pts[i * 3 + 1], z = g.pts[i * 3 + 2];
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const y2 = y * cb - z1 * sb;
      const z2 = y * sb + z1 * cb;
      const s = F / (F - z2);
      p[i * 3] = cx + x1 * R * s;
      p[i * 3 + 1] = cy + y2 * R * s;
      p[i * 3 + 2] = (z2 + 1) / 2; // 0 = back, 1 = front
    }

    // core glow
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25);
    glow.addColorStop(0, "rgba(52,120,246,0.20)");
    glow.addColorStop(0.5, "rgba(25,212,229,0.05)");
    glow.addColorStop(1, "rgba(7,11,20,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(cx - R * 1.3, cy - R * 1.3, R * 2.6, R * 2.6);

    ctx.globalCompositeOperation = "lighter";

    // orbit rings — floating geometric structure
    if (rings) {
      const ringDefs = [
        { r: 1.32, tiltX: 1.2, tiltZ: 0.35, speed: 0.00009, color: "25,212,229", alpha: 0.32 },
        { r: 1.5, tiltX: 1.35, tiltZ: -0.55, speed: -0.00006, color: "146,117,255", alpha: 0.22 },
      ];
      for (const ring of ringDefs) {
        const rot = time * ring.speed;
        ctx.beginPath();
        const steps = 120;
        let dotX = 0, dotY = 0;
        for (let k = 0; k <= steps; k++) {
          const t = (k / steps) * Math.PI * 2 + rot;
          let x = Math.cos(t) * ring.r, y = 0, z = Math.sin(t) * ring.r;
          // tilt ring
          const y1 = y * Math.cos(ring.tiltX) - z * Math.sin(ring.tiltX);
          const z1 = y * Math.sin(ring.tiltX) + z * Math.cos(ring.tiltX);
          y = y1; z = z1;
          const x2 = x * Math.cos(ring.tiltZ) - y * Math.sin(ring.tiltZ);
          const y2 = x * Math.sin(ring.tiltZ) + y * Math.cos(ring.tiltZ);
          x = x2; y = y2;
          // global tilt
          const yy = y * cb - z * sb;
          const zz = y * sb + z * cb;
          const s = F / (F - zz);
          const sx = cx + x * R * s, sy = cy + yy * R * s;
          if (k === 0) { ctx.moveTo(sx, sy); dotX = sx; dotY = sy; }
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${ring.color},${ring.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = `rgba(${ring.color},0.95)`;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${ring.color},0.18)`;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // edges, batched into depth buckets
    const buckets = 4;
    const colors = ["98,92,220", "60,110,240", "45,160,240", "70,215,235"];
    const alphas = [0.05, 0.1, 0.17, 0.3];
    for (let bk = 0; bk < buckets; bk++) {
      ctx.beginPath();
      for (let e = 0; e < g.edges.length; e += 2) {
        const i = g.edges[e], k = g.edges[e + 1];
        const d = (p[i * 3 + 2] + p[k * 3 + 2]) / 2;
        if (Math.min(buckets - 1, Math.floor(d * buckets)) !== bk) continue;
        ctx.moveTo(p[i * 3], p[i * 3 + 1]);
        ctx.lineTo(p[k * 3], p[k * 3 + 1]);
      }
      ctx.strokeStyle = `rgba(${colors[bk]},${alphas[bk]})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // nodes
    for (let i = 0; i < n; i++) {
      const d = p[i * 3 + 2];
      const r = 0.5 + d * 1.5;
      ctx.fillStyle = d > 0.6 ? `rgba(190,240,255,${0.25 + d * 0.65})` : `rgba(110,140,255,${0.12 + d * 0.5})`;
      ctx.fillRect(p[i * 3] - r / 2, p[i * 3 + 1] - r / 2, r, r);
    }

    // signal pulses travelling along edges
    const list = pulses.current;
    const edgeCount = g.edges.length / 2;
    if (list.length < 16 && Math.random() < 0.12) {
      list.push({ edge: Math.floor(Math.random() * edgeCount), t: 0, speed: 0.0012 + Math.random() * 0.0016 });
    }
    for (let q = list.length - 1; q >= 0; q--) {
      const pl = list[q];
      pl.t += pl.speed * delta;
      if (pl.t >= 1) {
        // hop to a connected edge to make the signal travel through the network
        const end = g.edges[pl.edge * 2 + 1];
        let next = -1;
        for (let e = 0; e < edgeCount; e++) {
          if (g.edges[e * 2] === end && e !== pl.edge) { next = e; break; }
        }
        if (next === -1 || Math.random() < 0.3) list.splice(q, 1);
        else { pl.edge = next; pl.t = 0; }
        continue;
      }
      const i = g.edges[pl.edge * 2], k = g.edges[pl.edge * 2 + 1];
      const x = p[i * 3] + (p[k * 3] - p[i * 3]) * pl.t;
      const y = p[i * 3 + 1] + (p[k * 3 + 1] - p[i * 3 + 1]) * pl.t;
      const d = (p[i * 3 + 2] + p[k * 3 + 2]) / 2;
      ctx.strokeStyle = `rgba(25,212,229,${0.15 + d * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(p[i * 3], p[i * 3 + 1]);
      ctx.lineTo(p[k * 3], p[k * 3 + 1]);
      ctx.stroke();
      ctx.fillStyle = `rgba(25,212,229,${0.12 * d})`;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(230,252,255,${0.4 + d * 0.6})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
  });

  return (
    <div ref={wrapRef} aria-hidden className={cn("pointer-events-none relative", className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
