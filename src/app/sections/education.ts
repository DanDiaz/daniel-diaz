import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { EDUCATION } from '../data/profile.data';

@Component({
  selector: 'dd-education',
  imports: [Reveal],
  templateUrl: './education.html',
  styleUrl: './education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  protected readonly entries = EDUCATION;
}
