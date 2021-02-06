import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicShapeComponent } from './basic-shape.component';

describe('BasicShapeComponent', () => {
  let component: BasicShapeComponent;
  let fixture: ComponentFixture<BasicShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
