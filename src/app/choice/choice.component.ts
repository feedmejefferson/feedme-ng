import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'; 
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  choice$: Promise<Array<Food>>;
  private navEndSubscription;

  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private location: Location,
    private router: Router
  ) { 
  }


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
    const id1 = this.route.snapshot.paramMap.get('id1');
    const id2 = this.route.snapshot.paramMap.get('id2');
    this.choice$ = this.foodService.getChoice(id1, id2);
  }

}

