define(['Component'], function(Component) {

    PhraseCard.prototype = Object.create(Component.prototype);

    function PhraseCard(selector, id) {
        Component.call(this, selector, { id: id});
    }

});
