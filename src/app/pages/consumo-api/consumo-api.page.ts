import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-consumo-api',
  templateUrl: './consumo-api.page.html',
  styleUrls: ['./consumo-api.page.scss'],
})
export class ConsumoApiPage implements OnInit {

  // Variable para almacenar la información que consume la API
  datos: any = [];
  dolar: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.consumirAPI();
    this.consumirDigimons();
  }

  // Vamos a crear un método que invoque al método get de la API:
  consumirAPI(){
    this.apiService.getDatos().subscribe((data:any)=>{
      // console.log(data);
      // console.log(data.dolar);
      // console.log(data.dolar.valor);
      this.dolar = data.dolar.valor;
    });
  }

  consumirDigimons(){
    this.apiService.getDigimons().subscribe((data:any)=>{
      console.log(data);
      console.log(data.content);
      // Content entrega una lista, se la asignamos a una lista entonces en nuestra pág.
      this.datos = data.content;
    })
  }

}
