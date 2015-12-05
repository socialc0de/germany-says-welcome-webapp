define(['data/PhrasebookAPI', 'underscore', 'hoverboard'], function (API, _, Hoverboard) {

    var $ = window.$;

    var catRegex = /(\d+)\/?$/;

    function Phrasebook() {
        var instance = Hoverboard({

            init: function (state, lang) {
                lang = lang || "en";
                $.get(API.categoryurl).done(function (result) {
                    instance.categoriesLoaded(result);
                });
                $.get(API.phraseurl).done(function(result) {
                    instance.phrasesLoaded(result);
                });
                return {categories: {}, phrases: {}};
            },

            categoriesLoaded: function (state, categories) {
                return {categories: categories};
            },

            phrasesLoaded: function (state, phrases) {
                _.each(phrases, function(phrase) {
                    var category = phrase.category;
                    var matches = catRegex.exec(category);
                    if ( matches ) {
                        var cat = matches[1];
                        phrase.cat = cat;
                    }
                });

                return {phrases: phrases};
            }

        });
        return instance;
    }

    return Phrasebook;

});
