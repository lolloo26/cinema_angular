import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Film, Genere, Persona, SerieTv } from './tmdb.model';

@Injectable({ providedIn: 'root' })
export class Tmdb {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  
  // INSERISCI QUI IL TUO API READ ACCESS TOKEN (v4)
  private readonly accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDI4NmUzZGE1OGQyZjU5NTgxMmJiY2VkNThjODVmMiIsIm5iZiI6MTc5MDA2NTcxNC43Miwic3ViIjoiNmFiMjNjMzIxMDBiMGE4YWQzNjJjODdjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.35LwF1cWJx3Dig5109SQKt1HDITM4P2Ub7KnJqL9t-U';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json;charset=utf-8'
    });
  }

  // Costruisce l'URL completo delle immagini (sezione 4 del PDF)
  getImageUrl(path: string | undefined, size: string = 'w500'): string {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
  }

  // 1. Film Popolari
  async getFilmPopolari(): Promise<Film[]> {
    const res = await firstValueFrom(
      this.http.get<{ results: Film[] }>(`${this.baseUrl}/movie/popular`, { headers: this.headers })
    );
    return res.results;
  }

  // 2. Film per Genere
  async getGeneriFilm(): Promise<Genere[]> {
    const res = await firstValueFrom(
      this.http.get<{ genres: Genere[] }>(`${this.baseUrl}/genre/movie/list`, { headers: this.headers })
    );
    return res.genres;
  }

  async getFilmPerGenere(genreId: number): Promise<Film[]> {
    const res = await firstValueFrom(
      this.http.get<{ results: Film[] }>(`${this.baseUrl}/discover/movie?with_genres=${genreId}`, { headers: this.headers })
    );
    return res.results;
  }

  // 3. Scheda Film
  async getDettaglioFilm(id: number): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/movie/${id}?append_to_response=credits`, { headers: this.headers })
    );
  }

  // 4. Ricerca Unica (multi)
  async cercaMulti(query: string): Promise<any[]> {
    const res = await firstValueFrom(
      this.http.get<{ results: any[] }>(`${this.baseUrl}/search/multi?query=${encodeURIComponent(query)}`, { headers: this.headers })
    );
    return res.results;
  }
}