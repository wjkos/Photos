import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargePhotoComponent } from './large-photo.component';

describe('LargePhotoComponent', () => {
  let component: LargePhotoComponent;
  let fixture: ComponentFixture<LargePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargePhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
