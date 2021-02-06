import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSvgBgComponent } from './basic-svg-bg.component';

describe('BasicSvgBgComponent', () => {
  let component: BasicSvgBgComponent;
  let fixture: ComponentFixture<BasicSvgBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSvgBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSvgBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
