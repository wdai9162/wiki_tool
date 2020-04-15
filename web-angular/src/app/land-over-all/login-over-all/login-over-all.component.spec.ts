import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOverAllComponent } from './login-over-all.component';

describe('LoginOverAllComponent', () => {
  let component: LoginOverAllComponent;
  let fixture: ComponentFixture<LoginOverAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOverAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOverAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
