import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private map: leaflet.Map | undefined;

  constructor() { }

  ngOnInit() {
    this.initMapa();
  }

  initMapa(){
    // Crea el mapa en el div 'mapDiv' y situate en la locación que estamos con un zoom de 16.
    this.map = leaflet.map("mapDiv").locate({setView:true, maxZoom: 16});
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);
  }
}
