import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/classes/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
    selector: 'app-account-edit',
    templateUrl: './account-edit.component.html',
    styleUrls: ['./account-edit.component.css'],
})
export class AccountEditComponent implements OnInit {
    customerToUpdate: Customer;
    loaded: boolean;
    password: string;
    confirmedPassword: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private sessionService: SessionService
    ) {}

    ngOnInit() {
        this.customerService.retrieveCurrentCustomer().subscribe(
            (response) => {
                this.customerToUpdate = response.customer;
            },
            (error) => {
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
        this.loaded = true;
    }

    updateCustomer() {
        this.customerService
            .updateCustomerDetailsForCustomer(this.customerToUpdate)
            .subscribe(
                (response) => {
                    this.router.navigate(['account']);
                },
                (error) => {
                    console.log(
                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                            error
                    );
                }
            );
        if (this.confirmedPassword != null) {
            this.customerToUpdate.password = this.confirmedPassword;
            this.customerService
                .changePassword(this.customerToUpdate)
                .subscribe(
                    (response) => {
                        this.sessionService.setPassword(this.confirmedPassword);
                        this.router.navigate(['login']);
                    },
                    (error) => {
                        console.log(
                            '********** ViewFamilyGroupDetailsComponent.ts: ' +
                                error
                        );
                    }
                );
        }
    }
    navigateToAccount() {
        this.router.navigate(['account']);
    }
}
