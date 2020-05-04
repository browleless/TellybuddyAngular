import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/classes/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { SessionService } from 'src/app/service/session.service';
import { MatSnackBar } from '@angular/material';

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
    imageLoading: boolean;
    profilePicture: any;
    imageUrl: boolean = false;

    nricFrontToUpload: File;
    nricBackToUpload: File;
    profilePicToUpload: File;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private sessionService: SessionService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.customerService.retrieveCurrentCustomer().subscribe(
            (response) => {
                this.customerToUpdate = response.customer;
                this.getProfilePicture();
                this.loaded = true;
            },
            (error) => {
                console.log(
                    '********** ViewFamilyGroupDetailsComponent.ts: ' + error
                );
            }
        );
    }

    updateCustomer() {
        this.uploadFiles();
        this.customerService
            .updateCustomerDetailsForCustomer(this.customerToUpdate)
            .subscribe(
                (response) => {
                    this.router.navigate(['account']);
                    this.sessionService.setCurrentCustomer(
                        this.customerToUpdate
                    );
                    if (this.confirmedPassword != null) {
                        this.customerToUpdate.password = this.confirmedPassword;
                        this.customerService
                            .changePassword(this.customerToUpdate)
                            .subscribe(
                                (response) => {
                                    this.sessionService.setPassword(
                                        this.confirmedPassword
                                    );
                                    this.loaded = true;
                                },
                                (error) => {
                                    console.log(
                                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                                            error
                                    );
                                }
                            );
                    }
                    let updateSnackbar = this.snackBar.open(
                        'Your details have been updated!',
                        'Close',
                        {
                            duration: 4500,
                        }
                    );
                    updateSnackbar
                        .afterDismissed()
                        .subscribe(() => this.router.navigate(['account']));
                },
                (error) => {
                    const snackBarRef = this.snackBar.open(error, 'close', {
                        duration: 4500,
                    });
                    console.log(
                        '********** ViewFamilyGroupDetailsComponent.ts: ' +
                            error
                    );
                }
            );
    }
    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                this.profilePicture = reader.result;
            },
            false
        );

        if (image) {
            reader.readAsDataURL(image);
        }
    }
    getProfilePicture() {
        this.customerService.retrieveProfilePicture().subscribe(
            (data) => {
                this.createImageFromBlob(data);
                this.imageLoading = false;
            },
            (error) => {
                this.imageLoading = true;
                console.log(error);
            }
        );
    }

    handleNricChange(event: any) {
        this.customerToUpdate.newNric = this.customerToUpdate.newNric.toUpperCase();
    }

    handleNricFrontFileInput(file: FileList) {
        this.nricFrontToUpload = file.item(0);
    }

    handleNricBackFileInput(file: FileList) {
        this.nricBackToUpload = file.item(0);
    }

    handleProfilePicFileInput(file: FileList) {
        this.profilePicToUpload = file.item(0);
    }

    uploadFiles() {
        if (this.nricFrontToUpload) {
            this.customerToUpdate.newNricFrontImagePath = this.nricFrontToUpload.name;
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
            this.customerToUpdate.newNricBackImagePath = this.nricBackToUpload.name;
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
            this.customerToUpdate.profilePhoto = this.profilePicToUpload.name;
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
