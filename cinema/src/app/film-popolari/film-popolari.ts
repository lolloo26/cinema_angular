import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { Tmdb } from '../tmdb';
import { Film } from '../tmdb.model';

@Component({
  selector: 'app-film-popolari',
  imports: [],
  templateUrl: './film-popolari.html',
  styleUrl: './film-popolari.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmPopolari implements OnInit {
  protected readonly tmdbService = inject(Tmdb);
  
  protected readonly filmList = signal<Film[]>([]);
  protected readonly caricamento = signal(true);
  protected readonly errore = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const dati = await this.tmdbService.getFilmPopolari();
      this.filmList.set(dati);
    } catch {
      this.errore.set('Errore durante il caricamento dei film.');
    } finally {
      this.caricamento.set(false);
    }
  }
}