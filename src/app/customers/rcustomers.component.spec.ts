import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcustomersComponent } from './rcustomers.component';

describe('RcustomersComponent', () => {
  let component: RcustomersComponent;
  let fixture: ComponentFixture<RcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
