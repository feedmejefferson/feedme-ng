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
    this.choiceService.getChoiceRoute(0,1).then(choiceRoute => {
      this.router.navigate(choiceRoute, { replaceUrl: true });
    });
  }
}


