import { Component, OnInit, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
import { SessionService } from "../../services/session.service";
import { MatchService } from "../../services/match.service";
import * as $ from "jquery";
import { GraphsService } from "../../services/graphs.service";
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: any;
  show: boolean = false;
  stats: boolean = false;
  winRate: number;
  played: number;
  wonMatches: number;
  canvas: any = {};
 
  public chart = [];
  constructor(
    public sessionService: SessionService,
    private matchService: MatchService,
    private draw: GraphsService
  ) {
    this.user = sessionService.user;
  }

  ngOnInit() {
    this.sessionService.isLogged().subscribe(() => {
      this.user = this.sessionService.user;
      this.played = this.user.wonMatches + this.user.lostMatches;
      this.wonMatches = this.user.wonMatches;
      this.winRate =
        this.user.wonMatches / (this.user.wonMatches + this.user.lostMatches);
      this.draw.printRadar(
        this.sessionService.user,
        this.sessionService.user.username
      );
    });
    console.log(this.user);
  }

  matches: any;

  getMatches(id) {
    this.matchService.getMatches(id).subscribe(matches => {
      this.matches = matches;
    });
  }

  showNewMatch() {
    this.show = !this.show;
  }

  // hideStats(){
  //   $('#canvas').show()
  //   $('.middle-text').show()
  //   this.draw.printRadar(this.user,"canvas")
  // }

  // showStats(){
  //   $('.middle-text').hide()
  //   $('#canvas').hide()

  // }

}
