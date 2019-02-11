import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {

  constructor(public modal: NgbActiveModal) {}
  ngOnInit() {}

}
