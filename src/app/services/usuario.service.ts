import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Variables atras de crud
  usuarios: any[] = [];

  constructor() { }

  // DAO
  public createUsuario(usuario:any){}

  public updateUsuario(rut:string, nuevoUsuario:any){}

  public deleteUsuario(rut:string){}

  public getUsuario(rut:string){}

  public getUsuarios(){}
}
