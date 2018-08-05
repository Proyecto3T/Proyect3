import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ProfileComponent } from '../profile/profile.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { GraphsService } from '../../services/graphs.service';
import  * as $ from 'jquery'


interface stats{
  name:string,
  played:number,
  wonMatches:number,
  winRate:number
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private sessionService:SessionService,public draw:GraphsService) { }
users:Array<any>;
stats:Array<stats>=[];
showProfile:boolean=false;
singleUser:any;
singleUserStats:stats={name:"string",
  played:0,
  wonMatches:0,
  winRate:0};

  ngOnInit() {
    this.hideStats()
    this.sessionService.getUsers().subscribe(users=> {
      this.users=users;
      for(let i=0; i<users.length;i++){
        let stat = {name:users[i].username, 
                        played:users[i].wonMatches+users[i].lostMatches,
                        wonMatches:users[i].wonMatches,
                        winRate:users[i].wonMatches/(users[i].wonMatches+users[i].lostMatches)}
                        this.stats.unshift(stat);
      }
      
    });
  }

  userStats(){
    this.hideStats()
    for(let i=0; i<this.users.length;i++){
      this.stats[i].name=this.users[i].username;
      this.stats[i].played=this.users[i].wonMatches+this.users[i].lostMatches
      this.stats[i].wonMatches=this.users[i].wonMatches
      this.stats[i].winRate=this.users[i].wonMatches/(this.users[i].wonMatches+this.users[i].lostMatches)
    }
  }

  seeUserProfile(name){
    for(let i=0;i<this.stats.length;i++){
      if(this.stats[i].name == name){
        this.singleUserStats = this.stats[i]
      }
    }
    console.log(this.singleUserStats)
    console.log(this.stats)

   this.singleUser = this.users.filter(user => user.username==name)
    this.draw.printRadar(this.singleUser[0],"canvas1")
    this.draw.printLine(this.singleUser[0],"canvas2")
  }

  showStats(name){
    this.seeUserProfile(name);
    $('#hidden-stats').show()
   
  }


  hideStats(){
    $('#hidden-stats').hide()
  }
}
