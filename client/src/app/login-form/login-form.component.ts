import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router';
import {AuthService,  FacebookLoginProvider,  GoogleLoginProvider} from 'angular-6-social-login';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  username:any;
  password:any;
  email:any;
  error:any;

  signIn:boolean=true;
  constructor(public sessionService:SessionService, public router: Router, private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  login(username:string, password:string){
    console.log("login....");
    this.sessionService.login(username,password).subscribe( user => {
      console.log(user);
      if(this.sessionService.user)this.router.navigate(['/profile']);
    });
  }
  

  public socialLogIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.sessionService.login(userData.name,userData.id).subscribe( (user:any) =>{
          console.log(`WELCOME USER ${user.username}, register OK`);
          console.log(user);
          if(this.sessionService.user)this.router.navigate(['/profile']);
        });
        // Now sign-in with userData            
      }
    );
  }


}
