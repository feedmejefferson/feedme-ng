import { Observable, EMPTY } from 'rxjs';
import { Photo } from './photo.model';

export class Food {
  id: string;
  photo$: Observable<Photo>;
}
