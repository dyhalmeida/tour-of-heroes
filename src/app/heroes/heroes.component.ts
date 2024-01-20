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

  add(name: string): void {
    name = name.trim()
    if (!name) return
    this.heroService.addHero({ name } as IHero)
      .subscribe((hero) => {
        this.heroes.push(hero)
      })
  }

  delete(hero: IHero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  ngOnInit(): void {
    this.getHeroes()
  }

}
