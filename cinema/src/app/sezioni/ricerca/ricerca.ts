import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';

@Component({
  selector: 'app-ricerca',
  imports: [RouterLink],
  templateUrl: './ricerca.html',
  styleUrl: './ricerca.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ricerca {
  protected readonly tmdb = inject(Tmdb);

  protected readonly query = signal('');
  protected readonly risultati = signal<any[]>([]);
  protected readonly caricamento = signal(false);
  protected readonly errore = signal<string | null>(null);
  protected readonly cercato = signal(false);

  // Risultati divisi per categoria tramite computed signal
  protected readonly film = computed(() =>
    this.risultati().filter((item) => item.media_type === 'movie')
  );

  protected readonly serie = computed(() =>
    this.risultati().filter((item) => item.media_type === 'tv')
  );

  protected readonly persone = computed(() =>
    this.risultati().filter((item) => item.media_type === 'person')
  );

  onInput(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }

  async cerca(): Promise<void> {
    const q = this.query().trim();
    if (!q) return;

    this.caricamento.set(true);
    this.errore.set(null);
    this.cercato.set(true);

    try {
      const res = await this.tmdb.cercaMulti(q);
      this.risultati.set(res.results || []);
    } catch {
      this.errore.set('Errore durante la ricerca.');
    } finally {
      this.caricamento.set(false);
    }
  }
}