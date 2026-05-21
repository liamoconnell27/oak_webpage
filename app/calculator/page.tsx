"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MatProps {
  category: string;
  E: number; G: number; nu: number;
  Fy: number | null; Fu: number | null;
  rho: number; alpha: number; k_th: number; Cp: number;
  Tm: number | null;
}

interface SectionResult {
  A: number; cx: number; cy: number;
  Ix: number; Iy: number; Ip: number;
  Sx: number; Sy: number;
  Zx: number; Zy: number;
  rx: number; ry: number;
  J: number;
  ymax: number; xmax: number;
}

type ShapeKey = "rectangle" | "circle" | "hollow_rect" | "hollow_circle" | "wide_flange" | "channel" | "angle";

interface FieldDef { key: string; label: string; }

// ─── Material Database ────────────────────────────────────────────────────────

const MATERIALS: Record<string, MatProps> = {
  "A36 Structural Steel": {
    category: "Steel", E: 29000, G: 11200, nu: 0.26,
    Fy: 36, Fu: 58, rho: 0.2836, alpha: 6.5e-6, k_th: 26.0, Cp: 0.114, Tm: 2750,
  },
  "A992 Structural Steel": {
    category: "Steel", E: 29000, G: 11200, nu: 0.26,
    Fy: 50, Fu: 65, rho: 0.2836, alpha: 6.5e-6, k_th: 26.0, Cp: 0.114, Tm: 2750,
  },
  "A500 Gr. B (HSS)": {
    category: "Steel", E: 29000, G: 11200, nu: 0.26,
    Fy: 42, Fu: 58, rho: 0.2836, alpha: 6.5e-6, k_th: 26.0, Cp: 0.114, Tm: 2750,
  },
  "Stainless Steel 304": {
    category: "Steel", E: 28000, G: 11000, nu: 0.29,
    Fy: 30, Fu: 75, rho: 0.290, alpha: 9.9e-6, k_th: 9.4, Cp: 0.12, Tm: 2642,
  },
  "Aluminum 6061-T6": {
    category: "Aluminum", E: 10000, G: 3800, nu: 0.33,
    Fy: 35, Fu: 42, rho: 0.0975, alpha: 12.9e-6, k_th: 96.0, Cp: 0.215, Tm: 1205,
  },
  "Aluminum 6063-T5": {
    category: "Aluminum", E: 10000, G: 3800, nu: 0.33,
    Fy: 21, Fu: 27, rho: 0.0975, alpha: 12.9e-6, k_th: 116.0, Cp: 0.215, Tm: 1200,
  },
  "Concrete (f\'c = 3000 psi)": {
    category: "Concrete", E: 3122, G: 1301, nu: 0.2,
    Fy: null, Fu: null, rho: 0.0868, alpha: 5.5e-6, k_th: 0.9, Cp: 0.21, Tm: null,
  },
  "Concrete (f\'c = 4000 psi)": {
    category: "Concrete", E: 3605, G: 1502, nu: 0.2,
    Fy: null, Fu: null, rho: 0.0868, alpha: 5.5e-6, k_th: 0.9, Cp: 0.21, Tm: null,
  },
  "Douglas Fir-Larch (No. 2)": {
    category: "Wood", E: 1600, G: 100, nu: 0.29,
    Fy: null, Fu: null, rho: 0.0181, alpha: 2.4e-6, k_th: 0.08, Cp: 0.29, Tm: null,
  },
  "Southern Pine (No. 2)": {
    category: "Wood", E: 1600, G: 100, nu: 0.29,
    Fy: null, Fu: null, rho: 0.0210, alpha: 2.4e-6, k_th: 0.10, Cp: 0.29, Tm: null,
  },
};

// ─── Shape Field Definitions ─────────────────────────────────────────────────

const SHAPE_FIELDS: Record<ShapeKey, FieldDef[]> = {
  rectangle:     [{ key:"b", label:"Width b" }, { key:"h", label:"Height h" }],
  circle:        [{ key:"d", label:"Diameter d" }],
  hollow_rect:   [{ key:"B", label:"Outer Width B" }, { key:"H", label:"Outer Height H" }, { key:"t", label:"Wall Thickness t" }],
  hollow_circle: [{ key:"D", label:"Outer Diameter D" }, { key:"di", label:"Inner Diameter dᵢ" }],
  wide_flange:   [{ key:"d", label:"Total Depth d" }, { key:"bf", label:"Flange Width bƒ" }, { key:"tf", label:"Flange Thickness tƒ" }, { key:"tw", label:"Web Thickness tᵥ" }],
  channel:       [{ key:"d", label:"Total Depth d" }, { key:"bf", label:"Flange Width bƒ" }, { key:"tf", label:"Flange Thickness tƒ" }, { key:"tw", label:"Web Thickness tᵥ" }],
  angle:         [{ key:"h1", label:"Vertical Leg h₁" }, { key:"h2", label:"Horizontal Leg h₂" }, { key:"t", label:"Thickness t" }],
};

