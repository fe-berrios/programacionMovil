import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  correo: string ="";
  contrasena: string = "";

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  // Método asociado al boton para hacer un login
  async login(correo: string, contrasena: string){
    if (await this.usuarioService.authUsuario(correo, contrasena)){
      console.log("Usuario autentificado!");
      this.router.navigate(['/home']);
    } else {
      console.log("Usuario no se pudo autentificar.");
    }
  }

}