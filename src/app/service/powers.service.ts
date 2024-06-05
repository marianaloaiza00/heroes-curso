import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Power } from '../powers/power';

@Injectable({
  providedIn: 'root'
})
export class PowersService {

  constructor(private http: HttpClient) { }

  getPowers():Observable<Power[]> {
    return this.http.get<Power[]>('http://localhost:3000/powers');
  }
}
