/**
 * Main View file for Tic Tac Toe game
 */
define(['jquery', 'backbone', 'squares', 'view_square'], function($, Backbone, Squares, ViewSquare) {  
    return Backbone.View.extend({
        tmpl: '<article class="tic-tac-toe">' +
                '<section class="board"></section>' +
                '<section class="controls">' +
                    '<div class="current-player"></div>' +
                    '<div class="result"></div>' +
                '</section>' +
            '</article>',

        events: {
            'click .square': 'playMove'
        },

        initialize: function(options) {  
            this.size = options.size || 3;
            this.initializePlayer();
            this.initializeModelsAndCollection();
            this.render();
        },

        initializePlayer: function() {
            this.togglePlayer();
        },

        initializeModelsAndCollection: function() {
            this.squares = new Squares();
            var noOfSquares = this.size * this.size,
                sqData = [];
            for (var i = 0; i < noOfSquares; i++) {
                sqData.push({
                    row_id : Math.floor(i / 3),
                    column_id : i % 3
                });
            }
            this.squares.add(sqData);
            
            // Store references to primary diagonals
            this.squares.storeReferences(this.size);
        },
        render: function() {
            this.$el.append(this.tmpl);
            this.$currentPlayer = this.$('.current-player');

            this.squareViews = [];
            var rows = [], rowIndex = 0;
            this.squares.each(function(sq, i){
                var view = new ViewSquare({
                    model: sq
                });
                this.squareViews.push(view);

                var isNewRow = i % this.size === 0,
                    $row = rows[rowIndex];
                
                if (isNewRow) {
                    if(Math.floor(i / this.size) > 0) {
                        rowIndex++;
                    }
                    // For every nth square, add a new row to the board
                    $row = $('<div class="row"></div>');
                    rows[rowIndex] = $row;
                }
                // Append the view to the correct row
                $row.append(view.el)
            }, this);

            this.$('.board').append(rows)

            this.renderCurrentPlayer();
        },

        renderCurrentPlayer: function() {
            this.$currentPlayer.html('Player: ' + this.player);
        },

        playMove: function(e) {
            var $target = $(e.target),
                row_id = $target.data('row-id'),
                column_id = $target.data('column-id');

            var sqModel = this.squares.findWhere({
                row_id : row_id,
                column_id : column_id
            });

            sqModel.play(this.player);

            var isGameOver = this.checkGameResult(row_id, column_id);

            if (!isGameOver) {
                this.togglePlayer();
                this.renderCurrentPlayer();
            } else {
                this.$el.addClass('filled');
            }          
        },

        checkGameResult: function(row_id, column_id) {
            var result = this.squares.isThereAVictory(this.player, this.size, row_id, column_id);
            if (result) {
                result = 'Player ' + this.player + ' wins!'
            } else if (!result && this.squares.isGameCompleted()) {
                result = 'Draw';
            } 
            
            if (result) {
                this.$('.result').html(result);
                return true;
            }

            return false;             
        },

        togglePlayer: function() {
            if (!this.player || this.player === '0') {
                this.player = 'x';
            } else {
                this.player = '0';
            }
        }
    });
})