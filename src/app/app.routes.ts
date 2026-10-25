import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  // Netlify's SPA redirect sends unknown paths here (see netlify.toml / public/_redirects).
  { path: '**', component: NotFound },
];
