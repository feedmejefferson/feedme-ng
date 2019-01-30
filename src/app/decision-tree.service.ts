import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FoodNode } from './food-node';
import { Observable } from 'rxjs';
import { Leaf, Branch, MappedLeaf, TreeScaler } from './decision-tree';

const baseUrl: string = environment.baseFoodImageUrl;

export function getRandomIndex(setSize: number): number {
  return Math.floor(Math.random() * setSize);
}

@Injectable({
  providedIn: 'root'
})
export class DecisionTreeService {

  treeMap$: Promise<Branch>;

  constructor(private http: HttpClient) { 
    this.treeMap$ = this.http.get<Branch>(baseUrl + 'tree.json').toPromise();
  }

  /**
   * @step: this needs to be the index of the node in the tree map
   * @branch: is this the first (0) food option to be offered, or the second (1)
   */
  getChoice(step: number, branch: number): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => { 
      this.treeMap$.then(treeMap => {
        // First we get the new step or node address for the forwarding route
        // This will always be double the current node address plus 0 or 1 for
        // the input side/branch number
        let nodeAddress = step * 2 + branch;
        let choice: string[] = [];
        choice.push(<unknown>nodeAddress as string);
        // Now get the node that this route will forward to
        let node: Branch = TreeScaler.getBranchAt(treeMap, TreeScaler.integerToAddress(nodeAddress)) as Branch;
        // and for each of its children, get a representative image
        // unless of course it already happens to be a terminal node...
        // in which case (for now) we just want to return an image of the food itself
        // with a link to the same page (including a step/address that doesn't change)
        if(!node.children) {
          choice.push((<Leaf><unknown>node).value);
          resolve(choice); // this will route to a single image url
        } else {
          [0,1].map(index => {
            let name: string;
            console.log(JSON.stringify(node.children));
            if(node.children[index]){
              //this branch has four child options, randomly grab one of the middle ones
              name=TreeScaler.bisectRight(node.children[index]).value;
            } else {
              //this is a terminal branch, revert to the nonrandom logic described above
              name=(<Leaf><unknown>node).value;
            }
            choice.push(name);
          });
        
          resolve(choice)
        }  
      });
    });
  }
}
