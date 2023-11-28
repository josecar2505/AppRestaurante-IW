import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuOrdenPage } from './menu-orden.page';

describe('MenuOrdenPage', () => {
  let component: MenuOrdenPage;
  let fixture: ComponentFixture<MenuOrdenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuOrdenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
