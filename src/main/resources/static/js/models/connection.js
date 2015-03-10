define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'config', 
], function($, _, Backbone, config) {
    var connection = Backbone.Model.extend({ });

    var connections = Backbone.Collection.extend({
        model: connection
    });
    
    return [ connection, connections ];
});
