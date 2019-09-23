import { Subscription, Observable } from 'rxjs';
import {
  SimpleChanges,
  Component,
  OnInit,
  OnChanges,
  ɵmarkDirty as markDirty,
  OnDestroy,
} from '@angular/core';
import { tap } from 'rxjs/operators';

interface ComponentWithInterfaces
  extends Component,
    OnInit,
    OnChanges,
    OnDestroy {}
// string extends Observable<any> ? P : never
export function Sink<C>(
  params: {
    [P in keyof C]?: string extends keyof C ? never : keyof C;
  },
) {
  // tslint:disable-next-line: only-arrow-functions
  const func = function<
    T extends new (...args: any[]) => ComponentWithInterfaces
  >(target: T) {
    const clazz = class extends target {
      private subscribedObservables: Subscription[] = [];

      public constructor(..._: any[]) {
        super();
        // this['obs'] = 'hi';
      }

      public ngOnInit(): void {
        if (super.ngOnInit) {
          super.ngOnInit();
        }
      }

      public ngOnChanges(changes: SimpleChanges): void {
        this.collapseObservables();
        if (super.ngOnChanges) {
          super.ngOnChanges(changes);
        }
      }

      private collapseObservables(): void {
        const sink = {} as T;

        for (const key in params) {
          if (!params[key]) {
            continue;
          }

          const observable$ = this[params[key] as string] as Observable<any>;
          //   observable$.subscribe(() => markDirty(this));
          const subscription = observable$
            .pipe(
              tap(value => {
                this[key as string] = value;
              }),
            )
            .subscribe();

          this.subscribedObservables.push(subscription);
        }
      }

      public ngOnDestroy() {
        for (const subscription of this.subscribedObservables) {
          subscription.unsubscribe();
        }

        if (super.ngOnDestroy) {
          super.ngOnDestroy();
        }
      }
    };

    return clazz;
  };

  return func as <T extends new (...args: any[]) => {}>(target: T) => {} & T;
}
