import { Routes } from '@angular/router';
import { FilmPopolari } from './film-popolari/film-popolari';
import { Cerca } from './cerca/cerca';

export const routes: Routes = [
  { path: '', component: FilmPopolari },
  { path: 'cerca', component: Cerca },
];