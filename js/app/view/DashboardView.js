/**
 * Created by taho on 02.01.16.
 */
define(['Component'], function (Component, AsylumStatusValues) {

    var $ = window.$;

    DashboardView.prototype = Object.create(Component.prototype);

    DashboardView.prototype.render = function (state) {
        var html = '<div>' +
            '<div class="row">' +
            '<div class="col s12">' +
            '<div class="card col s4 Dashboard-Card" style="height: 25%">' +
            '<div class="card-image">' +
            '<img class="Dashboard-Card-Image" src="images/FAQ.jpg" alt="FAQ" />' +
            '<span class="card-title"><a href="#faq">' + $.i18n.t("dashboard:FAQ_Title") + '</a></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + $.i18n.t("dashboard:FAQ_Description") + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="card col s4 Dashboard-Card" style="height: 25%">' +
            '<div class="card-image">' +
            '<img class="Dashboard-Card-Image" src="images/Map.jpg" alt="Map" />' +
            '<span class="card-title"><a href="#map">' + $.i18n.t("dashboard:Map_Title") + '</a></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + $.i18n.t("dashboard:Map_Description") + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="card col s4 Dashboard-Card" style="height: 25%">' +
            '<div class="card-image">' +
            '<img class="Dashboard-Card-Image" src="images/phrasebook.jpg" alt="Phrasebook" />' +
            '<span class="card-title"><a href="#phrasebook">' + $.i18n.t("dashboard:Phrasebook_Title") + '</a></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + $.i18n.t("dashboard:Phrasebook_Description") + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="card col s4 Dashboard-Card" style="height: 25%">' +
            '<div class="card-image">' +
            '<img class="Dashboard-Card-Image" src="images/emergency.jpg" alt="Emergency" />' +
            '<span class="card-title"><a href="#emergency">' + $.i18n.t("dashboard:Emergency_Title") + '</a></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + $.i18n.t("dashboard:Emergency_Description") + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="card col s4 Dashboard-Card" style="height: 25%">' +
            '<div class="card-image">' +
            '<img class="Dashboard-Card-Image" src="images/sample-1.jpg" alt="About" />' +
            '<span class="card-title"><a href="">' + $.i18n.t("dashboard:About_Title") + '</a></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + $.i18n.t("dashboard:About_Description") + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="card col s4 Dashboard-Card" style="height: 25%">' +
            '<div class="card-image">' +
            '<img class="Dashboard-Card-Image" src="images/sample-1.jpg" alt="Settings" />' +
            '<span class="card-title"><a href="#settings">' + $.i18n.t("dashboard:Settings_Title") + '</a></span>' +
            '</div>' +
            '<div class="card-content">' +
            '<p>' + $.i18n.t("dashboard:Settings_Description") + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return html;
    };

    DashboardView.prototype.setState = function (state, namespace) {
        switch (namespace) {
            case 'language':
                if (state.selected) {
                    var selected = state.selected || "en";
                    return this.state({selected: selected}, "language");
                }
                break;
            case 'router':
                if (state.parts && state.parts[0] == 'dashboard' && state.params && state.params.cat) {
                    return this.state({cat: state.params.cat}, 'router');
                }
                break;
        }
        return false;
    };


    DashboardView.prototype.attach = function (oldNode, newNode) {
        Component.prototype.attach.call(this, oldNode, newNode);
        $(newNode).i18n();
    };

    DashboardView.prototype.update = function (node) {
        Component.prototype.update.call(this, node);
        $(node).i18n();
    };

    function DashboardView(selector) {
        Component.call(this, selector);
    }

    return DashboardView;

});
