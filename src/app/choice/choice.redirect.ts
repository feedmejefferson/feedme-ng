import { Component, OnInit } from '@angular/core';
import { DecisionTreeService } from '../decision-tree.service';
//import { ChoiceService } from '../choice.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-choice-redirect',
  template: ''
})
export class ChoiceRedirect implements OnInit {

  constructor(private choiceService: DecisionTreeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.choiceService.getChoice(0,1).then(choice => {
      this.router.navigate([
        '/choice',
        choice[0], 
        choice[1],
        choice[2]
      ], { 
        replaceUrl: true 
      });
    });
  }
}


