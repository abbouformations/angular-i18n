import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCreateComponent } from './emp-create.component';

describe('EmpCreateComponent', () => {
  let component: EmpCreateComponent;
  let fixture: ComponentFixture<EmpCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
