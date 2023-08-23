import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Movie } from '../interface/movie';
import { Filters, FilterType, ReleaseDateFilter } from './filter.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private URL = environment.dbUrl + '/film_a_voir.json';

  private DEFAULT_FILTERS: Filters = {
    [FilterType.CITY]: ['Paris'],
    [FilterType.LANG]: [],
    [FilterType.RELEASE_DATE]: [ReleaseDateFilter.ALL_MOVIES],
  };

  private _filterSub = new BehaviorSubject<Filters>(this.DEFAULT_FILTERS);

  private moviesFilteredSub = new BehaviorSubject<Movie[]>([]);

  private moviesLoadedSub = new BehaviorSubject<Movie[]>([]);
  private loadedSub = new BehaviorSubject<number>(0);

  private allMovies = new BehaviorSubject<Movie[]>([]);

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get(this.URL)
      .pipe(
        map((moviesToCast) => moviesToCast as Movie[]),
        tap((movies) => {
          this.allMovies.next(movies);
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

    this._filterSub.subscribe((filters) => {
      this.resetLoadedMovies();
      this.moviesFilteredSub.next(
        this.filterMovies(
          this.allMovies.getValue().sort((a, b) => b.score - a.score),
          filters,
        ),
      );
    });

    this.moviesFilteredSub.subscribe(console.log);
  }

  getReleaseDateFilter() {
    return this._filterSub.getValue()[
      FilterType.RELEASE_DATE
    ][0] as ReleaseDateFilter;
  }

  getFilteredLang$(): Observable<string[]> {
    return this._filterSub.asObservable().pipe(map((filter) => filter.LANG));
  }

  getCurrentFilterValue(filterType: FilterType) {
    return this._filterSub.getValue()[filterType];
  }

  setFilter(newFilter: string[], filterType: FilterType) {
    this._filterSub.next({
      ...this._filterSub.getValue(),
      [filterType]: newFilter,
    });
  }

  addFilter(langToAdd: string, filterType: FilterType) {
    this.setFilter(
      this.getCurrentFilterValue(filterType).concat(langToAdd),
      filterType,
    );
  }

  deleteFilter(filterToDelete: string, filterType: FilterType) {
    this.setFilter(
      this.getCurrentFilterValue(filterType).filter(
        (filter) => filter !== filterToDelete,
      ),
      filterType,
    );
  }

  resetLangFilter() {
    this.setFilter([], FilterType.LANG);
  }

  public getAllMovies(): Observable<Movie[]> {
    return this.allMovies.asObservable();
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

  filterByReleaseDate(movie: Movie, filter: ReleaseDateFilter): boolean {
    console.log(filter);
    const currentYear = parseInt(
      movie.date.match(/\d{4}/)![0] || String(new Date().getFullYear()),
    );
    switch (filter) {
      case ReleaseDateFilter.ALL_MOVIES:
        return true;
      case ReleaseDateFilter.NEW_MOVIES:
        return currentYear >= new Date().getFullYear() - 1;
      case ReleaseDateFilter.OLD_MOVIES:
        return currentYear < new Date().getFullYear() - 1;
    }
  }

  private filterMovies(
    movies: Movie[],
    filters: Filters,
    exclude?: FilterType,
  ) {
    return movies.filter(
      (movie) =>
        (filters[FilterType.CITY].some((city) =>
          Object.keys(movie.sceances).includes(city),
        ) ||
          exclude === FilterType.CITY) &&
        (filters[FilterType.LANG].some((lang) => movie.language === lang) ||
          filters[FilterType.LANG].length == 0 ||
          exclude === FilterType.LANG) &&
        this.filterByReleaseDate(movie, this.getReleaseDateFilter()),
    );
  }
}
