define(['Component', 'underscore'], function (Component, _) {

    CategoriesView.prototype = Object.create(Component.prototype);

    CategoriesView.prototype.render = function (state) {
//        var poi = state.poi || {};
//        var lang = (state.language && state.language.selected) || "en";
//
//        poi.layers = {};
//        //ignore empty results
//        if (!poi.loading && poi.categories) {
//            var self = this;
//            _.each(poi.categories, function (cat) {
//                if (!cat.translations || !cat.translations[lang]) {
//                    //ignore category where no translation is available
//                    return;
//                }
//
//                //append a new layer element 
//                poi.layers[cat.translations[lang].name] = L.markerClusterGroup();
//            });
//        }
    };

    function CategoriesView(selector) {
        Component.call(this, selector);
    }

    return CategoriesView;
});