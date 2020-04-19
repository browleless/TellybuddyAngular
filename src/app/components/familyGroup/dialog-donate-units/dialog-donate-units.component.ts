import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogDonateUnitsData } from './dialog-donate-units-data';

@Component({
    selector: 'app-dialog-donate-units',
    templateUrl: './dialog-donate-units.component.html',
    styleUrls: ['./dialog-donate-units.component.css'],
})
export class DialogDonateUnitsComponent implements OnInit {
    selectedSubscription: Subscription;
    donatedSMS: number = 0;
    donatedData: number = 0;
    donatedTalkTime: number = 0;
    smsLeft: number;
    dataLeft: number;
    talkTimeLeft: number;

    constructor(
        public dialogRef: MatDialogRef<DialogDonateUnitsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDonateUnitsData
    ) {}

    ngOnInit() {}
}
