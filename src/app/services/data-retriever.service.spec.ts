import { TestBed } from '@angular/core/testing';

import { DataRetrieverService } from './data-retriever.service';

describe('DataRetrieverService', () => {
  let service: DataRetrieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRetrieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
