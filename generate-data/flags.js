import fs from 'fs';
import axios from 'axios';
import path from 'node:path';

// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (fileUrl, filepath) => {
  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(filepath);
  try {
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
    });

    const w = response.data.pipe(fs.createWriteStream(localFilePath));
    w.on('finish', () => {
      console.log('Successfully downloaded file!');
    });
  } catch (err) {
    throw new Error(err);
  }
};

const flags = {
  en: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/English_language.svg/45px-English_language.svg.png',
  aa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Djibouti.svg/45px-Flag_of_Djibouti.svg.png',
  af: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_South_Africa_%281928%E2%80%931994%29.svg/45px-Flag_of_South_Africa_%281928%E2%80%931994%29.svg.png',
  sq: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/45px-Flag_of_Albania.svg.png',
  am: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/45px-Flag_of_Ethiopia.svg.png',
  ar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Flag_of_the_Arab_League.svg/45px-Flag_of_the_Arab_League.svg.png',
  su: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Flag_of_the_Arab_League.svg/45px-Flag_of_the_Arab_League.svg.png',
  hy: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/45px-Flag_of_Armenia.svg.png',
  ay: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Bolivia_%28state%29.svg/45px-Flag_of_Bolivia_%28state%29.svg.png',
  az: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/45px-Flag_of_Azerbaijan.svg.png',
  ba: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Flag_of_Bashkortostan.svg/45px-Flag_of_Bashkortostan.svg.png',
  eu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Flag_of_the_Basque_Country.svg/45px-Flag_of_the_Basque_Country.svg.png',
  bn: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/45px-Flag_of_Bangladesh.svg.png',
  bi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Vanuatu.svg/45px-Flag_of_Vanuatu.svg.png',
  br: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Flag_of_Brittany.svg/45px-Flag_of_Brittany.svg.png',
  bg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/45px-Flag_of_Bulgaria.svg.png',
  my: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/45px-Flag_of_Myanmar.svg.png',
  ca: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/45px-Flag_of_Catalonia.svg.png',
  zh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/45px-Flag_of_the_People%27s_Republic_of_China.svg.png',
  cn: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/45px-Flag_of_the_People%27s_Republic_of_China.svg.png',
  co: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Flag_of_Corsica.svg/45px-Flag_of_Corsica.svg.png',
  cs: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/45px-Flag_of_the_Czech_Republic.svg.png',
  da: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/45px-Flag_of_Denmark.svg.png',
  nl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/45px-Flag_of_the_Netherlands.svg.png',
  eo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Esperanto.svg/45px-Flag_of_Esperanto.svg.png',
  et: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Estonia.svg/45px-Flag_of_Estonia.svg.png',
  fi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/45px-Flag_of_Finland.svg.png',
  fr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/45px-Flag_of_France.svg.png',
  gl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Galicia.svg/45px-Flag_of_Galicia.svg.png',
  ka: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/45px-Flag_of_Georgia.svg.png',
  de: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/45px-Flag_of_Germany.svg.png',
  el: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/45px-Flag_of_Greece.svg.png',
  kl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_Greenland.svg/45px-Flag_of_Greenland.svg.png',
  gu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/45px-Flag_of_India.svg.png',
  iw: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/45px-Flag_of_Israel.svg.png',
  hi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/45px-Flag_of_India.svg.png',
  ta: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/45px-Flag_of_India.svg.png',
  hu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/45px-Flag_of_Hungary.svg.png',
  is: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/45px-Flag_of_Iceland.svg.png',
  in: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/45px-Flag_of_Indonesia.svg.png',
  ia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Flag_of_Interlingua.svg/45px-Flag_of_Interlingua.svg.png',
  ie: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Interlingue.svg/45px-Flag_of_Interlingue.svg.png',
  ga: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/45px-Flag_of_Ireland.svg.png',
  it: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/45px-Flag_of_Italy.svg.png',
  ja: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/45px-Flag_of_Japan.svg.png',
  kn: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Flag_of_the_Kannada_people.svg/45px-Flag_of_the_Kannada_people.svg.png',
  kk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/45px-Flag_of_Kazakhstan.svg.png',
  ko: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/45px-Flag_of_South_Korea.svg.png',
  la: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Flag_of_Rome.svg/45px-Flag_of_Rome.svg.png',
  lv: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/45px-Flag_of_Latvia.svg.png',
  ln: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/45px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
  lt: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/45px-Flag_of_Lithuania.svg.png',
  mk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_North_Macedonia.svg/45px-Flag_of_North_Macedonia.svg.png',
  mg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Madagascar.svg/45px-Flag_of_Madagascar.svg.png',
  ms: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/45px-Flag_of_Malaysia.svg.png',
  ml: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Malayali_flag.svg/45px-Malayali_flag.svg.png',
  mt: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/45px-Flag_of_Malta.svg.png',
  mi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/45px-Flag_of_New_Zealand.svg.png',
  mr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/45px-Flag_of_India.svg.png',
  mn: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/45px-Flag_of_Mongolia.svg.png',
  ne: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/20px-Flag_of_Nepal.svg.png',
  oc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Flag_of_Occitania_%28with_star%29.svg/45px-Flag_of_Occitania_%28with_star%29.svg.png',
  fa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/45px-Flag_of_Iran.svg.png',
  pl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/45px-Flag_of_Poland.svg.png',
  pt: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Portuguese_language_%28PT-BR%29.svg/45px-Flag_of_Portuguese_language_%28PT-BR%29.svg.png',
  qu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Quechuas_flag.svg/45px-Quechuas_flag.svg.png',
  ro: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/45px-Flag_of_Romania.svg.png',
  ru: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/45px-Flag_of_Russia.svg.png',
  sm: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Samoa.svg/45px-Flag_of_Samoa.svg.png',
  sd: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_Sindh.svg/45px-Flag_of_Sindh.svg.png',
  sk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/45px-Flag_of_Slovakia.svg.png',
  so: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Somalia.svg/45px-Flag_of_Somalia.svg.png',
  es: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Spanish_language_%28ES-MX%29.svg/45px-Flag_of_Spanish_language_%28ES-MX%29.svg.png',
  sw: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/45px-Flag_of_Kenya.svg.png',
  sv: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/45px-Flag_of_Sweden.svg.png',
  tl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/45px-Flag_of_the_Philippines.svg.png',
  tg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/45px-Flag_of_Tajikistan.svg.png',
  tt: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_Tatarstan.svg/45px-Flag_of_Tatarstan.svg.png',
  th: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/45px-Flag_of_Thailand.svg.png',
  bo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flag_of_Tibet.svg/45px-Flag_of_Tibet.svg.png',
  ti: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_Eritrea.svg/45px-Flag_of_Eritrea.svg.png',
  tr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/45px-Flag_of_Turkey.svg.png',
  tk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Turkmenistan.svg/45px-Flag_of_Turkmenistan.svg.png',
  uk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/45px-Flag_of_Ukraine.svg.png',
  ur: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/45px-Flag_of_Pakistan.svg.png',
  uz: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/45px-Flag_of_Uzbekistan.svg.png',
  vi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/45px-Flag_of_Vietnam.svg.png',
  cy: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Wales.svg/45px-Flag_of_Wales.svg.png',
  wo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/45px-Flag_of_Senegal.svg.png',
  yo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/45px-Flag_of_Nigeria.svg.png',
  zu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Flag_of_the_KwaZulu-Natal_Province.png/45px-Flag_of_the_KwaZulu-Natal_Province.png',
};

Object.entries(flags).forEach(async (kv) => {
  const imgRes = await downloadFile(kv[1], `flags/${kv[0]}.png`);
});
