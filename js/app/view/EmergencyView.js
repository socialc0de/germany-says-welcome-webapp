define(['data/EmergencyAPI', 'underscore', 'Component'], function (API, _, Component) {

    var $ = window.$;

    EmergencyView.prototype = Object.create(Component.prototype);

    EmergencyView.prototype.render = function (state) {
        var html = '';

        var url = API.emergencyurl;

        html += '<div><ul class="collapsible popout emergency-collapse" data-collapsible="accordion">';

        if (state.emergencynumbers != null) {
            var items = state.emergencynumbers.numbers;

            var selectedLanguage = state.language.selected;

            _.each(items, function (item) {
                if (item.translations[selectedLanguage] !== undefined) {
                    html += '<li>' +
                        '<div class="collapsible-header">' + item.translations[selectedLanguage].name + ' <a href="tel://' + item.number + '">' + item.number + '</a></div>' +
                        '<div class="collapsible-body">' + item.translations[selectedLanguage].description + '</div>' +
                        '</li>';
                } else {
                    html = '<div class="row">' +
                        '<div class="col s12 m6">' +
                        '<div class="card blue-grey darken-1" style="width: 30%;">' +
                        '<div class="card-content white-text">' +
                        '<span class="card-title">' + $.i18n.t("emergency:Error-Head") + '</span>' +
                        '<p>' + $.i18n.t("emergency:Error-Body") + '</p>' +
                        '</div>' +
                        '<div class="card-action">' +
                        '<a href="index.html#settings/language">' + $.i18n.t("emergency:Error-Link") + '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
            });
        }

        html += "</ul></div>";
        return html;
    };

    EmergencyView.prototype.attach = function (oldNode, newNode) {
        _.bind(Component.prototype.attach, this)(oldNode, newNode);
        $(newNode).collapsible();
    };

    EmergencyView.prototype.update = function (node) {
        Component.prototype.attach.call(this, node);
        $(node).find(".collapsible").collapsible();
    };

    function EmergencyView(selector) {
        Component.call(this, selector);
    }

    return EmergencyView;
});
