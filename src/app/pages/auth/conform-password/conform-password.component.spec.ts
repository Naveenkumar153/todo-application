import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformPassword } from './conform-password.component';

describe('OtpComponent', () => {
  let component: ConformPassword;
  let fixture: ComponentFixture<ConformPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformPassword ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
