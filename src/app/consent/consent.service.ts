import { Injectable } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ConsentComponent } from './consent.component';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  private consent: Promise<boolean>;
  constructor(private modalService: NgbModal, private localStorage: LocalStorage) {
  }

  getConsent(): Promise<boolean> {
    if(this.consent) {
      return this.consent;
    } else {
      let consentSvc=this;
      return new Promise<boolean>(function(resolve, reject) {
        consentSvc.localStorage.getItem<boolean>('anonymousCollection').subscribe((consent) => {
          if(consent===true) {
            consentSvc.consent=new Promise<boolean>(function(resolve, reject) {resolve(true);});
            resolve(true);
          } else if(consent===false) {
            consentSvc.consent=new Promise<boolean>(function(resolve, reject) {resolve(false);});
            resolve(false);
          } else {
            consentSvc.askForConsent().then(consent => {resolve(consent)});
          }
        });
      });
    }
  }
  askForConsent(): Promise<boolean> {
    let consentSvc=this;
    return new Promise<boolean>(function(resolve, reject) {
      consentSvc.modalService.open(ConsentComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        // if we get a firm answer, save the preference and stop bothering the user
        if(result=="yes") { 
          consentSvc.localStorage.setItem('anonymousCollection', true).subscribe(() => {});
          consentSvc.consent=new Promise<boolean>(function(resolve, reject) {resolve(true);});
        } else if(result=="no") {
          consentSvc.localStorage.setItem('anonymousCollection', false).subscribe(() => {});
          consentSvc.consent=new Promise<boolean>(function(resolve, reject) {resolve(false);});
        }
         
        resolve(result=="yes");
      }, (reason) => {
        resolve(false);
      });
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
