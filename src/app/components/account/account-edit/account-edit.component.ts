import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from 'src/app/_animations/index';
import { Customer } from 'src/app/classes/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
    selector: 'app-account-edit',
    templateUrl: './account-edit.component.html',
    styleUrls: ['./account-edit.component.css'],
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' },
})
export class AccountEditComponent implements OnInit {
    customerToUpdate: Customer;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService
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
    }
}
