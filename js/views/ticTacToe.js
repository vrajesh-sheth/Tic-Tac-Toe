/**
 * Main View file for Tic Tac Toe game
 */
define(['jquery', 'backbone', 'squares', 'view_square'], function($, Backbone, Squares, ViewSquare) {  
    return Backbone.View.extend({
        tmpl: '<article class="tic-tac-toe">' +
                '<section class="board"></section>' +
                '<section class="controls">
                    <div class="player"></div>
                    <div class="result"></div>
                </section>' +
            '</article>',

        events: {
            'click .square': 'playMove'
        },

        initialize: function(options) {  
            var size = options.size || 3;
            this.initializePlayer();
            this.initializeModelsAndCollection(size);
            this.render();
        },

        initializePlayer: function() {
            this.togglePlayer();
        },

        initializeModelsAndCollection: function(size) {
            this.squares = new Squares();
            var noOfSquares = size * size,
                sqData = [];
            for (var i = 0; i < size; i++) {
                sqData.push({
                    row_id : i / 3,
                    column_id : i % 3
                });
            }
            this.squares.add(sqData);
        },
        render: function() {
            this.$el.append(this.tmpl);

            this.squareViews = [];
            var subViews = [];
            this.squares.each(function(sq){
                var view = new ViewSquare({
                    model: sq
                });
                this.squareViews.push(view);
                subViews.push(view.el)
            }, this);

            this.$('.board').append(subViews)

        },

        playMove: function(e) {
            var $target = $(e.target),
                row_id = $target.data('row-id'),
                col_id = $target.data('column-id');

            var sqModel = this.squares.findWhere({
                row_id : $target.data('row-id'),
                column_id : $target.data('column-id')
            });

            sqModel.play(this.player);
            
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