import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private server: SessionService) { }
matches:Array<any>
  ngOnInit() {
   this.server.getMatches().subscribe( matches => {
    console.log(matches)
    this.matches=[];
    return this.matches = matches
   })
  }



}
