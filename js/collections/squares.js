/**
 * A collectin for all squares in the Tic Tac Toe game
 */
define(['jquery', 'backbone', 'square'], function($, Backbone, Square) {
    return Backbone.Collection.extend({
        model: Square
    });
})