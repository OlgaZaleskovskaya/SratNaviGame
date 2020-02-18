import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { Winner } from '../model/model';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  gamesList: Winner[] = [];
  onChangeWinnerList: Subject<Winner[]> = new Subject();

  constructor(private httpSrv: HttpService, private gameSrv: GameService) { }

  getGamesList(): void {
    this.httpSrv.getGamesList().subscribe(res => this.gamesList = res);
  }

  addWinner(name: string) {
    const winner = new Winner(name, this.createDate());
    this.httpSrv.addWinner(winner)
      .subscribe(res => this.gamesList = res);
  }

  private createDate(): string {
    const now = new Date();
    const options = {
      month: "long",
      year: "numeric",
    }
    return now.getHours() + ":"
      + (now.getMinutes() < 10 ? ("0" + now.getMinutes()) : now.getMinutes()) + "; "
      + now.getUTCDate() + " "
      + now.toLocaleDateString("en-RU", options);
  }

}
