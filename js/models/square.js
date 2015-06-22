/**
 * 
 */
define(['jquery', 'backbone'], function($, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            row_id: null,
            column_id : null,
            value : ''
        },
        initialize: function(){}
    });
})