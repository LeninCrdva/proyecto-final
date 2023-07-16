import { Usuario } from "./usuario";
import { Categoria } from "./categoria";
import { Propietario } from "./propietario";

export class Bien {
    'bien_cod': number;
    'bien_codigoG': string;
    'bien_modelo': string;
    'bien_marca': string;
    'bien_estado': string;
    'bien_detalles': string;
    'bien_descripcion': string;
    'bien_serie': string;
    'bien_precio': number;
    'bien_estadoA': boolean;
    'bien_edi_cod': number;
    'usuario': Usuario;
    'propietario': Propietario;
    'categoria': Categoria;
}