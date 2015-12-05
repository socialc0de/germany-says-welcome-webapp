define(['underscore','Component', 'data/EmergencyNumbers'], function (_, Component, EmergencyNumbers) {
    EmergencyView.prototype = Object.create(Component.prototype);

    var emergencyNumbers = EmergencyNumbers.EmergencyNumbers;

    EmergencyView.prototype.render = function (state) {
        var html = '';
        html += '<table class="bordered highlight emergency-table"><thead><tr><th data-field="name" data-i18n="emergency:name"></th><th data-field="phone" data-i18n="emergency:phone"></th></tr></thead><tbody>'
        _.each(emergencyNumbers, function (item) {
            html += '<tr>' +
                '<td>' + item.name + '</td>' +
                '<td>' + '<a href="tel://' + item.telefon + '">' +  item.telefon + '</a></td>' +
                '<td></td>'
                '</tr>';
        });

        html += "</tbody></table></div>";
        return html;
    };

    function EmergencyView(selector) {
        Component.call(this, selector);
    }
return EmergencyView;
});