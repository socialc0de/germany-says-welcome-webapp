/* global define */
define(['underscore', 'hoverboard'], function (_, Hoverboard) {

    var $ = window.$;

    function _matcher(routes) {
        var matches = [];
        for ( var key in routes ) {
            var template = routes[key];
            var groups = [];
            var state = 0; // 0 = normal state, 1 = in matching group
            var groupname = "";
            var regex = "";
            for ( var idx=0; idx < template.length; idx++ ) {
                var chr = template[idx];
                if ( state == 0 ) {
                    if ( chr == "{" ) {
                        state = 1;
                        groupname = "";
                    } else if (chr == "/") {
                        regex += "/";
                    } else {
                        regex += chr;
                    }
                } else if ( state == 1 ) {
                    if ( chr == "}" ) {
                        state = 0;
                        groups.push(groupname);
                        regex += "([^/]+)";
                    } else {
                        groupname += chr;
                    }
                }
            }
            regex = "^" + regex;
            matches.push({
                id: key,
                regex: new RegExp(regex),
                template: template,
                groups: groups
            });
        }
        return function(input) {
            if ( input[0] == "#" ) {
                input = input.substr(1);
            }
            return _.foldl(matches, function(memo, m, idx) {
                var re = m.regex;
                var found = re.exec(input);
                if ( !found ) return memo;
                if ( !memo || memo.groups.length < found.length-1 ) {
                    var params = {};
                    for ( var idx=1; idx<found.length; idx++) {
                        params[m.groups[idx-1]] = found[idx];
                    }
                    var parts = input.split("/");
                    memo = $.extend({}, m, { route: input, params: params, parts: parts });
                }
                return memo;
            }, null);
        };
    };



    function Router(routes) {
        var matcher = _matcher(routes);
        var hb = Hoverboard({

            update: function (state) {
                var newState = matcher(window.location.hash);
                return newState || state;
            },

            goto: function (state, location) {
                window.location.hash = location;
                return state;
            }

        });
        window.onhashchange = _.bind(hb.update, hb);
        return hb;
    };

    return Router;

});
