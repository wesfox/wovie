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
    console.log('ko');
    this.src = 'assets/images/default.jpg';
  }
  load() {
    console.log('ok');
  }
}
