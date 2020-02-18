import { Component, OnInit, Input } from '@angular/core';
import { Status } from '../../model/model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() status: Status;
  @Input() size: number;
  constructor() { }

  ngOnInit(): void {
  }

  setClass(): string {
    switch (this.status) {
      case Status.Free:
        return "white";
      case  Status.Aсtive:
        return "blue";
      case  Status.Win:
        return "green";
      case  Status.Lose:
        return "red";
    }
  }
  getStyle(): Object{
    const size = this.size + 'px';
    return {'height':size, 'width': size};
  }
}

