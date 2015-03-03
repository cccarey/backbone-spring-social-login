require.config({
    paths: {
        jquery: 'lib/jquery-2.1.1',
        text: 'lib/text',
        bootstrap: 'lib/bootstrap'
    },

    shim: {
        'lib/underscore': { exports: '_' },
        'lib/backbone': { deps: [ 'jquery', 'lib/underscore' ], exports: 'Backbone' },
        'lib/handlebars': { exports: 'Handlebars' },
        'lib/bootstrap': { deps: [ 'jquery'] }
    }
});

require([ 'routers' ], function(routers) {
    'use strict';

    $(document).ready(function() {
        var router = new routers.OpenIdRouter();
        Backbone.history.start();
    });
});
