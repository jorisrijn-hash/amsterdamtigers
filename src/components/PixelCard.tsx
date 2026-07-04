"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Animated pixel-canvas card, adapted from React Bits (MIT). Pixels grow in from
 * the centre outward on hover/focus, shimmer, and shrink out on leave. The loop
 * only runs while interacting and cancels itself once every pixel is idle.
 */

class Pixel {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string;
  private speed: number;
  private size = 0;
  private sizeStep = Math.random() * 0.4;
  private minSize = 0.5;
  private maxSizeInteger = 2;
  private maxSize: number;
  private delay: number;
  private counter = 0;
  private counterStep: number;
  isIdle = false;
  private isReverse = false;
  private isShimmer = false;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.rand(0.1, 0.9) * speed;
    this.maxSize = this.rand(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01;
  }

  private rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private draw() {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) this.shimmer();
    else this.size += this.sizeStep;
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  private shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

function effectiveSpeed(value: number, reduced: boolean) {
  const throttle = 0.001;
  if (value <= 0 || reduced) return 0;
  if (value >= 100) return 100 * throttle;
  return value * throttle;
}

type VariantCfg = { gap: number; speed: number; colors: string; noFocus: boolean };

const VARIANTS: Record<string, VariantCfg> = {
  // Fits the black/red/white identity: paper, cool grey, tiger red.
  tiger: { gap: 5, speed: 40, colors: "#f4f5f6,#c7ccd2,#e10a2b", noFocus: false },
  default: { gap: 5, speed: 35, colors: "#f8fafc,#f1f5f9,#cbd5e1", noFocus: false },
};

export function PixelCard({
  variant = "tiger",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  children,
}: {
  variant?: keyof typeof VARIANTS;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const rafRef = useRef<number | null>(null);
  const prevRef = useRef(0);
  const reduce = useReducedMotion() ?? false;

  const cfg = VARIANTS[variant] ?? VARIANTS.default;
  const fGap = gap ?? cfg.gap;
  const fSpeed = speed ?? cfg.speed;
  const fColors = colors ?? cfg.colors;
  const fNoFocus = noFocus ?? cfg.noFocus;

  const init = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    if (w === 0 || h === 0) return;
    canvas.width = w;
    canvas.height = h;

    const palette = fColors.split(",");
    const cx = w / 2;
    const cy = h / 2;
    const pixels: Pixel[] = [];
    for (let x = 0; x < w; x += fGap) {
      for (let y = 0; y < h; y += fGap) {
        const color = palette[Math.floor(Math.random() * palette.length)];
        const dx = x - cx;
        const dy = y - cy;
        const delay = reduce ? 0 : Math.sqrt(dx * dx + dy * dy);
        pixels.push(
          new Pixel(canvas, ctx, x, y, color, effectiveSpeed(fSpeed, reduce), delay),
        );
      }
    }
    pixelsRef.current = pixels;
  }, [fColors, fGap, fSpeed, reduce]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const run = useCallback(
    (phase: "appear" | "disappear") => {
      rafRef.current = requestAnimationFrame(() => run(phase));
      const now = performance.now();
      const delta = now - prevRef.current;
      const frame = 1000 / 60;
      if (delta < frame) return;
      prevRef.current = now - (delta % frame);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (const p of pixelsRef.current) {
        if (phase === "appear") p.appear();
        else p.disappear();
        if (!p.isIdle) allIdle = false;
      }
      if (phase === "disappear" && allIdle) stop();
    },
    [stop],
  );

  const onEnter = useCallback(() => {
    stop();
    run("appear");
  }, [run, stop]);

  const onLeave = useCallback(() => {
    stop();
    run("disappear");
  }, [run, stop]);

  useEffect(() => {
    init();
    const ro = new ResizeObserver(() => init());
    const el = containerRef.current;
    if (el) ro.observe(el);
    return () => {
      ro.disconnect();
      stop();
    };
  }, [init, stop]);

  return (
    <div
      ref={containerRef}
      className={`relative isolate overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={fNoFocus ? undefined : onEnter}
      onBlur={fNoFocus ? undefined : onLeave}
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[1]" />
      {children}
    </div>
  );
}
