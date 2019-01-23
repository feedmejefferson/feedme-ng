import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food';
import { Node } from './node';
import { environment } from '../environments/environment';

const baseUrl: string = environment.baseFoodImageUrl;
const baseAttributionUrl: string = baseUrl + 'attributions/';
const attributionHeaders = { responseType: 'text' };

export function getRandomIndex(setSize: number): number {
  return Math.floor(Math.random() * setSize);
}

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  menu$: Promise<Array<string>>;
  
  constructor(private http: HttpClient) { 
    this.menu$ = this.http.get<Array<string>>(baseUrl + 'menu.json').toPromise();
  }
  
  getFood(image: string): Food {
    let outer=this;
    return {
      image: image, 
      imageUrl: `${baseUrl}${image}`,
      attribution$: this.http.get(
        baseAttributionUrl + image + ".txt", 
        {responseType: 'text'}
      ),
      choiceUrl$: new Promise(function(resolve, reject) {
        outer.getNode(image).then(node => {
          let url = `/choice/${node.children[0].value}/${node.children[1].value}`;
          resolve(url);
        });
      })
    };
  }

  getChoice(image1: string, image2: string): Promise<Array<Food>> {
    return new Promise<Array<Food>>((resolve, reject) => {
      this.menu$.then(menu => {
        let choice: Food[] = [];
        choice.push(this.getFood(image1));
        choice.push(this.getFood(image2));
        resolve(choice);
      });
    });
  }
  
  getNode(image?: string): Promise<Node<string>> {
    return new Promise<Node<string>>((resolve, reject) => {
      this.menu$.then(menu => {
        const indexA = getRandomIndex(menu.length);    
        let indexB = getRandomIndex(menu.length);
        while(indexB === indexA) {
          indexB = getRandomIndex(menu.length);
        }
        let children: Node[] = [];
        children.push({value: menu[indexA]});
        children.push({value: menu[indexB]});
        resolve({value: image, children: children});
      });
    });
  }

}


