import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.page.html',
  styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {
  username: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || '';
  }
}
