import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbCollapseModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { HeaderComponent } from './header/header.component';
import { ChoiceComponent } from './choice/choice.component';
import { ChoiceRedirectComponent } from './choice/choice.redirect';
import { AboutComponent } from './about/about.component';
import { FoodComponent } from './food/food.component';
import { ConsentComponent } from './consent/consent.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoComponent } from './components/photo/photo.component';

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
