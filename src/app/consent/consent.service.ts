import { Injectable } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ConsentComponent } from './consent.component';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  private consent: Promise<boolean>;
  private knownAsTrue: boolean = false;

  constructor(private modalService: NgbModal) {
    let consent = localStorage.getItem('anonymousCollection');
    if(consent==='true') {
      this.knownAsTrue=true;
      this.consent=new Promise<boolean>(function(resolve, reject) {resolve(true);});
    } else if(consent==='false') {
      this.consent=new Promise<boolean>(function(resolve, reject) {resolve(false);});
    }
  }
  
  isKnown(): boolean {
    return !!this.consent; 
  }

  isKnownToBeTrue(): boolean {
    return this.knownAsTrue;
  }

  getConsent(): Promise<boolean> {
    if(this.consent) {
      return this.consent;
    } else {
      return this.askForConsent();
    }
  }
  askForConsent(): Promise<boolean> {
    let consentSvc=this;
    return new Promise<boolean>(function(resolve, reject) {
      consentSvc.modalService.open(ConsentComponent, {ariaLabelledBy: 'modal-basic-title', backdrop: false }).result.then((result) => {
        // if we get a firm answer, save the preference and stop bothering the user
        if(result=="yes") { 
          localStorage.setItem('anonymousCollection', 'true');
          consentSvc.consent=new Promise<boolean>(function(resolve, reject) {resolve(true);});
        } else if(result=="no") {
          localStorage.setItem('anonymousCollection', 'false');
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
