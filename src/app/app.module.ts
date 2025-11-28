import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { HoursMinutesPipe } from './pipes/hoursMinutes.pipe';
import {FormsModule} from "@angular/forms";
import {SecondsPipe} from "./pipes/seconds.pipe";
import { EditTimeModalComponent } from './edit-time-modal/edit-time-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    HoursMinutesPipe,
    SecondsPipe,
    EditTimeModalComponent
  ],
    imports: [
        BrowserModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CommonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
