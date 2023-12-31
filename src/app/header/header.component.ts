import { Component } from '@angular/core';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  usuario: any = {};

  modalTitle:string = 'Crear Custodio';

  constructor(private dataStorageService: DataStorageService
    , private router: Router) {
    // Obtener los datos del usuario almacenados en las cookies
    this.usuario = this.dataStorageService.getData('datosUsuario'); // Reemplaza 'nombreDeTuLlave' con la llave que usaste para guardar los datos del usuario
  }
  get isPerfil(): boolean {
    return !!(this.usuario && this.usuario.primerNombre && this.usuario.apellidoPaterno);
  }
  ngOnInit(): void {
    // Verificar si el perfil está incompleto al iniciar el componente
    if (!this.isPerfil) {
      // Mostrar SweetAlert con el mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tu perfil no está completo. Inicia sesión nuevamente.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        // Redireccionar al usuario a la página de inicio de sesión (login)
         this.router.navigate(['/login']);
      });
    }
  }

  // Método para cerrar sesión
  cerrarSesion() {
    // Eliminar los datos del usuario al cerrar sesión
    this.dataStorageService.deleteData('datosUsuario'); // Reemplaza 'nombreDeTuLlave' con la misma llave que usaste anteriormente
    
  }
}
