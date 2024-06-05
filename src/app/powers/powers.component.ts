import { Component, OnInit } from '@angular/core';
import { Power } from './power';
import { PowersService } from '../service/powers.service';

@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.css']
})
export class PowersComponent implements OnInit{
  powers : Power[] = []

  constructor(private powerService: PowersService) { }

  ngOnInit():void {
    this.powerService.getPowers().subscribe((power) => {
      this.powers = power;
      console.log(this.powers);
  }) ;
  }
}
