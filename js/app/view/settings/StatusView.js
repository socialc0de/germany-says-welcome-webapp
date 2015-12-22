define(['Component', 'view/settings/StatusRadio', 'data/AsylumStatusValues'], function (Component, StatusRadio, StatusValues) {

    var statusValues = StatusValues.statusValues;

    StatusView.prototype = Object.create(Component.prototype);

    StatusView.prototype.render = function (state) {
        var html = '<form id="settings-status-select" action="#">';
        var self = this;
        _.each(statusValues, function (status) {
            html += '<p data-status="' + status + '"></p>';
        });
        html += '</form>';
        return html;
    };

    StatusView.prototype.setState = function (state, namespace) {
        var self = this;
        switch (namespace) {
            case "status":
                _.each(statusValues, function (status) {
                    if (!self.statusRadios[status]) {
                        var selector = '#settings-status-select p[data-status=' + status + "]";
                        var child = new StatusRadio(selector, status);
                        self.statusRadios[status] = child;
                    }
                    self.statusRadios[status].notify({selected: state.selected == status }, 'status');
                });
                return this.state({selected: state.selected}, "status");
            case "language":
                _.each(self.statusRadios, function(radio) {
                    radio.notify({selected: state.selected}, "language");
                });
                return this.state({selected: state.selected}, "language");
        }
        return false;
    };

    function StatusView(selector) {
        Component.call(this, selector);
        this.statusRadios = {};
    }

    return StatusView;

})
;
