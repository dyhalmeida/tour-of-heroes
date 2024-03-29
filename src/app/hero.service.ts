import { Injectable } from '@angular/core';
import { IHero } from './interfaces/hero.interface';
import { mockHeroes } from './mock/heroes.mock';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseUrl = 'api/heroes'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  updateHero(hero: IHero): Observable<any> {
    return this.httpClient.put(this.baseUrl, hero, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero id=${hero.id}`))
      )
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.httpClient.post<IHero>(this.baseUrl, hero, this.httpOptions).pipe(
      tap((newHero: IHero) => this.log(`added hero id=${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<IHero> {
    const url = `${this.baseUrl}/${id}`;

    return this.httpClient.delete<IHero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<IHero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<IHero[]>(`${this.baseUrl}/?name=${term}`).pipe(
      tap(heroes => heroes.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<IHero[]>('searchHeroes', []))
    );
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
