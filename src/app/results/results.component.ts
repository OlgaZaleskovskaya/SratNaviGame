import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { ResultsService } from '../shared/results.service';
import { Winner } from '../model/model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  winners: Winner[];
  subscription: Subscription;

  constructor(public resultsSrv: ResultsService) {

  }

  ngOnInit(): void {
    this.resultsSrv.getGamesList();
  }


}
