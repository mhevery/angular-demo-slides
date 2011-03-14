var SERVICE_URL = 'http://angularjs.org/' +
 'generatePassword.php?callback=JSON_CALLBACK';

function PasswordController($xhr){
  this.password = '';
  this.strength = null;
  this.showPwd = true;

  this.$watch('password', function(){
    if (this.password.length > 8) {
      this.strength = 'strong';
    } else if (this.password.length > 3) {
      this.strength = 'medium';
    } else {
      this.strength = 'weak';
    }
  });

  this.generate = function(){
    var self = this;
    $xhr('JSON', SERVICE_URL, function(code, response){
      self.password = response.password;
    });
  };
}

describe('PasswordController', function(){
  var root, controller;

  beforeEach(function(){
    root = angular.scope();
    controller = root.$new(PasswordController);
  });

  it('should grade password', function(){
    controller.password = 'abc';
    controller.$eval();
    expect(controller.strength).toEqual('weak');

    controller.password = 'abcdefg';
    controller.$eval();
    expect(controller.strength).toEqual('medium');

    controller.password = 'abcdefgijk';
    controller.$eval();
    expect(controller.strength).toEqual('strong');
  });

  it('should fetch password from server', function(){
    var $browser = root.$service('$browser');
    $browser.xhr
      .expect('JSON', SERVICE_URL)
      .respond({password: 'abc123'});
    controller.generate();

    expect(controller.password).toEqual('');

    $browser.xhr.flush();

    expect(controller.password).toEqual('abc123');
  });
});
