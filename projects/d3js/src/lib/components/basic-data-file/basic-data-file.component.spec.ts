import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataFileComponent } from './basic-data-file.component';

describe('BasicDataFileComponent', () => {
  let component: BasicDataFileComponent;
  let fixture: ComponentFixture<BasicDataFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
