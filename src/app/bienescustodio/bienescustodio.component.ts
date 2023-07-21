// bienescustodio.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BienesService } from '../services/bienes.service';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { tap } from 'rxjs/operators';
import { Bien } from '../entities/bien';

@Component({
  selector: 'app-bienescustodio',
  templateUrl: './bienescustodio.component.html',
  styleUrls: ['./bienescustodio.component.css'],
})
export class BienescustodioComponent implements OnInit {
  @ViewChild('reporte', { static: false }) el!: ElementRef;
  usuario: any = {};
  public registroBien: Bien[] = []; // Asegúrate de que el tipo de datos coincida con la interfaz de Bien
  properties!: any;
  filterBien = '';
  constructor(
    private bienService: BienesService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {
    this.usuario = this.dataStorageService.getData('datosUsuario');
  }
  

  get isPerfil(): boolean {
    return !!(this.usuario && this.usuario.primerNombre && this.usuario.apellidoPaterno);
  }

  ngOnInit(): void {
    if (!this.isPerfil) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tu perfil no está completo. Inicia sesión nuevamente.',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      const usuario = this.usuario.usuario;
      const contrasenia = this.usuario.contrasenia;

      this.obtenerBienesPorUsuarioYContrasenia(usuario, contrasenia);
    }
  }

  cerrarSesion() {
    this.dataStorageService.deleteData('datosUsuario');
    this.router.navigate(['/login']);
  }

  obtenerBienesPorUsuarioYContrasenia(usuario: string, contrasenia: string) {
    this.bienService
      .getBienesPorUsuarioYContrasenia(usuario, contrasenia)
      .pipe(
        tap((bienes) => {
          this.registroBien = bienes; // Asignamos los bienes obtenidos al arreglo registroBien
          console.log('Bienes obtenidos:', bienes);
        })
      )
      .subscribe();
  }

  imprimirReporte() {
    let doc = new jsPDF();
    doc.html(this.el.nativeElement, {
      callback: (doc) => {
        doc.save('Reporte de Bienes.pdf');
      }, // Adjust your margins here (left, top, right ,bottom)
      margin: [20, 0, 40, 0],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: doc.internal.pageSize.getWidth(), //target width in the PDF document
      windowWidth: 1000, //window width in CSS pixels,
    });
  }
}
