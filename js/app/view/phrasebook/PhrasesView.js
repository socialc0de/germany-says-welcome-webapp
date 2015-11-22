define(['Component', 'underscore'], function (Component, _) {

    PhrasesView.prototype = Object.create(Component.prototype);

    PhrasesView.prototype.render = function (state) {
        if (!state || !state.phrasebook || !state.language || !state.router || !state.router.parts || state.router.parts[0] != 'phrasebook') {
            return false;
        }
        var html = '<div>';
        var phrasebook = state.phrasebook;
        var lang = state.language.selected || "en";
        lang = lang == "de" ? "en" : lang;
        if (phrasebook.phrases) {
            var self = this;
            _.each(phrasebook.phrases, function (phrase) {
                html += '<div class="card">' +
                    ' <div class="card-content">' +
                    '  <div class="card-title"><b>' +
                    phrase[lang] +
                    '</b>  </div>' +
                    '  <div class="card-title">' +
                    phrase['de'] +
                    '  </div>' +
                    ' </div>' +
                    '</div>';
            });
        }
        html += '</div>';
        return html;
    };

    function PhrasesView(selector) {
        Component.call(this, selector);
    }


    return PhrasesView;

});
