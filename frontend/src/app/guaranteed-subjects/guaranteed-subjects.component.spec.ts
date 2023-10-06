import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteedSubjectsComponent } from './guaranteed-subjects.component';

describe('GuaranteedSubjectsComponent', () => {
  let component: GuaranteedSubjectsComponent;
  let fixture: ComponentFixture<GuaranteedSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuaranteedSubjectsComponent]
    });
    fixture = TestBed.createComponent(GuaranteedSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
