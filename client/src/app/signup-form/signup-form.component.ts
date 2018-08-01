import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router'
import {AuthService,  FacebookLoginProvider,  GoogleLoginProvider} from 'angular-6-social-login';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(public sessionService: SessionService, public router:Router, private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  // socialSignup(){
  //   this.sessionService.loginWithGoogle()
  // }
  signup(username:string, password:string, email:string){
    console.log("signup....");
    this.sessionService.signup(username,password,email).subscribe( (user:any) =>{
      console.log(`WELCOME USER ${user.username}, register OK`);
      console.log(user);
      this.router.navigate(['/profile']);
    });
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.sessionService.signup(userData.name,userData.id,userData.email).subscribe( (user:any) =>{
          console.log(`WELCOME USER ${user.username}, register OK`);
          console.log(user);
          this.router.navigate(['/profile']);
        });
        // Now sign-in with userData            
      }
    );
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
          this.router.navigate(['/profile']);
        });
        // Now sign-in with userData            
      }
    );
  }
    
}
