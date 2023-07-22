import { Component, OnInit } from '@angular/core';
import { Historial } from '../entities/historial';
import { HistorialService } from '../services/historial.service';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit{
  rolUsuario: string = '';
  historial: Historial[]=[];
  codigoHistorialSeleccionado: number = 0;
  custodioHistorialSeleccionado:number = 0;
  bienHistorialSeleccionado: number = 0;
  constructor(private historialService: HistorialService,
    private dataStorageService: DataStorageService,
    private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit():void{
    this.cargarListaHistorial()
    const userData = this.dataStorageService.getData('datosUsuario'); 
    this.rolUsuario = userData.rolNombre;
    console.log('su rol es:',this.rolUsuario);
   
    
  }
  guardarDatosHistorialSeleccionado(historial: Historial) {
    this.codigoHistorialSeleccionado = historial.his_cod;
  
    this.custodioHistorialSeleccionado =
      historial.usuario.usu_cod;
    this.bienHistorialSeleccionado =
      historial.bien.bien_cod ;
      console.log('Código Historial:', this.codigoHistorialSeleccionado);
      console.log('Custodio Historial:', this.custodioHistorialSeleccionado);
      console.log('Bien Historial:', this.bienHistorialSeleccionado);
      const custodioId =  historial.usuario.usu_cod;
      const bienId =  historial.bien.bien_cod;
      this.router.navigate(['/historialActa'], { queryParams: { custodioId: custodioId ,bienId:bienId} });
  }

  cargarListaHistorial(){
    this.historialService.getHistorial().subscribe(historial => this.historial = historial)
  }
}
