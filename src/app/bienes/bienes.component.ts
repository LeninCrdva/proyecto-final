import { Component, OnInit } from '@angular/core';
import { Bien } from '../entities/bien';
import { BienesService } from '../services/bienes.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html'
})
export class BienesComponent implements OnInit {
  
  modalTitle: string = 'Ingresar bien';
  
  bienes: Bien[] = [];

  constructor(private bienesService: BienesService) { }

  ngOnInit(): void {
    this.cargarListaBienes()
  }

  cargarListaBienes() {
    this.bienesService.getBienes().subscribe(
      bien => this.bienes = bien
    )
  }

}
