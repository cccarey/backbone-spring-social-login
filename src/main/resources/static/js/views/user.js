define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'config',
    'models/loader',
    'views/user_connections',
    'text!../../templates/user.html'
], function($, _, Backbone, Handlebars, config, models, connectionsView, userDetailsTemplate) {
    'use strict';

    return Backbone.View.extend({
        id: "user_view",
        template: Handlebars.compile(userDetailsTemplate),
        connectionsTemplate: Handlebars.compile('\
        		<p>Returned by server</p>\
        		<pre class="pre-scrollable">{{data}}</pre>\
        		'),

        events: {
        	"click #edit": "handleEditClick",
            "click #back": "handleBackClick",
            "click #show-connections": "showConnections",
            "click #facebook-sign-in": "submitFacebookSignin",
            "click #google-sign-in": "submitGoogleSignin"
        },

        initialize: function(args) {
        	_.bindAll(this, "addProvider", "addProviders", "onClose", "closeAndRemoveItemViews");
            args.pageInfo.set("pageTitle", "User");
            args.pageInfo.unset("menuItems");
            this.router = args.router;
            this.providers = new models.providers();
            this.connectionsViews = [];
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.providers, "reset", this.addProviders);
            this.providers.fetch({ reset: true });
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
        },

        handleBackClick: function(event) {
        	if (event && event.preventDefault) { event.preventDefault(); }
            this.goBack();
        },

        handleEditClick: function(event) {
        	if (event && event.preventDefault) { event.preventDefault(); }
        	this.router.navigate("edit", { trigger: true });
        },
        
        addProvider: function(item) {
            var view = new connectionsView({ model: item });
            this.connectionsViews.push(view);
            $("#connections", this.el).append(view.el);
        },
        
        onClose: function() {
            this.closeAndRemoveItemViews();
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
        },

        // TODO: refactor to a prototype function in loader
        addProviders: function(list) {
            this.closeAndRemoveItemViews();
            var addView = this.addProvider;
            _.each(list.models, function(value) {
            	addView(value);
            });
        },

        closeAndRemoveItemViews: function() {
            _.each(this.connectionsViews, function(view) {
                view.close();
            });
            this.connectionsViews = [];
        }
    });
});
