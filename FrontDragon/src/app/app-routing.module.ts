import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './ventanas/inicio/inicio.component';
import { ListaFavoritosComponent } from './ventanas/lista-favoritos/lista-favoritos.component';
import { DetallesComponent } from './ventanas/detalles/detalles.component';
import { LoginComponent } from './ventanas/login/login.component';
import { RegisterComponent } from './ventanas/register/register.component';
import { ListaPersonajesComponent } from './ventanas/lista-personajes/lista-personajes.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: '',redirectTo:'/inicio', pathMatch:'full'},
  {path: 'lista-favoritos', component: ListaFavoritosComponent},
  {path: 'detalles/:id', component: DetallesComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'lista-personajes', component: ListaPersonajesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
