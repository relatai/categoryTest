import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import L from "leaflet";
import { DadosProvider } from '../../providers/dados/dados';

@IonicPage()
@Component({
  selector: 'page-mapa-categoria2',
  templateUrl: 'mapa-categoria2.html',
  providers:[
    DadosProvider
  ]
})
export class MapaCategoria2Page {
  public obj:any;
  private overlayMaps;
  public map;
  public report;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dadosprovider: DadosProvider) {
  }
  ionViewDidLoad() {
    this.dadosprovider.getData2().subscribe(data => {
      this.obj = data;
    },
    err => console.log("error is "+err), // error
      () => this.leafletMap()
    );
  }
  leafletMap(){
    this.map = L.map('mapId').setView([-22.545287, -44.069668], 4);
    for(let i in this.obj ){ 
      //carregando variável categoria com o nomme das categoria
      let categoria = this.obj[i].name;
      //carregando a variável report com todos os reports dessa categoria 
      this.report = this.obj[i].reports;
      //criando os markers dessa categoria e guardando em overlayMaps
      for(let r in this.report){
        this.overlayMaps= {categoria : new L.marker(this.report[r].lat, this.report[r].long).bindPopup(this.report[r].desc)};
      }
    } 
    L.control.layers(this.overlayMaps).addTo(this.map);  
       L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 30,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoicHJwb2xpdmVpcmEiLCJhIjoiY2pkYmtrNnVqM3V4dzJxcXJub2VobmV5diJ9.IcROwCtjokEYzIpr_vcdBw'
      }).addTo(this.map);
  } 
}
