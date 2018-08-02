import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { MatchService } from "../../services/match.service";
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: "app-my-matches",
  templateUrl: "./my-matches.component.html",
  styleUrls: ["./my-matches.component.scss"]
})
export class MyMatchesComponent implements OnInit {
  matches: any;
  matchId: string;
  match: any;
  marker: marker;
  constructor(
    public sessionService: SessionService,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.sessionService
      .isLogged()
      .subscribe(() => this.getMatches(this.sessionService.user._id));
  }

  getMatches(id) {
    this.matchService.getMatches(id).subscribe(matches => {
      this.matches = matches;
    });
  }

  showSingleMatch(matchId) {
    this.matchService.getMatch(matchId).subscribe(match => {
      this.match = match;
      this.matchService.showSingleMatch = !this.matchService.showSingleMatch;
      this.matchId = matchId;
      this.marker = {lat: this.match.location.coordinates[0],
      lng: this.match.location.coordinates[1],
      label:"A" ,
      draggable: true}
    });
  }
}
