define(['Component', 'underscore'], function (Component, _) {

    CategoriesView.prototype = Object.create(Component.prototype);

    CategoriesView.prototype.render = function (state) {
        var html = '<div>';
        var phrasebook = state.phrasebook || {};
        var lang = (state.language && state.language.selected) || "en";
        lang = lang == "de" ? "en" : lang;
        var selected = phrasebook.cat || 1;
        if (!phrasebook.loading && phrasebook.categories) {
            var self = this;
            _.each(phrasebook.categories, function (cat) {
                html += '<a href="#phrasebook/' +
                    cat.id +
                    '"><div class="chip' +
                    (cat.id == selected ? " active" : "") +
                    '">' +
                    cat[lang] +
                    '</div></a>';
            });
        }
        html += '</div>';
        return html;
    };

    function CategoriesView(selector) {
        Component.call(this, selector);
    }

    return CategoriesView;

});
