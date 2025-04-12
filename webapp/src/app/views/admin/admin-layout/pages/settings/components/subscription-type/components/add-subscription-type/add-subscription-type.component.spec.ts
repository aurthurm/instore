import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionTypeComponent } from './add-subscription-type.component';

describe('AddSubscriptionTypeComponent', () => {
  let component: AddSubscriptionTypeComponent;
  let fixture: ComponentFixture<AddSubscriptionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriptionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
