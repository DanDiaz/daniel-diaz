import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { SITE } from '../config/site.config';
import { ABOUT_COPY, SHORT_VERSION } from '../data/profile.data';

@Component({
  selector: 'dd-about',
  imports: [Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly site = SITE;
  protected readonly paragraphs = ABOUT_COPY;
  protected readonly summary = SHORT_VERSION;
}
