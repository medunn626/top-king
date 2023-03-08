import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { ConsultingFormDialog } from './consulting-form-dialog/consulting-form-dialog.component';
import { PackagesService } from './packages.service';

export interface Package {
  id: number,
  title: string,
  titleImageSrc?: string;
  descriptions: string[],
  price: number;
  isAnnual: boolean;
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
  consultingPrice: string;
  
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
    this.populatePricesAndPackages();
  }

  private populatePricesAndPackages(): void {
    if (!localStorage.getItem('beginnerPrice')) {
      this.packagesService.getPrices()
      .subscribe(
        (prices) => {
          localStorage.setItem('beginnerPrice', '' + prices.beginner);
          localStorage.setItem('intermediatePrice', '' +  prices.intermediate);
          localStorage.setItem('elitePrice', '' + prices.elite);
          localStorage.setItem('consultingPrice', '' +  prices.consulting);
          localStorage.setItem('annualPrices', '' +  prices.annualPrices);
          this.populatePackages();
        },
        () => EMPTY
      );
    }
    this.populatePackages();
  }

  private populatePackages(): void {
    this.consultingPrice = localStorage.getItem('consultingPrice') ?? '100';
    this.packages = [
      {
        id: 1,
        title: 'Beginner',
        titleImageSrc: '/assets/beginner.png',
        descriptions: [
          'This program will provide world renown introduction fitness exercises to help incorporate ' +
          'into your daily exercises including free weights & calisthenics!!'
        ],
        price: +(localStorage.getItem('beginnerPrice') ?? '30'),
        isAnnual: localStorage.getItem('annualPrices')?.includes('B') ?? false,
        userHasThisPlan: this.usersCurrentPlan === 1
      },
      {
        id: 2,
        title: 'Intermediate',
        titleImageSrc: '/assets/int.png',
        descriptions: [
          'This program includes muscle and strength training exercises to take basic training to next level with machines and much more!!'
        ],
        price: +(localStorage.getItem('intermediatePrice') ?? '50'),
        isAnnual: localStorage.getItem('annualPrices')?.includes('I') ?? false,
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
        price: +(localStorage.getItem('elitePrice') ?? '75'),
        isAnnual: localStorage.getItem('annualPrices')?.includes('E') ?? false,
        userHasThisPlan: this.usersCurrentPlan === 3
      },
    ];
    this.userHasAPackage = !!this.packages.find(p => p.userHasThisPlan);
    this.usersNonPackages = this.userHasAPackage ? [] : this.packages.filter(p => !p.userHasThisPlan);
  }

  purchasePlan(planNumber: number): void {
    if (!this.isLoggedIn) {
      localStorage.setItem('productTierIntendingToPurchase', planNumber + '');
      this.router.navigate(['login']);
    } else {
      this.triggerStripePayment(planNumber);
    }
  }

  private triggerStripePayment(planNumber: number): void {
    if (planNumber === 1) {
      window.open('https://buy.stripe.com/7sIbM84ph18AbmweUX', '_blank');
    } else if (planNumber === 2) {
      window.open('https://buy.stripe.com/28obM8g7Z9F64Y8bIK', '_blank');
    } else if (planNumber === 3) {
      window.open('https://buy.stripe.com/eVabM8g7Z18A76g9AB', '_blank');
    }
  } 

  triggerConfirmCallDialog() {
    const dialogRef = this.dialog.open(ConsultingFormDialog, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.afterClosed().subscribe(email => {
      if (email) {
        window.open('https://buy.stripe.com/fZe03qaNFaJa9eo144', '_blank');
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
