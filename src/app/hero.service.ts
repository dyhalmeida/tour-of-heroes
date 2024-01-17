import { Injectable } from '@angular/core';
import { IHero } from './interfaces/hero.interface';
import { mockHeroes } from './mock/heroes.mock';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseUrl = 'api/heroes'

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
  ) { }

  getHeroes(): Observable<IHero[]> {
    return this.httpClient.get<IHero[]>(this.baseUrl)
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError<IHero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<IHero> {
    const url = `${this.baseUrl}/${id}`

    return this.httpClient.get<IHero>(url)
      .pipe(
        tap(() => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<IHero>(`getHero id=${id}`))
      )
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }
}
