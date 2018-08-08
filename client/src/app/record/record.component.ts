import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  record:any;
  user:any;
  constructor(public matchService:MatchService, public sessionService:SessionService) {this.sessionService.isLogged().subscribe(user =>{
    this.user=user
   this.matchService.getRecord(user._id).subscribe(matches=>{
     this.record=matches;
     console.log(matches)
   })
  }) }
 
  ngOnInit() {
   this.sessionService.isLogged().subscribe(user =>{
     this.user=user
    this.matchService.getRecord(user._id).subscribe(matches=>{
      this.record=matches;
    })
   } )
    
  }
disable(matchId){
  
}
}
