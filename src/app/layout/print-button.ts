import { ChangeDetectionStrategy, Component, inject, DOCUMENT } from '@angular/core';

/**
 * This page is also the resume: the print stylesheet in styles.scss turns it
 * into a clean one-page PDF. Both calls to it live in the hero and Contact.
 */
@Component({
  selector: 'dd-print-button',
  imports: [],
  template: `
    <button class="btn btn--ghost" type="button" (click)="print()">
      Save résumé (PDF)
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintButton {
  private readonly document = inject(DOCUMENT);

  protected print(): void {
    this.document.defaultView?.print();
  }
}
