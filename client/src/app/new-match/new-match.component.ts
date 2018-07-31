import { Component, OnInit, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '../../../node_modules/@agm/core';
import { google, Marker } from '../../../node_modules/@agm/core/services/google-maps-types';
import { MatchService } from '../../services/match.service';
import { Router } from '../../../node_modules/@angular/router';

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

export class NewMatchComponent implements OnInit {
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
  
  constructor(private matchService: MatchService, private router:Router) { }

  ngOnInit() {
  }
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
    this.matchService.createMatch(hour, date, lat, lng).subscribe(() => {
      this.router.navigate(['/profile']);
    })
  }
}
