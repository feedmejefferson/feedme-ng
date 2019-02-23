import { Injectable } from '@angular/core';
import { Food } from './food';
import { FoodService } from './food.service';
import { ChoiceService } from './choice.service';

export function getRandomIndex(setSize: number): number {
  return Math.floor(Math.random() * setSize);
}

@Injectable({
  providedIn: 'root'
})
export class RandomChoiceService implements ChoiceService {

  menu$: Promise<Array<string>>;

  constructor(private foodService: FoodService) {
    this.menu$ = foodService.getMenu();
  }

  getChoiceRoute(step: number, branch: number): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => {
      this.menu$.then(menu => {
        const indexA = getRandomIndex(menu.length);
        let indexB = getRandomIndex(menu.length);
        while (indexB === indexA) {
          indexB = getRandomIndex(menu.length);
        }
        const choiceRoute: string[] = [ 'ff' ];
        choiceRoute.push(`${step + 1}`);
        choiceRoute.push(menu[indexA]);
        choiceRoute.push(menu[indexB]);
        resolve(choiceRoute);
      });
    });
  }
}
