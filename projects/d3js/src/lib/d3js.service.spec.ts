import { TestBed } from '@angular/core/testing';

import { D3jsService } from './d3js.service';

describe('D3jsService', () => {
  let service: D3jsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(D3jsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
