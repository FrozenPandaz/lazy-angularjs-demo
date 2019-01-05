import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy-component/lazy-component.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LazyComponent],
  exports: [LazyComponent]
})
export class LazyComponentModule {}
