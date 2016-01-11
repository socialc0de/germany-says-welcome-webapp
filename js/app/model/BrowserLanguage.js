define(['underscore', 'hoverboard'], function (_, Hoverboard) {
        var $ = window.$;

        var languages = {
            'ar': { label: 'العربية' },
            'de': { label: 'Deutsch' },
            'en': { label: 'English' },
            'fr': { label: 'Français'}
        };

        var i18nextOptions = {
            useCookie: true,
            cookieName: 'gsw-browser-language',
            cookieExpirationTime: 525600, // 365 days in minutes
            fallbackLng: 'de',
            preload: ['ar', 'de', 'en', 'fr'],
            ns: {
                namespaces: ['sidenav','settings','emergency', 'faq', 'dashboard'],
                defaultNS: ['sidenav']
            }
        };

        function BrowserLanguage() {
            var instance = Hoverboard({

                init: function (state, namespace) {
                    var options = {ns: namespace};
                    $.extend(options, i18nextOptions);
                    $.i18n.init(options).always(function () {
                            var lang = $.i18n.lng();
                            if ( languages[lang] === undefined ) {
                                var matches = /^[a-z][a-z]/.exec(lang);
                                if ( matches.length == 2 && languages[matches[1]] ) {
                                    lang = languages[matches[1]];
                                } else {
                                    lang = "de";
                                }
                            }
                            instance.select(lang);
                            $.each(languages, function (lang, data) {
                                instance.add(lang, data.label);
                            });
                        }
                    );
                    return {namespace: namespace, languages: {}};
                },

                add: function (state, lang, label) {
                    var langs = state.languages || {};
                    langs[lang] = { label: label};
                    return {languages: langs};
                },

                select: function (state, lang) {
                    $.i18n.setLng(lang, function () {
                        $("body").i18n();
                    });
                    return {selected: lang};
                }

            });
            return instance;
        }

        return BrowserLanguage;
    }
);
