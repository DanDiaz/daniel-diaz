import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { LightboxComponent } from './layout/lightbox';

@Component({
  imports: [RouterOutlet, Header, Footer, LightboxComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    // Progressive enhancement flags: without JS the page still shows
    // everything, and the mobile menu button stays hidden.
    const doc = inject(DOCUMENT);
    const root = doc.documentElement;
    root.classList.add('js');
    if (!doc.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('js-reveal');
    }
  }
}
