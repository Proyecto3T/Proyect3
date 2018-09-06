import { Injectable } from "@angular/core";
import {
  SnotifyPosition,
  SnotifyToastConfig,
  SnotifyService
} from "../../node_modules/ng-snotify";
import { Http } from "../../node_modules/@angular/http";
import { map, catchError } from "rxjs/operators";
import { environment } from "../environments/environment";
import { of } from "rxjs";
import * as io from "socket.io-client";
import { SessionService } from "./session.service";
import { MatchService } from "./match.service";

const {BASEURL} = environment;

@Injectable({
  providedIn: "root"
})
export class NotifyService {
  socket: SocketIOClient.Socket;
  constructor(
    private http: Http,
    public snotifyService: SnotifyService,
    public sessionService: SessionService,
    public matchService: MatchService
  ) {
    this.sessionService.isLogged().subscribe(user => {
      this.socket = io(`${BASEURL}`);
      this.socket.on("connect", () => {
        console.log("Connected to WS");
        this.socket.on(`${user._id}`, data => {
          if (data.type == "challenge") {
            let notification = this.onPrompt(data.otherPlayerId, data.matchId, data.name,data.league);
            console.log(data);
            this.snotifyService.confirm(data.name + this.body,this.title, notification);
          }else if(data.type == "success"){
            this.snotifyService.success(`${data.name} accepted you petition`,"Challenge accepted")
          } else if (data.type =="error"){
            this.snotifyService.error(`${data.name} rejected your petition`, "Challenge not accepted")
          } else {
            this.snotifyService.info("You can see it in your record or check your mail", "Match finished")
          }
        });
        this.socket.on(`new-match`, () => {
          this.sessionService.getMatches().subscribe(matches => {
            this.matchService.matchesChange.emit(matches);
          });
        });
        this.socket.on("matches", data => {
          // Actually push the message when arrives
          this.sessionService.matches = data;
        });
      });
    });
  }

  title = "Notification";
  style = "material";
  notifytitle = "Te han retado!";
  body = " has send a challenge to you";
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

  
  onPrompt(playerId, matchId,name,league) {
    const { timeout, closeOnClick, ...config } = this.getConfig();
    return {
      ...config,
      buttons: [
        {
          text: "Accept",
          action: toast => {
            console.log("Said Yes: " + toast.value);
            this.matchService.addPlayer(playerId, matchId).subscribe(array => {
              this.sendChallange(playerId, matchId, "success")
              this.sendNewMatch()
              this.snotifyService.remove(toast.id);
            });
          }
        },
        {
          text: "Reject",
          action: toast => {
            console.log("Said No: " + toast.value);
            this.sendChallange(playerId, matchId, "error")
            this.snotifyService.remove(toast.id);
          }
        }
      ],
      placeholder: 'Enter "ng-snotify" to validate this input'
    };
  }

  sendChallange(otherPlayerId, matchId, type) {
    console.log(type);
    let playerId = this.sessionService.user._id;
    let name = this.sessionService.user.username;
    let league = this.sessionService.user.league;
    console.log(`Sending notify to -> ${otherPlayerId}`);
    this.socket.emit("notify", {
      type,
      otherPlayerId,
      playerId,
      matchId,
      name,
      league
    });
  }
  sendNewMatch() {
    this.socket.emit("new-match");
  }

 finishMatch(otherPlayerId, matchId, type) {
   console.log(type)
    let playerId = this.sessionService.user._id;
    this.socket.emit("finishMatch", {
      type,
      otherPlayerId,
      playerId,
      matchId
    });
  }

  errorHandler(e) {
    console.log("SessionServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
