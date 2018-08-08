import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { ViewChild} from "@angular/core";
import {ClrWizard} from "@clr/angular";
@Component({
  selector: 'app-valoration',
  templateUrl: './valoration.component.html',
  styleUrls: ['./valoration.component.scss']
})


   
export class ValorationComponent implements OnInit {
  @ViewChild("wizardmd") wizardMedium: ClrWizard;
  @ViewChild("wizardlg") wizardLarge: ClrWizard;
  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;


  mdOpen: boolean = true;
  lgOpen: boolean = false;
  xlOpen: boolean = false;
  statistics:object;
  valorate:boolean=false;
  constructor(private service : SessionService, private router:Router,public route:ActivatedRoute) { }
  id:any;
  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params['oponentId']
    })
  }

  submitForm(drive,backhand,serve,volley,resistance,userId){
    drive=Number(drive);
    backhand=Number(backhand);
    serve=Number(serve);
    volley=Number(volley);
    resistance=Number(resistance);
    if(drive>10 || drive<1|| backhand>10 || backhand<1 || serve>10 || serve<1 || volley>10 || volley<1 || resistance>10 || resistance<1 ){
      this.router.navigate(['/users']);
      return false
    }
    this.statistics={drive,backhand,serve,volley,resistance}
    console.log(this.statistics)
    this.service.postValorations(this.statistics,userId).subscribe(user =>{
      this.service.user = user;
      this.router.navigate(['/users']);
    })
  }

}
