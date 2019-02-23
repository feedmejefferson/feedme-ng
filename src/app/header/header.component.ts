import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ NgbDropdown ]
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  public links = [
    { path: '', display: 'Home' },
    { display: 'Apps', id: 'apps', children: [
      { path: 'ff', display: 'Food Fight' },
      { path: 'cb', display: 'Crystal Bowl' }
    ] },
    { path: 'about', display: 'About' }
  ];

  constructor() { }

  ngOnInit() {
  }

  collapse() {
    this.isCollapsed = true;
  }

}
