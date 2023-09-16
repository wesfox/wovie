export interface Movie {
  name: string;
  critiquePress: number;
  spectateur: number;
  synopsis: string;
  score: number;
  language: string;
  url: string;
  poster: string;
  date: string;
  sceances: Map<string, number>;
}
