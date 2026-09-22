export interface Film {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export interface SerieTv {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export interface Genere {
  id: number;
  name: string;
}

export interface Persona {
  id: number;
  name: string;
  biography?: string;
  profile_path?: string;
}