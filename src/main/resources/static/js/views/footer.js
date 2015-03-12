define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'config',
    'text!../../templates/footer.html',
], function($, _, Backbone, Handlebars, config, footerTemplate) {
    'use strict';

    return Backbone.View.extend({
        el: "#footer",
        template: Handlebars.compile(footerTemplate),

        initialize: function(args) {
            _.bindAll(this, "render");
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
        }
    });
});
