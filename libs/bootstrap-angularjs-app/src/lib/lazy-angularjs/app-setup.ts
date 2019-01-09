import { Injector, Type } from '@angular/core';
import { setAngularJSGlobal, UpgradeModule } from '@angular/upgrade/static';

import { setUpLocationSync } from '@angular/router/upgrade';

import * as angular from 'angular'; // replace with const angular = (<any>window).angular; if Angular is available globally

import '@uirouter/angular-hybrid';
import 'oclazyload';
import '@lazy-angularjs-demo/details'; // import your application files here.
import {
  DowngradeInjectable,
  DowngradeComponent,
  AngularJsInjectableDef,
  AngularJsComponentDef
} from '@lazy-angularjs-demo/downgrade';

export const upgradedComponents = [];

// additional configuration invoked right before bootstrap
export function bootstrapAngularJSApp(upgrade: UpgradeModule) {
  if (angular.element(document.getElementById('app')).scope()) {
    return;
  }
  const module = angular.module('downgraded', []);
  addDowngradedModulesToAngularJSModule(upgrade.injector, module);
  setAngularJSGlobal(angular);
  //  Insert additional configuration here
  angular.module('downgraded').run(() => {
    setUpLocationSync(upgrade.injector.get(UpgradeModule));
  });
  upgrade.bootstrap(document.getElementById('app'), [
    'downgraded',
    'my-app',
    'oc.lazyLoad'
  ]);
  const text = document.createElement('p');
  text.innerText = 'AngularJS Bootstrapped';
  document.body.appendChild(text);
}

export function lazyLoadToAngularJS(moduleName: string, injector: Injector) {
  const ocLazyLoad = angular
    .element(document.getElementById('app'))
    .injector()
    .get<any>('$ocLazyLoad');

  const module = angular.module(moduleName, []);
  addDowngradedModulesToAngularJSModule(injector, module);
  console.log('ocLazyLoad.injecting', moduleName);
  ocLazyLoad.inject(moduleName);
}

function addDowngradedModulesToAngularJSModule(
  injector: Injector,
  module: ng.IModule
) {
  const downgradeInjectables: AngularJsInjectableDef[] = injector.get<
    AngularJsInjectableDef[]
  >(DowngradeInjectable, []);
  const downgradeComponents: AngularJsComponentDef[] = injector.get<
    AngularJsComponentDef[]
  >(DowngradeComponent, []);
  console.log(downgradeInjectables, downgradeComponents);
  downgradeInjectables.forEach(injectableDef => {
    module.factory(injectableDef.key, injectableDef.injectable);
  });

  downgradeComponents.forEach(componentDef => {
    module.directive(componentDef.key, componentDef.component);
  });
}
