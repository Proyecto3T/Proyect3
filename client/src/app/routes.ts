import { Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ValorationComponent } from './valoration/valoration.component';
import { NewMatchComponent } from './new-match/new-match.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';




export const routes: Routes = [
  {path:'home', component:HomeComponent},
  { path:'signup', component:SignupFormComponent},
  { path:'login', component:LoginFormComponent},
  {path:'profile', component:ProfileComponent},
  {path:'valoration', component:ValorationComponent} ,
  {path:"new-match", component:NewMatchComponent},
  {path:"chat", component:ChatComponent},
  {path:"users", component:UsersComponent}
];