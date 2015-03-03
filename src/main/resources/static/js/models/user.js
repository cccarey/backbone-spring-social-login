define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'config', 
], function($, _, Backbone, config) {
    var user = Backbone.Model.extend({
        url: function() { return config.apiBase + "user"; },
        
        initialize: function(args) {
            var self = this;
            var onNoAuth = args.onNoAuth;
            self.fetch({ error: onNoAuth });
            this.timer = setInterval(function() {
                self.fetch({ error: onNoAuth });
            }, config.userRefresh);
        }
    });
    
    return user;
});
