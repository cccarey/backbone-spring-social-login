define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config',
    'models/loader',
    'text!../../templates/user_edit.html',
], function($, _, Backbone, Handlebars, config, models, editUserTemplate) {
    'use strict';
    
    return Backbone.View.extend({
        id: "edit_user_view",
        template: Handlebars.compile(editUserTemplate),

        events: {
            "click #cancel" : "handleCancelClick",
            "submit form#edit" : "handleFormSubmit"
        },
        
        initialize: function(args) {
            args.pageInfo.set("pageTitle", "Edit Profile");
            args.pageInfo.unset("menuItems");
            this.listenTo(this.model, "change", this.render);
        },
        
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            $("#nick_name", this.el).select().focus();
        }
    });
});
