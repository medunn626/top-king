import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { ConsultingFormDialog } from './consulting-form-dialog/consulting-form-dialog.component';
import { PackagesService } from './packages.service';

export interface Package {
  id: number,
  title: string,
  titleImageSrc?: string;
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
  userHasAPackage: boolean
  usersNonPackages: Package[];
  updatePlanFailed = false;
  consultingImgSrc = '/assets/phone.jpg';
  smallerScreen = false;
  
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private packagesService: PackagesService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userId');
    this.setOrUpdatePlans();
    this.onResize();
  }

  private setOrUpdatePlans(): void {
    this.usersCurrentPlan = +(localStorage.getItem('productTier') ?? 0);
    this.populatePackages();
    this.userHasAPackage = !!this.packages.find(p => p.userHasThisPlan);
    this.usersNonPackages = this.userHasAPackage ? [] : this.packages.filter(p => !p.userHasThisPlan);
  }

  private populatePackages(): void {
    this.packages = [
      {
        id: 1,
        title: 'Beginner',
        titleImageSrc: '/assets/beginner.png',
        descriptions: [
          'This program will provide world renown introduction fitness exercises to help incorporate ' +
          'into your daily exercises including free weights & calisthenics!!'
        ],
        price: 30,
        userHasThisPlan: this.usersCurrentPlan === 1
      },
      {
        id: 2,
        title: 'Intermediate',
        titleImageSrc: '/assets/int.png',
        descriptions: [
          'This program includes muscle and strength training exercises to take basic training to next level with machines and much more!!'
        ],
        price: 50,
        userHasThisPlan: this.usersCurrentPlan === 2
      },
      {
        id: 3,
        title: 'Elite',
        titleImageSrc: '/assets/elite.jpg',
        descriptions: [
          'Unlimited videos for LIFE!!',
          'Diet tips & hacks!',
          'Cutting program for people who want to get cut or lose weight!',
          'Also includes all of the above plans incorporating supersets, drop sets, different innovative exercises to hit the muscle from different angles and many more!!'
        ],
        price: 75,
        userHasThisPlan: this.usersCurrentPlan === 3
      },
    ]
  }

  purchasePlan(planNumber: number): void {
    if (!this.isLoggedIn) {
      localStorage.setItem('productTierIntendingToPurchase', planNumber + '');
      this.router.navigate(['login']);
    } else {
      this.triggerConfirmPlanDialog(planNumber);
    }
  }

  private triggerConfirmPlanDialog(planNumber: number): void {
    window.open('https://buy.stripe.com/test_5kA8xne2LdyYeHu000', '_blank');
    this.packagesService.setPlan(planNumber + '')
    .subscribe(
            (response) => {
              // this.updatePlanFailed = false;
              // localStorage.setItem('productTier', response.productTier ?? '');
              // this.setOrUpdatePlans();
              // this.router.navigate(['/content']);
            },
            () => this.updatePlanFailed = true
          );
    // const dialogRef = this.dialog.open(ConfirmationDialog, {
    //   disableClose: true,
    //   width: '75%'
    // });
    // dialogRef.componentInstance.confirmMessage = `Please confirm you would like to purchase this this plan`;

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.packagesService.setPlan(planNumber + '')
    //     .subscribe(
    //       (response) => {
    //         this.updatePlanFailed = false;
    //         localStorage.setItem('productTier', response.productTier ?? '');
    //         this.setOrUpdatePlans();
    //         this.router.navigate(['/content']);
    //       },
    //       () => this.updatePlanFailed = true
    //     );
    //   }
    // });
  }

  triggerConfirmCallDialog() {
    const dialogRef = this.dialog.open(ConsultingFormDialog, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(email => {
      if (email) {
        this.packagesService.setupConsultingCall(email)
        .subscribe(
          () => this.updatePlanFailed = false,
          () => this.updatePlanFailed = true
        );
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.smallerScreen = window.innerWidth < 900;
  }

}
