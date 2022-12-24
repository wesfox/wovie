import fs from 'fs';
import { extractNodeFromPage } from './utils.js';

async function getMovieSceances(id: string) {
  console.log(`Fetching movie sceance for movie ${id}`);
  const allSceancesNodes = await extractNodeFromPage(
    `https://www.allocine.fr/seance/film-${id}/`,
    '.mdl-more-item.js-set-localization',
    'geo-sceance',
  );
  return new Map(
    allSceancesNodes.map((sceanceNode) => [
      sceanceNode.attrs.title,
      JSON.parse(sceanceNode.attrs['data-localization'])['id'],
    ]),
  );
}

async function getOnAirMoviePage(page: number) {
  console.log(`Fetching on air movies page ${page}`);
  const allTitleNodes = await extractNodeFromPage(
    `https://www.allocine.fr/film/aucinema/?page=${page}`,
    'h2.meta-title > .meta-title-link',
    'au-cinema',
  );

  const extractIdFromTitleUrl = (titleNode) =>
    titleNode.attrs['href'].replace(
      /\/film\/fichefilm_gen_cfilm=(\d+)\.html/gm,
      `$1`,
    );
  const byPageOnAirMovies = [];
  for (const titleNode of allTitleNodes) {
    const sceances = await getMovieSceances(extractIdFromTitleUrl(titleNode));
    byPageOnAirMovies.push({
      name: titleNode.innerHTML.replace('&#039;', "'"),
      url: titleNode.attrs['href'],
      id: extractIdFromTitleUrl(titleNode),
      sceances: Object.fromEntries(sceances),
    });
  }
  return byPageOnAirMovies;
}

const TOTAL_PAGES = 14;

const allOnAirMovies = [];

for (let pageNumber = 1; pageNumber <= TOTAL_PAGES; pageNumber++) {
  console.log(`Page ${pageNumber} fetched over ${TOTAL_PAGES}`);

  allOnAirMovies.push(...(await getOnAirMoviePage(pageNumber)));
}

console.log(allOnAirMovies);

fs.writeFileSync(
  'all_movies.json',
  JSON.stringify(allOnAirMovies, undefined, 4),
);

fs.writeFileSync(
  'build/movies.js',
  `/** @type {{
    name: string;
    url: string;
    id: string;
    sceance: Map<string, string>;
  }} */

  export const movieDatabase = ` + JSON.stringify(allOnAirMovies, undefined, 4),
);
