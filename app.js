// Extend Vue to get a reusable constructor
var MyComponent = Vue.extend({
  template: 'A custom component!'
})

// Register the constructor with id: my-component
Vue.component('my-component', MyComponent)

$(document).ready(function() {
	var TestView = new Vue({
		el: "#taskList",
		data: {
			tasks: [1,2,3,4,5]
		}
	});	
})






// var TestView

// $(document).ready( function() {
	// var view = new TKView({ el: "#taskList", model: { task: "Do something" } });
// });


// testView
// .createState("completed", {
// 	classes: [
// 		"completed"
// 	]
// });

// var demo = new Vue.AutoBind({
//     data: {
//         message: 'Hello Vue.js!'
//     }
// })



// TaskList = new Model({
// 	tasks: [],
// 	cloud: 
// });


// TaskList = {
// 	set cloud() {

// 	}
// }