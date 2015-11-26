define(['data/FAQAPI', 'underscore', 'hoverboard'], function (API, _, Hoverboard) {

    var $ = window.$;

    function FAQ() {
        var instance = Hoverboard({
            init: function (state, lang, status) {
                lang = lang || "en";
                status = status || 1;
                var url = API.categoryurl;
                $.get(url).done(function (result) {
                    instance.categoriesLoaded(result);
                });
                var url = API.faqurl + "by-audience/" + status + "/";
                $.get(url).done(function (result) {
                    instance.itemsLoaded(result);
                });
                return {categories: {}, items: {}, items_to_show: {}, loading: true};
            },

            categoriesLoaded: function (state, categories) {
                return {loading: false, categories: categories};
            },

            items: function (state, cat) {
                if ( !state || !state.categories ) {
                    return {};
                }
                cat = parseInt(cat)
                items_show = []
                _.each(state.items, function(item) {
                    if (_.contains(item.categories,cat)) {
                        items_show.push(item);
                    }
                });

                return {items_to_show: items_show};
            },

            itemsLoaded: function(state, items) {
                return { loading: false, items: items, items_to_show:[]};
            }

        });
        return instance;
    }

    return FAQ;

});