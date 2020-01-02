// Angular
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Library
import { NgMendeleyService } from './ng-mendeley.service';
import { NgMendeleyConfigService } from './ng-mendeley-config.service';
import { NgMendeleyAuthorizationService } from './ng-mendeley-authorization.service';
import { NgMendeleyFoldersService } from './ng-mendeley-folders.service';
import { NgMendeleyDocumentsService } from './ng-mendeley-documents.service';

@NgModule({
  providers: [
    HttpClientModule,
    NgMendeleyConfigService,
    NgMendeleyService,
    NgMendeleyAuthorizationService,
    NgMendeleyFoldersService,
    NgMendeleyDocumentsService
  ]
})
export class NgMendeleyModule { }
