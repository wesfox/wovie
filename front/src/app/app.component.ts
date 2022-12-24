import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './interface/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private URL = '../assets/film_a_voir.json';

  public movies: Movie[] = [];

  private allMovies: Movie[] = [];
  private loaded = 20;

  loadMovies = () => {
    this.movies = this.allMovies
      .filter((movie) => Object.keys(movie.sceances).includes('Paris'))
      .sort((a, b) => b.score - a.score)
      .slice(0, this.loaded);
  };

  constructor(private httpClient: HttpClient) {
    httpClient.get(this.URL).subscribe((movies) => {
      this.allMovies = movies as Movie[];
      this.loadMovies();
    });
  }

  ngOnInit() {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let distanceToBottom =
      document.documentElement.offsetHeight -
      (document.documentElement.scrollTop || document.body.scrollTop) -
      window.innerHeight;
    if (distanceToBottom < 800) {
      this.loaded += 20;
      this.loadMovies();
      console.log(document.documentElement.offsetHeight);
    }
  }
}
