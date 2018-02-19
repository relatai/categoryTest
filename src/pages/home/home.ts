import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import L from "leaflet";
import { DadosProvider } from '../../providers/dados/dados';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    DadosProvider
  ]
})
export class HomePage {

  propertyList = [];
  center: L.PointTuple;
  map;

  constructor(public navCtrl: NavController, private dadosprovider: DadosProvider) {
  
  }

  ionViewDidLoad() {  
    this.dadosprovider.getData().subscribe(data => {
      //this.propertyList = data.properties;
      //const response = (data as any);
      this.propertyList = (data as any).properties;
      console.log(this.propertyList);
    },
    err => console.log("error is "+err), // error
      () => this.leafletMap()
    );
  }


  leafletMap(){

    this.map = L.map('mapId').setView([42.35663, -71.1109], 16);

    console.log("property" + this.propertyList.length);
    for (let property of this.propertyList) {
      console.log("Lat: " + property.lat + " Lon: " + property.long + " Cidade: " + property.city);
      L.marker([property.lat, property.long]).addTo(this.map)
      .bindPopup("Cidade: "+ property.city+"<br>Estado: "+property.state+"<br><img src='https://imagepng.org/wp-content/uploads/2017/05/botao-facebook-like-icone-1022x1024.png' style='width: 30px; height: 30px;'><img src='https://cdn.iconscout.com/public/images/icon/premium/png-512/unlike-bad-poor-326b9a6a7188c486-512x512.png' style='width: 32px; height: 32px;'>")
      .openPopup().on("dblclick",this.onMapClick);
      
    }

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 30,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1IjoicHJwb2xpdmVpcmEiLCJhIjoiY2pkYmtrNnVqM3V4dzJxcXJub2VobmV5diJ9.IcROwCtjokEYzIpr_vcdBw'
  	}).addTo(this.map);

  }

  onMapClick(e) {
      alert("Essas são suas coordenadas: " + e.latlng);
  }

}
