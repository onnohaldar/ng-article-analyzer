// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Application
import { MendeleyMaterialModule } from './mendeley-material.module';
import { MendeleyRoutingModule } from './mendeley-routing.module';
import { MendeleyFolderTreeService } from './mendeley-folder-tree.service';
import { MendeleyComponent } from './mendeley.component';


@NgModule({
  providers: [MendeleyFolderTreeService],
  declarations: [MendeleyComponent],
  imports: [
    CommonModule,
    MendeleyMaterialModule,
    MendeleyRoutingModule
  ]
})
export class MendeleyModule { }
