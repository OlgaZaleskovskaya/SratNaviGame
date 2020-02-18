import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, timer, Subject } from 'rxjs';
import { map, tap, filter, take } from 'rxjs/operators';
import { IGameSettings, IGameSetting, Status } from '../model/model';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  gameSettings: IGameSettings;
  statusArray: Status[] = [];
  currentSize: number;
  currentDelay: number;
  winnerName: string = '';
  gameFieldArray: number[] = [];
  winCounter = 0;
  loseCounter = 0;
  message = "Welcome to our StarNavi!";
  messageBtn = "Play";
  onGameOver = new Subject<string>();


  constructor(private httpSrv: HttpService) { }

  getGameSettings(): Observable<string[]> {
    return this.httpSrv.getGameSettings().pipe(
      tap(res => this.gameSettings = res),
      map(obj => Object.keys(obj))
    );
  }

  getCurrentSetting(gameLevel: string): IGameSetting {
    this.currentSize = this.gameSettings[gameLevel]['field'];
    this.currentDelay = this.gameSettings[gameLevel]['delay'];
    this.createStatusArray(this.currentSize);
    this.generateGameFieldArray();
    return this.gameSettings[gameLevel];
  }

  private createStatusArray(size: number) {
    for (let i = 0; i < size * size; i++) {
      this.statusArray[i] = Status.Free;
    }
  }

  generateGameFieldArray() {
    this.gameFieldArray = [];
    for (let i = 0; i < this.currentSize; i++) {
      this.gameFieldArray.push(i)
    }
  }

  onStartGame(user: string) {
    this.createStatusArray(this.currentSize);
    this.message = "Game is started";
    this.winnerName = user;
    timer(this.currentDelay, this.currentDelay).pipe(
      map(res => this.getRandomIndex()),
      filter(res => !this.shootProcess(res)),
      tap(res => {
        this.winnerName = this.winCounter > this.loseCounter ? this.winnerName : "Computer";
        this.showWinMessage();
        this.onGameOver.next(this.winnerName);
        this.winCounter = this.loseCounter = 0;
      }),
      take(1)
    ).subscribe();
  }

  private shootProcess(fieldIndex: number): boolean {
    let activeIndex = this.statusArray.indexOf(Status.Aсtive);
    if (activeIndex >= 0) {
      this.statusArray[activeIndex] = Status.Lose;
      this.loseCounter++;
    };
    if (this.loseCounter > Math.pow(this.currentSize, 2) * 0.5 ||
      this.winCounter > Math.pow(this.currentSize, 2) * 0.5) {
      return false;
    }
    this.statusArray[fieldIndex] = Status.Aсtive;
    return true;
  }

  private getRandomIndex(): number {
    let tempo = 0;
    do {
      tempo = Math.floor(Math.random() * Math.pow(this.currentSize, 2));
    } while (this.statusArray[tempo] != Status.Free);
    return tempo;
  }

  onUserClick(l: number, k: number) {
    const ind = l * this.currentSize + k;
    if (this.statusArray[ind] == Status.Aсtive) {
      this.statusArray[ind] = Status.Win;
      this.winCounter++;
    }
  }

  private showWinMessage() {
    this.messageBtn = "Play again";
    this.message = ` ${this.winnerName} won`;
  }

}

