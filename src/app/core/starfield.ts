import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, DOCUMENT } from '@angular/core';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  twinkle: number;
  phase: number;
  drift: number;
  tint: string;
}

const TINTS = ['#ffffff', '#ffe9c9', '#cfe3ff', '#fff6e8', '#bfe0ff'];

/**
 * The drifting starfield behind the hero. Canvas only — it never touches
 * change detection, and with reduced motion it draws one still frame.
 */
@Directive({ selector: 'canvas[appStarfield]' })
export class Starfield implements AfterViewInit, OnDestroy {
  private readonly canvas = inject<ElementRef<HTMLCanvasElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private readonly ctx = this.canvas.getContext('2d');
  private stars: Star[] = [];
  private width = 0;
  private height = 0;
  private frame: number | null = null;
  private resizeTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly reduced: boolean;

  constructor() {
    const win = this.document.defaultView;
    this.reduced = win?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  ngAfterViewInit(): void {
    if (!this.ctx) return;
    this.build();
    if (this.reduced) {
      this.draw(0);
    } else {
      this.frame = requestAnimationFrame(this.tick);
      this.document.addEventListener('visibilitychange', this.onVisibility);
    }
    this.document.defaultView?.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    const win = this.document.defaultView;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    if (win) win.removeEventListener('resize', this.onResize);
    this.document.removeEventListener('visibilitychange', this.onVisibility);
    clearTimeout(this.resizeTimer);
  }

  private readonly onVisibility = (): void => {
    if (this.document.hidden) {
      if (this.frame !== null) {
        cancelAnimationFrame(this.frame);
        this.frame = null;
      }
    } else if (this.frame === null) {
      this.frame = requestAnimationFrame(this.tick);
    }
  };

  private readonly onResize = (): void => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.build();
      this.draw(performance.now());
    }, 180);
  };

  private readonly tick = (time: number): void => {
    for (const star of this.stars) {
      star.y -= star.drift;
      if (star.y < -2) {
        star.y = this.height + 2;
        star.x = Math.random() * this.width;
      }
    }
    this.draw(time);
    this.frame = requestAnimationFrame(this.tick);
  };

  private build(): void {
    const win = this.document.defaultView;
    if (!win) return;
    const dpr = Math.min(win.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round((this.width * this.height) / 5200);
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      r: Math.random() * Math.random() * 1.5 + 0.2,
      a: Math.random() * 0.6 + 0.18,
      twinkle: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.05 + 0.008,
      tint: TINTS[Math.floor(Math.random() * TINTS.length)],
    }));
  }

  private draw(time: number): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const star of this.stars) {
      const alpha = this.reduced
        ? star.a
        : star.a * (0.68 + 0.32 * Math.sin(star.phase + (time / 1000) * star.twinkle));
      this.ctx.globalAlpha = Math.max(0, alpha);
      this.ctx.fillStyle = star.tint;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }
}
