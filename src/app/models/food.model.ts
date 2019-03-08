import { Observable, EMPTY } from 'rxjs';

export class Food {
  id: string;
  imageUrl?: string;
  attribution$?: Observable<string> = EMPTY;
}
