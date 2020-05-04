import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Customer } from 'src/app/classes/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { Announcement } from 'src/app/classes/announcement';
import { Bill } from 'src/app/classes/bill';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';

import {
    ValidatorFn,
    FormGroup,
    ValidationErrors,
    FormBuilder,
    Validators,
    FormControl,
    AbstractControl,
    FormGroupDirective,
    NgForm,
} from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
    imageUrl: any;
    username: string;
    password: string;
    email: string;
    newAddress: string;
    newPostalCode: string;
    newNric: string;
    age: number;
    firstName: string;
    lastName: string;
    confirmedPassword: string;

    registerForm: FormGroup;
    titleAlert: string = 'This field is required';
    post: any = '';

    nricFrontToUpload: File;
    nricBackToUpload: File;
    profilePicToUpload: File;

    constructor(
        private customerService: CustomerService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public sessionService: SessionService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {}

    registration(): void {
        console.log(this.profilePicToUpload);
        let newCustomer: Customer = {
            announcements: undefined,
            bills: undefined,
            consecutiveMonths: 0,
            counter: 0,
            customerId: undefined,
            customerStatusEnum: 'PENDING',
            isApproved: false,
            joinDate: undefined,
            loyaltyPoints: 0,
            ownerOfFamilyGroup: false,
            profilePhoto: this.profilePicToUpload
                ? this.profilePicToUpload.name
                : undefined,
            quizAttempts: undefined,
            subscriptions: undefined,
            transactions: undefined,
            username: this.username,
            password: this.password,
            email: this.email,
            newAddress: this.newAddress,
            newPostalCode: this.newPostalCode,
            newNric: this.newNric,
            newNricBackImagePath: this.nricBackToUpload
                ? this.nricBackToUpload.name
                : undefined,
            newNricFrontImagePath: this.nricFrontToUpload
                ? this.nricFrontToUpload.name
                : undefined,
            address: undefined,
            postalCode: undefined,
            nric: undefined,
            age: this.age,
            firstName: this.firstName,
            lastName: this.lastName,
            nricFrontImagePath: undefined,
            nricBackImagePath: undefined,
            creditCardExpiryDate: undefined,
            cvv: undefined,
            creditCardNumber: undefined,
            familyGroup: undefined,
        };

        this.uploadFiles();

        this.customerService.customerRegistration(newCustomer).subscribe(
            (response) => {
                this.snackBar.open('Registration successful! ', '', {
                    duration: 4500,
                });
                this.router.navigate(['/login']);
            },
            (error) => {
                const snackBarRef = this.snackBar.open(error, '', {
                    duration: 4500,
                });
                console.log(error);
            }
        );
    }
    navigateToLogin(): void {
        this.router.navigate(['/login']);
    }
    handleNricFrontFileInput(file: FileList) {
        this.nricFrontToUpload = file.item(0);

        //Show image preview
        // let reader = new FileReader();
        // reader.onload = (event: any) => {
        //     this.imageUrl = event.target.result;
        // };
        // reader.readAsDataURL(this.fileToUpload);
    }

    handleNricBackFileInput(file: FileList) {
        this.nricBackToUpload = file.item(0);
    }

    handleProfilePicFileInput(file: FileList) {
        this.profilePicToUpload = file.item(0);
    }

    handleNricChange(event: any) {
        this.newNric = this.newNric.toUpperCase();
    }

    uploadFiles() {
        if (this.nricFrontToUpload) {
            this.customerService
                .postToNricFolder(this.nricFrontToUpload)
                .subscribe(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
        if (this.nricBackToUpload) {
            this.customerService
                .postToNricFolder(this.nricBackToUpload)
                .subscribe(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
        if (this.profilePicToUpload) {
            this.customerService
                .postToProfileFolder(this.profilePicToUpload)
                .subscribe(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }
}
