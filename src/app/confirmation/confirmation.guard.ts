import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConfirmationService } from './confirmation.service';

@Injectable()
export class ConfirmationGuard implements CanActivate {

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<any> {
        if (!this.isAllowed(route)) {
            this.router.navigate(['home']);
            return of(false);
        }
        return of(true);
    }

    private isAllowed(route: ActivatedRouteSnapshot) {
        const tier: string = route.params['tier'];
        const hasCheckoutSession: boolean = !!route.queryParams['checkout'];
        const canActivate = hasCheckoutSession && !!tier;
        if (canActivate && ['1', '2', '3'].includes(tier)) {
            const userId: string = localStorage.getItem('userId') ?? '';
            if (userId) {
                this.confirmationService.fulfillPlan(userId, tier);
            }
        }
        return canActivate;
    }

}