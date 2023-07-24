import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Bien } from '../entities/bien';
import { BienesService } from '../services/bienes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bienes-asignacion',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes-style.component.css'],
})
export class BienesComponent implements OnInit {

  rolUsuario: string = '';
  argumento!: string;

  ngOnInit(): void {
    this.cargarListaBienes();
    const userData = this.dataStorageService.getData('datosUsuario');
    this.rolUsuario = userData.rolNombre;
    console.log('su rol es:', this.rolUsuario);
  }

  AsignarTitle: string = 'Asignar bien';
  public bien: Bien = new Bien();

  bienes: Bien[] = [];
  BienesInactivos: Bien[] = [];
  codSeleccionado!: string;
  filaSelect: Bien | null = null;
  seleccionado: boolean = false;

  constructor(
    private bienesService: BienesService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

  cargarListaBienes(): void {
    this.bienesService.getBienes().subscribe(
      bien => {
        this.bienes = bien;
        this.BienesFiltro('activo');
      },
      error => {
        console.log('Error al cargar la lista: ', error)
      }
    );
  }

  BienesFiltro(filtro: string): void {
    if (filtro === 'activo') {
      this.BienesInactivos = this.bienes.filter((bi) => bi.bien_estadoA === true);
      console.log(this.bien.bien_estadoA)
    } else if (filtro === 'inactivo') {
      this.BienesInactivos = this.bienes.filter((bi) => bi.bien_estadoA === false);
      console.log(this.bienes)
      console.log(this.bien.bien_estadoA)
    }
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

 
  BuscarBienesByArgument(argument: string): void {
    if (argument.trim() === '') {
      this.cargarListaBienes();
      return;
    }

    this.bienesService.getBienesByArgument(argument).subscribe(
      bienes => {
        this.BienesInactivos = bienes.filter((bi) => bi.bien_estadoA === true);
      },
      error => console.error(error)
    );
  }
  CargaEditarBien() {
    if (this.seleccionado) {
      this.router.navigate(['/bienes/form/', this.codSeleccionado]);
    } else {
      Swal.fire('Error', 'Por favor, seleccione el bien que desea editar.', 'error');
    }
  }

  cambiarEstado(activar: boolean) {
    if (!this.filaSelect) {
      Swal.fire('Error', 'Por favor, selecciona un bien', 'error');
      return;
    }

    const nuevoEstado = activar;

    if (nuevoEstado === this.filaSelect.bien_estadoA) {
      Swal.fire('Error', `El bien ya está ${nuevoEstado ? 'activo' : 'inactivo'}.`, 'error');
      return;
    }

    this.filaSelect.bien_estadoA = nuevoEstado;

    this.bienesService.updateEstado(this.filaSelect).subscribe(
      () => {
        const estadoAccion = nuevoEstado ? 'activado' : 'desactivado';
        Swal.fire('Correcto', `Bien ${estadoAccion} correctamente.`, 'success');
        this.cargarListaBienes(); // Actualizar la tabla después de cambiar el estado
      },
      (error) => {
        Swal.fire('Error', 'Error al cambiar el estado del bien.', 'error');
      }
    );
  }

  @ViewChild('tableToExport', { static: false }) tableToExport!: ElementRef;

  imprimirReporte() {
    const doc = new jsPDF();

    html2canvas(this.tableToExport.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('Reporte de Bienestotales.pdf');
    });
  }
}
