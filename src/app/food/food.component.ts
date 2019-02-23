import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'] // just using choice styles for now
})
export class FoodComponent implements OnInit {

  food: Food;
  constructor(private route: ActivatedRoute,
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.food = this.foodService.getFood(this.route.snapshot.paramMap.get('id1'));
  }

}
