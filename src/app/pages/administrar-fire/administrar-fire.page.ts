import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-administrar-fire',
  templateUrl: './administrar-fire.page.html',
  styleUrls: ['./administrar-fire.page.scss'],
})
export class AdministrarFirePage implements OnInit {

  persona = new FormGroup({
    rut: new FormControl('',[Validators.required,Validators.pattern("[0-9]{7,8}-[0-9kK]{1}")]),
    nombre: new FormControl('',[Validators.required,Validators.pattern("[A-Za-z ]{3,}")]),
    correo: new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9.]+(@duocuc.cl)")]),
    contrasena: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")]),
    valida_contrasena: new FormControl('',[Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")])
  });
  usuarios:any[] = [];
  botonModificar: boolean = true;

  constructor(private fireService: FireService) { 
    this.persona.get("rut")?.setValidators([Validators.required,Validators.pattern("[0-9]{7,8}-[0-9kK]{1}"),this.validarRut()]);
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  validarEdad18(fecha_nacimiento: string){
    var edad = 0;
    if(fecha_nacimiento){
      const fecha_date = new Date(fecha_nacimiento);
      const timeDiff = Math.abs(Date.now() - fecha_date.getTime());
      edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    if(edad>=18){
      return true;
    }else{
      return false;
    }
  }

  validarRut():ValidatorFn{
    return () => {
      const rut = this.persona.controls.rut.value;
      const dv_validar = rut?.replace("-","").split("").splice(-1).reverse()[0];
      let rut_limpio = [];
      if(rut?.length==10){
        rut_limpio = rut?.replace("-","").split("").splice(0,8).reverse();
      }else{
        rut_limpio = rut?.replace("-","").split("").splice(0,7).reverse() || [];
      }
      let factor = 2;
      let total = 0;
      for(let num of rut_limpio){
        total = total + ((+num)*factor);
        factor = factor + 1;
        if(factor==8){
          factor = 2;
        }
      }
      var dv = (11-(total%11)).toString();
      if(+dv>=10){
        dv = "k";
      }
      if(dv_validar!=dv.toString()) return {isValid: false};
      return null;
    };
  }

  cargarUsuarios(){
    // Observable se suscribe
    this.fireService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  async registrar(){
    // Sacarle el valor al formGroup con el .value
    if (await this.fireService.crearUsuario(this.persona.value)){
      alert("Usuario registrado")
      this.persona.reset();
    } else {
      alert("Usuario YA existe")
    }
  }

  async buscar(usuario:any){
    this.persona.setValue(usuario);
    this.botonModificar = false;
  }

  async modificar(){
    this.fireService.updateUsuario(this.persona.value).then(() => {
      alert("Usuario Modificado!");
      this.persona.reset();
    }).catch(error => {
      console.log("Error: " + error);
    });
  }

  async eliminar(rut_eliminar:string){
    this.fireService.deleteUsuario(rut_eliminar);
  }
}