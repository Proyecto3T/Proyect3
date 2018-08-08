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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { isLoggedGuardService } from '../services/routesGuard.service';
import { isnotLoggedGuardService } from '../services/isNotLogged.service';




export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component:HomeComponent},
  { path:'signup', component:SignupFormComponent},
  { path:'login', component:LoginFormComponent},
  {path:'profile', component:ProfileComponent, canActivate:[isLoggedGuardService]},
  {path:'valoration', component:ValorationComponent, canActivate:[isLoggedGuardService]} ,
  {path:"new-match", component:NewMatchComponent, canActivate:[isLoggedGuardService]},
  {path:"chat", component:ChatComponent, canActivate:[isLoggedGuardService]},
  {path:"users", component:UsersComponent, canActivate:[isLoggedGuardService]},
  {path:"editProfile", component:EditProfileComponent, canActivate:[isLoggedGuardService]},
  { path: '**', redirectTo: '' }
];