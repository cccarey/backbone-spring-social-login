define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config',
    'views/modals/base_modal',
    'text!../../../templates/modals/message.html'
], function($, _, Backbone, Handlebars, config, BaseModalView, messageTemplate) {
    'use strict';
    
    // MessageModalView
    return BaseModalView.extend({
        id: 'wait-modal',
        template: Handlebars.compile(messageTemplate),

        initialize: function(args) {
            this.title = args.title;
            this.message = args.message;
            this.render();
        },
        
        render: function() {
            var item_name = this.item_name;
            this.$el.html(this.template({ title: this.title, message: this.message }));
            this.$el.modal({show:false});
        }
    });
});
