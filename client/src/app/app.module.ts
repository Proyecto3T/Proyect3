import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './routes';
import { ProfileComponent } from './profile/profile.component';
import { ValorationComponent } from './valoration/valoration.component';


import { NewMatchComponent } from './new-match/new-match.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment.prod';






@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginFormComponent,
    ProfileComponent,
    ValorationComponent,
    NewMatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.GAPI
    }) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
