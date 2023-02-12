import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'politicas', component: PoliticasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'registro/editar/:id', component: EditarRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
