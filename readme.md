1. Keep Markup Separate from Scripting
2. Easy debugging from the HTML
3. Enable initialization of views with HTML only

jQuery controller lookup

//Shorthand for Tokamak.getController
$controller('.todo-list:first-child').model.get('completed')
$model('.todo-list:first-child').get('completed')

//Will get the controller for a particular element


$controller('.todo-list:first-child').parent()

A stateChange returns a promise, enabling clean and complete transitions between states
$controller(...).pushState("completed").then()

stateMap:
	stateA:
		color:blue,
		completed:false,
		classes: [
			"completed"
		],
		before: [
			collapse
		],
		after: [
			expand
		],
		events: {
			"click": "close" 
		},
		triggers: [
			"color: blue"
		],
		// Default behavior is one state at a time
		multistate: {
			"allow": "allowedMultiState",
			"disallow": "disallowedState",
			"all"		//Allow any combination of state
		}

$view('.todo-list:first-child').('checkbox').value;
$view('.todo-list:first-child').('input').value;

State Mixing
- stateExclusive
- state


Tokamak combines
1. jQuery		(DOM targeting)
2. Backbone		(View/Model abstraction + routing)
3. Vue.js		(Two way binding / DOM construction)
4. Q 			(Promises)
5. Firebase 	(OPTIONAL: 3-Way Binding)
6. Browserify	(For require script loading)
7. Gulp			(For pre-building the site / combining templates)