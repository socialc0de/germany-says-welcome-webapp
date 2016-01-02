define(['Component', 'view/faq/CategoriesView', 'view/faq/ItemView', 'data/AsylumStatusValues', 'data/FAQAPI', 'underscore'], function (Component, CategoriesView, ItemView, AsylumStatusValues, faqAPI, _) {

    var $ = window.$;

    FAQView.prototype = Object.create(Component.prototype);

    var html = '<div>' +
        '<div class="fixed-action-btn" style="bottom: 45px; right: 24px;">' +
        '<a class="btn-floating btn-large blue">' +
        '<i id="faq_ask_question" class="large material-icons">live_help</i>' +
        '</a>' +
        '</div>' +
        '<div id="faq_categories"></div>' +
        '<div id="faq_items"></div>' +
        '</div>';

    FAQView.prototype.render = function (state) {
        return html;
    };

    FAQView.prototype.attach = function (oldNode, node) {
        Component.prototype.attach.call(this, oldNode, node);
        $('#faq_ask_question').on('click', _.bind(this.openAskQuestionModal, this));
        $('#faq_question_submit').on('click', _.bind(this.submitQuestion, this));
    };

    FAQView.prototype.openAskQuestionModal = function () {
        $('#faq_ask_question_modal').i18n();
        $('#faq_ask_question_modal').openModal();
        $('#faq_question_close').hide();
        $('#faq_question_submit').show();
        $('#faq_question_cancel').show();
        $('#faq_question_form').show();
        $('#faq_question_feedback').hide();
        $('#faq_question_field_phone').hide();
        $('#faq_question_form').find("input").val("");
        $('#faq_question_field_phone').val('+491234567890');
    };

    FAQView.prototype.submitQuestion = function () {
        if ($('#faq_question_field_phone').val() != '+491234567890') {
            return;
        }
        $('#faq_question_close').show();
        $('#faq_question_submit').hide();
        $('#faq_question_cancel').hide();
        $('#faq_question_form').hide();
        $('#faq_question_feedback').show();

        var data = {
            "county": 123123,
            "translations": {}
        };
        var langState = GSW.BrowserLanguage.getState();
        var lang = (langState && langState.selected) || "de";
        var question = $('#faq_question_field_question').val() || "";
        question = question.trim();
        if (question && question !== "") {
            data.translations[lang] = {};
            data.translations[lang].question = question.trim();
            $.ajax({
                contentType: "application/json",
                data: JSON.stringify(data),
                type: 'POST',
                url: faqAPI.faqurl
            });
        }
    };

    FAQView.prototype.setState = function (state, namespace) {
        switch (namespace) {
            case 'faq':
                if (state.categories) {
                    this.categoriesView.notify({categories: state.categories}, 'faq');
                }
                if (state.items) {
                    this.itemView.notify({items: state.items}, 'faq');
                }
                return this.state(state, "faq");
            case 'language':
                if (state.selected) {
                    var selected = state.selected || "en";
                    this.categoriesView.notify({selected: selected}, "language");
                    this.itemView.notify({selected: selected}, "language");
                    return this.state({selected: selected}, "language");
                }
                break;
            case 'status':
                if (state.selected) {
                    var selected = AsylumStatusValues.statusValues.indexOf(state.selected) + 1;
                    GSW.FAQ.init(selected);
                    this.categoriesView.notify({selected: selected}, "status");
                    this.itemView.notify({selected: selected}, "status");
                    return this.state({selected: selected}, "status");
                }
                break;
            case 'router':
                if (state.parts && state.parts[0] == 'faq' && state.params && state.params.cat) {
                    this.categoriesView.notify({cat: state.params.cat}, 'faq');
                    this.itemView.notify({cat: state.params.cat}, 'faq');
                    return this.state({cat: state.params.cat}, 'faq');
                }
                break;
        }
        return false;
    };


    function FAQView(selector) {
        Component.call(this, selector);
        this.categoriesView = new CategoriesView('#faq_categories');
        this.itemView = new ItemView('#faq_items');
    }

    return FAQView;

});
