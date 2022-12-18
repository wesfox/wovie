import axios from 'axios';
import fs from 'fs/promises';
import { parse } from 'node-html-parser';
import crypto from 'crypto';
import path from 'path';

const TIMING_BETWEEN_CALL = 100;

function generateFilePath(url, cacheDir) {
  const urlHash = crypto.createHash('md5').update(url).digest('hex');
  return path.resolve(`cache/${cacheDir}/${urlHash}.txt`);
}

export enum TypeOfContent {
  HTML,
  OBJECT,
}

export async function getOrCache(
  url: string,
  cacheDir: string,
  type: TypeOfContent,
) {
  let resultToReturn;
  try {
    const result = await fs.readFile(generateFilePath(url, cacheDir), {
      encoding: 'utf8',
    });
    if (type == TypeOfContent.OBJECT) {
      resultToReturn = JSON.parse(result);
    } else {
      resultToReturn = result;
    }
  } catch (e) {
    await new Promise((resolve) =>
      // protect against ban
      setTimeout(resolve, TIMING_BETWEEN_CALL * (0.5 + Math.random())),
    );
    const result = await axios.get(url, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });
    let fileOutput = '';
    if (type == TypeOfContent.HTML) {
      fileOutput = result.data;
      resultToReturn = result.data;
    }
    if (type == TypeOfContent.OBJECT) {
      fileOutput = JSON.stringify(result.data.results);
      resultToReturn = result.data.results;
    }
    await fs.writeFile(generateFilePath(url, cacheDir), fileOutput, {
      encoding: 'utf-8',
    });
  }

  return resultToReturn;
}

export async function extractNodeFromPage(
  url: string,
  search: string,
  cacheDir: string,
) {
  const result = await getOrCache(url, cacheDir, TypeOfContent.HTML);

  const root = parse(result);

  return root.querySelectorAll(search);
}

export async function extractMultipleNodeFromPage(
  url: string,
  searchs: string[],
  cacheDir: string,
) {
  const result = await getOrCache(url, cacheDir, TypeOfContent.HTML);

  const root = parse(result);

  return searchs.map((localSearch) => root.querySelectorAll(localSearch));
}
