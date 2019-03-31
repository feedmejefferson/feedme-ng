import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgbCollapseModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

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
import { PHOTO_HTTP_SERVICE, PHOTO_READONLY_SERVICE, PHOTO_FIRESTORE_SERVICE } from './services/photo.service';
import { PhotoHttpService } from './services/photo.http.service';
import { PhotoFirestoreService } from './services/photo.firestore.service';
import { PhotoReadOnlyService } from './services/photo.readonly.service';
import { AttributionComponent } from './components/attribution/attribution.component';
import { ImageComponent } from './components/image/image.component';

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
    PhotoComponent,
    AttributionComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbDropdownModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  entryComponents: [ ConsentComponent ],
  providers: [ 
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: PHOTO_HTTP_SERVICE, useClass: PhotoHttpService },
    { provide: PHOTO_FIRESTORE_SERVICE, useClass: PhotoFirestoreService },
    { provide: PHOTO_READONLY_SERVICE, useClass: PhotoReadOnlyService },
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
