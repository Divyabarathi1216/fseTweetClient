import { TestBed } from '@angular/core/testing';

import { TweetAppService } from './tweet-app.service';

describe('TweetAppService', () => {
  let service: TweetAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
