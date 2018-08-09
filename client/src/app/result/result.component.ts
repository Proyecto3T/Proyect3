import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router';
import { ViewChild} from "@angular/core";
import {ClrWizard} from "@clr/angular";
import { MatchService } from '../../services/match.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @ViewChild("wizardmd") wizardMedium: ClrWizard;
  @ViewChild("wizardlg") wizardLarge: ClrWizard;
  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;
 mdOpen: boolean=true;
@Input() match:any;
  constructor(public service : SessionService, public router:Router, public matchService:MatchService, public notifyService:NotifyService) { }
oponent:any;
  ngOnInit() {

  }

  submitForm(user1,oponent1,user2,oponent2,){
    const oponent = this.match.players.filter(e => e._id != this.service.user._id)[0]
    
    const matchId = this.match._id
   $('.show').hide()
  user1 =Number(user1);
  oponent1 =Number(oponent1);
  user2 =Number(user2);
  oponent2 =Number(oponent2);
  let winner;
  let loser;
 if((user1+user2)>(oponent1+oponent2)){

   winner=this.service.user;
   loser=oponent;
 } else{
  winner=oponent;
  loser=this.service.user;
 } 
  this.matchService.setWinner( winner._id).subscribe()
  this.matchService.setLoser(loser._id).subscribe()
    this.matchService.finishMatch(matchId, winner,loser).subscribe(()=> {
      this.notifyService.finishMatch(oponent._id,matchId,"info")
    })
    
  }


}
