import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData
  ) {}

  book() {
    console.log('xxxxx', this.bottomSheetRef);
    this.bottomSheetRef.dismiss();
  }

  cancel() {
    this.bottomSheetRef.dismiss(false);
  }
}
