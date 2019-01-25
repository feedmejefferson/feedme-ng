import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-choice-redirect',
  template: ''
})
export class ChoiceRedirect implements OnInit {

  constructor(private foodService: FoodService,
    private router: Router
  ) { }

  ngOnInit() {
    this.foodService.getNode().then(node => {
      this.router.navigate([
        '/choice',
        node.children[0].value, 
        node.children[1].value
      ], { 
        replaceUrl: true 
      });
    });
  }
}


