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
    self.slideNo = self.view.seq;
    self.prev = Math.max(1, self.view.seq - 1);
    self.next = Math.min(self.slideCount, self.view.seq + 1);
  });

  self.slideCount = 0;
  function slide(partial, title) {
    self.slideCount++;
    $route.when(
        '/' + self.slideCount,
        {seq:self.slideCount, template:'partials/' + partial + '.html', title:title});
  }

  slide('0_intro/00',   '');
  slide('0_intro/01',   'What\'s wrong with HTML');
  slide('0_intro/02',   'HTML');
  slide('0_intro/03',   'JavaScript');
  slide('0_intro/04',   'AJAX / Web 2.0');
  slide('0_intro/05',   'Lack of Abstraction');

  slide('1_html/00',    'But what about ...');
  slide('1_html/01',    'Hello Document!');
  slide('1_html/02',    'Hello JavaScript!');
  slide('1_html/03',    'Hello jQuery!');
  slide('1_html/04',    'Hello <angular/>!');
  slide('1_html/05',    'Hello <angular/> MVC');

  slide('2_form/00',    'Hello form');
  slide('2_form/01',    'Hello form');
  slide('2_form/02',    'Hello form');
  slide('2_form/03',    'Hello form');
  slide('2_form/04',    'jQuery???');
  slide('2_form/05',    'jQuery <3');
  slide('2_form/06',    'web-apps > DOM manipulation');

  slide('3_angular/00', 'increase the abstraction');
  slide('3_angular/01', 'XHR');
  slide('3_angular/02', 'Controllers and DI');

  slide('4_testing/00', 'Testing Behavior');
  slide('4_testing/01', 'How Testable?');
  slide('4_testing/02', 'Separation of Concerns');
  slide('4_testing/03', 'Dependency Injection');
  slide('4_testing/04', 'Test Herness');

  slide('5_angular/00', 'Implementation');
  slide('5_angular/01', 'Abstraction: $route');
  slide('5_angular/02', 'Abstraction: $resource');
  slide('5_angular/03', 'Abstraction: Input Validation');
  slide('5_angular/04', 'Abstraction: Filters and Formatters');
  slide('5_angular/05', 'Abstraction: Your DSL');
  slide('5_angular/06', 'HTML is here to stay');
  slide('5_angular/07', 'Angular Summary');
  slide('5_angular/08', 'We are not done yet');
  slide('5_angular/09', 'The End');

}

