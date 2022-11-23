import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { HmsPipe } from './pipes/hms.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    HmsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
