define(['Component', 'view/settings/StatusRadio', 'data/AsylumStatusValues'], function (Component, StatusRadio, StatusValues) {

    var statusValues = StatusValues.statusValues;

    StatusView.prototype = Object.create(Component.prototype);

    StatusView.prototype.render = function (state) {
        var html = '<form id="settings-status-select" action="#">';
        var self = this;
        _.each(statusValues, function (status) {
            html += '<p data-status="' + status + '">';
        });
        html += '</form>';
        return html;
    };

    StatusView.prototype.setState = function (state, namespace) {
        _.bind(Component.prototype.setState, this)(state, namespace);
        var self = this;
        if (namespace && namespace == 'status' ) {
            if ( !this.statusRadios.arrival  ) {
                _.each(statusValues, function (status) {
                    var selector = '#settings-status-select p[data-status=' + status + "]";
                    var child = new StatusRadio(selector, status, self.asylumStatus);
                    child.subscribe(self.asylumStatus, "status");
                    child.subscribe(self.browserLanguage, "language");
                    self.statusRadios[status] = child;
                });
            }
        }
    };

    function StatusView(selector, asylumStatus, browserLanguage) {
        Component.call(this, selector);
        this.asylumStatus = asylumStatus;
        this.browserLanguage = browserLanguage;
        this.statusRadios = {};
    }

    return StatusView;

});
