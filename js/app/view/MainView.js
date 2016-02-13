define(["underscore"], function(_) {

    var $ = window.$;

    MainView.prototype = {};

    MainView.prototype.subscribe = function(hoverboard, namespace) {
        var setter = _.bind(function (state) {
            this.setState(state, namespace);
        }, this);
        return hoverboard.getState(setter);
    };

    MainView.prototype.setState = function(state, namespace) {
        if ( !namespace ) { return; }
        switch (namespace) {
            case "router":
                var section = "dashboard";
                if ( state && state.parts && state.parts[0] ) {
                    section = state.parts[0];
                }
                if ( section == this.section ) { return; }
                var el = $("main > div.main-container.active");
                el.removeClass("active");
                el = $("#" + section + "_container")
                el.addClass("active");
                $("html, body").animate({ scrollTop: 0 }, "slow");
                break;
            case "language":
                if ( state && state.selected && state.selected != "") {
                    var dir;
                    var lang = state.selected;
                    switch (lang) {
                        case 'ar':
                            dir = "rtl";
                            break;
                        default:
                            dir = "ltr";

                    }
                    $('html').attr('dir', dir).attr('lang', lang);
                }
                break;
        }
        return state;
    };


    function MainView() {
        this.section = "";

    }

    return MainView;


});
