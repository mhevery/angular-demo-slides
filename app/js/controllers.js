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

  slide('title',          '');
  slide('0_faq/00',       'FAQ');
  slide('0_faq/01',       'Dynamic');
  slide('0_faq/02',       'Error-prone');
  slide('0_faq/03',       'Solution');
  slide('0_faq/04',       'Why Hard');
  slide('1_jquery/00',    'jQuery');
  slide('1_jquery/01',    'refactor');
  slide('1_jquery/02',    'unit test');
  slide('2_angular/00',   'angular'); $route.when('/password', {redirectTo:'/' + self.slideCount});
  slide('2_angular/01',   'unit test');
  slide('2_angular/02',   'end-to-end test');
  slide('3_inventory/00', 'Questions');
  slide('3_inventory/01', 'Separation of Concerns');
  slide('3_inventory/02', 'Mocks');
  slide('3_inventory/03', 'Dependency Injection');
  slide('3_inventory/04', 'Global State');
  slide('3_inventory/05', 'Test Harness');
  slide('3_inventory/06', 'Test Harness: unit');
  slide('3_inventory/07', 'Test Harness: end-to-end');
  slide('end',            '');
}

