import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './interface/movie';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { MoviesService } from './service/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public moviesLoaded$: Observable<Movie[]>;

  constructor(private moviesService: MoviesService) {
    this.moviesLoaded$ = this.moviesService.getMoviesLoaded();
  }

  ngOnInit(): void {}

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
