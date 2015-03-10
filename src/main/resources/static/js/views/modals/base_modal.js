define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config'
], function($, _, Backbone, Handlebars, config) {
    'use strict';

    return Backbone.View.extend({
        className: "modal fade",

        events: {
            "hidden.bs.modal": "teardown"
        },

        initialize: function(args) {
            _(this).bindAll("show", "hide");
        },
        
        show: function() {
            this.$el.modal('show');
        },

        hide: function() {
            this.$el.modal('hide');
        },
        
        teardown: function() {
            this.$el.data('modal', null);
            this.remove();
        }
    });
});