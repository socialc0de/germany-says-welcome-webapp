define(['data/EmergencyAPI', 'underscore', 'Component'], function (API, _, Component) {

    var $ = window.$;

    EmergencyView.prototype = Object.create(Component.prototype);

    EmergencyView.prototype.render = function (state) {
        var html = '';

        var url = API.emergencyurl;

        html += '<div><ul class="collapsible popout emergency-collapse" data-collapsible="accordion">';

        if (state.emergencynumbers != null) {
            console.log(state.emergencynumbers.numbers);
            var items = state.emergencynumbers.numbers;

            var selectedLanguage = state.language.selected;


            _.each(items, function (item) {
                if (item.translations[selectedLanguage] !== undefined) {
                    html += '<li>' +
                        '<div class="collapsible-header">' + item.translations[selectedLanguage].name + ' <a href="tel://' + item.number + '">' + item.number + '</a></div>' +
                        '<div class="collapsible-body" style="margin-left: 1%">' + item.translations[selectedLanguage].description + '</div>' +
                        '</li>';
                } else {
                    html = '<div class="row">' +
                        '<div class="col s12 m6">' +
                        '<div class="card blue-grey darken-1" style="width: 30%;">' +
                        '<div class="card-content white-text">' +
                        '<span class="card-title" data-i18n="emergency:Error Head"></span>' +
                        '<p data-i18n="emergency:Error Body"></p>' +
                        '</div>' +
                        '<div class="card-action">' +
                        '<a href="index.html#settings/language" data-i18n="emergency:Error Link"></a>' +
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

    function EmergencyView(selector) {
        Component.call(this, selector);
    }

    return EmergencyView;
});
