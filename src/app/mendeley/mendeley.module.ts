import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MendeleyRoutingModule } from './mendeley-routing.module';
import { MendeleyComponent } from './mendeley.component';


@NgModule({
  declarations: [MendeleyComponent],
  imports: [
    CommonModule,
    MendeleyRoutingModule
  ]
})
export class MendeleyModule { }
