'use strict';

describe('Directive: dropdownDirective', function () {

  // load the directive's module
  beforeEach(module('splunkconfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dropdown-directive></dropdown-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dropdownDirective directive');
  }));
});
