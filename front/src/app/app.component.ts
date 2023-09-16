import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './interface/movie';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { MoviesService } from './service/movies.service';
import { FilterType, ReleaseDateFilter } from './service/filter.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public moviesLoaded$: Observable<Movie[]>;
  public showLangFilter = false;
  public movieToShowInModale?: Movie;

  public dateOption = [
    {
      label: 'Tous les films',
      value: ReleaseDateFilter.ALL_MOVIES,
    },
    {
      label: 'Anciens films',
      value: ReleaseDateFilter.OLD_MOVIES,
    },
    {
      label: 'Nouveaux films',
      value: ReleaseDateFilter.NEW_MOVIES,
    },
  ];

  onReleaseDateSelected(unsafeReleaseDateSelected: string) {
    const releaseDateSelected = unsafeReleaseDateSelected as ReleaseDateFilter;
    console.log(releaseDateSelected);
    this.moviesService.setFilter(
      [releaseDateSelected],
      FilterType.RELEASE_DATE,
    );
  }

  constructor(private moviesService: MoviesService) {
    this.moviesLoaded$ = this.moviesService.getMoviesLoaded();
  }

  public openMovieInfoModale($event: any) {
    this.movieToShowInModale = $event as Movie;
  }

  public closeMovieInfoModale() {
    this.movieToShowInModale = undefined;
  }

  ngOnInit(): void {}

  toggleFilter() {
    this.showLangFilter = !this.showLangFilter;
    this.moviesService.resetLangFilter();
  }

  @HostListener('window:scroll', ['Subjectevent'])
  onWindowScroll() {
    let distanceToBottom =
      document.documentElement.offsetHeight -
      (document.documentElement.scrollTop || document.body.scrollTop) -
      window.innerHeight;
    if (distanceToBottom < 800) {
      this.moviesService.loadMoreMovies();
    }
  }
}
