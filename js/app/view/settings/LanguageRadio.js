define(['Component', 'handlebars'], function(Component, handlebars) {

    var $ = window.$;

    LanguageRadio.prototype = Object.create(Component.prototype);

    var html = handlebars.compile(
        '<p lang="{{lang}}">' +
        '<input class="with-gap" name="settings-lang-select-radio" type="radio" ' +
        'id="settings-lang-select-{{lang}}" ' +
        'value="{{lang}}" {{checked}} />' +
        '<label for="settings-lang-select-{{lang}}">{{label}}</label>' +
        '</p>'
    );

    LanguageRadio.prototype.render = function(state) {
        var data = {
            checked: "",
            label: this.label,
            lang: this.lang
        };
        if ( state && state.language && state.language.selected ) {
            data.checked = state.language.selected == this.lang ? " checked" : "";
        }
        return html(data);
    };

    LanguageRadio.prototype.attach = function(oldNode, newNode) {
        _.bind(Component.prototype.attach, this)(oldNode, newNode);
        var self = this;
        $(newNode).on('change', function() {
            self.browserLanguage.select(self.lang);
        });
    };

    function LanguageRadio(selector, lang, label, browserLanguage) {
        Component.call(this, selector);
        this.lang = lang;
        this.label = label;
        this.browserLanguage = browserLanguage;
    }

    return LanguageRadio;

});
