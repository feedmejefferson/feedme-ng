import { PHOTO_FIRESTORE_SERVICE } from '../app/services/photo.service';
export const environment = {
  production: false,
  baseFoodUrl: 'https://storage.googleapis.com/feedme-stage.appspot.com/',
  baseImageUrl: 'https://storage.googleapis.com/feedme-stage.appspot.com/images/',
  basePhotoUrl: 'not-used',
  appetiteUrl: 'https://us-central1-feedme-stage.cloudfunctions.net/appetite',
  photoServiceToken: PHOTO_FIRESTORE_SERVICE,
  baseReadOnlyPhotoUrl: 'https://storage.googleapis.com/feedme-stage.appspot.com/photos/',
  firebase: {
    apiKey: 'AIzaSyCtjvY1oF7VFBpq1rWDt6bjfYKr1_OiHMk',
    authDomain: 'feedme-stage.firebaseapp.com',
    databaseURL: 'https://feedme-stage.firebaseio.com',
    projectId: 'feedme-stage',
    storageBucket: 'feedme-stage.appspot.com',
    messagingSenderId: '448474045438'
  }
};
