/**
 * A collectin for all squares in the Tic Tac Toe game
 */
define(['jquery', 'backbone', 'square'], function($, Backbone, Square) {
    return Backbone.Collection.extend({
        model: Square,

        /**
         * [isGameCompleted description]
         * @return {Boolean} Returns true if all the squares are filled
         */
        isGameCompleted: function() {
            return !this.any(function(sq) {
                return sq.get('value') === '';
            })
        },

        /**
         * [isThereAVictory description]
         * @param  {String}  player x or 0
         * @param  {Number}  size   size of the board
         * @return {Boolean}  Returns true if there is a victory
         */
        isThereAVictory: function(player, size) {
            // Use some graph algorithm to check if there is a result
            return false;
        }
    });
})