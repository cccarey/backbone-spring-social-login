define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config',
    'models/loader',
    'views/user_connection',
    'text!../../templates/user_connections.html',
], function($, _, Backbone, Handlebars, config, models, connectionView, userConnectionsTemplate) {
    'use strict';
    
    return Backbone.View.extend({
        id: function() { return "connection-" + this.model.get("providerId"); },
        tagName: "div",
        className: "row well",
        
        template: Handlebars.compile(userConnectionsTemplate),
        
        events: {
            "click #sign-in-button": "submitSignIn"
        },

        initialize: function() {
            _.bindAll(this, 
                "addConnections", 
                "addConnection", 
                "onClose", 
                "closeAndRemoveItemViews");
            this.providerClass = (this.model.get("providerId") === "google") ? 
                    "google-plus" : 
                    this.model.get("providerId");
            this.displayName = (this.model.get("providerId") === "google") ? 
                    "Google+" : 
                    "Facebook";
            this.signInUrl = (this.model.get("providerId") === "google") ?
                "/connect/google" :
                "/connect/facebook";
            this.signInScope = (this.model.get("providerId") === "google") ?
                "openid profile email" :
                "public_profile,email";
            this.connectionViews = [];
            this.render();
        },
        
        render: function() {
            console.log(this.model.toJSON());
            $(this.el).html(this.template({ 
                model: this.model.toJSON(),
                providerClass: this.providerClass,
                displayName: this.displayName 
            }));
            if (this.model.get("connections").models && this.model.get("connections").models.length > 0) {
                $("#".concat(this.id(), "-accounts"), this.el).html("");
            }
            this.addConnections(this.model.get("connections"));
        },

        addConnection: function(item) {
            var view = new connectionView({ model: item, displayName: this.displayName });
            this.connectionViews.push(view);
            $("#".concat(this.id(), "-accounts"), this.el).append(view.el);
        },
        
        onClose: function() {
            this.closeAndRemoveItemViews();
        },

        // TODO: refactor to a prototype function in loader
        addConnections: function(list) {
            this.closeAndRemoveItemViews();
            var addView = this.addConnection;
            _.each(list.models, function(value) {
                addView(value);
            });
        },

        closeAndRemoveItemViews: function() {
            _.each(this.connectionViews, function(view) {
                view.close();
            });
            this.connectionViews = [];
        },

        submitSignIn: function() {
            $("#sign-in").attr("action", this.signInUrl);
            $("#sign-in #scope").attr("value", this.signInScope);
            $("#sign-in").submit();
        }
    });
});
