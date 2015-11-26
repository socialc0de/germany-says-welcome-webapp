define(['Component', 'underscore'], function (Component, _) {

    ItemView.prototype = Object.create(Component.prototype);

    ItemView.prototype.render = function (state) {
        var html = '<div>';
        var faq = state.faq || {};
        var lang = (state.language && state.language.selected) || "en";
        lang = lang == "de" ? "en" : lang;
        if (faq.items_to_show) {
            var self = this;
            _.each(faq.items_to_show, function (item) {
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
        }
        html += '</div>';
        return html;
    };

    function ItemView(selector) {
        Component.call(this, selector);
    }


    return ItemView;

});
