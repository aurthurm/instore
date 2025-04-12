import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadListingsComponent } from './upload-listings.component';

describe('UploadListingsComponent', () => {
  let component: UploadListingsComponent;
  let fixture: ComponentFixture<UploadListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
