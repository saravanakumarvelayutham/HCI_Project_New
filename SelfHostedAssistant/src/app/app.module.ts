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
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { LocationService } from './service/location.service';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddeventdialogComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.MAP_API_KEY,
      libraries: ["places"]
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
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
  providers: [ LocationService],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent,AddeventdialogComponent],
})
export class AppModule { }


