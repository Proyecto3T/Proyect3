import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { MatchService } from "../../services/match.service";
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  matches: Array<any>;
  constructor(
    private server: SessionService,
    public matchService: MatchService,
    public notifyService: NotifyService
  ) {
    this.matchService.matchesChange.subscribe(r => {
      this.matches = r;
    });
  }

  ngOnInit() {
    this.server.getMatches().subscribe(matches => {
      console.log(matches);
      this.matches = [];
      this.matches = matches
      console.log(this.matches)
    });
  }
}
