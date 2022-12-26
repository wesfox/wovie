import { Directive, Input, HostBinding } from '@angular/core';
@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src',
  },
})
export class ImagePreloadDirective {
  @Input() src!: string;
  @Input() default!: string;

  updateUrl() {
    this.src = 'assets/images/default.jpg';
  }
  load() {}
}
