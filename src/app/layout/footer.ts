import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../config/site.config';

@Component({
  selector: 'dd-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
