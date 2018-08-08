import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { MatchService } from "../../services/match.service";
import { NotifyService } from "../../services/notify.service";



@Component({
  selector: "app-my-matches",
  templateUrl: "./my-matches.component.html",
  styleUrls: ["./my-matches.component.scss"]
})
export class MyMatchesComponent  implements OnInit  {
  matches: any;
mdOpen:boolean=false;
match:any;

  constructor(
    public sessionService: SessionService,
    public matchService: MatchService,
    public notifyService:NotifyService
  ) { }



  ngOnInit() {
    this.sessionService
      .isLogged()
      .subscribe(() => this.getMatches(this.sessionService.user._id));
      $('.show').hide()
  }

  getMatches(id) {
    this.matchService.getMatches(id).subscribe(matches => {
      console.log(matches)
      console.log(this.showFinishedMatches(matches))
      this.matches = this.showFinishedMatches(matches);
    });
  }

  deleteMatch(id){
    this.matchService.deleteMatch(id).subscribe(() => {
      this.notifyService.sendNewMatch()
      this.getMatches(this.sessionService.user._id)
    })
  }

  showFinishedMatches(matches){
    let date = new Date;
    for(let i=0; i<matches.length;i++){
      if(matches[i].finish<date){
        matches[i].ended=true
      }
    }
    return matches
  }

finishMatch(match){
console.log(match)
$('.show').show()
this.mdOpen =true;
this.match=match;
}

  addResult(){
    
  }

  
}
