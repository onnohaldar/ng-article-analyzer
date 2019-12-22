import { Component, OnInit } from '@angular/core';

import { ScholarService } from './scholar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-article-analyzer';

  constructor(private scholar: ScholarService) {}

  ngOnInit() {
    this.scholar.getLabels().subscribe(
      htmlText => console.log(htmlText)
    );
  }
}
