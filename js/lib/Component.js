define(['underscore', 'html2hscript', 'virtual-dom'],
    function (_, parser, VirtualDOM) {

        var $ = window.$;
        var h = VirtualDOM.h;

        var ID = 1;

        /**
         * Returns the current state of the component. Mixes the current state's namespace with newState
         * if provided as arguments and returns the result. Note that the actual state is not changed
         * by this method. Consider this method as a "getter" with additional functionality and use "notify()"
         * for state changes.
         *
         * Note: This method uses jQuery's $.extend(true, ...) for a deep copy of the state object.
         *
         * @param newState
         * @param namespace
         * @returns a copy of the current state mixed with the provided arguments.
         */
        Component.prototype.state = function (newState, namespace) {
            var state = this._tree.getState() || {};
            if (newState) {
                if (namespace) {
                    state[namespace] = state[namespace] || {};
                    $.extend(true, state[namespace], newState);
                } else {
                    $.extend(true, state, newState);
                }
            }
            return state;
        };

        /**
         * Returns a copy of the component's properties.
         *
         */
        Component.prototype.props = function () {
            return this._tree.getProperties();
        };

        /**
         *  Returns the selector of the component.
         */
        Component.prototype.selector = function() {
            return this._tree.getSelector();
        };

        /**
         * This method renders the entire component depending on its state and properties.
         *  It must return a valid HTML string. The HTML string
         * is used to change the current DOM element by diff'ing and patching its
         * DOM tree.
         *
         * Override this method to render the HTML of the component.
         *
         * @param state a copy of the state of the component.
         * @param props a copy of the properties of the component.
         * @returns {string} a HTML string representing the entirely rendered component.
         */
        Component.prototype.render = function (state, props) {
            return '<div></div>';
        };

        /**
         * Subscribes the component to a data model. The data model must be
         * a Hoverboard flux style data model. An optional namespace can
         * be submitted. If the data model changes the setState() method
         * of the component is called with the new state and the provided
         * namespace as arguments.
         *
         * @param hoverboard a Hoverboard style data model
         * @param namespace an optional namespace
         * @returns {*} the unsubscribe method.
         */
        Component.prototype.subscribe = function (hoverboard, namespace) {
            var notify = _.bind(function (state) {
                this.notify(state, namespace);
            }, this);
            var unsubscribe = hoverboard.getState(notify);
            namespace = namespace || null;
            this.unsubscribeFn[namespace] = unsubscribe;
            return unsubscribe;
        };

        /**
         * Unsubscribes the component from a data model previously subscribed to via subscribe().
         *
         * @param namespace A namespace if it was used with subscribe().
         */
        Component.prototype.unsubscribe = function (namespace) {
            namespace = namespace || null;
            var unsubscribe = this.unsubscribeFn[namespace];
            if (unsubscribe) {
                delete this.unsubscribeFn[namespace];
                unsubscribe();
            }
        };

        /**
         * Updates the state and triggers rendering if necessary. The method is asynchronous and returns
         * immediately. The actual rendering is deferred to the next Javascript event cycle.
         *
         */
        Component.prototype.notify = function (state, namespace) {
            var self = this;
            window.setTimeout(function () {
                self._tree.setState(state, namespace);
            }, 0);
            //TODO: Return a Promise which is fulfilled after the process finishes.
            return undefined;
        };

        /**
         * Attaches the node to the DOM document. Called once per Component
         * after the DOM node is created and before it is inserted into the
         * DOM document tree.
         *
         * Override this method to attach event handlers. Don't forget to
         * call the overridden method from your method, e.g.:
         *
         * Component.prototype.attach.call(this, oldNode, newNode);
         *
         * @param oldNode the old node to be replaced by the component
         * @param newNode the new node representing the component in DOM.
         */
        Component.prototype.attach = function (oldNode, newNode) {
            if (this.replacedNodes) {
                return;
            }
            var id = $(oldNode).prop('id');
            if (!_.isEmpty(id)) {
                newNode.id = id;
            }
            this.replacedNodes = $(oldNode).replaceWith(newNode);
        };

        /**
         * Detaches the component from the DOM tree and removes all event handlers, jQuery data
         * and flux subscriptions. Override this method if you need to detach child components.
         */
        Component.prototype.detach = function (node) {
            if (!this.replacedNodes) {
                return;
            }
            var selector = this._tree.getSelector();
            var id = $(selector).prop('id');
            $(selector).off();
            $(selector).removeData();
            $(selector).replaceWith(this.replacedNodes);
            if (id) {
                this.replacedNodes.id = id;
            }
            this.replacedNodes = undefined;
            var namespaces = _.keys(this.unsubscribeFn);
            var self = this;
            _.each(namespaces, function (namespace) {
                self.unsubscribe(namespace);
            });
        };

        /**
         * Called whenever the Component has been rendered. Override this method
         * if you need to do something after the component has been rendered.
         *
         * @param node the DOM node representing the component in the DOM tree.
         */
        Component.prototype.update = function (node) {
        };

        /**
         * This method is called whenever the state of the component is changed. It must return a copy of the
         * entire state which is to replace the component's state before rendering. Override this method if you
         * need to either alter the state before rendering or notify child component's or do other stuff before
         * rendering.
         *
         * This method is a perfect place to filter the incoming state to all elements that are relevant to the
         * component to prevent it from updating on state changes which do not influence the component.
         *
         * Use the state() method as an easy way to compose the return value.
         *
         * @param newState a hash representing the new state
         * @param namespace an optional namespace
         */
        Component.prototype.setState = function (newState, namespace) {
            return this.state(newState, namespace);
        };

        /**
         * This is the actual rendering engine using virtual-dom and hscript to
         * compute and apply differences in the DOM by diff'ing and patching.
         *
         * Most methods and properties are private to keep state and properties as
         * immutable as possible with Javascript.
         *
         * @param component
         * @param selector
         * @param props
         * @private
         */
        var _Tree = function (component, selector, props) {

            var state = {};
            var tree = undefined;

            var childQueue = [];

            /* State helper functions */

            var _cleanState = function () {
                state = state || {};
                return JSON.parse(JSON.stringify(state));
            };

            this.getSelector = function () {
                return selector;
            };

            this.getState = function () {
                return $.extend(true, {}, state);
            };

            this.getProperties = function () {
                return $.extend(true, {}, props);
            };

            this.setState = function (newState, namespace) {
                if (!newState) return;
                var _setStateFn = this.setState;
                this.setState = function () {
                    throw Error("The state of this component is locked to prevent recursive state changes.");
                };
                try {
                    var renderState = component.setState(newState, namespace);
                    if (!renderState || _.isEqual(renderState, state)) {
                        return;
                    }
                    state = renderState;
                    this.render();
                } finally {
                    this.setState = _setStateFn;
                }
            };

            /* Rendering */

            this.render = function () {
                var _state = $.extend(true, {}, state);
                var _props = $.extend(true, {}, props);
                var html = component.render(_state, _props);
                if (!html) {
                    return tree;
                }
                var targetElement = $(selector);
                if (!targetElement.length) {
                    return;
                }
                var newTree = undefined;
                var hs;
                parser(html, function (err, hscript) {
                    hs = hscript;
                    newTree = eval(hscript);
                });
                // TODO: Check if this loop is necessary. I guess that the parser is not async and has finished at this point.
                while (!newTree) {
                }
                if (tree === undefined) {
                    targetElement.each(function () {
                        var node = VirtualDOM.create(newTree);
                        if (_.isFunction(component.attach)) {
                            _.bind(component.attach, component)(this, node);
                        }
                        if (_.isFunction(component.update)) {
                            _.bind(component.update, component)(this);
                        }                    });
                } else if (targetElement && targetElement.length) {
                    targetElement.each(function () {
                        var patches = VirtualDOM.diff(tree, newTree);
                        VirtualDOM.patch(this, patches);
                        if (_.isFunction(component.update)) {
                            _.bind(component.update, component)(this);
                        }
                    });
                }
                tree = newTree;
                _.each(childQueue, function (child) {
                    child._tree.render();
                });
                childQueue = [];
                return tree;
            };

        };

        /**
         * Constructor of Component. Takes a DOM selector to target the DOM elements to replace
         * by this component. The second argument is a set of (immutable) properties of the component.
         *
         * @param selector
         * @param props
         * @constructor
         */
        function Component(selector, props) {
            if (_.isEmpty(selector)) {
                throw new Error("Need a DOM element selector to render Component.");
            }
            this._tree = new _Tree(this, selector, props || {});
            this.unsubscribeFn = {};
            this.replacedNodes = undefined;
        }

        return Component;

    });
