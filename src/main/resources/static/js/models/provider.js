define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'config', 
    'models/connection'
], function($, _, Backbone, config, connection) {
    return Backbone.Model.extend({
        url: function() { return config.apiBase + "connect" },

        set: function(attributes, options) {
            if (attributes.connections !== undefined && !(attributes.connections instanceof connection[1])) {
                attributes.connections = new connection[1](attributes.connections);
            }
            return Backbone.Model.prototype.set.call(this, attributes, options);
        }
    });
});
