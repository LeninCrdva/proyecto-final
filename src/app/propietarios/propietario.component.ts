import { Component, OnInit } from '@angular/core';
import { Propietario } from '../entities/propietario';
import { PropietarioService } from '../services/propietario.service';
@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
 
})
export class PropietarioComponent implements OnInit{

  propietarios: Propietario[]=[];

  constructor(private propietarioService: PropietarioService){}

  ngOnInit():void{
    this.cargarListaPropietarios()
  }

  cargarListaPropietarios(){
    this.propietarioService.getPropietarios().subscribe(
      propietarios => this.propietarios = propietarios
    )
  }
}
