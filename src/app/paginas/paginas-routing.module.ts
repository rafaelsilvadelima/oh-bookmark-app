import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsGuard } from '../guards.guard';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/paginas/home' },
  { path: 'home', component: HomeComponent, canActivate: [GuardsGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'politicas', component: PoliticasComponent, canActivate: [GuardsGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [GuardsGuard] },
  { path: 'registro/editar/:id', component: EditarRegistroComponent , canActivate: [GuardsGuard]},
  { path: 'perfil', component: PerfilComponent , canActivate: [GuardsGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
