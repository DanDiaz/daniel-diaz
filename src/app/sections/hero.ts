import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Starfield } from '../core/starfield';
import { PrintButton } from '../layout/print-button';
import { SITE } from '../config/site.config';

@Component({
  selector: 'dd-hero',
  imports: [Starfield, PrintButton],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly site = SITE;
}
