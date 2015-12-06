define(['Component', 'underscore'], function (Component, _) {

    PhrasesView.prototype = Object.create(Component.prototype);

    PhrasesView.prototype.render = function (state) {
        var html = '<div>';
        var phrasebook = state.phrasebook || {};
        var lang = (state.language && state.language.selected) || "en";
        var selected = phrasebook.cat || 1;
        lang = lang == "de" ? "en" : lang;
        if (phrasebook.phrases) {
            var self = this;
            var phrases = phrasebook.phrases;
            _.chain(phrasebook.phrases || [])
                .filter(function (phrase) {
                    return _.has(phrase.translations, lang);
                })
                .filter(function(phrase) {
                    return phrase.cat == selected;
                })
                .each(function (phrase) {
                    html += '<div class="card">' +
                        ' <div class="card-content">' +
                        '  <div class="card-title"><b>' +
                        phrase.translations[lang].phrase +
                        '</b>  </div>' +
                        '  <div class="card-title" lang="de">' +
                        phrase.translations['de'].phrase +
                        '  </div>' +
                        ' </div>' +
                        '<div class="card-action">' +
                        '<a href="#" ' +
                        'data-phrase="' +
                        phrase.id +
                        '" ' +
                        'class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">volume_up</i></a>' +
                        '</div>' +
                        '</div>';

                });
        }
        html += '</div>';
        return html;
    };

    PhrasesView.prototype.attach = function (newNode, oldNode) {
        $(newNode).on('click', function (event) {
            var el = $(event.target);
            if (el.is('#phrasebook_phrases i.material-icons')) {
                el = el.parent();
            }
            if (el.is('#phrasebook_phrases a[data-phrase]')) {
                el = el.parent().parent();
            } else {
                return true;
            }
            el = el.find('div.card-title[lang=de]');
            var txt = el.text();
            responsiveVoice.speak(txt, "Deutsch Female");
            return false;
        });
    };

    function PhrasesView(selector) {
        Component.call(this, selector);
    }


    return PhrasesView;

});
