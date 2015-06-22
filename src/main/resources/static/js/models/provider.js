define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'config',
    'models/connection'
], function($, _, Backbone, config, connection) {
    var provider = Backbone.Model.extend({
        url: function() { return config.apiBase + "user/connect" + this.id },

        set: function(attributes, options) {
            if (attributes.connections !== undefined && !(attributes.connections instanceof connection[1])) {
                attributes.connections = new connection[1](attributes.connections);
            }
            return Backbone.Model.prototype.set.call(this, attributes, options);
        }
    });

    var providers = Backbone.Collection.extend({
    	model: provider,
    	url: function() { return config.apiBase + "user/connect" }
    })

    return [ provider, providers ];
});
