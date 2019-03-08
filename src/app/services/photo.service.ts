import { Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const baseUrl: string = environment.baseFoodUrl;
const baseImageUrl: string = baseUrl + 'images/';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private firestore: AngularFirestore) { }

  getPhotos() {
    return this.firestore.collection<Photo>('photos').snapshotChanges();
  }
  createPhoto(photo: Photo){
    return this.firestore.collection<Photo>('photos').add(photo)
    .then(ref => {
      ref.update({id: ref.id});
      return ref;
    });
  }
  updatePhoto(photo: Photo){
    this.firestore.doc<Photo>('photos/' + photo.id).update(photo);
  }
  deletePhoto(photoId: string){
    this.firestore.doc<Photo>('photos/' + photoId).delete();
  }
  getPhoto(photoId: string): Observable<Photo>  {
    return this.firestore.doc<Photo>('photos/' + photoId).get().pipe(
      map(doc => doc.data() as Photo)
    );
  }

  getImageUrl(photoId: string): string {
    return baseImageUrl + photoId;
  }
}

