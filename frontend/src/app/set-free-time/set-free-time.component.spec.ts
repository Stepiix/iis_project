import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFreeTimeComponent } from './set-free-time.component';

describe('SetFreeTimeComponent', () => {
  let component: SetFreeTimeComponent;
  let fixture: ComponentFixture<SetFreeTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetFreeTimeComponent]
    });
    fixture = TestBed.createComponent(SetFreeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
