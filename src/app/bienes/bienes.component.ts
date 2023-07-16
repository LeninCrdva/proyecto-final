import { Component, OnInit } from '@angular/core';
import { Bien } from '../entities/bien';
import { BienesService } from '../services/bienes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes-style.component.css'],
})

export class BienesComponent implements OnInit {
  
  modalTitle: string = 'Ingresar bien';
  
  bienes: Bien[] = [];

  codSeleccionado!: string;
  filaSelect: Bien | null = null;
  seleccionado: boolean = false;

  constructor(private bienesService: BienesService,private router: Router) { }

  ngOnInit(): void {
    this.cargarListaBienes()
  }

  cargarListaBienes() {
    this.bienesService.getBienes().subscribe(
      bien => this.bienes = bien
    )
  }

  selectRow(bi: Bien) {
    this.codSeleccionado = bi.bien_cod.toString();
    this.filaSelect = bi;
    this.seleccionado = true;
    console.log(bi)
  }

  AsignarBien() {
    if (this.seleccionado) {
      this.router.navigate(['/bienes/form/', this.codSeleccionado]);
    } else {
      Swal.fire('Error', 'Por favor, seleccione el bien que desea asignar.', 'error');
    }
  }

}
