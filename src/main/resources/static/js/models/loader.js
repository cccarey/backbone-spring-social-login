define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'models/info',
    'models/user',
    'models/page_info'
], function($, _, Backbone, info, user, pageInfo) {
    'use strict';

    return {
            info: info[0],
            adminInfo: info[1],
            user: user,
            pageInfo: pageInfo
           };

});
