define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'config', 
], function($, _, Backbone, config) {
    var info = Backbone.Model.extend({
        url: function() { return config.apiBase + "info"; },
        
        initialize: function() {
            var self = this;
            self.fetch();
            this.timer = setInterval(function() {
                self.fetch();
            }, config.infoRefresh);
        }
    });
    
    var adminInfo = Backbone.Model.extend({
        url: function() { return config.apiBase + "info/admin"; }
    });
    
    return [ info, adminInfo ];
});
