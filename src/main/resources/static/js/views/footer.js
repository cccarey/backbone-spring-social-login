define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'config',
    'text!../../templates/footer.html',
], function($, _, Backbone, Handlebars, config, footerTemplate) {
    'use strict';

    var template = Handlebars.compile(footerTemplate);

    return Backbone.View.extend({
        el: "#footer",

        initialize: function(args) {
            _.bindAll(this, "render");
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            $(this.el).html(template(this.model.toJSON()));
        }
    });
});
