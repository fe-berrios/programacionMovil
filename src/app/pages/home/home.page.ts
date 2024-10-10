import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// Import de leaflet
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // Se crea variable que almacenará la información de 'localStorage'
  usuarioLocal: any;

  // navController similar a router, version antigua; igual sirve.
  constructor(private navController: NavController) {}

  ngOnInit(){
    // Rescatar usuario guardado en localStorage "usuario"
    this.usuarioLocal = JSON.parse(localStorage.getItem("usuario") || '');
  }

  logout(){
    localStorage.removeItem('usuario');
    this.navController.navigateRoot('/login')
  }

}
