import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';

@Component({
  selector: 'app-film',
  imports: [RouterLink],
  templateUrl: './film.html',
  styleUrl: './film.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Film implements OnInit {
  protected readonly tmdb = inject(Tmdb);

  protected readonly listaFilm = signal<any[]>([]);
  protected readonly generi = signal<any[]>([]);
  protected readonly caricamento = signal(true);
  protected readonly errore = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const [resGeneri, resFilm] = await Promise.all([
        this.tmdb.getGeneriFilm(),
        this.tmdb.getFilmPopolari()
      ]);
      this.generi.set(resGeneri.genres || []);
      this.listaFilm.set(resFilm.results || []);
    } catch {
      this.errore.set('Errore durante il caricamento dei film.');
    } finally {
      this.caricamento.set(false);
    }
  }

  async filtraPerGenere(event: Event): Promise<void> {
    const genreId = Number((event.target as HTMLSelectElement).value);
    this.caricamento.set(true);
    this.errore.set(null);
    try {
      if (genreId === 0) {
        const res = await this.tmdb.getFilmPopolari();
        this.listaFilm.set(res.results || []);
      } else {
        const res = await this.tmdb.getFilmPerGenere(genreId);
        this.listaFilm.set(res.results || []);
      }
    } catch {
      this.errore.set('Errore durante il filtraggio dei film.');
    } finally {
      this.caricamento.set(false);
    }
  }
}