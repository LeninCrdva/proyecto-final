import { Component, OnInit } from '@angular/core';
import { Historial } from '../entities/historial';
import { HistorialService } from '../services/historial.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit{
  
  historial: Historial[]=[];

  constructor(private historialService: HistorialService){}

  ngOnInit():void{
    this.cargarListaHistorial()
  }

  cargarListaHistorial(){
    this.historialService.getHistorial().subscribe(historial => this.historial = historial)
  }
}
