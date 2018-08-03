import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs";
import { map } from "rxjs/operators";

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
  matches: any;
  matchId: string;
  match: any;
  marker: marker;
  showSingleMatch1:boolean =  false;
  show:boolean = false;
  options: object = { withCredentials: true };
  constructor(private http: Http) {}
  
  
  createMatch(hour, date, lat, lng) {
    return this.http
      .post(`${url}/api/matches/new`, { hour, date, lat, lng}, this.options)
      .pipe(map(res => res.json()));
  }

  getMatches(id){
    console.log(id)
    return this.http
      .get(`${url}/api/matches/${id}`, this.options)
      .pipe(map(res => res.json()));
  }

  getMatch(id){
    console.log(id)
    return this.http
      .get(`${url}/api/matches/single-match/${id}`, this.options)
      .pipe(map(res => res.json()));
  }

  toggleShow(){
    this.show = !this.show
  }
  
  showSingleMatch(matchId) {
    this.getMatch(matchId).subscribe(match => {
      this.match = match;
      this.showSingleMatch1 = !this.showSingleMatch1;
      this.matchId = matchId;
      this.marker = {lat: this.match.location.coordinates[0],
      lng: this.match.location.coordinates[1],
      label:"A" ,
      draggable: true}
    });
  }


  showFinishMatches(){
    return this.http
      .get(`${url}/api/matches/finish-matches`, this.options)
      .pipe(map(res => res.json()));
  }
  
}
