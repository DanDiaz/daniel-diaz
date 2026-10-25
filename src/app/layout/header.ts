import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  DOCUMENT,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NAV_ITEMS, SITE } from '../config/site.config';

@Component({
  selector: 'dd-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly items = NAV_ITEMS;
  protected readonly brand = SITE.name;

  protected readonly menuOpen = signal(false);
  protected readonly stuck = signal(false);
  protected readonly current = signal<string | null>(null);

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private observer?: IntersectionObserver;
  private readonly ratios = new Map<string, number>();

  constructor() {
    const router = inject(Router);
    // Sections are created by the router outlet, so (re)attach the observer
    // after every navigation rather than once at component construction.
    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.observeSections());
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  protected onScroll(): void {
    this.stuck.set((this.document.defaultView?.scrollY ?? 0) > 8);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected onMenuKey(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      this.document.getElementById('navToggle')?.focus();
    }
  }

  private observeSections(): void {
    const win = this.document.defaultView;
    if (!win || !('IntersectionObserver' in win)) return;

    const targets = this.items
      .map((item) => this.document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    this.observer?.disconnect();
    this.ratios.clear();
    this.observer = new win.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          this.ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of this.ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) this.current.set(best);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] },
    );

    targets.forEach((target) => this.observer?.observe(target));
  }
}
