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

    StatusRadio.prototype.render = function(state, props) {
        var data = {
            checked: "",
            label: $.i18n.t("settings:" + props.status),
            status: props.status
        };
        if ( state && state.status && state.status.selected ) {
            data.checked = state.status.selected ? " checked" : "";
        }
        return html(data);
    };

    StatusRadio.prototype.attach = function(oldNode, newNode) {
        _.bind(Component.prototype.attach, this)(oldNode, newNode);
        var self = this;
        $(newNode).on('change', function() {
            GSW.AsylumState.select(self.props().status);
        });
    };

    function StatusRadio(selector, status) {
        Component.call(this, selector, { status: status });
    }

    return StatusRadio;

});
