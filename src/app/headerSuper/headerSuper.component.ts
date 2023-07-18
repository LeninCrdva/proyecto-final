import { Component } from '@angular/core';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegistroUsuarioComponent } from '../registro-usuarios/registrousuario.component';

@Component({
  selector: 'app-headerSuper',
  templateUrl: './headerSuper.component.html',
  styleUrls: ['./headerSuper.component.css']
})
export class HeaderSuperComponent {
  usuario: any = {};
  modalTitle:string = 'Crear Usuario';
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
        // Aquí debes especificar la ruta correcta hacia la página de inicio de sesión
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
