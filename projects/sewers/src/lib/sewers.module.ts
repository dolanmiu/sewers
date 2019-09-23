import { NgModule } from '@angular/core';

import { SewersComponent } from './sewers.component';
import { ModelDirective } from './model.directive';



@NgModule({
  declarations: [SewersComponent, ModelDirective],
  imports: [
  ],
  exports: [SewersComponent, ModelDirective]
})
export class SewersModule { }
