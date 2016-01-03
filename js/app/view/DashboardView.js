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
        '<img src="images/sample-1.jpg">' +
        '<span class="card-title">Card Title</span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>' +
        '</div>' +
        '</div>' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img src="images/sample-1.jpg">' +
        '<span class="card-title">Card Title</span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>' +
        '</div>' +
        '</div>' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img src="images/emergency.jpg">' +
        '<span class="card-title">Card Title</span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="col s12">' +
        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img src="images/sample-1.jpg">' +
        '<span class="card-title">Card Title</span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>' +
        '</div>' +
        '</div>' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img src="images/sample-1.jpg">' +
        '<span class="card-title">Card Title</span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>' +
        '</div>' +
        '</div>' +

        '<div class="card col s4" style="height: 25%; width: 30%;">' +
        '<div class="card-image">' +
        '<img src="images/sample-1.jpg">' +
        '<span class="card-title">Card Title</span>' +
        '</div>' +
        '<div class="card-content">' +
        '<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div></div>';
    console.log("Dashbord logstelle");

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
