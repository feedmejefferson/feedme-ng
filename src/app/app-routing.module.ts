import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceRedirect } from './choice/choice.redirect';
import { FoodComponent } from './food/food.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'choice', component: ChoiceRedirect },
  { path: '', component: ChoiceRedirect, pathMatch: 'full' },
  { path: 'choice/:step/:id1/:id2', component: ChoiceComponent },
  { path: 'food/:id1', component: FoodComponent },
  //{ path: '', redirectTo: '/choice', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
