import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  public users: []
  constructor(public sessionService:SessionService) { }

  ngOnInit() {
    this.sessionService.getUsers().subscribe(users=> {
      this.users=users;
    });
  }

}
