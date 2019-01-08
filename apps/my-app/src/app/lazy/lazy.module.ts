import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DowngradeComponent } from '@lazy-angularjs-demo/downgrade';

@Component({
  selector: 'lazy',
  template: 'Lazy Component'
})
export class LazyComponent {}

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '**',
        component: LazyComponent
      }
    ])
  ]
})
export class LazyModule {}
