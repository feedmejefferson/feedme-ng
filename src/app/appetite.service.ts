import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const baseUrl: string = environment.appetiteUrl;

@Injectable({
  providedIn: 'root'
})
export class AppetiteService {

  private appetite: any[] = [];
  private appetite$: Subject<Array<any>> = new Subject<Array<any>>();
  private timer: number = Date.now();

  constructor(private http: HttpClient) { 
    let filtered = this.appetite$.pipe(
      // wait ten seconds between clicks, send and clear out
      // click history after ten seconds of idle time
      debounceTime(10000),
    );
    filtered.subscribe(_ => this.postAppetite(_));
  }

  postChosen(chosen: any): void {
    this.appetite.push({...chosen, time: Date.now() - this.timer, hour: new Date().getHours()});
    this.appetite$.next(this.appetite);
    this.resetTimer();
  }

  resetTimer(): void {
    this.timer = Date.now();
  }

  flush(): void {
    this.postAppetite(this.appetite);
    this.appetite = [];
    this.appetite$.next(this.appetite);
  }

  postAppetite(app: any[]): void {
    if(app.length===0) return;
    this.http.post(baseUrl, app).toPromise().then(x=>console.log(x)).catch(e=>{});;
    // clear out the history that we've sent so we don't send duplicate clicks
    // ten seconds might be a bit aggressive for debouncing, but I don't want to lose
    // too many clicks to users who leave the page before we implement some sort of
    // local storage solution
    this.appetite=[];

  }

}
