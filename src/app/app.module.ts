import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DatePipe, useClass: DatePipe },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
