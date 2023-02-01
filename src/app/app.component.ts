import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReferralDialogComponent } from './referral-dialog/referral-dialog.component';

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
  referralError = false;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog
  ) {
    this.date = '' + new Date().getFullYear();
    this.setSrcLinksForProd();
   }

   ngOnInit(): void {
    this.auth.setStatus();
  }

  signOut(): void {
    this.auth.signOut();
  }

  triggerAffiliateDialog(): void {
    const dialogRef = this.dialog.open(ReferralDialogComponent, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(success => this.referralError = !success);
  }

  private setSrcLinksForProd(): void {
    if (environment.production) {
      this.logoLink = '/top-king' + this.logoLink;
      this.fbLink = '/top-king' + this.fbLink;
      this.igLink = '/top-king' + this.igLink;
      this.ytLink = '/top-king' + this.ytLink;
      this.ttLink = '/top-king' + this.ttLink;
    }
  }
}
