import { TestBed } from '@angular/core/testing';

import { DatawriteService } from './datawrite.service';

describe('DatawriteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatawriteService = TestBed.get(DatawriteService);
    expect(service).toBeTruthy();
  });
});
