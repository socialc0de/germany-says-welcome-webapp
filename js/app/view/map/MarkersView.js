define(['Component', 'underscore'], function (Component, _) {

    MarkersView.prototype = Object.create(Component.prototype);

    MarkersView.prototype.render = function (state) {
        if (state.poi.load) {
            loadMap();
        }

        var map = state.poi || {};
        var lang = (state.language && state.language.selected) || "en";

        var self = this;
        if (this.localCategories === undefined && !_.isEmpty(map.categories)) {
            self.localCategories = {};
            self.layers = {};
            
            _.each(map.categories, function (cat) {
                if (!cat.translations || !cat.translations[lang]) {
                    //ignore category where no translation is available
                    return;
                }

                //append a new layer element 
                var translatedCat = cat.translations[lang].name;
                self.localCategories[cat.id] = translatedCat;
                self.layers[translatedCat] = L.markerClusterGroup();
            });
        }

        var items = map.items || [];
        self.markers = []
        items = _.chain(items)
                .filter(function (item) {
                    //ignore entries without available translations
                    return _.has(item.translations, lang);
                })
                .each(function (item) {
                    var location = item.location;
                    var coordinates = location.coordinates;

                    //displays the POI
                    var marker = L.marker(coordinates);
                    //add a description to the marker
                    marker.bindPopup(item.translations[lang].description);

                    self.markers.push({"marker": marker, "categories": item.categories});
                });

        if (self.localCategories !== undefined && self.markers !== undefined
                && MarkersView.leafletMap) {
            _.each(self.markers, function (markerElement) {
                var marker = markerElement.marker;
                var categories = markerElement.categories;
                _.each(categories, function (catId) {
                    var translatedCat = self.localCategories[catId];
                    self.layers[translatedCat].addLayer(marker);
                })
            })

            if (!self.layerControlCreated) {
                L.control.layers(self.layers).addTo(MarkersView.leafletMap);
                self.layerControlCreated = true;
            }
        }
    }

    function loadMap() {
        if (MarkersView.leafletMap !== undefined) {
            return;
        }

        //set berlin as default location
        var defaultLocation = [52.519444, 13.406667];
        //set the image path to our css folder
        L.Icon.Default.imagePath = 'css/third-party/leaflet/images/';

        var tiles = L.tileLayer(
                'http://{s}.osm.germany-says-welcome.de/osm/{z}/{x}/{y}.png', {
                    maxZoom: 18
                });

        MarkersView.leafletMap = L.map('map_markers').setView(defaultLocation, 13);

        //try to locate the user with the HTML 5 GEO API
        MarkersView.leafletMap.locate({setView: true});

        MarkersView.leafletMap.addLayer(tiles);
    }

    function MarkersView(selector) {
        Component.call(this, selector);
    }

    return MarkersView;
});
