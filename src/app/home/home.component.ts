import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  topImg = '/assets/home1.jpg';
  bottomImg = '/assets/home2.jpg';

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('userId');
  }

}
