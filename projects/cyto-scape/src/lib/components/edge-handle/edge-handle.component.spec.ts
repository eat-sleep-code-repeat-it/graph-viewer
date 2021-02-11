import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeHandleComponent } from './edge-handle.component';

describe('EdgeHandleComponent', () => {
  let component: EdgeHandleComponent;
  let fixture: ComponentFixture<EdgeHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
