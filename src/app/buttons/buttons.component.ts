import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterContentChecked, DoCheck } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GameService } from '../shared/game.service';
import { IGameSetting, Status } from '../model/model';
import { ResultsService } from '../shared/results.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  public levels: Observable<string[]>;
  public currentLevel: string;
  public currentSetting: IGameSetting;
  public currentUser: string;
  public messageBtn = "play";


  @ViewChild("fields", { static: false })
  fields: ElementRef;

  constructor(public gameSrv: GameService, public resSrv: ResultsService) {
  }

  ngOnInit(): void {
    this.levels = this.gameSrv.getGameSettings();
    this.gameSrv.onGameOver.subscribe(res => {
      this.addWinner(res);
    }
    );
  }

  public onStartGame() {
    this.currentUser = this.currentUser?this.currentUser:"anonimous";
    this.gameSrv.onStartGame(this.currentUser);
  }

  onOptionSelect(ev: Event): void {
    this.currentLevel = ev.target['value'];
    this.currentSetting = this.gameSrv.getCurrentSetting(this.currentLevel);
  }

  getStatus(n: number, k: number): Status {
    return this.gameSrv.statusArray[n * this.gameSrv.currentSize + k];
  }

  public getSize(): number {
    const wrapperSize = this.fields.nativeElement.getBoundingClientRect().width;
    const fieldSize = Math.floor(wrapperSize / this.currentSetting.field);
    return fieldSize;
  }

  private addWinner(name: string): void {
    
    this.gameSrv.winnerName = name;
    this.resSrv.addWinner(name);
  }


}
