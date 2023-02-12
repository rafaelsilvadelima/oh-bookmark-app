import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { PaginasComponent } from './paginas/paginas.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    PaginasComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule
  ]
})
export class PaginasModule { }
