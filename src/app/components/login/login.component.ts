import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SessionService } from 'src/app/service/session.service';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/classes/customer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    loginError: boolean;
    errorMessage: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private customerService: CustomerService,
        private snackBar: MatSnackBar
    ) {
        this.loginError = false;
    }

    ngOnInit() {}

    customerLogin(): void {
        this.sessionService.setUsername(this.username);
        this.sessionService.setPassword(this.password);

        this.customerService
            .customerLogin(this.username, this.password)
            .subscribe(
                response => {
                    let customer: Customer = response.customer;
                    if (customer != null) {
                        this.sessionService.setIsLogin(true);
                        this.sessionService.setCurrentCustomer(customer);
                        this.loginError = false;

                        this.router.navigate(['/index']);
                    } else {
                        this.loginError = true;
                    }
                },
                error => {
                    this.loginError = true;
                    this.errorMessage = error;
                    this.snackBar.open(this.errorMessage, 'Close', {
                        duration: 4500
                    });
                }
            );
    }
}
