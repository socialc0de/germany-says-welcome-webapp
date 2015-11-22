define(['underscore', 'Component', 'view/settings/LanguageView', 'view/settings/LanguageView'], function (_, Component, LanguageView, StatusView) {

    var $ = window.$;

    SettingsView.prototype = Object.create(Component.prototype);

    SettingsView.prototype.render = function (state) {
        if ( state && state.router && state.router.params && state.router.params.section ) {
            this.section = state.router.params.section;
        }
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

    SettingsView.prototype.setState = function(state, namespace) {
        _.bind(Component.prototype.setState, this)(state, namespace);
        if ( !this.languageSection ) {
            this.languageSection = new LanguageView('#settings-lang-select', this.browserLanguage);
            this.languageSection.subscribe(this.browserLanguage, 'language');
            this.addChild(this.languageSection);
        }
        if ( !this.statusSection ) {
            this.statusSection = new StatusView('#settings-status-select', this.asylumStatus);
            this.statusSection.subscribe(this.asylumStatus, 'status');
            this.addChild(this.statusSection);
        }
    };

    SettingsView.prototype.attach = function (oldNode, newNode) {
        _.bind(Component.prototype.attach, this)(oldNode, newNode);
        $(newNode).collapsible();
        var sectionChanged = _.bind(this.sectionChanged, this);
        var el = $(newNode).find('div.collapsible-header').on('click', sectionChanged);
    };

    SettingsView.prototype.update = function(node) {
        if ( this.section ) {
            var selected = $(node).find("li[data-section]");
            var self = this;
            selected.each(function(idx, el) {
                var header = $(el).find(".collapsible-header");
                var section = header.attr("data-section");
                if ( section == self.section && !header.hasClass("active") ) {
                    $(el).collapsible('toggle');
                }
                if ( section != self.section && header.hasClass("active") ) {
                    $(el).collapsible('toggle');
                }
            });
        }
    };

    SettingsView.prototype.sectionChanged = function(event) {
        var target = event.target;
        var section = $(target).attr('data-section');
        window.location.hash = "#settings/" + section;
    };

    function SettingsView(selector, browserLanguage, asylumStatus) {
        Component.call(this, selector);
        this.browserLanguage = browserLanguage;
        this.asylumStatus = asylumStatus;
        this.section = "language";
    }

    return SettingsView;

});
