import { Component, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

interface Invoice {
  invoiceID: number;
  date: string;
  customerID: number;
  status: string;
  amount: number;
}

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private modalService: NgbModal,private http: HttpClient) { }

  ngOnInit(): void {
    this.getInvoices();
  }


  getInvoices(): void {
    this.http.get<any[]>('https://localhost:7013/api/Invoice')
      .subscribe(
        data => {
          this.invoices = data;
          console.log('Invoices:', this.invoices);
        },
        error => {
          console.error('Failed to fetch invoices:', error);
        }
      );
  }

  dateFormatted(date:string): string {
      const datee = new Date(date);
      const dateFormYear = datee.getFullYear();
      const dateFormMonth = datee.getMonth()+1;
      const dateFormDay = datee.getDate();
      return  `${dateFormYear}-${dateFormMonth}-${dateFormDay}`;
  }

  onChildNotify(): void {
    // Logic to handle child notification and trigger rendering
    console.log('Child notified. Parent component will render.');
    this.getInvoices();
  }
}

