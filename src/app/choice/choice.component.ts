import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';
import { ChoiceService } from '../choice.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'; 
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})

export class ChoiceComponent implements OnInit {

  choice: FoodOption[];
  private navEndSubscription;

  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private choiceService: ChoiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getChoice();
    this.navEndSubscription = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.getChoice();
      });
  }

  ngOnDestroy() {
    this.navEndSubscription.unsubscribe(); 
  }

  getChoice(): void {
    let ids: string[] = [];
    ids.push(this.route.snapshot.paramMap.get('id1'));
    ids.push(this.route.snapshot.paramMap.get('id2'));
    this.choice = ids.map(id => this.foodService.getFood(id))
    .map(food => {
      return {
        ...food, 
        choiceUrl$: this.choiceService.getChoice().then(c => "/choice/" + c.join("/")) 
      };
    });
  }

}

class FoodOption extends Food {
  choiceUrl$: Promise<string>
}
