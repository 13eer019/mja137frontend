import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { from } from 'rxjs';
import { reference } from '@angular/core/src/render3';
import { HomeComponent } from './home/home.component';
import { FilterPipe} from './filter/filter.app';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/loginPage' },
      {path: 'loginPage',
       component : LoginPageComponent},
       {
         path: 'home/:name/:id',
         component: HomeComponent
       }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
