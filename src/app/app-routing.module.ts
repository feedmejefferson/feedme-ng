import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChoiceComponent } from './choice/choice.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: ChoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
