import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { SessionService } from "../../services/session.service";
import { MatchService } from '../../services/match.service';
import { ObjectUnsubscribedError } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  user: any;
  show: boolean = false;
  stats:boolean=false;
 winRate:number;
 played:number;
 wonMatches:number;
canvas:any={};
userEndedMatches:any;
  public chart = [];

  constructor(
    public sessionService: SessionService,
    public matchService: MatchService
  ) 
  {
    this.user = sessionService.user;
  }

  ngOnInit() {
    this.sessionService
      .isLogged()
      .subscribe(() => { 
        this.user = this.sessionService.user;
        
      this.matchService.showFinishMatches().subscribe( matches => {
    
     
        console.log(matches.filter(match => match))
        // console.log(matches[0]._author)
        // let matchesUser = matches.filter(match=> {
        //   match._author=this.user._id})
        //   console.log(matchesUser)
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas2");
        var ctx = this.canvas.getContext("2d");
        this.chart = new Chart(ctx, {
          type: 'line',
      data: {
        labels: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        datasets: [{ 
            data: [matches.filter(match =>{ 
              let date = new Date(match.finish)
              console.log(date.getMonth())
              if(match._author._id==this.user._id && date.getMonth()==0)
              {return match}}).length,
              matches.filter(match =>{ 
              let date = new Date(match.finish)
              console.log(date.getMonth())
              if(match._author._id==this.user._id && date.getMonth()==1)
              {return match}}).length,
              matches.filter(match =>{ 
              let date = new Date(match.finish)
              console.log(date.getMonth())
              if(match._author._id==this.user._id && date.getMonth()==2)
              {return match}}).length,
              matches.filter(match =>{ 
              let date = new Date(match.finish)
              if(match._author._id==this.user._id && date.getMonth()==3)
              {return match}}).length,
              matches.filter(match =>{ 
              let date = new Date(match.finish)
              if(match._author._id==this.user._id && date.getMonth()==4)
              {return match}}).length,
              matches.filter(match =>{ 
              let date = new Date(match.finish)
              if(match._author._id==this.user._id && date.getMonth()==5)
              {return match}}).length,
              matches.filter(match =>{ 
              let date = new Date(match.finish)
              if(match._author._id==this.user._id && date.getMonth()==6)
              {return match}}).length,
              matches.filter(match =>{ 
                let date = new Date(match.finish)
                if(match._author._id==this.user._id && date.getMonth()==7)
                {return match}}).length,
                matches.filter(match =>{ 
                  let date = new Date(match.finish)
                  if(match._author._id==this.user._id && date.getMonth()==8)
                  {return match}}).length,
                  matches.filter(match =>{ 
                    let date = new Date(match.finish)
                    if(match._author._id==this.user._id && date.getMonth()==9)
                    {return match}}).length,
                    matches.filter(match =>{ 
                      let date = new Date(match.finish)
                      if(match._author._id==this.user._id && date.getMonth()==10)
                      {return match}}).length,
                      matches.filter(match =>{ 
                        let date = new Date(match.finish)
                        if(match._author._id==this.user._id && date.getMonth()==11)
                        {return match}}).length,
            ],
            label: "Partidos Jugados",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true
        }
      }
    });
        })

        this.played= this.user.wonMatches+this.user.lostMatches
        this.wonMatches= this.user.wonMatches
        this.winRate= this.user.wonMatches/(this.user.wonMatches+this.user.lostMatches)
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas1");
      var ctx = this.canvas.getContext("2d");
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
          position:'left',
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

  printLine(){
  
  }
}
