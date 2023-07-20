import { Component, OnInit } from '@angular/core';
import { Historial } from '../entities/historial';
import { HistorialService } from '../services/historial.service';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit{
  rolUsuario: string = '';
  historial: Historial[]=[];

  constructor(private historialService: HistorialService,
    private dataStorageService: DataStorageService){}

  ngOnInit():void{
    this.cargarListaHistorial()
    const userData = this.dataStorageService.getData('datosUsuario'); 
    this.rolUsuario = userData.rolNombre;
    console.log('su rol es:',this.rolUsuario);
    
  }

  cargarListaHistorial(){
    this.historialService.getHistorial().subscribe(historial => this.historial = historial)
  }
}
