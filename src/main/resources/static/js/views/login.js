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

    return Backbone.View.extend({
        id: "login_view",
        template: Handlebars.compile(loginTemplate),

        events: {
            "click #facebook-sign-in": "submitFacebookSignin",
            "click #google-sign-in": "submitGoogleSignin"
        },

        initialize: function(args) {
            _.bindAll(this, "submitFacebookSignin", "submitGoogleSignin");
            args.pageInfo.set("pageTitle", "Login");
            args.pageInfo.unset("menuItems");
        },

        render: function() {
            $(this.el).html(this.template());
        },

        submitFacebookSignin: function() {
            $("#sign-in", this.el).attr("action", config.apiBase + "signin/facebook");
            $("#sign-in #scope", this.el).attr("value", "public_profile,email");
            $("#sign-in", this.el).submit();
        },

        submitGoogleSignin: function() {
            $("#sign-in", this.el).attr("action", config.apiBase + "signin/google");
            $("#sign-in #scope", this.el).attr("value", "openid profile email");
            $("#sign-in", this.el).submit();
        }
    });
});
