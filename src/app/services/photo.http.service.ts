import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoService } from './photo.service';

import { environment } from '../../environments/environment';

const baseUrl = environment.basePhotoUrl;
const baseImageUrl: string = environment.baseFoodUrl + 'images/';

@Injectable(
  {providedIn: 'root'}
)

export class PhotoHttpService implements PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(baseUrl).pipe(map(
      object => Object.values(object)  // convert object of properties to array of values
    ));
  }
  createPhoto(photo: Photo){
    return this.http.post<Photo>(baseUrl, photo).subscribe();
    //TODO -- do I need to update the id in the posted object on a real rest server?
    // ... subscribe(id => { photo.id=id;this.updatePhoto(photo) });
  }
  updatePhoto(photo: Photo){
    return this.http.put<Photo>(baseUrl + photo.id, photo).subscribe();
  }
  deletePhoto(photoId: string){
    this.http.delete<Photo>(baseUrl + photoId).subscribe();
  }
  getPhoto(photoId: string): Observable<Photo>  {
    return this.http.get<Photo>(baseUrl + photoId);
  }

  getImageUrl(photoId: string): string {
    return baseImageUrl + photoId;
  }
}
