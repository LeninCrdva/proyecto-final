import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodiosComponent } from './custodios.component';

describe('CustodiosComponent', () => {
  let component: CustodiosComponent;
  let fixture: ComponentFixture<CustodiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustodiosComponent]
    });
    fixture = TestBed.createComponent(CustodiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
