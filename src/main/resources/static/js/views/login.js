define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config', 
    'models/loader',
    'views/header',
    'text!../../templates/login.html'
], function($, _, Backbone, Handlebars, config, models, header, loginTemplate) {
    'use strict';
    
    var template = Handlebars.compile(loginTemplate);
    
    return Backbone.View.extend({
        id: "login_view",
        
        initialize: function(args) {
            args.pageInfo.set("pageTitle", "Login");
            args.pageInfo.unset("menuItems");
        },
        
        render: function() {
            $(this.el).html(template());
            $("#sign-in", this.el).attr("href", config.apiBase + "login/google-oauth2");
        }
    });
});
