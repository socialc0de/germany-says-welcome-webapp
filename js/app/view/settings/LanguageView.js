define(['Component', 'view/settings/LanguageRadio'], function (Component, LanguageRadio) {

    LanguageView.prototype = Object.create(Component.prototype);

    LanguageView.prototype.render = function (state) {
        var html = '<form id="settings-lang-select" action="#">';
        // Render language selection
        if (state.language && state.language.languages) {
            var languages = state.language.languages;
            var self = this;
            _.each(languages, function (l, lang) {
                html += '<p lang="' + lang + '"></p>';
            });

        }
        html += '</form>';
        return html;
    };

    LanguageView.prototype.setState = function (state, namespace) {
        var self = this;
        switch (namespace) {
            case "language":
                var languages = state.languages || {};
                _.each(languages, function (l, lang) {
                    if (!self.langRadios[lang]) {
                        var selector = '#settings-lang-select p[lang=' + lang + "]";
                        var child = new LanguageRadio(selector, lang, l.label);
                        self.langRadios[lang] = child;
                    }
                    if (state.selected !== undefined ) {
                        self.langRadios[lang].notify({selected: state.selected == lang}, 'language');
                    }
                });
                return this.state(state, namespace);
        }
        return false;
    };

    function LanguageView(selector, browserLanguage) {
        Component.call(this, selector);
        this.browserLanguage = browserLanguage;
        this.langRadios = {};
    }

    return LanguageView;

});
