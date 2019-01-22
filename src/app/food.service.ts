import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food';
import { environment } from '../environments/environment';

const baseUrl: string = environment.baseFoodImageUrl;
const baseAttributionUrl: string = baseUrl + 'attributions/';
const attributionHeaders = { responseType: 'text' };
export function getRandomIndex(setSize: number): number {
  return Math.floor(Math.random() * setSize);
}

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
        const indexA = getRandomIndex(menu.length);    
        let indexB = getRandomIndex(menu.length);
        while(indexB === indexA) {
          indexB = getRandomIndex(menu.length);
        }
        let choice: Food[] = [];
        choice.push(this.prepFood(menu[indexA]));
        choice.push(this.prepFood(menu[indexB]));
        resolve(choice);
      }).catch(err => {
        console.error("Error loading menu");
        reject(err);
      });
    });
  }
  
}


