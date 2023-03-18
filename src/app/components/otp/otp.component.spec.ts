import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSixDigitComponent } from './otp.component';

describe('OtpComponent', () => {
  let component: OtpSixDigitComponent;
  let fixture: ComponentFixture<OtpSixDigitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpSixDigitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpSixDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
