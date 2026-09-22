import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tmdb } from '../../tmdb';

@Component({
  selector: 'app-persona',
  imports: [RouterLink],
  templateUrl: './persona.html',
  styleUrl: './persona.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Persona implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected readonly tmdb = inject(Tmdb);

  protected readonly info = signal<any>(null);
  protected readonly filmografia = signal<any[]>([]);
  protected readonly caricamento = signal(true);
  protected readonly errore = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    try {
      const [pInfo, pCredits] = await Promise.all([
        this.tmdb.getDettaglioPersona(id),
        this.tmdb.getFilmografiaPersona(id)
      ]);

      this.info.set(pInfo);
      this.filmografia.set(pCredits.cast || []);
    } catch {
      this.errore.set('Impossibile caricare i dati della persona.');
    } finally {
      this.caricamento.set(false);
    }
  }
}