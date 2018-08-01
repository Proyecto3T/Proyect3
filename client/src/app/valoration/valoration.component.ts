import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.scss']
})
export class ValorationComponent implements OnInit {
  statistics:object;
  constructor(private service : SessionService, private router:Router) { }

  ngOnInit() {
  }

  submitForm(drive,backhand,serve,volley,resistance){
    drive=Number(drive);
    backhand=Number(backhand);
    serve=Number(serve);
    volley=Number(volley);
    resistance=Number(resistance);
    if(drive>10 || drive<1|| backhand>10 || backhand<1 || serve>10 || serve<1 || volley>10 || volley<1 || resistance>10 || resistance<1 ){
      this.router.navigate(['/valoration']);
      return false
    }
    this.statistics={drive,backhand,serve,volley,resistance}
    console.log(this.statistics)
    this.service.postValorations(this.statistics).subscribe(() =>{
      this.router.navigate(['/profile']);
    })
  }

}
