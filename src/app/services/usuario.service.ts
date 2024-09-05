import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Variables atras de crud
  usuarios: any[] = [];

  constructor() { }

  // DAO (Data Access Object)
  // Su propósito principal es abstraer y encapsular el acceso
  // a los datos, separando la lógica de persistencia de datos de la lógica de negocio.
  public createUsuario(usuario:any){
    // se utiliza this para entrar a las propiedades de la clase/objeto.
    if(this.getUsuario(usuario.rut) == undefined){
      // Si 'usuario.rut' no existe (undefined)..
      this.usuarios.push(usuario);
      // agregalo a la lista (this.usuarios.push)
      return true;
    }
    return false;
  }

  public updateUsuario(rut:string, nuevoUsuario:any){
    // For each, por cada 'usuario' en 'usuarios'
    for(let usuario of this.usuarios){
      // Si el usuario tiene el mismo rut entregado
      if(usuario.rut == rut){
        // Usuario se convierte en un 'nuevoUsuario'
        usuario = nuevoUsuario;
      }
    }
    return false;
  }

  public deleteUsuario(rut:string){
    // Se crea constante que contiene el indice de donde esta el usuario con el rut ingresado
    // Se utiliza 'const' para no poder cambiar el valor de la variable
    const indice = this.usuarios.findIndex(usuario => usuario.rut == rut);
    // Si el indice es -1 entonces NO existe el usuario
    // El -1 es propio del método findIndex
    if (indice == -1){
      return false;
    }
    this.usuarios.splice(indice, 1);
    return true;
  }

  public getUsuario(rut:string){
    this.usuarios.find(usuario => usuario.rut == rut);
    // De la lista anda elemento por elemento (usuario) e itera (=>)
    // hasta que el elemento.atributo (usuario.rut) coincida (==) con la variable del método (rut).
  }

  // Especifica que devuelve una lista[] de algo 'any'
  public getUsuarios():any[]{
    return this.usuarios;
  }
}