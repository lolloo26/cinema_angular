import { Routes } from '@angular/router';
import { Film } from './sezioni/film/film';
import { SerieTv } from './sezioni/serie-tv/serie-tv';
import { DettaglioMedia } from './sezioni/dettaglio-media/dettaglio-media';
import { Persona } from './sezioni/persona/persona';
import { Ricerca } from './sezioni/ricerca/ricerca';

export const routes: Routes = [
  { path: '', redirectTo: 'film', pathMatch: 'full' },
  { path: 'film', component: Film },
  { path: 'film/:id', component: DettaglioMedia },
  { path: 'serie-tv', component: SerieTv },
  { path: 'serie-tv/:id', component: DettaglioMedia },
  { path: 'persona/:id', component: Persona },
  { path: 'ricerca', component: Ricerca },
];