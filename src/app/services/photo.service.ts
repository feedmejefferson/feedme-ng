import { Photo } from '../models/photo.model';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const PHOTO_SERVICE =  'PHOTO_SERVICE';
export const PHOTO_HTTP_SERVICE = new InjectionToken<string>('PHOTO_HTTP_SERVICE');
export const PHOTO_READONLY_SERVICE = new InjectionToken<string>('PHOTO_READONLY_SERVICE');
export const PHOTO_FIRESTORE_SERVICE = new InjectionToken<string>('PHOTO_FIRESTORE_SERVICE');

export interface PhotoService {
  getPhotos(): Observable<Photo[]>;
  createPhoto(photo: Photo): void;
  updatePhoto(photo: Photo): void;
  deletePhoto(photoId: string): void;
  getPhoto(photoId: string): Observable<Photo>;
}

