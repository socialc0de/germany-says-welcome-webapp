define(['Component', 'underscore'], function (Component, _) {

    CategoriesView.prototype = Object.create(Component.prototype);

    CategoriesView.prototype.render = function (state) {
        var html = '<div>';
        if ( !state || !state.phrasebook || !state.router || !state.language ) {
            return false;
        }
        var phrasebook = state.phrasebook
        var router = state.router;
        var lang = state.language.selected || "en";
        lang = lang == "de" ? "en" : lang;
        var selected = 1;
        if (router.params && router.params.cat) {
            selected = router.params.cat;
        }
        if (phrasebook && !phrasebook.loading && phrasebook.categories) {
            var self = this;
            _.each(phrasebook.categories, function (cat) {
                html += '<a href="#phrasebook/' +
                    cat.id +
                    '"><div class="chip' +
                    (cat.id == selected ? " active" : "") +
                    '">' +
                    cat.translations[lang].name +
                    '</div></a>';
            });
        }
        html += '</div>';
        return html;
    };

    function CategoriesView(selector) {
        Component.call(this, selector);
        this.selected = "";
    }

    return CategoriesView;

});
