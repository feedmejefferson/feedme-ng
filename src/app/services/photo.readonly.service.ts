import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';
import { PhotoService } from './photo.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const baseUrl = environment.baseReadOnlyPhotoUrl;

@Injectable()
export class PhotoReadOnlyService implements PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    console.log("list operation not supported");
    return(of(null));
  }
  createPhoto(photo: Photo){
    console.log("create operation not supported");
    return(of(null));
  }
  updatePhoto(photo: Photo){
    console.log("update operation not supported");
    return(of(null));
  }
  deletePhoto(photoId: string){
    console.log("delete operation not supported");
  }
  getPhoto(photoId: string): Observable<Photo>  {
    return this.http.get<Photo>(baseUrl + photoId);
  }
}
