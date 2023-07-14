import { Persona } from "./persona";

export class Usuario {
    usu_cod!: number;
    usu_per_cod: number | undefined;
    usuario: string | undefined;
    'contrasenia': string;
    'usu_estado': boolean;
    registroUsuario! : Persona;

    constructor(){
        this.registroUsuario = new Persona();
    }
}