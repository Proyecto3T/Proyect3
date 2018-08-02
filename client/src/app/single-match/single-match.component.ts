import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '../../services/match.service';

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})

export class SingleMatchComponent implements OnInit {
  @Input() matchId: any
  @Input() match: any;
  @Input() marker: marker
  constructor(public matchService:MatchService) { }

  ngOnInit() {
   
  }

  showSingleMatch(){
    this.matchService.showSingleMatch = !this.matchService.showSingleMatch ;
  }
}
