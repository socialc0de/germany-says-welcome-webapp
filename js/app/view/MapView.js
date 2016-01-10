define(['Component', 'view/map/CategoriesView', 'view/map/MarkersView', 'data/POIAPI'],
        function (Component, CategoriesView, MarkersView, POIAPI) {

            MapView.prototype = Object.create(Component.prototype);

            //a list of selectable categories for the map item
            var html = '<div>' +
                    '<div id="map_categories"></div>' +
                    '<div id="map_markers"></div>' +
                    '</div>';

            MapView.prototype.render = function (state) {
                return html;
            };

            MapView.prototype.setState = function (state, namespace) {
                switch (namespace) {
                    case 'poi':
                        if (state.categories) {
                            this.markersView.notify({categories: state.categories}, 'poi');
                        }

                        if (state.items) {
                            this.markersView.notify({items: state.items}, 'poi');
                        }

                        return this.state(state, "poi");
                        break;
                    case 'router':
                        if (state.parts && state.parts[0] == 'map') {
                            //notify that the map should be loaded
                            //implement lazy loading in order to display the correct size
                            //of the map
                            this.markersView.notify({load: true}, 'poi');
                            return this.state({load: true}, 'poi');
                        }

                        break;
                }

                return false;
            };

            function MapView(selector) {
                Component.call(this, selector);
                this.categoriesView = new CategoriesView('#map_categories');
                this.markersView = new MarkersView('#map_markers');
            }

            return MapView;
        });
