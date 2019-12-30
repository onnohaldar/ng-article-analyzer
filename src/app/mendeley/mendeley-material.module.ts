import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatTreeModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const matModules = [
    FlexLayoutModule,
    MatButtonModule,
    MatTreeModule
];

@NgModule({
    imports: [matModules],
    exports: [matModules]
})
export class MendeleyMaterialModule { }
