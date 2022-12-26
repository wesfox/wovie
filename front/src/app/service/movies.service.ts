import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Movie } from '../interface/movie';

export enum FilterType {
  CITY = 'CITY',
  LANG = 'LANG',
}

type Filters = {
  [key in FilterType]: string[];
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private URL = '../assets/film_a_voir.json';

  private DEFAULT_FILTERS: Filters = {
    [FilterType.CITY]: ['Paris'],
    [FilterType.LANG]: [],
  };

  private moviesFilteredSub = new BehaviorSubject<Movie[]>([]);

  private moviesLoadedSub = new BehaviorSubject<Movie[]>([]);
  private loadedSub = new BehaviorSubject<number>(0);

  private allMovies: Movie[] = [];

  private filters: Filters = this.DEFAULT_FILTERS;

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get(this.URL)
      .pipe(
        map((moviesToCast) => moviesToCast as Movie[]),
        tap((movies) => {
          this.allMovies = movies;
          this.moviesFilteredSub.next(movies.sort((a, b) => b.score - a.score));
        }),
      )
      .subscribe();

    this.moviesFilteredSub.subscribe(() => {
      this.loadedSub.next(20);
    });

    this.loadedSub.subscribe((loaded) => {
      console.log('loadedSub');
      this.moviesLoadedSub.next(
        this.moviesFilteredSub.getValue().slice(0, loaded),
      );
    });

    this.moviesFilteredSub.subscribe(console.log);
  }

  getMoviesFilteredBut(filterToExclude: FilterType) {
    return this.moviesFilteredSub.pipe(
      map((movies) => this.filterMovies(movies, filterToExclude)),
      tap(console.log),
    );
  }

  public getMoviesFiltered() {
    return this.moviesFilteredSub.pipe(
      map((movies) => this.filterMovies(movies)),
      tap(console.log),
    );
  }

  public getMoviesLoaded() {
    return this.moviesLoadedSub.asObservable();
  }

  public loadMoreMovies() {
    this.loadedSub.next(this.loadedSub.getValue() + 20);
  }

  public resetLoadedMovies() {
    this.loadedSub.next(20);
  }

  public filterByLang(langs: string[]) {
    this.filters[FilterType.LANG] = langs;
    this.resetLoadedMovies();
    this.moviesFilteredSub.next(
      this.filterMovies(this.allMovies.sort((a, b) => b.score - a.score)),
    );
  }

  private filterMovies(movies: Movie[], exclude?: FilterType) {
    return movies.filter(
      (movie) =>
        (this.filters[FilterType.CITY].some((city) =>
          Object.keys(movie.sceances).includes(city),
        ) ||
          exclude === FilterType.CITY) &&
        (this.filters[FilterType.LANG].some(
          (lang) => movie.language === lang,
        ) ||
          this.filters[FilterType.LANG].length == 0 ||
          exclude === FilterType.LANG),
    );
  }
}
