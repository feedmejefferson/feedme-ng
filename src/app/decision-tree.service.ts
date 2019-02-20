import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FoodNode } from './food-node';
import { Observable } from 'rxjs';
import { Leaf, Branch, MappedLeaf, TreeScaler } from './decision-tree';

const baseUrl: string = environment.baseFoodUrl;

export function getRandomIndex(setSize: number): number {
  return Math.floor(Math.random() * setSize);
}

@Injectable({
  providedIn: 'root'
})
export class DecisionTreeService {

  treeMap$: Promise<Branch>;

  constructor(private http: HttpClient) { 
    this.treeMap$ = this.http.get<Branch>(baseUrl + 'meta/tree.json').toPromise();
  }

  /**
   * @step: this needs to be the index of the node in the tree map
   * @branch: is this the first (0) food option to be offered, or the second (1)
   */
  getChoiceRoute(step: number, branch: number): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => { 
      this.treeMap$.then(treeMap => {
        // First we get the new step or node address for the forwarding route
        // This will always be double the current node address plus 0 or 1 for
        // the input side/branch number
        let nodeAddress = step * 2 + branch;
        let choiceRoute: string[] = [ 'cb' ];
        choiceRoute.push(<unknown>nodeAddress as string);
        // Now get the node that this route will forward to
        let node: Branch = TreeScaler.getBranchAt(treeMap, TreeScaler.integerToAddress(nodeAddress)) as Branch;
        // and for each of its children, get a representative image
        // unless of course it already happens to be a terminal node...
        // for now we'll just reroute terminal nodes to the food page for that food
        if(!node.children) {
          resolve([ 'food' , (<Leaf><unknown>node).value ]); 
        } else {
          let randomAddress = 
            TreeScaler.integerToAddress(getRandomIndex(Number.MAX_SAFE_INTEGER));
          let name: string;

          // choose items from each branch that are similar in all other 
          // dimensions but the one that we're trying to separate on
          name=TreeScaler.findLeafForPattern(node,[0],randomAddress).value;
          choiceRoute.push(name);
          
          name=TreeScaler.findLeafForPattern(node,[1],randomAddress).value;
          choiceRoute.push(name);
          
          resolve(choiceRoute)
        }  
      });
    });
  }
}
