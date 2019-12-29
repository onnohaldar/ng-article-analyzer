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
    this.service.accessToken = 'MSwxNTc3NjQyNTEwNTE2LDU2MTMxMjY3MSwxMDI4LGFsbCwsLDg3MDAyNjllNzQzZjc0NDE3YTk5OWJkMjU1ZTMzMGE3NjdhNmd4cnFiLGYxZTRlZTM4LWEyZjUtMzQ2Yy04YTViLWExNzE1MjYwOThkMCxhUU92Q1dkWkVsQm5PbGRIQ0VCd1BMekNVb00';
    this.service.userRoles.subscribe(
      roles => console.log(roles),
      error => console.log(error),
      () => console.log('userRoles done!')
    );
    this.documentsService.get().subscribe(
      docs => console.log(docs),
      error => console.log(error),
      () => console.log('getDocs done!')
    );
  }

}
