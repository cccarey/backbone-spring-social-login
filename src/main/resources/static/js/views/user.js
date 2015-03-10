define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'config',
    'models/loader',
    'views/modals/loader',
    'text!../../templates/user.html'
], function($, _, Backbone, Handlebars, config, models, modals, userDetailsTemplate) {
    'use strict';

    return Backbone.View.extend({
        id: "user_view",
        template: Handlebars.compile(userDetailsTemplate),
        connectionsTemplate: Handlebars.compile('\
        		<p>Returned by server</p>\
        		<pre>{{data}}</pre>\
        		'),

        events: {
            "click #back": "handleBackClick",
            "click #show-connections": "showConnections"
        },

        initialize: function(args) {
            args.pageInfo.set("pageTitle", "User");
            args.pageInfo.unset("menuItems");
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
        },

        handleBackClick: function(event) {
            this.goBack();
        },

        showConnections: function() {
        	var self = this;
            var providers = new models.provider;
            providers.fetch({ 
            	success: function() { 
	                	var modal = new modals.MessageModalView({ 
	                		title: "Raw Data", 
	                		message: self.connectionsTemplate({ data: JSON.stringify(providers.toJSON()) }) 
	                		});
	                	modal.show();
	                	console.log(providers.toJSON());
            		}
            });
        }
    });
});
