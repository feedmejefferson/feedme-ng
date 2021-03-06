import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food';
import { environment } from '../environments/environment';

const baseUrl: string = environment.baseFoodUrl;
const baseImageUrl: string = baseUrl + 'images/';
const baseAttributionUrl: string = baseUrl + 'attributions/';
const attributionHeaders = { responseType: 'text' };

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  menu$: Promise<Array<string>>;

  constructor(private http: HttpClient) {
    this.menu$ = this.http.get<Array<string>>(baseUrl + 'meta/menu.json').toPromise();
  }

  getMenu(): Promise<Array<string>> {
    return this.menu$;
  }

  getFood(id: string): Food {
    const outer = this;
    return {
      id: id,
      imageUrl: `${baseImageUrl}${id}`,
      attribution$: this.http.get(
        baseAttributionUrl + id + '.txt',
        {responseType: 'text'}
      ),
    };
  }
}


