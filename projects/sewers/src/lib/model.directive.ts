import {
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
// import { filter } from 'rxjs/operators';

@Directive({
  selector: '[sewModel]',
})
export class ModelDirective implements OnInit, OnChanges, AfterViewInit {
  // private behaviorSubjectReference: BehaviorSubject<any>;
  @Input() public out: BehaviorSubject<string>;
  @Output() public outChange = new EventEmitter<BehaviorSubject<string>>();

  private _tubing: any = {
    in$: new Subject(),
    out$: new Subject(),
  };

  public constructor(@Self() private readonly ngControl: NgControl) {
    this.out = new BehaviorSubject('');
  }

  @Input()
  public set tubing(t: any) {
    this._tubing = t;
  }

  public get tubing(): any {
    return this._tubing;
  }

  public ngAfterViewInit() {
    this.outChange.next(this.out);
    console.log('set');

    this.ngControl.valueChanges.subscribe(v => {
      console.log('changing it', v);
      if (!this.out) {
        this.out = new BehaviorSubject('');
        this.outChange.next(this.out);
      }
      this.out.next(v);

      console.log(this._tubing.out$);
      this._tubing.out$.next(v);
    });
  }

  public ngOnInit(): void {
    if (!(this.ngControl instanceof NgModel)) {
      // If the ngControl is not an instanceof ngModel, return early
      return;
    }

    // this.ngControl.valueChanges
    //   .pipe(
    //     filter((value) => {
    //       return value instanceof BehaviorSubject || Boolean(this.behaviorSubjectReference);
    //     }),
    //   )
    //   .subscribe((value: BehaviorSubject<any> | any) => {
    //     if (value instanceof BehaviorSubject) {
    //       // Saving the behaviorSubject for later use
    //       //
    //       this.behaviorSubjectReference = value;
    //       this.ngControl.control.setValue(this.behaviorSubjectReference.value);
    //     } else {
    //       // If we are in the else clause, the first change has already gone by and we have a
    //       // behaviorSubjectReference we can call .next on
    //       //
    //       this.behaviorSubjectReference.next(value);
    //     }
    //   });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
