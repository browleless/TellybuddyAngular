import { Component, OnInit } from '@angular/core';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import { CustomerService } from 'src/app/service/customer.service';
import { SessionService } from 'src/app/service/session.service';
import { FamilyGroup } from 'src/app/classes/family-group';
import { Customer } from 'src/app/classes/customer';
import { Subscription } from 'src/app/classes/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogAddNewFamilyMemberComponent } from '../../dialog-add-new-family-member/dialog-add-new-family-member.component';
import { UsageDetail } from 'src/app/classes/usage-detail';

@Component({
    selector: 'app-view-members',
    templateUrl: './view-members.component.html',
    styleUrls: ['./view-members.component.css'],
})
export class ViewMembersComponent implements OnInit {
    isOpened: boolean;
    familyGroup: FamilyGroup;
    familyMembers: Customer[];
    activeSubscriptionsUnderThatCustomer: Subscription[];
    panelOpenState: boolean;
    customerToRemove: Customer;
    currentCustomer: Customer;
    ownerOfFamilyGroup: boolean;
    displayedColumns: string[] = [
        'Number',
        'SMS usage',
        'Talk time usage',
        'Data usage',
    ];
    loaded: boolean = false;

    constructor(
        public sessionService: SessionService,
        private customerService: CustomerService,
        private familyGroupService: FamilyGroupService,
        private subscriptionService: SubscriptionService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.familyGroup = new FamilyGroup();
        this.panelOpenState = false;
    }

    ngOnInit() {
        this.currentCustomer = this.sessionService.getCurrentCustomer();
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
                            this.loaded = true;
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

    retrieveActiveSubscriptions(i: number) {
        this.subscriptionService
            .retrieveActiveSubscriptionUnderCustomer(
                this.familyMembers[i].customerId
            )
            .subscribe(
                (response) => {
                    this.activeSubscriptionsUnderThatCustomer =
                        response.activeSubscriptions;
                },
                (error) => {
                    console.log(
                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                            error
                    );
                }
            );
        this.isOpened = true;
    }

    removeMember(i: number) {
        this.familyGroupService
            .removeFamilyGroupMember(this.familyGroup, this.familyMembers[i])
            .subscribe(
                (response) => {
                    location.reload;
                    this.customerToRemove = this.familyMembers[i];

                    const snackBarRef = this.snackBar.open(
                        'Member removed successfully!',
                        'Undo',
                        {
                            duration: 4500,
                        }
                    );

                    snackBarRef.onAction().subscribe(() => {
                        this.familyGroupService
                            .addFamilyGroupMember(
                                this.customerToRemove,
                                this.familyGroup
                            )
                            .subscribe(
                                (response) => {
                                    location.reload();
                                },
                                (error) => {
                                    const snackBarRef = this.snackBar.open(
                                        error,
                                        '',
                                        {
                                            duration: 4500,
                                        }
                                    );

                                    console.log(
                                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                                            error
                                    );
                                }
                            );
                    });
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
            // height: '300px',
            // width: '600px',
        });
    }
}
