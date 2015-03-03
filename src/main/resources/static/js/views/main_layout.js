define([
    'jquery',
    'lib/underscore', 
    'lib/backbone', 
    'lib/handlebars',
    'config',
    'views/header',
    'views/footer',
    'text!../../templates/main_layout.html',
], function($, _, Backbone, Handlebars, config, header, footer, mainLayoutTemplate) {
    'use strict';
    
    var template = Handlebars.compile(mainLayoutTemplate);
    
    return Backbone.View.extend({
        el: "body",

        initialize: function(args) {
            _.bindAll(this, "show");
            
            this.info = args.info;
            this.user = args.user;
            this.pageInfo = args.pageInfo;

            this.render();
            this.header = new header({ info: this.info, user: this.user, pageInfo: this.pageInfo });
            this.footer = new footer({ model: this.info });
        },
        
        render: function() {
            $(this.el).html(template());
        },
        
        show: function(view) {
            if (this.currentView) {
                this.currentView.close();
            }
            
            this.currentView = view;
            this.currentView.render();
            
            $("div#main").html(this.currentView.el);
        }
    });
});
