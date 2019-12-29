// Angular
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Library
import { NgMendeleyService } from './ng-mendeley.service';
import { NgMendeleyDocumentsService } from './ng-mendeley-documents.service';

@NgModule({
  providers: [
    HttpClientModule,
    NgMendeleyService,
    NgMendeleyDocumentsService
  ]
})
export class NgMendeleyModule { }
