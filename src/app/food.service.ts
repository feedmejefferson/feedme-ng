import { Injectable } from '@angular/core';
import { Food } from './food';
import { MENU } from './mock-foods';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  remapUrl(food: Food): Food {
    return {...food, url: `${environment.baseFoodImageUrl}${food.url}`};
  }

  getChoice(): Food[] {
    return MENU.map(this.remapUrl);
  }
}

