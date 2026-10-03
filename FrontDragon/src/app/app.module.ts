import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';            
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { NavbarComponent } from './ventanas/navbar/navbar.component';
import { InicioComponent } from './ventanas/inicio/inicio.component';
import { ListaFavoritosComponent } from './ventanas/lista-favoritos/lista-favoritos.component';
import { DetallesComponent } from './ventanas/detalles/detalles.component';
import { LoginComponent } from './ventanas/login/login.component';
import { RegisterComponent } from './ventanas/register/register.component';
import { ListaPersonajesComponent } from './ventanas/lista-personajes/lista-personajes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    ListaFavoritosComponent,
    DetallesComponent,
    LoginComponent,
    RegisterComponent,
    ListaPersonajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
