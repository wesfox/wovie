import fs from 'fs';
import { movieDatabase } from './movies.js';
import {
  extractMultipleNodeFromPage,
  getOrCache,
  TypeOfContent,
} from './utils.js';

interface Movie {
  name: string;
  url: string;
  id: string;
  sceances: Map<string, string>;
  critiquePress?: number;
  spectateur?: number;
  date?: string;
  timestamp?: number;
  score: number;
  language?: string;
  poster?: string;
}
const movies = movieDatabase as Movie[];

function scoreMovie(movie: Movie) {
  let safeDate =
    (new Date().getTime() - movie.timestamp) / 1000 / 3600 / 24 / 365;
  safeDate = safeDate > 50 ? safeDate : 50;
  const yearsBetweenScore = Math.pow(safeDate / 10 + 1, 4);
  let pressScore =
    movie.critiquePress > 3.5
      ? Math.pow(4.5 * (movie.critiquePress - 3), 2)
      : Math.pow(movie.critiquePress / 3.5, 5);
  let spectatorScore =
    movie.spectateur > 3.5
      ? Math.pow(2 * (movie.spectateur - 3), 2)
      : Math.pow(movie.spectateur / 3.5, 5);
  pressScore = pressScore ? pressScore : 1;
  spectatorScore = spectatorScore ? spectatorScore : 1;
  return yearsBetweenScore * pressScore * spectatorScore;
}

async function getTmdbData(title: string, year: string) {
  let data = await getOrCache(
    `https://api.themoviedb.org/3/search/movie?api_key=de31c88f7087492d8a85195026f9f034&query=${encodeURI(
      title,
    )}&year=${year}&page=1&include_adult=true`,
    'tmdb',
    TypeOfContent.OBJECT,
  );
  if (data?.length == 0) {
    data = await getOrCache(
      `https://api.themoviedb.org/3/search/movie?api_key=de31c88f7087492d8a85195026f9f034&query=${encodeURI(
        title,
      )}&page=1&include_adult=true`,
      'tmdb',
      TypeOfContent.OBJECT,
    );
  }
  let tmdbAllData = data;
  if (tmdbAllData === undefined || tmdbAllData.length == 0) {
    console.log(title + ' has no results');
    return {};
  }
  if (tmdbAllData.length > 1) {
    tmdbAllData = tmdbAllData.filter(
      (movie) => movie?.original_title == title || movie?.title == title,
    );
    if (tmdbAllData.length > 1) {
      console.log(
        title + ' has multiple results : ' + JSON.stringify(tmdbAllData),
      );
      tmdbAllData = [data[0]];
    }
    if (tmdbAllData.length == 0) {
      // console.log(
      //   title + ' has no results after filtering : ' + JSON.stringify(data),
      // );
      tmdbAllData = [data[0]];
    }
  }
  return {
    language: tmdbAllData[0].original_language,
    poster: `https://image.tmdb.org/t/p/w500/${tmdbAllData[0].poster_path}`,
  };
}

const parisMovies = movies; //.filter((movie) => movie.name == 'Samouraï Academy');

let index = 0;
for (const movie of parisMovies) {
  console.log(
    `Analysing movie ${movie.name} :  ${index + 1} over ${parisMovies.length}`,
  );
  const noteNodes = await extractMultipleNodeFromPage(
    `https://www.allocine.fr/film/fichefilm_gen_cfilm=${movie.id}.html`,
    ['.stareval-note', '.meta-body-item > .date'],
    'fiche-film',
  );
  const castedNoteNodes = noteNodes[0].map((noteNode) =>
    Number(noteNode.innerHTML.replace(',', '.')),
  );
  const oldMovie = { ...parisMovies[index] };
  const fullDate = noteNodes[1][0].innerHTML.trim();
  const year = fullDate.replace(/.+([\d]{4})$/, '$1');
  parisMovies[index] = {
    ...oldMovie,
    critiquePress: castedNoteNodes[0],
    spectateur: castedNoteNodes[1],
    timestamp: Date.parse(
      noteNodes[1][0].innerHTML
        .trim()
        .replace('janvier', 'january')
        .replace('février', 'february')
        .replace('mars', 'march')
        .replace('avril', 'april')
        .replace('mai', 'may')
        .replace('juin', 'june')
        .replace('juillet', 'july')
        .replace('aout', 'august')
        .replace('septembre', 'september')
        .replace('octobre', 'october')
        .replace('novembre', 'november')
        .replace('décembre', 'december'),
    ),
    date: fullDate,
    ...(await getTmdbData(oldMovie.name, year)),
  };
  parisMovies[index].score = scoreMovie(parisMovies[index]);
  index++;
}

parisMovies.sort((a, b) => scoreMovie(b) - scoreMovie(a));

const output = parisMovies.map((movie) => ({
  name: movie.name,
  critiquePress: movie.critiquePress,
  spectateur: movie.spectateur,
  date: movie.date,
  score: movie.score,
  language: movie.language,
  url: `https://www.allocine.fr/seance/film-${movie.id}/pres-de-115755/`,
  poster: movie.poster,
  sceances: movie.sceances,
}));

fs.writeFileSync('film_a_voir.json', JSON.stringify(output, undefined, 4));
