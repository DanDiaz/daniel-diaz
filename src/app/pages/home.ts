import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from '../sections/hero';
import { About } from '../sections/about';
import { Experience } from '../sections/experience';
import { Projects } from '../sections/projects';
import { Skills } from '../sections/skills';
import { AstroGallery } from '../sections/astro-gallery';
import { Interests } from '../sections/interests';
import { Education } from '../sections/education';
import { Contact } from '../sections/contact';

@Component({
  selector: 'dd-home',
  imports: [Hero, About, Experience, Projects, Skills, AstroGallery, Interests, Education, Contact],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
