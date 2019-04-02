import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food.model';
import { PhotoService, PHOTO_READONLY_SERVICE } from '../services/photo.service';
import { environment } from '../../environments/environment';

const baseUrl: string = environment.baseFoodUrl;

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  menu$: Promise<Array<string>>;

  constructor(private http: HttpClient, @Inject(PHOTO_READONLY_SERVICE) private photoService: PhotoService) {
    this.menu$ = this.http.get<Array<string>>(baseUrl + 'meta/menu.json').toPromise();
  }

  getMenu(): Promise<Array<string>> {
    return this.menu$;
  }

  getFood(id: string): Food {
    const outer = this;
    return {
      id: id,
      photo$: this.photoService.getPhoto(id)
    };
  }
}


