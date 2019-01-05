import {
  Component,
  Injector,
  Input,
  OnInit,
  NgModuleFactoryLoader,
  ViewContainerRef,
  Type
} from '@angular/core';

import { UpgradeModule } from '@angular/upgrade/static';

/*
 * The LazyLoad component is used to lazy load an angular feature module at the component level.
 * You can use this to conditionally load a feature module using ngIf.
 *  1. Ensure your module is a seperate webpack chunk. This can be accomplished via the router - see Apps/Web/lazy-load-routes.ts
 *  2. Expose the entry component on the Module class as a static field.
 *     class MyLazyModule {
 *        public static entry = MyLazyEntryComponent;
 *     }
 *  3. Bind the modulePath (from step 1) to the component.
 *     <lazy-load [modulePath]="myLazyModulePath"></lazy-load>
 *  4. Add a *basic* smoke test to cover your scenario. The logic here is highly angular dependend and difficult to UT,
 *     so we cover it through basic e2e smoke tests.
 *
 * This component also supports loading an AngularJS module automatically if one is provided with
 * the `DOWNGRADE_MODULES` injection token.
 */

@Component({
  selector: 'lazy-load',
  // This component loads in the entry component from the lazy module and has no need for inner template.
  template: ''
})
export class LazyComponent implements OnInit {
  /* The modulePath as defined in webpack (See Apps/Web/lazy-module-routes.ts) or typings/LazyLoadedConstants.d.ts */
  @Input() modulePath: string;

  @Input() modern: boolean;

  /** arguments for the lazy loaded component */
  @Input() inputArgs: { [key: string]: any };

  constructor(
    private readonly loader: NgModuleFactoryLoader,
    private readonly injector: Injector,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly upgrade: UpgradeModule
  ) {}

  public async ngOnInit(): Promise<void> {
    if (!this.modern) {
      const {
        bootstrapAngularJSApp
      } = await import('@lazy-angularjs-demo/bootstrap-angularjs-app');
      bootstrapAngularJSApp(this.upgrade);
    }
    const modulePath = this.modulePath;
    // Load the js via SystemJs.
    const moduleFactory = await this.loader.load(modulePath);

    // Create the lazy feature module
    const moduleRef = moduleFactory.create(this.injector);

    let entryComponent: Type<any> = (moduleFactory.moduleType as any).entry;
    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
      entryComponent
    );

    // Create the component on the view container of the directive.
    const component = this.viewContainerRef.createComponent(compFactory);
    (<any>component.instance).inputArgs = this.inputArgs;
  }
}
