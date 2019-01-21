import { Observable } from 'rxjs';

export class Food {
  id: number;
  imageFileName: string;
  url?: string;
  attribution?: Observable<string>;
}
