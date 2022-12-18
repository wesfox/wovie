import axios from 'axios';

const { data } = await axios.get(
  `https://api.themoviedb.org/3/search/movie?api_key=de31c88f7087492d8a85195026f9f034&query=${encodeURI(
    'Le Chat Potté 2 : la dernière quête',
  )}&page=1&include_adult=true`,
);

console.log(data);
