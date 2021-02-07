import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMapComponent } from './help-map.component';

describe('HelpMapComponent', () => {
  let component: HelpMapComponent;
  let fixture: ComponentFixture<HelpMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
