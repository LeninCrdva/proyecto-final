import { Component } from '@angular/core';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario: any = {};

  modalTitle:string = 'Crear Custodio';

  constructor(private dataStorageService: DataStorageService) {
    // Obtener los datos del usuario almacenados en las cookies
    this.usuario = this.dataStorageService.getData('datosUsuario'); // Reemplaza 'nombreDeTuLlave' con la llave que usaste para guardar los datos del usuario
  }
  get isPerfil(): boolean {
    return !!(this.usuario && this.usuario.primerNombre && this.usuario.apellidoPaterno);
  }

  // Método para cerrar sesión
  cerrarSesion() {
    // Eliminar los datos del usuario al cerrar sesión
    this.dataStorageService.deleteData('datosUsuario'); // Reemplaza 'nombreDeTuLlave' con la misma llave que usaste anteriormente
  }
}
