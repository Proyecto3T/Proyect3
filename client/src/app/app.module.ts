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
import { HomeComponent } from './home/home.component';
import { RecordComponent } from './record/record.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleMatchComponent } from './single-match/single-match.component';
import { ChatComponent } from './chat/chat.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from '../../node_modules/ng-snotify'
import { StatisticsComponent } from './statistics/statistics.component';
import { UsersComponent } from './users/users.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FileUploadModule} from "ng2-file-upload"
import {MatInputModule} from '@angular/material';
import { ResultComponent } from './result/result.component';
import {AgmDirectionModule} from "agm-direction";
import { LandingPageComponent } from './landing-page/landing-page.component'

// Configs 
export function getAuthServiceConfigs() {
let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("912413154126-em3a55n7drhrluj86nsv474vj0no3t6r.apps.googleusercontent.com")
      },
    ]
);
return config;
}





@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginFormComponent,
    ProfileComponent,
    ValorationComponent,
    NewMatchComponent,
    HomeComponent,
    RecordComponent,
    MyMatchesComponent,
    SingleMatchComponent,
    ChatComponent,
    StatisticsComponent,
    UsersComponent,
    EditProfileComponent,
    ResultComponent,
    LandingPageComponent,
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.GAPI,
      libraries: ['places', 'drawing', 'geometry']
    }),
    SocialLoginModule,
    ClarityModule,
    BrowserAnimationsModule,
    SnotifyModule,
    MatInputModule,
    AgmDirectionModule
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
