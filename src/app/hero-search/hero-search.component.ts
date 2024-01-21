import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { HeroService } from '../hero.service';

import { IHero } from '../interfaces/hero.interface';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<IHero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService
  ){}

  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      /**
       * Espera até que o fluxo de novos eventos de string seja pausado por 300 milissegundos
       * antes de transmitir a string mais recente.
      */
      debounceTime(300),

      /**
       * garante que uma solicitação seja enviada somente se
       * o texto do filtro for alterado.
       */
      distinctUntilChanged(),

      /**
       * Chama o serviço de pesquisa para cada termo de pesquisa que passa por debounce()
       * e distinctUntilChanged(). Ele cancela e descarta os observáveis ​​de pesquisa anteriores,
       * retornando apenas o último observável do serviço de pesquisa.
       */
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
