import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  topImg = '/assets/home1.jpg';
  bottomImg = '/assets/home2.jpg';
  environment = environment;

  constructor(){
    this.setSrcLinksForProd();
  }

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('userId');
  }

  private setSrcLinksForProd() {
    if (environment.production) {
      this.topImg = '/top-king' + this.topImg;
      this.bottomImg = '/top-king' + this.bottomImg;
    }
  }

}
