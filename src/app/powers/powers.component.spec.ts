import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PowersComponent } from './powers.component';
import { PowersService } from '../service/powers.service';
import { of } from 'rxjs';

describe('PowersComponent', () => {
  let component: PowersComponent;
  let fixture: ComponentFixture<PowersComponent>;
  let mockPowersService: jasmine.SpyObj<PowersService>;

  beforeEach(async () => {
    mockPowersService = jasmine.createSpyObj('PowersService', ['getPowers']);

    await TestBed.configureTestingModule({
      declarations: [ PowersComponent ],
      providers: [
        { provide: PowersService, useValue: mockPowersService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch powers on init', fakeAsync(() => {
    const dummyPowers = [
      { id: 1, name: 'Power 1', createdAt: '', updatedAt: '' },
      { id: 2, name: 'Power 2', createdAt: '', updatedAt: '' }
    ];

    mockPowersService.getPowers.and.returnValue(of(dummyPowers));

    fixture.detectChanges();
    tick();

    expect(component.powers.length).toBe(2);
    expect(component.powers[0].name).toBe('Power 1');
    expect(component.powers[1].name).toBe('Power 2');
  }));
});
