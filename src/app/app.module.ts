import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule, Routes } from '@angular/router';

import { VentanaPrincipalComponent } from './ventana-principal/ventana-principal.component';
import { CategoriasComponent } from './ingreso-categoria/categorias.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';


import { PaginaAdminComponent } from './Pagina-Admin/pagina-admin.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {FormComponent}from './ingreso-categoria/form.component';
import { PerfilUsuariosComponent } from './PerfilUsuarios/perfil-usuario.component';
import { FormBienesComponent } from './bienes/form-bienes.component';
import { BienesComponent } from './bienes/bienes.component';
import { PropietarioComponent } from './propietarios/propietario.component';
import { FormPropietariosComponent } from './propietarios/form-propietarios.component';
import { DataStorageService } from './PerfilUsuarios/data-storage.service'; 
import { FormAsignacionComponent } from './bienes/form-asignacion.component';
import { HistorialComponent } from './historial/historial.component'; 
const routes: Routes = [
  { path:'', redirectTo: '', pathMatch: 'full' },
  { path:'', component: VentanaPrincipalComponent},
  { path:'ubicacion', component: UbicacionComponent },
  { path:'registro',component:RegistroComponent},
  { path:'login',component:IniciarSesionComponent},
  { path:'paginaadmin', component:PaginaAdminComponent},
  { path:'categorias', component:CategoriasComponent},
  { path:'categoria/form', component:FormComponent},
  { path:'categoria/form/:cat_cod', component: FormComponent },
  { path:'perfil', component:PerfilUsuariosComponent},
  { path:'bienes', component: BienesComponent},
  { path:'bienes/form', component: FormBienesComponent},
  { path:'bienes/form/:bien_cod', component: FormAsignacionComponent},
  { path:'propietario', component:PropietarioComponent},
  { path:'proietario/form', component:FormPropietariosComponent},
  { path: 'propietario/form/:id', component: FormPropietariosComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistroComponent,
    VentanaPrincipalComponent,
    CategoriasComponent,
    PaginaAdminComponent,
    PerfilUsuariosComponent,
    HeaderComponent,
    FormComponent,
    FooterComponent,
    BienesComponent,
    FormBienesComponent,
    PropietarioComponent,
    FormPropietariosComponent,
    FormAsignacionComponent,
    HistorialComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes),HttpClientModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
