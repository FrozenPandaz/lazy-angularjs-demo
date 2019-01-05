import { Injector } from '@angular/core';
import { setAngularJSGlobal, UpgradeModule } from '@angular/upgrade/static';

import { setUpLocationSync } from '@angular/router/upgrade';

import * as angular from 'angular'; // replace with const angular = (<any>window).angular; if Angular is available globally

import '@uirouter/angular-hybrid';

import '@lazy-angularjs-demo/details'; // import your application files here.

// all components downgraded from Angular to AngularJS go here
angular.module('downgraded', []);

// all components upgraded from AngularJS to Angular go here
export const upgradedComponents = [];

// additional configuration invoked right before bootstrap
export function bootstrapAngularJSApp(upgrade: UpgradeModule) {
  if (angular.element(document.getElementById('app')).scope()) {
    return;
  }
  setAngularJSGlobal(angular);
  //  Insert additional configuration here
  angular.module('downgraded').run(() => {
    setUpLocationSync(upgrade.injector.get(UpgradeModule));
  });
  upgrade.bootstrap(document.getElementById('app'), ['downgraded', 'my-app']);
  const text = document.createElement('p');
  text.innerText = 'AngularJS Bootstrapped';
  document.body.appendChild(text);
}
