import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../entities/ubicaciones';
import { UbicacionesService } from '../services/ubicaciones.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  ubicacionesFiltradas:Ubicacion[] = [];
  selectedUbicacionId: number | null = null;
  rolUsuario: string = '';
  filtrar: string = '';
  filaSelect: Ubicacion | null = null;


  constructor(private ubicacionservice: UbicacionesService, private router: Router,
    private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    const userData = this.dataStorageService.getData('datosUsuario'); 
    this.rolUsuario = userData.rolNombre;
    console.log('su rol es:',this.rolUsuario);
    this.cargarUbicaciones();
  }

  seleccionarUbicacion(ubic: Ubicacion): void {
    this.filaSelect = ubic;
    this.selectedUbicacionId = ubic.ubi_cod;
  }

  cargarUbicaciones(): void {
    this.ubicacionservice.getUbicaciones().subscribe(
      ubic => {
        this.ubicaciones = ubic;
        this.filtrarUbicacion('activo');
      }, error => {
        console.log('Error al cargar la lista: ', error)
      }
      );
  }

  editarUbicacion(): void {
    if (this.selectedUbicacionId) {
      this.router.navigate(['/form-ubicaciones', this.selectedUbicacionId]);
    } else {
      Swal.fire('Error', 'Por favor, selecciona una fila antes de editar.', 'warning');
    }
  }

  filtrarUbicacion(filtro: string): void {
    if (filtro === 'activo') {
      this.ubicacionesFiltradas = this.ubicaciones.filter((ubic) => ubic.ubi_estado === true);
    } else if (filtro === 'inactivo') {
      this.ubicacionesFiltradas = this.ubicaciones.filter((ubic) => ubic.ubi_estado === false);
    } else if (filtro === 'busqueda') {
      if (this.filtrar.trim() === '') {
        this.ubicacionesFiltradas = this.ubicaciones;
      } else {
        const filtroTxt = this.filtrar.toLowerCase().trim();
        this.ubicacionesFiltradas = this.ubicaciones.filter(
          (ubic) =>
            ubic.ubi_nombre.toLowerCase().includes(filtroTxt) ||
            ubic.ubi_departamento.toLowerCase().includes(filtroTxt)
        );
      }
    }
  }

  cambiarEstado(activar: boolean): void {
    if (!this.filaSelect) {
      Swal.fire('Error', 'Por favor, selecciona una fila', 'error');
      return;
    }

    const nuevoEstado = activar ? true : false;

    if (nuevoEstado === this.filaSelect.ubi_estado) {
      Swal.fire('Error', 'La categoría ya está en el estado seleccionado.', 'error');
      return;
    }

    this.filaSelect.ubi_estado = nuevoEstado;

    this.ubicacionservice.update(this.filaSelect).subscribe(
      () => {
        const estadoAccion = activar ? 'activada' : 'eliminada';
        Swal.fire('Correcto', `Categoría ${estadoAccion} correctamente.`, 'success');
        this.cargarUbicaciones(); // Actualizar la tabla después de cambiar el estado
      },
      (error) => {
        Swal.fire('Error', 'Error al cambiar el estado de la categoría.', 'error');
      }
    );
  }

  contextMenuClick(event: Event, activar: boolean) {
    event.preventDefault();

    if (activar && this.filaSelect && !this.filaSelect.ubi_estado) {
      Swal.fire({
        title: 'Activar categoría',
        text: '¿Estás seguro de que deseas activar esta categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, activar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cambiarEstado(true);
        }
      });
    } else {
      this.cambiarEstado(false);
    }
  }
}
