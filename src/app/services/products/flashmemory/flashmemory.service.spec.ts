import { TestBed } from '@angular/core/testing';

import { FlashmemoryService } from './flashmemory.service';

describe('FlashmemoryService', () => {
  let service: FlashmemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashmemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
