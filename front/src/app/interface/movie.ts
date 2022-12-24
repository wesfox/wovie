export interface Movie {
  name: string;
  critiquePress: number;
  spectateur: number;
  score: number;
  language: string;
  url: string;
  poster: string;
  date: string;
  sceances: Map<string, number>;
}
