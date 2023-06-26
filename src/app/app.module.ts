import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceTableComponent } from './Components/invoice-table/invoice-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceInsertModelComponent } from './Components/invoice-insert-model/invoice-insert-model.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceEditModelComponent } from './Components/invoice-edit-model/invoice-edit-model.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceTableComponent,
    InvoiceInsertModelComponent,
    InvoiceEditModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
