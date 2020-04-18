import { Component, OnInit } from '@angular/core';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import { CustomerService } from 'src/app/service/customer.service';
import { SessionService } from 'src/app/service/session.service';
import { FamilyGroup } from 'src/app/classes/family-group';
import { Customer } from 'src/app/classes/customer';
import { Subscription } from 'src/app/classes/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { MatDialog } from '@angular/material';
import { DialogAddNewFamilyMemberComponent } from '../../dialog-add-new-family-member/dialog-add-new-family-member.component';

@Component({
    selector: 'app-view-members',
    templateUrl: './view-members.component.html',
    styleUrls: ['./view-members.component.css'],
})
export class ViewMembersComponent implements OnInit {
    familyGroup: FamilyGroup;
    familyMembers: Customer[];
    subscriptions: Subscription[];
    selectedSubscription: Subscription;
    panelOpenState: boolean;
    newCustomer: Customer;

    constructor(
        public sessionService: SessionService,
        private customerService: CustomerService,
        private familyGroupService: FamilyGroupService,
        private subscriptionService: SubscriptionService,
        public dialog: MatDialog
    ) {
        this.familyGroup = new FamilyGroup();
        this.panelOpenState = false;
        this.newCustomer = new Customer();
    }

    ngOnInit() {
        this.familyGroupService.getFamilyGroupUnderThisCustomer().subscribe(
            (response) => {
                this.familyGroup = response.familyGroup;
                this.customerService
                    .retrieveCustomerFromFamilyGroupId(
                        this.familyGroup.familyGroupId
                    )
                    .subscribe(
                        (response) => {
                            this.familyMembers = response.customers;
                        },
                        (error) => {
                            console.log(
                                '********** ViewFamilyGroupDetailsComponent.ts: ' +
                                    error
                            );
                        }
                    );
            },
            (error) => {
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
    }
    retrieveActiveSubscriptions(customerId: number) {
        this.subscriptionService
            .retrieveActiveSubscriptionUnderCustomer(customerId)
            .subscribe(
                (response) => {
                    this.subscriptions = response.subscriptions;
                },
                (error) => {
                    console.log(
                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                            error
                    );
                }
            );
    }
    openDialog(): void {
        this.dialog.open(DialogAddNewFamilyMemberComponent, {
            data: {
                selectedFamilyGroup: this.familyGroup,
            },
        });
    }
}
