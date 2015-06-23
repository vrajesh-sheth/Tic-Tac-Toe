define(['jquery', 'backbone'], function($, Backbone){
    return Backbone.View.extend({
        initialize: function() {
            this.model.on('change:value', this.renderSelection, this);
            this.render()
        },
        className: 'square-wrapper',

        template: _.template('<div class="square" data-row-id=<%=row_id %> data-column-id="<%=column_id %>"><%=value%></div>'),

        render: function() {
            this.$el.append(this.template(this.model.toJSON()));
            this.$value = this.$('.square');
        },

        renderSelection: function(model, value) {
            
            this.$value.append(value);
            this.$value.addClass('filled')
        }
    }) 
});