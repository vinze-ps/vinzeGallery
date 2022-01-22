/* vinzeUtilities */
/* created by Patryk Surmacz */
/* github.com/vinze-ps */

(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
      ? (module.exports = factory())
      : typeof define === "function" && define.amd
      ? define(factory)
      : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), (global.Vinze = factory()));
  })(this, function () {
    ("use strict");

    const Vinze = (function () {
        
        var Vinze = /** @class */ (function () {
            function Vinze() {
                var _this = this;
                this.easings = {
                    linear: "cubic-bezier(0, 0, 1, 1)",
                    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                    easeIn: "cubic-bezier(0.42, 0, 1, 1)",
                    easeOut: "cubic-bezier(0, 0, 0.58, 1)",
                    easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
                    easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
                    easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
                    easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
                    easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
                    easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
                    easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
                    easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
                    easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
                    easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
                    easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
                    easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
                    easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
                    easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
                    easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
                    easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
                    easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
                    easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
                    easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                    easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
                    easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
                    easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
                    easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
                    easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
                    easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
                };
                this.isMobileDevice = function () { return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)); };
                this.doInSomeTime = function (since, to, fn, elsefn) {
                    if (elsefn === void 0) { elsefn = null; }
                    var date = new Date();
                    var sinceNumber = +(since.split(":")[0] + since.split(":")[1]);
                    var toNumber = +(to.split(":")[0] + to.split(":")[1]);
                    var currentTimeNumber = +(date.getHours().toString() + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString());
                    if (sinceNumber < toNumber) {
                        if (currentTimeNumber >= sinceNumber && currentTimeNumber <= toNumber) {
                            fn();
                        }
                        else {
                            if (elsefn) {
                                elsefn();
                            }
                        }
                    }
                    else if (sinceNumber > toNumber) {
                        if (currentTimeNumber >= sinceNumber && currentTimeNumber >= toNumber) {
                            fn();
                        }
                        else {
                            if (elsefn) {
                                elsefn();
                            }
                        }
                    }
                    else {
                        fn();
                    }
                };
                this.timeout = function (action, name, duration, fn) {
                    if (name === void 0) { name = null; }
                    if (duration === void 0) { duration = 0; }
                    if (fn === void 0) { fn = null; }
                    switch (action) {
                        case "set":
                            var timeoutExists = false;
                            if (_this.timeouts.length > 0) {
                                for (var i = 0; i <= _this.timeouts.length - 1; i++) {
                                    timeoutExists = _this.timeouts[i][0] === name;
                                    if (timeoutExists) {
                                        _this.timeouts[i][1] = setTimeout(function () {
                                            if (fn)
                                                fn();
                                        }, duration);
                                        break;
                                    }
                                    else if (!timeoutExists && i === _this.timeouts.length - 1) {
                                        _this.timeouts.push([
                                            name,
                                            setTimeout(function () {
                                                if (fn)
                                                    fn();
                                            }, duration),
                                        ]);
                                        break;
                                    }
                                }
                            }
                            else {
                                _this.timeouts.push([
                                    name,
                                    setTimeout(function () {
                                        if (fn)
                                            fn();
                                    }, duration),
                                ]);
                            }
                            return timeoutExists;
                        case "isset":
                            for (var i = 0; i <= _this.timeouts.length - 1; i++)
                                if (_this.timeouts[i][0] === name)
                                    return true;
                            return false;
                        case "clear":
                            for (var i = 0; i <= _this.timeouts.length - 1; i++)
                                if (_this.timeouts[i][0] === name) {
                                    clearTimeout(_this.timeouts[i][1]);
                                    _this.timeouts.splice(i, 1);
                                }
                            return -1;
                        case "clearAll":
                            for (var i = 0; i <= _this.timeouts.length - 1; i++) {
                                clearTimeout(_this.timeouts[i][1]);
                                _this.timeouts = new Array();
                            }
                            return -1;
                        default:
                            return -1;
                    }
                };
                this.interval = function (action, name, tick, fn) {
                    if (name === void 0) { name = null; }
                    if (tick === void 0) { tick = 0; }
                    if (fn === void 0) { fn = null; }
                    switch (action) {
                        case "set":
                            var intervalExists = false;
                            if (_this.intervals.length > 0) {
                                for (var i = 0; i <= _this.intervals.length - 1; i++) {
                                    intervalExists = _this.intervals[i][0] === name;
                                    if (intervalExists) {
                                        _this.intervals[i][1] = setInterval(function () {
                                            if (fn)
                                                fn();
                                        }, tick);
                                        break;
                                    }
                                    else if (!intervalExists && i === _this.intervals.length - 1) {
                                        _this.intervals.push([
                                            name,
                                            setInterval(function () {
                                                if (fn)
                                                    fn();
                                            }, tick),
                                        ]);
                                        break;
                                    }
                                }
                            }
                            else {
                                _this.intervals.push([
                                    name,
                                    setInterval(function () {
                                        if (fn)
                                            fn();
                                    }, tick),
                                ]);
                            }
                            return intervalExists;
                        case "isset":
                            for (var i = 0; i <= _this.intervals.length - 1; i++)
                                if (_this.intervals[i][0] === name)
                                    return true;
                            return false;
                        case "clear":
                            for (var i = 0; i <= _this.intervals.length - 1; i++)
                                if (_this.intervals[i][0] === name) {
                                    clearInterval(_this.intervals[i][1]);
                                    _this.intervals.splice(i, 1);
                                }
                            return -1;
                        case "clearAll":
                            for (var i = 0; i <= _this.intervals.length - 1; i++) {
                                clearInterval(_this.intervals[i][1]);
                                _this.intervals = new Array();
                            }
                            return -1;
                        default:
                            return -1;
                    }
                };
                this.stringToHTML = function (value) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(value, "text/html");
                    return doc.body;
                };
                this.timeouts = [];
                this.intervals = [];
                this.events = [];
            }
            Vinze.prototype.objectAssign = function (target) {
                var _this = this;
                var sources = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    sources[_i - 1] = arguments[_i];
                }
                sources.forEach(function (source) {
                    Object.keys(source).forEach(function (key) {
                        var s_val = source[key];
                        var t_val = target[key];
                        target[key] = t_val && s_val && typeof t_val === "object" && typeof s_val === "object" ? _this.objectAssign(t_val, s_val) : s_val;
                    });
                });
                return target;
            };
            Vinze.prototype.throttle = function (name, delay, func) {
                var _this = this;
                if (this.timeout("isset", name))
                    return;
                func();
                this.timeout("set", name, delay, function () {
                    _this.timeout("clear", name);
                });
            };
            Vinze.prototype.select = function (selector) {
                var _this = this;
                if (selector === null)
                    return undefined;
                var nodeList;
                if (typeof selector === "string")
                    nodeList = document.querySelectorAll(selector);
                else
                    nodeList = [selector];
                return {
                    elements: nodeList,
                    length: nodeList.length,
                    addClass: function (className) {
                        nodeList.forEach(function (element) {
                            element.classList.add(className);
                        });
                        return _this.select(selector);
                    },
                    removeClass: function (className) {
                        nodeList.forEach(function (element) {
                            element.classList.remove(className);
                        });
                        return _this.select(selector);
                    },
                    toggleClass: function (className) {
                        nodeList.forEach(function (element) {
                            if (element.classList.contains(className))
                                element.classList.remove(className);
                            else
                                element.classList.add(className);
                        });
                        return _this.select(selector);
                    },
                    hasClass: function (className) {
                        if (nodeList.length === 0)
                            return false;
                        if (className === "")
                            return nodeList[0].classList.value;
                        else
                            return nodeList[0].classList.contains(className);
                    },
                    parent: function (layer) {
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        if (typeof layer === "number") {
                            var currentElement = nodeList[0];
                            for (var i = 0; i < layer; i++) {
                                if (currentElement !== null) {
                                    currentElement = currentElement.parentElement;
                                }
                                else
                                    break;
                            }
                            return _this.select(currentElement);
                        }
                        else
                            return _this.select(nodeList[0].parentElement);
                    },
                    prepend: function (value) {
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        nodeList.forEach(function (element) {
                            element.prepend(_this.stringToHTML(value).children[0]);
                        });
                    },
                    append: function (value) {
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        nodeList.forEach(function (element) {
                            element.append(_this.stringToHTML(value).children[0]);
                        });
                    },
                    on: function (types, listener, useCapture, id) {
                        if (useCapture === void 0) { useCapture = false; }
                        if (id === void 0) { id = null; }
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        // Check whether event with passed id already exists.
                        if (id !== null)
                            for (var i = 0; i < _this.events.length; i++)
                                if (_this.events[i].id === id)
                                    return false;
                        var typesArray = types.split(" ");
                        // Loop through all elements.
                        nodeList.forEach(function (element) {
                            // Loop through all passed types.
                            typesArray.forEach(function (type) {
                                var addEvent = true;
                                // Loop through all existing events.
                                for (var i = 0; i < _this.events.length; i++) {
                                    if (_this.events[i].element === element &&
                                        _this.events[i].type.search(type) !== -1 &&
                                        _this.events[i].listener.toString() === listener.toString() &&
                                        _this.events[i].useCapture === useCapture) {
                                        addEvent = false;
                                        break;
                                    }
                                    else {
                                        // End of the loop.
                                        if (i - 1 === _this.events.length)
                                            addEvent = true;
                                    }
                                }
                                // Add a new event.
                                if (addEvent) {
                                    element.addEventListener(type, listener, useCapture);
                                    _this.events.push({
                                        element: element,
                                        type: type,
                                        listener: listener,
                                        useCapture: useCapture,
                                        id: id,
                                    });
                                }
                            });
                        });
                        return _this.select(selector);
                    },
                    off: function (types, listener, useCapture, id) {
                        if (listener === void 0) { listener = null; }
                        if (useCapture === void 0) { useCapture = null; }
                        if (id === void 0) { id = null; }
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        // If id was passed, remove event directly.
                        if (id !== null)
                            for (var i = _this.events.length - 1; i >= 0; i--)
                                if (_this.events[i].id === id) {
                                    _this.events[i].element.removeEventListener(_this.events[i].type, _this.events[i].listener, _this.events[i].useCapture);
                                    _this.events.splice(i, 1);
                                }
                        if (types === null)
                            return _this.select(selector);
                        var typesArray = types.split(" ");
                        // Filer exists events.
                        var _events = _this.events.filter(function (event) {
                            // Types.
                            if (typesArray.indexOf(event.type) === -1)
                                return false;
                            // Listener.
                            if (listener !== null)
                                if (listener.toString() !== event.listener.toString())
                                    return false;
                            // Use capture.
                            if (useCapture !== null)
                                if (useCapture !== event.useCapture)
                                    return false;
                            return true;
                        });
                        // Remove events.
                        for (var i = _events.length - 1; i >= 0; i--) {
                            _events[i].element.removeEventListener(_events[i].type, _events[i].listener, _events[i].useCapture);
                            _this.events.splice(i, 1);
                        }
                        return _this.select(selector);
                    },
                    width: function () {
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        if (!nodeList[0].ownerDocument)
                            return nodeList[0].innerWidth;
                        var padding = (parseFloat(getComputedStyle(nodeList[0])["paddingLeft"].replace("px", "")) ||
                            0)
                            + (parseFloat(getComputedStyle(nodeList[0])["paddingRight"].replace("px", "")) ||
                                0);
                        return nodeList[0].offsetWidth - padding;
                    },
                    height: function () {
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        if (!nodeList[0].ownerDocument)
                            return nodeList[0].innerHeight;
                        var padding = (parseFloat(getComputedStyle(nodeList[0])["paddingTop"].replace("px", "")) ||
                            0)
                            + (parseFloat(getComputedStyle(nodeList[0])["paddingBottom"].replace("px", "")) ||
                                0);
                        return nodeList[0].offsetHeight - padding;
                    },
                    outerWidth: function (includeMargin) {
                        if (includeMargin === void 0) { includeMargin = false; }
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        if (!nodeList[0].ownerDocument)
                            return nodeList[0].innerWidth;
                        var margin = 0;
                        if (includeMargin)
                            margin =
                                (parseFloat(getComputedStyle(nodeList[0])["marginLeft"].replace("px", "")) ||
                                    0)
                                    + (parseFloat(getComputedStyle(nodeList[0])["marginRight"].replace("px", "")) ||
                                        0);
                        return nodeList[0].offsetWidth + margin;
                    },
                    outerHeight: function (includeMargin) {
                        if (includeMargin === void 0) { includeMargin = false; }
                        if (nodeList.length === 0)
                            return _this.select(selector);
                        if (!nodeList[0].ownerDocument)
                            return nodeList[0].innerHeight;
                        var margin = 0;
                        if (includeMargin)
                            margin =
                                (parseFloat(getComputedStyle(nodeList[0])["marginTop"].replace("px", "")) ||
                                    0)
                                    + (parseFloat(getComputedStyle(nodeList[0])["marginBottom"].replace("px", "")) ||
                                        0);
                        return nodeList[0].offsetHeight + margin;
                    },
                    offset: function () {
                        if (nodeList.length === 0)
                            return { top: 0, left: 0 };
                        if (!nodeList[0].getClientRects().length || !nodeList[0].ownerDocument)
                            return { top: 0, left: 0 };
                        var win = nodeList[0].ownerDocument.defaultView;
                        var rectObject = nodeList[0].getBoundingClientRect();
                        return {
                            top: rectObject.top + win.pageYOffset,
                            left: rectObject.left + win.pageXOffset,
                        };
                    },
                    position: function () {
                        if (nodeList.length === 0)
                            return { top: 0, left: 0 };
                        var offset, offsetParent, doc, parentOffset = { top: 0, left: 0 };
                        var innerUtils = new Vinze();
                        var ml = parseFloat(getComputedStyle(nodeList[0])["marginLeft"].replace("px", "")) ||
                            0;
                        var mt = parseFloat(getComputedStyle(nodeList[0])["marginTop"].replace("px", "")) ||
                            0;
                        if (getComputedStyle(nodeList[0])["position"] === "fixed") {
                            offset = nodeList[0].getBoundingClientRect();
                        }
                        else {
                            offset = innerUtils.select(nodeList[0]).offset();
                        }
                        doc = nodeList[0].ownerDocument;
                        offsetParent = (nodeList[0].offsetParent || doc.documentElement);
                        while (offsetParent &&
                            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                            getComputedStyle(nodeList[0])["position"] === "static") {
                            offsetParent = offsetParent.parentNode;
                        }
                        if (offsetParent && offsetParent !== nodeList[0] && offsetParent.nodeType === 1) {
                            parentOffset = innerUtils.select(offsetParent).offset();
                            parentOffset.top += parseFloat(getComputedStyle(offsetParent)["borderTopWidth"].replace("px", ""));
                            parentOffset.left += parseFloat(getComputedStyle(offsetParent)["borderLeftWidth"].replace("px", ""));
                        }
                        return {
                            left: offset.left - parentOffset.left - ml,
                            top: offset.top - parentOffset.top - mt,
                        };
                    },
                };
            };
            return Vinze;
        }());
  
      return Vinze;
    })();
  
    return Vinze;
  });
  