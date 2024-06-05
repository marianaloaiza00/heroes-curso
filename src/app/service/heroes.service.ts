import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../heroes/heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>('http://localhost:3000/heroes');
  }
}
