import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MendeleyRoutingModule } from './mendeley-routing.module';
import { MendeleyFoldersService } from './mendeley-folders.service';
import { MendeleyComponent } from './mendeley.component';


@NgModule({
  providers: [MendeleyFoldersService],
  declarations: [MendeleyComponent],
  imports: [
    CommonModule,
    MendeleyRoutingModule
  ]
})
export class MendeleyModule { }
