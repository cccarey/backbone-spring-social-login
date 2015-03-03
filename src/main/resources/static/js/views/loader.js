define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'views/main_layout',
    'views/header',
    'views/footer',
    'views/login',
    'views/user',
    'views/user_edit'
], function($, _, Backbone, Handlebars, mainLayout, header, footer, loginPage, userPage, userEditPage) {
    'use strict';

    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    Backbone.View.prototype.goBack = function() {
        window.history.back();
    };
    
    Backbone.View.prototype.handleFormSubmit = function() {
        var self = this;
        var checkboxes = this.$('form :checkbox');
        var values = {};

        if (event) { event.preventDefault(); }

        _.each(this.$('form').serializeArray(), function(input){
            values[ input.name ] = input.value;
        });

        _.each(checkboxes, function(input) {
            values[ input.name ] = $(input).is(':checked');
        });
        
        this.listenTo(this.model, 'sync', this.goBack);
        
        this.model.save(values);
    };
    
    Backbone.View.prototype.handleCancelClick = function() {
        this.goBack();
    };
    
    return { 
        mainLayout: mainLayout, 
        header: header, 
        footer: footer,
        loginPage: loginPage, 
        userPage: userPage, 
        userEditPage: userEditPage 
    };

});
