import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrintButton } from '../layout/print-button';
import { SITE } from '../config/site.config';

@Component({
  selector: 'dd-contact',
  imports: [PrintButton],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly site = SITE;

  protected readonly channels = [
    { key: 'Email', value: SITE.email, href: 'mailto:' + SITE.email },
    { key: 'LinkedIn', value: SITE.links.linkedinLabel, href: SITE.links.linkedin },
    { key: 'Based in', value: SITE.location, href: null },
  ];
}
