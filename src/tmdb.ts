import axios from 'axios';
import fs from 'fs';

const { data } = await axios.get(
  'https://api.themoviedb.org/3/movie/now_playing?region=FR&page=1&api_key=de31c88f7087492d8a85195026f9f034',
);

const all_movies = data;

for (let pageNumber = 2; pageNumber <= all_movies.total_pages; pageNumber++) {
  console.log(`Page ${pageNumber} fetched over ${all_movies.total_pages}`);

  let newPage;
  try {
    newPage = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?region=FR&page=${pageNumber}&api_key=de31c88f7087492d8a85195026f9f034`,
    );
  } catch (e) {
    console.log(e);
  }

  all_movies.results.push(...newPage.data.results);

  await new Promise((resolve) => setTimeout(resolve, 2000));
}

console.log(all_movies);

fs.writeFileSync('all_movies.json', JSON.stringify(all_movies, undefined, 4));
