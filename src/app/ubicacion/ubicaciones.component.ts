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
  selectedUbicacionId: number | null = null;
  rolUsuario: string = '';
  constructor(private ubicacionservice: UbicacionesService, private router: Router,
    private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.ubicacionservice.getUbicaciones().subscribe((ubicaciones) => (this.ubicaciones = ubicaciones));
    const userData = this.dataStorageService.getData('datosUsuario'); 
    this.rolUsuario = userData.rolNombre;
    console.log('su rol es:',this.rolUsuario);
  }

  seleccionarUbicacion(id: number): void {
    this.selectedUbicacionId = id;
  }

  editarUbicacion(): void {
    if (this.selectedUbicacionId) {
      this.router.navigate(['/form-ubicaciones', this.selectedUbicacionId]);
    } else {
      Swal.fire({
        title: 'Debe seleccionar una fila',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        position: 'center',
        allowOutsideClick: false,
      });
    }
  }
}
