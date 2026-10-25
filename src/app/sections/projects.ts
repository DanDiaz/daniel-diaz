import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../core/reveal';
import { ProjectCard } from './project-card';
import { FOUNDATIONS, PROJECTS } from '../data/projects.data';

@Component({
  selector: 'dd-projects',
  imports: [Reveal, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = PROJECTS;
  protected readonly foundations = FOUNDATIONS;
}
