import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CytographComponent } from './cytograph.component';

describe('CytographComponent', () => {
  let component: CytographComponent;
  let fixture: ComponentFixture<CytographComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CytographComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CytographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
