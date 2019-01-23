import { Observable, EMPTY } from 'rxjs';

export class Food {
  image: string;
  imageUrl?: string;
  attribution$?: Observable<string> = EMPTY;
  choiceUrl$?: Promise<string>;
}