const SHAPE_LABELS: Record<ShapeKey, string> = {
  rectangle: "Rectangle", circle: "Circle", hollow_rect: "Hollow Rect",
  hollow_circle: "Hollow Circle", wide_flange: "Wide Flange", channel: "Channel", angle: "Angle",
};

// ─── Section Property Calculations ───────────────────────────────────────────

function calcRectangle(p: Record<string, number>): SectionResult | null {
  const { b, h } = p;
  if (!b || !h || b <= 0 || h <= 0) return null;
  const A = b * h;
  const Ix = b * h ** 3 / 12;
  const Iy = h * b ** 3 / 12;
  const big = Math.max(b, h), small = Math.min(b, h);
  const J = (big * small ** 3 / 3) * (1 - 0.630 * (small / big) + 0.052 * (small / big) ** 5);
  return {
    A, cx: b / 2, cy: h / 2, Ix, Iy, Ip: Ix + Iy,
    Sx: Ix / (h / 2), Sy: Iy / (b / 2),
    Zx: b * h ** 2 / 4, Zy: h * b ** 2 / 4,
    rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A), J,
    ymax: h / 2, xmax: b / 2,
  };
}

function calcCircle(p: Record<string, number>): SectionResult | null {
  const { d } = p;
  if (!d || d <= 0) return null;
  const A = Math.PI * d ** 2 / 4;
  const I = Math.PI * d ** 4 / 64;
  return {
    A, cx: d / 2, cy: d / 2, Ix: I, Iy: I, Ip: 2 * I,
    Sx: Math.PI * d ** 3 / 32, Sy: Math.PI * d ** 3 / 32,
    Zx: d ** 3 / 6, Zy: d ** 3 / 6,
    rx: d / 4, ry: d / 4, J: 2 * I,
    ymax: d / 2, xmax: d / 2,
  };
}

function calcHollowRect(p: Record<string, number>): SectionResult | null {
  const { B, H, t } = p;
  if (!B || !H || !t || B <= 0 || H <= 0 || t <= 0 || 2 * t >= B || 2 * t >= H) return null;
  const bi = B - 2 * t, hi = H - 2 * t;
  const A = B * H - bi * hi;
  const Ix = (B * H ** 3 - bi * hi ** 3) / 12;
  const Iy = (H * B ** 3 - hi * bi ** 3) / 12;
  const Am = (B - t) * (H - t);
  const J = 4 * Am ** 2 / (2 * (B - t) / t + 2 * (H - t) / t);
  return {
    A, cx: B / 2, cy: H / 2, Ix, Iy, Ip: Ix + Iy,
    Sx: Ix / (H / 2), Sy: Iy / (B / 2),
    Zx: B * H ** 2 / 4 - bi * hi ** 2 / 4,
    Zy: H * B ** 2 / 4 - hi * bi ** 2 / 4,
    rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A), J,
    ymax: H / 2, xmax: B / 2,
  };
}

function calcHollowCircle(p: Record<string, number>): SectionResult | null {
  const { D, di } = p;
  if (!D || !di || D <= 0 || di <= 0 || di >= D) return null;
  const A = Math.PI * (D ** 2 - di ** 2) / 4;
  const I = Math.PI * (D ** 4 - di ** 4) / 64;
  const J = Math.PI * (D ** 4 - di ** 4) / 32;
  return {
    A, cx: D / 2, cy: D / 2, Ix: I, Iy: I, Ip: J,
    Sx: I / (D / 2), Sy: I / (D / 2),
    Zx: (D ** 3 - di ** 3) / 6, Zy: (D ** 3 - di ** 3) / 6,
    rx: Math.sqrt(I / A), ry: Math.sqrt(I / A), J,
    ymax: D / 2, xmax: D / 2,
  };
}

