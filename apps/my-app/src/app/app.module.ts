import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LazyComponentModule } from '@lazy-angularjs-demo/lazy-component';
import {
  UpgradeModule,
  downgradeInjectable,
  downgradeComponent
} from '@angular/upgrade/static';
import { NameService } from './name/name.service';
import {
  DowngradeInjectable,
  DowngradeComponent,
  provideDowngradeComponent
} from '@lazy-angularjs-demo/downgrade';
import { NameComponent } from './name/name.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NameComponent],
  entryComponents: [NameComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'lazy',
          loadChildren: './lazy/lazy.module#LazyModule'
        },
        {
          path: '_dummy-menu',
          loadChildren: './menu/menu.module#MenuModule'
        },
        {
          path: '**',
          loadChildren:
            '@lazy-angularjs-demo/bootstrap-angularjs-app#LazyAngularjsModule'
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    LazyComponentModule,
    UpgradeModule
  ],
  providers: [
    NameService,
    {
      provide: DowngradeInjectable,
      useValue: {
        key: 'nameService',
        injectable: downgradeInjectable(NameService)
      },
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
