import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PowersService } from './powers.service';
import { Power } from '../powers/power';

describe('PowersService', () => {
  let service: PowersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PowersService]
    });
    service = TestBed.inject(PowersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch powers as an Observable', () => {
    const dummyPowers: Power[] = [
      { id: 1, name: 'Super Strength', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
      { id: 2, name: 'Invisibility', createdAt: '2023-01-01', updatedAt: '2023-01-01' }
    ];

    service.getPowers().subscribe(powers => {
      expect(powers.length).toBe(2);
      expect(powers).toEqual(dummyPowers);
    });

    const req = httpMock.expectOne('http://localhost:3000/powers');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPowers);
  });
});
