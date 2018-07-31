import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "../../node_modules/rxjs";
import { of } from "rxjs";
import * as firebase from "firebase/app";

const url = environment.BASEURL;

interface UserObject {
  _id: string;
  username: string;
}

@Injectable({
  providedIn: "root"
})
export class SessionService {
  user: UserObject;
  socialUser: Observable<firebase.User>;

  options: object = { withCredentials: true };

  constructor(private http: Http) {
    // this.socialUser = afAuth.authState;
    this.isLogged().subscribe();
  }

  // loginWithGoogle(){
  //   const provider = new firebase.auth.GithubAuthProvider()
  //   this.afAuth.auth.signInWithPopup(provider)
  // }

  // socialLogout(){
  //   this.afAuth.auth.signOut()
  // }
  isLogged() {
    return this.http.get(`${url}/api/auth/currentuser`, this.options).pipe(
      map((res: Response) => {
        this.user = res.json();
        console.log(`Automatically login ${this.user.username}`);
        return this.user;
      }),
      catchError(e => {
        console.log("You have to login first!");
        return of(e);
      })
    );
  }

  errorHandler(e) {
    console.log("SessionServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }

  signup(
    username: string,
    password: string,
    email: string
  ): Observable<object> {
    return this.http
      .post(
        `${url}/api/auth/signup`,
        { username, password, email },
        this.options
      )
      .pipe(
        map((res: Response) => {
          let data = res.json();
          this.user = data.user;
          return this.user;
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  login(username: string, password: string): Observable<object> {
    return this.http
      .post(`${url}/api/auth/login`, { username, password }, this.options)
      .pipe(
        map((res: Response) => {
          let user = res.json();
          this.user = user;
          return this.user;
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  logout() {
    return this.http.get(`${url}/api/auth/logout`, this.options).pipe(
      map((res: Response) => {
        this.user = null;
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  postValorations(valorations) {
    console.log(`${url}/api/profile/valoration`);
    return this.http
      .post(`${url}/api/profiles/valoration`, valorations, this.options)
      .pipe(
        map((res: Response) => {
          console.log("Sddfsdfsad");
          let user = res.json();
          this.user = user;
          return this.user;
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }
}
