describe('password generator', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html#/password');
  });


  it('should show/hide password', function() {
    wait();
    input('password').enter('abc');
    expect(binding('password')).toEqual('abc');
    expect(element('tt').css('display')).toEqual('inline');

    wait();
    input('showPwd').check();
    expect(element('tt').css('display')).toEqual('none');

    wait();
  });

  it('should grade password', function(){
    wait();
    input('password').enter('abc');
    expect(binding('strength')).toEqual('weak');

    wait();
    input('password').enter('abcdefg');
    expect(binding('strength')).toEqual('medium');

    wait();
    input('password').enter('abcdefgijkl');
    expect(binding('strength')).toEqual('strong');

    wait();
  });

  it('should grade password', function(){
    wait();

    input('password').enter('...');
    expect(binding('password')).toEqual('...');

    wait();
    element(':button').click();
    expect(binding('password')).not().toEqual('...');
    expect(binding('password')).not().toEqual('');

    wait();
  });
});
