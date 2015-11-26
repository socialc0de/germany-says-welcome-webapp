define(['underscore', 'html2hscript', 'virtual-dom'],
    function (_, parser, VirtualDOM) {

        var $ = window.$;
        var h = VirtualDOM.h;

        var ID = 1;

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
         * This method renders the entire component depending on its state, properties
         * and child components. It must return a valid HTML string. The HTML string
         * is used to change the current DOM element by diff'ing and patching its
         * DOM tree.
         *
         * @param state a copy of the state of the component.
         * @param props a copy of the properties of the component.
         * @param children the rendered HTML of all child components as a hash.
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
         *
         */
        Component.prototype.notify = function (state, namespace) {
            var self = this;
            window.setTimeout(function () {
                self._tree.setState(state, namespace);
            }, 0);
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
        Component.prototype.detach = function () {
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
         * Call this method to set the state of the component. The state is merged
         * into the current state leaving all hash properties unchanged which are
         * not present in the new state hash. An optional namespace can be passed
         * to store the state in a separate object property. After the state change
         * the component is re-rendered automatically.
         *
         * @param newState a hash representing the new state
         * @param namespace an optional namespace
         */
        Component.prototype.setState = function (newState, namespace) {
            return this.state(newState, namespace);
        };

        Component.prototype.props = function () {
            return this._tree.getProperties();
        };

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
                while (!newTree) {
                }
                if (tree === undefined) {
                    targetElement.each(function () {
                        var node = VirtualDOM.create(newTree);
                        if (_.isFunction(component.attach)) {
                            _.bind(component.attach, component)(this, node);
                        }
                    });
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

            this.enqueueChild = function (child) {
                childQueue.push(child);
            };

            /**
             * Performs duck type check of 'obj' for Component interface. Components must have a "_tree" property
             * which has methods "render", "html" and "setState".
             * @param obj
             * @returns {boolean}
             */
            function isComponent(obj) {
                if (!obj) return false;
                if (!obj._tree) return false;
                if (!obj._tree.render || !(typeof obj._tree.render === 'function')) return false;
                if (!obj._tree.setState || !(typeof obj._tree.setState === 'function')) return false;
                if (!obj._tree.html || !(typeof obj._tree.html === 'function')) return false;
                return true;
            }

        };

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
