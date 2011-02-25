function MyCntrl($resource){
  var Book = $resource('books.json');

  this.fetch = function(){
    this.books = Book.query();
  };
}

describe('MyCntrl', function(){
  it('should fetch books', function(){
    var rootScope = angular.scope();
    var myCntrl = rootScope.$new(MyCntrl);

    expect(myCntrl.books).toBeUndefined();

    // train the browser expectations
    rootScope.$testing.$browser.xhr.expectGET('books.json').respond([{name:'A'}, {name:'B'}]);

    myCntrl.fetch();
    expect(myCntrl.books).toEqual([]);

    // flush the responses
    rootScope.$testing.$browser.xhr.flush();

    expect(myCntrl.books).toEqualData([{name:'A'}, {name:'B'}]);
  });
});
