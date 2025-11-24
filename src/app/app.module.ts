import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { HoursMinutesPipe } from './pipes/hoursMinutes.pipe';
import {FormsModule} from "@angular/forms";
import {SecondsPipe} from "./pipes/seconds.pipe";

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    HoursMinutesPipe,
    SecondsPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
