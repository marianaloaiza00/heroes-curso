import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../heroes/heroes';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService]
    });

    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Hero[]>', () => {
    const dummyHeroes: Hero[] = [
      { id: 1, name: 'Hero 1', alias: 'Alias 1', power: 100, createdAt: '', updatedAt: '' },
      { id: 2, name: 'Hero 2', alias: 'Alias 2', power: 200, createdAt: '', updatedAt: '' }
    ];

    service.getHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });
});
