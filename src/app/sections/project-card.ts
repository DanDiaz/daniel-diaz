import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Project, ProjectImage } from '../data/content.model';

/** One featured project card: media on top, summary, highlights, stack. */
@Component({
  selector: 'dd-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<Project>();

  protected readonly image = computed<ProjectImage | null>(() => {
    const media = this.project().media;
    return media.kind === 'image' ? media.image : null;
  });

  protected readonly isChatMock = computed(() => this.project().media.kind === 'chat-mock');

  protected src(base: string, width: 1400 | 800, type: 'webp' | 'jpg'): string {
    return `${base}-${width}.${type}`;
  }
}
