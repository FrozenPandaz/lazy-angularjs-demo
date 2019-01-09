class DetailsComponent implements ng.IComponentController {
  public name = 'World';
  public static $inject: string[] = ['nameService'];
  constructor(private nameService: any) {
    console.log(nameService);
  }
}

angular
  .module('my-app', ['oc.lazyLoad', 'ui.router', 'ui.router.upgrade'])
  .component('myDetails', {
    template: `AngularJS Details: Hello {{$ctrl.name}}`,
    controller: DetailsComponent,
    controllerAs: '$ctrl'
  })
  .config(function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state({
      name: 'hello',
      url: '/hello',
      template: '<h3>Hello AngularJS Route!</h3><my-details></my-details>'
    });
    $stateProvider.state({
      name: 'about',
      url: '/about',
      template: '<h3>About AngularJS Route!</h3><name></name>'
    });
    $stateProvider.state({
      name: 'empty',
      url: '/*path',
      template: ''
    });
  });
