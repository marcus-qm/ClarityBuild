import { TestBed } from '@angular/core/testing';

import { AuthEnforcerService } from './auth-enforcer.service';

describe('AuthEnforcerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthEnforcerService = TestBed.get(AuthEnforcerService);
    expect(service).toBeTruthy();
  });
});
