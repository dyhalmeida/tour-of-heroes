import { Injectable } from '@angular/core';
import { IHero } from './interfaces/hero.interface';
import { mockHeroes } from './mock/heroes.mock';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<IHero[]> {
    const heroes = of(mockHeroes)
    this.messageService.add('HeroService: fetched heroes')
    return heroes
  }

  getHero(id: number): Observable<IHero> {
    const hero = mockHeroes.find((hero) => hero.id === id)!
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero)
  }
}
