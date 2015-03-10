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
        	"click #edit": "handleEditClick",
            "click #back": "handleBackClick",
            "click #show-connections": "showConnections",
            "click #facebook-sign-in": "submitFacebookSignin",
            "click #google-sign-in": "submitGoogleSignin"
        },

        initialize: function(args) {
        	_.bindAll(this, "enableShowConnections");
            args.pageInfo.set("pageTitle", "User");
            args.pageInfo.unset("menuItems");
            this.router = args.router;
            this.providers = new models.provider;
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.providers, "change", this.enableShowConnections);
            this.providers.fetch();
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
        
        enableShowConnections: function() {
        	$("#show-connections", this.el).removeClass("disabled");
        },
        
        showConnections: function(event) {
        	if (event && event.preventDefault) { event.preventDefault(); }
        	var modal = new modals.MessageModalView({ 
        		title: "Raw Data", 
        		message: this.connectionsTemplate({ data: JSON.stringify(this.providers.toJSON(), null, 2) }) 
        		});
        	modal.show();
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
