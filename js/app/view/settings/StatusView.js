define(['Component', 'view/settings/StatusRadio'], function (Component, StatusRadio) {

    StatusView.prototype = Object.create(Component.prototype);

    StatusView.prototype.render = function (state) {
        var html = '<form id="settings-status-select" action="#">';
        var statusValues = this.asylumStatus.statusValues;
        var self = this;
        _.each(statusValues, function (idx, status) {
            html += '<p data-status="' + status + '">';
        });
        html += '</form>';
        return html;
    };

    StatusView.prototype.setState = function (state, namespace) {
        _.bind(Component.prototype.setState, this)(state, namespace);
        var self = this;
        if (namespace && namespace == 'status' ) {
            var statusValues = this.asylumStatus.statusValues;
            _.each(statusValues, function (idx, status) {
                var selector = '#settings-status-select p[data-status=' + status + "]";
                var child = new StatusRadio(selector, status, self.asylumStatus);
                child.subscribe(self.asylumStatus, "status");
                self.addChild(child, status);
            });
        }
    };

    function StatusView(selector, asylumStatus) {
        Component.call(this, selector);
        this.asylumStatus = asylumStatus;
    }

    return StatusView;

});
