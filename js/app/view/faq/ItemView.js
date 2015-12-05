define(['Component', 'underscore'], function (Component, _) {

    ItemView.prototype = Object.create(Component.prototype);

    ItemView.prototype.render = function (state) {
        var html = '<div>';
        var faq = state.faq || {};
        var cat = parseInt(faq.cat || -1);
        var asylumStatus = (state.status && state.status.selected) || 1;
        var lang = (state.language && state.language.selected) || "en";
        var items = faq.items || [];
        items = _.chain(items)
            .filter(function (item) {
                return _.contains(item.categories, cat);
            })
            .filter(function(item) {
                return _.contains(item.audiences, asylumStatus);
            })
            .filter(function (item) {
                return _.has(item.translations, lang);
            })
            .each(function (item) {
                html += '<div class="card">' +
                    ' <div class="card-content">' +
                    '  <div class="card-title"><b>' +
                    item.translations[lang].question +
                    '</b>  </div>' +
                    '  <div class="card-title" lang="de">' +
                    item.translations[lang].answer +
                    '  </div>' +
                    ' </div>' +
                    '</div>';
            });
        html += '</div>';
        return html;
    };

    function ItemView(selector) {
        Component.call(this, selector);
    }


    return ItemView;

});
