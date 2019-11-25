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
import { AddeventdialogComponent } from './addeventdialog/addeventdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddeventdialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FullCalendarModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent,AddeventdialogComponent],
})
export class AppModule { }


