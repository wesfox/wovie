import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent implements OnInit {
  @Input() lang!: string;

  public imgPath!: string;
  public imgAvailable: boolean = true;

  ngOnInit(): void {
    this.imgPath = `assets/images/flags/${this.lang.toLowerCase()}.png`;
    var http = new XMLHttpRequest();

    http.open('HEAD', this.imgPath, false);
    http.send();

    if (http.status == 404) this.imgAvailable = false;
  }
}
