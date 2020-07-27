export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  cast?: Cast[];
  favorite?: boolean;
}

export interface Cast {
  id: number;
  name: string;
}
