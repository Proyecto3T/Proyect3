import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from "../environments/environment";

import { map, catchError } from "rxjs/operators";
import { Observable } from "../../node_modules/rxjs";
import { of } from "rxjs";
import * as firebase from "firebase/app";
import * as io from "socket.io-client";
import {
  SnotifyService,
  SnotifyToastConfig,
  SnotifyPosition
} from "../../node_modules/ng-snotify";

interface Message {
  origin: string;
  content: string;
}

const url = environment.BASEURL;

interface UserObject {
  _id: string;
  username: string;
}

@Injectable({
  providedIn: "root"
})
export class SessionService {
  popValue = false;
  user: UserObject;
  socialUser: Observable<firebase.User>;
  matches: Array<any>;
  socket: io.Socket;
  messages: Array<Message> = [];

  title = "Notification"
  style = "material";
  notifytitle = "Te han retado!";
  body = "Te han retado!";
  timeout = 3000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }
  onPrompt() {
    const { timeout, closeOnClick, ...config } = this.getConfig();
    return {
      ...config,
      buttons: [
        {
          text: "Yes",
          action: toast => console.log("Said Yes: " + toast.value)
        },
        {
          text: "No",
          action: toast => {
            console.log("Said No: " + toast.value);
            this.snotifyService.remove(toast.id);
          }
        }
      ]
    };
  }
  options: object = { withCredentials: true };

  constructor(private http: Http, private snotifyService: SnotifyService) {
    // this.socialUser = afAuth.authState;
    this.isLogged().subscribe();
    this.socket = io("localhost:3000");
    this.socket.on("connect", () => console.log("Connected to WS"));

    // Save messages into array as they arrive from server
    this.socket.on("matches", data => {
      // Actually push the message when arrives
      this.matches = data;
    });
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
    return this.http
      .post(`${url}/api/profiles/valoration`, valorations, this.options)
      .pipe(
        map((res: Response) => {
          let user = res.json();
          console.log(user);
          this.user = user;
          return this.user;
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  isRegistered(userdata): Observable<object> {
    const username = userdata.username;
    const password = userdata.password;
    const email = userdata.email;
    const id = userdata.id;
    return this.http
      .post(
        `${url}/api/auth/search`,
        { username, password, email, id },
        this.options
      )
      .pipe(
        map((res: Response) => {
          let user = res.json();
          this.user = user;
          return this.user;
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  popVal() {
    this.popValue = !this.popValue;
  }

  getMatches() {
    return this.http.get(`${url}/api/matches`, this.options).pipe(
      map(matches => {
        console.log(matches);
        this.matches = [];
        return (this.matches = matches.json());
      })
    );
  }

  challange(id) {
    let notification = this.onPrompt();
    return this.http
      .post(`${url}/api/auth/notify/${id}`, { notification })
      .pipe(
        map((res: Response) => {
          // let user = res.json();
          // this.user = user;
          return;
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }
}
