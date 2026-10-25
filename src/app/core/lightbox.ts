import { Injectable, computed, inject, signal, DOCUMENT } from '@angular/core';
import { Photo } from '../data/content.model';

/**
 * Holds which photograph the lightbox is showing. Sections ask it to open;
 * the <dd-lightbox /> component in the shell renders it.
 */
@Injectable({ providedIn: 'root' })
export class Lightbox {
  private readonly document = inject(DOCUMENT);
  private readonly photos = signal<readonly Photo[]>([]);
  private readonly position = signal<number | null>(null);

  readonly isOpen = computed(() => this.position() !== null);
  readonly photo = computed(() => {
    const index = this.position();
    const list = this.photos();
    return index === null ? null : (list[index] ?? null);
  });
  readonly count = computed(() => this.photos().length);

  open(list: readonly Photo[], startAt: number): void {
    if (!list.length) return;
    this.photos.set(list);
    this.position.set(((startAt % list.length) + list.length) % list.length);
    this.lockScroll(true);
  }

  close(): void {
    if (this.position() === null) return;
    this.position.set(null);
    this.lockScroll(false);
  }

  next(): void {
    this.step(1);
  }

  previous(): void {
    this.step(-1);
  }

  /** Arrow-key navigation while the dialog is open. */
  handleKey(key: string): boolean {
    if (this.position() === null) return false;
    switch (key) {
      case 'Escape':
        this.close();
        return true;
      case 'ArrowRight':
        this.step(1);
        return true;
      case 'ArrowLeft':
        this.step(-1);
        return true;
      default:
        return false;
    }
  }

  private step(delta: number): void {
    const total = this.photos().length;
    const index = this.position();
    if (index === null || total === 0) return;
    this.position.set((index + delta + total) % total);
  }

  private lockScroll(locked: boolean): void {
    const win = this.document.defaultView;
    if (!win) return;
    win.document.body.style.overflow = locked ? 'hidden' : '';
  }
}
