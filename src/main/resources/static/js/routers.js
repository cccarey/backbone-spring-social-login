define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/bootstrap',
    'config',
    'views/loader',
    'models/loader'
], function($, _, Backbone, bootstrap, config, views, models) {
    'use strict';

    return {
        OpenIdRouter: Backbone.Router.extend({
            routes: {
                '' : 'showUser',
                'logout' : 'processLogout',
                'login' : 'showLogin',
                'edit' : 'showUserEdit'
            },

            initialize: function() {
                this.info = new models.info({});
                this.user = new models.user({ onNoAuth: this.onNoAuth });
                this.pageInfo = new models.pageInfo({ app: "Backbone/Spring/Google OAuth 2" });

                this.mainLayout = new views.mainLayout({ info: this.info, user: this.user, pageInfo: this.pageInfo });
            },

            /* --- helper functions --- */

            onNoAuth: function() {
                if (this && this.user){ this.user.clear(); }
                window.location = "./#/login";
            },

            /* --- router functions --- */

            processLogout: function() {
                this.user.clear();
                $.ajax({
                    url: config.apiBase + "logout",
                    type: "GET",
                    success: function() { window.location = "./#/login"; }
                });
            },

            showUser: function() {
                this.mainLayout.show(new views.userPage({ model: this.user, pageInfo: this.pageInfo }));
            },

            showUserEdit: function() {
                this.mainLayout.show(new views.userEditPage({ model: this.user, pageInfo: this.pageInfo }));
            },

            showLogin: function() {
                this.mainLayout.show(new views.loginPage({ pageInfo: this.pageInfo }));
            }
        })
    };
});
