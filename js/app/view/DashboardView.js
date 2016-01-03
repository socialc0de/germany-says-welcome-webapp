/**
 * Created by taho on 02.01.16.
*/
define(['Component'], function (Component, AsylumStatusValues) {

    DashboardView.prototype = Object.create(Component.prototype);


    var html = '<div><div class="container">' +
        '<div class="row">' +
        '<div class="col s12">' +
        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img class="Dashboard-Card-Image" src="images/FAQ.jpg" alt="FAQ" />' +
        '<span class="card-title"><a href="#faq" data-i18n="dashboard:FAQ Title">FAQ</a></span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p data-i18n="dashboard:FAQ Description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate </p>' +
        '</div>' +
        '</div>' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img class="Dashboard-Card-Image" src="images/Map.jpg" alt="Map" />' +
        '<span class="card-title"><a data-i18n="dashboard:Map Title" href="#map">Map</a></span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p data-i18n="dashboard:Map Description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate </p>' +
        '</div>' +
        '</div>' +
        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img class="Dashboard-Card-Image" src="images/phrasebook.jpg" alt="Phrasebook" />' +
        '<span class="card-title"><a data-i18n="dashboard:Phrasebook Title" href="#phrasebook">Phrasebook</a></span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p data-i18n="dashboard:Phrasebook Description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate </p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="col s12">' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img class="Dashboard-Card-Image" src="images/emergency.jpg" alt="Emergency" />' +
        '<span class="card-title"><a data-i18n="dashboard:Emergency Title" href="#emergency">Emergency</a></span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p data-i18n="dashboard:Emergency Description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate </p>' +
        '</div>' +
        '</div>' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img class="Dashboard-Card-Image" src="images/sample-1.jpg" alt="About" />' +
        '<span class="card-title"><a data-i18n="dashboard:About Title" href=""></a></span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p data-i18n="dashboard:About Description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate </p>' +
        '</div>' +
        '</div>' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img class="Dashboard-Card-Image" src="images/sample-1.jpg" alt="Settings" />' +
        '<span class="card-title"><a data-i18n="dashboard:Settings Title" href="#settings"></a></span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p data-i18n="dashboard:Settings Description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate </p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    DashboardView.prototype.render = function (state) {
        return html;
    };

    DashboardView.prototype.setState = function (state, namespace) {
        switch (namespace) {
            case 'language':
                if (state.selected) {
                    var selected = state.selected || "en";
                    return this.state({selected: selected}, "language");
                }
                break;
            case 'router':
                if (state.parts && state.parts[0] == 'dashboard' && state.params && state.params.cat) {
                    return this.state({ cat: state.params.cat }, 'dashboard');
                }
                break;
        }
        return false;
    };


    function DashboardView(selector) {
        Component.call(this, selector);
    }

    return DashboardView;

});
