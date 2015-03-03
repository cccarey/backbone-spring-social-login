define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'config',
    'models/loader',
    'text!../../templates/user.html',
], function($, _, Backbone, Handlebars, config, models, userDetailsTemplate) {
    'use strict';

    var template = Handlebars.compile(userDetailsTemplate);

    return Backbone.View.extend({
        id: "user_view",

        events: {
            "click #back": "handleBackClick"
        },

        initialize: function(args) {
            args.pageInfo.set("pageTitle", "User");
            args.pageInfo.unset("menuItems");
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            $(this.el).html(template(this.model.toJSON()));
        },

        handleBackClick: function(event) {
            this.goBack();
        }
    });
});
