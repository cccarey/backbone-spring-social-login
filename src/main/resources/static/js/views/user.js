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
        		<pre class="pre-scrollable">{{data}}</pre>\
        		'),

        events: {
            "click #back": "handleBackClick",
            "click #show-connections": "showConnections",
            "click #facebook-sign-in": "submitFacebookSignin",
            "click #google-sign-in": "submitGoogleSignin"
        },

        initialize: function(args) {
            _.bindAll(this, "submitFacebookSignin", "submitGoogleSignin");
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
	                		message: self.connectionsTemplate({ data: JSON.stringify(providers.toJSON(), null, 2) }) 
	                		});
	                	modal.show();
            		}
            });
        },

        submitFacebookSignin: function() {
            $("#sign-in", this.el).attr("action", "/connect/facebook");
            $("#sign-in #scope", this.el).attr("value", "public_profile,email");
            $("#sign-in", this.el).submit();
        },

        submitGoogleSignin: function() {
            $("#sign-in", this.el).attr("action", "/connect/google");
            $("#sign-in #scope", this.el).attr("value", "openid profile email");
            $("#sign-in", this.el).submit();
        }
    });
});
