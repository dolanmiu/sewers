import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public test$: Observable<any>;

  public tubing = {
    in$: new Subject(),
    out$: new Subject()
  };

  public constructor() {
    console.log(this.tubing);
    this.tubing.out$.subscribe((e) => {
      console.log('tubing val', e);
    });
  }

  public ngOnInit() {
    console.log('tubing', this.tubing);
    console.log(this.test$);
  }

  public ngAfterViewInit() {
    console.log(this.tubing);
  }

  public change(e: any): void {
    console.log(e);
  }
}
