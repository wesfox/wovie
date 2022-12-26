import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interface/movie';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.scss'],
})
export class MovieBoxComponent implements OnInit {
  @Input() movie?: Movie = undefined;

  public criticsRating!: string;
  public publicRating!: string;
  public year!: string;

  ngOnInit() {
    if (this.movie) {
      this.criticsRating = this.movie.critiquePress?.toFixed(1) || '???';
      this.publicRating = this.movie.spectateur?.toFixed(1) || '???';
      this.year = this.movie.date?.slice(-4) || '????';
    }
  }
}
