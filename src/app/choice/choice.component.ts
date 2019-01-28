import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';
import { AppetiteService } from '../appetite.service';
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
  private start: number = Date.now();

  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private appetiteService: AppetiteService,
    private choiceService: ChoiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showChoice();
    this.navEndSubscription = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.showChoice();
      });
  }

  ngOnDestroy() {
    this.appetiteService.flush();
    this.navEndSubscription.unsubscribe(); 
  }

  showChoice(): void {
    let ids: string[] = [];
    let step: number = +this.route.snapshot.paramMap.get('step');
    ids.push(this.route.snapshot.paramMap.get('id1'));
    ids.push(this.route.snapshot.paramMap.get('id2'));
    this.choice = ids.map(id => this.foodService.getFood(id))
    .map(food => {
      return {
        ...food, 
        choiceUrl$: this.choiceService.getChoice().then(c => `/choice/${step+1}/` + c.join("/")) 
      };
    });
  }

  logChoice(id: string): void {
    let step: number = +this.route.snapshot.paramMap.get('step');
    this.appetiteService.postChosen({
      step: step,
      chosen: id, 
      notChosen: (id==this.choice[0].id) ? this.choice[1].id : this.choice[0].id,
      position: (id==this.choice[0].id) ? 0 : 1
    });
  }

}

class FoodOption extends Food {
  choiceUrl$: Promise<string>
}
