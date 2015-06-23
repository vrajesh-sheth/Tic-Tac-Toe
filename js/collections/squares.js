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

        // Diagonal squares are going to get referenced on every click. So we store references to them here
        storeReferences: function(size) {
            this.primaryDiagonals = [
                // This will get the 00, 11, 22 diagonal for a 3 x 3 matrix
                this.filter(function(sq) {
                    return sq.get('row_id') === sq.get('column_id');
                }),

                // This will get the 02, 11, 20 diagonal for a 3 x 3 matrix
                this.filter(function(sq) {
                    return sq.get('row_id') + sq.get('column_id') === size -1;
                })
            ]
        },

        /**
         * [isThereAVictory description]
         * @param  {String}  player x or 0
         * @param  {Number}  size   size of the board
         * @return {Boolean}  Returns true if there is a victory
         */
        isThereAVictory: function(player, size, row_id, column_id) {
            // Check if all the squares in the current row are filled by current player
            var allRowsFilled = this._isThereAVictory({ row_id: row_id }, player)
            if (allRowsFilled) return true;

            // Check if all the squares in the current column are filled by  current player
            var allColsFilled = this._isThereAVictory({ column_id: column_id }, player)
            if (allColsFilled) return true;

            // Check if the current square is in the primary diagonal
            if ((row_id === column_id) || (row_id + column_id === size -1)) {       
                
                // Check if all the squares in any of the primary diagonal are filled by current player
                var firstDiagonalFilled = this._isThereAVictory(this.primaryDiagonals[0], player);
                if (firstDiagonalFilled) return true;

                var secondaryDiagonalFilled = this._isThereAVictory(this.primaryDiagonals[1], player)
                if (secondaryDiagonalFilled) return true;
            }

            return false;
        },

        /* helper method */
        _isThereAVictory: function(predicate, player) {
            var squares = (_.isArray(predicate) ? predicate : this.where(predicate)) || [];

            return _.all(squares, function(sq) {
                return sq.get('value') === player;
            })
        }
    });
})