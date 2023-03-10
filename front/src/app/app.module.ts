import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagePreloadDirective } from './directive/img.directive';
import { MovieBoxComponent } from './components/movie-box/movie-box.component';
import { FlagComponent } from './components/flag/flag.component';
import { LanguageFilterComponent } from './components/language-filter/language-filter.component';
import { MoviesService } from './service/movies.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieBoxComponent,
    ImagePreloadDirective,
    FlagComponent,
    LanguageFilterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MoviesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
