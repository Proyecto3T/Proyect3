import { Component, OnInit, ViewChild, ElementRef,NgZone, AfterContentInit } from '@angular/core';

import { MouseEvent, MapsAPILoader } from '../../../node_modules/@agm/core';
import { MatchService } from '../../services/match.service';
import { Router } from '../../../node_modules/@angular/router';
import { ClrWizard } from '../../../node_modules/@clr/angular';
import { NotifyService } from '../../services/notify.service';
import { FormControl } from '../../../node_modules/@angular/forms';


declare var google: any

interface marker {

  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})

export class NewMatchComponent implements OnInit{
    @ViewChild("wizardmd") wizardMedium: ClrWizard;
    @ViewChild("wizardlg") wizardLarge: ClrWizard;
    @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;
    @ViewChild("search") searchElementRef: ElementRef;
    hour:any;
    date:any;
    error:any;
    latitude: number;
    longitude: number;
    searchControl: FormControl;
    zoom:number=14;
    query:any;
    mdOpen: boolean = false;
    lgOpen: boolean = true;
    xlOpen: boolean = false;
  minDate:number;
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
  constructor(public matchService: MatchService, private router:Router, public notifyService:NotifyService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
      this.geolocate()
     }

  ngOnInit() {
    this.minDate = Date.now()
    this.geolocate()
  }

  // ngAfterContentInit() {
  //   this.mapsAPILoader.load().then(
  //     () => {
  //       const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, { types: []});

  //       autocomplete.addListener('place_changed', () => {
  //         this.ngZone.run(() => {
  //           const place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //           if (place.geometry === undefined || place.geometry === null ) {
  //             return;
  //           }

  //           const latitude = place.geometry.location.lat();
  //           const longitude = place.geometry.location.lng();
  //         });
  //       });
  //     }
  //   );
  // }

  mapClicked($event: MouseEvent, lat, lng) {
    lat.value = $event.coords.lat
    lng.value = $event.coords.lng
    this.markers = []
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  createMatch(hour, date, lat, lng){
    console.log(hour, date, lat, lng)
    this.matchService.toggleShow()
    this.matchService.createMatch(hour, date, lat, lng).subscribe(() => {
      this.notifyService.sendNewMatch()
      // this.router.navigate(['/profile']);
    })
  }

  viewWizard(){
    this.lgOpen= !this.lgOpen
  }

  // setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  
}
