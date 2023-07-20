import { Component, OnInit } from '@angular/core';
import { Bien } from '../entities/bien';
import { BienesService } from '../services/bienes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';

@Component({
  selector: 'app-bienes-asignacion',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes-style.component.css'],
})
export class BienesComponent implements OnInit {
  rolUsuario: string = '';
  ngOnInit(): void {
    this.cargarListaBienes();
    const userData = this.dataStorageService.getData('datosUsuario');
    this.rolUsuario = userData.rolNombre;
    console.log('su rol es:', this.rolUsuario);
    
  }

  AsignarTitle: string = 'Asignar bien';
  public bien: Bien = new Bien();

  bienes: Bien[] = [];

  codSeleccionado!: string;
  filaSelect: Bien | null = null;
  seleccionado: boolean = false;

  constructor(
    private bienesService: BienesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  cargarListaBienes() {
    this.bienesService.getBienes().subscribe((bien) => (this.bienes = bien));
  }

  selectRow(bi: Bien) {
    this.codSeleccionado = bi.bien_cod.toString();
    this.filaSelect = bi;
    this.seleccionado = true;
    console.log(bi);
  }

  CargaAsignarBien() {
    if (this.seleccionado) {
      this.router.navigate(['/bienes/form-asignar/', this.codSeleccionado]);
    } else {
      Swal.fire('Error', 'Por favor, seleccione el bien que desea asignar.', 'error');
    }
  }

  CargaEditarBien() {
    if (this.seleccionado) {
      this.router.navigate(['/bienes/form/', this.codSeleccionado]);
    } else {
      Swal.fire('Error', 'Por favor, seleccione el bien que desea editar.', 'error');
    }
  }
}
