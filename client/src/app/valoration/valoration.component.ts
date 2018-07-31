import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.scss']
})
export class ValorationComponent implements OnInit {
  statistics:object;
  constructor(private service : SessionService) { }

  ngOnInit() {
  }

  submitForm(drive,backhand,serve,volley,resistance){
    drive=Number(drive);
    backhand=Number(backhand);
    serve=Number(serve);
    volley=Number(volley);
    resistance=Number(resistance);
    this.statistics={drive,backhand,serve,volley,resistance}
    console.log(this.statistics)
    this.service.postValorations(this.statistics);
  }

}
