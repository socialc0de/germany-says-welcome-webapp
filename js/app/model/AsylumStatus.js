define(['underscore', 'hoverboard', 'data/AsylumStatusValues'], function (_, Hoverboard, StatusValues) {
    var instance = null;

    var statusValues = StatusValues.statusValues;

    AsylumStatus.prototype.statusValues = ['arrival', 'application', 'integration'];

    function AsylumStatus() {
        var instance = Hoverboard({

            init: function(state) {
                return { selected: "arrival" };
            },

            select: function (state, status) {
                return {selected: status};
            }

        });
        return instance;
    }

    return AsylumStatus;

});
