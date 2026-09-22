import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Tmdb {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  
  // Sostituisci con il tuo API Read Access Token (v4)
  private readonly accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDI4NmUzZGE1OGQyZjU5NTgxMmJiY2VkNThjODVmMiIsIm5iZiI6MTc5MDA2NTcxNC43Miwic3ViIjoiNmFiMjNjMzIxMDBiMGE4YWQzNjJjODdjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.35LwF1cWJx3Dig5109SQKt1HDITM4P2Ub7KnJqL9t-U';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json;charset=utf-8'
    });
  }

  // Costruzione URL immagini (sezione 4 del PDF)
  getImageUrl(path: string | null | undefined, size: string = 'w500'): string {
    return path 
      ? `https://image.tmdb.org/t/p/${size}${path}` 
      : 'https://via.placeholder.com/500x750?text=Nessuna+Immagine';
  }

  // --- SEZIONE FILM ---
  getFilmPopolari(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/movie/popular`, { headers: this.headers })
    );
  }

  getGeneriFilm(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/genre/movie/list`, { headers: this.headers })
    );
  }

  getFilmPerGenere(genreId: number): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/discover/movie?with_genres=${genreId}`, { headers: this.headers })
    );
  }

  getDettaglioFilm(id: number): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/movie/${id}?append_to_response=credits`, { headers: this.headers })
    );
  }

  // --- SEZIONE SERIE TV ---
  getSeriePopolari(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/tv/popular`, { headers: this.headers })
    );
  }

  getGeneriSerie(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/genre/tv/list`, { headers: this.headers })
    );
  }

  getSeriePerGenere(genreId: number): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/discover/tv?with_genres=${genreId}`, { headers: this.headers })
    );
  }

  getDettaglioSerie(id: number): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/tv/${id}?append_to_response=credits`, { headers: this.headers })
    );
  }

  // --- SEZIONE PERSONE ---
  getDettaglioPersona(id: number): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/person/${id}`, { headers: this.headers })
    );
  }

  getFilmografiaPersona(id: number): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/person/${id}/combined_credits`, { headers: this.headers })
    );
  }

  // --- RICERCA UNICA ---
  cercaMulti(query: string): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/search/multi?query=${encodeURIComponent(query)}`, { headers: this.headers })
    );
  }
}