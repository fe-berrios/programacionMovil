import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';
import * as geo from 'leaflet-control-geocoder';
// No es necesario asignarle una letra ya que se extiende de leaflet
import 'leaflet-routing-machine';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  // Se debe crear variable de mapa & geocoder
  private map: leaflet.Map | undefined;
  private geocoder: geo.Geocoder | undefined;

  // Variables que rescatan informacion del mapa
  latitud: number = 0;
  longitud: number = 0;
  direccion: string = "";
  distanciaMetros: number = 0;
  tiempoSegundos: number = 0;

  // Simulación de viajes
  // eventualmente se le cargan datos a la lista desde Storage
  viajes: any[] = [{
    "id": 1,
    "estudiante_conductor": "Armando Casas",
    "asientos_disponibles": 4,
    "nombre_destino": "Santa isabel sur, parque resindencial monteandino, puente alto",
    "latitud": -33.59,
    "longitud": -70.53,
    "distancia_metros": 5000,
    "tiempo_segundos": 900,
    "estado_viaje": "Pendiente",
    "pasajeros":[]
  },{
    "id": 2,
    "estudiante_conductor": "Rosa Cabezas",
    "asientos_disponibles": 1,
    "nombre_destino": "Santa isabel sur, parque resindencial monteandino, puente alto",
    "latitud": -33.59,
    "longitud": -70.53,
    "distancia_metros": 5000,
    "tiempo_segundos": 900,
    "estado_viaje": "En curso",
    "pasajeros":[20561718, 13706589]
  },{
    "id": 3,
    "estudiante_conductor": "Domingo Jueves",
    "asientos_disponibles": 0,
    "nombre_destino": "Santa isabel sur, parque resindencial monteandino, puente alto",
    "latitud": -33.59,
    "longitud": -70.53,
    "distancia_metros": 5000,
    "tiempo_segundos": 900,
    "estado_viaje": "Finalizado",
    "pasajeros":[23688133]
  },{
    "id": 4,
    "estudiante_conductor": "Destruyendo Edificios",
    "asientos_disponibles": 0,
    "nombre_destino": "Santa isabel sur, parque resindencial monteandino, puente alto",
    "latitud": -33.59,
    "longitud": -70.53,
    "distancia_metros": 5000,
    "tiempo_segundos": 900,
    "estado_viaje": "Pendiente",
    "pasajeros":[20561718, 13706589, 23688133, 13704752]
  }];

  constructor() { }

  ngOnInit() {
    // Se inicializa el mapa al abrir perfil.
    this.initMapa();
  }

  // Método que inicializa el mapa
  initMapa(){
    // 'locate' Ubicación actual utiliza TÚ ubicación de dispositivo.
    this.map = leaflet.map("mapDiv").locate({setView:true, maxZoom:16});
    //this.map = leaflet.map("map_html").setView([-33.608552227594245, -70.58039819211703],16);
    // Plantilla para que el mapa sea visible
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      // Se debe agregar el 'addTo' para vincular el mapa con la variable mapa
    }).addTo(this.map);

    // Agregar buscador de direcciones en el mapa
    this.geocoder = geo.geocoder({
      // '?' Son caracteristicas del buscador
      placeholder: "Ingrese dirección a buscar",
      errorMessage: "Dirección NO encontrada"
      // Se debe agregar el 'addTo(this.map)' para vincular el buscador con el mapa
    }).addTo(this.map);

    // Cuando el mapa se cargue y logre encontrar mi direccion actual
    this.map.on('locationfound', (e) => {
      // Rescata la latitud y longitud de mi ubicación
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);
    })

    // Vamos a realizar una acción con el buscador
    // () significa que es una función
    // => Agrega las variables que se encuentran afuera de su "método"
    this.geocoder.on('markgeocode', (e) => {
      // Aquí se llenan las variables anteriormente creadas con la informacion del buscador
      // Para visualizar las propiedades de la dirección del buscador
      console.log(e.geocode.properties)
      this.latitud = e.geocode.properties['lat'];
      this.longitud = e.geocode.properties['lon'];
      this.direccion = e.geocode.properties['display_name'];

      if (this.map){
        leaflet.Routing.control({
          // waypoints pide leaflet.latLng()
          // -33, -70 (lat, long de DuocUC Puente Alto)
          waypoints: [leaflet.latLng(-33.608552227594245, -70.58039819211703), leaflet.latLng(this.latitud, this.longitud)],
          fitSelectedRoutes: true
          // Cuando encuentre la ruta sucederá una acción (e)
        }).on('routesfound', (e)=>{
          // El evento (e) tiene una propiedad routes [] y en su primera posicion 0, tiene una propiedad summary con totalDistance/totalTime
          this.distanciaMetros = e.routes[0].summary.totalDistance;
          this.tiempoSegundos = e.routes[0].summary.totalTime;
        }).addTo(this.map);
      }
    })
  }
}
