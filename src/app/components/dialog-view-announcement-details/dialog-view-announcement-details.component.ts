import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogViewAnnouncementDetailsData } from './dialog-view-announcement-details-data';

@Component({
    selector: 'app-dialog-view-announcement-details',
    templateUrl: './dialog-view-announcement-details.component.html',
    styleUrls: ['./dialog-view-announcement-details.component.css'],
})
export class DialogViewAnnouncementDetailsComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<DialogViewAnnouncementDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogViewAnnouncementDetailsData
    ) {}

    ngOnInit() {}

    onExitClick() {
        this.dialogRef.close();
    }

    removeHtmlTag(text: string): string {
        return text.replace(/<[^>]*>/g, '');
    }
}
