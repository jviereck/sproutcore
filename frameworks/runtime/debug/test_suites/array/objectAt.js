// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

var SC = require('core'),
    Ct = require('index', 'core_test');
require('debug/test_suites/array/base');

SC.ArraySuite.define(function(T) {
  
  T.module("objectAt");
  
  Ct.test("should return object at specified index", function(t) {
    var expected = T.expected(3), 
        obj      = T.newObject(3), 
        len      = 3,
        idx;
        
    for(idx=0;idx<len;idx++) {
      t.equal(obj.objectAt(idx), expected[idx], 'obj.objectAt(%@) should match'.fmt(idx));
    }
    
  });
  
  Ct.test("should return undefined when requesting objects beyond index", function(t) {
    var obj = T.newObject(3);
    t.equal(obj.objectAt(5), undefined, 'should return undefined for obj.objectAt(5) when len = 3');
    t.equal(T.object.objectAt(0), undefined, 'should return undefined for obj.objectAt(0) when len = 0');
  });
  
});
