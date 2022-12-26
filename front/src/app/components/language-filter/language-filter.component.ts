import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterType, MoviesService } from 'src/app/service/movies.service';
import { Movie } from '../../interface/movie';

@Component({
  selector: 'app-language-filter',
  templateUrl: './language-filter.component.html',
  styleUrls: ['./language-filter.component.scss'],
})
export class LanguageFilterComponent implements OnInit {
  @Input() movies: Movie[] | null = [];

  public availableLanguages: string[] = [];
  public moviesFiltered$: Observable<Movie[]>;

  private filteredLanguages: Set<string> = new Set();

  constructor(private moviesService: MoviesService) {
    this.moviesFiltered$ = this.moviesService.getMoviesFilteredBut(
      FilterType.LANG,
    );

    this.moviesFiltered$.subscribe((movies) => {
      this.availableLanguages = Array.from(
        new Set(movies.map((movie) => movie.language)),
      ).filter((l) => l);
    });
  }

  ngOnInit(): void {
    this.moviesFiltered$.subscribe((movies) => {
      this.availableLanguages = Array.from(
        new Set(movies.map((movie) => movie.language)),
      ).filter((l) => l);
    });
  }

  toggleFilter(lang: string) {
    if (this.filteredLanguages.has(lang)) {
      this.filteredLanguages.delete(lang);
    } else {
      this.filteredLanguages.add(lang);
    }
    this.moviesService.filterByLang(Array.from(this.filteredLanguages));
  }

  isLangFiltered(lang: string) {
    return this.filteredLanguages.has(lang);
  }
}
