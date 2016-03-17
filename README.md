Germany Says Welcome Web Application
====================================

The web application of the "Germany Says Welcome" project is a variant of the android app for other devices including
desktops and more general mobiles.

Getting started
---------------

The web app can be built from the repository on any node.js enabled system. Once built, the web app is an HTML+JS 
only application and uses the general Germany Says Welcome backend server. Node.js is not required to run the web app,
it is only required for the build process.

Building the app
================

Install node.js for your operating system and check if the `npm` command is available.
   
    # npm -version
    3.3.12 

If you need to install node.js, give this page a try:

[https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)

With node.js available make sure, the commands "bower" and "gulp" are installed globally. Install them with these
commands:

    # npm install bower -g
    ...
    # npm install gulp -g
    ...

Clone this repository to a local directory. Do not use your super user account, on some systems
bower does not run as "root".

    # git clone https://github.com/socialc0de/germany-says-welcome-webapp.git
    ....
    # cd germany-says-welcome

Install the required node modules and library dependencies with npm and bower (this can take a while to finish).
    
    # npm install
    ...
    # bower install
    ...
    
Now start the build process by:

    # gulp build
    
The web app can be found in the directory `dist` and can be deployed to any web server. The file "index.html" is
the start page. To use your own backend server, make the URLs in the following files point to your server:
 
    js/app/data/EmergencyAPI.js
    js/app/data/FAQAPI.js
    js/app/data/PhrasebookAPI.js
    js/app/data/POIAPI.js


Getting involved as a developer
-------------------------------

The following documentation is meant to get you started as a developer contributing to the project.

Overview
--------

