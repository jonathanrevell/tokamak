var State = Backbone.State = function(options) {
  options || (options = {});

};

_.extend(State.prototype, Backbone.Events, {
  classes:    [],
  before:     null,
  on:         null,
  after:      null,
  events:     {},
  triggers:   [],
  multistate: [],

  _isStateDescribedInSet: function( set, state ) {
    var isDescribed = false;

    _.each( set, function( entry ) {
      if( state.match( entry ) ) {
        isDescribed = true;
      }
    });
    return isDescribed;
  },

  isStateDescribedInAllowed: function( state ) {
    return _isStateDescribedInSet( this.multistate.allow, state );
  },

  isStateDescribedInDisallowed: function( state ) {
    return _isStateDescribedInSet( this.multistate.disallow, state );
  },

  isStatePermitted: function( state ) {
    var allowed = false;

    if (this.multistate == "any" || this.multistate == "all") {
      return true;
    }

    if(this.isStateDescribedInAllowed( state )) return true;
    if(this.isStateDescribedInDisallowed( state )) return false;
  }, 
});


// Generic State Machine
var StateMachine = Backbone.StateMachine = function(options) {
  options || (options = {});
  if( options.el ) {
    this.setElement( options.el );
  }
}

_.extend(StateMachine.prototype, Backbone.Events, {
  states: {},
  state:  null,
  el:     null,
  $el:    null,

  setElement: function( el ) {
    this.el = el;
    this.$el = this.el ? $(this.el) : null;    
  },

  get classes( ) {
    if(this.$el)  { return _.toArray( this.$el.attr('class').split(/\s+/) ); }
    else      { return null; }
  },

  set classes( newClasses ) {
    if( !$this.el)
    if( typeof newClasses === 'string' ) {
      this.$el.attr('class', newClasses);
    } else {
      this.$el.attr('class', newClasses.join(' '));
    }
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

  }
});
