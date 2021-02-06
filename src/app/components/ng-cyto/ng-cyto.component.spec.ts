import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCytoComponent } from './ng-cyto.component';

describe('NgCytoComponent', () => {
  let component: NgCytoComponent;
  let fixture: ComponentFixture<NgCytoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgCytoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCytoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
