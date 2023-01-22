import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { Package, PackagesService } from './packages.service';

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
  updatePlanFailed = false;
  
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private packagesService: PackagesService
  ) { }

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('userId');
    this.setOrUpdatePlans();
  }

  setOrUpdatePlans() {
    this.usersCurrentPlan = +(localStorage.getItem('productTier') ?? 0);
    this.populatePackages();
    this.usersPackages = this.packages.filter(p => p.userHasThisPlan);
    this.usersNonPackages = this.packages.filter(p => !p.userHasThisPlan);
  }

  populatePackages() {
    this.packages = [
      {
        id: 1,
        title: 'Beginner',
        descriptions: [
          'New video every week',
          'Access to 10 exclusive videos',
          'Monthly check-ins'
        ],
        userHasThisPlan: this.usersCurrentPlan === 1
      },
      {
        id: 2,
        title: 'Intermediate',
        descriptions: [
          'New video every week',
          'Access to 50 exclusive videos',
          'Weekly check-ins'
        ],
        userHasThisPlan: this.usersCurrentPlan === 2
      },
      {
        id: 3,
        title: 'Elite',
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
      localStorage.setItem('productTierIntendingToPurchase', planNumber + '');
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
        this.packagesService.setPlan(planNumber + '')
        .subscribe(
          (response) => {
            localStorage.setItem('productTier', response.productTier);
            this.setOrUpdatePlans();
          },
          () => this.updatePlanFailed = true
        );
      }
    });
  }

}
