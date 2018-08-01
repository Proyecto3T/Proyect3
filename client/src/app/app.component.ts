import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(public sessionService:SessionService, public matchService :MatchService){}
  logout(){
    this.sessionService.logout().subscribe()
  }

  toggleShow(){
    this.matchService.show = !this.matchService.show
  }
}
