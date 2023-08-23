import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/service/movies.service';
import { Movie } from '../../interface/movie';
import { FilterType } from 'src/app/service/filter.type';

@Component({
  selector: 'app-language-filter',
  templateUrl: './language-filter.component.html',
  styleUrls: ['./language-filter.component.scss'],
})
export class LanguageFilterComponent implements OnInit {
  @Input() movies: Movie[] | null = [];

  public availableLanguages: string[] = [];
  public allMovies$: Observable<Movie[]>;

  private filteredLanguages: Set<string> = new Set();

  constructor(private moviesService: MoviesService) {
    this.allMovies$ = this.moviesService.getAllMovies();

    this.allMovies$.subscribe((movies) => {
      this.availableLanguages = Array.from(
        new Set(movies.map((movie) => movie.language)),
      ).filter((l) => l);
    });
  }

  ngOnInit(): void {
    this.moviesService
      .getFilteredLang$()
      .subscribe(
        (langFilter) => (this.filteredLanguages = new Set(langFilter)),
      );
  }

  toggleFilter(lang: string) {
    if (this.filteredLanguages.has(lang)) {
      this.moviesService.deleteFilter(lang, FilterType.LANG);
    } else {
      this.moviesService.addFilter(lang, FilterType.LANG);
    }
  }

  isLangFiltered(lang: string) {
    return this.filteredLanguages.has(lang);
  }
}