The web app is based on an MVC design pattern. It uses an implementation of Facebook's Flux called
[Hoverboard](https://github.com/jesseskinner/hoverboard) by Jesse Skinner. The general idea of Flux is that data
flows in just one direction. Data changes can only be triggered by calling <b>actions</b>. Actions <b>update</b> the model.
View components <b>subscribe</b> to changes of the model but cannot write the model themselves. If they need to
change the model, they need to call <b>actions</b> and the data flow starts all over again. For more information on
Flux see [https://facebook.github.io/flux/](https://facebook.github.io/flux/).

Components are inspired by React but do not use React directly for simplicity reasons. React relies on IDE's with
support for transpilers, bundles, source maps and much more adding to complexity. Debugging React applications
is still not trivial, dependency management goes through "browserify" or similar bundlers. To keep things simple and
comprehensive we decided against the use of React and introduce a very tiny <b>React-like component model</b>.

Dependency management is done through <b>requirejs</b> which does not need any bundling/compiling, is pretty easy to debug
and comes with a quite simple syntax. For more information on requirejs see [http://requirejs.org/](http://requirejs.org/).

Getting started
---------------

To setup your development environment clone this repository and start by setting up the node dependencies:

    # npm install

This should create a directory `node_modules` with all the node dependencies in place. 

Make sure you have `bower` and `gulp` installed globally (s. "Building the app"). If you do not want to
use global bower and gulp, run bower and gulp from the `node_modules` sub directory e.g. 
`node node_modules/bower/bin/bower install` instead of `bower install`.

Install the bower dependencies by calling:

    # bower install

Another directory called `bower_components` should be created containing all the third party modules used by the website.
The last step is to copy all the dependencies to their places in the website:

    # gulp deps
    ...
    # gulp sass

All third-party dependencies are kept in directories called `third-party` in resource directories like `js/third-party`
and `css/third-party`. Automatically generated code and content is not kept in the GIT repository and excluded through
`.gitignore`.

A good starting point for development is `index.html`. After it has setup all stylesheets and loaded all Javascript
dependencies it loads the main Javascript file `js/app/app.js`.

    [...]
    <script data-main="js/app/app.js" src="js/third-party/require.js"></script>
    </body>
    </html>

In the main Javascript file the environment for *requirejs* is setup and finally a data model is created (line #1):

        #1 var router = new Router(routes);
        #2 var asylumStatus = new AsylumStatus();
        #3 var browserLanguage = new BrowserLanguage();
        #4 var phrasebook = new Phrasebook();
            ...
        #5 browserLanguage.init();
            ...
        #6 var sideNav = new SideNavView("#slide-out");
        #7 sideNav.subscribe(browserLanguage, 'language');

At line #6 the SideNav component is created which is the left hand main menu of the app and is translated to the
user's language. In the settings part of the app a language picker can be used to change the current language.
The language is German by default. If the user chooses another language, the language is kept through the entire
app and through all later visits by use of cookies.

Since `BrowserLanguage` is a <i>Flux</i> enabled data model (powered by <i>Hoverboard</i>), components
like `SideNavView` can subscribe to changes and alter their appearance according to the state of the data model. In
line #7 the `SideNavView` component subscribes to `BrowserLanguage`.

Before line #5 the `BrowserLanguage` data model is still empty and the language picker in the settings section does not
have any languages to pick from. Line #5 initializes the `BrowserLanguage` data model. The translation is loaded from files
at `locales/<LANGUAGE>/...`.

As soon as `SideNavView` subscribes to `BrowserLanguage` it is provided with a copy of the current state of `BrowserLanguage`
and renders it appearance in the selected language. If `BrowserLanguage` changes its state e.g. through a change in
the settings section, `SideNavView` is notified about the change and re-renders its content.

Flux data model
---------------

To provide a data model with a Flux implementation from Hoverboard you need to create a module with this general structure:

    define(function(require) {

        function MyModel() {
            return Hoverboard(

                action1: function(state) {
                    newState = { ... };
                    return newState;
                },

                action2: function(state) {
                    ...
                });
        }

        return MyModel;
    });

You can later subscribe to the model by creating an instance of the module and subscribing to it following the advice from
[Hoverboard documentation](https://github.com/jesseskinner/hoverboard#documentation):

    var myModel = new MyModel();

    myModel(function(state) {
        console.log( JSON.stringify(state) );
    });

    --- or ---
    myModel.getState(function(state) {
        console.log( JSON.stringify(state) );
    });

    --- or ---
    var myComponent = new MyComponent();
    myComponent.subscribe(myModel);

Components
----------

Components are inspired by React but hide the complexity of setting up a React development environment. Components are
implemented by inheriting from the component base class `view/Component` (line #5 and line #12) and by overriding its `render()` method
(line #7).

    #1 define(['Component'], function (Component) {
    #2
    #3
    #4
    #5    Hello.prototype = Object.create(Component.prototype);
    #6
    #7    Hello.prototype.render = function (state) {
    #8        ...
    #9    };
    #10
    #11    function Hello() {
    #12         Component.call(this, '#hello');
    #13    }
    #14
    #15    return Hello;
    #16
    #17 });

The `render()` method takes a copy of the current state as an argument and should return the rendered HTML of the component.
In our framework you do not change DOM nodes of the HTML document directly. You always render the complete component and
the system takes care of figuring out the differences between the current DOM nodes and the changes that need to apply. This
is the basic idea of React we try to resemble.

To attach the component somewhere in the DOM document you need to pass a jQuery selector to the components constructor
(line #12 in the code above). The rendering takes place in the overridden `render()` method (line #2 below).

    #1 Hello.prototype.render = function (state) {
    #2    return '<h1>Hello world!</h1>';
    #3 };

Let's say we have stored the user's name in the `state`, we can use it during rendering (line #2):

    #1 Hello.prototype.render = function (state) {
    #2    return '<h1>Hello, ' + state.name  + '!</h1>';
    #3 };

In more complex scenarios, [Handlebars](http://handlebarsjs.com/) could be quite useful:

    var handlebars = require('handlebars');

    Hello.prototype.render = function (state) {
        var html = handlebars.compile('<h1>Hello, {{name}}!</h1>');
        return html(state);
    };  

And to wire everything up you need a Flux data model for the user's name:

    define(['Hoverboard'], function(Hoverboard) {

            function User() {
                return Hoverboard(

                    greet: function(state, name) {
                        return { name: name };
                    }

            }

            return User;
        });

Finally you can use it all together:

    var user = new User();
    var hello = new Hello();
    hello.subscribe(user);
    user.greet("Jan");

Component properties and state
------------------------------

Components have have their own state and can have optional properties. Both are provided as a copy to the `render()` method:

    Component.prototype.render = function(state, props) {...};

The difference between properties and state is that properties cannot be changed after the component is created. Properties
are ready-only throughout the whole lifecycle of the component. They are provided as an object to the component
through the constructor:

    function Component(selector, properties) {}

The state is mutable by use of the `notify()` method or by subscribing to a Flux data model via `subscribe()`. Actually,
the `notify()` method is the only available entry point for state changes from the outside since the `subscribe()` method
encapsulates `notify()` in a way that it is called with the new state whenever the Flux data model is changed.

The `notify()` method (and `subscribe()`) take an optional second argument `namespace` which is used as an identifier
for the part of the state intended to change. This helps separating state updates from different Flux data
models. The state object which is finally passed to the `render()` method is an object with one key for each namespace.
For example:

    myComponent.notify( { lang: "de" }, "language");
    myComponent.notify( { selected: "my Choice" }, "selection");

Results in:

    myComponent.prototype.render = function(state, props) {
        // state = { language: { lang: "de" }, selection: { selected: "my Choice" } }
        ...
    };

Note that `notify()` is an asynchronous method which returns immediately and leaves the rendering for later execution
(using `window.setTimeout(..., 0)`).

The actual state used when rendering the component is created in the method `setState(state, namespace)` which
is called with the exact same arguments as `notify()` has been called with. This method returns the complete state
which is then passed to `render(state, props)` as the first argument.

You can override this method to alter the state according to your needs or do other things whith the state. The return
value of the method *must* be the complete state including all namespaces. There is a useful helper method available -
`state(state, namespace)` which merges the passed 1st argument into the namespace of the current component's state.

    myComponent.prototype.setState = function(newState, namespace) {
        return this.state(newState, namespace);
    };

In the example above the `newState` object is merged into `namespace` of the current state. The result returned as the new
state of the component. Use this helper method as often as you can.

There is a special case for the return value of `setState()`. If you return a falsy value, the current state is left unchanged.

    myComponent.prototype.setState = function(newState, namespace) {
        return false; // Current state is unchanged.
    };

The method `render()` is only called when the current state is actually changed. Thus, in the example above no rendering
is performed for optimization. Because a component has an empty state in the beginning (`undefined`) it is rendered only
when there is an actual non-empty state.

Component life-cycle
--------------------

Components follow a life-cycle pattern, the three stages are "attach", "update" and "detach". For each stage there is a
corresponding method in the Component prototype which is called when the stage has been finished.

The `attach` life-cycle stage is called once when the component's html has been rendered for the first time. In the
corresponding `attach()` method the rendered HTML is mounted into the document DOM replacing the element(s) targeted by
the component's selector value.

    Note: If the selector targets more than one element in the document DOM all target's are replaced.

The `attach()` method takes the old DOM element and the new DOM element as it's arguments.

    Component.prototype.attach = function(oldNode, newNode) { ... };

Override this method to connect event handlers for e.g. "click" events to the element. Use the methods `state()` and `props()`
if you need to read data at this point (although you cannot change the data, it's read-only). Make sure that you call
the corresponding method of the Component prototype when overriding because the super method does the actual DOM manipulation.

    MyComponent.prototype.attach = function(oldNode, newNode) {
        Component.prototype.attach.call(this, oldNode, newNode);
        ...
    };

The `update()` method is called whenever the component has finished rendering and has updated the DOM.
It receives the DOM node as an argument. You can override this method if you need to make adjustments to
the DOM after it has been rendered. Again don't forget to call the super method:

    MyComponent.prototype.update = function(node) {
        Component.prototype.update.call(this, node);
        ...
    };

The `detach()` method handles the clean-up code if the component is not needed any more. It replaces the DOM nodes
with the DOM elements that were in place before the component was attached and removes all data and event handlers from
the component's DOM elements. All subscriptions of Flux data models are removed from the component as well. The method
`detach()` is a good place for your own clean-up code.

All three life-cycle related methods are called once for every DOM node that matches the component's selector. It's
perfectly fine if the selector matches more than one element. You can use components matching more than one element
as a basic way of one-way data binding.

See also
--------

Flux - [https://facebook.github.io/flux/](https://facebook.github.io/flux/)

Hoverboard - [https://github.com/jesseskinner/hoverboard](https://github.com/jesseskinner/hoverboard)

React - [http://reactjs.de/](https://github.com/jesseskinner/hoverboard)

virtual-dom - [https://github.com/Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom)


Enjoy!
------

Made with love by [Germany Says Welcome](http://www.germany-says-welcome) in Nov 2015.
