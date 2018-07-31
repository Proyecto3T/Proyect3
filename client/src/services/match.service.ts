import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs";
import { map } from "rxjs/operators";

const url = environment.BASEURL;

@Injectable({
  providedIn: "root"
})
export class MatchService {
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
}
