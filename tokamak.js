// Extend the View paradigm with States
TKView = Backbone.View.extend({
  constructor: function( options ) {
    var _view = this;
    options || ( options = {} );

    this.states = options.states || {};
    Backbone.View.apply(_view, arguments);

    $(document).ready( function() {
    	_view.initialize(options);
    });
  },

  initialize: function(options) {
	this.el = options.el || null;
    
    this.saveBaseState();
    if(options.state) {
      this.pushState( options.state );
    }
    this.render();
  },

  render: function() {
    if(!this.vue) {
      this.vue = new Vue({
        el: this.el,
        data: this.model
      });
    }
  },

  get classes( ) {
	if(this.$el) 	{ return _.toArray( this.$el.attr('class').split(/\s+/) ); }
	else			{ return null; }
  },

  set classes( newClasses ) {
  	if( typeof newClasses === 'string' ) {
  		this.$el.attr('class', newClasses);
  	} else {
  		this.$el.attr('class', newClasses.join(' '));
  	}
  },

  saveBaseState: function() {
    this.baseState = {
      events:     this.events,
      multistate: this.multistate     
    };
  },

  createState: function( name, state ) {
    state = (typeof state === State) ? state : new State( state );
    this.states[name] = state;

    return this;
  },

  // Private method for applying a state
  _applyState: function( state ) {
    this.events = _.union( this.events, state.events);
    this.classes = _.union( this.classes, state.classes);
    this.state = state;
  },

  // Private method for cleaning up the previous state
  _removeState: function( state ) {
  	this.events = _.difference( this.events, state.events );
  	this.classes = _.difference( this.classes, state.classes );
  	this.state = null;
  },

  //Public method for changing the state
  pushState: function( name ) {
    var oldState = this.state,
        newState = this.states[name];

    // Old State
    if(oldState) {
    	this._removeState( state );
      	if(oldState.after) oldState.after( name );
    }

    // New State
    if(newState && newState.before) {
      newState.before();
    }   
    this._applyState( newState );
    if(this.state && this.state.on) {
      this.state.on();
    }

    this.trigger("stateChanged", { oldState: oldState, newState: newState });

  },

  popState: function() {

  }
});

TKComponentView = Backbone.View.extend({

})



// // Underscore methods that we want to implement on the Model.
// var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

// // Mix in each Underscore method as a proxy to `Model#attributes`.
// _.each(modelMethods, function(method) {
//   Model.prototype[method] = function() {
//     var args = slice.call(arguments);
//     args.unshift(this.attributes);
//     return _[method].apply(_, args);
//   };
// });