import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { SessionService } from "../../services/session.service";
import { MatchService } from "../../services/match.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: any;

  public chart = [];
  constructor(
    public sessionService: SessionService,
    private matchService: MatchService
  ) {
    this.user = sessionService.user;
  }

  ngOnInit() {
    // this.sessionService.isLogged().subscribe(() => this.getMatches(this.sessionService.user._id))
    this.sessionService.isLogged().subscribe(() => {
      this.user = this.sessionService.user;
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "radar",

        data: {
          labels: ["Drive", "Backhand", "Serve", "Volley", "Resistance"],
          datasets: [
            {
              label: "Your Statistics",
              data: [
                this.user.statistics.drive,
                this.user.statistics.backhand,
                this.user.statistics.serve,
                this.user.statistics.volley,
                this.user.statistics.resistance
              ],
              borderColor: "rgba(20, 29, 222, 1)",
              backgroundColor: "rgba(20, 29, 222, 0.2)"
            },
            {
              label: "  Media",
              data: [1, 2, 5, 8, 4],
              borderColor: "rgba(255, 99, 132, 0.2)",
              backgroundColor: "rgba(255, 99, 132, 0.2)"
            }
          ]
        },
        options: {
          scale: {
            // Hides the scale
            ticks: {
              // changes here
              max: 10,
              min: 0
            }
          }
        }
      });
    });
  }

  matches: any;

  getMatches(id) {
    this.matchService.getMatches(id).subscribe(matches => {
      this.matches = matches;
    });
  }
}
