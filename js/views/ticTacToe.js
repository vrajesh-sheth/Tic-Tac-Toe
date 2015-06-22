/**
 * Main View file for Tic Tac Toe game
 */
define(['jquery', 'backbone', 'squares'], function($, Backbone, Squares) {  
    return Backbone.View.extend({
        tmpl: '<article class="tic-tac-toe">' +
                '<section class="board"></section>' +
                '<section class="controls"></section>' +
              '</article>',

        initialize: function(options) {
            
            var size = options.size || 3;
            this.initializeModelsAndCollection(size);
            this.render();
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
            this.$el.append(this.tmpl)
        }
    });
})