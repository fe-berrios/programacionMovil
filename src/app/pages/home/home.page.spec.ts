import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

import { RouterTestingModule } from '@angular/router/testing';

// Le haré pruebas en la página home
// Ambiente
describe('HomePage', () => {
  // Variable que guarda todo lo que tiene HomePage
  let component: HomePage;
  // Variable que contiene el ambiente de prueba
  let fixture: ComponentFixture<HomePage>;

  // Dentro de 'beforeEach' se debe preparar todo lo necesario a testear
  beforeEach(async () => {
    const localStoragePrueba = {
      // Importante el nombre del método de localStorage
      // jasmine crea un 'espia' de nombre de método del LS y 
      getItem: jasmine.createSpy('getItem').and.callFake((key: string)=>{
        if(key==='usuario'){
          return JSON.stringify({
            "rut": "10200300-4",
            "nombre": "Administrador",
            "fecha_nacimiento": "1980-01-01",
            "genero": "Masculino",
            "correo": "admin@duocuc.cl",
            "contrasena": "Ejemplo123#",
            "valida_contrasena": "Ejemplo123#",
            "tiene_equipo": "no",
            "nombre_equipo": "",
            "tipo_usuario": "Administrador"
          });
        }
        return null;
      }),
      setItem: jasmine.createSpy('setItem'),
      removeItem: jasmine.createSpy('removeItem')
    };

    // Se creara una propiedad en el navegador que pertenece al localStorage
    Object.defineProperty(window, 'localStorage', {value: localStoragePrueba})

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(),
                RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 'it' es una prueba unitaria
  // it contiene el nombre de una prueba
  it('1. Verificar si la página se abre', () => {
    // y lo que se desea probar
    expect(component).toBeTruthy();
  });

  it('2. Verificar el nombre del usuario', () => {
    expect(component.usuarioLocal.nombre).toEqual("Administrador");
  });

  it('3. Validar el usuario completo', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('usuario');
    expect(component.usuarioLocal).toEqual({
      "rut": "10200300-4",
      "nombre": "Administrador",
      "fecha_nacimiento": "1980-01-01",
      "genero": "Masculino",
      "correo": "admin@duocuc.cl",
      "contrasena": "Ejemplo123#",
      "valida_contrasena": "Ejemplo123#",
      "tiene_equipo": "no",
      "nombre_equipo": "",
      "tipo_usuario": "Administrador"
    });
  });
});