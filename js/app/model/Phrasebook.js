define(['data/PhrasebookAPI', 'underscore', 'hoverboard'], function (API, _, Hoverboard) {

    var $ = window.$;

    function Phrasebook() {
        var instance = Hoverboard({

            init: function (state, lang) {
                lang = lang || "en";
                var url = API.url + "/" + lang;
                $.get(url).done(function (result) {
                    instance.categoriesLoaded(result.categories);
                });
                return {categories: {}, phrases: {}, loading: true};
            },

            categoriesLoaded: function (state, categories) {
                return {loading: false, categories: categories};
            },

            phrases: function (state, cat) {
                if ( !state.categories ) {
                    return {};
                }
                var category;
                for ( var id in state.categories ) {
                    if ( state.categories[id].id == cat ) {
                        category = state.categories[id];
                    }
                }
                if ( !category ) {
                    return {};
                }
                var url = API.url + category.url;
                $.get(url).done(function(result) {
                    instance.phrasesLoaded(result.category.phrases);
                });

                return {loading: true, phrases: {}};
            },

            phrasesLoaded: function(state, phrases) {
                return { loading: false, phrases: phrases };
            }

        });
        return instance;
    }

    return Phrasebook;

});
