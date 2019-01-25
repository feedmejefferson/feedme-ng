import { Injectable } from '@angular/core';
import { Food } from './food';
import { FoodService } from './food.service';

export function getRandomIndex(setSize: number): number {
  return Math.floor(Math.random() * setSize);
}

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  menu$: Promise<Array<string>>;

  constructor(private foodService: FoodService) {
    this.menu$=foodService.getMenu();
  }

  getChoice(): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => { 
      this.menu$.then(menu => {
        const indexA = getRandomIndex(menu.length);    
        let indexB = getRandomIndex(menu.length);
        while(indexB === indexA) {
          indexB = getRandomIndex(menu.length);
        }
        let children: string[] = [];
        children.push(menu[indexA]);
        children.push(menu[indexB]);
        resolve(children);
      });
    });
  }
}
