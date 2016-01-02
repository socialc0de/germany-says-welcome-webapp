define(["data/EmergencyAPI", "underscore", "hoverboard"], function (API, _, Hoverboard) {
    var $ = window.$;

    var url = API.emergencyurl;

    function EmergencyNumbers() {
        var instance = Hoverboard({
            init: function() {
                $.get(url).done(function (result){
                    instance.loaded(result);
                });
            },

            loaded: function(state, numbers) {
                return {numbers : numbers}
            }
        });
        return instance;
    }

    return EmergencyNumbers;
});
