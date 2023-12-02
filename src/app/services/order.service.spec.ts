import { TestBed } from '@angular/core/testing';

import { ComServiceService } from './order.service';

describe('ComServiceService', () => {
  let service: ComServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
