import { Component, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogRecommendPlansData } from './dialog-recommend-plans-data';

@Component({
  selector: 'app-dialog-recommend-plans',
  templateUrl: './dialog-recommend-plans.component.html',
  styleUrls: ['./dialog-recommend-plans.component.css']
})
export class DialogRecommendPlansComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRecommendPlansComponent>) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
