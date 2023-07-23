import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { tap } from 'rxjs';
import { Bien } from 'src/app/entities/bien';
import { Usuario } from 'src/app/entities/usuario';
import { BienesService } from 'src/app/services/bienes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-acta-perdido',
  templateUrl: './acta-perdido.component.html',
  styleUrls: ['./acta-perdido.component.css']
})
export class ActaPerdidoComponent {

  usuarios: Usuario[] = [];
  usuariosRector: Usuario[] = [];
  public bienes: Bien[] = [];
  BienesInactivos: Bien [] = [];
  public registroBien: Bien[] = []; 
  public bien: Bien = new Bien();

  @ViewChild('reporte', { static: false }) el!: ElementRef;
  @ViewChild('inputFechaRef', { static: false }) inputFechaRef!: ElementRef;
  mostrarBotonGenerarActa: boolean = true;

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private bienService: BienesService) { }

  ngOnInit(): void {
    this.cargarRector();
    this.route.queryParams.subscribe((params) => {
    });
    this.cargarListaBienes();
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    this.inputFechaRef.nativeElement.value = formattedDate;
  }

  cargarRector(): void {
    this.usuarioService.getUsers().subscribe(users => {
      this.usuarios = users;
      this.usuariosRector = this.usuarios.filter(usuario =>
        usuario.roles.some(rol => rol.rol_nombre === 'Rector')
      );
      if (this.usuariosRector.length > 0) {
        const rector = this.usuariosRector[0]; // Assuming you only have one rector in the usuariosRector array.
      }
    });
  }

  cargarListaBienes(): void {
    this.bienService.getBienes().subscribe(
      bien => {
        this.bienes = bien;
        this.BienesFiltro('inactivo');
      },
      error => {
        console.log('Error al cargar la lista: ', error)
      }
    );
    console.log(this.bienes);
  }

  BienesFiltro(filtro: string): void {
    if (filtro === 'inactivo') {
      this.BienesInactivos = this.bienes.filter((bi) => bi.bien_estadoA === false);
    }
  }

  ImprimirReporte() {
    this.mostrarBotonGenerarActa = false
    const doc = new jsPDF();
    // Ajustamos la altura del contenedor principal al contenido
    const container = this.el.nativeElement;
    const originalHeight = container.style.height;
    container.style.height = 'auto';

    // Agregamos una clase CSS para ocultar el botón "Generar Acta" en el PDF
    container.classList.add('ocultar-boton-generar');

    doc.html(container, {
      callback: (pdf) => {
        // Restauramos la altura original del contenedor principal
        container.style.height = originalHeight;

        // Eliminamos la clase CSS para mostrar nuevamente el botón en la vista
        container.classList.remove('ocultar-boton-generar');

        pdf.save('.acta-transferencia');
      },
      margin: [20, 0, 40, 0],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: doc.internal.pageSize.getWidth(),
      windowWidth: 1000
    });
    this.router.navigate(['/bienes']);
  }
}
