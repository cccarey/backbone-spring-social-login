define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config',
    'models/loader',
    'text!../../templates/user_connection.html',
], function($, _, Backbone, Handlebars, config, models, connectionTemplate) {
    'use strict';
    
    return Backbone.View.extend({
        tagName: "div",
        id: function() { 
            return "".concat(
                "connection-",
                this.model.get("key").providerId,
                "-account-",
                this.model.get("key").providerUserId
                );
        },
        className: "row panel panel-default",
        template: Handlebars.compile(connectionTemplate),

        initialize: function(args) {
            this.displayName = args.displayName;
            this.render();
        },
        
        render: function() {
            $(this.el).html(this.template({ model: this.model.toJSON(), displayName: this.displayName }));
        }
    });
});
