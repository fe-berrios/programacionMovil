import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ReactiveFormsModule } from '@angular/forms';

describe('Página de Registro', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  // Dentro de este espacio es todo modulo que se necesita la página.
  beforeEach(async () => {


    // Acá se le agrega el await y los módulos necesarios.
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot(),
                IonicStorageModule.forRoot()]
    }).compileComponents();


    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Verificar si la página se abre', () => {
    expect(component).toBeTruthy();
  });

  it('2.1 Validar el nombre incorrecto al estar vacio', () => {
    // Obtener nombre de persona
    const nombreControl = component.persona.get('nombre');
    nombreControl?.setValue("");
    expect(nombreControl?.valid).toBeFalse();
    expect(nombreControl?.hasError('required')).toBeTrue();
  })
  
  it('2.2 Validar el formato del nombre', () => {
    const nombreControl = component.persona.get('nombre');
    nombreControl?.setValue("f");
    expect(nombreControl?.valid).toBeFalse();
    expect(nombreControl?.hasError('minLength')).toBeFalse();
  })
  
  it('2.3 Validar un nombre correcto', () => {
    const nombreControl = component.persona.get('nombre');
    nombreControl?.setValue("Berrios");
    expect(nombreControl?.hasError('required')).toBeFalse();
    expect(nombreControl?.hasError('minLength')).toBeFalse();
    expect(nombreControl?.valid).toBeTrue();
  })

  it('3. Botón registrar deshabilitado', () => {
    component.persona.setValue({
      "rut": "",
      "nombre": "",
      "apellido": "",
      "tipoUsuario": "",
      "correo": "",
      "contrasena": "",
      "contrasenaConfirmar": ""
    });
    const botonRegistrar = fixture.nativeElement.querySelector('ion-button[type="submit"]');
    expect(botonRegistrar.disabled).toBeTrue();
  });

  it('3.1 Botón registrar habilitado', () => {
    component.persona.setValue({
      "rut": "20561718-3",
      "nombre": "Felipe",
      "apellido": "Berrios",
      "tipoUsuario": "Estudiante",
      "correo": "fe.berrios@duocuc.cl",
      "contrasena": "Ejemplo123#",
      "contrasenaConfirmar": "Ejemplo123#"
    });
    const botonRegistrar = fixture.nativeElement.querySelector('ion-button[type="submit"]');
    expect(botonRegistrar.disabled).toBeFalse();
  });

  it('4. Formulario Valido', () => {
    component.persona.setValue({
      "rut": "20561718-3",
      "nombre": "Felipe",
      "apellido": "Berrios",
      "tipoUsuario": "Estudiante",
      "correo": "fe.berrios@duocuc.cl",
      "contrasena": "Ejemplo123#",
      "contrasenaConfirmar": "Ejemplo123#"
    });
    expect(component.persona.valid).toBeTrue();
  })

});
