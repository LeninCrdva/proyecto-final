import { Component, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { Bien } from '../entities/bien';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BienesService } from '../services/bienes.service';
import { tap } from 'rxjs';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-constatacion',
  templateUrl: './constatacion.component.html',
  styleUrls: ['./constatacion.component.css']
})
export class ConstatacionComponent {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  bienesFiltrados: Bien[] = [];
  public registroBien: Bien[] = [];
  filtrar: string = '';
  tipo:string = '';
  @ViewChild('reporte', { static: false }) el!: ElementRef;
  @ViewChild('inputRecibidoPorRef') inputRecibidoPorRef!: ElementRef;
  @ViewChild('inputCédula2ERef') inputCédula2ERef!: ElementRef;
  @ViewChild('inputFechaRef', { static: false }) inputFechaRef!: ElementRef;
  @ViewChild('inputNroActaRef', { static: false }) inputNroActaRef!: ElementRef;
  mostrarBotonGenerarActa: boolean = true;
  constructor(private usuarioService: UsuarioService,
    private bienesService: BienesService,
    private route: ActivatedRoute,
    private router: Router,
    private bienService: BienesService,) { }

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.cargarListas();
  }

  cargarListas():void{
    this.cargarListaBienes();
    this.cargarListaUsuarios();
  }

  cargarListaBienes(): void {
    this.bienesService.getBienes().subscribe(
      bien => {
        this.registroBien = bien;
      },
      error => {
        console.log('Error al cargar la lista: ', error)
      }
    );
  }

  cargarListaUsuarios(): void {
    this.usuarioService.getUsers().subscribe(
      usu => {
        this.usuarios = usu
      },
      error => {
        console.log('Error al cargar la lista: ', error)
      }
    )
  }

  async ngAfterViewInit(): Promise<void> {
    // Obtener la fecha actual y asignarla al campo inputFecha
    await this.loadHead();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    if (this.inputFechaRef) {
      this.inputFechaRef.nativeElement.value = formattedDate;
    }

    const randomNumber = Math.floor(Math.random() * 1000);

    // Formatear el número a un formato específico (por ejemplo, rellenar con ceros a la izquierda)
    const formattedNumber = randomNumber.toString().padStart(3, '0');

    // Asignar el número aleatorio al campo inputNroActa
    if (this.inputNroActaRef) {
      this.inputNroActaRef.nativeElement.value = formattedNumber;
    }

    console.log(this.bienesFiltrados);
  }
  async loadHead(): Promise<void> {
    const { value: accept } = await Swal.fire({
      title: 'Selecciona una opción a buscar',
      input: 'select',
      inputOptions: {
        cedula: 'Cédula',
        departamento: 'Departamento',
      },
      inputPlaceholder: 'Selecciona una opción',
      confirmButtonText: 'Continue <i class="fa fa-arrow-right"></i>',
      allowOutsideClick: false,
      inputValidator: (result) => {
        return new Promise<string | null>((resolve) => {
          resolve(!result ? 'Necesitas elegir una opción' : null);
        });
      }
    });
  
    if (accept) {
      try {
        const { value: ipAddress } = await Swal.fire({
          title: 'Ingresa el valor a buscar',
          input: 'text',
          inputLabel: 'Ingresa el valor a buscar',
          showCancelButton: true,
          allowOutsideClick: false,
          inputValidator: (value) => {
            return new Promise<string | null>((resolve) => {
              resolve(!value ? '¡Necesitas escribir algo por lo menos!' : null);
            });
          }
        });
  
        if (ipAddress) {
          this.filtrarCategorias(ipAddress,accept);
        }
      } catch (error) {
        Swal.fire('Error', 'No se ha encontrado según lo ingresado', 'error');
        this.router.navigate(['/bienes']);
      }
    }
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
  // Método para imprimir el acta

  imprimirReporte() {
    const btnGuardar = document.getElementById('btnImprimirActa');

    if (btnGuardar) {
      btnGuardar.style.display = 'none';
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
          btnGuardar.style.display = 'block';

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
  filtrarCategorias(filtro: string, tipo: string): void {
    console.log(filtro, tipo);
    if (tipo === 'cedula') {
      console.log(filtro);
      if (filtro.trim() === '') {
        this.bienesFiltrados = this.registroBien;
      } else {
        const filtroTxt = filtro.toLowerCase().trim();
        this.bienesFiltrados = this.registroBien.filter(
          (bie) =>
            bie.usuario.persona.perCedula.toLowerCase().includes(filtroTxt)
        );
      }
    } else if (tipo === 'departamento') {
      if (filtro.trim() === '') {
        this.bienesFiltrados = this.registroBien;
      } else {
        const filtroTxt = filtro.toLowerCase().trim();
        this.bienesFiltrados = this.registroBien.filter(
          (bie) =>
            bie.ubicacion.departamento.toLowerCase().includes(filtroTxt)
        );
      }
    }
    if(this.bienesFiltrados.length >= 0) {
      this.inputRecibidoPorRef.nativeElement.value = this.bienesFiltrados[0].usuario.persona.perPrimerNom + ' ' + this.bienesFiltrados[0].usuario.persona.perApellidoPater;
      this.inputCédula2ERef.nativeElement.value = this.bienesFiltrados[0].usuario.persona.perCedula;
    }
  }
}
