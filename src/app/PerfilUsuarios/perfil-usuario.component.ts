import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PerfilUsuarios',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuariosComponent implements OnInit {
  datosUsuario: any = {};
  verificacionCache: string = '';
  verContrasenia: boolean = false;

  constructor(private dataStorageService: DataStorageService, private location: Location) { }

  ngOnInit(): void {
    // Obtener los datos del usuario almacenados en el servicio DataStorageService
    this.datosUsuario = this.dataStorageService.getData('datosUsuario');
    // Ver los datos obtenidos por consola
    console.log('Datos del usuario:', this.datosUsuario);
    // Por defecto, el ojo estará tachado
    this.verContrasenia = false;
  }

  toggleContrasenia(): void {
    if (!this.verContrasenia) {
      // Mostrar la alerta de SweetAlert para la verificación de caché
      Swal.fire({
        title: 'Verificación de Caché',
        text: 'Para ver la contraseña, ingresa "ver" en el campo de verificación de caché:',
        input: 'text',
        inputPlaceholder: 'Escribe "ver"',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Ver contraseña',
        cancelButtonText: 'Cancelar',
        preConfirm: (inputValue) => {
          // Verificar si la verificación de caché es correcta
          if (inputValue.toLowerCase() !== 'ver') {
            Swal.showValidationMessage('La verificación de caché es incorrecta');
          } else {
            return inputValue;
          }
        }
      }).then((result) => {
        // Verificar que el resultado no sea undefined y que contenga un valor válido
        if (result && result.value && result.value.toLowerCase() === 'ver') {
          this.verContrasenia = true;
        }
      });
    } else {
      this.verContrasenia = false;
    }
  }

  onVerificacionCacheChange(): void {
    // Verificar si el campo de verificación de caché coincide con el texto "ver" para habilitar la visualización de la contraseña
    this.verContrasenia = this.verificacionCache.toLowerCase() === 'ver';
  }

  volverPaginaAnterior() {
    this.location.back();
  }
}
