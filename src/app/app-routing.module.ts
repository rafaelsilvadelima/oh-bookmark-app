import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'paginas', loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule) },
  { path: '', pathMatch: 'full', redirectTo: '/paginas/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
