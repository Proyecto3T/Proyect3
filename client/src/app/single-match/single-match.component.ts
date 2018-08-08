import { Component, OnInit, Input, AfterContentInit } from "@angular/core";
import { MatchService } from "../../services/match.service";
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: "app-single-match",
  templateUrl: "./single-match.component.html",
  styleUrls: ["./single-match.component.scss"]
})
export class SingleMatchComponent implements OnInit{
  @Input() matchId: any;
  @Input() match: any;
  @Input() marker: marker;

  destination:any;
  constructor(public matchService: MatchService) {
    
    this.matchService.geolocate();
  }

  ngOnInit() {
   
  }


  showSingleMatch() {
    this.matchService.showSingleMatch1 = !this.matchService.showSingleMatch1;
  }
}
