import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food';
import { Node } from './node';
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
  
  getMenu(): Promise<Array<string>> {
    return this.menu$;
  }
  
  getFood(id: string): Food {
    let outer=this;
    return {
      id: id, 
      imageUrl: `${baseUrl}${id}`,
      attribution$: this.http.get(
        baseAttributionUrl + id + ".txt", 
        {responseType: 'text'}
      ),
    };
  }
}


