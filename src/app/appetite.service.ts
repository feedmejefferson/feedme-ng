import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const baseUrl: string = environment.appetiteUrl;

@Injectable({
  providedIn: 'root'
})
export class AppetiteService {

  private appetite: any[] = [];
  private timer: number = Date.now();
  constructor(private http: HttpClient) { }

  postChosen(chosen: any): void {
    this.appetite.push({...chosen, time: Date.now() - this.timer});
    this.resetTimer();
    if(this.appetite.length % 5===4) this.postAppetite();
  }

  resetTimer(): void {
    this.timer = Date.now();
  }

  postAppetite(): void {
    console.log("posting appetite: " + JSON.stringify(this.appetite));
    this.http.post(baseUrl, this.appetite).toPromise().then(x=>console.log(x)).catch(e=>{});;
  }

}
