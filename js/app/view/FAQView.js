define(['Component', 'view/faq/CategoriesView', 'view/faq/ItemView', 'data/AsylumStatusValues'], function (Component, CategoriesView, ItemView, AsylumStatusValues) {

    FAQView.prototype = Object.create(Component.prototype);

    var html = '<div>' +
        '<div id="faq_categories"></div>' +
        '<div id="faq_items"></div>' +
        '</div>';

    FAQView.prototype.render = function (state) {
        return html;
    };

    FAQView.prototype.setState = function (state, namespace) {
        switch (namespace) {
            case 'faq':
                if ( state.categories ) {
                    this.categoriesView.notify({ categories: state.categories}, 'faq');
                }
                if ( state.items ) {
                    this.itemView.notify({ items: state.items }, 'faq');
                }
                return this.state(state, "faq");
            case 'language':
                if (state.selected) {
                    var selected = state.selected || "en";
                    this.categoriesView.notify({ selected: selected}, "language");
                    this.itemView.notify({ selected: selected}, "language");
                    return this.state({selected: selected}, "language");
                }
                break;
            case 'status':
                if (state.selected) {
                    var selected = AsylumStatusValues.statusValues.indexOf(state.selected)+1;
                    GSW.FAQ.init(selected);
                    this.categoriesView.notify({ selected: selected}, "status");
                    this.itemView.notify({ selected: selected}, "status");
                    return this.state({selected: selected}, "status");
                }
                break;
            case 'router':
                if (state.parts && state.parts[0] == 'faq' && state.params && state.params.cat) {
                    this.categoriesView.notify({ cat: state.params.cat }, 'faq');
                    this.itemView.notify({cat: state.params.cat}, 'faq');
                    return this.state({ cat: state.params.cat }, 'faq');
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
