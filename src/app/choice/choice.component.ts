import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
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

export class ChoiceComponent implements OnInit, OnDestroy {

  choice: FoodOption[];
  private navEndSubscription;
  private start: number = Date.now();
  private choiceService: ChoiceService;

  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private appetiteService: AppetiteService,
    private injector: Injector,
    private router: Router
  ) {
    const serviceToken = route.snapshot.data['requiredService'];
    this.choiceService = injector.get<ChoiceService>(serviceToken);
  }

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

  // TODO: clean up variable names -- step is becoming more of an index into the treemap, so
  // something of a strategy specific context value, side (left/right, top/bottom) is really
  // an array index of 0 or 1 in the unlikely possible support of choices that include more
  // than two options -- in our map function below, id is the value and side is the index...
  // it all gets very confusing and unmaintainable quickly
  showChoice(): void {
    const step: number = +this.route.snapshot.paramMap.get('step');
    const ids: string[] = [];
    ids.push(this.route.snapshot.paramMap.get('id1'));
    if (this.route.snapshot.paramMap.get('id2')) {
      ids.push(this.route.snapshot.paramMap.get('id2'));
    }
    this.choice = ids.map(id => this.foodService.getFood(id))
    .map((food, side) => {
      return {
        ...food,
        choiceUrl$: this.choiceService.getChoiceRoute(step, side).then(c => '/' + c.join('/'))
      };
    });
  }

  choose(id: string, position: number): void {
    const step: number = +this.route.snapshot.paramMap.get('step');
    this.appetiteService.postChosen({
      step: step,
      chosen: id,
      notChosen: (id === this.choice[0].id) ? this.choice[1].id : this.choice[0].id,
      position: position
    });
  }

}

class FoodOption extends Food {
  choiceUrl$: Promise<string>;
}
