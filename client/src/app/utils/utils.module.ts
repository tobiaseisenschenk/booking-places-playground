import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatListModule } from '@angular/material/list';

const myDeclarations = [BottomSheetComponent];
const myImports = [CommonModule, MatBottomSheetModule, MatListModule];

@NgModule({
  declarations: myDeclarations,
  entryComponents: [BottomSheetComponent],
  imports: myImports,
  exports: [...myImports, ...myDeclarations]
})
export class UtilsModule {}
