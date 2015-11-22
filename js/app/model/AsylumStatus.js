define(['underscore', 'hoverboard'], function (_, Hoverboard) {
    var instance = null;

    AsylumStatus.prototype.statusValues = ['arrival', 'application', 'integration'];

    function AsylumStatus() {
        var instance = Hoverboard({

            init: function(state) {
                return { status: "arrival" };
            },

            select: function (state, status) {
                return {status: status};
            }

        });
        return instance;
    }

    return AsylumStatus;

});
