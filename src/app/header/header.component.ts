import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  public links = [
    { path: '', display: 'Home' },
    { path: 'about', display: 'About' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
