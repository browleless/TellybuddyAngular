import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/classes/customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from 'src/app/service/customer.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    password: string;
    confirmationPassword: string;
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
            .retrieveCustomer(
                parseInt(
                    this.activatedRoute.snapshot.paramMap.get('customerId')
                )
            )
            .subscribe(
                response => {
                    this.customer = response.customer;
                    console.log(this.customer);
                },
                error => {
                    this.retrieveCustomerError = true;
                }
            );
    }

    resetPassword(): void {
        if (!this.password && !this.confirmationPassword) {
            this.snackBar.open('Password canot be empty!', 'Close', {
                duration: 3000
            });
        } else if (this.password === this.confirmationPassword) {
            console.log('update');
            this.router.navigate(['/login']);
        } else {
            this.snackBar.open('Passwords entered do not match!', 'Close', {
                duration: 3000
            });
        }
    }
}
