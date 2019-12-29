import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-article-analyzer';

  navLinks = [
    { path: '', label: 'Article Analyzer Overview'}
  ];
  activeLink = this.navLinks[0];

  constructor(/* private scholar: ScholarService */) {}

  ngOnInit() {

  }
}
