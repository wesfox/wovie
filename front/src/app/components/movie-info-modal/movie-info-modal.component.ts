import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Movie } from 'src/app/interface/movie';

@Component({
  selector: 'app-movie-info-modal',
  templateUrl: './movie-info-modal.component.html',
  styleUrls: ['./movie-info-modal.component.scss'],
})
export class MovieInfoModalComponent implements OnInit, AfterViewInit {
  @Input() movie!: Movie;
  @Output() closeMovieInfoModale = new EventEmitter<void>();

  wovieScore = 0;
  wovieScoreLabel = '';
  displayed = false;

  ngOnInit(): void {
    console.log(this.movie);

    this.wovieScore =
      Math.round(Math.log10(Math.floor(this.movie.score) + 1) * 10) / 10;
    this.wovieScoreLabel = this.getWovieScoreLabel(this.movie.score);
  }

  ngAfterViewInit(): void {
    this.displayed = true;
  }

  getWovieScoreLabel(score: number) {
    if (this.wovieScore > 5.5) return '💎 Perle rare';
    if (this.wovieScore > 5) return '🤩 Énorme banger';
    if (this.wovieScore > 3.5) return '🔥 À voir';
    if (this.wovieScore > 2.5) return '🤐 Film moyen';
    if (this.wovieScore > 1) return '🤦 Surement à éviter';
    return '💩';
  }

  onCloseModaleClick() {
    this.displayed = false;
    setTimeout(() => this.closeMovieInfoModale.emit(), 300);
  }
}
