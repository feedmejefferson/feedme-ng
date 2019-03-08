import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgbCollapseModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import { AboutComponent } from './components/about/about.component';
import { ChoiceComponent } from './components/choice/choice.component';
import { ChoiceRedirectComponent } from './components/choice/choice.redirect';
import { ConsentComponent } from './components/consent/consent.component';
import { FoodComponent } from './components/food/food.component';
import { HeaderComponent } from './header/header.component';
import { PhotoComponent } from './components/photo/photo.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChoiceComponent,
    ChoiceRedirectComponent,
    AboutComponent,
    FoodComponent,
    ConsentComponent,
    UserProfileComponent,
    PhotoListComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbDropdownModule
  ],
  entryComponents: [ ConsentComponent ],
  providers: [ { provide: FirestoreSettingsToken, useValue: {} } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
