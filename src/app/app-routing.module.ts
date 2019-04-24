import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceRedirectComponent } from './choice/choice.redirect';
import { FoodComponent } from './food/food.component';
import { ChoiceService } from './choice.service';
import { RandomChoiceService } from './random-choice.service';
import { DecisionTreeService } from './decision-tree.service';

export const RANDOM_CHOICE_TOKEN = new InjectionToken<ChoiceService>('RandomChoiceService');
export const DECISION_TREE_TOKEN = new InjectionToken<ChoiceService>('DecisionTreeService');

const routes: Routes = [
  { path: '', component: ChoiceRedirectComponent, pathMatch: 'full', data: {requiredService: DECISION_TREE_TOKEN}},
  { path: 'ff', component: ChoiceRedirectComponent, data: {requiredService: RANDOM_CHOICE_TOKEN}},
  { path: 'ff/:step/:id1/:id2', component: ChoiceComponent, data: {requiredService: RANDOM_CHOICE_TOKEN}},
  { path: 'cb', component: ChoiceRedirectComponent, data: {requiredService: DECISION_TREE_TOKEN}},
  { path: 'cb/:step/:id1/:id2', component: ChoiceComponent, data: {requiredService: DECISION_TREE_TOKEN}},
  { path: 'food/:id1', component: FoodComponent },
  { path: 'about', component: AboutComponent },
  // { path: '', redirectTo: '/choice', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: RANDOM_CHOICE_TOKEN, useClass: RandomChoiceService },
    { provide: DECISION_TREE_TOKEN, useClass: DecisionTreeService }
  ]
})
export class AppRoutingModule { }
