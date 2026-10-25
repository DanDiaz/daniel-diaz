import { Directive, ElementRef, OnDestroy, inject, DOCUMENT } from '@angular/core';

/**
 * Fades an element in the first time it scrolls into view.
 *
 * Purely cosmetic: if IntersectionObserver is missing, or the user asked for
 * reduced motion (in which case `html.js-reveal` is never set), the element
 * simply stays visible.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private observer: IntersectionObserver | undefined;

  constructor() {
    const win = this.document.defaultView;
    if (!win || !('IntersectionObserver' in win)) return;
    if (!this.document.documentElement.classList.contains('js-reveal')) return;

    this.element.classList.add('reveal');
    this.observer = new win.IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    this.observer.observe(this.element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
