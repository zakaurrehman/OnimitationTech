"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useVisibleAnimationFrame } from "./use-animation-frame";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

/* Domain-warped fbm flow field tinted to the brand palette, with faint
   "energy" contour lines and a soft glow that follows the cursor. */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0);
  float t = u_time * 0.035;

  vec2 wp = p + m * 0.06;
  vec2 q = vec2(fbm(wp * 1.3 + t), fbm(wp * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(wp * 1.15 + 2.0 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(wp * 1.15 + 2.0 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(wp * 1.05 + 2.4 * r);

  vec3 base   = vec3(0.027, 0.043, 0.078);
  vec3 navy   = vec3(0.045, 0.085, 0.20);
  vec3 blue   = vec3(0.204, 0.471, 0.965);
  vec3 cyan   = vec3(0.098, 0.831, 0.898);
  vec3 violet = vec3(0.573, 0.459, 1.0);

  vec3 col = mix(base, navy, smoothstep(0.25, 0.8, f));
  col = mix(col, blue, smoothstep(0.58, 0.98, f) * 0.5);
  col = mix(col, violet, smoothstep(0.45, 0.95, length(q)) * smoothstep(0.35, 0.95, r.y) * 0.28);
  col = mix(col, cyan, pow(smoothstep(0.62, 1.0, r.x), 3.0) * 0.3);

  // flowing energy lines
  float c = abs(fract(f * 7.0 + t * 1.6) - 0.5);
  float line = smoothstep(0.025, 0.0, c) * smoothstep(0.42, 0.78, f);
  col += line * mix(blue, cyan, r.x) * 0.16;

  // cursor glow
  float md = length(p - m);
  col += mix(blue, cyan, 0.35) * 0.09 * exp(-md * md * 3.5);

  // vignette + fade into page background at the bottom
  float vig = smoothstep(1.35, 0.25, length((uv - vec2(0.5, 0.55)) * vec2(1.15, 1.0)));
  col = mix(base, col, mix(0.35, 1.0, vig));
  col = mix(base, col, smoothstep(0.0, 0.38, uv.y));
  col = mix(base, col, u_intensity);

  // subtle film grain to avoid banding
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function ShaderBackground({
  className,
  intensity = 1,
  resolution = 0.6,
}: {
  className?: string;
  /** 0–1 blend between flat background and full effect. */
  intensity?: number;
  /** Render-scale relative to CSS pixels — the field is soft so it upscales cleanly. */
  resolution?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<{
    gl: WebGLRenderingContext;
    uRes: WebGLUniformLocation | null;
    uTime: WebGLUniformLocation | null;
    uMouse: WebGLUniformLocation | null;
    uIntensity: WebGLUniformLocation | null;
  } | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.6, tx: 0.5, ty: 0.6 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return; // CSS fallback gradient remains visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    state.current = {
      gl,
      uRes: gl.getUniformLocation(prog, "u_res"),
      uTime: gl.getUniformLocation(prog, "u_time"),
      uMouse: gl.getUniformLocation(prog, "u_mouse"),
      uIntensity: gl.getUniformLocation(prog, "u_intensity"),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr * resolution));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr * resolution));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.tx = (e.clientX - r.left) / r.width;
      mouse.current.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    canvas.dataset.ready = "true";

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      state.current = null;
    };
  }, [resolution]);

  useVisibleAnimationFrame(canvasRef, (time) => {
    const s = state.current;
    if (!s) return;
    const m = mouse.current;
    m.x += (m.tx - m.x) * 0.04;
    m.y += (m.ty - m.y) * 0.04;
    s.gl.uniform2f(s.uRes, s.gl.drawingBufferWidth, s.gl.drawingBufferHeight);
    s.gl.uniform1f(s.uTime, time / 1000);
    s.gl.uniform2f(s.uMouse, m.x, m.y);
    s.gl.uniform1f(s.uIntensity, intensity);
    s.gl.drawArrays(s.gl.TRIANGLES, 0, 3);
  });

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // CSS fallback before WebGL initialises (or if it is unavailable)
        "bg-[radial-gradient(ellipse_80%_60%_at_60%_35%,rgba(52,120,246,0.22),transparent_60%),radial-gradient(ellipse_50%_40%_at_20%_20%,rgba(146,117,255,0.12),transparent_60%)]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-[1.6s] data-[ready=true]:opacity-100"
      />
    </div>
  );
}
