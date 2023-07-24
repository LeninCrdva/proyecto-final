import { Usuario } from "./usuario";
import { Categoria } from "./categoria";
import { Propietario } from "./propietario";
import { Ubicacion } from "./ubicaciones";

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
  'bien_estadoA':boolean = true;
  'ubicacion': Ubicacion;
  'usuario': Usuario;
  'propietario': Propietario;
  'categoria': Categoria;
  [key: string]: any;
 
}
