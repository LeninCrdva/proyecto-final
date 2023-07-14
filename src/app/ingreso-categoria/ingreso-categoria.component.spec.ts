import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCategoriaComponent } from './ingreso-categoria.component';

describe('IngresoCategoriaComponent', () => {
  let component: IngresoCategoriaComponent;
  let fixture: ComponentFixture<IngresoCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoCategoriaComponent]
    });
    fixture = TestBed.createComponent(IngresoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
