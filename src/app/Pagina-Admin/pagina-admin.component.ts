import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { UsuarioService } from '../services/usuario.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-Pagina-Admin',
  templateUrl: './pagina-admin.component.html',
  styleUrls: ['./pagina-admin.component.css']
})
export class PaginaAdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosCustodios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarCustodios();
  }

  cargarCustodios(): void {
    this.usuarioService.getUsers().subscribe(users => {
      this.usuarios = users;
      this.usuariosCustodios = this.usuarios.filter(usuario =>
        usuario.roles.some(rol => rol.rol_nombre === 'Custodio')
      );
    });
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
      doc.save('Reporte de Custodios.pdf');
    });
  }
}
