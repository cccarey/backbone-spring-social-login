define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'lib/handlebars',
    'views/modals/message_modal'
], function($, _, Backbone, Handlebars, messageModal) {
    'use strict';

    return { MessageModalView: messageModal };
});