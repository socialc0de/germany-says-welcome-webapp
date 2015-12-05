define(['data/FAQAPI', 'underscore', 'hoverboard'], function (API, _, Hoverboard) {

    var $ = window.$;

    function FAQ() {
        var instance = Hoverboard({
            init: function (state, status) {
                status = status || 1;
                var url = API.categoryurl;
                $.get(url).done(function (result) {
                    instance.categoriesLoaded(result);
                });
                var url = API.faqurl + "by-audience/" + status + "/";
                $.get(url).done(function (result) {
                    instance.itemsLoaded(result);
                });
                return {categories: {}, items: {}, loading: true};
            },

            categoriesLoaded: function (state, categories) {
                return {loading: false, categories: categories};
            },

            itemsLoaded: function(state, items) {
                return { loading: false, items: items };
            }

        });
        return instance;
    }

    return FAQ;

});
