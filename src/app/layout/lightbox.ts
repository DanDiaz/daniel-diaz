import { ChangeDetectionStrategy, Component, ElementRef, HostListener, effect, inject } from '@angular/core';
import { Lightbox } from '../core/lightbox';

@Component({
  selector: 'dd-lightbox',
  imports: [],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxComponent {
  protected readonly lightbox = inject(Lightbox);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    // Move focus into the dialog when it opens; Escape returns it to the tile
    // because focus was never taken away from the gallery otherwise.
    effect(() => {
      if (!this.lightbox.isOpen()) return;
      setTimeout(() => host.querySelector<HTMLButtonElement>('.lb-close')?.focus(), 0);
    });
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.lightbox.handleKey('Escape')) {
      event.preventDefault();
      document.getElementById('gallery')?.focus();
      return;
    }
    if (event.key === 'ArrowRight') this.lightbox.next();
    if (event.key === 'ArrowLeft') this.lightbox.previous();
  }
}
