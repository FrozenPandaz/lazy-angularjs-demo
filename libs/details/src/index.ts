class DetailsComponent implements ng.IComponentController {
  public name = 'World';
}

angular
  .module('my-app', ['ui.router', 'ui.router.upgrade'])
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
      template: '<h3>Hello AngularJS Route!</h3>'
    });
    $stateProvider.state({
      name: 'about',
      url: '/about',
      template: '<h3>About AngularJS Route!</h3>'
    });
    $stateProvider.state({
      name: 'empty',
      url: '/*path',
      template: ''
    });
  });
