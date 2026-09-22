import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';

@Component({
  selector: 'app-dettaglio-media',
  imports: [RouterLink],
  templateUrl: './dettaglio-media.html',
  styleUrl: './dettaglio-media.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DettaglioMedia implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly tmdb = inject(Tmdb);

  protected readonly dettaglio = signal<any>(null);
  protected readonly tipo = signal<'film' | 'tv'>('film');
  protected readonly caricamento = signal(true);
  protected readonly errore = signal<string | null>(null);

  protected readonly regista = computed(() => {
    const crew = this.dettaglio()?.credits?.crew;
    return crew?.find((member: any) => member.job === 'Director') || null;
  });

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const isTv = this.route.snapshot.url[0]?.path === 'serie-tv';
    this.tipo.set(isTv ? 'tv' : 'film');

    try {
      if (isTv) {
        this.dettaglio.set(await this.tmdb.getDettaglioSerie(id));
      } else {
        this.dettaglio.set(await this.tmdb.getDettaglioFilm(id));
      }
    } catch {
      this.errore.set('Impossibile caricare i dettagli.');
    } finally {
      this.caricamento.set(false);
    }
  }
}