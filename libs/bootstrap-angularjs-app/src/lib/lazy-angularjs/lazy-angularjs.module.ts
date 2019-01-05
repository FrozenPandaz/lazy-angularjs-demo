import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { upgradedComponents } from './app-setup';
import { RouterModule } from '@angular/router';

import {
  EmptyComponentModule,
  EmptyComponent
} from '@lazy-angularjs-demo/empty-component';
import { UIRouterModule } from '@uirouter/angular';

@NgModule({
  declarations: [...upgradedComponents],
  imports: [
    CommonModule,
    EmptyComponentModule,
    RouterModule.forChild([
      {
        path: '**',
        component: EmptyComponent
      }
    ]),
    UIRouterModule.forRoot()
  ]
})
export class LazyAngularjsModule {}
