// ==========================================================================
// Project:   SproutCore Runtime - Property Observing Library
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

"import core_test:qunit";
var SC = require('index'); // load sproutcore/foundation

var source, indexes, observer, obj ; // base array to work with
module("SC.RangeObserver#destroy", {
  setup: function() {
    
    // create array with 5 SC.Object's in them
    source = [1,2,3,4,5].map(function(x) {
      return SC.Object.create({ item: x, foo: "bar" }) ;
    }, this); 

    indexes = SC.IndexSet.create(2,2); // select 2..3
    
    observer = SC.Object.create({
      
      callCount: 0, 
      
      rangeDidChange: function() { 
        this.callCount++;
      }
      
    });

    obj = SC.RangeObserver.create(source, indexes, observer, observer.rangeDidChange, "context", true);
    
  }
});

test("returns receiver", function() {
  // for some reason doing equals() causes a stack exception (probably due
  // to a bug in jsDump)
  ok(obj.destroy() === obj, 'should return receiver');
});

// ..........................................................
// OBSERVING
// 

// NOTE: Since we are lazy about observing changes, we want to test both what
// happens if you destroy the observer before any changes have happend and 
// after changes have happened.

test("never observes changes if no changes happend", function() {
  obj.destroy();

  // change property on each object
  var len = source.length, idx;
  for(idx=0;idx<len;idx++) source[idx].set('foo', 'baz');

  // should not fire observer
  equals(observer.callCount, 0, 'range observer should not fire');
});

test("stops observes changes if changes happend before destroy", function() {
  var len = source.length, idx;

  // change property on each object
  for(idx=0;idx<len;idx++) source[idx].set('foo', 'baz');

  obj.destroy();

  // change property on each object again
  for(idx=0;idx<len;idx++) source[idx].set('foo', 'bar');

  // should fire observer only first time through
  equals(observer.callCount, 2, 'range observer should fire only first time through');
});

run();


