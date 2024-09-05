import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //aquí podemos crear variables, contrantes, listas, arreglos, json, etc:
  //se crean con el nombre de la variable, su tipo = el valor;
  titulo: string = "PÁGINA DE LOGIN";
  numero: number = 5;
  decimal: number = 5.2;
  existe: boolean = true;
  fecha_hoy: Date = new Date();
  nombres: string[] = ["Pedro","Juan","Diego"];
  persona: any = {"nombre":"Jeison", "edad":25};


  //ngModel:
  email: string ="";
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Método asociado al boton para hacer un login
  login(){
    if(this.email=="mar.correar@duocuc.cl" && this.password=="Correa"){
      this.router.navigate(['/home'])
    }else{
      alert("Correo o contraseña INCORRECTOS!")
    }
  }

}