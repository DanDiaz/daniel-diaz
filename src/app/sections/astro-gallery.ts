import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Lightbox } from '../core/lightbox';
import { Reveal } from '../core/reveal';
import { SITE } from '../config/site.config';
import { PHOTOS } from '../data/photos.data';

@Component({
  selector: 'dd-astro-gallery',
  imports: [Reveal],
  templateUrl: './astro-gallery.html',
  styleUrl: './astro-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstroGallery {
  protected readonly site = SITE;
  protected readonly photos = PHOTOS;
  private readonly lightbox = inject(Lightbox);

  protected open(index: number): void {
    this.lightbox.open(this.photos, index);
  }
}
