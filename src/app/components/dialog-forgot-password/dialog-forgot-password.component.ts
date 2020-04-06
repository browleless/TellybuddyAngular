import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-forgot-password',
    templateUrl: './dialog-forgot-password.component.html',
    styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogForgotPasswordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogForgotPasswordComponent
    ) {}

    ngOnInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
