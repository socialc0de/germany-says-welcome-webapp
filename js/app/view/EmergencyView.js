define(['Component'], function (Component) {
    EmergencyView.prototype = Object.create(Component.prototype);

    EmergencyView.prototype.render = function (state) {
        var html = '<div><h5 data-i18n="emergency:police"></h5><h6 data-i18n="emergency:phone" style="display: inline;"></h6><h6 style="display: inline;">: 110</h6><p data-i18n="emergency:police-text"></p></div>';
        return html;
    };

    function EmergencyView(selector) {
        Component.call(this, selector);
    }
return EmergencyView;
});