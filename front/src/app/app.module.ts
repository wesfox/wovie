import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagePreloadDirective } from './directive/img.directive';
import { MovieBoxComponent } from './movie-box/movie-box.component';

@NgModule({
  declarations: [AppComponent, MovieBoxComponent, ImagePreloadDirective],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
