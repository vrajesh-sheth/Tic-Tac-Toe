/**
 * Require JS config for Tic Tac Toe app
 * 
 */
require.config({
    paths:{
        // DOM manipulation library
        'jquery'        :   'libs/jquery-1.9.1.min',

        // templating library
        'underscore'    :   'libs/underscore-min',
        
        // backbone
        'backbone'      :   'libs/backbone-min',

        // views
        'ticTacToe'     :   'views/ticTacToe',
        'view_square'   :   'views/view_square',

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

require(['jquery', 'ticTacToe'], function($, TicTacToe){
    var game = new TicTacToe({
        el : $('#container1')
    });
});