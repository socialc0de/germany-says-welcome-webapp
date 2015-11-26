define(['Component', 'underscore'], function (Component, _) {

    CategoriesView.prototype = Object.create(Component.prototype);

    CategoriesView.prototype.render = function (state) {
        var html = '<div>';
        var faq = state.faq || {};
        var lang = (state.language && state.language.selected) || "en";
        lang = lang == "de" ? "en" : lang;
        var selected = faq.cat || 1;
        if (!faq.loading && faq.categories) {
            var self = this;
            _.each(faq.categories, function (cat) {
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
