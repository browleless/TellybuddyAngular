import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
    MatSnackBar,
    ErrorStateMatcher,
} from '@angular/material';
import { DialogAddNewFamilyMemberData } from './dialog-add-new-family-member-data';
import { Customer } from 'src/app/classes/customer';
import { FamilyGroupService } from 'src/app/service/family-group.service';
import {
    FormControl,
    Validators,
    FormGroupDirective,
    NgForm,
} from '@angular/forms';

@Component({
    selector: 'app-dialog-add-new-family-member',
    templateUrl: './dialog-add-new-family-member.component.html',
    styleUrls: ['./dialog-add-new-family-member.component.css'],
})
export class DialogAddNewFamilyMemberComponent implements OnInit {
    private email: string;
    private newCustomer: Customer;
    loaded: boolean = false;
    shakeIt = false;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    matcher = new MyErrorStateMatcher();

    constructor(
        public dialogRef: MatDialogRef<DialogAddNewFamilyMemberComponent>,
        public customerService: CustomerService,
        @Inject(MAT_DIALOG_DATA) public data: DialogAddNewFamilyMemberData,
        public familyGroupService: FamilyGroupService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loaded = true;
    }

    retrieveCustomerByEmail() {
        this.customerService.retrieveCustomerByEmail(this.email).subscribe(
            (response) => {
                this.newCustomer = response.customer;
                this.addFamilyGroupMember();
            },
            (error) => {
                const snackBarRef = this.snackBar.open(
                    'Eamil not found!',
                    'Please re-enter the correct email',
                    {
                        duration: 4500,
                    }
                );
                this.shakeDialog();
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
    }
    addFamilyGroupMember() {

        this.familyGroupService
            .addFamilyGroupMember(
                this.newCustomer,
                this.data.selectedFamilyGroup
            )
            .subscribe(
                (response) => {
                    location.reload();
                },
                (error) => {
                    const snackBarRef = this.snackBar.open(error, '', {
                        duration: 4500,
                    });

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
    shakeDialog() {
        this.shakeIt = true;
        setTimeout((arg) => {
            this.shakeIt = false;
        }, 300);
    }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null
    ): boolean {
        const isSubmitted = form && form.submitted;
        return !!(
            control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted)
        );
    }
}
