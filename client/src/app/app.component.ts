import { Component, OnInit, OnDestroy } from "@angular/core";
import { SessionService } from "../services/session.service";
import { MatchService } from "../services/match.service";
import { Observable } from "rxjs";
import {
  SnotifyService,
  SnotifyPosition,
  SnotifyToastConfig
} from "ng-snotify";
import { NotifyService } from "../services/notify.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "client";
  long: number = 0;
  constructor(
    public sessionService: SessionService,
    public matchService: MatchService,
    private snotifyService: SnotifyService,
    public notifyService: NotifyService
  ) {
    this.long = 0;
  }
  logout() {
    this.sessionService.logout().subscribe();
  }

  toggleShow() {
    this.matchService.show = !this.matchService.show;
  }

  ngOnInit() {
    this.long = 0;
    //this.navbar();
  }
  style = "material";
  // navbar() {
  //   let button = document.getElementById("cn-button");
  //   let wrapper = document.getElementById("cn-wrapper");
  //   let overlay = document.getElementById("cn-overlay");

  //   //open and close menu when the button is clicked
  //   var open = false;
  //   button.addEventListener("click", handler, false);
  //   button.addEventListener("focus", handler, false);
  //   wrapper.addEventListener("click", cnhandle, false);

  //   function cnhandle(e) {
  //     e.stopPropagation();
  //   }

  //   function handler(e) {
  //     if (!e) var e: any = window.event;
  //     e.stopPropagation(); //so that it doesn't trigger click event on document

  //     if (!open) {
  //       openNav();
  //     } else {
  //       closeNav();
  //     }
  //   }
  //   function openNav() {
  //     open = true;
  //     button.innerHTML = "-";
  //     overlay.classList.add("on-overlay");
  //     wrapper.classList.add("opened-nav");
  //   }
  //   function closeNav() {
  //     open = false;
  //     button.innerHTML = "+";
  //     overlay.classList.remove("on-overlay");
  //     wrapper.classList.remove("opened-nav");
  //   }
  //   document.addEventListener("click", closeNav);
  // }
}
