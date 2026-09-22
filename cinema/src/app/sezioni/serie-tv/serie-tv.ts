import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';

@Component({
  selector: 'app-serie-tv',
  imports: [RouterLink],
  templateUrl: './serie-tv.html',
  styleUrl: './serie-tv.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SerieTv implements OnInit {
  protected readonly tmdb = inject(Tmdb);

  protected readonly listaSerie = signal<any[]>([]);
  protected readonly generi = signal<any[]>([]);
  protected readonly caricamento = signal(true);
  protected readonly errore = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const [resGeneri, resSerie] = await Promise.all([
        this.tmdb.getGeneriSerie(),
        this.tmdb.getSeriePopolari()
      ]);
      this.generi.set(resGeneri.genres || []);
      this.listaSerie.set(resSerie.results || []);
    } catch {
      this.errore.set('Errore durante il caricamento delle serie TV.');
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
        const res = await this.tmdb.getSeriePopolari();
        this.listaSerie.set(res.results || []);
      } else {
        const res = await this.tmdb.getSeriePerGenere(genreId);
        this.listaSerie.set(res.results || []);
      }
    } catch {
      this.errore.set('Errore durante il filtraggio delle serie TV.');
    } finally {
      this.caricamento.set(false);
    }
  }
}
