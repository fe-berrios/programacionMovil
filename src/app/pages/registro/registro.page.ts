import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  persona = new FormGroup({
    rut: new FormControl('',[Validators.pattern("[0-9]{7,8}-[0-9kK]{1}"),Validators.required]),
    nombre: new FormControl('',[Validators.minLength(3),Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    tipoUsuario: new FormControl(''),
    correo: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
    contrasenaConfirmar: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  //podemos crear métodos:
  public async registrar(){
    if (await this.usuarioService.createUsuario(this.persona.value)){
      this.router.navigate(['/login']);
      this.persona.reset();
      console.log("Usuario registrado!"); 
    }
  }
}