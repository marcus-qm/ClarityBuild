import { TestBed } from '@angular/core/testing';

import { DatasaveService } from './datasave.service';

describe('DatasaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasaveService = TestBed.get(DatasaveService);
    expect(service).toBeTruthy();
  });
});
