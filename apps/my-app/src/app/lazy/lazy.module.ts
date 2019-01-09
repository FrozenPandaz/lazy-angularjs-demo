import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DowngradeComponent,
  provideDowngradeComponent
} from '@lazy-angularjs-demo/downgrade';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'lazy',
  template: 'Lazy Component'
})
export class LazyComponent {}

@NgModule({
  declarations: [LazyComponent],
  entryComponents: [LazyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '**',
        component: LazyComponent
      }
    ])
  ],
  providers: [
    provideDowngradeComponent(
      'lazy',
      downgradeComponent({
        component: LazyComponent
      })
    )
  ]
})
export class LazyModule {
  public static entry = LazyComponent;
}
