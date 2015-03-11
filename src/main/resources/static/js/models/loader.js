define([
    'jquery',
    'lib/underscore',
    'lib/backbone',
    'models/info',
    'models/user',
    'models/page_info',
    'models/connection',
    'models/provider'
], function($, _, Backbone, info, user, pageInfo, connection, provider) {
    'use strict';

    return {
        info: info[0],
        adminInfo: info[1],
        user: user,
        pageInfo: pageInfo,
        connection: connection[0],
        connections: connection[1],
        provider: provider[0],
        providers: provider[1]
    };

});
