import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { HeaderComponent } from './header/header.component';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceRedirect } from './choice/choice.redirect';
import { AboutComponent } from './about/about.component';
import { FoodComponent } from './food/food.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChoiceComponent,
    ChoiceRedirect,
    AboutComponent,
    FoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule,
    //AngularFireAuthModule,
    NgbCollapseModule,
    NgbDropdownModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
