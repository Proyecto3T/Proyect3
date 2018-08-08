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

const url = environment.BASEURL;

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
      this.socket = io("http://localhost:3000");
      this.socket.on("connect", () => {
        console.log("Connected to WS");
        this.socket.on(`${user._id}`, data => {
          if (data.type == "challenge") {
            let notification = this.onPrompt(data.otherPlayerId, data.matchId);
            console.log(data);
            this.snotifyService.confirm(this.body, this.title, notification);
          }else if(data.type == "success"){
            this.snotifyService.success("Someone accepted you petition","Challange accepted")
          } else{
            this.snotifyService.error("Someone rejected your petition", "Challange not accepted")
          }
        });
        this.socket.on(`new-match`, () => {
          this.sessionService.getMatches().subscribe(matches => {
            this.matchService.matchesChange.emit(matches);
          });
        });
      });
    });
  }

  title = "Notification";
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

  
  onPrompt(playerId, matchId) {
    const { timeout, closeOnClick, ...config } = this.getConfig();
    return {
      ...config,
      buttons: [
        {
          text: "Yesssssss",
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
          text: "No",
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
    console.log(`Sending notify to -> ${otherPlayerId}`);
    this.socket.emit("notify", {
      type,
      otherPlayerId,
      playerId,
      matchId
    });
  }
  sendNewMatch() {
    this.socket.emit("new-match");
  }

  errorHandler(e) {
    console.log("SessionServiceError");
    console.log(e.message);
    console.log(e);
    return e;
  }
}
