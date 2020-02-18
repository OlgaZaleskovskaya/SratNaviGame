import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IGameSettings,  Winner } from '../model/model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL = "https://starnavi-frontend-test-task.herokuapp.com/";
  constructor(private http: HttpClient) { }

  getGameSettings(): Observable<IGameSettings> {
    return this.http.get<IGameSettings>(this.URL + "game-settings").pipe(
      catchError(this.handleError)
    );
  }

  getGamesList(): Observable<Winner[]> {
    return this.http.get<Winner[]>(this.URL + "winners");
  }

  addWinner(winner: Winner): Observable<any> {
    return this.http.post<Winner>(this.URL + "winners", winner)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error occurred:', error.error.message);
    } else {
      console.error(
        `Backend code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}