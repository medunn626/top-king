import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'top-king';
  date = '';
  logoLink = '/assets/tko-logo.jpg';
  fbLink = '/assets/fb.png';
  igLink = '/assets/ig.png';
  ytLink = '/assets/yt.png';
  ttLink = '/assets/tt.png';

  constructor(
    public auth: AuthService,
  ) {
    this.date = '' + new Date().getFullYear();
    this.setSrcLinksForProd();
   }

  signOut() {
    this.auth.signOut();
  }

  ngOnInit() {
    this.auth.setStatus();
  }

  private setSrcLinksForProd() {
    if (environment.production) {
      this.logoLink = '/top-king' + this.logoLink;
      this.fbLink = '/top-king' + this.fbLink;
      this.igLink = '/top-king' + this.igLink;
      this.ytLink = '/top-king' + this.ytLink;
      this.ttLink = '/top-king' + this.ttLink;
    }
  }
}
