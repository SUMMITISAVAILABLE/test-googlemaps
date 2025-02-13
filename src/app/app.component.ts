import { Component, OnInit } from '@angular/core';
import { GooglemapsService } from './services/googlemaps.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  map: any;
  marker: any;
  externalDiv: any;
  datas: any = [];
  showInfo: boolean = false;
  clearId: any;
  input: any;

  constructor( public backendService: GooglemapsService) {}

  ngOnInit(): void {}

  trackMe() {
    this.sendData()
    if (navigator.geolocation) {
      this.clearId = navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      }, error => {
        console.log(error), {
          enableHighAccuracy: true
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  sendData() {
    let object = {IdUID: this.input};
    const formData = new FormData();
    formData.append('IdUID', this.input );
    this.backendService.login(formData).subscribe((data: any) => {
      console.log(data)
    }, (error: Error) => { 
      console.log(error)
    })
  }
  showTrackingPosition(position: GeolocationPosition) {
    this.showInfo = true;
    this.datas.push({latitude: position.coords.latitude, longitude: position.coords.longitude, created_at: new Date()})
    console.log(this.datas)
    const csvString = [
      [
        "Latitude",
        "Longitude",
        "Created_at"
      ],
      ...this.datas.map((item: { latitude: any; longitude: any; created_at: any; }) => [
        item.latitude,
        item.longitude,
        item.created_at
      ])
    ]
    .map(e => e.join(",")) 
    .join("\n");
  
    console.log(csvString);
  }
  stop() {
    navigator.geolocation.clearWatch(this.clearId);
    console.log('Stopped tracking successfully')
  }
  getValue(event: any) {
    this.input = event.target.value;
  }
}