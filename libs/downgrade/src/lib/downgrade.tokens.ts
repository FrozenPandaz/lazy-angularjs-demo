import { InjectionToken, Type } from '@angular/core';
export interface AngularJsInjectableDef {
  key: string;
  injectable: Function;
}
export interface AngularJsComponentDef {
  key: string;
  component: any;
}
export const DowngradeInjectable = new InjectionToken<AngularJsInjectableDef>(
  'DowngradeInjectable'
);
export const DowngradeComponent = new InjectionToken<AngularJsComponentDef>(
  'DowngradeComponent'
);

export function provideDowngradeComponent(name: string, component: any) {
  return {
    provide: DowngradeComponent,
    useValue: {
      key: name,
      component
    },
    multi: true
  };
}
