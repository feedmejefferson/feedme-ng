import { Component } from '@angular/core';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private consent: ConsentService) {
  }

  askForConsent() {
    this.consent.askForConsent();
  }

}
