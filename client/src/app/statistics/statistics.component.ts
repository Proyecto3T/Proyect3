import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { SessionService } from "../../services/session.service";
import { MatchService } from '../../services/match.service';
import { ObjectUnsubscribedError } from '../../../node_modules/rxjs';
import { ProfileComponent } from '../profile/profile.component';
import { GraphsService } from '../../services/graphs.service';

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
    public matchService: MatchService,
    public draw :GraphsService
  ) 
  {
    this.user = sessionService.user;
  }

  ngOnInit() {
    this.user = this.sessionService.user;
    this.played= this.user.wonMatches+this.user.lostMatches
    this.wonMatches= this.user.wonMatches
    this.winRate= this.user.wonMatches/(this.user.wonMatches+this.user.lostMatches)
    this.sessionService
      .isLogged()
      .subscribe(() => { 
        this.user = this.sessionService.user;
        this.draw.printLine(this.user,"canvas2");
        this.draw.printRadar(this.user,"canvas1");
    });
  }

  matches: any;


}
