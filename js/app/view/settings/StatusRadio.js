define(['Component', 'handlebars'], function(Component, handlebars) {

    var $ = window.$;

    StatusRadio.prototype = Object.create(Component.prototype);

    var html = handlebars.compile(
        '<p data-status="{{status}}">' +
        '<input class="with-gap" name="settings-status-select-radio" type="radio" ' +
        'id="settings-status-select-{{status}}" ' +
        'value="{{status}}" {{checked}} />' +
        '<label for="settings-status-select-{{status}}">{{label}}</label>' +
        '</p>'
    );

    StatusRadio.prototype.render = function(state) {
        var data = {
            checked: "",
            label: $.i18n.t("settings:" + this.status),
            status: this.status
        };
        if ( state && state.status && state.status.selected ) {
            data.checked = state.status.selected == this.status ? " checked" : "";
        }
        return html(data);
    };

    StatusRadio.prototype.attach = function(oldNode, newNode) {
        _.bind(Component.prototype.attach, this)(oldNode, newNode);
        var self = this;
        $(newNode).on('change', function() {
            self.asylumStatus.select(self.status);
        });
    };

    function StatusRadio(selector, status, asylumStatus) {
        Component.call(this, selector);
        this.status = status;
        this.asylumStatus = asylumStatus;
    }

    return StatusRadio;

});
