// ==========================================================================
// Project:   SproutCore Runtime - Property Observing Library
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

"import core_test:qunit";
var SC = require('index'); // load sproutcore/foundation

var first, second, third, binding1, binding2;

module("System:run_loop() - chained binding", {
  setup: function() {
    first = SC.Object.create({ 
      output: 'first' 
    }) ;
    
    second = SC.Object.create({ 
      input: 'second',
      output: 'second',
      
      inputDidChange: function() {
        this.set("output", this.get("input")) ;
      }.observes("input") 
    }) ;
    
    third = SC.Object.create({ 
      input: "third" 
    }) ;
    
    SC.global('first', first);
    SC.global('second', second);
    SC.global('third', third);
  },
  
  teardown: function() {
    SC.global.remove('first');
    SC.global.remove('second');
    SC.global.remove('third');
  }
});

test("Should propograte bindings after the RunLoop completes (using SC.RunLoop)", function() {
	SC.RunLoop.begin();
		//Binding of output of first object to input of second object
  		binding1 = SC.Binding.from("output", first).to("input", second).connect() ;
    	
		//Binding of output of second object to input of third object
		binding2 = SC.Binding.from("output", second).to("input", third).connect() ;
		
		SC.Binding.flushPendingChanges() ; // actually sets up the connection
		
		//Based on the above binding if you change the output of first object it should
		//change the all the variable of first,second and third object
		first.set("output", "change") ;
		
		//Changes the output of the first object
		equals(first.get("output"), "change") ;
		
		//since binding has not taken into effect the value still remains as change.
		equals(second.get("output"), "first") ;
	SC.RunLoop.end(); // allows bindings to trigger...
	
	//Value of the output variable changed to 'change'
	equals(first.get("output"), "change") ;
	
	//Since binding triggered after the end loop the value changed to 'change'.
	equals(second.get("output"), "change") ;
});

test("Should propograte bindings after the RunLoop completes (using SC.beginRunLoop)", function() {

		//Binding of output of first object to input of second object
  		binding1 = SC.Binding.from("output", first).to("input", second).connect() ;
    	
		//Binding of output of second object to input of third object
		binding2 = SC.Binding.from("output", second).to("input", third).connect();
		
		SC.Binding.flushPendingChanges() ; // actually sets up the connection

  	SC.RunLoop.begin();
		
		//Based on the above binding if you change the output of first object it should
		//change the all the variable of first,second and third object
		first.set("output", "change") ;
		
		//Changes the output of the first object
		equals(first.get("output"), "change") ;
		
		//since binding has not taken into effect the value still remains as change.
		equals(second.get("output"), "first") ;
	SC.RunLoop.end(); // allows bindings to trigger...
	
	//Value of the output variable changed to 'change'
	equals(first.get("output"), "change") ;
	
	//Since binding triggered after the end loop the value changed to 'change'.
	equals(second.get("output"), "change") ;
});

test("Should propograte bindings after the RunLoop completes (checking invokeOnce() function)", function() {
	SC.RunLoop.begin();
		//Binding of output of first object to input of second object
  		binding1 = SC.Binding.from("output", first).to("input", second).connect() ;
    	
		//Binding of output of second object to input of third object
		binding2 = SC.Binding.from("output", second).to("input", third).connect() ;
		
		SC.Binding.flushPendingChanges() ; // actually sets up the connection
		
		//Based on the above binding if you change the output of first object it should
		//change the all the variable of first,second and third object
		first.set("output", "change") ;
		
		//Changes the output of the first object
		equals(first.get("output"), "change") ;
		
		//since binding has not taken into effect the value still remains as change.
		equals(second.get("output"), "first") ;
		
		// Call the invokeOnce function to set the function which needs to be called once
		second.invokeOnce('second','inputDidChange');
		
	SC.RunLoop.end(); // allows bindings to trigger...
	
	//Value of the output variable changed to 'change'
	equals(first.get("output"), "change") ;
	
	//Since binding triggered after the end loop the value changed to 'change'.
	equals(second.get("output"), "change") ;
	
	//Set the output for the first so that the 'inputDidChange' function in the second object is called again
	first.set("output", "againChanged") ;
	
	//Value of the output variable changed to 'change'
	equals(first.get("output"), "againChanged") ;
	
	//Since the invoker function is called only once the value of output did not change.
	equals(second.get("output"), "change") ;
	
}); 


run();
