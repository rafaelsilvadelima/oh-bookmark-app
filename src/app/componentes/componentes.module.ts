import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../modulos/material/material.module';
import { PaginasRoutingModule } from '../paginas/paginas-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaginasRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentesModule { }
