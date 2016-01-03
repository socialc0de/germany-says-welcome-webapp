define(['data/POIAPI', 'underscore', 'hoverboard'], function (API, _, Hoverboard) {

    var $ = window.$;

    function POI() {
        var instance = Hoverboard({
            init: function (state, status) {
                status = status || 1;
                //load the category
                var url = API.categoryurl;
                $.get(url).done(function (result) {
                    instance.categoriesLoaded(result);
                });
                
                //load the markers
                var url = API.poiurl;
                $.get(url).done(function (result) {
                    instance.markersLoaded(result);
                });
                
                return {categories: {}, items: {}, loading: true};
            },

            categoriesLoaded: function (state, categories) {
                return {loading: false, categories: categories};
            },

            markersLoaded: function(state, items) {
                return { loading: false, items: items };
            }
        });
        
        return instance;
    }

    return POI;
});


