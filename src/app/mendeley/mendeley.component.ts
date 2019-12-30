// Angular
import { Component, OnInit } from '@angular/core';

// Libraries
import { NgMendeleyService, NgMendeleyDocumentsService, NgMendeleyFoldersService } from 'ng-mendeley';

@Component({
  selector: 'app-mendeley',
  templateUrl: './mendeley.component.html',
  styleUrls: ['./mendeley.component.scss']
})
export class MendeleyComponent implements OnInit {

  constructor(
    private service: NgMendeleyService,
    private documentsService: NgMendeleyDocumentsService,
    private foldersService: NgMendeleyFoldersService) { }

  ngOnInit() {
    this.service.accessToken = 'MSwxNTc3NzA1MDI3ODkyLDU2MTMxMjY3MSwxMDI4LGFsbCwsLDQ3Yjc3YTNhNjM5YWM1NDU5ZjE5YjRmMjRhMDE1NzdhMjM2Ymd4cnFiLGYxZTRlZTM4LWEyZjUtMzQ2Yy04YTViLWExNzE1MjYwOThkMCwyNl9vUjJQMjV0RDZTUmtBY3lhRzFBUm9RTm8';
    this.service.retrieveAllUserRoles().subscribe(
      roles => console.log(roles),
      error => console.log(error),
      () => console.log('retrieveAllUserRoles done!')
    );
    this.documentsService.retrieveADocument('877458db-9425-3cbc-8daf-2574ea07f162').subscribe(
      doc => console.log(doc.title),
      error => console.log(error),
      () => console.log('retrieveADocument done!')
    );
    this.foldersService.listAllFolders().subscribe(
      folders => console.log(folders),
      error => console.log(error),
      () => console.log('listAllFolders done!')
    );
  }

}
