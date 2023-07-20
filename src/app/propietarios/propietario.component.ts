import { Component, OnInit } from '@angular/core';
import { Propietario } from '../entities/propietario';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PropietarioService } from '../services/propietario.service';
@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
 
})
export class PropietarioComponent implements OnInit{

  propietarios: Propietario[]=[];
  rolUsuario: string = '';
  constructor(private propietarioService: PropietarioService
    ,private router: Router, private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService){}

  ngOnInit():void{

    this.cargarListaPropietarios()
    const userData = this.dataStorageService.getData('datosUsuario'); 
    this.rolUsuario = userData.rolNombre;
    console.log('su rol es:',this.rolUsuario);
  }

  cargarListaPropietarios(){
    this.propietarioService.getPropietarios().subscribe(
      propietarios => this.propietarios = propietarios
    )
  }
}
