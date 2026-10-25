import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { INTERESTS } from '../data/profile.data';

@Component({
  selector: 'dd-interests',
  imports: [Reveal],
  templateUrl: './interests.html',
  styleUrl: './interests.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Interests {
  protected readonly interests = INTERESTS;
}
