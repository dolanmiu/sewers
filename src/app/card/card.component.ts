import { Component, Input, OnInit } from '@angular/core';
import { Sink } from 'projects/sewers/src/public-api';
import { Observable, of } from 'rxjs';

@Sink<CardComponent>({
  obs: 'obs$',
  data: 'data$'
})
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public obs$: Observable<string>;
  public readonly data$: Observable<string>;
  public data: string;
  public obs: string;

  constructor() {
    this.data$ = of('hello');
  }

  public ngOnInit() {
  }
}
