import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router'
import {AuthService,  FacebookLoginProvider,  GoogleLoginProvider} from 'angular-6-social-login';
import * as  $ from 'jquery'




@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  username:any;
  password:any;
  email:any;

  constructor(public sessionService: SessionService, public router:Router, private socialAuthService: AuthService) { }

  ngOnInit() {

    $('.toggle').on('click', function() {
        $('.container').stop().addClass('active');
      });
      
      $('.close').on('click', function() {
        $('.container').stop().removeClass('active');
      })
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
          if(this.sessionService.user)this.router.navigate(['/profile']);
        });
        // Now sign-in with userData            
      }
    );
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
