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
                '_=_': 'stupidFacebook',
                'logout' : 'processLogout',
                'login' : 'showLogin',
                'edit' : 'showUserEdit'
            },

            initialize: function() {
                _.bindAll(this, "onNoAuth");
                this.info = new models.info({});
                this.user = new models.user({ onNoAuth: this.onNoAuth });
                this.pageInfo = new models.pageInfo({ app: "Backbone/Spring Social/Facebook" });

                this.mainLayout = new views.mainLayout({ info: this.info, user: this.user, pageInfo: this.pageInfo });
            },

            /* --- helper functions --- */

            onNoAuth: function() {
                if (this && this.user){ this.user.clear(); }
                this.navigate("login", { trigger: true });
            },

            /* --- router functions --- */

            stupidFacebook: function() {
                this.navigate("", {trigger: true, replace: true});
            },
            
            processLogout: function() {
            	var self = this;
                $.ajax({ 
                	url: "signout", 
                	type: "GET", 
                	success: function() { 
                		self.user = new models.user({ onNoAuth: self.onNoAuth });
                		self.navigate("", {trigger: true, replace: true});
            		}
                });
            },

            showUser: function() {
                this.mainLayout.show(new views.userPage({ model: this.user, pageInfo: this.pageInfo, router: this }));
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
