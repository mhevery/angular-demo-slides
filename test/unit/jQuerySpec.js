      var SERVICE_URL = 'http://angularjs.org/' +
       'generatePassword.php?callback=JSON_CALLBACK';
      function passwordMain(){
        // get references to DOM elements
        var input = $(':input[type=password]');
        var show = $(':checkbox');
        var strength = $('.strength');
        var password = $('.password');
        var button = $(':button');
        var grade;

        // Register behavior
        button.bind('click', function(){
          var r = $.ajax({
            url:SERVICE_URL,
            complete:function(response){
              input.val(response.password);
              change();
            }
          });
        });

        input.bind('keydown', function(){
          setTimeout(change, 0);
        });

        show.bind('click', function(){
          if (show.is(':checked')) {
            password.show();
          } else {
            password.hide();
          }
        });

        function change(){
          strength.removeClass(grade);
          var pwd = input.val();
          password.text(pwd);
          if (pwd.length > 8) {
            grade = 'strong';
          } else if (pwd.length > 3) {
            grade = 'medium';
          } else {
            grade = 'weak';
          }
          strength
           .addClass(grade)
           .text(grade);
        }

        //reset initial state
        change();
      }

describe('jQuery password', function(){
  var input, show, strength, password, button;

  beforeEach(function(){
    $('body').html(
        '<input type="password">' +
        '<input type="checkbox">' +
        '<span class="password"></span>' +
        '<span class="strength"></span>' +
        '<button class="generate"></button>');

    input = $(':input[type=password]');
    show = $(':checkbox');
    strength = $('.strength');
    password = $('.password');
    button = $(':button');

    passwordMain();
  });

  it('should show/hide password', function(){
    expect(password.is(':visible')).toBeTruthy();
    show.click();
    expect(password.is(':visible')).toBeFalsy();
  });

  it('should echo password', function(){
    input.val('abc123');
    input.trigger('keydown');
    expect(password.text()).toEqual('');
    waits(1);
    runs(function(){
      expect(password.text()).toEqual('abc123');
    });
  });

  it('should grade password', function(){
    input.val('abc');
    input.trigger('keydown');
    waits(1);
    runs(function(){
      expect(strength.text()).toEqual('weak');

      input.val('abcefg');
      input.trigger('keydown');
      waits(1);
      runs(function(){
        expect(strength.text()).toEqual('medium');

        input.val('abcefgijk');
        input.trigger('keydown');
        waits(1);
        runs(function(){
          expect(strength.text()).toEqual('strong');
        });
      });
    });
  });

  it('should fetch password from server', function(){
    // monkey patch
    var oldAjax = $.ajax;
    $.ajax = jasmine.createSpy('ajax');

    button.click();

    expect($.ajax).wasCalled();
    expect($.ajax.mostRecentCall.args[0].url).toEqual(SERVICE_URL);
    expect(password.text()).toEqual('');

    $.ajax.mostRecentCall.args[0].complete({password:'abc123'});
    expect(password.text()).toEqual('abc123');

    // restore
    $.ajax = oldAjax;
  });

});
