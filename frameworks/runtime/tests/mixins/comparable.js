// ==========================================================================
// Project:   SproutCore Runtime - Property Observing Library
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

"import core_test:qunit";
var SC = require('index'); // load sproutcore/foundation

/*globals module test ok isObj equals expects */

var Rectangle = SC.Object.extend({
  length: 0,
  width: 0,
  
  area: function() {
    return this.get('length') * this.get('width');
  }
});

Rectangle.mixin(SC.Comparable, {
  compare: function(a, b) {
    return SC.compare(a.area(), b.area());
  }
});

var r1, r2;

module("Comparable", {
  
  setup: function() {
    r1 = Rectangle.create({length: 6, width: 12});
    r2 = Rectangle.create({length: 6, width: 13});
  },
  
  teardown: function() {
  }
  
});

test("should be comparable and return the correct result", function() {
  equals(r1.constructor.isComparable, true);
  equals(SC.compare(r1, r1), 0);
  equals(SC.compare(r1, r2), -1);
  equals(SC.compare(r2, r1), 1);
});

run();
