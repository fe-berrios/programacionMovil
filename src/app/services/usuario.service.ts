import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private storage: Storage) {
    // Este comando crea la base de datos.
    this.initStorage();
  }

  // async, le avisa al método que DEBE de esperar.
   async initStorage(){
    // await, espera que el comando se ejecute.
    await this.storage.create();
  }

  // DAO (Data Access Object)
  // Su propósito principal es abstraer y encapsular el acceso
  // a los datos, separando la lógica de persistencia de datos de la lógica de negocio.
  // SIEMPRE un método asincronico debe PROMETER devolver.
  public async createUsuario(usuario:any): Promise<boolean>{
    // Cada storage puede tener muchas llaves, que funciona como 'tablas'. Cada llave una 'tabla'.
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    // Itera usu por usu buscando el atributo .rut que calze con usuario.rut (Variable del método.)
    if (usuarios.find(usu => usu.rut == usuario.rut) != undefined){
      // Si usuario NO es 'undefined' osea que SI existe, entonces:
      return false;
    }
    usuarios.push(usuario);
    await this.storage.set("usuarios", usuarios);
    return true;
  }

  public async updateUsuario(rut:string, nuevoUsuario:any): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let index: number = usuarios.findIndex(usu => usu.rut == rut);
    if (index == -1){
      return false;
    }
    usuarios[index] = nuevoUsuario;
    await this.storage.set("usuarios", usuarios);
    return true;
  }

  public async deleteUsuario(rut:string): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let index: number = usuarios.findIndex(usu => usu.rut == rut);
    if (index == -1){
      return false;
    }
    usuarios.splice(index, 1);
    await this.storage.set("usuarios", usuarios);
    return true;
  }

  public async getUsuario(rut:string): Promise<any>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    return usuarios.find(usu => usu.rut == rut);
  }

  // Especifica que devuelve una lista[] de algo 'any'
  public async getUsuarios(): Promise<any[]>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    return usuarios;
  }
}