import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { SKILL_GROUPS } from '../data/skills.data';

@Component({
  selector: 'dd-skills',
  imports: [Reveal],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
}
