import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../service/heroes.service';
import { Hero } from './heroes';
import { PowersService } from '../service/powers.service';
import { forkJoin, map } from 'rxjs';
import { Location } from '@angular/common';

interface HeroWithPowerName extends Hero {
  powerName: string;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroWithPowerName[] = [];

  constructor(
    private heroService: HeroesService,
    private powerService: PowersService,
    private location: Location
  ) {}

  ngOnInit(): void {
    forkJoin({
      heroes: this.heroService.getHeroes(),
      powers: this.powerService.getPowers(),
    })
      .pipe(
        map(({ heroes, powers }) => {
          return heroes.map((hero) => {
            const power = powers.find((p) => p.id === hero.power);
            return {
              ...hero,
              powerName: power ? power.name : 'Sin poder',
            } as HeroWithPowerName;
          });
        })
      )
      .subscribe((mergedHeroes) => {
        this.heroes = mergedHeroes;
      });
  }

  goBack(): void {
   this.location.back();
  }
}
