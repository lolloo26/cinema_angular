import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Tmdb } from '../tmdb';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-cerca',
  imports: [UpperCasePipe],
  templateUrl: './cerca.html',
  styleUrl: './cerca.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cerca {
  protected readonly tmdbService = inject(Tmdb);
  
  protected readonly query = signal('');
  protected readonly risultati = signal<any[]>([]);
  protected readonly caricamento = signal(false);

  onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  async avviaRicerca(): Promise<void> {
    const q = this.query().trim();
    if (!q) return;

    this.caricamento.set(true);
    try {
      const res = await this.tmdbService.cercaMulti(q);
      this.risultati.set(res);
    } catch {
      console.error('Errore durante la ricerca');
    } finally {
      this.caricamento.set(false);
    }
  }
}