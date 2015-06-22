/**
 * Require JS config for Tic Tac Toe app
 * 
 */
require.config({
    paths:{
        // DOM manipulation library
        'jquery'        :   'libs/jquery-1.9.1.min',

        // templating library
        'underscore'    :   'libs/underscore',
        
        // backbone
        'backbone'      :   'libs/backbone',

        // views
        'ticTacToe'     :   'views/ticTacToe',
        'square'        :   'views/square',

        // models
        'square'        :   'models/square',

        // collection
        'squares'       :   'collections/squares'

    },
    shim:{
        'jquery'    :{
            exports : '$'
        },
        'underscore':{
            exports: '_'
        },
        'backbone'  :{
            deps    :['jquery', 'underscore'],
            exports : 'Backbone'
        }
    }
});

require(['jquery'], function($){
    $('#container')
});