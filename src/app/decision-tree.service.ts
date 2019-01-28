import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FoodNode } from './food-node';
import { Observable } from 'rxjs';

const baseUrl: string = environment.baseFoodImageUrl;

export function getRandomIndex(setSize: number): number {
  return Math.floor(Math.random() * setSize);
}

@Injectable({
  providedIn: 'root'
})
export class DecisionTreeService {

  treeMap$: Promise<Array<FoodNode>>;

  constructor(private http: HttpClient) { 
    this.treeMap$ = this.http.get<Array<FoodNode>>(baseUrl + 'tree-map.json').toPromise();
  }

  /**
   * @step: this needs to be the index of the node in the tree map
   * @branch: is this the first (0) food option to be offered, or the second (1)
   */
  getChoice(step: number, branch: number): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => { 
      this.treeMap$.then(treeMap => {
        let node: FoodNode;
        let choice: string[] = [];
        if(step<0) {
          //handle the root bootstrap request for initial redirect
          node = treeMap[0];
          choice.push('0');
        } else {
          //step indicates the treemap index of the currently displayed choice
          //we need to return the next choice (set of options) for one of it's 
          //children (the one specified by branch)
          node = treeMap[step];
          if(node.children[branch]) {
            choice.push(`${node.children[branch]}`);
            node = treeMap[node.children[branch]];
          } else {
            // this child is a terminal branch, if they choose it, there are no more
            // options, have to decide what to do
            // TODO: for now let's just send them back to the start
            node = treeMap[0];
            choice.push('0');
          }
        } 
        // Now we want to add in some variety, we want to choose a food item randomly
        // from each of this nodes child branches, however, if one of the child branches
        // is terminal (meaning it represents a single food item) then randomness wouldn't
        // add any value and we can simply take the image name from the upper or lower half
        // of the current nodes names.
        // If we didn't care about variety, we could always simply return:
        //
        //choice.push(node.names[0]);
        //choice.push(node.names[2]);
        //
        //or more programatically:
        //
        //[0,1].map(index => choice.push(node.names[index*2]));
        
        [0,1].map(index => {
          let name: string;
          if(node.children[index]){
            //this branch has four child options, randomly grab one of the middle ones
            name=treeMap[node.children[index]].names[getRandomIndex(2)+1];
          } else {
            //this is a terminal branch, revert to the nonrandom logic described above
            name=node.names[index*2]
          }
          choice.push(name);
        });
        
        resolve(choice)
      });
    });
  }
}
