import { TestBed } from '@angular/core/testing';

import { SewersService } from './sewers.service';

describe('SewersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SewersService = TestBed.get(SewersService);
    expect(service).toBeTruthy();
  });
});
