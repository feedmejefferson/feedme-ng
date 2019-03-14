import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../models/food.model';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import { environment } from '../../environments/environment';
import { PhotoHttpService } from './photo.http.service';

const baseUrl: string = environment.baseFoodUrl;
const baseImageUrl: string = baseUrl + 'images/';
const baseAttributionUrl: string = baseUrl + 'attributions/';
const attributionHeaders = { responseType: 'text' };

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  menu$: Promise<Array<string>>;

  constructor(private http: HttpClient, @Inject(environment.photoServiceToken) private photoService: PhotoService) {
    this.menu$ = this.http.get<Array<string>>(baseUrl + 'meta/menu.json').toPromise();
  }

  getMenu(): Promise<Array<string>> {
    return this.menu$;
  }

  getFood(id: string): Food {
    const outer = this;
    return {
      id: id,
      photo$: this.photoService.getPhoto(id),
      imageUrl: this.photoService.getImageUrl(id)
    };
  }
}


