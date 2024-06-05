import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroesService } from '../service/heroes.service';
import { PowersService } from '../service/powers.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockPowersService: jasmine.SpyObj<PowersService>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHeroes']);
    mockPowersService = jasmine.createSpyObj('PowersService', ['getPowers']);

    await TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: PowersService, useValue: mockPowersService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch heroes and powers on init', fakeAsync(() => {
    const dummyHeroes = [{ id: 1, name: 'Hero 1', alias: 'Alias 1', power: 1, createdAt: '', updatedAt: '' }];
    const dummyPowers = [{ id: 1, name: 'Power 1', createdAt: '', updatedAt: '' }];

    mockHeroesService.getHeroes.and.returnValue(of(dummyHeroes));
    mockPowersService.getPowers.and.returnValue(of(dummyPowers));

    fixture.detectChanges();
    tick();

    expect(component.heroes.length).toBe(1);
    expect(component.heroes[0].name).toBe('Hero 1');
    expect(component.heroes[0].powerName).toBe('Power 1');
  }));
});
