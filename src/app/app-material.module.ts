import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const matModules = [
    FlexLayoutModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule
];

@NgModule({
    imports: [matModules],
    exports: [matModules]
})
export class AppMaterialModule { }