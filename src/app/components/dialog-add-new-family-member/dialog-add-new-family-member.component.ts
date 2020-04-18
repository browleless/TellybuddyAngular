import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DialogAddNewFamilyMemberData } from './dialog-add-new-family-member-data';
import { Customer } from 'src/app/classes/customer';
import { FamilyGroupService } from 'src/app/service/family-group.service';

@Component({
    selector: 'app-dialog-add-new-family-member',
    templateUrl: './dialog-add-new-family-member.component.html',
    styleUrls: ['./dialog-add-new-family-member.component.css'],
})
export class DialogAddNewFamilyMemberComponent implements OnInit {
    private email: string;
    private newCustomer: Customer;
    loaded:boolean = false;

    constructor(
        public dialogRef: MatDialogRef<DialogAddNewFamilyMemberComponent>,
        public customerService: CustomerService,
        @Inject(MAT_DIALOG_DATA) public data: DialogAddNewFamilyMemberData,
        public familyGroupService: FamilyGroupService
    ) {}

    ngOnInit() {
      this.loaded = true;
    }

    retrieveCustomerByEmail() {
        this.customerService.retrieveCustomerByEmail(this.email).subscribe(
            (response) => {
                this.newCustomer = response.customer;
            },
            (error) => {
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
    }
    addFamilyGroupMember() {
        this.familyGroupService
            .addFamilyGroupMember(
                this.data.selectedFamilyGroup,
                this.newCustomer
            )
            .subscribe(
                (response) => {
                    location.reload;
                },
                (error) => {
                    console.log(
                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                            error
                    );
                }
            );
        this.dialogRef.close();
    }
    onExitClick(): void {
        this.dialogRef.close();
    }
}
