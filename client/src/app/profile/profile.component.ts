import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  matches:any;
  constructor(public sessionService: SessionService, private matchService:MatchService) { 
    
  }
  
  ngOnInit() {

    console.log(this.sessionService.isLogged());

    if(this.sessionService.user)this.getMatches(this.sessionService.user._id)
  }

  getMatches(id){
    this.matchService.getMatches(id).subscribe(matches => {
      this.matches = matches;
    })
  }
}
