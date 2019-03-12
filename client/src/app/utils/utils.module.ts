import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const myDeclarations = [BottomSheetComponent];
const myImports = [
  CommonModule,
  MatBottomSheetModule,
  MatListModule,
  MatSnackBarModule
];

@NgModule({
  imports: myImports,
  declarations: myDeclarations,
  entryComponents: [BottomSheetComponent],
  exports: [...myImports, ...myDeclarations]
})
export class UtilsModule {}