function calcWideFlange(p: Record<string, number>): SectionResult | null {
  const { d, bf, tf, tw } = p;
  if (!d || !bf || !tf || !tw || d <= 0 || bf <= 0 || tf <= 0 || tw <= 0 || 2 * tf >= d || tw >= bf) return null;
  const dw = d - 2 * tf;
  const A = 2 * bf * tf + dw * tw;
  const Ix = (bf * d ** 3 - (bf - tw) * dw ** 3) / 12;
  const Iy = (2 * tf * bf ** 3 + dw * tw ** 3) / 12;
  const J = (2 * bf * tf ** 3 + dw * tw ** 3) / 3;
  return {
    A, cx: bf / 2, cy: d / 2, Ix, Iy, Ip: Ix + Iy,
    Sx: Ix / (d / 2), Sy: Iy / (bf / 2),
    Zx: bf * tf * (d - tf) + tw * dw ** 2 / 4,
    Zy: bf ** 2 * tf / 2 + tw ** 2 * dw / 4,
    rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A), J,
    ymax: d / 2, xmax: bf / 2,
  };
}

function calcChannel(p: Record<string, number>): SectionResult | null {
  const { d, bf, tf, tw } = p;
  if (!d || !bf || !tf || !tw || d <= 0 || bf <= 0 || tf <= 0 || tw <= 0 || 2 * tf >= d || tw >= bf) return null;
  const dw = d - 2 * tf;
  const A = bf * d - (bf - tw) * dw;
  const x_cut = (bf + tw) / 2;
  const cx = (bf * d * (bf / 2) - (bf - tw) * dw * x_cut) / A;
  const Ix = (bf * d ** 3 - (bf - tw) * dw ** 3) / 12;
  const Iy_full = d * bf ** 3 / 12 + bf * d * (bf / 2 - cx) ** 2;
  const Iy_cut = dw * (bf - tw) ** 3 / 12 + (bf - tw) * dw * (x_cut - cx) ** 2;
  const Iy = Iy_full - Iy_cut;
  const Sy = Math.min(Iy / cx, Iy / (bf - cx));
  const J = (2 * bf * tf ** 3 + dw * tw ** 3) / 3;
  return {
    A, cx, cy: d / 2, Ix, Iy, Ip: Ix + Iy,
    Sx: Ix / (d / 2), Sy,
    Zx: bf * tf * (d - tf) + tw * dw ** 2 / 4,
    Zy: Sy * 1.12,
    rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A), J,
    ymax: d / 2, xmax: Math.max(cx, bf - cx),
  };
}

function calcAngle(p: Record<string, number>): SectionResult | null {
  const { h1, h2, t } = p;
  if (!h1 || !h2 || !t || h1 <= 0 || h2 <= 0 || t <= 0 || t >= h1 || t >= h2) return null;
  const A1 = h1 * t, A2 = (h2 - t) * t, A = A1 + A2;
  const cx1 = t / 2, cy1 = h1 / 2;
  const cx2 = t + (h2 - t) / 2, cy2 = t / 2;
  const cx = (A1 * cx1 + A2 * cx2) / A;
  const cy = (A1 * cy1 + A2 * cy2) / A;
  const Ix = (t * h1 ** 3 / 12 + A1 * (cy1 - cy) ** 2) + ((h2 - t) * t ** 3 / 12 + A2 * (cy2 - cy) ** 2);
  const Iy = (h1 * t ** 3 / 12 + A1 * (cx1 - cx) ** 2) + (t * (h2 - t) ** 3 / 12 + A2 * (cx2 - cx) ** 2);
  const ymax = Math.max(cy, h1 - cy), xmax = Math.max(cx, h2 - cx);
  const J = t ** 3 * (h1 + h2 - t) / 3;
  return {
    A, cx, cy, Ix, Iy, Ip: Ix + Iy,
    Sx: Ix / ymax, Sy: Iy / xmax,
    Zx: (Ix / ymax) * 1.5, Zy: (Iy / xmax) * 1.5,
    rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A), J,
    ymax, xmax,
  };
}

const CALC_FNS: Record<ShapeKey, (p: Record<string, number>) => SectionResult | null> = {
  rectangle: calcRectangle, circle: calcCircle,
  hollow_rect: calcHollowRect, hollow_circle: calcHollowCircle,
  wide_flange: calcWideFlange, channel: calcChannel, angle: calcAngle,
};

// ─── Cross-Section SVG ────────────────────────────────────────────────────────

