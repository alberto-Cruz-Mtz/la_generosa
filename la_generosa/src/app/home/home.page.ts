import { Component } from '@angular/core';
import { info } from './info';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  verduras = info;
  count = 0;
  constructor() {}

  incrementCount(num: number) {
    this.count += num;
    this.count = parseFloat(this.count.toFixed(2));
  }
}
