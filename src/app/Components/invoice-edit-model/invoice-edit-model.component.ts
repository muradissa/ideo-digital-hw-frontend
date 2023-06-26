import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Invoice {
  invoiceID: number;
  date: string;
  customerID: number;
  status: string;
  amount: number;
}

@Component({
  selector: 'app-invoice-edit-model',
  templateUrl: './invoice-edit-model.component.html',
  styleUrls: ['./invoice-edit-model.component.css']
})
export class InvoiceEditModelComponent {

  @Input() invoiceEdit!: Invoice;
  closeResult = '';
  invoiceForm!: FormGroup;

	constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ,private http: HttpClient) {}


    ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      // invoiceID: ['0', Validators],
      date: [this.dateFormatted(this.invoiceEdit.date), Validators.required],
      customerID: [this.invoiceEdit.customerID, Validators.required],
      status: [this.invoiceEdit.status, Validators.required],
      amount: [this.invoiceEdit.amount, Validators.required]
    });
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


  dateFormatted(date:any): any {
    const datee = new Date(date);
    const dateFormYear = datee.getFullYear();
    const dateFormMonth = datee.getMonth()+1;
    const dateFormDay = datee.getDate();
    return  {year: dateFormYear, month: dateFormMonth, day: dateFormDay};
  } 

  saveInvoice(): void {
    if (this.invoiceForm.valid) {
      const dateFormYear = this.invoiceForm.get('date')?.value.year;
      const dateFormMonth = this.invoiceForm.get('date')?.value.month;
      const dateFormDay = this.invoiceForm.get('date')?.value.day;
      const dateForm= `${dateFormYear}-${dateFormMonth}-${dateFormDay}`;
      const invoiceData = {
        invoiceID: this.invoiceEdit.invoiceID,
        date: new Date(dateForm),
        customerID: this.invoiceForm.get('customerID')?.value,
        status: this.invoiceForm.get('status')?.value,
        amount: this.invoiceForm.get('amount')?.value
      };

      this.invoiceEdit.customerID = invoiceData.customerID;
      this.invoiceEdit.date = dateForm;
      this.invoiceEdit.amount =invoiceData.amount;
      this.invoiceEdit.status =invoiceData.status;

      this.http.put(`https://localhost:7013/api/Invoice/${this.invoiceEdit.invoiceID}`, invoiceData)
        .subscribe(
          response => {
            console.log('Invoice saved successfully:', response);
            this.modalService.dismissAll('');
          },
          error => {
            console.error('Failed to save invoice:', error);
            // Handle error scenario
          }
        );
    }
  }
}
