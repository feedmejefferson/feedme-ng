import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food';
import { MENU } from './mock-foods';
import { environment } from '../environments/environment';

const baseUrl: string = environment.baseFoodImageUrl;
const baseAttributionUrl: string = baseUrl + 'attributions/';
const attributionHeaders = { responseType: 'text' };

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  constructor(private http: HttpClient) { }

  resolve(food: Food): Food {
    return {
      ...food, 
      url: `${baseUrl}${food.imageFileName}`,
      attribution: this.http.get(
        baseAttributionUrl + food.imageFileName + ".txt", 
        {responseType: 'text'}
      )
    };
  }

  getChoice(): Food[] {
    let choice: Food[] = [];
    choice.push(this.resolve(MENU[0]));
    choice.push(this.resolve(MENU[1]));
    return choice;
  }
  
}


