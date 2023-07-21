import { Bien } from "./bien";
import { Usuario } from "./usuario";

export class Historial {
    'his_cod': number=0;
    'his_fecha': Date = new Date(); 
    'his_detalles': String="";
    'usuario': Usuario;
    'bien': Bien;
}
