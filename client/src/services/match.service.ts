import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs";
import { map } from "rxjs/operators";
import { SessionService } from "./session.service";
import { NotifyService } from "./notify.service";

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
const url = environment.BASEURL;

@Injectable({
  providedIn: "root"
})
export class MatchService {
  matchId: string;
  match: any;
  marker: marker;
  showSingleMatch1: boolean = false;
  show: boolean = false;
  options: object = { withCredentials: true };
  matchesChange: EventEmitter<any> = new EventEmitter();
  constructor(private http: Http, public sessionService:SessionService) {}

  createMatch(hour, date, lat, lng) {
    return this.http
      .post(`${url}/api/matches/new`, { hour, date, lat, lng }, this.options)
      .pipe(
        map(res => {
          // this.sessionService.getMatches().subscribe(matches=>{
            // this.matchesChange.emit(matches)
            
            
            return res.json();
            
          // })
          
        })
      );
  }

  getMatches(id) {
    return this.http
      .get(`${url}/api/matches/${id}`, this.options)
      .pipe(map(res => res.json()));
  }

  getMatch(id) {
    return this.http
      .get(`${url}/api/matches/single-match/${id}`, this.options)
      .pipe(map(res => res.json()));
  }

  toggleShow() {
    this.show = !this.show;
  }

  showSingleMatch(matchId) {
    this.getMatch(matchId).subscribe(match => {
      this.match = match;
      this.showSingleMatch1 = !this.showSingleMatch1;
      this.matchId = matchId;
      this.marker = {
        lat: this.match.location.coordinates[0],
        lng: this.match.location.coordinates[1],
        label: "A",
        draggable: true
      };
    });
  }

  deleteMatch(id) {
    return this.http
      .get(`${url}/api/matches/delete/${id}`, this.options)
      .pipe(map(res => res.json()));
  }
  showFinishMatches() {
    return this.http
      .get(`${url}/api/matches/finish-matches`, this.options)
      .pipe(map(res => res.json()));
  }

  addPlayer(playerId, matchId) {
    console.log("Hola");
    return this.http
      .post(
        `${url}/api/matches/addPlayer/${playerId}/${matchId}`,
        {},
        this.options
      )
      .pipe(map(res => res.json()));
  }
}
