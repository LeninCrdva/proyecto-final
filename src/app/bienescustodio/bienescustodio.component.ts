import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BienesService } from '../services/bienes.service';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-bienescustodio',
  templateUrl: './bienescustodio.component.html',
  styleUrls: ['./bienescustodio.component.css'],
})
export class BienescustodioComponent implements OnInit {
  @ViewChild('reporte', { static: false }) el!: ElementRef;
  usuario: any = {};
  public registroBien: Array<any> = [];
  constructor(private bienService: BienesService,private dataStorageService: DataStorageService
    , private router: Router) {
      this.usuario = this.dataStorageService.getData('datosUsuario');
    }

  filterBien = '';
  get isPerfil(): boolean {
    return !!(this.usuario && this.usuario.primerNombre && this.usuario.apellidoPaterno);
  }
  ngOnInit(): void {
    this.listarBienes();
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
  listarBienes(): void {
    this.bienService
      .getBienesCustodio()
      .subscribe((registroBien) => (this.registroBien = registroBien));
  }

  imprimirReporte() {
    let doc = new jsPDF();
    doc.html(this.el.nativeElement, {
      callback: (doc) => {
        doc.save('Reporte de Bienes.pdf');
      }, // Adjust your margins here (left, top, right ,bottom)
      margin: [0, 0, 40, 0],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: doc.internal.pageSize.getWidth(), //target width in the PDF document
      windowWidth: 1000, //window width in CSS pixels,
    });
  }
}
