import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcccurementDashboardComponent } from './procccurement-dashboard.component';

describe('ProcccurementDashboardComponent', () => {
  let component: ProcccurementDashboardComponent;
  let fixture: ComponentFixture<ProcccurementDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcccurementDashboardComponent]
    });
    fixture = TestBed.createComponent(ProcccurementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
