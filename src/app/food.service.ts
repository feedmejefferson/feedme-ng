import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food';
import { environment } from '../environments/environment';

const baseUrl: string = environment.baseFoodImageUrl;
const baseAttributionUrl: string = baseUrl + 'attributions/';
const attributionHeaders = { responseType: 'text' };

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  menu$: Promise<Array<string>>;
  
  constructor(private http: HttpClient) { 
    this.menu$ = this.http.get<Array<string>>(baseUrl + 'menu.json').toPromise();
  }
  
  prepFood(image: string): Food {
    return {
      image: image, 
      url: `${baseUrl}${image}`,
      attribution$: this.http.get(
        baseAttributionUrl + image + ".txt", 
        {responseType: 'text'}
      )
    };
  }

  getChoice(): Promise<Array<Food>> {
    return new Promise<Array<Food>>((resolve, reject) => {
      this.menu$.then(menu => {
        let choice: Food[] = [];
        choice.push(this.prepFood(menu[0]));
        choice.push(this.prepFood(menu[1]));
        resolve(choice);
      }).catch(err => {
        console.error("Error loading menu");
        reject(err);
      });
    });
  }
  
}


