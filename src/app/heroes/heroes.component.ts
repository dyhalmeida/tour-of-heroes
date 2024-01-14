import { Component, OnInit } from '@angular/core';
import { IHero } from '../interfaces/hero.interface';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})

export class HeroesComponent implements OnInit {
  heroes: IHero[] = []

  constructor(
    private heroService: HeroService,
  ) {}

  getHeroes() {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => this.heroes = heroes)
  }

  ngOnInit(): void {
    this.getHeroes()
  }

}
