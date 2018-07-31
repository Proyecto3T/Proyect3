import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  public chart = [];
  constructor( ) { 
   
  }

  ngOnInit() {
    var canvas = <HTMLCanvasElement> document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
    this.chart =new Chart(ctx, {
    type: 'radar',
    
    data: {
      labels: ["Drive", "Backhand", "Serve", "Volley", "Resistance"],
      datasets: [
        {
         label: "Your Statistics",
          data: [2,5,7,3,5],
          borderColor: 'rgba(20, 29, 222, 1)',
          backgroundColor: 'rgba(20, 29, 222, 0.2)',

        },
        {
          label: "  Media",
          data: [1,2,5,8,4],
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',

        },
      ]
    },
  options :{
    scale: {
        // Hides the scale
        ticks: {
          // changes here
          max:10,
          min:0
      },
     
      
    }
},

  })
  }
  
 
                
}
