import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/classes/customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from 'src/app/service/customer.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
    newPassword: string;
    newPasswordConfirmation: string;
    customer: Customer;

    retrieveCustomerError: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private customerService: CustomerService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.customerService
            .retrieveCustomerBySalt(
                this.activatedRoute.snapshot.paramMap.get('salt')
            )
            .subscribe(
                (response) => {
                    this.customer = response.customer;
                    console.log(this.customer);
                },
                (error) => {
                    this.retrieveCustomerError = true;
                }
            );
    }

    resetPassword(): void {
        if (!this.newPassword && !this.newPasswordConfirmation) {
            this.snackBar.open('Password canot be empty!', 'Close', {
                duration: 3000,
            });
        } else if (this.newPassword === this.newPasswordConfirmation) {
            this.customer.password = this.newPassword;
            this.customerService.changePassword(this.customer).subscribe(
                (response) => {
                    this.snackBar.open(response.message, 'Close', {
                        duration: 3000,
                    });
                    this.router.navigate(['/login']);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.snackBar.open('Passwords entered do not match!', 'Close', {
                duration: 3000,
            });
        }
    }
}
