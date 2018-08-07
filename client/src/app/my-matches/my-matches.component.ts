import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { MatchService } from "../../services/match.service";
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: "app-my-matches",
  templateUrl: "./my-matches.component.html",
  styleUrls: ["./my-matches.component.scss"]
})
export class MyMatchesComponent implements OnInit {
  matches: any;
  constructor(
    public sessionService: SessionService,
    private matchService: MatchService,
    public notifyService:NotifyService
  ) {}

  ngOnInit() {
    this.sessionService
      .isLogged()
      .subscribe(() => this.getMatches(this.sessionService.user._id));
  }

  getMatches(id) {
    this.matchService.getMatches(id).subscribe(matches => {
      console.log(matches)
      this.matches = matches;
    });
  }

  deleteMatch(id){
    this.matchService.deleteMatch(id).subscribe(() => {
      this.notifyService.sendNewMatch()
      this.getMatches(this.sessionService.user._id)
    })
  }

  
}
