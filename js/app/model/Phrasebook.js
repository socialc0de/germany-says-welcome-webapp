define(['data/PhrasebookAPI', 'underscore', 'hoverboard'], function (API, _, Hoverboard) {

    var $ = window.$;

    var catRegex = /(\d+)\/?$/;

    var haveLocalStorage = function () {
        // Caching deactivated for now. JOB, 2016-04-05
        /*if (window.localStorage) {
            try {
                window.localStorage.setItem("GSW.test", "1");
                window.localStorage.removeItem("GSW.test");
                return true;
            } catch (e) {
            }
        }*/
        return false;
    };

    function Phrasebook() {
        var instance = Hoverboard({

            init: function (state) {

                if (haveLocalStorage()) {
                    var storage = window.localStorage;
                    var phrases = storage.getItem("GSW.phrasebook.phrases");
                    if (phrases) {
                        try {
                            phrases = JSON.parse(phrases);
                            console.log("Phrasebook: Phrases loaded from cache.");
                            window.setTimeout(_.bind(instance.phrasesLoaded, instance, phrases), 0);
                        } catch (e) {}
                    }
                    var categories = storage.getItem("GSW.phrasebook.categories");
                    if (categories) {
                        try {
                            categories = JSON.parse(categories);
                            console.log("Phrasebook: Categories loaded from cache.");
                            window.setTimeout(_.bind(instance.categoriesLoaded, instance, categories), 0);
                        } catch (e) {}
                    }
                }
                $.get(API.categoryurl).done(function (result) {
                    instance.categoriesLoaded(result);
                });
                $.get(API.phraseurl).done(function (result) {
                    instance.phrasesLoaded(result);
                });
                return {categories: {}, phrases: {}};
            },

            categoriesLoaded: function (state, categories) {
                if ( haveLocalStorage() ) {
                    var storage = window.localStorage;
                    storage.setItem("GSW.phrasebook.categories", JSON.stringify(categories));
                }
                return {categories: categories};
            },

            phrasesLoaded: function (state, phrases) {
                if ( haveLocalStorage() ) {
                    var storage = window.localStorage;
                    storage.setItem("GSW.phrasebook.phrases", JSON.stringify(phrases));
                }
                _.each(phrases, function (phrase) {
                    var category = phrase.category;
                    var matches = catRegex.exec(category);
                    if (matches) {
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
