define(['Component', 'underscore'], function (Component, _) {

    CategoriesView.prototype = Object.create(Component.prototype);

    CategoriesView.prototype.render = function (state) {
        var html = '<div>';
        var faq = state.faq || {};
        var lang = (state.language && state.language.selected) || "en";
        var selected = faq.cat;
        if (!faq.loading && faq.categories ) {
            var self = this;
            _.each(faq.categories, function (cat) {
                var catname = cat.translations[lang].name;
                if ( !cat.translations || ! cat.translations[lang] ) {
                    return;
                }
                html += '<a href="#faq/' +
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
    }

    return CategoriesView;

});
