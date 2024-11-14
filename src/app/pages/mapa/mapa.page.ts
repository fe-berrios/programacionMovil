import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  usuario: any = {};

  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
  }

}
