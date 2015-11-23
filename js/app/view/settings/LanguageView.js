define(['Component', 'view/settings/LanguageRadio'], function (Component, LanguageRadio) {

    LanguageView.prototype = Object.create(Component.prototype);

    LanguageView.prototype.render = function (state) {
        var html = '<form id="settings-lang-select" action="#">';
        // Render language selection
        if (state.language && state.language.languages) {
            var languages = state.language.languages;
            var self = this;
            _.each(languages, function (l, lang) {
                html += '<p lang="' + lang + '">';
            });

        }
        html += '</form>';
        return html;
    };

    LanguageView.prototype.setState = function (state, namespace) {
        Component.prototype.setState.call(this, state, namespace);
        var self = this;
        if (namespace && namespace == 'language' && state && state.languages) {
            var languages = state.languages;
            _.each(languages, function (l, lang) {
                if (!self.langRadios[lang]) {
                    var selector = '#settings-lang-select p[lang=' + lang + "]";
                    var child = new LanguageRadio(selector, lang, l.label, self.browserLanguage);
                    child.subscribe(self.browserLanguage, "language");
                    self.langRadios[lang] = child;
                }
            });
        }
    };

    function LanguageView(selector, browserLanguage) {
        Component.call(this, selector);
        this.browserLanguage = browserLanguage;
        this.langRadios = {};
    }

    return LanguageView;

});
