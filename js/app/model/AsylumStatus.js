define(['underscore', 'hoverboard', 'js-cookie', 'data/AsylumStatusValues'], function (_, Hoverboard, Cookies, StatusValues) {
    var instance = null;

    var statusValues = StatusValues.statusValues;
    var cookieName = 'gsw-asylum-status';

    AsylumStatus.prototype.statusValues = ['arrival', 'application', 'integration'];

    function AsylumStatus() {
        var instance = Hoverboard({

            init: function(state) {
                var selected = Cookies.get(cookieName) || "arrival";
                Cookies.set(cookieName, selected, { expires: 365 });
                return { selected: selected };
            },

            select: function (state, status) {
                Cookies.set(cookieName, status, {expires: 365 });
                return {selected: status};
            }

        });
        return instance;
    }

    return AsylumStatus;

});
