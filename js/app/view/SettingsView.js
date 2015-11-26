define(['underscore', 'Component', 'view/settings/LanguageView', 'view/settings/StatusView'], function (_, Component, LanguageView, StatusView) {

    var $ = window.$;

    SettingsView.prototype = Object.create(Component.prototype);

    SettingsView.prototype.render = function (state) {
        var html = '<ul class="collapsible" data-collapsible="accordion">' +
            '<li data-section="language">' +
            '<div class="collapsible-header" data-section="language">' +
            '<i class="material-icons">language</i>' +
            $.i18n.t("settings:language") +
            '</div>' +
            '<div class="collapsible-body"><form id="settings-lang-select"></form></div>' +
            '</li>' +
            '<li data-section="status">' +
            '<div class="collapsible-header" data-section="status"><i class="material-icons">account_balance</i>' +
            $.i18n.t("settings:status") +
            '</div>' +
            '<div class="collapsible-body"><form id="settings-status-select" action="#">' +
            '</div>' +
            '</ul>';
        return html;
    };

    SettingsView.prototype.setState = function (newState, namespace) {
        if (!this.languageSection) {
            this.languageSection = new LanguageView('#settings-lang-select', this.browserLanguage);
        }
        if (!this.statusSection) {
            this.statusSection = new StatusView('#settings-status-select', this.asylumStatus, this.browserLanguage);
        }
        switch (namespace) {
            case "language":
                this.languageSection.notify(newState, "language");
                this.statusSection.notify({selected: newState.selected}, "language");
                return this.state(newState, namespace);
            case "status":
                this.statusSection.notify({selected: newState.selected}, "status");
                return this.state(newState, namespace);
            case "router":
                if ( newState.parts && newState.parts[0] == "settings" && newState.params && newState.params['section']) {
                    var section = newState.params['section'];
                    return this.state({section: section}, "router");
                }
        }
        return false;
    };

    SettingsView.prototype.attach = function (oldNode, newNode) {
        _.bind(Component.prototype.attach, this)(oldNode, newNode);
        $(newNode).collapsible();
        var sectionChanged = _.bind(this.sectionChanged, this);
        var el = $(newNode).find('div.collapsible-header').on('click', sectionChanged);
    };

    SettingsView.prototype.update = function (node) {
        var state = this.state();
        var section = (state.router && state.router.section) || "language";
        if (section) {
            var selected = $(node).find("li[data-section]");
            var self = this;
            selected.each(function (idx, el) {
                var header = $(el).find(".collapsible-header");
                var sectionName = header.attr("data-section");
                if (section == sectionName && !header.hasClass("active")) {
                    $(el).collapsible('toggle');
                }
                if (section != sectionName && header.hasClass("active")) {
                    $(el).collapsible('toggle');
                }
            });
        }
    };

    SettingsView.prototype.sectionChanged = function (event) {
        var target = event.target;
        var section = $(target).attr('data-section');
        window.location.hash = "#settings/" + section;
    };

    function SettingsView(selector) {
        Component.call(this, selector);
    }

    return SettingsView;

});
