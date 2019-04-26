import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ChoiceComponent } from './components/choice/choice.component';
import { ChoiceRedirectComponent } from './components/choice/choice.redirect';
import { FoodComponent } from './components/food/food.component';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ChoiceService } from './services/choice.service';
import { RandomChoiceService } from './services/random-choice.service';
import { DecisionTreeService } from './services/decision-tree.service';

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
  { path: 'user', component: UserProfileComponent },
  { path: 'login', component: UserProfileComponent },
  { path: 'photos', component: PhotoListComponent },
  { path: 'photos/new', component: PhotoComponent },
  { path: 'photos/:id', component: PhotoComponent },
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