function SectionSVG({ shape, dims }: { shape: ShapeKey; dims: Record<string, number> }) {
  const VW = 260, VH = 220, PAD = 28;
  const avW = VW - 2 * PAD, avH = VH - 2 * PAD;

  const stroke = "rgba(190,210,230,0.6)";
  const fill = "rgba(190,210,230,0.08)";
  const centColor = "rgba(190,210,230,0.5)";

  function scaleAndCenter(w: number, h: number) {
    const s = Math.min(avW / w, avH / h);
    return { s, ox: PAD + (avW - w * s) / 2, oy: PAD + (avH - h * s) / 2 };
  }

  let content: React.ReactNode = null;

  if (shape === "rectangle" && dims.b > 0 && dims.h > 0) {
    const { s, ox, oy } = scaleAndCenter(dims.b, dims.h);
    const w = dims.b * s, h = dims.h * s;
    content = (
      <>
        <rect x={ox} y={oy} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="1.5" />
        <line x1={ox + w / 2 - 6} y1={oy + h / 2} x2={ox + w / 2 + 6} y2={oy + h / 2} stroke={centColor} strokeWidth="1" />
        <line x1={ox + w / 2} y1={oy + h / 2 - 6} x2={ox + w / 2} y2={oy + h / 2 + 6} stroke={centColor} strokeWidth="1" />
      </>
    );
  } else if (shape === "circle" && dims.d > 0) {
    const { s, ox, oy } = scaleAndCenter(dims.d, dims.d);
    const r = dims.d * s / 2, cx = ox + r, cy = oy + r;
    content = (
      <>
        <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="1.5" />
        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={centColor} strokeWidth="1" />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={centColor} strokeWidth="1" />
      </>
    );
  } else if (shape === "hollow_rect" && dims.B > 0 && dims.H > 0 && dims.t > 0 && 2 * dims.t < dims.B && 2 * dims.t < dims.H) {
    const { s, ox, oy } = scaleAndCenter(dims.B, dims.H);
    const W = dims.B * s, H = dims.H * s, t = dims.t * s;
    content = (
      <>
        <rect x={ox} y={oy} width={W} height={H} fill={fill} stroke={stroke} strokeWidth="1.5" />
        <rect x={ox + t} y={oy + t} width={W - 2 * t} height={H - 2 * t} fill="var(--background)" stroke={stroke} strokeWidth="1" />
        <line x1={ox + W / 2 - 6} y1={oy + H / 2} x2={ox + W / 2 + 6} y2={oy + H / 2} stroke={centColor} strokeWidth="1" />
        <line x1={ox + W / 2} y1={oy + H / 2 - 6} x2={ox + W / 2} y2={oy + H / 2 + 6} stroke={centColor} strokeWidth="1" />
      </>
    );
  } else if (shape === "hollow_circle" && dims.D > 0 && dims.di > 0 && dims.di < dims.D) {
    const { s, ox, oy } = scaleAndCenter(dims.D, dims.D);
    const ro = dims.D * s / 2, ri = dims.di * s / 2;
    const cx = ox + ro, cy = oy + ro;
    content = (
      <>
        <circle cx={cx} cy={cy} r={ro} fill={fill} stroke={stroke} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={ri} fill="var(--background)" stroke={stroke} strokeWidth="1" />
        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={centColor} strokeWidth="1" />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={centColor} strokeWidth="1" />
      </>
    );
  } else if (shape === "wide_flange" && dims.d > 0 && dims.bf > 0 && dims.tf > 0 && dims.tw > 0) {
    const { s, ox, oy } = scaleAndCenter(dims.bf, dims.d);
    const d = dims.d * s, bf = dims.bf * s, tf = dims.tf * s, tw = dims.tw * s;
    const dw = d - 2 * tf;
    const webX = ox + (bf - tw) / 2;
    content = (
      <>
        <rect x={ox} y={oy} width={bf} height={tf} fill={fill} stroke={stroke} strokeWidth="1.2" />
        <rect x={ox} y={oy + d - tf} width={bf} height={tf} fill={fill} stroke={stroke} strokeWidth="1.2" />
        <rect x={webX} y={oy + tf} width={tw} height={dw} fill={fill} stroke={stroke} strokeWidth="1.2" />
        <line x1={ox + bf / 2 - 6} y1={oy + d / 2} x2={ox + bf / 2 + 6} y2={oy + d / 2} stroke={centColor} strokeWidth="1" />
        <line x1={ox + bf / 2} y1={oy + d / 2 - 6} x2={ox + bf / 2} y2={oy + d / 2 + 6} stroke={centColor} strokeWidth="1" />
      </>
    );
  } else if (shape === "channel" && dims.d > 0 && dims.bf > 0 && dims.tf > 0 && dims.tw > 0) {
    const { s, ox, oy } = scaleAndCenter(dims.bf, dims.d);
    const d = dims.d * s, bf = dims.bf * s, tf = dims.tf * s, tw = dims.tw * s;
    const dw = d - 2 * tf;
    content = (
      <>
        <rect x={ox} y={oy} width={bf} height={tf} fill={fill} stroke={stroke} strokeWidth="1.2" />
        <rect x={ox} y={oy + d - tf} width={bf} height={tf} fill={fill} stroke={stroke} strokeWidth="1.2" />
        <rect x={ox} y={oy + tf} width={tw} height={dw} fill={fill} stroke={stroke} strokeWidth="1.2" />
      </>
    );
  } else if (shape === "angle" && dims.h1 > 0 && dims.h2 > 0 && dims.t > 0) {
    const { s, ox, oy } = scaleAndCenter(dims.h2, dims.h1);
    const h1 = dims.h1 * s, h2 = dims.h2 * s, t = dims.t * s;
    content = (
      <>
        <rect x={ox} y={oy} width={t} height={h1} fill={fill} stroke={stroke} strokeWidth="1.2" />
        <rect x={ox + t} y={oy + h1 - t} width={h2 - t} height={t} fill={fill} stroke={stroke} strokeWidth="1.2" />
      </>
    );
  }

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full">
      {/* Grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={(i + 1) * VW / 10} y1={0} x2={(i + 1) * VW / 10} y2={VH}
          stroke="rgba(190,210,230,0.05)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={(i + 1) * VH / 8} x2={VW} y2={(i + 1) * VH / 8}
          stroke="rgba(190,210,230,0.05)" strokeWidth="0.5" />
      ))}
      {content ?? (
        <text x={VW / 2} y={VH / 2} textAnchor="middle" fontSize="11" fill="rgba(190,210,230,0.2)" fontFamily="monospace">
          Enter dimensions
        </text>
      )}
      {/* Axis labels */}
      <text x={VW - 10} y={VH / 2 + 4} fontSize="9" fill="rgba(190,210,230,0.3)" fontFamily="monospace" textAnchor="end">x</text>
      <text x={VW / 2 + 4} y={12} fontSize="9" fill="rgba(190,210,230,0.3)" fontFamily="monospace">y</text>
    </svg>
  );
}

