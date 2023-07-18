import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {
    usu_cod: number = 0;
    persona: Persona = new Persona();
    usuario: string = '';
    contrasenia: string = '';
    usu_estado: boolean = true;
    roles: Rol[] = [];
    rol: Rol = new Rol();
  }