import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { PaginasComponent } from './paginas/paginas.component';
import { HomeComponent } from './home/home.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modulos/material/material.module';
import { PoliticasComponent } from './politicas/politicas.component';
import { RegistroComponent } from './registro/registro.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';


@NgModule({
  declarations: [
    PaginasComponent,
    HomeComponent,
    LoginComponent,
    PoliticasComponent,
    RegistroComponent,
    EditarRegistroComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    ComponentesModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class PaginasModule { }