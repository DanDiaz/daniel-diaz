import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Starfield } from '../core/starfield';
import { NAV_ITEMS } from '../config/site.config';

@Component({
  selector: 'dd-not-found',
  imports: [RouterLink, Starfield],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected readonly items = NAV_ITEMS;
}
