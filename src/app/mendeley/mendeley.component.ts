// Angular
import { Component, OnInit } from '@angular/core';

// Libraries
import { NgMendeleyService, NgMendeleyDocumentsService } from 'ng-mendeley';

@Component({
  selector: 'app-mendeley',
  templateUrl: './mendeley.component.html',
  styleUrls: ['./mendeley.component.scss']
})
export class MendeleyComponent implements OnInit {

  constructor(
    private service: NgMendeleyService,
    private documentsService: NgMendeleyDocumentsService) { }

  ngOnInit() {
    this.service.accessToken = 'MSwxNTc3NjcxNjI0OTgxLDU2MTMxMjY3MSwxMDI4LGFsbCwsLGY3MzZjNThjNGE4MmI1NGNmNDM4YjNlLTM4ZjkzOWE0NTI2Nmd4cnFiLGYxZTRlZTM4LWEyZjUtMzQ2Yy04YTViLWExNzE1MjYwOThkMCw0cWctU2VTbm1YdElDVExUdWo0TWZJcFpTVms';
    this.service.userRoles.subscribe(
      roles => console.log(roles),
      error => console.log(error),
      () => console.log('userRoles done!')
    );
    this.documentsService.get('877458db-9425-3cbc-8daf-2574ea07f162').subscribe(
      docs => console.log(docs),
      error => console.log(error),
      () => console.log('getDocs done!')
    );
  }

}
