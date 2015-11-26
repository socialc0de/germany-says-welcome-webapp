/* global define */
define(['underscore', 'handlebars', 'Component'],
    function (_, handlebars, Component) {

        var menu = [
            {"label": "dashboard", "target": "#dashboard"},
            {"label": "faq", "target": "#faq"},
            {"label": "map", "target": "#map"},
            {"label": "phrasebook", "target": "#phrasebook"},
            {"label": "settings", "target": "#settings"}
        ];

        var $ = window.$;

        SideNav.prototype = Object.create(Component.prototype);

        SideNav.prototype.render = function (state) {
            var selected = state.router && state.router.selected;
            var html = '<ul id="slide-out" class="side-nav fixed">';
            var t = handlebars.compile('<li {{{selected}}} data-nav="{{label}}"><a href="{{target}}" data-i18n="{{label}}">{{translation}}</a></li>');
            _.each(menu, function (item) {
                var data = $.extend(true, {}, item);
                data.translation = $.i18n.t("sidenav:" + data.label);
                data.selected = selected == data.label ? 'class="active"' : "";
                html += t(data);
            });
            html += '<a class="gsw-brand hide-on-med-and-down" href="http://www.germany-says-welcome.de">' +
                '<span>' +
                '<img src="images/logo.svg" width="45px"/><br/>Germany Says Welcome' +
                '</span>' +
                '</a>' +
                '</ul>';
            return html;
        };

        SideNav.prototype.setState = function(state, namespace) {
            switch (namespace) {
                case "language":
                    if ( state.selected ) {
                        return this.state({ selected: state.selected }, "language");
                    }
                    break;
                case "router":
                    if ( state.parts && state.parts[0] ) {
                        return this.state({ selected: state.parts[0]}, "router");
                    }
                    break;
                default:
                    return false;
            }
            return false;

        };

        SideNav.prototype.attach = function (oldNode, newNode) {
            Component.prototype.attach.call(this, oldNode, newNode);
            $(newNode).on('click', _.bind(this.onClick, this));
            $("#slide-out-toggle").sideNav();
        };

        SideNav.prototype.onClick = function (event) {
            $("#slide-out-toggle").sideNav('hide');
            return true;
        };

        function SideNav(selector) {
            Component.call(this, selector);
        }

        return SideNav;

    });
