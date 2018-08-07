import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MatchService } from '../../services/match.service';
import { NotifyService } from '../../services/notify.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private server: SessionService, public matchService:MatchService, public notifyService: NotifyService, private router:Router) { }
matches:Array<any>

  ngOnInit() {
    if(!this.server.user){ this.router.navigate(['/signup'])}
   this.server.getMatches().subscribe( matches => {
    console.log(matches)
    this.matches=[];
    return this.matches = matches
   })
  }

}
