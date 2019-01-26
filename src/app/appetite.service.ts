import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const baseUrl: string = environment.appetiteUrl;

@Injectable({
  providedIn: 'root'
})
export class AppetiteService {

  constructor(private http: HttpClient) { }

  postAppetite(appetite: any): void {
    this.http.post(baseUrl, appetite).toPromise().then(x=>console.log(x)).catch(e=>{});;
  }

}
