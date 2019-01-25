import { Component, OnInit } from '@angular/core';
import { ChoiceService } from '../choice.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-choice-redirect',
  template: ''
})
export class ChoiceRedirect implements OnInit {

  constructor(private choiceService: ChoiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.choiceService.getChoice().then(choice => {
      this.router.navigate([
        '/choice',
        0,
        choice[0], 
        choice[1]
      ], { 
        replaceUrl: true 
      });
    });
  }
}


