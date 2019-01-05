import { Component } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { bootstrapAngularJSApp } from '@lazy-angularjs-demo/bootstrap-angularjs-app';

@Component({
  selector: 'lazy-angularjs-demo-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent {
  constructor(private readonly upgrade: UpgradeModule) {}
  ngOnInit() {
    bootstrapAngularJSApp(this.upgrade);
  }
}
