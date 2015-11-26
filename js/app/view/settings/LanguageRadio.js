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

    LanguageRadio.prototype.render = function(state, props) {
        var data = {
            checked: state.language && state.language.selected ? "checked" : "",
            label: props.label,
            lang: props.lang
        };
        return html(data);
    };

    LanguageRadio.prototype.attach = function(oldNode, newNode) {
        Component.prototype.attach.call(this, oldNode, newNode);
        var self = this;
        $(newNode).on('change', function() {
            GSW.BrowserLanguage.select(self.props().lang);
        });
    };

    function LanguageRadio(selector, lang, label) {
        Component.call(this, selector, { lang: lang, label: label });
    }

    return LanguageRadio;

});
