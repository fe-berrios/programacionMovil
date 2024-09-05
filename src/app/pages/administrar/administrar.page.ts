import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  usuarios:any[] = [];

  persona = new FormGroup({
    //llave: valor,
    rut: new FormControl('',[Validators.pattern("[0-9]{7,8}-[0-9kK]{1}"),Validators.required]),
    nombre: new FormControl('',[Validators.minLength(3),Validators.required]),
    fecha_nacimiento: new FormControl ('',[Validators.required]),
    genero: new FormControl ('',Validators.required), 
    tiene_equipo: new FormControl('no',[Validators.required]),
    nombre_equipo: new FormControl('', [])
  });

  // El servicio (en 'services') nos permite trabajar la información: 
  // Se importa el DAO creado en 'services/usuario.service.ts'
  constructor(private usuarioService: UsuarioService) { }

  // ngOnInit es una funcion que funciona apenas carga la página
  ngOnInit() {
    // Apenas cargue la página guarda los usuarios del 'service' en la lista usuarios en la variable definida acá.
    this.usuarios = this.usuarioService.getUsuarios();
  }

  registrar(){
    // Se accede al objeto (this.usuarioService) y se accede al método (.createUsuario)
    // y se le da el objeto 'persona' al método.
    if(this.usuarioService.createUsuario(this.persona.value)){
      alert("Usuario creado con éxito!")
      // .reset limpia el formulario.
      this.persona.reset()
    } else {
      alert("Error! No se pudo crear el usuario.")
    }
  }

}
