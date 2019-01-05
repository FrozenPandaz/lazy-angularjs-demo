import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LazyComponentModule } from '@lazy-angularjs-demo/lazy-component';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [AppComponent, HomeComponent],
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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
