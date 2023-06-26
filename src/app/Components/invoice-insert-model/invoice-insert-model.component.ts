
import { Component, EventEmitter, Output } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice-insert-model',
  templateUrl: './invoice-insert-model.component.html',
  styleUrls: ['./invoice-insert-model.component.css']
})
export class InvoiceInsertModelComponent {
	closeResult = '';
  invoiceForm!: FormGroup;
  @Output() notifyParent: EventEmitter<void> = new EventEmitter<void>();

	constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ,private http: HttpClient) {}


    ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      date: ['', Validators.required],
      customerID: ['', Validators.required],
      status: ['', Validators.required],
      amount: ['', Validators.required]
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

  saveInvoice(): void {


    if (this.invoiceForm.valid) {
      console.log('Saving invoice:', this.invoiceForm.value);
      const dateFormYear = this.invoiceForm.get('date')?.value.year;
      const dateFormMonth = this.invoiceForm.get('date')?.value.month;
      const dateFormDay = this.invoiceForm.get('date')?.value.day;
      const dateForm= `${dateFormYear}-${dateFormMonth}-${dateFormDay}`;
      const invoiceData = {
        invoiceID: 0,
        date: new Date(dateForm),
        customerID: this.invoiceForm.get('customerID')?.value,
        status: this.invoiceForm.get('status')?.value,
        amount: this.invoiceForm.get('amount')?.value
      };
      this.http.post('https://localhost:7013/api/Invoice', invoiceData)
        .subscribe(
          response => {
            console.log('Invoice saved successfully:', response);
            this.invoiceForm = this.formBuilder.group({
              date: ['', Validators.required],
              customerID: ['', Validators.required],
              status: ['', Validators.required],
              amount: ['', Validators.required]
            });
            this.modalService.dismissAll('');
            this.notifyParent.emit();
          },
          error => {
            console.error('Failed to save invoice:', error);
          }
        );
    }
  }
}