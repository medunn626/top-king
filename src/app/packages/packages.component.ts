import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';

interface Package {
  id: number,
  title: string,
  descriptions: string[],
  userHasThisPlan: boolean;
}

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  usersCurrentPlan = 0;
  isLoggedIn = false;
  packages: Package[];
  usersPackages: Package[];
  usersNonPackages: Package[];
  
  constructor(
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.setOrUpdatePlans();
  }

  setOrUpdatePlans() {
    this.usersCurrentPlan = +(localStorage.getItem('plan') ?? 0);
    this.populatePackages();
    this.usersPackages = this.packages.filter(p => p.userHasThisPlan);
    this.usersNonPackages = this.packages.filter(p => !p.userHasThisPlan);
  }

  populatePackages() {
    this.packages = [
      {
        id: 1,
        title: 'Bronze Plan',
        descriptions: [
          'New video every week',
          'Access to 10 exclusive videos',
          'Monthly check-ins'
        ],
        userHasThisPlan: this.usersCurrentPlan === 1
      },
      {
        id: 2,
        title: 'Silver Plan',
        descriptions: [
          'New video every week',
          'Access to 50 exclusive videos',
          'Weekly check-ins'
        ],
        userHasThisPlan: this.usersCurrentPlan === 2
      },
      {
        id: 3,
        title: 'Gold Plan',
        descriptions: [
          'Several videos every week',
          'Access to 100 exclusive videos',
          'Daily check-ins'
        ],
        userHasThisPlan: this.usersCurrentPlan === 3
      },
    ]
  }

  purchasePlan(planNumber: number) {
    if (!this.isLoggedIn) {
      localStorage.setItem('intentToPurchasePlan', planNumber + '');
      this.router.navigate(['login']);
    } else if (!!this.usersCurrentPlan) {
      this.confirmSwitchPlans(planNumber);
    } else {
      this.confirmGetPlan(planNumber);
    }
  }

  confirmSwitchPlans(planNumber: number) {
    this.triggerConfirmDialog('switch to', planNumber);
  }

  confirmGetPlan(planNumber: number) {
    this.triggerConfirmDialog('purchase this', planNumber);
  }

  triggerConfirmDialog(specificText: string, planNumber: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.componentInstance.confirmMessage = `Please confirm you would like to ${specificText} this plan`;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('plan', planNumber + '');
        this.setOrUpdatePlans();
      }
    });
  }

}
