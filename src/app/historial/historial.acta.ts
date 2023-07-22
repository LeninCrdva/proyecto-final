import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Bien } from '../entities/bien';
import { BienesService } from '../services/bienes.service';
import { tap } from 'rxjs/operators';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.acta.html',
  styleUrls: ['./historial.acta.css']
})
export class historialActaComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosRector: Usuario[] = [];
  public registroBien: Bien[] = []; 
   @ViewChild('reporte', { static: false }) el!: ElementRef;
  @ViewChild('inputNombreEntregaRef') inputNombreEntregaRef!: ElementRef;
  @ViewChild('inputCédulaERef') inputCédulaERef!: ElementRef;
  @ViewChild('inputRecibidoPorRef') inputRecibidoPorRef!: ElementRef;
  @ViewChild('inputCédula2ERef') inputCédula2ERef!: ElementRef;
  @ViewChild('inputCódigoURef') inputCódigoURef!: ElementRef;
  @ViewChild('inputCorreoURef') inputCorreoURef!: ElementRef;
  @ViewChild('inputFechaRef', { static: false }) inputFechaRef!: ElementRef;
  @ViewChild('inputNroActaRef', { static: false }) inputNroActaRef!: ElementRef;
  mostrarBotonGenerarActa: boolean = true;
  constructor(private usuarioService: UsuarioService,
     private route: ActivatedRoute,
     private router: Router,
     private bienService: BienesService) { }

  ngOnInit(): void {
    this.cargarRector();
    this.route.queryParams.subscribe((params) => {
        const custodioId = params['custodioId'];
        const bienId = params['bienId'];
        console.log('ID de usuario acta:',custodioId,' ID del bien:',bienId);
        if (custodioId) {
          this.loadCustodioDetails(custodioId);
          this.bienService.getBien(bienId).subscribe((bien) => {
            console.log('Bien obtenido:', bien);
            this.registroBien = [bien]; // Agregar el bien obtenido al arreglo registroBien
          });
          
        }
      });
       this.ngAfterViewInit();
      
  
  }
  
 
  ngAfterViewInit(): void {
    // Obtener la fecha actual y asignarla al campo inputFecha
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    this.inputFechaRef.nativeElement.value = formattedDate;
    const randomNumber = Math.floor(Math.random() * 1000);

    // Formatear el número a un formato específico (por ejemplo, rellenar con ceros a la izquierda)
    const formattedNumber = randomNumber.toString().padStart(3, '0');

    // Asignar el número aleatorio al campo inputNroActa
    this.inputNroActaRef.nativeElement.value = formattedNumber;
  }
  loadCustodioDetails(custodioId: number): void {
    this.usuarioService.getUserById(custodioId).subscribe((custodio) => {
      if (custodio) {
        this.inputRecibidoPorRef.nativeElement.value = custodio.persona.perPrimerNom + ' ' + custodio.persona.perApellidoMater;
        this.inputCédula2ERef.nativeElement.value = custodio.persona.perCedula;
        this.inputCódigoURef.nativeElement.value = custodio.usu_cod;
        this.inputCorreoURef.nativeElement.value = custodio.usuario;
        const usuario = custodio.usuario;
        const contrasenia = custodio.contrasenia;
       
      }
    });
  }
 
  cargarRector(): void {
    this.usuarioService.getUsers().subscribe(users => {
      this.usuarios = users;
      this.usuariosRector = this.usuarios.filter(usuario =>
        usuario.roles.some(rol => rol.rol_nombre === 'Rector')
      );
      if (this.usuariosRector.length > 0) {
        const rector = this.usuariosRector[0]; // Assuming you only have one rector in the usuariosRector array.

        // Populate the form fields using the ElementRef references.
        this.inputNombreEntregaRef.nativeElement.value = rector.persona.perPrimerNom + ' ' + rector.persona.perApellidoMater;
        this.inputCédulaERef.nativeElement.value = rector.persona.perCedula;
        // Add similar lines for other form fields that need to be populated
      }
    });
  }

 
    // Método para imprimir el acta
   
    imprimirReporte() {
      this.mostrarBotonGenerarActa=false
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
        this.router.navigate(['/historial']);
    }
    
  
  
  
}
