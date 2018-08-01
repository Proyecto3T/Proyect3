import { Component, OnInit, ViewChild } from "@angular/core";
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
<<<<<<< HEAD
  show: boolean = false;

=======
 winRate:number;
 played:number;
 wonMatches:number;
>>>>>>> d54808cfd5f270fbeb46a9f78b26fcf47e5fe041
  public chart = [];
  constructor(
    public sessionService: SessionService,
    private matchService: MatchService
  ) {
    this.user = sessionService.user;
  }

  ngOnInit() {
<<<<<<< HEAD
    this.sessionService.isLogged().subscribe(() => {
      this.user = this.sessionService.user;
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
=======
    this.sessionService
      .isLogged()
      .subscribe(() => { 
        this.user = this.sessionService.user;
        this.played= this.user.wonMatches+this.user.lostMatches
        this.wonMatches= this.user.wonMatches
        this.winRate= this.user.wonMatches/(this.user.wonMatches+this.user.lostMatches)
        var canvas = <HTMLCanvasElement>document.getElementById("canvas");
>>>>>>> d54808cfd5f270fbeb46a9f78b26fcf47e5fe041
      var ctx = canvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "radar",

        data: {
          labels: ["Drive", "Backhand", "Serve", "Volley", "Resistance"],
          datasets: [
            {
              label: "Your Statistics",
              data: [
                this.user.statisticsAverage.drive.length == 0
                  ? 5
                  : this.user.statisticsAverage.drive.reduce((a, b) => a + b) /
                    this.user.statisticsAverage.drive.length,
                this.user.statisticsAverage.backhand.length == 0
                  ? 5
                  : this.user.statisticsAverage.backhand.reduce(
                      (a, b) => a + b
                    ) / this.user.statisticsAverage.backhand.length,
                this.user.statisticsAverage.serve.length == 0
                  ? 5
                  : this.user.statisticsAverage.serve.reduce((a, b) => a + b) /
                    this.user.statisticsAverage.serve.length,
                this.user.statisticsAverage.volley.length == 0
                  ? 5
                  : this.user.statisticsAverage.volley.reduce((a, b) => a + b) /
                    this.user.statisticsAverage.volley.length,
                this.user.statisticsAverage.resistance.length == 0
                  ? 5
                  : this.user.statisticsAverage.resistance.reduce(
                      (a, b) => a + b
                    ) / this.user.statisticsAverage.resistance.length
              ],
              borderColor: "rgba(20, 29, 222, 1)",
              backgroundColor: "rgba(20, 29, 222, 0.2)"
            },
            {
              label: ["  Media"],
              data: [1, 2, 5, 8, 4],
              borderColor: "rgba(255, 99, 132, 0.2)",
              backgroundColor: "rgba(255, 99, 132, 0.2)"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
                
            }
        },
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

<<<<<<< HEAD
  showNewMatch() {
    this.show = !this.show;
  }
=======
>>>>>>> d54808cfd5f270fbeb46a9f78b26fcf47e5fe041
}
