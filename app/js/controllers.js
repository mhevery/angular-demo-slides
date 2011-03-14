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

}

