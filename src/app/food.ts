import { Observable, EMPTY } from 'rxjs';

export class Food {
  image: string;
  url?: string;
  attribution$?: Observable<string> = EMPTY;
}
