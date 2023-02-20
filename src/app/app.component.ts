import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
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
    public auth: LoginService,
    public dialog: MatDialog
  ) {
    this.date = '' + new Date().getFullYear();
   }

  ngOnInit(): void {
    this.auth.setStatus();
  }

  triggerAffiliateDialog(): void {
    const dialogRef = this.dialog.open(ReferralDialogComponent, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(success => this.referralError = !success);
  }

  triggerAccountDialog(): void {
    const dialogRef = this.dialog.open(ReferralDialogComponent, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(success => this.referralError = !success);
  }

}
