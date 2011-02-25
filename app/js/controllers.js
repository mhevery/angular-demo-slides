/* App Controllers */

function PresentationCntrl($route, $window) {
  var self = this;
  // publish app controller for debugging in console
  $window.$layout = this;

  $route.parent(this);
  $route.otherwise({redirectTo:'/1'});
  $route.onChange(function(){
    $window.$view = $route.current.scope; // publish for debugging
    self.view = $route.current;
    self.prev = Math.max(1, self.view.seq - 1);
    self.next = Math.min(slideCount, self.view.seq + 1);
  });

  var slideCount = 0;
  function slide(partial, title) {
    slideCount++;
    $route.when(
        '/' + slideCount,
        {seq:slideCount, template:'partials/' + partial + '.html', title:title});
  }

  slide('html_is_broken',    'HTML is broken');
  slide('knowledge',         'What you need to build a web-app');
  slide('jQuery',            'jQuery solves DOM manipulation');

  slide('dom_manipulation',  'Manipulating DOM');
  slide('input',             'Reading input');
  slide('password',          'Application Behavior');
  slide('password_xhr',      'XHR');

  slide('overview',          'Overview');
  slide('template',          'View as a projection of model');
  slide('filters',           'Rendering your data');
  slide('directives',        'Directives');
  slide('lifecycle',         'Lifecycle');
  slide('services1',         'Basic building blocks of web-app');
  slide('services2',         'Basic building blocks of web-app');
  slide('di',                'Dependency injection');
  slide('unit-testing',      'Unit testing');
  slide('e2e-testing',       'Ende-to-end testing');

  slide('app_logic',         "Focus on what matters");
  slide('scafolding',        "Reduce Chaos");
  slide('learning_curve',    "Shorten Learning Curve");
  slide('maintenance',       "Reduce Maintainance");
  slide('development_speed', "Development Speed");
  slide('server',            "Simplify server implementation");

  slide('difference',        "It's different");
  slide('angular',           'A fresh start');
}

