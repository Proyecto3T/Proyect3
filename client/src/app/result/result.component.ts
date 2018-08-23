import { Component, OnInit, Input } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "../../../node_modules/@angular/router";
import { ViewChild } from "@angular/core";
import { ClrWizard } from "@clr/angular";
import { MatchService } from "../../services/match.service";
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"]
})
export class ResultComponent implements OnInit {
  @ViewChild("wizardmd") wizardMedium: ClrWizard;
  @ViewChild("wizardlg") wizardLarge: ClrWizard;
  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;
  mdOpen: boolean = true;
  @Input() match: any;

  constructor(
    public service: SessionService,
    public router: Router,
    public matchService: MatchService,
    public notifyService: NotifyService
  ) {}
  players: any;
  ngOnInit() {
    this.players=this.match.players;
    console.log(
      this.match.players)
  }

  submitForm(matchWinner) {
    const oponent = this.match.players.filter(
      e => e._id != this.service.user._id
    )[0];

    const matchId = this.match._id;
    // $(".show").hide(); DIEGOOOO KE ISISTEEEEEEEE (Minyu baybe) BUGGGG DEL SCROLL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //this.mdOpen = false;
    let winner;
    let loser;
    if (matchWinner==this.service.user.username ){
      winner = this.service.user;
      loser = oponent;
    } else {
      winner = oponent;
      loser = this.service.user;
    }
    this.matchService.setWinner(winner._id).subscribe();
    this.matchService.setLoser(loser._id).subscribe();
    this.matchService.finishMatch(matchId, winner, loser).subscribe(() => {
      this.notifyService.finishMatch(oponent._id, matchId, "info");
    });
  }
}
