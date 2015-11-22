define(['Component', 'view/phrasebook/CategoriesView', 'view/phrasebook/PhrasesView'], function (Component, CategoriesView, PhrasesView) {

    PhrasebookView.prototype = Object.create(Component.prototype);

    var html = '<div>' +
        '<div id="phrasebook_categories"></div>' +
        '<div id="phrasebook_phrases"></div>' +
        '</div>';

    PhrasebookView.prototype.render = function (state) {
        return html;
    };

    PhrasebookView.prototype.setState = function (state, namespace) {
        Component.prototype.setState.call(this, state, namespace);
        if (this.getChildren() && !this.getChildren()['categories']) {
            var child = new CategoriesView('#phrasebook_categories');
            child.subscribe(this.phrasebook, 'phrasebook');
            child.subscribe(this.browserLanguage, 'language');
            child.subscribe(this.router, 'router');
            this.addChild(child, 'categories');
        }
        if (this.getChildren() && !this.getChildren()['phrases']) {
            var child = new PhrasesView('#phrasebook_phrases');
            child.subscribe(this.phrasebook, 'phrasebook');
            child.subscribe(this.browserLanguage, 'language');
            child.subscribe(this.router, 'router');
            this.addChild(child, 'phrases');
        }
        if (namespace == 'language' && state && state.selected) {
            state.selected = state.selected == 'de' ? "en" : state.selected;
            if (state.selected != this.lang) {
                this.lang = state.selected;
                this.phrasebook.init(this.lang);
            }
        }
        if (namespace == 'router' && state && state.params.cat) {
            this.phrasebook.phrases(state.params.cat);
        }

    };


    function PhrasebookView(selector, browserLanguage, phrasebook, router) {
        Component.call(this, selector);
        this.phrasebook = phrasebook;
        this.browserLanguage = browserLanguage;
        this.router = router;
        this.lang = "";
    }

    return PhrasebookView;

});
