define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'config',
    'text!../../templates/header.html',
], function($, _, Backbone, Handlebars, config, headerTemplate) {
    'use strict';

    var template = Handlebars.compile(headerTemplate);

    return Backbone.View.extend({
        el: "#header",

        initialize: function(args) {
            this.info = args.info;
            this.user = args.user;
            this.pageInfo = args.pageInfo;

            _.bindAll(this, "render");
            this.listenTo(this.info, "change", this.render);
            this.listenTo(this.user, "change", this.render);
            this.listenTo(this.pageInfo, "change", this.render);
        },

        render: function() {
            var title = (this.pageInfo.has("pageTitle") && this.pageInfo.get("pageTitle") != "") ?
                this.pageInfo.get("app") + " :: " + this.pageInfo.get("pageTitle") :
                this.pageInfo.get("app");
            document.title = title;
            var theEl = this.el;
            $(theEl).html(template({ info: this.info, user: this.user, title: title }));
            if (this.pageInfo.has("menuItems")) {
                $.each(this.pageInfo.get("menuItems"), function(index, value) {
                    $("#top-nav", theEl).append(' | <a href="' + value["href"] + '">' + value["text"] + '</a>');
                });
            }
        }
    });
});
