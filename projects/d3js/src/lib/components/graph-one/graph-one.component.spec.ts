import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOneComponent } from './graph-one.component';

describe('GraphOneComponent', () => {
  let component: GraphOneComponent;
  let fixture: ComponentFixture<GraphOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
