define(['underscore','Component', 'data/EmergencyNumbers'], function (_, Component, EmergencyNumbers) {
    EmergencyView.prototype = Object.create(Component.prototype);

    var emergencyNumbers = EmergencyNumbers.EmergencyNumbers;

    EmergencyView.prototype.render = function (state) {
        var html = '';
        html += '<div><ul class="collapsible popout emergency-collapse" data-collapsible="accordion">';
        _.each(emergencyNumbers, function (item) {
            html += '<li>' +
                        '<div class="collapsible-header">' + item.name + ' <a href="tel://' +  item.telefon + '">' + item.telefon + '</a></div>' +
                        '<div class="collapsible-body" style="margin-left: 1%">' + item.description + '</div>' +
                    '</li>';
        });

        html += "</ul></div>";
        return html;
    };

    EmergencyView.prototype.attach = function (oldNode, newNode) {
        _.bind(Component.prototype.attach, this)(oldNode, newNode);
        $(".collapsible").collapsible();
    }

    function EmergencyView(selector) {
        Component.call(this, selector);
    }
return EmergencyView;
});