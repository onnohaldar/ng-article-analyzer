import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MendeleyComponent } from './mendeley.component';

const routes: Routes = [ { path: 'mendeley', component: MendeleyComponent } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MendeleyRoutingModule { }
