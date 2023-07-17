import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../entities/ubicaciones';
import { UbicacionesService } from '../services/ubicaciones.service';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit{

  ubicaciones: Ubicacion [] = [];

  constructor (private ubicacionservice: UbicacionesService) {}

  ngOnInit(): void {
    
    this.ubicacionservice.getUbicaciones().subscribe(
      ubicaciones => this.ubicaciones = ubicaciones
    )
  }

}
