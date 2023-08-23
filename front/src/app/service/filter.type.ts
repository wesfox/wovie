export enum FilterType {
  CITY = 'CITY',
  LANG = 'LANG',
  RELEASE_DATE = 'RELEASE_DATE',
}

export type Filters = {
  [key in FilterType]: string[];
};

export enum ReleaseDateFilter {
  ALL_MOVIES = 'ALL_MOVIES',
  NEW_MOVIES = 'NEW_MOVIES',
  OLD_MOVIES = 'OLD_MOVIES',
}

export const YEAR_IN_MILLIS = 1000 * 60 * 60 * 24 * 365;
