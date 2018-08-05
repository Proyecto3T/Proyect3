import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private server: SessionService, public matchService:MatchService) { }
matches:Array<any>
  ngOnInit() {
   this.server.getMatches().subscribe( matches => {
    console.log(matches)
    this.matches=[];
    return this.matches = matches
   })
  }

  challange(id){
    this.server.challange(id).subscribe()
  }



}
