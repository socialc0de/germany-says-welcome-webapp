define(['Component', 'underscore'], function (Component, _) {

    CategoriesView.prototype = Object.create(Component.prototype);

    CategoriesView.prototype.render = function (state) {
        var html = '<div>';
        var phrasebook = state.phrasebook || {};
        phrasebook.categories = phrasebook.categories || [];
        var lang = (state.language && state.language.selected) || "en";
        lang = lang == "de" ? "en" : lang;
        var selected = phrasebook.cat || 1;
        _.chain(phrasebook.categories)
            .filter(function (cat) {
                return cat.translations !== undefined;
            }).filter(function (cat) {
                return _.has(cat.translations, lang);
            })
            .each(function (cat) {
                html += '<a href="#phrasebook/' +
                    cat.id +
                    '"><div class="chip' +
                    (cat.id == selected ? " active" : "") +
                    '">' +
                    cat.translations[lang].name +
                    '</div></a>';
            });
        html += '</div>';
        return html;
    };

    function CategoriesView(selector) {
        Component.call(this, selector);
    }

    return CategoriesView;

})
;
