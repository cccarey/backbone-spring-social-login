define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config',
    'models/loader',
    'text!../../templates/user_connections.html',
], function($, _, Backbone, Handlebars, config, models, userConnectionsTemplate) {
    'use strict';
    
    return Backbone.View.extend({
    	id: "connection-",
        tagName: "div",
        className: "well",
        
        template: Handlebars.compile(userConnectionsTemplate),
        
        initialize: function(args) {
        	this.id = this.id + this.model.get("providerId");
        	this.render();
        },
        
        render: function() {
            $(this.el).html(this.template({ 
            	model: this.model.toJSON(),
            	providerClass: (this.model.get("providerId") === "google") ? 
            			"google-plus" : 
            				this.model.get("providerId"),
				displayName: (this.model.get("providerId") === "google") ? 
            			"Google+" : 
            				"Facebook" 
        	}));
        }
    });
});
