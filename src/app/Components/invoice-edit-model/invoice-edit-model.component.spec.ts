import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEditModelComponent } from './invoice-edit-model.component';

describe('InvoiceEditModelComponent', () => {
  let component: InvoiceEditModelComponent;
  let fixture: ComponentFixture<InvoiceEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceEditModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
