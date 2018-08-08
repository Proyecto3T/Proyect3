import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "../../node_modules/@angular/router";
import { SessionService } from "./session.service";
import { Observable } from "../../node_modules/rxjs";
import { Injectable } from "../../node_modules/@angular/core";
import { map } from "../../node_modules/rxjs/operators";

@Injectable({
  providedIn:"root"
})
export class isnotLoggedGuardService implements CanActivate {
  constructor(public sessionService: SessionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): Observable<boolean> {
    return this.sessionService.isLogged().pipe(
      map(user => {
        if (user) return false;
        else return true;
      })
    );
  }
}