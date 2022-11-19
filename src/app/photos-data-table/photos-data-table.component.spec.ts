import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosDataTableComponent } from './photos-data-table.component';

describe('PhotosDataTableComponent', () => {
  let component: PhotosDataTableComponent;
  let fixture: ComponentFixture<PhotosDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
