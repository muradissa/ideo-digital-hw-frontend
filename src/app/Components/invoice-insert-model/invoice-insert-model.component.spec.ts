import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInsertModelComponent } from './invoice-insert-model.component';

describe('InvoiceInsertModelComponent', () => {
  let component: InvoiceInsertModelComponent;
  let fixture: ComponentFixture<InvoiceInsertModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceInsertModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceInsertModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
