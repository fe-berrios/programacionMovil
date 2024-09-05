import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  //aquí podemos crear variables:
  //NOMBRE: TIPO = VALOR;
  //NOMBRE = Clase(VALOR);
  //required (sig obligatorio)
  //si hay validaciones q no encontramos debemos crearla
  persona = new FormGroup({
    //llave: valor,
    rut: new FormControl('',[Validators.pattern("[0-9]{7,8}-[0-9kK]{1}"),Validators.required]),
    nombre: new FormControl('',[Validators.minLength(3),Validators.required]),
    fecha_nacimiento: new FormControl ('',[Validators.required]),
    genero: new FormControl ('',Validators.required), 
    tiene_equipo: new FormControl('no',[Validators.required]),
    nombre_equipo: new FormControl('', [])
  });

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];


  constructor(private router: Router) { }

  ngOnInit() {
  }

  //podemos crear métodos:
  public registrar():void{
    //validaciones? llamar a DAO? conversión?
    console.log(this.persona.value);
    //alert("Registrado con éxito!!");
    this.router.navigate(['/login']);
  }

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}