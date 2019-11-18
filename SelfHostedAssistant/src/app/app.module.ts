import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from './header/header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MaterialModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxSpinnerModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }


