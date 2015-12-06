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
        switch (namespace) {
            case 'phrasebook':
                if ( state.categories ) {
                    this.categoriesView.notify({ categories: state.categories}, 'phrasebook');
                }
                if ( state.phrases ) {
                    this.phrasesView.notify({phrases: state.phrases}, 'phrasebook');
                }
                return this.state(state, "phrasebook");
            case 'language':
                if (state.selected) {
                    var selected = state.selected == 'de' ? "en" : state.selected;
                    this.categoriesView.notify({ selected: selected}, "language");
                    this.phrasesView.notify({ selected: selected}, "language");
                    return this.state({selected: selected}, "language");
                }
                break;
            case 'router':
                if (state.parts && state.parts[0] == 'phrasebook' && state.params && state.params.cat) {
                    this.categoriesView.notify({ cat: state.params.cat }, 'phrasebook');
                    this.phrasesView.notify({ cat: state.params.cat}, 'phrasebook');
                    return this.state({ cat: state.params.cat }, 'phrasebook');
                }
                break;
        }
        return false;
    };


    function PhrasebookView(selector) {
        Component.call(this, selector);
        this.categoriesView = new CategoriesView('#phrasebook_categories');
        this.phrasesView = new PhrasesView('#phrasebook_phrases');
    }

    return PhrasebookView;

});
