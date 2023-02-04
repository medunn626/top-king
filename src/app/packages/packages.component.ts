import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { ConsultingFormDialog } from './consulting-form-dialog/consulting-form-dialog.component';
import { PackagesService } from './packages.service';

export interface Package {
  id: number,
  title: string,
  descriptions: string[],
  price: number;
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
  usersPackage: Package | undefined;
  usersNonPackages: Package[];
  updatePlanFailed = false;
  
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private packagesService: PackagesService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userId');
    this.setOrUpdatePlans();
  }

  setOrUpdatePlans(): void {
    this.usersCurrentPlan = +(localStorage.getItem('productTier') ?? 0);
    this.populatePackages();
    this.usersPackage = this.packages.find(p => p.userHasThisPlan);
    this.usersNonPackages = this.packages.filter(p => !p.userHasThisPlan);
  }

  populatePackages(): void {
    this.packages = [
      {
        id: 1,
        title: 'Beginner',
        descriptions: [
          'This program will provide world renown introduction fitness exercises to help incorporate ' +
          'into your daily exercises including free weights & calisthenics!!'
        ],
        price: 49.99,
        userHasThisPlan: this.usersCurrentPlan === 1
      },
      {
        id: 2,
        title: 'Intermediate',
        descriptions: [
          'This program includes muscle and strength training exercises to take basic training to next level with machines and much more!!'
        ],
        price: 100,
        userHasThisPlan: this.usersCurrentPlan === 2
      },
      {
        id: 3,
        title: 'Elite',
        descriptions: [
          'Unlimited videos for LIFE!!',
          'Diet tips & hacks!',
          'Cutting program for people who want to get cut or lose weight!',
          'Also includes all of the above plans incorporating supersets, drop sets, different innovative exercises to hit the muscle from different angles and many more!!'
        ],
        price: 150,
        userHasThisPlan: this.usersCurrentPlan === 3
      },
    ]
  }

  determineSwitchPriceText(newPrice: number): string {
    if (this.usersPackage) {
      const currentPrice = this.usersPackage.price;
      if (currentPrice < newPrice) {
        const calculatedPrice = newPrice - currentPrice;
        const roundedPrice = Math.round(calculatedPrice);
        return 'Switch for $' + roundedPrice + '/month'
      } else {
        const calculatedPrice = currentPrice - newPrice;
        const roundedPrice = Math.round(calculatedPrice);
        return 'Save $' + roundedPrice + '/month';
      }
    }
    return 'Switch';
  }

  purchasePlan(planNumber: number): void {
    if (!this.isLoggedIn) {
      localStorage.setItem('productTierIntendingToPurchase', planNumber + '');
      this.router.navigate(['login']);
    } else if (!!this.usersCurrentPlan) {
      this.confirmSwitchPlans(planNumber);
    } else {
      this.confirmGetPlan(planNumber);
    }
  }

  confirmSwitchPlans(planNumber: number): void {
    this.triggerConfirmPlanDialog('switch to', planNumber);
  }

  confirmGetPlan(planNumber: number): void {
    this.triggerConfirmPlanDialog('purchase this', planNumber);
  }

  triggerConfirmPlanDialog(specificText: string, planNumber: number): void {
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

  triggerConfirmCallDialog() {
    const dialogRef = this.dialog.open(ConsultingFormDialog, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(phoneNumber => {
      if (phoneNumber) {
        this.packagesService.setupConsultingCall(phoneNumber)
        .subscribe(
          () => EMPTY,
          () => this.updatePlanFailed = true
        );
      }
    });
  }

}
