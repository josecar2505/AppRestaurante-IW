import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsModalPage } from './order-details-modal.page';

describe('OrderDetailsModalPage', () => {
  let component: OrderDetailsModalPage;
  let fixture: ComponentFixture<OrderDetailsModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderDetailsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
