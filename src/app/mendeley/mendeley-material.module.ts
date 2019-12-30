import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTreeModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const matModules = [
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTreeModule
];

@NgModule({
    imports: [matModules],
    exports: [matModules]
})
export class MendeleyMaterialModule { }
