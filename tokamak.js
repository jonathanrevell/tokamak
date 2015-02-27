Backbone.View.extend({
	
	constructor: function() {
		this.vue = new Vue({
			el: this.el
			data: this.model
		})

		Backbone.View.apply(this, arguments);
	}


})