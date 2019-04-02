import { Injectable, Inject } from '@angular/core';
import { Photo } from '../models/photo.model';
import { Observable } from 'rxjs';
import { catchError, throwIfEmpty, filter } from 'rxjs/operators';
import { PhotoService, PHOTO_READONLY_SERVICE } from './photo.service';

import { environment } from '../../environments/environment';

@Injectable(
  {providedIn: 'root'}
)

export class PhotoFallbackService implements PhotoService {

  constructor(
    @Inject(environment.photoServiceToken) private primary: PhotoService,
    @Inject(PHOTO_READONLY_SERVICE) private secondary: PhotoService
    ) { }

  getPhotos(): Observable<Photo[]> {
    return this.primary.getPhotos();
    //TODO -- how do we "fallback" on a list? Do we?
  }
  createPhoto(photo: Photo) {
    return this.primary.createPhoto(photo);
    //TODO -- or on a create... maybe fallback is the wrong term here
  }
  updatePhoto(photo: Photo) {
    return this.primary.updatePhoto(photo);
  }
  deletePhoto(photoId: string){
    this.primary.deletePhoto(photoId);
  }
  getPhoto(photoId: string): Observable<Photo>  {
    return this.primary.getPhoto(photoId).pipe(
      filter(x => !!x),
      throwIfEmpty(() => 'no photo for id, falling back to secondary source'),
      catchError(err => this.secondary.getPhoto(photoId)),
      );
  }
}
