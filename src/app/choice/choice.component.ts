import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  choice: Food[];

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.getChoice();
  }
  
  getChoice(): void {
    this.choice = this.foodService.getChoice();
  }
}
