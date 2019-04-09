import { TestBed } from '@angular/core/testing';

import { DataloadService } from './dataload.service';

describe('DataloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataloadService = TestBed.get(DataloadService);
    expect(service).toBeTruthy();
  });
});