// ─── Result Row ───────────────────────────────────────────────────────────────

function Row({ label, value, unit, note }: { label: string; value: string | number | null; unit?: string; note?: string }) {
  const display = value === null || value === undefined
    ? "—"
    : typeof value === "number"
    ? (Math.abs(value) >= 1000 ? value.toLocaleString("en-US", { maximumFractionDigits: 2 }) : value.toPrecision(4))
    : value;
  return (
    <div className="flex items-baseline justify-between py-2.5 border-b border-foreground/[0.07] gap-4">
      <span className="text-xs font-mono text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm text-right">
        <span className="font-mono">{display}</span>
        {unit && value !== null && <span className="text-xs text-muted-foreground ml-1.5">{unit}</span>}
        {note && <span className="text-xs text-muted-foreground/50 ml-2 italic">{note}</span>}
      </span>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-foreground/10 p-5">
      <h3 className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase mb-3">{title}</h3>
      {children}
    </div>
  );
}

// ─── Shape SVG Icons for Selector ────────────────────────────────────────────

const SHAPE_ICONS: Record<ShapeKey, React.ReactNode> = {
  rectangle: <rect x="5" y="8" width="22" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  circle: <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  hollow_rect: (
    <>
      <rect x="4" y="6" width="24" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="11" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
    </>
  ),
  hollow_circle: (
    <>
      <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
    </>
  ),
  wide_flange: (
    <>
      <rect x="4" y="5" width="24" height="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4" y="23" width="24" height="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="13" y="9" width="6" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  channel: (
    <>
      <rect x="4" y="5" width="20" height="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4" y="23" width="20" height="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4" y="9" width="5" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  angle: (
    <>
      <rect x="5" y="5" width="5" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="22" width="17" height="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CalculatorPage() {
  const [material, setMaterial] = useState<string>("A36 Structural Steel");
  const [shape, setShape] = useState<ShapeKey>("rectangle");
  const [rawDims, setRawDims] = useState<Record<string, string>>({});
  const [length, setLength] = useState<string>("");
  const [units, setUnits] = useState<"imperial" | "metric">("imperial");

  const dimUnit = units === "imperial" ? "in" : "mm";
  const convIn = units === "metric" ? 1 / 25.4 : 1; // mm → in if metric

  const dims = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of SHAPE_FIELDS[shape]) {
      const v = parseFloat(rawDims[f.key] ?? "");
      out[f.key] = isNaN(v) ? 0 : v * convIn;
    }
    return out;
  }, [rawDims, shape, convIn]);

  const sec: SectionResult | null = useMemo(() => CALC_FNS[shape](dims), [shape, dims]);
  const mat = MATERIALS[material];

  const L_in = useMemo(() => {
    const v = parseFloat(length);
    if (isNaN(v) || v <= 0) return null;
    return units === "metric" ? v / 25.4 : v;
  }, [length, units]);

  // Display conversion factors
  const dA = units === "metric" ? 645.16 : 1;     // in² → mm²
  const dI = units === "metric" ? 416231 : 1;     // in⁴ → mm⁴
  const dS = units === "metric" ? 16387 : 1;      // in³ → mm³
  const dL = units === "metric" ? 25.4 : 1;       // in → mm
  const dE = units === "metric" ? 6.895 : 1;      // ksi → MPa
  const dR = units === "metric" ? 27680 : 1;      // lb/in³ → kg/m³
  const aUnit = units === "metric" ? "mm²" : "in²";
  const iUnit = units === "metric" ? "mm⁴" : "in⁴";
  const sUnit = units === "metric" ? "mm³" : "in³";
  const lUnit = units === "metric" ? "mm" : "in";
  const eUnit = units === "metric" ? "MPa" : "ksi";
  const rUnit = units === "metric" ? "kg/m³" : "lb/in³";

  function fmt(v: number | null, scale = 1): number | null {
    if (v === null || v === undefined || isNaN(v) || !isFinite(v)) return null;
    return v * scale;
  }

  const handleDimChange = (key: string, val: string) => {
    setRawDims(prev => ({ ...prev, [key]: val }));
  };

  const handleShapeChange = (s: ShapeKey) => {
    setShape(s);
    setRawDims({});
  };

  // Mass / weight
  const rho = mat.rho; // lb/in³
  const weightPerIn = sec ? sec.A * rho : null; // lb/in
  const weightPerFt = weightPerIn ? weightPerIn * 12 : null;
  const totalWeight = weightPerIn && L_in ? weightPerIn * L_in : null;
  const massPerM = weightPerIn ? weightPerIn * 12 * 0.0689655 * 2.20462 / 2.20462 * 1000 / 39.3701 : null; // kg/m

  // Thermal diffusivity (in²/s)
  const alpha_th = mat.k_th && mat.Cp && mat.rho
    ? mat.k_th / (mat.rho * 12 * mat.Cp * 3600) // BTU/(hr·ft·°F) / (lb/in³ * in/ft * BTU/(lb·°F) * s/hr)
    : null;

  // Combined stiffness values (kip·in²)
  const EI_x = sec ? mat.E * sec.Ix : null;
  const EI_y = sec ? mat.E * sec.Iy : null;
  const EA = sec ? mat.E * sec.A : null;

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      {/* ── Hero ── */}
      <section className="pt-40 pb-12 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Engineering Tool
          </span>
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-4">
            Section Properties
            <span className="text-muted-foreground"> Calculator</span>
          </h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Select a material and cross-section shape, enter dimensions, and all geometric, material, and thermal properties are calculated instantly.
          </p>
        </div>
      </section>

      {/* ── Calculator Body ── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start">

            {/* ── INPUT PANEL ── */}
            <div className="space-y-6 lg:sticky lg:top-28">

              {/* Unit System */}
              <div className="border border-foreground/10 p-5">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase mb-3">Unit System</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["imperial", "metric"] as const).map(u => (
                    <button
                      key={u}
                      onClick={() => setUnits(u)}
                      className={`py-2 text-sm font-mono transition-colors ${
                        units === u
                          ? "bg-foreground text-background"
                          : "border border-foreground/20 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {u === "imperial" ? "Imperial (in)" : "Metric (mm)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="border border-foreground/10 p-5">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase mb-3">Material</p>
                <select
                  value={material}
                  onChange={e => setMaterial(e.target.value)}
                  className="w-full bg-background border border-foreground/20 text-foreground text-sm py-2 px-3 focus:outline-none focus:border-foreground/50 transition-colors cursor-pointer"
                >
                  {Object.entries(
                    Object.keys(MATERIALS).reduce((acc, k) => {
                      const cat = MATERIALS[k].category;
                      if (!acc[cat]) acc[cat] = [];
                      acc[cat].push(k);
                      return acc;
                    }, {} as Record<string, string[]>)
                  ).map(([cat, mats]) => (
                    <optgroup key={cat} label={cat}>
                      {mats.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Shape Selection */}
              <div className="border border-foreground/10 p-5">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase mb-3">Cross-Section</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {(Object.keys(SHAPE_FIELDS) as ShapeKey[]).map(s => (
                    <button
                      key={s}
                      onClick={() => handleShapeChange(s)}
                      className={`flex flex-col items-center gap-1.5 p-2 border transition-colors ${
                        shape === s
                          ? "border-foreground/50 bg-foreground/5 text-foreground"
                          : "border-foreground/10 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      }`}
                      title={SHAPE_LABELS[s]}
                    >
                      <svg viewBox="0 0 32 32" className="w-7 h-7">
                        {SHAPE_ICONS[s]}
                      </svg>
                      <span className="text-[9px] font-mono leading-tight text-center">{SHAPE_LABELS[s]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="border border-foreground/10 p-5">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase mb-4">Dimensions</p>
                <div className="space-y-4">
                  {SHAPE_FIELDS[shape].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-mono text-muted-foreground block mb-1.5">{f.label}</label>
                      <div className="flex items-center border-b border-foreground/20 focus-within:border-foreground/50 transition-colors">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={rawDims[f.key] ?? ""}
                          onChange={e => handleDimChange(f.key, e.target.value)}
                          placeholder="0"
                          className="flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/30 outline-none"
                        />
                        <span className="text-xs font-mono text-muted-foreground/50 ml-2">{dimUnit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Length */}
              <div className="border border-foreground/10 p-5">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase mb-3">Length (optional)</p>
                <p className="text-xs text-muted-foreground/50 mb-4">Used for volume and weight calculations</p>
                <div className="flex items-center border-b border-foreground/20 focus-within:border-foreground/50 transition-colors">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={length}
                    onChange={e => setLength(e.target.value)}
                    placeholder="0"
                    className="flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/30 outline-none"
                  />
                  <span className="text-xs font-mono text-muted-foreground/50 ml-2">{dimUnit}</span>
                </div>
              </div>
            </div>

            {/* ── OUTPUT PANEL ── */}
            <div className="space-y-4">

              {/* Cross-section visualization */}
              <div className="border border-foreground/10 bg-foreground/[0.02] h-[240px] flex items-center justify-center p-4">
                <SectionSVG shape={shape} dims={dims} />
              </div>

              {/* Results grid */}
              <div className="grid md:grid-cols-2 gap-4">

                {/* Geometric */}
                <Block title="Cross-Section Geometry">
                  <Row label="Area  A" value={fmt(sec?.A ?? null, dA)} unit={aUnit} />
                  <Row label="Centroid  x̄" value={fmt(sec?.cx ?? null, dL)} unit={lUnit} />
                  <Row label="Centroid  ȳ" value={fmt(sec?.cy ?? null, dL)} unit={lUnit} />
                  <Row label="y_max" value={fmt(sec?.ymax ?? null, dL)} unit={lUnit} />
                  <Row label="x_max" value={fmt(sec?.xmax ?? null, dL)} unit={lUnit} />
                </Block>

                {/* Strong axis */}
                <Block title="Strong Axis  (x–x)">
                  <Row label="Iₓ" value={fmt(sec?.Ix ?? null, dI)} unit={iUnit} />
                  <Row label="Sₓ  (elastic)" value={fmt(sec?.Sx ?? null, dS)} unit={sUnit} />
                  <Row label="Zₓ  (plastic)" value={fmt(sec?.Zx ?? null, dS)} unit={sUnit} note={shape === "angle" ? "approx" : undefined} />
                  <Row label="rₓ" value={fmt(sec?.rx ?? null, dL)} unit={lUnit} />
                </Block>

                {/* Weak axis */}
                <Block title="Weak Axis  (y–y)">
                  <Row label="Iᵧ" value={fmt(sec?.Iy ?? null, dI)} unit={iUnit} />
                  <Row label="Sᵧ  (elastic)" value={fmt(sec?.Sy ?? null, dS)} unit={sUnit} />
                  <Row label="Zᵧ  (plastic)" value={fmt(sec?.Zy ?? null, dS)} unit={sUnit} note={shape === "angle" || shape === "channel" ? "approx" : undefined} />
                  <Row label="rᵧ" value={fmt(sec?.ry ?? null, dL)} unit={lUnit} />
                </Block>

                {/* Torsion */}
                <Block title="Torsional Properties">
                  <Row label="J  (St. Venant)" value={fmt(sec?.J ?? null, dI)} unit={iUnit} />
                  <Row label="Iₚ  (polar)" value={fmt(sec?.Ip ?? null, dI)} unit={iUnit} />
                </Block>

                {/* Material */}
                <Block title="Material Properties">
                  <Row label="Elastic Modulus  E" value={fmt(mat.E, dE)} unit={eUnit} />
                  <Row label="Shear Modulus  G" value={fmt(mat.G, dE)} unit={eUnit} />
                  <Row label="Poisson's Ratio  ν" value={mat.nu} />
                  <Row label="Yield Strength  Fy" value={mat.Fy !== null ? fmt(mat.Fy, dE) : null} unit={mat.Fy !== null ? eUnit : undefined} />
                  <Row label="Ultimate Strength  Fu" value={mat.Fu !== null ? fmt(mat.Fu, dE) : null} unit={mat.Fu !== null ? eUnit : undefined} />
                  <Row label="Density  ρ" value={fmt(mat.rho, dR)} unit={rUnit} />
                  <Row label="Melting Point" value={mat.Tm !== null ? (units === "metric" ? fmt((mat.Tm - 32) * 5/9, 1) : mat.Tm) : null} unit={mat.Tm !== null ? (units === "metric" ? "°C" : "°F") : undefined} />
                </Block>

                {/* Thermal */}
                <Block title="Thermal Properties">
                  <Row label="Thermal Expansion  α" value={units === "metric" ? fmt(mat.alpha * 9/5, 1) : mat.alpha} unit={units === "metric" ? "/°C" : "/°F"} />
                  <Row label="Thermal Conductivity  k" value={units === "metric" ? fmt(mat.k_th * 1.7308, 1) : mat.k_th} unit={units === "metric" ? "W/m·K" : "BTU/hr·ft·°F"} />
                  <Row label="Specific Heat  Cₚ" value={units === "metric" ? fmt(mat.Cp * 4186.8, 1) : mat.Cp} unit={units === "metric" ? "J/kg·K" : "BTU/lb·°F"} />
                  <Row label="Thermal Diffusivity  αₜ" value={alpha_th !== null ? alpha_th.toExponential(3) : null} unit="in²/s" />
                </Block>

                {/* Combined stiffness */}
                <Block title="Combined Stiffness">
                  <Row label="EIₓ  (flexural)" value={fmt(EI_x, units === "metric" ? 6.895 * 416231 / 1e6 : 1)} unit={units === "metric" ? "kN·m²" : "kip·in²"} />
                  <Row label="EIᵧ  (flexural)" value={fmt(EI_y, units === "metric" ? 6.895 * 416231 / 1e6 : 1)} unit={units === "metric" ? "kN·m²" : "kip·in²"} />
                  <Row label="EA  (axial)" value={fmt(EA, units === "metric" ? 6.895 * 645.16 / 1e3 : 1)} unit={units === "metric" ? "kN" : "kips"} />
                </Block>

                {/* Mass / Weight */}
                <Block title="Mass & Weight">
                  <Row label="Weight per foot" value={fmt(weightPerFt, units === "metric" ? 1.4882 : 1)} unit={units === "metric" ? "kg/m" : "lb/ft"} />
                  <Row label="Weight per length unit" value={fmt(weightPerIn, units === "metric" ? 1.4882 / 12 * 39.3701 : 1)} unit={units === "metric" ? "kg/m" : "lb/in"} />
                  {L_in !== null && (
                    <>
                      <Row label="Volume" value={fmt(sec ? sec.A * L_in : null, units === "metric" ? 16387 : 1)} unit={units === "metric" ? "mm³" : "in³"} />
                      <Row label="Total Weight" value={fmt(totalWeight, units === "metric" ? 0.4536 : 1)} unit={units === "metric" ? "kg" : "lb"} />
                    </>
                  )}
                </Block>

              </div>

              {/* Disclaimer */}
              <p className="text-xs font-mono text-muted-foreground/30 pt-2">
                All calculations are for reference only and should be verified by a licensed engineer before use in design. Plastic section moduli for channel and angle sections are approximate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
